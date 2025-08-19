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