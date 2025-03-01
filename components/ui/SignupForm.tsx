"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { DefaultInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FaGithub, FaGoogle } from "react-icons/fa"
import Link from "next/link";
import { signInWithGoogle, startApp, signUp } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstName = (e.target as HTMLFormElement).firstname.value;
    const lastName = (e.target as HTMLFormElement).lastname.value;
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;
    try {
      await signUp(firstName, lastName, email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Sign Up Error:", error);
    }
  };
  
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {      
      startApp();
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input">      
      <h1 className="text-white text-2xl font-bold my-8 max-w-sm">
        Sign up for an account
      </h1>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <DefaultInput id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <DefaultInput id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <DefaultInput id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <DefaultInput id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up
          <BottomGradient />
        </button>

        <p className="text-[#A3A3A3] text-sm flex items-center gap-1 justify-center pt-4">
          Already have an account? 
          <Link href="/login" className="text-white">Sign in</Link>
        </p>

        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full flex justify-center items-center">
          <p className="text-[#A3A3A3] text-sm text-center bg-[#0A0A0A] px-2">Or continue with</p>
        </div>

        <div className="flex flex-col space-y-4 mt-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            onClick={handleGoogleLogin}
          >
            <FaGoogle className="h-4 w-4 text-neutral-700" />
            <span className="text-neutral-700 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>

        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
