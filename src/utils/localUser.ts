import { v4 as uuidv4 } from 'uuid';

const USER_KEY = 'axum_local_user';

interface LocalUser {
  id: string;
  name: string;
}

export const getLocalUser = (): LocalUser | null => {
  if (typeof window === 'undefined') return null;
  const userString = localStorage.getItem(USER_KEY);
  return userString ? JSON.parse(userString) : null;
};

export const setLocalUser = (name: string): LocalUser => {
  const existingUser = getLocalUser();
  if (existingUser) {
    // If user exists, update name but keep ID
    const updatedUser = { ...existingUser, name };
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  } else {
    // If no user, create new ID and store
    const newUser: LocalUser = {
      id: uuidv4(),
      name,
    };
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    return newUser;
  }
};

export const clearLocalUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_KEY);
  }
};