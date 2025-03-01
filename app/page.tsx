import Image from "next/image";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import Landing from "@/components/landing/Landing";
import Info from "@/components/landing/Info";
import Testimonials from "@/components/landing/Testimonials";
import Gallery from "@/components/landing/Gallery";
import FAQ from "@/components/landing/FAQ";
import Pricing from "@/components/landing/Pricing";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import { SiDreamstime } from "react-icons/si";

export default function Home() {
  return (    
      <main className="flex flex-col gap-48 bg-[#fefefe] dark:bg-[#151515]">
        <div className="fixed top-0 left-0 w-[100vw] max-w-[100vw] overflow-hidden h-24 flex justify-between pl-8 pr-8 md:pr-16 items-center z-[500] text-black dark:text-white ">
          <Link href="/" className="text-xl flex justify-center items-center gap-2">
            <SiDreamstime className="w-10 h-10"/>
          </Link>
          <div className="flex items-center gap-2 md:gap-6">
            <DarkModeToggle />
            <Link href="/login" className="flex justify-center items-center">
              Login
            </Link>
          </div>
        </div>
        {/* Hero / Features*/}
        <Landing />
        {/* How it works */}
        <Info />
        {/* Testimonials */}      
        <Testimonials />
        {/* Gallery */}
        <Gallery />
        {/* FAQ */}
        <FAQ />
        {/* Pricing / Subscription Plans */}
        <Pricing />
        {/* CTA */}
        <CTA />
        {/* Footer */}
        <Footer />
      </main>
  );
}
