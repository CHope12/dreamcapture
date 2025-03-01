"use client";
import { useEffect, useState } from "react";
import { startApp, logOut, auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

export default function Page() {

  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<null | User>(null)

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
    })
  }, [])

  const router = useRouter();

  try {
    logOut();
    router.push("/login");
  } catch (error) {
    //console.error("Logout Error:", error);
    router.push("/login");
  }

  return <div className="absolute w-full h-full bg-white dark:bg-black" />
}