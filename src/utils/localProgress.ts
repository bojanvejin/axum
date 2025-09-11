"use client";

import { StudentProgress, QuizAttempt } from '@/data/curriculum';

const PROGRESS_KEY_PREFIX = 'axum_progress_';
const QUIZ_ATTEMPTS_KEY_PREFIX = 'axum_quiz_attempts_';

// Helper to get a user-specific key
const getUserProgressKey = (userId: string) => `${PROGRESS_KEY_PREFIX}${userId}`;
const getUserQuizAttemptsKey = (userId: string) => `${QUIZ_ATTEMPTS_KEY_PREFIX}${userId}`;

export const getLocalStudentProgress = (userId: string): StudentProgress[] => {
  if (typeof window === 'undefined') return [];
  const progressString = localStorage.getItem(getUserProgressKey(userId));
  return progressString ? JSON.parse(progressString) : [];
};

export const setLocalStudentProgress = (userId: string, progress: StudentProgress[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(getUserProgressKey(userId), JSON.stringify(progress));
  }
};

export const getLocalQuizAttempts = (userId: string, quizId: string): QuizAttempt[] => {
  if (typeof window === 'undefined') return [];
  const attemptsString = localStorage.getItem(`${getUserQuizAttemptsKey(userId)}${quizId}`);
  return attemptsString ? JSON.parse(attemptsString) : [];
};

export const addLocalQuizAttempt = (userId: string, quizId: string, attempt: QuizAttempt) => {
  if (typeof window !== 'undefined') {
    const existingAttempts = getLocalQuizAttempts(userId, quizId);
    const updatedAttempts = [...existingAttempts, attempt];
    localStorage.setItem(`${getUserQuizAttemptsKey(userId)}${quizId}`, JSON.stringify(updatedAttempts));
  }
};

export const clearLocalProgress = (userId: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(getUserProgressKey(userId));
    // Also clear all quiz attempts for this user
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(getUserQuizAttemptsKey(userId))) {
        localStorage.removeItem(key);
      }
    }
  }
};