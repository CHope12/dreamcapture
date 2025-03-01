//import ThreeScene from "@/components/PanoramicScene";
import Link from "next/link";
import ThreeScene from "@/components/ThreeScene";

export default async function Page({ params }: {params: Promise<{dreamId: string}> }) {
  const { dreamId } = await params;  

  return (
    <div className="flex flex-1">
      <div className="relative w-full h-full">
        <div className="absolute top-4 left-4">
        <Link
          href="/journal"
          className="mt-2 self-end shadow-[0_4px_14px_0_rgb(0,0,0,39%)] hover:shadow-[0_6px_20px_rgba(0,0,0,23%)] hover:bg-[#383838] px-8 py-2 bg-[#262626] rounded-md text-white font-light transition duration-200 ease-linear w-fit"
        >
          Back
        </Link>
        </div>
        {dreamId && (<ThreeScene dreamId={dreamId} />)}
      </div>
    </div>
  )
}