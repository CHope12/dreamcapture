import Link from "next/link";
import React from "react";
import { JSX } from "react";
import { Card, CardSkeletonContainer, CardTitle, CardDescription } from "@/components/ui/feature-card";
import { FaMagic, FaEye } from "react-icons/fa";
import { LayoutGrid } from "@/components/ui/layout-grid";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

interface DreamscapeQuickViewProps {
  cards: Card[];
}

export const DreamscapeQuickView: React.FC<DreamscapeQuickViewProps> = ({ cards }) => {
  return (
    <div className="h-[50vh] w-full flex">        
    <Link href="/dreamscapes" className="group">
      <Card className="h-full w-64">
        <CardSkeletonContainer>
          <div className="w-full h-[30vh] p-8">
            <FaMagic className="w-full h-full group-hover:text-violet-500 text-neutral-500 transition-color duration-200" />
          </div>
        </CardSkeletonContainer>
        <CardTitle>Generate Dreamscape</CardTitle>
        <CardDescription>
          Transform your dreams into stunning AI-generated visuals.
        </CardDescription>
      </Card>
    </Link>

    <div className="w-full">      
      <LayoutGrid cards={cards} />      
    </div>
    
    <Link href="/dreamscapes" className="group">
      <Card className="h-full w-64 min-w-64">
        <CardSkeletonContainer>
          <div className="w-full h-[30vh] p-8">
            <FaEye className="w-full h-full group-hover:text-violet-500 text-neutral-500 transition-color duration-200" />
          </div>
        </CardSkeletonContainer>
        <CardTitle>View All Dreamscapes</CardTitle>
        <CardDescription>
          Explore and revisit your dream worlds.
        </CardDescription>
      </Card>     
    </Link>       
  </div>
  );
}