"use client";
import "./styles.css";
import { useEffect, useState, useRef } from 'react';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

import { Input, BigInput } from "@/components/ui/input";
import { DayPicker } from 'react-day-picker';
import { TagSelector } from "@/components/ui/tag-selector";
import { FaPenNib, FaMicrophone } from 'react-icons/fa';

import { User, getAuth, onAuthStateChanged } from "firebase/auth"
import { startApp } from "@/lib/firebase";
import { MultiStepLoader } from "@/components/newdream/multi-step-loader";

import { useRouter } from "next/navigation";

//date format = YYYY-MM-DD

export default function Page(){

  //firebase  
  startApp();
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<null | User>(null)

  const router = useRouter();

  useEffect(() => {
    const auth = getAuth()
    return onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
      if (!user) router.push("/login");
    })
  }, [])

  //page

  const [generating, setGenerating] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [mood, setMood] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  //Speech to text
  const [listenText, setListenText] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<Window['SpeechRecognition'] | null>(null);

  useEffect(() => {
    if (typeof window !== undefined){
      const SpeechRecognition = 
        window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition){
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "en-US";


        recognitionRef.current.onresult = (event: { results: Iterable<unknown> | ArrayLike<unknown>; }) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join("");
          setDescription(transcript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event);
        };      
      } else {
        alert("Your browser does not support Speech Recognition");
      }
    }
  }, []);

  const handleListen = () => {
    if (listening){
      if (recognitionRef.current) recognitionRef.current.stop();      
      setListening(false);
    }
    else {
      if (recognitionRef.current) recognitionRef.current.start();
      setListening(true);
    }
    setListenText(true);
  }


  //Dream generation

  const [progressMessage, setProgressMessage] = useState<string>("");  
  const handleGenerate = async () => {
    if (generating) return;
  
    if (!title) {
      alert("Please enter a title");
      return;
    }
    if (!description) {
      alert("Please enter a description");
      return;
    }
    if (!date) {
      alert("Please enter a date");
      return;
    }
  
    setGenerating(true);
    setLoaderOpen(true);
    setProgressMessage("Starting dream generation...");
  
    try {

      const postResponse = await fetch("/api/runpod/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.uid,
          prompt: description,
          title: title,
          date: date,
          mood: mood || "",
          tags: tags || [],
        }),
      });

      if (!postResponse.ok) {
        throw new Error("Failed to start generation.");
      }

      const { taskId } = await postResponse.json();

      const eventSource = new EventSource(`/api/runpod/stream?taskId=${taskId}`);
  
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Update:", data.message);
        setProgressMessage(data.message); // Show progress to the user
  
        if (data.status === "success") {
          eventSource.close();
          setGenerating(false);
  
          // Redirect to journal or show generated image
          console.log("Generated Image URL:", data.imageURL);          
        }
      };
  
      eventSource.onerror = (error) => {
        console.error("SSE Error:", error);
        eventSource.close();
        setGenerating(false);
        setProgressMessage("An error occurred while generating the dream.");
      };
    } catch (error) {
      console.error("Request failed:", error);
      setProgressMessage("Failed to start generation.");
      setGenerating(false);
      setLoaderOpen(false);
    }
  };

  //Loader

  const [progressStage, setProgressStage] = useState<number>(0);

  useEffect(() => {
    console.log("Progress Message:", progressMessage);
    if (progressMessage === "Starting Dream Generation...") {
      setProgressStage(1);
    }
    if (progressMessage === "Enhancing Dream Description...") {
      setProgressStage(2);
    }
    if (progressMessage === "Generating Dreamscape...") {
      setProgressStage(3);
    }
    if (progressMessage === "Saving Dreamscape...") {
      setProgressStage(4);
    }
    if (progressMessage === "Storing Dream Data...") {
      setProgressStage(5);
    }
    console.log("Progress Stage:", progressStage);
  }, [progressMessage]);

  const [loaderOpen, setLoaderOpen] = useState(false);

  const handleLoader = () => {
    setLoaderOpen(!loaderOpen);
  }

  return (

    <div className="flex flex-1">
      <div className="p-2 md:p-10 md:rounded-tl-2xl md:border md:border-neutral-200 md:dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-8 flex-1 w-full h-full">

        <div className={`${loaderOpen ? "flex z-[110]" : "hidden -z-10"} fixed w-full h-screen`}>
          <MultiStepLoader loading={loaderOpen} progressStage={progressStage} onClose={handleLoader} />
        </div>        

        <div className="flex items-center gap-4 justify-center">
          <h1 className="text-4xl text-black dark:text-white mt-4 md:mt-0">Log New Dream</h1>
        </div>

        {/* Form */}
        <div className="flex flex-col-reverse md:flex-row gap-12 mt-6 justify-center items-center md:items-start">

          {/* Date */}
          <div className="flex flex-col gap-6">
            <h2 className="text-black dark:text-white">Date</h2>
            <DayPicker
              mode="single"
              required={true}
              selected={date}
              onSelect={setDate}
              disabled={{ after: new Date() }}
              className="rounded-lg border-opacity-20 shadow-md w-fit h-fit bg-[#151515] relative text-black dark:text-white"
              classNames={{
                nav: "absolute w-full flex justify-between pt-[1rem] px-8",
                chevron: "fill-black dark:fill-violet-800",
                month_caption: "bg-[#dadada] dark:bg-[#18181B] text-black dark:text-white rounded-t-lg p-4 flex justify-center items-center font-semibold",
                month_grid: "bg-neutral-100 dark:bg-[#0b0b0b] rounded-lg",
                weekdays: "bg-[#dadada] dark:bg-[#18181B] text-[#6E6E77]",
                day: "rounded-lg transition duration-200 p-3 text-center",                
                selected: "bg-[#7b2cbf] text-[#ECEDEE]",      
                today: "text-black dark:text-white",         
                disabled: "text-neutral-400 dark:text-neutral-700",
              }}
            />
            {/* Mobile Submit */}
            <button
              onClick={handleGenerate}
              className="md:hidden mt-2 mb-12 self-end shadow-[0_4px_14px_0_rgb(123,44,191,39%)] hover:shadow-[0_6px_20px_rgba(123,44,191,23%)] hover:bg-[rgba(123,44,191,0.9)] px-8 py-2 bg-[#7b2cbf] rounded-md text-white transition duration-200 ease-linear w-fit"
            >
              Submit
            </button>
          </div>

          <div className="flex flex-col gap-6 w-full max-w-5xl">

            {/* Description */}
            <div className="flex flex-col gap-2">
              <h2 className="text-black dark:text-white">Description *</h2>            
              <div className="flex flex-col gap-2 w-full h-full">
                <div className="flex items-center">
                  <BigInput                 
                    className="h-full w-full" 
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                  <button                   
                    className={`m-2 mb-2 md:mb-3 w-12 h-12 ${listening ? "bg-violet-500" : "bg-neutral-100 dark:bg-[#27272A]"} border border-gray-400 rounded-full text-white flex justify-center items-center`}
                    onClick={handleListen}
                  >
                    <FaMicrophone className="text-black dark:text-white" />
                  </button>
                </div>
                {listenText && 
                  <p className="text-black dark:text-[#6E6E77] text-sm -mb-2">
                    Please read over your dream description and make any necessary edits. Speech recognition is not perfect.
                  </p>
                }
              </div>                
            </div>

            {/* Title */}
            <div className="flex flex-col gap-2">
              <h2 className="text-black dark:text-white">Title *</h2>
              <Input
                characterLimit={50}          
                className="h-full w-full"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>            

            {/* Mood */}
            <div className="flex flex-col gap-2">
              <h2 className="text-black dark:text-white">Mood</h2>
              <Input
                characterLimit={15}
                className="h-full w-full" 
                onChange={(e) => setMood(e.target.value)}
              />
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-2">
              <h2 className="text-black dark:text-white mb-1">Tags</h2>
              <TagSelector selectedTags={tags} onChange={setTags} />

              {/* Submit */}
              <button
                onClick={handleGenerate}
                className="hidden md:block mt-2 self-end shadow-[0_4px_14px_0_rgb(123,44,191,39%)] hover:shadow-[0_6px_20px_rgba(123,44,191,23%)] hover:bg-[rgba(123,44,191,0.9)] px-8 py-2 bg-[#7b2cbf] rounded-md text-white transition duration-200 ease-linear w-fit"
              >
                Submit
              </button>
            </div>            

          </div>
          
        </div>
      </div>
    </div>
  )
}