"use client";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuth, onAuthStateChanged, User, signOut } from 'firebase/auth'
import { db, startApp } from '@/lib/firebase'
import { NumberTicker } from "@/components/magicui/number-ticker"
import { getDocs, collection, deleteDoc, query } from 'firebase/firestore'
import { FiSettings, FiUser, FiMoon, FiSun, FiTrash2, FiLogOut, FiEdit2 } from 'react-icons/fi'

export default function Page() {
  // Existing Firebase setup
  startApp();
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<null | User>(null)
  const [dreamCount, setDreamCount] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [displayName, setDisplayName] = useState('')

  const router = useRouter()

  useEffect(() => {
    const auth = getAuth()
    return onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
      if (user) setDisplayName(user.displayName || '');      
      if(!user) router.push("/login");      
    })
  }, [])

  useEffect(() => {
    if (!user) return;
    const fetchDreamCount = async () => {
      const dreamsRef = collection(db, `dreams/${user.uid}/dreamEntries`);
      const snapshot = await getDocs(dreamsRef);
      setDreamCount(snapshot.size);
    };
    fetchDreamCount();
  }, [user]);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user || !window.confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      return;
    }

    try {
      // Delete all dreams
      const dreamsRef = collection(db, `dreams/${user.uid}/dreamEntries`);
      const snapshot = await getDocs(dreamsRef);
      const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      
      //could also delete the user account here if desired
      alert('All data has been deleted successfully');
      setDreamCount(0);
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Error deleting data. Please try again.');
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
    </div>
  );

  if (!user && !isLoading) router.push('/login');

  return (
    <div className="flex flex-1">
      <div className="p-4 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-8 flex-1 w-full h-[99.75vh]">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-4">
            <div className="relative group">
              {user?.photoURL ? (
                <img className="w-16 h-16 rounded-full ring-2 ring-violet-500" src={user.photoURL} alt={user?.displayName + "'s image"} />
              ) : (
                <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center">
                  <FiUser className="w-8 h-8 text-violet-500" />
                </div>
              )}
              <button 
                className="absolute bottom-0 right-0 bg-violet-500 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setIsEditing(true)}
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-black dark:text-white">{user?.displayName}'s Profile</h1>
              <p className="text-neutral-500 dark:text-neutral-400">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black dark:text-white">
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Total Dreams</h2>
            <div className="flex items-center justify-center flex-1">
              {dreamCount === 0 ? (
                <p className="text-5xl ">0</p>
              ) : (
                <NumberTicker value={dreamCount} className="text-5xl"/>
              )}
            </div>
          </div>
          
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6 flex flex-col gap-4 text-black dark:text-white">
            <h2 className="text-xl font-semibold">Current Streak</h2>
            <div className="flex items-center justify-center flex-1">
              <NumberTicker value={15} className="text-5xl"/>
            </div>
          </div>

          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6 flex flex-col gap-4 text-black dark:text-white">
            <h2 className="text-xl font-semibold">Account Actions</h2>
            <div className="flex flex-col gap-4 flex-1 justify-center">
              <button 
                onClick={handleDeleteAccount}
                className="flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-2 px-4 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
                Delete Account Data
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-violet-500/10 text-violet-500 py-2 px-4 rounded-lg hover:bg-violet-500/20 transition-colors"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-black dark:text-white">
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span>Daily Reminders</span>
                <input type="checkbox" disabled className="form-checkbox h-5 w-5 text-violet-500" />
              </label>
              <label className="flex items-center justify-between">
                <span>Weekly Summary</span>
                <input type="checkbox" disabled className="form-checkbox h-5 w-5 text-violet-500" />
              </label>
            </div>
          </div>

          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span>Make Profile Public</span>
                <input type="checkbox" disabled className="form-checkbox h-5 w-5 text-violet-500" />
              </label>
              <label className="flex items-center justify-between">
                <span>Share Statistics</span>
                <input type="checkbox" disabled className="form-checkbox h-5 w-5 text-violet-500" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}