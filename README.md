# **DreamCapture**  

DreamCapture is an AI-powered image generation pipeline optimized for **speed, cost-efficiency, and high-quality dreamlike visuals**. It leverages **RunPod** for GPU rentals, a **custom Docker image** for a serverless API, and **ComfyUI** with **DynavisionXL** and **360Redmond LoRA** to generate stunning, cinematic AI art in seconds.  

## **Features**  

-  **Blazing-Fast Image Generation** – Average image generation time of **~2 seconds** on RunPod.  
-  **Cost-Efficient** – Max GPU rental cost of **$0.44/hr**, with an average cost per image of **0.024 cents**.  
-  **Serverless API with Custom Docker Image** – Hosted on RunPod using a modified version of [blib-la/runpod-worker-comfy](https://github.com/blib-la/runpod-worker-comfy).  
-  **Optimized Prompts** – Powered by **GPT-4o**, ensuring high-fidelity prompts tailored for DynavisionXL.  
-  **Intelligent Caching** –  
  - **Aggressive 1-year caching** via Firebase & `next.config.js` to prevent unnecessary re-downloads.  
  - **Vercel CDN** caches image URLs, reducing Firebase bandwidth usage.  

## **Prompt Optimization with GPT-4o**  

DreamCapture utilizes **GPT-4o** to refine user inputs into **highly detailed, structured prompts** for DynavisionXL. The system ensures every detail from the user's description is preserved while enhancing cinematic and photographic qualities.  

### **GPT-4o Prompt:**  

> *"You are an expert at converting descriptions into ready-to-use prompts for DynavisionXL image generation.  
> Your task is to transform the user's description into a highly detailed prompt that preserves EVERY element from the original while adding visual richness.*  
>  
> *Follow these guidelines:*  
> *1. Preserve ALL original elements exactly as described, especially unusual or dreamlike elements.*  
> *2. Format the output as a single paragraph with no explanations, just the prompt itself.*  
> *3. Add cinematic and photographic qualities: lighting, composition, atmosphere, depth.*  
> *4. Include technical specifications like camera lens, angle, and distance where appropriate.*  
> *5. End with relevant style modifiers for DynavisionXL such as "highly detailed, photorealistic, 8k" if appropriate."*  

## **Cost Breakdown**  

- **RunPod GPU rental**: **Max $0.44/hr** (varies based on GPU availability).  
- **Max cost per image**: **0.024 cents**.  
- **ChatGPT API request cost**: **~0.076 cents per request** (based on GPT-4o pricing).  

## **Tech Stack**  

- **ComfyUI** (DynavisionXL + 360Redmond LoRA)  
- **RunPod** (GPU rental)  
- **Custom Docker Image** for serverless API ([GitHub Repo](https://github.com/blib-la/runpod-worker-comfy))  
- **Firebase** (data storage & aggressive caching)  
- **Vercel CDN** (image caching & frontend hosting)  
- **Next.js** (optimized frontend)  
- **GPT-4o** (prompt generation for enhanced image quality)  

> **DreamCapture combines speed, cost-efficiency, and dreamlike visuals into a single AI-powered platform.**
