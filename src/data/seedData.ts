import { CurriculumPhase, CurriculumModule, CurriculumLesson, Quiz, QuizQuestion } from './curriculum';

// Helper to generate UUIDs
const generateId = () => crypto.randomUUID();

// --- Phases ---
const phaseAppendicesId = generateId();
const phase1Id = generateId();
const phase2Id = generateId();
const phase3Id = generateId();
const phase4Id = generateId();
const phase5Id = generateId();
const phase6Id = generateId();

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

// --- Modules ---
const moduleAppendicesAId = generateId();
const moduleAppendicesBId = generateId();
const moduleAppendicesCId = generateId();
const moduleAppendicesDId = generateId();
const moduleAppendicesEId = generateId();
const moduleAppendicesFId = generateId();
const moduleAppendicesGId = generateId();
const moduleAppendicesHId = generateId();

const module1_1Id = generateId();
const module2_1Id = generateId();
const module3_1Id = generateId();
const module4_1Id = generateId();
const module5_1Id = generateId();
const module6_1Id = generateId();

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

// --- Quizzes ---
const week2ReviewQuizId = generateId();

export const seedQuizzes: Quiz[] = [
  {
    id: week2ReviewQuizId,
    title: "Week 2 Review Quiz",
    description: "A quick check on your understanding of Week 2's core concepts.",
    created_at: new Date().toISOString(),
  },
];

// --- Quiz Questions ---
export const seedQuizQuestions: QuizQuestion[] = [
  {
    id: generateId(),
    quiz_id: week2ReviewQuizId,
    question_text: "Which part of the hair follicle is responsible for hair growth?",
    question_type: 'mcq',
    options: ["Hair Shaft", "Dermal Papilla", "Sebaceous Gland", "Arrector Pili Muscle"],
    correct_answer: "Dermal Papilla",
    created_at: new Date().toISOString(),
  },
  {
    id: generateId(),
    quiz_id: week2ReviewQuizId,
    question_text: "What is the primary goal of line cutting techniques?",
    question_type: 'mcq',
    options: ["To create soft, blended layers", "To establish sharp, defined outlines", "To add volume to the hair", "To remove bulk from the interior"],
    correct_answer: "To establish sharp, defined outlines",
    created_at: new Date().toISOString(),
  },
  {
    id: generateId(),
    quiz_id: week2ReviewQuizId,
    question_text: "When combining line and precision cutting, what is crucial for a seamless result?",
    question_type: 'mcq',
    options: ["Using only one type of clipper", "Ignoring the client's head shape", "Smooth blending and transition", "Cutting against the grain exclusively"],
    correct_answer: "Smooth blending and transition",
    created_at: new Date().toISOString(),
  },
];

// --- Lessons ---
export const seedLessons: CurriculumLesson[] = [
  // Appendices Lessons
  { id: generateId(), module_id: moduleAppendicesAId, title: "Appendix A: Tool Encyclopedia — Clippers, Blades, Motors", objectives: "Understand the types and functions of various cutting tools.", content_html: "DYAD_ATTACHMENT_27", order_index: 0, quiz_id: null },
  { id: generateId(), module_id: moduleAppendicesBId, title: "Appendix B: Sanitation, Disinfection & Regulations", objectives: "Master salon hygiene and comply with industry regulations.", content_html: "DYAD_ATTACHMENT_28", order_index: 1, quiz_id: null },
  { id: generateId(), module_id: moduleAppendicesCId, title: "Appendix C: Hair & Scalp Science Atlas", objectives: "Gain a scientific understanding of hair and scalp health.", content_html: "DYAD_ATTACHMENT_29", order_index: 2, quiz_id: null },
  { id: generateId(), module_id: moduleAppendicesDId, title: "Appendix D: First Aid & Blood Spill Protocol", objectives: "Learn emergency first aid and blood spill procedures.", content_html: "DYAD_ATTACHMENT_30", order_index: 3, quiz_id: null },
  { id: generateId(), module_id: moduleAppendicesEId, title: "Appendix E: Consultation Scripts & Client Experience", objectives: "Develop strong consultation skills and enhance client satisfaction.", content_html: "DYAD_ATTACHMENT_31", order_index: 4, quiz_id: null },
  { id: generateId(), module_id: moduleAppendicesFId, title: "Appendix F: Geometry, Symmetry & Fade Blueprint", objectives: "Apply geometric principles to achieve balanced and symmetrical haircuts.", content_html: "DYAD_ATTACHMENT_32", order_index: 5, quiz_id: null },
  { id: generateId(), module_id: moduleAppendicesGId, title: "Appendix G: Ergonomics, Injury Prevention & Workstation Setup", objectives: "Optimize your workstation for health and efficiency.", content_html: "DYAD_ATTACHMENT_33", order_index: 6, quiz_id: null },
  { id: generateId(), module_id: moduleAppendicesHId, title: "Appendix H: Assessment Rubrics & Checklists", objectives: "Utilize rubrics and checklists for self-assessment and skill improvement.", content_html: "DYAD_ATTACHMENT_34", order_index: 7, quiz_id: null },

  // Week 1 Lessons
  { id: generateId(), module_id: module1_1Id, title: "01 Course Overview and Introduction", objectives: "Understand the course structure and learning objectives.", content_html: "DYAD_ATTACHMENT_5", order_index: 0, quiz_id: null },
  { id: generateId(), module_id: module1_1Id, title: "02 History of Line Cutting and Precision Cutting", objectives: "Explore the historical evolution of barbering techniques.", content_html: "DYAD_ATTACHMENT_1", order_index: 1, quiz_id: null },
  { id: generateId(), module_id: module1_1Id, title: "03 Tools and Techniques", objectives: "Identify and correctly use essential barbering tools.", content_html: "DYAD_ATTACHMENT_4", order_index: 2, quiz_id: null },
  { id: generateId(), module_id: module1_1Id, title: "04 Cleanliness and Hygiene", objectives: "Apply proper sanitation and hygiene practices in the salon.", content_html: "DYAD_ATTACHMENT_3", order_index: 3, quiz_id: null },
  { id: generateId(), module_id: module1_1Id, title: "05 Safety and First Aid", objectives: "Implement safety protocols and basic first aid procedures.", content_html: "DYAD_ATTACHMENT_2", order_index: 4, quiz_id: null },

  // Week 2 Lessons
  { id: generateId(), module_id: module2_1Id, title: "01 Understanding the Hair Follicle", objectives: "Gain knowledge of hair biology and growth cycles.", content_html: "DYAD_ATTACHMENT_10", order_index: 0, quiz_id: null },
  { id: generateId(), module_id: module2_1Id, title: "02 Line Cutting Techniques", objectives: "Master fundamental line cutting methods.", content_html: "DYAD_ATTACHMENT_9", order_index: 1, quiz_id: null },
  { id: generateId(), module_id: module2_1Id, title: "03 Precision Cutting Techniques", objectives: "Execute precise cutting methods for various styles.", content_html: "DYAD_ATTACHMENT_6", order_index: 2, quiz_id: null },
  { id: generateId(), module_id: module2_1Id, title: "04 Combining Line and Precision Cutting", objectives: "Integrate line and precision cutting for seamless results.", content_html: "DYAD_ATTACHMENT_8", order_index: 3, quiz_id: null },
  { id: generateId(), module_id: module2_1Id, title: "05 Review and Feedback", objectives: "Evaluate basic cutting skills and receive constructive feedback.", content_html: "DYAD_ATTACHMENT_7", order_index: 4, quiz_id: week2ReviewQuizId }, // Linked to the new quiz

  // Week 3 Lessons
  { id: generateId(), module_id: module3_1Id, title: "01 Advanced Line Cutting Techniques", objectives: "Learn advanced techniques for creating sharp lines and edges.", content_html: "DYAD_ATTACHMENT_14", order_index: 0, quiz_id: null },
  { id: generateId(), module_id: module3_1Id, title: "02 Advanced Precision Cutting Techniques", objectives: "Master intricate precision cuts for complex styles.", content_html: "DYAD_ATTACHMENT_11", order_index: 1, quiz_id: null },
  { id: generateId(), module_id: module3_1Id, title: "03 Combining Advanced Techniques", objectives: "Seamlessly blend advanced line and precision cutting methods.", content_html: "DYAD_ATTACHMENT_13", order_index: 2, quiz_id: null },
  { id: generateId(), module_id: module3_1Id, title: "04 Review and Feedback (Intermediate)", objectives: "Assess intermediate cutting skills and refine techniques.", content_html: "DYAD_ATTACHMENT_12", order_index: 3, quiz_id: null },

  // Week 4 Lessons
  { id: generateId(), module_id: module4_1Id, title: "01 Introduction to Design", objectives: "Understand the principles of hair design and artistic expression.", content_html: "DYAD_ATTACHMENT_19", order_index: 0, quiz_id: null },
  { id: generateId(), module_id: module4_1Id, title: "02 Creating Designs with Line Cutting", objectives: "Utilize line cutting to create distinct hair designs.", content_html: "DYAD_ATTACHMENT_18", order_index: 1, quiz_id: null },
  { id: generateId(), module_id: module4_1Id, title: "03 Creating Designs with Precision Cutting", objectives: "Employ precision cutting for intricate and detailed designs.", content_html: "DYAD_ATTACHMENT_17", order_index: 2, quiz_id: null },
  { id: generateId(), module_id: module4_1Id, title: "04 Combining Designs (Line + Precision)", objectives: "Integrate both line and precision cutting for complex designs.", content_html: "DYAD_ATTACHMENT_15", order_index: 3, quiz_id: null },
  { id: generateId(), module_id: module4_1Id, title: "05 Review and Feedback (Design)", objectives: "Evaluate design skills and receive feedback on creative work.", content_html: "DYAD_ATTACHMENT_16", order_index: 4, quiz_id: null },

  // Week 5 Lessons
  { id: generateId(), module_id: module5_1Id, title: "01 Advanced Design Techniques", objectives: "Master advanced techniques for highly creative hair designs.", content_html: "DYAD_ATTACHMENT_20", order_index: 0, quiz_id: null },
  { id: generateId(), module_id: module5_1Id, title: "02 Practical Application", objectives: "Apply all learned skills in a comprehensive practical session.", content_html: "DYAD_ATTACHMENT_22", order_index: 1, quiz_id: null },
  { id: generateId(), module_id: module5_1Id, title: "03 Review and Feedback (Craft)", objectives: "Receive detailed feedback on practical application and overall craft.", content_html: "DYAD_ATTACHMENT_21", order_index: 2, quiz_id: null },

  // Week 6 Lessons
  { id: generateId(), module_id: module6_1Id, title: "01 Final Project Planning", objectives: "Plan and conceptualize the final graduation project.", content_html: "DYAD_ATTACHMENT_26", order_index: 0, quiz_id: null },
  { id: generateId(), module_id: module6_1Id, title: "02 Final Project Execution", objectives: "Execute the final project demonstrating mastery of all techniques.", content_html: "DYAD_ATTACHMENT_23", order_index: 1, quiz_id: null },
  { id: generateId(), module_id: module6_1Id, title: "03 Review and Feedback (Final Project)", objectives: "Present and receive feedback on the completed final project.", content_html: "DYAD_ATTACHMENT_25", order_index: 2, quiz_id: null },
  { id: generateId(), module_id: module6_1Id, title: "04 Graduation Ceremony", objectives: "Celebrate the successful completion of the Axum Barber Academy.", content_html: "DYAD_ATTACHMENT_24", order_index: 3, quiz_id: null },
];