import { CurriculumLesson } from '@/data/curriculum';
import { seedAppendixLessons } from './appendices';
import { seedWeek1Lessons } from './week1';
import { seedWeek2Lessons } from './week2';
import { seedWeek3Lessons } from './week3';
import { seedWeek4Lessons } from './week4';
import { seedWeek5Lessons } from './week5';
import { seedWeek6Lessons } from './week6';

export const seedLessons: CurriculumLesson[] = [
  ...seedAppendixLessons,
  ...seedWeek1Lessons,
  ...seedWeek2Lessons,
  ...seedWeek3Lessons,
  ...seedWeek4Lessons,
  ...seedWeek5Lessons,
  ...seedWeek6Lessons,
];