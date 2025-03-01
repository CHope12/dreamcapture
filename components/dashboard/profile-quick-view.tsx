"use client";
import { sub } from 'date-fns';
import Link from 'next/link';
import { FaUser } from "react-icons/fa"

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { User } from "firebase/auth";
import { getDreamCount } from "@/lib/firebase";

export function ProfileQuickView() {

  // username, profile picture, joined date, dream count, follower count, following count

  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<null | User>(null)  

  const [dreamCount, setDreamCount] = useState(0);

  useEffect(() => {
    const auth = getAuth()
    return onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user);
    })
  }, []);

  useEffect(() => {
    if (user) {
      getDreamCount(user.uid).then((count) => {
        setDreamCount(count);
      });
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-8 mb-12 md:mb-0">    
        <ProfileSettingsCard user={user} dreamCount={dreamCount} />
        <SubscriptionCard subscription='Free' billingDate='March 1, 2023' billingAmount='0' />
        <DreamSettingsCard />
      </div>
    </>
  )
}

const ProfileSettingsCard = ({ user, dreamCount } : {user: User | null, dreamCount: number}) => {  

  const togglePrivacy = () => {
    setIsPrivate(!isPrivate);
  };

  const [isPrivate, setIsPrivate] = useState(false);  
  const followers = 5;
  const following = 8;

  return (
    <div className="md:w-1/3 p-6 bg-neutral-100 dark:bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg text-black dark:text-white dark:text-white">
      {/* Profile Image */}
      <div className="flex justify-center">
        {user?.photoURL && user?.displayName ? (
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        ) : (
          <div className="w-24 h-24 rounded-full border-2 border-white/20 shadow-md backdrop-blur-xl flex justify-center items-center p-6 hover:border-violet-500 cursor-pointer transition-colors duration-100">
            <FaUser className="w-full h-full text-gray-600 dark:text-gray-400" />
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold cursor-pointer hover:text-violet-500 transition-colors duration-100">{user?.displayName}</h2>
        <p className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-violet-500 transition-colors duration-100">@{user?.uid}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Joined {new Date().toISOString().slice(0, 10)}</p>
      </div>

      {/* Stats */}
      <div className="flex justify-around mt-6 text-center min-w-[210px]">
        <Link href="/journal" className="hover:text-violet-500 transition-colors duration-100">
          <p className="text-lg font-semibold">{dreamCount}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">Dreams</p>
        </Link>        
        <Link href={``} className="hover:text-violet-500 transition-colors duration-100">
          <p className="text-lg font-semibold">{followers}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-violet-300 transition-colors duration-100">Followers</p>
        </Link>
        <Link href={``} className="hover:text-violet-500 transition-colors duration-100">
          <p className="text-lg font-semibold">{following}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">Following</p>
        </Link>
      </div>

      {/* Privacy Toggle */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <span className="text-gray-700 dark:text-gray-300">Private Profile</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={togglePrivacy}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-[#151515] peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer 
            peer-checked:after:translate-x-5 peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border 
            after:rounded-full after:h-4 after:w-4 after:transition-all 
            peer-checked:bg-violet-500"></div>
        </label>
      </div>

      {/* Status Message */}
      <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
        {isPrivate ? "Your profile is private." : "Your profile is public."}
      </p>
    </div>
  );
};

const DreamSettingsCard = () => {

  const [insights, setInsights] = useState(true);
  const toggleInsights = () => {setInsights(!insights)};

  const [analysis, setAnalysis] = useState(true);
  const toggleAnalysis = () => {setAnalysis(!analysis)};

  const [notifications, setNotifications] = useState(true);
  const toggleNotifications = () => {setNotifications(!notifications)};

  const [reminders, setReminders] = useState(true);
  const toggleReminders = () => {setReminders(!reminders)};

  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {setDarkMode(!darkMode)}
  
  return (
    <div className="md:w-1/3 p-6 bg-neutral-100 dark:bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg text-black dark:text-white">
      <h2 className="text-2xl text-center">Settings</h2>
      <div className="mt-4 min-w-[210px]">

        {/* Dream Insights Toggle */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Dream Insights</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={insights}
              onChange={toggleInsights}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#151515] peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer 
              peer-checked:after:translate-x-5 peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border 
              after:rounded-full after:h-4 after:w-4 after:transition-all 
              peer-checked:bg-violet-500"></div>
          </label>
        </div>

        {/* Dream Analysis Toggle */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Dream Analysis</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={analysis}
              onChange={toggleAnalysis}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#151515] peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer 
              peer-checked:after:translate-x-5 peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border 
              after:rounded-full after:h-4 after:w-4 after:transition-all 
              peer-checked:bg-violet-500"></div>
          </label>
        </div>

        <div className="w-full my-6">
          <div className="w-full h-[0.05rem] bg-gray-700" />
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Notifications</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={toggleNotifications}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#151515] peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer 
              peer-checked:after:translate-x-5 peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border 
              after:rounded-full after:h-4 after:w-4 after:transition-all 
              peer-checked:bg-violet-500"></div>
          </label>
        </div>

        {/* Reminders Toggle */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Reminders</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={reminders}
              onChange={toggleReminders}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#151515] peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer 
              peer-checked:after:translate-x-5 peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border 
              after:rounded-full after:h-4 after:w-4 after:transition-all 
              peer-checked:bg-violet-500"></div>
          </label>
        </div>

        <div className="w-full my-6">
          <div className="w-full h-[0.05rem] bg-gray-700" />
        </div>

        {/* Theme */}
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#151515] peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer 
              peer-checked:after:translate-x-5 peer-checked:after:border-white 
              after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border 
              after:rounded-full after:h-4 after:w-4 after:transition-all 
              peer-checked:bg-violet-500"></div>
          </label>
        </div>

      </div>
    </div>
  )
}

const SubscriptionCard = ({ subscription, billingDate, billingAmount }: { subscription: string, billingDate: string, billingAmount: string}) => {

  return (
    <div className="md:w-1/3 p-6 bg-neutral-100 dark:bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg text-black dark:text-white flex flex-col justify-between">
      {/* Title */}
      <h1 className="text-2xl text-center">Your Subscription</h1>

      {/* Subscription Tier */}
      <div className="mt-2">
        <p className="text-4xl text-center text-gray-500">
          {subscription}
        </p>
      </div>

      {/* Subscription Details */}
      {["Lucid Dreamer", "Oneironaut"].includes(subscription) && (
        <div className="mt-4 text-center">
          <p className="text-gray-700 dark:text-gray-300">You have an active subscription.</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Next Billing Date: {billingDate}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Amount: <span className="font-semibold">£{billingAmount}</span></p>
      </div>
      )}

      {subscription === "Free" && (
        <div className="mt-4 text-center">
          <p className="text-gray-700 dark:text-gray-300">Unlock more features with a premium plan!</p>
          </div>
      )}

      {subscription === "Lucid Dreamer" && (
        <div className="mt-4 text-center">
          <p className="text-gray-700 dark:text-gray-300">Unlock more features with a premium plan!</p>
          </div>
      )}

      {/* Upgrade Button */}
      {["Lucid Dreamer", "Free"].includes(subscription) && (
      <Link href="">
        <button className="w-full bg-violet-700 hover:bg-violet-600 font-semibold py-2 px-4 rounded-lg transition duration-200 text-white mt-4 md:mt-0">
          Upgrade Now
        </button>
      </Link>
      )}
    </div>
  );
};
