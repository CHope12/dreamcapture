"use client"; // Ensure it runs only on the client-side

import { useState, useEffect, useRef } from "react";
import Sketch from "@/components/sketch"; 
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const ThreeSceneExplore = ({ imageId }: {imageId: string}) => {
  const containerRef = useRef(null);

  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imageId) {      
      console.log("No image ID provided");
      return;
    }

    const fetchImage = async () => {
      try {
        const storage = getStorage();
        const imageRef = ref(storage, `dreams/${imageId}`);
        const url = await getDownloadURL(imageRef);
        setImage(url);
      } catch (err: any) {
        console.error("Error fetching Image:", err);                  
      }
    };

    fetchImage();
  }, [imageId]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (image === "") return;
    const sketch = new Sketch({
      dom: containerRef.current,
      image: image, // Pass the image URL
    });

    return () => {
      if (sketch){
        sketch.cleanup();
      }
    }
    
  }, [image]);

  return <div ref={containerRef} className="w-full h-screen" />;
};

export default ThreeSceneExplore;