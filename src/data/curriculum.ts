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
}

// No static curriculumData array here, it will be fetched from Supabase