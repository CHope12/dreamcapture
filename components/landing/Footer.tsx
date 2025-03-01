import Link from "next/link";
import { SiDreamstime } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#fefefe] dark:bg-[#151515] text-black dark:text-white text-center w-full h-[500px] relative border-t border-[#2a2a2a]">      
      <div className="absolute inset-0 flex flex-col justify-start items-center h-[50vh]">
        <div className="flex flex-col md:flex-row w-full max-w-5xl justify-around items-center md:items-start px-8 md:px-16 pt-[5vh] gap-8 md:gap-0">
          <div className="flex flex-col text-left gap-4">
            <Link href="/" className="flex items-center w-full justify-start gap-2"><SiDreamstime className="w-8 h-8" />DreamCapture</Link>
            <p className="text-sm text-[#8f8f8f]">© {new Date().getFullYear()} DreamCapture. All rights reserved.</p>
          </div>
          <div className="flex items-start justify-around w-full md:w-2/3">

            {/* Pages */}
            <div className="flex flex-col text-left gap-2">
              <p className="font-bold mb-2">Pages</p>
              <Link href="/" className="text-sm">Home</Link>
              <Link href="/features" className="text-sm">Dashboard</Link>
            </div>
            {/* Legal */}
            <div className="flex flex-col text-left gap-2">
              <p className="font-bold mb-2">Legal</p>
              <Link href="/privacy" className="text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-sm">Terms of Service</Link>
              <Link href="/cookies" className="text-sm">Cookies</Link>
            </div>            
            {/* Register */}
            <div className="flex flex-col text-left gap-2">
              <p className="font-bold mb-2">Register</p>
              <Link href="/register" className="text-sm">Sign Up</Link>
              <Link href="/login" className="text-sm">Login</Link>
              <Link href="/forgot" className="text-sm">Forgot Password</Link>
            </div>

          </div>          
        </div>        
        <h1 className="absolute bottom-8 text-[10vw] font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-[#e1e1e1] dark:from-[#0a0a0a] dark:to-[#2a2a2a] cursor-default">DreamCapture</h1>
        {/*
        <p className="text-lg mt-2">Your AI Dream Journal</p>
        <p className="text-lg mt-2">© {new Date().getFullYear()} DreamCapture. All rights reserved.</p>
        */}
      </div>

      {/*
      <p className="text-sm">
        © 2022 DreamCapture. All rights reserved.
      </p>
      */}
    </footer>
  );
}