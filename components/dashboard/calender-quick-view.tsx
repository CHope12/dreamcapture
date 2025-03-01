"use client";
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import Link from 'next/link';
import { getDreamEntries } from "@/lib/firebase";

import { Dream } from "@/lib/interfaces";

export function CalendarQuickView({ userId }: { userId: string }) {
  const [month, setMonth] = useState<Date>(new Date());
  const [selected, setSelected] = useState<Date>();

  const [entries, setEntries] = useState<Dream[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const rawDreams = await getDreamEntries(userId) as {
        id: string;
        title?: string;
        date?: string;
        description?: string;
        mood?: string;
        tags?: string[];
        image?: string;
      }[];
      const formattedDreams: Dream[] = rawDreams.map(dream => ({
        id: dream.id,
        title: dream.title || '',
        date: dream.date || new Date().toISOString(),
        description: dream.description || '',
        mood: dream.mood || '',
        tags: dream.tags || [],
        image: dream.image || ''
      }));
      setEntries(formattedDreams);
    };
    fetchEntries();
  }, []);  

  const [selectedDayDreams, setSelectedDayDreams] = useState<Dream[]>([]);
  const [allDates, setAllDates] = useState<Date[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);


  //entry.date = 2025-02-28T18:19:59.519Z

  useEffect(() => {

    setSelectedDayDreams(entries.filter(dream => dream.date.split('T')[0] === selected?.toISOString().split('T')[0]));

    setAllDates(entries.map(dream => new Date(dream.date)));

    //available dates arent found
    const unavailable = Array.from({ length: 31 }, (_, i) => 
      new Date(month.getFullYear(), month.getMonth(), i + 1)
    ).filter(date => !entries.some(dream => dream.date.split('T')[0] == date.toISOString().split('T')[0]));

    setUnavailableDates(unavailable);
  }, [entries, selected, month]);



  return (    
    <div className="flex w-full justify-around gap-8 max-md:flex-col max-md:justify-center max-md:items-center">
      <DayPicker
        mode="single"
        selected={selected}        
        onSelect={setSelected}
        onMonthChange={setMonth}
        className="rounded-lg border-opacity-20 shadow-md w-fit h-fit bg-[#151515] relative text-black dark:text-white"
        classNames={{
          nav: "absolute w-full flex justify-between pt-[1rem] px-8",
          chevron: "fill-violet-800",
          month_caption: "bg-[#18181B] text-gray-100 rounded-t-lg p-4 flex justify-center items-center font-bold",
          month_grid: "bg-neutral-100 dark:bg-[#0b0b0b] rounded-lg",
          weekdays: "bg-[#18181B] text-[#6E6E77]",
          day: "rounded-lg transition duration-200 p-3 text-center",
          selected: "bg-[#7b2cbf] text-[#ECEDEE]",      
          today: "text-black dark:text-white",         
          disabled: "text-neutral-300 dark:text-[#18181B]",
        }}
        disabled={unavailableDates}
      />
      <div className="md:w-2/3 flex flex-col gap-4 max-h-[50vh] overflow-y-auto">
        {selectedDayDreams.map(dream => (
          <DreamCard key={dream.id} {...dream} />
        ))}
        {selected && selectedDayDreams.length === 0 && (
          <div className="text-center text-gray-500">
            No dreams recorded for this date
          </div>
        )}
      </div>      
    </div>
  );
}

function DreamCard({ id, title, date, description, mood, tags }: Dream) {
  return (
    <div className="flex flex-col w-full p-4 bg-black/5 dark:bg-white/5 backdrop-blur-lg border border-white/20 rounded-lg transition-colors duration-200">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">{title}</h1>
        <p className="text-blac dark:text-white">{date.split('T')[0]}</p>
      </div>
      <p className="text-[#6E6E77]">{description}</p>
      <div className="flex max-md:flex-col max-md:gap-2 justify-between items-center">
        <p className="text-black dark:text-white max-md:mt-2">{mood}</p>
        <div className="flex gap-2">
          {tags.map(tag => (
            <span 
              key={tag} 
              className="text-gray-100 bg-violet-900 px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}