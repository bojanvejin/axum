import { QuizQuestion } from '@/data/curriculum';
import { week2ReviewQuizId } from '@/data/seed/quizzes';

// --- Quiz Questions ---
export const seedQuizQuestions: QuizQuestion[] = [
  {
    id: "d0000000-0000-4000-8000-000000000000",
    quiz_id: week2ReviewQuizId,
    question_text: "Which part of the hair follicle is responsible for hair growth?",
    question_type: 'mcq',
    options: ["Hair Shaft", "Dermal Papilla", "Sebaceous Gland", "Arrector Pili Muscle"],
    correct_answer: "Dermal Papilla",
    created_at: new Date().toISOString(),
  },
  {
    id: "d0000000-0000-4000-8000-000000000001",
    quiz_id: week2ReviewQuizId,
    question_text: "What is the primary goal of line cutting techniques?",
    question_type: 'mcq',
    options: ["To create soft, blended layers", "To establish sharp, defined outlines", "To add volume to the hair", "To remove bulk from the interior"],
    correct_answer: "To establish sharp, defined outlines",
    created_at: new Date().toISOString(),
  },
  {
    id: "d0000000-0000-4000-8000-000000000002",
    quiz_id: week2ReviewQuizId,
    question_text: "When combining line and precision cutting, what is crucial for a seamless result?",
    question_type: 'mcq',
    options: ["Using only one type of clipper", "Ignoring the client's head shape", "Smooth blending and transition", "Cutting against the grain exclusively"],
    correct_answer: "Smooth blending and transition",
    created_at: new Date().toISOString(),
  },
];