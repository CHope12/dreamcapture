import Link from "next/link";
import { ParallaxScrollDemo } from "@/components/dreamscapes/grid-parallax-scroll";
import { FaMagic } from "react-icons/fa";

import { PlaceholdersAndVanishInputDemo } from "@/components/ui/placeholders-and-vanish-input";

export default function Page() {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full items-center max-h-[calc(100dvh-2px)]">        
        <h1 className="text-4xl">Dreamscapes</h1>
        <div className="flex justify-center gap-4 items-center w-full max-w-2xl my-4">        
          {/*<PlaceholdersAndVanishInputDemo />                                */}
          <Link href="/new-dream">
            <div className="flex w-60 justify-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] hover:bg-[rgba(40,40,60,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] transition-all duration-300">
              <div className="flex gap-2 w-full justify-center items-center">
                <FaMagic className="text-2xl text-violet-500" />
                <h2 className="text-xl">New Dreamscape</h2>
              </div>            
            </div>
          </Link>
        </div>    
        <ParallaxScrollDemo />
      </div>
    </div>
  )
}