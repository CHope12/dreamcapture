"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  characterLimit?: number;
}

export interface BigInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  wordLimit?: number;
}

//const WORD_LIMIT = 500; // Set the word limit

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, characterLimit, ...props }, ref) => {
    const radius = 100; // Adjust hover effect radius
    const [visible, setVisible] = React.useState(false);
    const [charCount, setCharCount] = React.useState(0);
    const CHAR_LIMIT = characterLimit || 50; // Set the character limit

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              var(--violet-500),
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input w-full relative"
      >
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              `w-full min-h-[40px] resize-none overflow-hidden border border-transparent bg-neutral-100 dark:bg-zinc-800 text-black dark:text-white 
              shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent 
              placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
              focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
              disabled:cursor-not-allowed disabled:opacity-50
              dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
              transition-all duration-200`,
              className
            )}
            onInput={(e) => {
              const value = e.currentTarget.value;
              setCharCount(value.length);
            }}
            {...props}
          />

          {/* Character Counter */}
          <div className="absolute bottom-3 right-3 text-xs text-gray-500 dark:text-gray-400">
            {charCount} / {CHAR_LIMIT}
          </div>
        </div>
      </motion.div>
    );
  }
);
Input.displayName = "Input";

const BigInput = React.forwardRef<HTMLTextAreaElement, BigInputProps>(
  ({ className, wordLimit, ...props }, ref) => {
    const radius = 100; // Adjust hover effect radius
    const [visible, setVisible] = React.useState(false);
    const [wordCount, setWordCount] = React.useState(0);
    const WORD_LIMIT = wordLimit || 500; // Set the word limit
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    // Adjusts the textarea height dynamically & limits words
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const words = e.target.value.trim().split(/\s+/).filter(Boolean);
      if (words.length <= WORD_LIMIT) {
        setWordCount(words.length);
      } else {
        e.target.value = words.slice(0, WORD_LIMIT).join(" "); // Prevent exceeding the limit
      }

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              var(--violet-500),
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input w-full relative"
      >
        <textarea
          ref={(el) => {
            textareaRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          className={cn(
            `w-full min-h-[40px] resize-none overflow-hidden border border-transparent bg-neutral-100 dark:bg-zinc-800 text-black dark:text-white 
            shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent 
            placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
            focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
            disabled:cursor-not-allowed disabled:opacity-50
            dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
            group-hover/input:shadow-none transition-all duration-200`,
            className
          )}
          onInput={handleInput}
          {...props}
        />

        {/* Word Counter */}
        <div className="absolute bottom-3 right-3 text-xs text-gray-500 dark:text-gray-400">
          {wordCount} / {WORD_LIMIT}
        </div>
      </motion.div>
    );
  }
);
BigInput.displayName = "Input";
 
export interface DefaultInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
 
const DefaultInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);
 
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);
 
    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();
 
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--violet-500),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        <input
          type={type}
          className={cn(
            `flex h-10 w-full border-none bg-zinc-800 text-neutral-400 shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400
           `,
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);
DefaultInput.displayName = "Input";


export { Input, BigInput, DefaultInput };