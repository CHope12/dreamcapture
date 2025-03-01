"use client";
//import Link from "next/link";
import { useState, useEffect } from "react";
//import { Card, CardSkeletonContainer, CardTitle, CardDescription } from "@/components/ui/feature-card";
//import { FaPenNib, FaBook, FaMagic, FaFire, FaEye, FaArrowRight, FaMehBlank, FaMask, FaPuzzlePiece } from "react-icons/fa"

import { QuickActions } from "@/components/dashboard/quick-actions";
//import { DreamscapeQuickView } from "@/components/dashboard/dreamscape-quick-view";
import { JournalQuickView } from "@/components/dashboard/journal-quick-view";
import { CalendarQuickView } from "@/components/dashboard/calender-quick-view";
import { ProfileQuickView } from "@/components/dashboard/profile-quick-view";
import { ExploreQuickView } from "@/components/dashboard/explore-quick-view";

//import WordCloud from "@/components/charts/word-cloud";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { startApp } from "@/lib/firebase";
import { useRouter } from "next/navigation"

export default function Dashboard () {

  startApp();
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<null | User>(null)    

  const router = useRouter();

  useEffect(() => {
    const auth = getAuth()
    return onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      setUser(user);
      if(!user) router.push("/login");
    });
  }, []);
  
  const greeting = new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 18 ? "Good Afternoon" : "Good Evening";
  const streak = 15;  

  /*
  const [wordCloudFullscreen, setWordCloudFullscreen] = useState(false);
  const words: string = dummyDreams.map((dream) => dream.description).join(" ");
  const wordCloudColors = ['#e0aaff', '#5a189a', '#9d4edd', '#7b2cbf'];
  */

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 md:rounded-tl-2xl md:border md:border-neutral-200 md:dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full text-black dark:text-white">
        <div className="flex flex-col gap-6">

          {/* Quick action cards
                New Dream Entry, 
                Generate Dreamscape, 
                View Journal 
                See streak
          */}
          
          <h1 className="text-2xl mt-4 md:mt-0 text-center md:text-left">{greeting}, {user?.displayName?.split(" ")[0] || "Dreamer"}! Ready to log a dream?</h1>
          <QuickActions streak={streak} />

          {/* Dream Journal Overview 
                Recent 3-5 dreams, with date, title, and tags
                Quick add dream button
                Search bar - date, title, tags
          */}

          <h1 className="text-2xl text-center md:text-left">Dream Journal</h1>        
          {user && user.uid && (<JournalQuickView userId={user.uid} />)}
          
          {/* AI Dream Insights & Analysis
                Mood & Theme Analysis
                Word Cloud of common themes
                Dream Patterns & Trends
          

            <h1 className="text-2xl">Dream Insights & Analysis</h1>
            <div className="flex gap-8 justify-center">            
              <div 
                className={`${wordCloudFullscreen ? "fixed top-0 left-0 h-full w-full z-50 bg-[#151515]" : "relative bg-none w-3/4"} h-96 cursor-pointer`}
                //onClick={() => setWordCloudFullscreen(!wordCloudFullscreen)}
              >
                <WordCloud text={words} colors={wordCloudColors} showControls={false} />
              </div>
              <div className="w-1/4">
                <div className="flex flex-col gap-4">

                  <Link href="/insights/mood">
                    <div className="flex items-between gap-2 p-8 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] hover:bg-[rgba(40,40,60,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] transition-all duration-300">
                      <div className="flex gap-2 w-full items-center">
                        <FaMehBlank className="text-2xl text-blue-500" />
                        <h2 className="text-xl">Mood Analysis</h2>
                      </div>
                      <div className="flex items-center">
                        <FaArrowRight className="text-2xl"/>
                      </div>
                    </div>
                  </Link>
                  <Link href="/insights/theme">
                    <div className="flex items-center gap-2 p-8 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] hover:bg-[rgba(60,40,60,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] transition-all duration-300">
                      <div className="flex gap-2 w-full items-center">
                        <FaMask className="text-2xl text-purple-500" />
                        <h2 className="text-xl">Theme Analysis</h2>
                      </div>
                      <div className="flex items-center">
                        <FaArrowRight className="text-2xl"/>
                      </div>                    
                    </div>
                  </Link>

                  <Link href="/insights/patterns">
                    <div className="flex items-center gap-2 p-8 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] hover:bg-[rgba(40,60,60,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] transition-all duration-300">
                      <div className="flex gap-2 w-full items-center">
                        <FaPuzzlePiece className="text-2xl text-green-500" style={{
                          transform: "rotate(-90deg) rotateZ(180deg)",
                          transformOrigin: "center"
                          }}/>
                        <h2 className="text-xl">Dream Patterns</h2>
                      </div>
                      <div className="flex items-center">
                        <FaArrowRight className="text-2xl"/>
                      </div>                    
                    </div>
                  </Link>
                  
                </div>
              </div>
            </div>

          */}

          {/* AI Dreamscape Generator
                Quick Generate button
                Gallery of recent dreamscape images - timestamps
                Customization panel - style, color, theme                          
          
            <h1 className="text-2xl">Dreamscapes</h1>          
            <DreamscapeQuickView cards={cards} />

          */}


          {/* Dream Community & Exploration 
                Latest Public Dreamscapes
                Like, Comment, Share
                Dreamer Profiles                    
          */}

          <h1 className="text-2xl text-center md:text-left">Dream Community & Exploration</h1>
          <ExploreQuickView />

          {/* Dream Log Calendar
                Monthly calendar view
                Highlighted days with dreams logged
                Click to view dream details
          */}

          <h1 className="text-2xl text-center md:text-left">Dream Log Calendar</h1>
          {user && user.uid && <CalendarQuickView userId={user.uid} />}

          {/* User Profile / Settings
                Profile settings
                Notification settings
                Account settings
          */}
          <h1 className="text-2xl text-center md:text-left">Profile & Settings</h1>
          <ProfileQuickView />

        </div>    
      </div>
    </div>  
  )
}

const dummyDreams = [
  {
    id: 1,
    title: "Floating Through a Neon City",
    date: "2025-02-16",
    description: "I was soaring above a futuristic city filled with glowing neon signs. The buildings seemed alive, shifting and pulsating as I glided between them. I felt completely free, like gravity had no hold on me.",
    mood: "Euphoric",
    tags: ["Flying", "Futuristic", "Freedom"],
    image: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Lost in an Endless Library",
    date: "2025-02-15",
    description: "I found myself in a massive library with towering bookshelves stretching into infinity. Every book I pulled out contained my own past memories, but some were from lives I never lived.",
    mood: "Curious",
    tags: ["Books", "Mystery", "Exploration"],
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Chasing Shadows in a Foggy Forest",
    date: "2025-02-14",
    description: "A thick fog covered the forest as I ran through the trees. Strange figures darted between the trunks, always just out of reach. I wasn’t sure if they were leading me somewhere or trying to keep me lost.",
    mood: "Anxious",
    tags: ["Forest", "Chase", "Mystical"],
    image: "https://images.unsplash.com/photo-1506452305024-9d3f02d1c9b5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Underwater Kingdom of Glass",
    date: "2025-02-13",
    description: "I was able to breathe underwater as I explored an entire kingdom made of glass. The fish swam through the transparent walls, and the sunlight refracted into beautiful rainbow patterns everywhere.",
    mood: "Amazed",
    tags: ["Underwater", "Fantasy", "Peaceful"],
    image: "https://plus.unsplash.com/premium_photo-1661962709743-008dc4b4c83b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    title: "The Clockwork Carnival",
    date: "2025-02-12",
    description: "A carnival made entirely of gears and cogs stretched before me. The Ferris wheel ticked like a giant pocket watch, and the carousel spun backward in slow motion.",
    mood: "Intrigued",
    tags: ["Carnival", "Steampunk", "Surreal"],
    image: "https://images.unsplash.com/photo-1523113501336-6ea4a7d6660d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }
]

/*

  const SkeletonOne = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          House in the woods
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A serene and tranquil retreat, this house in the woods offers a peaceful
          escape from the hustle and bustle of city life.
        </p>
      </div>
    );
  };
  const SkeletonTwo = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          House above the clouds
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          Perched high above the world, this house offers breathtaking views and a
          unique living experience. It&apos;s a place where the sky meets home,
          and tranquility is a way of life.
        </p>
      </div>
    );
  };
  const SkeletonThree = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Greens all over
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
          perfect place to relax, unwind, and enjoy life.
        </p>
      </div>
    );
  };
  const SkeletonFour = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Rivers are serene
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A house by the river is a place of peace and tranquility. It&apos;s the
          perfect place to relax, unwind, and enjoy life.
        </p>
      </div>
    );
  };
  
  const cards = [
    {
      id: 1,
      content: <SkeletonOne />,
      className: "md:col-span-2",
      thumbnail:
        "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      content: <SkeletonTwo />,
      className: "col-span-1",
      thumbnail:
        "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      content: <SkeletonThree />,
      className: "col-span-1",
      thumbnail:
        "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      content: <SkeletonFour />,
      className: "md:col-span-2",
      thumbnail:
        "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
*/