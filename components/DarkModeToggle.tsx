"use client";
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', newMode.toString());
  };

  useEffect(() => {
    if (localStorage.getItem('darkMode') === null) localStorage.setItem('darkMode', 'true');
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <button 
      onClick={toggleDarkMode}
      className="p-2 rounded-lg hover:bg-neutral-800/20 dark:hover:bg-neutral-200/20"
    >
      {darkMode ? <FiSun className="text-black dark:text-white text-2xl" /> : <FiMoon className="text-black dark:text-white text-2xl" />}
    </button>
  );
} 