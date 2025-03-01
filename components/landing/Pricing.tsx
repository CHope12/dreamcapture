import { TiTick } from "react-icons/ti";

export default function Pricing() {
  return (
    <div className="w-full flex flex-col justify-center items-center text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-4 text-center">Choose Your Dream Journey</h1>
      <p className="mb-16 w-full px-4 md:w-2/3 lg:w-1/2 text-center">Unlock the power of your dreams with AI-generated insights, immersive dreamscapes, and a vibrant dream-sharing community. Pick the plan that fits your journey into the subconscious.</p>
      <div className="w-full flex justify-start lg:justify-center flex-wrap gap-8 px-8">
        {pricingDetails.map((pricing, idx) => (
          <PricingCard key={idx} title={pricing.title} price={pricing.price} features={pricing.features} featured={pricing.featured} />
        ))}
      </div>
    </div>
  )
}

interface PricingCardProps {
  title: string;
  price: React.ReactNode;
  features: string[];
  featured: boolean;
}

function PricingCard({ title, price, features, featured }: PricingCardProps) {
  return (
    <div className="w-full md:max-w-[47.5%] lg:max-w-[300px] flex flex-col gap-4 p-4 bg-[#eaeaea] dark:bg-[#171717] rounded-2xl h-[550px]">
      <div className="bg-[#fefefe] dark:bg-[#262626] rounded-2xl p-4 flex flex-col gap-8">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-xl">{title}</h2>
          {featured == true && (
            <span className="bg-accent text-[#171717] rounded-full bg-white px-3 py-1 text-xs">Featured</span>
          )}
        </div>
        {price}
        <button className="shadow-[0_4px_14px_0_rgb(123,44,191,39%)] hover:shadow-[0_6px_20px_rgba(123,44,191,23%)] hover:bg-[rgba(123,44,191,0.9)] px-8 py-2 bg-[#7b2cbf] rounded-md text-white font-light transition duration-200 ease-linear">
          Get {title}
        </button>
      </div>
      <ul className="text-[0.875rem]">
        {features.map((feature, idx) => (                      
          <li 
            key={idx}
            className="flex items-center gap-2 my-2"
          >
            <div className="rounded-full bg-white dark:bg-[#404040] w-4 h-4 flex justify-center items-center">
              <TiTick />
            </div>
            {feature}
          </li>          
        ))}
      </ul>
    </div>
  )
}

const pricingDetails = [
  {
    title: "Sleepwalker",
    price:
      <>
        <p className="text-6xl font-bold">
          Free
        </p>
      </>,
    features: [
      "10 Dream Entries",
      "Basic Dream Analytics",
      "Limited Support",
      "Access to Public Dream Gallery",
      "Community Engagement"
    ],
    bestFor: "Casual dreamers exploring the platform",
    featured: false,
  },
  {
    title: "Lucid Dreamer",
    price: 
      <>
        <p>
          <span>£</span>
          <span className="text-6xl font-bold">9.99</span>
          <span>/month</span>
        </p>
      </>,
    features: [
      "Unlimited Dream Entries",
      "Advanced AI Dream Analytics",
      "Priority Support",
      "1 Daily Dreamscape Generation",
      "Private Dream Sharing with Friends",
      "Customizable AI Dream Visuals"
    ],
    bestFor: "Regular users who want unlimited dream generation and deeper insights",
    featured: true,
  },
  {
    title: "Oneironaut",
    price:
      <>
        <p>
          <span>£</span>
          <span className="text-6xl font-bold">29.99</span>
          <span>/month</span>
        </p>
      </>,
    features: [
      "Unlimited Dream Entries",
      "Advanced AI Dream Analytics",
      "24/7 Support",
      "10 Daily Dreamscape Generations",
      "Real-time AI Dream Coaching",
      "Exclusive Dream Analysis Reports",
      "Custom AI Dream Environments",
    ],
    bestFor: "Dream professionals, researchers, and enthusiasts deeply invested in dream exploration",
    featured: false,
  }
]
