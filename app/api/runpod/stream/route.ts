import { NextResponse } from "next/server";
import { app, db, startApp, storage } from "@/lib/firebase";
import { collection, addDoc, deleteDoc, setDoc, getDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import OpenAI from "openai";

const RUNPOD_API_KEY = process.env.RUNPOD_API_KEY!;
const RUNPOD_API_URL = process.env.RUNPOD_API_URL!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function getEnhancedPrompt(description: string) {
  // Use a more capable model for better comprehension
  const response = await openai.chat.completions.create({
    model: "gpt-4o", // Upgraded from gpt-4o-mini for better comprehension
    messages: [
      { 
        role: "system", 
        content: 
          `You are an expert at converting descriptions into ready-to-use prompts for DynavisionXL image generation.        
          Your task is to transform the user's description into a highly detailed prompt that preserves EVERY element from the original while adding visual richness.

          Follow these guidelines:
            1. Preserve ALL original elements exactly as described, especially unusual or dreamlike elements
            2. Format the output as a single paragraph with no explanations, just the prompt itself
            3. Add cinematic and photographic qualities: lighting, composition, atmosphere, depth
            4. Include technical specifications like camera lens, angle, and distance where appropriate
            5. End with relevant style modifiers for DynavisionXL such as "highly detailed, photorealistic, 8k" if appropriate`
      },
      { role: "user", content: description },
      { 
        role: "system", 
        content: `Create the final DynavisionXL-ready prompt with no introductory text, no explanations, and no formatting other than a single paragraph.

          The prompt must:
            1. Contain every element from the original description
            2. Be immediately usable in DynavisionXL without modification
            3. Follow this structure: [core description elements] + [visual elaboration] + [technical specifications] + [style modifiers]
            Return ONLY the final prompt text that would be copied directly into DynavisionXL.`
      }
    ],
    max_tokens: 500, // Increased to allow for more detailed responses
    temperature: 0.7, 
    frequency_penalty: 0.3,
    presence_penalty: 0.5,
  });

  // Get the initial enhanced prompt
  let enhancedPrompt = response.choices[0].message.content?.trim() || "";
  
  // Simple verification - check if the prompt is long enough to be useful
  // and contains substantial parts of the original description
  if (enhancedPrompt.length < description.length || 
      !containsSubstantialParts(description, enhancedPrompt)) {
    
    // If verification fails, try again with more explicit instructions
    const repairResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You create DynavisionXL image generation prompts that fully incorporate the original description." 
        },
        { 
          role: "user", 
          content: `Original description: "${description}"          
          I need a direct, ready-to-use prompt for DynavisionXL that includes EVERY element from my description. Return ONLY the prompt text with no explanations or formatting.` 
        }
      ],
      max_tokens: 500,
      temperature: 0.5,
    });
    
    enhancedPrompt = repairResponse.choices[0].message.content?.trim() || "";
  }

  console.log("Enhanced Prompt: ", enhancedPrompt);
  
  return enhancedPrompt;
}

// Helper function to check if enhanced prompt contains substantial parts of original
function containsSubstantialParts(original: string, enhanced: string): boolean {
  // Simple check - break original into phrases and see if they appear in enhanced
  const originalWords = original.toLowerCase().split(/\s+/);
  const enhancedLower = enhanced.toLowerCase();
  
  // Check for 2-3 word phrases from original
  for (let i = 0; i < originalWords.length - 2; i++) {
    const twoWordPhrase = `${originalWords[i]} ${originalWords[i+1]}`;
    const threeWordPhrase = `${originalWords[i]} ${originalWords[i+1]} ${originalWords[i+2]}`;
    
    if (!enhancedLower.includes(twoWordPhrase) && !enhancedLower.includes(threeWordPhrase)) {
      return false;
    }
  }
  
  return true;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  console.log("Request Query:", searchParams.toString());

  const taskId = searchParams.get("taskId");

  console.log("Task ID:", taskId);

  if (!taskId) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  const taskDoc = await getDoc(doc(db, "tasks", taskId));
    
  if (!taskDoc.exists()) {
    console.log("Task not found");
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  
  const taskData = taskDoc.data();

  console.log("Task Data:", taskData);

  const { userId, prompt, title, date, mood, tags } = taskData;  

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  async function sendMessage(message: string) {
    await writer.write(encoder.encode(`data: ${JSON.stringify({ status: "processing", message })}\n\n`));
  }

  async function sendFinalResponse(data: any) {
    await writer.write(encoder.encode(`data: ${JSON.stringify({ status: "success", ...data })}\n\n`));
    await writer.close();
  }

  (async () => {
    try {
      await sendMessage("Enhancing Dream Description...");
      let enhancedPrompt = await getEnhancedPrompt(prompt);
      console.log("Enhanced Prompt:", enhancedPrompt);
      if (!enhancedPrompt || enhancedPrompt.length < 100 || enhancedPrompt === "") {
        await sendMessage("Failed to enhance prompt, using original.");
        enhancedPrompt = prompt;
      }

      await sendMessage("Generating Dreamscape...");
      
      const requestConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RUNPOD_API_KEY}`
        },
        body: JSON.stringify({
          "input": {
            "workflow": {
              "6": {
                "class_type": "CLIPTextEncode",
                "inputs": {
                  "clip": [
                    "14",
                    1
                  ],
                  "text": `${enhancedPrompt}, 360, 360 view`
                }
              },
              "7": {
                "class_type": "CLIPTextEncode",
                "inputs": {
                  "clip": [
                    "14",
                    1
                  ],
                  "text": "text, watermark, deformed, glitch, noise, noisy, off-center"
                }
              },
              "16": {
                "class_type": "MakeCircularVAE",
                "inputs": {
                  "vae": [
                    "4",
                    2
                  ],
                  "tiling": "x_only",
                  "copy_vae": "Make a copy"
                }
              },
              "3": {
                "class_type": "KSampler",
                "inputs": {
                  "model": [
                    "17",
                    0
                  ],
                  "positive": [
                    "6",
                    0
                  ],
                  "negative": [
                    "7",
                    0
                  ],
                  "latent_image": [
                    "5",
                    0
                  ],
                  "seed": 162606773234902,
                  "control_after_generate": "randomize",
                  "steps": 20,
                  "cfg": 8,
                  "sampler_name": "euler",
                  "scheduler": "normal",
                  "denoise": 1
                }
              },
              "8": {
                "class_type": "VAEDecode",
                "inputs": {
                  "samples": [
                    "3",
                    0
                  ],
                  "vae": [
                    "16",
                    0
                  ]
                }
              },
              "17": {
                "class_type": "SeamlessTile",
                "inputs": {
                  "model": [
                    "14",
                    0
                  ],
                  "tiling": "x_only",
                  "copy_model": "Modify in place"
                }
              },
              "9": {
                "class_type": "SaveImage",
                "inputs": {
                  "images": [
                    "8",
                    0
                  ],
                  "filename_prefix": "360_image"
                }
              },
              "4": {
                "class_type": "CheckpointLoaderSimple",
                "inputs": {
                  "ckpt_name": "dynavisionXl.safetensors"
                }
              },
              "14": {
                "class_type": "LoraLoader",
                "inputs": {
                  "model": [
                    "4",
                    0
                  ],
                  "clip": [
                    "4",
                    1
                  ],
                  "lora_name": "360redmond.safetensors",
                  "strength_model": 0.6,
                  "strength_clip": 1
                }
              },
              "5": {
                "class_type": "EmptyLatentImage",
                "inputs": {
                  "width": 2048,
                  "height": 1024,
                  "batch_size": 1
                }
              }
            },
          }
        })            
      };

      const response = await fetch(RUNPOD_API_URL+"/runsync", requestConfig);

      console.log("Response Status:", response);

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (!data.output.message) return sendMessage("Image generation failed");

      await sendMessage("Saving Dreamscape...");

      const bytes = Uint8Array.from(atob(data.output.message), c => c.charCodeAt(0));
      const fileName = `dreams/${Date.now()}-${Math.random().toString(36).substring(7)}.png`;
      const storageRef = ref(storage, fileName);
      const metadata = { contentType: "image/jpg", cacheControl: "public, max-age=31536000, immutable" };
      await uploadBytes(storageRef, bytes, metadata);
      const imageURL = await getDownloadURL(storageRef);

      console.log("Image URL:", imageURL);

      await sendMessage("Storing Dream Data...");
      const dream = { userId, title, description: prompt, date, mood, tags, image: imageURL };
      const docRef = await addDoc(collection(db, `dreams/${userId}/dreamEntries`), dream);

      console.log("Dream ID:", docRef);

      //Delete task not update
      await deleteDoc(doc(db, "tasks", taskId));
      await sendFinalResponse({ message: "Dream successfully generated and stored!", imageURL, dreamId: docRef.id });

    } catch (error) {
      await writer.write(encoder.encode(`data: ${JSON.stringify({ status: "error", message: "Failed to process request", details: (error as any).message })}\n\n`));
      await writer.close();
    }
  })();

  return new Response(readable, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "Connection": "keep-alive" } });
}