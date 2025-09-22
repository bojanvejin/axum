export interface CurriculumModule {
  id: string;
  phase_id: string;
  title: string;
  description: string;
  order_index: number;
}

export interface CurriculumPhase {
  id: string;
  title: string;
  weeks: number;
  description: string;
  order_index: number;
}

export interface CurriculumLesson {
  id: string;
  module_id: string;
  title: string;
  objectives: string;
  content_html: string;
  video_url?: string;
  resources_url?: string;
  order_index: number;
  quiz_id?: string | null;
}

export interface StudentProgress {
  id?: string; // Firestore document ID
  user_id: string; // Firebase Auth UID
  lesson_id: string;
  completed_at: string | null; // ISO string
  status: 'started' | 'completed' | 'submitted_for_review';
  practical_submission_url?: string;
  grade?: string;
  created_at: string; // ISO string
}

export interface Quiz {
  id: string;
  lesson_id?: string | null; // Made optional as it might not always be directly linked to a lesson
  title: string;
  description: string;
  created_at: string; // ISO string
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: 'mcq';
  options: string[];
  correct_answer: string;
  created_at: string; // ISO string
}

export interface QuizAttempt {
  id?: string; // Firestore document ID
  user_id: string; // Firebase Auth UID
  quiz_id: string;
  score: number;
  answers: Record<string, string>;
  submitted_at: string; // ISO string
}