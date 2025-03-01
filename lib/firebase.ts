import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, listAll, ref, getMetadata, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};  

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const startApp = () => {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
};

async function getDreamEntries(userId: string) {
  const dreamEntries = await getDocs(collection(db, `dreams/${userId}/dreamEntries`));
  if (dreamEntries.docs.length > 0) {
    return dreamEntries.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  }
  return [];
}

async function getDreamCount(userId: string) {
  const dreamEntries = await getDocs(collection(db, `dreams/${userId}/dreamEntries`));
  return dreamEntries.docs.length;
}

// Get dreams and sort them by modifiedAt timestamp in descending order (newest first)
async function getLatestDreams() {
  try {
    const listRef = ref(storage, 'dreams/');
    const res = await listAll(listRef);
    const imagePromises = res.items.map(async (image) => {
      const [url, metadata] = await Promise.all([
        getDownloadURL(image),
        getMetadata(image)
      ]);

      return {
        id: image.name,
        url,
        time: metadata.timeCreated
      };
    });

    const dreams = await Promise.all(imagePromises);
    return dreams.sort((a, b) => {
      const dateA = new Date(a.time);
      const dateB = new Date(b.time);
      return dateB.getTime() - dateA.getTime();
    });

  } catch (error) {
    console.error("Error getting latest dreams:", error);
    return [];
  }
}

async function getDashboardDreams() {
  const dreams = await getLatestDreams();
  return dreams.slice(0, 4);
}

async function getDashboardEntries(userId: string) {    
  const dreamEntries = await getDocs(collection(db, `dreams/${userId}/dreamEntries`));
  if (dreamEntries.docs.length > 0) {
    return dreamEntries.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  }
  return [];
}

export { app, db, storage, auth, startApp, getDreamEntries, getDreamCount, getLatestDreams, getDashboardDreams, getDashboardEntries };




// login

import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";

// Register a New User
export const signUp = async (firstName: string, lastName: string, email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);        

    const name = firstName + " " + lastName;
    await updateProfile(userCredential.user, { displayName: name });

    return userCredential.user;

  } catch (error) {
    console.error("Sign Up Error:", error);
    throw error;
  }
};

// Sign In an Existing User
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Sign In Error:", error);
    throw error;
  }
};

// Sign In with Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error) {
    console.error("Sign In with Google Error:", error);
    throw error;
  }
};

// Sign In with Facebook
export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error) {
    console.error("Sign In with Facebook Error:", error);
    throw error;
  }
};

// Sign Out User
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Sign Out Error:", error);
    throw error;
  }
};

// Listen to User Authentication State
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
