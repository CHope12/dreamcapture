"use client";

interface ContentCardProps {
  title: string;
  date: string;
  description: string;
  mood: string;
  tags: string[];
  image: string;
}

function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);
  
  // Get day with suffix (1st, 2nd, 3rd, etc.)
  const day = date.getDate();
  const suffix = getDaySuffix(day);
  
  // Get month name abbreviated
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  
  // Get full year
  const year = date.getFullYear();
  
  // Combine all parts
  return `${day}${suffix} ${month} ${year}`;
}

// Helper function to get the appropriate suffix for a day
function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

export function ContentCard({ title, date, description, mood, tags, image }: ContentCardProps) {

  return (
    <div className="w-80 group/card">
      <div
        className="cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4"
        style={{          
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">          
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">
              {mood}
            </p>
            <p className="text-sm text-white">{formatDate(date)}</p>
          </div>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            {title}
          </h1>
          <ul className="flex gap-2 items-center mt-2">            
            {tags.slice(0, 3).map((tag) => (
              <li key={tag} className="text-black relative z-10 bg-[#fefefe] rounded-lg border-gray-100 px-2 py-1">
                {tag}
              </li>
            ))}            
            {tags.length > 3 && (
              <li className="text-gray-100 relative z-10">+{tags.length - 3}</li>
            )}            
          </ul>
          <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
