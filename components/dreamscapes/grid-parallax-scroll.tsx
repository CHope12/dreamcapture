"use client";
import Link from "next/link";
import Image from "next/image";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { startApp } from "@/lib/firebase"

export function ParallaxScrollDemo() {
  startApp();
  const [images, setImages] = useState<{ url: string; id: string }[]>([]);

  const [counter, setCounter] = useState(6);

  const fetchImages = async () => {
    const storage = getStorage();
    const listRef = ref(storage, 'dreams/');
    const res = await listAll(listRef);
    const imagePromises = res.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return { url, id: itemRef.name };
    });
    const imagesWithIds = await Promise.all(imagePromises);
    setImages([...images, ...imagesWithIds]);
    setCounter(counter + 6);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>    
    <ParallaxScroll images={images} />    
    <div className="md:hidden px-4 mt-20 mb-12 overflow-y-scroll">
      <div className="flex flex-col gap-4">
        {images.map((image) => (
          <Link href={`/explore/${image.id}`} key={image.id} className="w-full h-full">
            <Image src={image.url} alt={image.id} width={500} height={500} />
          </Link>
        ))}
      </div>
    </div>
    </>
  )
}