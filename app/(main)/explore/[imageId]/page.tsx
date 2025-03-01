"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import ThreeSceneExplore from '@/components/ThreeSceneExplore';

export default async function ImagePage({ params }: {params: Promise<{imageId: string}> }) {
  
  const { imageId } = await params;  

  return (
    <div className="flex flex-1">
      <div className="relative w-full h-full">
        <div className="absolute top-4 left-4">
          <Link
            href="/explore"
            className="mt-2 self-end shadow-[0_4px_14px_0_rgb(0,0,0,39%)] hover:shadow-[0_6px_20px_rgba(0,0,0,23%)] hover:bg-[#383838] px-8 py-2 bg-[#262626] rounded-md text-white font-light transition duration-200 ease-linear w-fit"
          >
            Back
          </Link>
        </div>
        {imageId && (<ThreeSceneExplore imageId={imageId} />)}
      </div>
    </div>
  )
}
