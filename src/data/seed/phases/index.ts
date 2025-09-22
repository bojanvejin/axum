import { CurriculumPhase } from '@/data/curriculum';

// --- Phases ---
export const phaseAppendicesId = "a0000000-0000-4000-8000-000000000000";
export const phase1Id = "a0000000-0000-4000-8000-000000000001";
export const phase2Id = "a0000000-0000-4000-8000-000000000002";
export const phase3Id = "a0000000-0000-4000-8000-000000000003";
export const phase4Id = "a0000000-0000-4000-8000-000000000004";
export const phase5Id = "a0000000-0000-4000-8000-000000000005";
export const phase6Id = "a0000000-0000-4000-8000-000000000006";

export const seedPhases: CurriculumPhase[] = [
  {
    id: phaseAppendicesId,
    title: "Appendices",
    description: "Essential reference materials for your barbering journey.",
    weeks: 0, // No specific duration for appendices
    order_index: 0,
  },
  {
    id: phase1Id,
    title: "Intro to Line / Precision Cutting",
    description: "Learn the foundational concepts and initial techniques for line and precision cutting.",
    weeks: 1,
    order_index: 1,
  },
  {
    id: phase2Id,
    title: "Week 2 — Mastering the Basics",
    description: "Deepen your understanding of hair science and fundamental cutting techniques.",
    weeks: 1,
    order_index: 2,
  },
  {
    id: phase3Id,
    title: "Week 3 — Intermediate Techniques",
    description: "Advance your skills with more complex line and precision cutting methods.",
    weeks: 1,
    order_index: 3,
  },
  {
    id: phase4Id,
    title: "Week 4 — Design & Creativity",
    description: "Explore the artistic side of barbering by creating intricate hair designs.",
    weeks: 1,
    order_index: 4,
  },
  {
    id: phase5Id,
    title: "Week 5 — Mastering the Craft",
    description: "Refine your craft with advanced design and practical application.",
    weeks: 1,
    order_index: 5,
  },
  {
    id: phase6Id,
    title: "Week 6 — Final Project & Graduation",
    description: "Showcase your mastery in a final project and celebrate your achievements.",
    weeks: 1,
    order_index: 6,
  },
];