import Link from "next/link"

import { Card, CardSkeletonContainer, CardTitle, CardDescription } from "@/components/ui/feature-card";
import { FaPenNib, FaBook, FaMagic, FaFire, FaEye } from "react-icons/fa"
import { IoAnalytics } from "react-icons/io5";

interface QuickActionsProps {
  streak: number;
}

/* Quick action cards
    New Dream Entry, 
    Generate Dreamscape, 
    View Journal 
    See streak
*/

export function QuickActions({streak} : QuickActionsProps) {
  return (
    <div className="flex gap-4 md:gap-8 relative h-32 md:h-[22rem] justify-center w-full">

      <Link href="/new-dream" className="group w-[calc(33.33%-1rem)] md:w-auto">
        <Card className="h-full w-full md:w-64 flex flex-col items-center justify-center md:block shadow-lg">
          <CardSkeletonContainer className="w-full h-[66.66%]">
            <div className="w-full h-full p-4 md:p-8 flex justify-center items-center">
              <FaPenNib className="w-full h-full group-hover:text-violet-500 text-neutral-500 transition-color duration-200" />
            </div>
          </CardSkeletonContainer>
          <CardTitle className="text-xs md:text-lg text-center md:text-left py-0 md:py-2 px-2 md:px-0">New Dream Entry</CardTitle>
          <CardDescription className="hidden md:block max-w-sm">
            Capture your nightly adventures and preserve your dreams forever.
          </CardDescription>
        </Card>
      </Link>

      <Link href="/journal" className="group w-[calc(33.33%-1rem)] md:w-auto">
        <Card className="h-full w-full md:w-64 flex flex-col items-center justify-center md:block shadow-lg">
          <CardSkeletonContainer className="w-full h-[66.66%]">
            <div className="w-full h-full p-4 md:p-8 flex justify-center items-center">
              <FaBook className="w-full h-full group-hover:text-violet-500 text-neutral-500 transition-color duration-200" />
            </div>
          </CardSkeletonContainer>
          <CardTitle className="text-xs md:text-lg text-center md:text-left py-0 md:py-2 px-2 md:px-0">View <br className="md:hidden" /> Journal</CardTitle>
          <CardDescription className="hidden md:block max-w-sm">
          Revisit your dream journal and reflect on past dreams.
          </CardDescription>
        </Card>
      </Link>

      <Link href="/explore" className="group w-[calc(33.33%-1rem)] md:w-auto">
        <Card className="h-full w-full md:w-64 flex flex-col items-center justify-center md:block shadow-lg">
          <CardSkeletonContainer className="w-full h-[66.66%]">
            <div className="w-full h-full p-4 md:p-8 flex justify-center items-center">
              <FaEye className="w-full h-full group-hover:text-violet-500 text-neutral-500 transition-color duration-200" />
            </div>
          </CardSkeletonContainer>
          <CardTitle className="text-xs md:text-lg text-center md:text-left py-0 md:py-2 px-2 md:px-0">Explore Dreamscapes</CardTitle>
          <CardDescription className="hidden md:block max-w-sm">
            View community dreams and explore stunning AI visuals.
          </CardDescription>
        </Card>
      </Link>

      {/*
      <Link href="/dreamscapes" className="group">
        <Card className="h-full w-64">
          <CardSkeletonContainer>
            <div className="w-full h-full p-8">
              <FaMagic className="w-full h-full group-hover:text-violet-500 transition-color duration-200" />
            </div>
          </CardSkeletonContainer>
          <CardTitle>Generate Dreamscape</CardTitle>
          <CardDescription>
            Transform your dreams into stunning AI-generated visuals.
          </CardDescription>
        </Card>
      </Link>
      */}

      {/*
      <Link href="/insights" className="group">
        <Card className="h-full w-64">
          <CardSkeletonContainer>
            <div className="w-full h-full p-8">
              <IoAnalytics className="w-full h-full group-hover:text-green-500 transition-color duration-200" />
            </div>
          </CardSkeletonContainer>
          <CardTitle>View Insights</CardTitle>
          <CardDescription>
            Discover patterns and insights from your dream journal.
          </CardDescription>
        </Card>
      </Link>
      */}
      
      {/*
      <Card className="h-full w-64 group">
        <CardSkeletonContainer>
          <div className="w-full h-full p-8">
            <FaFire className="w-full h-full group-hover:text-orange-500 transition-color duration-200" />
          </div>
        </CardSkeletonContainer>
        <CardTitle>You're on a roll!</CardTitle>
        <CardDescription>
          Your current streak is {streak} for daily dreams logged.
        </CardDescription>
      </Card>
      */}

    </div>    
  )
}
