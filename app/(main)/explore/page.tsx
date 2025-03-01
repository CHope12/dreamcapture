import Link from "next/link";
import { ParallaxScrollDemo } from "@/components/dreamscapes/grid-parallax-scroll";
import { FaMagic } from "react-icons/fa";

import { PlaceholdersAndVanishInputDemo } from "@/components/ui/placeholders-and-vanish-input";

export default function Page() {
  return (
    <div className="flex flex-1">
      <div className="p-2 py-0 md:p-10 md:py-0 md:rounded-tl-2xl md:border md:border-neutral-200 md:dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full items-center max-h-[calc(100dvh-2px)] text-black dark:text-white relative">
        <div className="absolute h-24 flex flex-col justify-center items-center w-full max-w-2xl z-10 bg-linear-to-t">
          <h1 className="text-4xl mb-8 mt-4 md:mt-0">Explore Dreamscapes</h1>          
          {/*<PlaceholdersAndVanishInputDemo />*/}
        </div>
          <ParallaxScrollDemo />
      </div>
    </div>
  )
}
