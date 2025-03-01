export interface User {
  id: number;
  name: string;
  username: string;
  profilePicture: string;
  joinedDate: string;
  dreamCount: number;
  followers: number;
  following: number;
  isPrivate: boolean;
}

//remove name -> isPrivate later
export interface UserData {
  id: number;
  name: string;
  username: string;
  profilePicture: string | null;
  joinedDate: string;
  dreamCount: number;
  followers: number;
  following: number;
  isPrivate: boolean;

  insights: boolean;
  analysis: boolean;
  notifications: boolean;
  reminders: boolean;
  darkMode: boolean;
  subscription: string;
  billingDate?: string;
  billingAmount: number;
}

export interface Dream {
  id: string,
  userId?: number,
  title: string,
  date: string,
  description: string,
  mood: string,
  tags: string[],
  image: string,
}