"use client";

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
  if (typeof window === 'undefined') {
    // In a server-side context, return a dummy user or throw an error
    return { id: uuidv4(), name };
  }
  const existingUser = getLocalUser();
  if (existingUser && existingUser.name === name) {
    return existingUser;
  }
  const newUser: LocalUser = {
    id: uuidv4(), // Generate a new ID for a new user or if name changes
    name,
  };
  localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  return newUser;
};

export const clearLocalUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_KEY);
  }
};