import { SignupForm } from "@/components/ui/SignupForm"
import { SiDreamstime } from "react-icons/si"

export default function Page(){
  return (
    <div className="flex w-full h-screen">      
      <div className="w-1/2 h-full bg-[#171717] py-4">
        <WidthDots />
        <div className="w-full h-[calc(100%-10px)] flex justify-between px-8">
          <HeightDots />
          <div className="flex flex-col w-full items-start justify-between px-12 py-12">
            <h2 className="font-bold text-xl text-neutral-200 flex items-center gap-2">
              <SiDreamstime />DreamCapture
            </h2>
            <div>
              <p className="text-white text-xl text-balance">“DreamCapture is incredible! It not only helps me track my dreams but also generates stunning AI visuals that bring them to life. A must-have for dream journaling!”</p>
              <p className="text-white text-lg py-2">Alex R.</p>
            </div>
          </div>
          <HeightDots />          
        </div>
        <WidthDots />     
      </div>
      <div className="w-1/2 bg-[#0A0A0A] h-full flex items-center">
        <SignupForm />
      </div>
    </div>
  )
}

const WidthDots = () => {
  return (
    <div 
      className="w-full h-[5px]"
      style={{
        background: "#171717",
        backgroundImage: "radial-gradient(#3A3A3A 1px, transparent 0)",
        backgroundSize: "5px 5px",
        maskImage: "linear-gradient(to right, transparent, #171717 5%, #171717 95%, transparent)", 
        WebkitMaskImage: "linear-gradient(to right, transparent, #171717 5%, #171717 95%, transparent)", 
      }}
    />
  )
}

const HeightDots = () => {
  return (
    <div 
      className="h-full w-[5px]"
      style={{
        background: "#171717",
        backgroundImage: "radial-gradient(#3A3A3A 1px, transparent 0)",
        backgroundSize: "5px 5px",
        maskImage: "linear-gradient(to bottom, transparent, #171717 5%, #171717 95%, transparent)", 
        WebkitMaskImage: "linear-gradient(to bottom, transparent, #171717 5%, #171717 95%, transparent)", 
      }}
    />
  )
}