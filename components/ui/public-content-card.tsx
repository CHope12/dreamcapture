"use client";

import { Dream } from "@/lib/interfaces";
import { User } from "firebase/auth";

import { FaUser } from "react-icons/fa";

import { cn } from "@/lib/utils";
import Image from "next/image";


export function PublicContentCard({dream, user}: {dream: Dream, user: User}) {

  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          "bg-[url(https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80)] bg-cover"
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
          {user.photoURL ? (
            <Image
              height="100"
              width="100"
              alt="Avatar"
              src={user.photoURL}
              className="h-10 w-10 rounded-full border-2 object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full border-2 border-white/20 shadow-md backdrop-blur-xl flex justify-center items-center hover:border-violet-500 cursor-pointer transition-colors duration-100">
              <FaUser className="w-full h-full m-[0.66rem] text-gray-400" />
            </div>
          )}
          
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">
              {user.displayName}
            </p>
            <p className="text-sm text-gray-400 cursor-pointer hover:text-violet-500">@{user.uid}</p>
          </div>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            {dream.title}
          </h1>
          <p className="font-normal text-sm text-gray-100 relative z-10 my-4">
            {dream.description.length > 120 ? dream.description.slice(0, 120) + "..." : dream.description}
          </p>
        </div>
      </div>
    </div>
  )
}