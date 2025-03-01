"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMagic, FaBook, FaEye, FaUsers } from "react-icons/fa";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function LandingPage() {
  return (
    <div className="min-h-screen text-black dark:text-white flex flex-col items-center justify-center p-6 relative mt-24 md:mt-0">
      <BackgroundBeams />
      <div className="w-full h-full z-10 flex flex-col justify-center items-center">
        <motion.h1 
          className="text-5xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          DreamCapture: Your AI Dream Journal
        </motion.h1>

        <motion.p 
          className="text-lg text-center max-w-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Capture your dreams with AI-generated 360° visuals. Share your dreamscapes and explore those of others.
        </motion.p>

        <div className="flex gap-6">
          <Link href="/dashboard" className="shadow-[0_4px_14px_0_rgb(123,44,191,39%)] hover:shadow-[0_6px_20px_rgba(123,44,191,23%)] hover:bg-[rgba(123,44,191,0.9)] px-8 py-2 bg-[#7b2cbf] rounded-md text-white font-light transition duration-200 ease-linear flex justify-center items-center">
            Get Started
          </Link>
          <a href="#info" className="bg-transparent border border-black dark:border-white px-6 py-3 rounded-lg text-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-100">
            Learn More
          </a>          
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl text-center">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: <FaBook size={32} />, 
    title: "Dream Journaling", 
    description: "Effortlessly record your dreams and track recurring themes.",
    delay: 0.3,
  },
  {
    icon: <FaMagic size={32} />, 
    title: "AI Dream Generation", 
    description: "Turn your dreams into stunning AI-generated 360° visuals.",
    delay: 0.5,
  },
  {
    icon: <FaEye size={32} />, 
    title: "Insights & Interpretation", 
    description: "Gain AI-powered insights into hidden meanings in your dreams.",
    delay: 0.7,
  },
  {
    icon: <FaUsers size={32} />, 
    title: "Community Sharing", 
    description: "Share your dreams and explore those of others in a vibrant community.",
    delay: 0.9,
  },
];

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div 
      className=" bg-[#eaeaea] dark:bg-[#171717] p-6 rounded-2xl backdrop-blur-lg border border-black dark:border-neutral-600 border-opacity-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
    >
      <div className="text-violet-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-[#afafaf] text-pretty mb-2">{description}</p>
    </motion.div>
  );
}
