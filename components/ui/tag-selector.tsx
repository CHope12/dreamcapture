"use client";

import { useState } from "react";

const dreamTags = [
  // Themes
  "adventure", "fantasy", "surreal", "mystical", "nightmare", "otherworldly",
  "magical", "apocalyptic", "cosmic", "historical", "futuristic", "mythological",
  
  // Emotions
  "peaceful", "anxious", "joyful", "euphoric", "melancholic", "fearful",
  "nostalgic", "romantic", "chaotic", "ominous", "tranquil", "foreboding",
  
  // Scenarios
  "flying", "falling", "chasing", "running", "escaping", "floating", "exploring",
  "searching", "fighting", "transformation", "teleportation", "time-travel", 
  "lost", "lucid", "repeating",
  
  // Characters
  "ghosts", "angels", "monsters", "aliens", "animals", "shadow-figures",
  "familiar-faces", "strangers", "deities", "demons", "mythical-creatures", "robots",
  
  // Locations
  "underwater", "desert", "forest", "cityscape", "abandoned", "outer-space",
  "ancient-ruins", "labyrinth", "haunted", "floating-islands", "parallel-universe", "unknown-places",
  
  // Symbolic
  "déjà-vu", "symbolic", "prophetic", "premonition", "existential", "past-life",
  "hidden-memories", "spiritual", "abstract"
];

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

export function TagSelector({ selectedTags, onChange }: TagSelectorProps) {
  const [tags, setTags] = useState<string[]>(selectedTags);

  const toggleTag = (tag: string) => {
    const updatedTags = tags.includes(tag)
      ? tags.filter(t => t !== tag) // Remove tag
      : [...tags, tag]; // Add tag

    setTags(updatedTags);
    onChange(updatedTags); // Notify parent component
  };

  const [showAllTags, setShowAllTags] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const visibleTags = (!isMobile || showAllTags) ? dreamTags : dreamTags.slice(0, 12);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {visibleTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-1 md:px-3 md:py-1 rounded-lg border transition 
              ${tags.includes(tag) ? "bg-[rgba(143,64,211,0.9)] text-white border-[rgba(123,44,191,0.9)]" : "bg-neutral-100 dark:bg-[#151515] text-gray-600 dark:text-gray-400 border-gray-700 hover:bg-[rgba(123,44,191,0.9)] hover:text-white hover:border-[rgba(123,44,191,0.9)]"}`}
          >
            {tag}
          </button>
        ))}
      </div>
      {isMobile && dreamTags.length > 12 && (
        <button
          onClick={() => setShowAllTags(!showAllTags)}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition md:hidden"
        >
          {showAllTags ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
