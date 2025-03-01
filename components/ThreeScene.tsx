"use client"; // Ensure it runs only on the client-side

import { useState, useEffect, useRef } from "react";
import Sketch from "@/components/sketch"; 
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { startApp, db } from "@/lib/firebase";

const ThreeScene = ({ dreamId }: {dreamId: string}) => {
  const containerRef = useRef(null);

  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  startApp();
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<null | User>(null)    

  useEffect(() => {
    const auth = getAuth()
    return onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (!dreamId) {      
      console.log("No dream ID provided");
      return;
    }

    const fetchImage = async () => {
      if (!user || !dreamId) return;
      try {
        const dreamRef = doc(db, `dreams/${user.uid}/dreamEntries/${dreamId}`);
        const dreamSnap = await getDoc(dreamRef);

        if (!dreamSnap.exists()) {
          console.log("Dream not found");
          return;
        }

        const dreamData = dreamSnap.data();
        
        if (!dreamData.image) {
          console.log("Dream has no image");
          return;
        }

        setImage(dreamData.image);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching dream:", err);                
      }
    };

    fetchImage();
  }, [dreamId, user]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (image === "") return;
    const sketch = new Sketch({
      dom: containerRef.current,
      image: image, // Pass the image URL
    });

    return () => {
      if (sketch) {
        sketch.cleanup();
      }
    };
    
  }, [image]);

  return <div ref={containerRef} className="w-full h-screen" />;
};

export default ThreeScene;