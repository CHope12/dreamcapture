import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function Testimonials () {
  return (
    <div className="w-full flex justify-center items-center flex-col overflow-x-clip text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-6">What People Say</h1>
      <InfiniteMovingCards items={items} />
    </div>
  );
}

const items = [
  {
    quote: "I love DreamCapture! It's the best way to keep track of my dreams.",
    name: "Jane Doe",
    title: "Software Engineer",
  },
  {
    quote: "I've been using DreamCapture for a few weeks now and I love it!",
    name: "John Doe",
    title: "Product Manager",
  },
  {
    quote: "DreamCapture has helped me remember my dreams better.",
    name: "Alice Doe",
    title: "Designer",
  },
];
