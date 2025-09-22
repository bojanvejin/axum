import { CurriculumPhase, CurriculumModule, CurriculumLesson, Quiz, QuizQuestion } from './curriculum';

// Helper to generate UUIDs
const generateId = () => crypto.randomUUID();

// Phase 1
const phase1Id = generateId();
const phase1: CurriculumPhase = {
  id: phase1Id,
  title: "Foundations of Hair Styling",
  description: "Learn the fundamental techniques and principles of professional hair styling.",
  weeks: 4,
  order_index: 0,
};

// Module 1.1
const module1_1Id = generateId();
const module1_1: CurriculumModule = {
  id: module1_1Id,
  phase_id: phase1Id,
  title: "Introduction to Tools & Products",
  description: "Understand the essential tools and products used in hair styling.",
  order_index: 0,
};

// Lesson 1.1.1
const lesson1_1_1Id = generateId();
const lesson1_1_1: CurriculumLesson = {
  id: lesson1_1_1Id,
  module_id: module1_1Id,
  title: "Salon Safety & Hygiene",
  objectives: "Identify safety protocols and hygiene standards in a salon environment.",
  content_html: "<p>This lesson covers the critical aspects of maintaining a safe and hygienic salon. You will learn about sterilization, disinfection, and proper waste disposal.</p>",
  video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  resources_url: "https://example.com/safety-resources.pdf", // Placeholder
  order_index: 0,
  quiz_id: null,
};

// Lesson 1.1.2
const lesson1_1_2Id = generateId();
const lesson1_1_2: CurriculumLesson = {
  id: lesson1_1_2Id,
  module_id: module1_1Id,
  title: "Understanding Hair Types",
  objectives: "Differentiate various hair types and textures to recommend appropriate treatments.",
  content_html: "<p>Explore the science behind different hair types, including straight, wavy, curly, and coily hair. Learn how to assess porosity, elasticity, and density.</p>",
  video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  resources_url: null,
  order_index: 1,
  quiz_id: null,
};

// Quiz for Module 1.1
const quiz1_1Id = generateId();
const quiz1_1: Quiz = {
  id: quiz1_1Id,
  title: "Module 1.1 Knowledge Check",
  description: "Test your understanding of salon safety and hair types.",
  created_at: new Date().toISOString(),
};

const question1_1_1: QuizQuestion = {
  id: generateId(),
  quiz_id: quiz1_1Id,
  question_text: "What is the primary purpose of sterilization in a salon?",
  question_type: "mcq",
  options: ["To clean tools", "To kill all microorganisms", "To make tools shiny", "To dry tools"],
  correct_answer: "To kill all microorganisms",
  created_at: new Date().toISOString(),
};

const question1_1_2: QuizQuestion = {
  id: generateId(),
  quiz_id: quiz1_1Id,
  question_text: "Which of the following is NOT a primary hair type?",
  question_type: "mcq",
  options: ["Straight", "Wavy", "Curly", "Oily"],
  correct_answer: "Oily",
  created_at: new Date().toISOString(),
};

// Update lesson 1.1.2 to include the quiz
lesson1_1_2.quiz_id = quiz1_1Id;


// Phase 2
const phase2Id = generateId();
const phase2: CurriculumPhase = {
  id: phase2Id,
  title: "Advanced Cutting Techniques",
  description: "Master advanced hair cutting methods for various styles and client needs.",
  weeks: 6,
  order_index: 1,
};

// Module 2.1
const module2_1Id = generateId();
const module2_1: CurriculumModule = {
  id: module2_1Id,
  phase_id: phase2Id,
  title: "Precision Cutting",
  description: "Learn to execute precise cuts like bobs, layers, and pixies.",
  order_index: 0,
};

// Lesson 2.1.1
const lesson2_1_1Id = generateId();
const lesson2_1_1: CurriculumLesson = {
  id: lesson2_1_1Id,
  module_id: module2_1Id,
  title: "The Classic Bob",
  objectives: "Perform a classic bob haircut with clean lines and proper graduation.",
  content_html: "<p>This lesson details the steps to achieve a perfect classic bob. Focus on sectioning, elevation, and tension.</p>",
  video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  resources_url: null,
  order_index: 0,
  quiz_id: null,
};

export const seedPhases: CurriculumPhase[] = [phase1, phase2];
export const seedModules: CurriculumModule[] = [module1_1, module2_1];
export const seedLessons: CurriculumLesson[] = [lesson1_1_1, lesson1_1_2, lesson2_1_1];
export const seedQuizzes: Quiz[] = [quiz1_1];
export const seedQuizQuestions: QuizQuestion[] = [question1_1_1, question1_1_2];