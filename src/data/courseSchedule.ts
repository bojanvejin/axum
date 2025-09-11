export interface DailyLesson {
  day: number; // Day number within the course (e.g., Day 1, Day 2)
  title: string;
  description: string;
}

export interface WeeklySchedule {
  week: number;
  title: string;
  days: DailyLesson[];
}

export const courseOutline: WeeklySchedule[] = [];