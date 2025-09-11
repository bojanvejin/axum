import * as z from "zod";

export interface CurriculumPhase {
  id: string;
  title: string;
  description?: string;
  weeks?: number;
}

export interface CurriculumModule {
  id: string;
  phase_id: string;
  title: string;
  description?: string;
  order_index: number;
  course_week?: number;
  tools_needed?: string;
  preparation_guide?: string;
}

export interface CurriculumSession {
  id: string;
  session_number: number;
  title: string;
  description?: string;
  topics?: string[]; // Array of text
  assignments?: string[]; // Array of text
  covers_days?: number[]; // Array of numbers
}

export interface CurriculumLesson {
  id: string;
  session_id: string;
  title: string;
  objectives?: string;
  content_html?: string;
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
  description?: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: 'mcq';
  options: string[];
  correct_answer: string;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string; // Added quiz_id
  score: number;
  answers: Record<string, string>;
  submitted_at: string;
}

export interface Upload {
  id: string;
  user_id: string;
  lesson_id: string;
  file_url: string;
  file_name: string;
  submission_date: string;
  status: 'pending' | 'reviewed' | 'approved';
}

export interface Feedback {
  id: string;
  upload_id: string;
  instructor_id: string;
  feedback_text: string;
  feedback_video_url?: string;
  created_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  certificate_url: string;
  issue_date: string;
}

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  role: 'user' | 'admin';
  full_name?: string;
  avatar_url?: string;
}

// Session form
export interface LessonOption {
  id: string;
  title: string;
}