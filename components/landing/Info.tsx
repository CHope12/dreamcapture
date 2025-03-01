import Image from "next/image";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function Info () {
  return (
    <div 
      id="info"
      className="bg-[#fefefe] dark:bg-[#151515] text-black dark:text-white text-center overflow-hidden mx-2"
    >
      <TracingBeam>
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          <h1 className="text-4xl font-bold mb-6">How It Works</h1>
          {content.map((item, index) => (
            <div key={`content-${index}`} className="mb-10 px-8 md:px-0">
              <h2 className="bg-violet-800 text-white rounded-full w-fit px-4 py-1 mb-4">
                {item.badge}
              </h2>
  
              <p className={"text-2xl mb-4"}>
                {item.title}
              </p>
  
              <div className="text-pretty text-left">
                {item?.image && (
                  <Image
                    src={item.image}
                    alt="blog thumbnail"
                    height="1000"
                    width="1000"
                    className="rounded-lg mb-10 object-cover"
                  />
                )}
                <div className="flex flex-col gap-2 px-8">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
    </div>
  );
}

const content = [
  {
    title: "Record Your Dreams with Ease",
    description: (
      <>
        <p>
          Capture your dreams effortlessly in our intuitive journal. Write down every vivid detail, from surreal landscapes to deep emotions, helping you track and interpret recurring patterns.
        </p>
        <p>
          Keeping a dream journal enhances self-awareness and provides insight into your subconscious mind. Our platform ensures your thoughts are preserved and easily accessible.
        </p>
        <p>
          Take control of your dream world—whether it's a fleeting vision or a powerful, recurring theme, documenting your dreams is the first step in understanding them.
        </p>
      </>
    ),
    badge: "1",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Transform Dreams into Stunning AI-Generated Worlds",
    description: (
      <>
        <p>
          Watch your dreams come to life with AI-powered dreamscape generation. Our advanced AI interprets your journal entries and creates breathtaking 360° visuals that mirror your subconscious.
        </p>
        <p>
          Immerse yourself in dream environments like never before. Whether it's a mystical forest, an ancient city, or a futuristic utopia, our AI transforms your descriptions into visually stunning experiences.
        </p>
        <p>
          Explore and refine your dreamscapes, making each journey more vivid and memorable. See what your subconscious truly envisions!
        </p>
      </>
    ),
    badge: "2",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Explore Insights and Interpretations",
    description: (
      <>
        <p>
          Gain deep insights into your dreams through AI-powered analysis. Discover recurring themes, emotional patterns, and symbolic meanings in your dreams.
        </p>
        <p>
          Use our intuitive tools to reflect on your subconscious and uncover hidden messages. Track progress over time and connect dots between past dreams and present experiences.
        </p>
        <p>
          Understanding your dreams can lead to better self-awareness, personal growth, and creative inspiration.
        </p>
      </>
    ),
    badge: "3",
    image:
      "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Share and Connect Through Your Dreamscapes",
    description: (
      <>
        <p>
          Dreams are meant to be shared. Let your friends and family experience the wonders of your dream world and gain insights from their interpretations.
        </p>
        <p>
          Foster deeper connections by exchanging dreams, discussing hidden meanings, and engaging in thought-provoking conversations about subconscious journeys.
        </p>
        <p>
          Whether it's sharing a surreal adventure or seeking new perspectives, our platform makes dream-sharing an immersive and social experience.
        </p>
      </>
    ),
    badge: "4",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
