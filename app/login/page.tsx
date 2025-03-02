"use client"
import Link from "next/link";
import { useState, useEffect, useRef } from "react"
import { startApp, signIn, subscribeToAuthChanges, signInWithFacebook, signInWithGoogle } from "@/lib/firebase"

import { SiDreamstime } from "react-icons/si"
import { FaGoogle, FaFacebookF  } from "react-icons/fa"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"

import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { DefaultInput } from "@/components/ui/input";
import { getAuth,onAuthStateChanged, User } from "firebase/auth";

declare global {
  interface Window {
    fbAsyncInit: () => void;
  }
}

export default function Page(){  

  //firebase  
  startApp();
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<null | User>(null)    

  const router = useRouter();

  useEffect(() => {
    const auth = getAuth()
    return onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      setUser(user);
      if(user) router.push("/dashboard");
    });
  }, []);


  const handleGoogleLogin = async () => {
    try {      
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (error) {
      alert("Google Login Error:" + error);
    }
  }

  const handleFacebookLogin = async () => {
    try {
      await signInWithFacebook();
      router.push("/dashboard");
    } catch (error) {
      alert("Facebook Login Error:" + error);
    }
  }


  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [emailMessage, setEmailMessage] = useState<string>("");

  const handleEmailLogin = async () => {
    if (!emailRef.current || !passwordRef.current) return;
    if (!emailRef.current.value) {
      setEmailMessage("Please enter an email address");
      return;
    }
    if (!passwordRef.current.value) {
      setEmailMessage("Please enter a password");
      return;
    }
    try {
      await signIn(emailRef.current.value, passwordRef.current.value);
      router.push("/dashboard");
    } catch (error) {
      alert("Email Login Error:" + error);
      setEmailMessage("There was an error logging in with email and password");
    }
  }

  const [emailLogin, setEmailLogin] = useState(false);
  
  const handleEmailSwitch = () => {
    setEmailLogin(true);
  }


  return (
    <div className="flex w-full h-[100dvh] justify-center items-center bg-black text-white">
      <div className="flex w-[400px] flex-col items-center z-10">
        <div className="flex items-center gap-2 text-lg"><SiDreamstime className="text-3xl"/>DreamCapture</div>
        <h1 className="text-3xl mt-4 font-bold">Sign in to your account</h1>   
        {!emailLogin && (
          <>
            <div className="flex w-full flex-col md:flex-row justify-center gap-2 mt-4">
              <div 
                onClick={handleFacebookLogin}
                className="cursor-pointer rounded-lg bg-[#262627] hover:bg-[#262627]/80 py-3 flex items-center justify-center gap-2 w-full text-sm"
              >
                <FaFacebookF /> Login with Facebook
              </div>
              <div 
                onClick={handleGoogleLogin}
                className="cursor-pointer rounded-lg bg-[#262627] hover:bg-[#262627]/80 py-3 flex items-center justify-center gap-2 w-full text-sm"
              >
                <FaGoogle /> Login with Google
              </div>
            </div>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full flex justify-center items-center" />
            <div 
              onClick={handleEmailSwitch}
              className="cursor-pointer rounded-lg bg-white hover:bg-white/80 w-full h-12 text-black flex items-center justify-center">
              Continue with Email
            </div>
          </>
        )}
        {emailLogin && (
          <div className="mt-8 w-full">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <DefaultInput ref={emailRef} id="email" placeholder="projectmayhem@fc.com" type="email" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <DefaultInput ref={passwordRef} id="password" placeholder="••••••••" type="password" />
            </LabelInputContainer>
            <div 
              onClick={handleEmailLogin}
              className="mt-8 cursor-pointer rounded-lg bg-white hover:bg-white/80 w-full h-12 text-black flex items-center justify-center">
              Continue with Email
            </div>         
            {emailMessage !== "" && (                
              <p className="text-red-500 mt-4">{emailMessage}</p>
            )}
          </div>
        )}        
        <p className="text-neutral-400 mt-4">Don't have an account? <Link href="/signup" className="text-white">Sign up</Link></p>
      </div>        
      <ShootingStars />
      <StarsBackground />      
    </div>
  )
}

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
