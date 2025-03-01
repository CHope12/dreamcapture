"use client";
import Link from "next/link";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Dream } from '@/lib/interfaces';
import { FaPenNib } from "react-icons/fa"
import { ExpandableCard } from "@/components/ui/expandable-card";
import { PlaceholdersAndVanishInputDemo } from "@/components/ui/placeholders-and-vanish-input";

import { User, getAuth, onAuthStateChanged } from "firebase/auth"
import { startApp, getDreamEntries } from "@/lib/firebase";

import { useRouter } from "next/navigation";

export default function Page(){

  //firebase  
  startApp();
  const [isLoading, setIsLoading] = useState(true)
  const [loading, setLoading] = useState(true)
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

  //dreams
  const [dreams, setDreams] = useState<Dream[]>([])
  useEffect(() => {    
    if(!user) return; 
    const fetchDreams = async () => {      
      const data = await getDreamEntries(user.uid) as { 
        id: string; 
        title: string; 
        date: string; 
        description: string; 
        mood?: string; 
        tags?: string[]; 
        image: string; 
      }[];      
      const formattedDreams: Dream[] = data.map(dream => ({
        id: (dream.id),
        title: dream.title,
        date: dream.date,
        description: dream.description,
        mood: dream.mood || '',
        tags: dream.tags || [],
        image: dream.image,
      }));
      setDreams(formattedDreams);
      setLoading(false);
    };

    fetchDreams();
  }, [user]);
  
  const [search, setSearch] = useState("");

  const handleSearch = (search: string) => {
    setSearch(search);
  }

  const [filteredDreams, setFilteredDreams] = useState<Dream[]>([]);

  useEffect(() => {
    //filter by title, description, mood, tags
    const filteredDreams = dreams.filter(dream => 
      dream.title.toLowerCase().includes(search.toLowerCase()) ||
      dream.description.toLowerCase().includes(search.toLowerCase()) ||
      dream.mood.toLowerCase().includes(search.toLowerCase()) ||
      dream.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredDreams(filteredDreams);
  }, [search])

  const resetSearch = () => {
    setSearch("");
    setFilteredDreams([]);
  }

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 md:rounded-tl-2xl md:border md:border-neutral-200 md:dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full min-h-screen items-center">
        <h1 className="text-4xl text-center w-full text-black dark:text-white mt-4 md:mt-0">Journal</h1>
        <div className="flex flex-col md:flex-row justify-center gap-4 items-center w-full max-w-2xl my-4">        
          <PlaceholdersAndVanishInputDemo onSearch={handleSearch}/>
          {filteredDreams.length > 0 && search !== "" && <button 
            className="flex items-center gap-2 h-full justify-center shadow-[0_4px_14px_0_rgb(123,44,191,39%)] hover:shadow-[0_6px_20px_rgba(123,44,191,23%)] hover:bg-[rgba(123,44,191,0.9)] px-8 py-2 bg-[#7b2cbf] rounded-md text-white transition duration-200 ease-linear" 
            onClick={resetSearch}>Reset
          </button>}
          <Link href="/new-dream" className="h-full">          
            <button 
              className="flex items-center gap-2 h-full justify-center shadow-[0_4px_14px_0_rgb(123,44,191,39%)] hover:shadow-[0_6px_20px_rgba(123,44,191,23%)] hover:bg-[rgba(123,44,191,0.9)] px-8 py-2 bg-[#7b2cbf] rounded-md text-white transition duration-200 ease-linear"
            >
              {/*<FaPenNib className="h-6 w-6 text-white text-xl" />*/}
              <span className="whitespace-nowrap">New Dream</span>
            </button>
        </Link>
        </div>        
        <ExpandableCard dreams={filteredDreams.length > 0 ? filteredDreams : dreams} />
      </div>
    </div>
  )
}
