import { Quiz } from '@/data/curriculum';

// --- Quizzes ---
export const week2ReviewQuizId = "c0000000-0000-4000-8000-000000000000";

export const seedQuizzes: Quiz[] = [
  {
    id: week2ReviewQuizId,
    title: "Week 2 Review Quiz",
    description: "A quick check on your understanding of Week 2's core concepts.",
    created_at: new Date().toISOString(),
  },
];