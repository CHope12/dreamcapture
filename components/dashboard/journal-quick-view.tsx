"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import React from "react";
import { JSX } from "react";
import { ContentCard } from "@/components/ui/content-card";
import { PlaceholdersAndVanishInputDemo } from "@/components/ui/placeholders-and-vanish-input";
import { FaFolderOpen, FaArrowRight, FaPenNib, FaBook } from "react-icons/fa";

import { Dream } from "@/lib/interfaces";
import { getDashboardEntries } from "@/lib/firebase";
import { Card, CardDescription, CardSkeletonContainer, CardTitle } from "../ui/feature-card";

export function JournalQuickView({ userId }: { userId : string} ) {

  const [entries, setEntries] = useState<Dream[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const dreams = await getDashboardEntries(userId);
      if (dreams.length > 4) {
        setEntries(dreams.slice(0, 4));
      } else {
        setEntries(dreams);
      }
    };
    fetchEntries();
  }, []);

  return (
    <>
      {/*
      <div className="flex justify-center">        
        <PlaceholdersAndVanishInputDemo />                                
      </div>
      */}
      <div className="flex overflow-x-auto gap-4 relative w-full">
        {entries.map(dream => (
          <Link key={dream.id} href="/journal" className="flex-shrink-0">
            <ContentCard               
              title={dream.title}
              date={dream.date}
              description={dream.description}
              mood={dream.mood}
              tags={dream.tags}
              image={dream.image}
            />
          </Link>
        ))}     
        {entries.length === 0 && <p className="text-center text-neutral-500">No Dream entries found... <Link href="/new-dream" className="text-black dark:text-white ml-2 font-semibold">Log a new dream</Link></p> }
        {entries.length > 0 && (
          <Link href="/journal" className="flex-shrink-0 w-[320px]">
          <Card className="w-full h-full p-12 pb-0">
            <CardSkeletonContainer>
              <div className="w-full h-full p-8">
                <FaBook className="w-full h-full group-hover:text-violet-500 text-neutral-500 transition-color duration-200" />
              </div>
            </CardSkeletonContainer>
            <CardTitle>Go To Journal</CardTitle>
            <CardDescription>
              Access your personal journal and revisit past entries.
            </CardDescription>
          </Card>
        </Link>
        )}
      </div>    

      {/*
      <div className="flex justify-center gap-16">
        <Link href="/new-dream">
          <div className="flex w-48 justify-center gap-2 p-8 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] hover:bg-[rgba(40,40,60,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] transition-all duration-300">
            <div className="flex gap-2 w-full justify-center">
              <FaPenNib className="text-2xl text-blue-500" />
              <h2 className="text-xl">New Entry</h2>
            </div>            
          </div>
        </Link>
        <Link href="/journal">
          <div className="flex w-48 justify-center gap-2 p-8 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] hover:bg-[rgba(60,40,60,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] transition-all duration-300">
            <div className="flex gap-2 w-full justify-center">
              <FaFolderOpen className="text-2xl text-violet-500" />
              <h2 className="text-xl">View All</h2>
            </div>            
          </div>
        </Link>
      </div>
      */}
    </>
  )
}