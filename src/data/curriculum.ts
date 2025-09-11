export interface CurriculumModule {
  id: string;
  phase_id: string;
  title: string;
  description: string;
  order_index: number;
  course_week?: number; // New field to link to courseOutline week
  tools_needed?: string; // New field for tools required
  preparation_guide?: string; // New field for preparation guide
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
  week_number?: number; // New field for scheduling
  day_number?: number;  // New field for scheduling
}

export interface StudentProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed_at: string | null;
  status: 'started' | 'completed' | 'submitted_for_review';
  practical_submission_url?: string;
  grade?: string;
}

export interface Quiz {
  id: string;
  lesson_id?: string | null;
  title: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: 'mcq';
  options: string[];
  correct_answer: string;
}

// New interface for local quiz attempts
export interface QuizAttempt {
  id: string;
  score: number;
  answers: Record<string, string>;
  submitted_at: string;
}