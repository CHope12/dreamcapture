"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";
import { Dream, User } from '@/lib/interfaces';

import { FaUser, FaUsers, FaClock, FaChartLine } from 'react-icons/fa';
import { PublicContentCard } from "@/components/ui/public-content-card";

import { Card, CardSkeletonContainer, CardTitle, CardDescription } from "@/components/ui/feature-card";

import { getDashboardDreams } from "@/lib/firebase";

interface ExploreQuickViewProps {
  popularDreamscapes: Dream[];
  popularUsers: User[];
}

export function ExploreQuickView() {

  const [latestDreams, setLatestDreams] = useState<any[]>([]);

  useEffect(() => {
    const fetchLatestDreams = async () => {
      const dreams = await getDashboardDreams();      
      setLatestDreams(dreams);
    };
    fetchLatestDreams();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8">      

    {/*
      <h1 className="text-2xl -mb-4">Popular Dreamscapes</h1>
      <div className="flex gap-4 items-center">
        {popularDreamscapes.map(dream => (
          <PublicContentCard key={dream.id} dream={dream} user={popularUsers[0]} />
        ))}
        <Link href="/explore/popularDreamscapes" className="w-full h-full max-w-xs">
          <Card className="w-full h-full">
            <CardSkeletonContainer>
              <div className="w-full h-full p-8">
                <FaChartLine className="w-full h-full group-hover:text-violet-500 text-neutral-500 transition-color duration-200" />
              </div>
            </CardSkeletonContainer>
            <CardTitle>Popular Dreamscapes</CardTitle>
            <CardDescription>
              Explore popular community dreamscapes
            </CardDescription>
          </Card>
        </Link>
      </div>
    */}
    
      {/*<h1 className="text-2xl -mb-4">Latest Dreamscapes</h1>*/}
        <div className="flex gap-4 items-center overflow-x-auto pb-4">
          {latestDreams.length > 0 && latestDreams.map(dream => (
            <Link href={`/explore/${dream.id}`} key={dream.id} className="flex-shrink-0 w-[320px] h-[380px] relative rounded-md overflow-hidden group">
              <div className="absolute z-10 bg-black bg-opacity-0 group-hover:bg-opacity-20 w-full h-full transition duration-200" />
              <Image src={dream.url} alt={dream.id} fill objectFit={"cover"} />
            </Link>
            /*<PublicContentCard key={dream.id} dream={dream} user={popularUsers[0]} />*/
          ))}
        <Link href="/explore" className="flex-shrink-0 w-[320px] h-full p-8 pl-0 md:p-0">
          <Card className="w-full h-full p-12">
            <CardSkeletonContainer>
              <div className="w-full h-full p-8">
                <FaClock className="w-full h-full group-hover:text-violet-500 text-neutral-500 transition-color duration-200" />
              </div>
            </CardSkeletonContainer>
            <CardTitle>Latest Dreamscapes</CardTitle>
            <CardDescription>
              Explore the latest community dreamscapes
            </CardDescription>
          </Card>
        </Link>
      </div>        
      
      {/*
      <h1 className="text-2xl -mb-4">Popular Dreamers</h1>
      <div className="flex gap-4 w-full items-start">
        {popularUsers.map(user => (
          <ProfileCard key={user.id} {...user} />
        ))}
        <Link href="/explore/popularUsers" className="w-full h-full">
          <Card className="w-full h-full">
            <CardSkeletonContainer>
              <div className="w-full h-full p-8">
                <FaUsers className="w-full h-full group-hover:text-green-500 transition-color duration-200" />
              </div>
            </CardSkeletonContainer>
            <CardTitle>Popular Dreamers</CardTitle>
            <CardDescription>
              Put something here
            </CardDescription>
          </Card>
        </Link>
      </div>      
      */}

    </div>
  );
}

const ProfileCard = (user: User) => {

  return (
    <div className="max-w-sm p-6 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]">
      {/* Profile Image */}
      <div className="flex justify-center">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        ) : (
          <div className="w-24 h-24 rounded-full border-2 border-white/20 shadow-md backdrop-blur-xl flex justify-center items-center p-6 hover:border-violet-500 cursor-pointer transition-colors duration-100">
            <FaUser className="w-full h-full text-gray-400" />
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-300">@{user.username}</p>
        <p className="text-sm text-gray-400 mt-1">Joined {user.joinedDate}</p>
      </div>

      {/* Stats */}
      <div className="flex justify-around mt-6 text-center">
        <div>
          <p className="text-lg font-semibold">{user.dreamCount}</p>
          <p className="text-sm text-gray-300">Dreams</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{user.followers}</p>
          <p className="text-sm text-gray-300">Followers</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{user.following}</p>
          <p className="text-sm text-gray-300">Following</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
          Follow
        </button>
        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg">
          Message
        </button>
      </div>
    </div>
  );
};