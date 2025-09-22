import { CurriculumModule } from '@/data/curriculum';
import {
  phaseAppendicesId,
  phase1Id,
  phase2Id,
  phase3Id,
  phase4Id,
  phase5Id,
  phase6Id,
} from '@/data/seed/phases';

// --- Modules ---
export const moduleAppendicesAId = "b0000000-0000-4000-8000-000000000000";
export const moduleAppendicesBId = "b0000000-0000-4000-8000-000000000001";
export const moduleAppendicesCId = "b0000000-0000-4000-8000-000000000002";
export const moduleAppendicesDId = "b0000000-0000-4000-8000-000000000003";
export const moduleAppendicesEId = "b0000000-0000-4000-8000-000000000004";
export const moduleAppendicesFId = "b0000000-0000-4000-8000-000000000005";
export const moduleAppendicesGId = "b0000000-0000-4000-8000-000000000006";
export const moduleAppendicesHId = "b0000000-0000-4000-8000-000000000007";

export const module1_1Id = "b0000000-0000-4000-8000-000000000008";
export const module2_1Id = "b0000000-0000-4000-8000-000000000009";
export const module3_1Id = "b0000000-0000-4000-8000-00000000000a";
export const module4_1Id = "b0000000-0000-4000-8000-00000000000b";
export const module5_1Id = "b0000000-0000-4000-8000-00000000000c";
export const module6_1Id = "b0000000-0000-4000-8000-00000000000d";

export const seedModules: CurriculumModule[] = [
  // Appendices Modules
  { id: moduleAppendicesAId, phase_id: phaseAppendicesId, title: "Appendix A: Tool Encyclopedia", description: "Detailed guide to clippers, blades, and motors.", order_index: 0 },
  { id: moduleAppendicesBId, phase_id: phaseAppendicesId, title: "Appendix B: Sanitation, Disinfection & Regulations", description: "Comprehensive guide to salon hygiene and legal requirements.", order_index: 1 },
  { id: moduleAppendicesCId, phase_id: phaseAppendicesId, title: "Appendix C: Hair & Scalp Science Atlas", description: "In-depth look at hair biology and scalp conditions.", order_index: 2 },
  { id: moduleAppendicesDId, phase_id: phaseAppendicesId, title: "Appendix D: First Aid & Blood Spill Protocol", description: "Essential procedures for emergencies and blood spill management.", order_index: 3 },
  { id: moduleAppendicesEId, phase_id: phaseAppendicesId, title: "Appendix E: Consultation Scripts & Client Experience", description: "Techniques for effective client communication and satisfaction.", order_index: 4 },
  { id: moduleAppendicesFId, phase_id: phaseAppendicesId, title: "Appendix F: Geometry, Symmetry & Fade Blueprint", description: "Principles of geometric cutting and fade construction.", order_index: 5 },
  { id: moduleAppendicesGId, phase_id: phaseAppendicesId, title: "Appendix G: Ergonomics, Injury Prevention & Workstation Setup", description: "Best practices for maintaining health and an efficient workspace.", order_index: 6 },
  { id: moduleAppendicesHId, phase_id: phaseAppendicesId, title: "Appendix H: Assessment Rubrics & Checklists", description: "Tools for self-assessment and performance evaluation.", order_index: 7 },

  // Week 1 Module
  { id: module1_1Id, phase_id: phase1Id, title: "Week 1 Lessons", description: "Core lessons for the first week of the academy.", order_index: 0 },
  // Week 2 Module
  { id: module2_1Id, phase_id: phase2Id, title: "Week 2 Lessons", description: "Building on the basics with hair follicle science and cutting techniques.", order_index: 0 },
  // Week 3 Module
  { id: module3_1Id, phase_id: phase3Id, title: "Week 3 Lessons", description: "Intermediate cutting techniques and combinations.", order_index: 0 },
  // Week 4 Module
  { id: module4_1Id, phase_id: phase4Id, title: "Week 4 Lessons", description: "Introduction to design and creative cutting applications.", order_index: 0 },
  // Week 5 Module
  { id: module5_1Id, phase_id: phase5Id, title: "Week 5 Lessons", description: "Advanced design and practical application of learned skills.", order_index: 0 },
  // Week 6 Module
  { id: module6_1Id, phase_id: phase6Id, title: "Week 6 Lessons", description: "Final project preparation, execution, and graduation.", order_index: 0 },
];