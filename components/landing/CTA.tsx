import Image from 'next/image';
import Link from "next/link";

export default function CTA() {
  return (
    <div className="w-full flex justify-center">              
      <div 
        className="w-full max-w-4xl flex jusify-center items-center h-64 md:h-96 relative rounded-2xl animated-border mx-8"
      >          
        <div 
          className="absolute w-[calc(100%-0.475rem)] h-[calc(100%-0.5rem)] bg-black rounded-2xl m-1" 
          style={{
            backgroundImage: `url(./noise.webp)`,
            backgroundSize: "200px"          
  
          }}
          
        />

        <div className="absolute w-[calc(100%-0.475rem)] h-[calc(100%-0.5rem)] flex justify-center items-center rounded-2xl z-20 bg-[#ffffff] dark:bg-black bg-opacity-80 dark:bg-opacity-80 m-1"
        >
          <div className="w-full md:w-[calc(55%)] flex flex-col h-full justify-around px-4 py-4 md:px-16 md:py-12 text-black dark:text-white">
            <h1 className="text-xl md:text-4xl font-bold">Ready to try DreamCapture?</h1>
            <p>Get instant access to our state of the art project</p>
            {/*
            <div className="bg-[#5a189a] text-white px-8 py-4 rounded-lg mt-4">Get Started</div>            
            <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">Shimmer</button>
            */}
            <Link href="/dashboard" className="shadow-[0_4px_14px_0_rgb(123,44,191,39%)] hover:shadow-[0_6px_20px_rgba(123,44,191,23%)] hover:bg-[rgba(123,44,191,0.9)] px-8 py-2 bg-[#7b2cbf] rounded-md text-white font-light transition duration-200 ease-linear w-fit">
              Get Started
            </Link>
          </div>
          <div className="w-[45%] hidden md:flex gap-4 h-full">
            <div className="w-1/2 flex justify-center items-center p-4 relative">
            {/*
              <Image
                src="https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Urban Dreams"
                fill
              />
              */}
            </div>
            <div className="w-1/2 h-[90%] self-end hidden md:flex justify-center items-center p-4 relative">
            {/*
              <Image
                className="rounded-tl-lg rounded-br-2xl"
                src="https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Urban Dreams"
                fill
              />
              */}
            </div>
          </div>
        </div>       
      </div>
    </div>
  )
}