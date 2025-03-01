"use client";
import React, { useEffect, useState } from "react";
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";
import { FaRegCircleXmark  } from "react-icons/fa6";
 
const loadingStates = [
  {
    text: "Initializing Dream Generator",
  },
  {
    text: "Checking Inputs",
  },
  {
    text: "Enhancing Dream Description",
  },
  {
    text: "Generating Dreamscape",
  },
  {
    text: "Saving Dreamscape",
  },
  {
    text: "Storing Dream Data",
  },
];

interface MultiStepLoaderProps {
  loading: boolean;
  progressStage: number;
  onClose: () => void;
}
 
export function MultiStepLoader({ loading, progressStage, onClose } : MultiStepLoaderProps) {  
  
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(loading);
  }, [loading]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {/* Core Loader Modal */}
      <Loader loadingStates={loadingStates} loadingState={progressStage} loading={open} />
 
      {open && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[120]"          
          onClick={onClose}
        >
          <FaRegCircleXmark className="h-10 w-10" />
        </button>
      )}
    </div>
  );
}