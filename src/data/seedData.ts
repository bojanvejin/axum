import { CurriculumPhase, CurriculumModule, CurriculumLesson, Quiz, QuizQuestion } from './curriculum';

// --- Phases ---
const phaseAppendicesId = "a0000000-0000-4000-8000-000000000000";
const phase1Id = "a0000000-0000-4000-8000-000000000001";
const phase2Id = "a0000000-0000-4000-8000-000000000002";
const phase3Id = "a0000000-0000-4000-8000-000000000003";
const phase4Id = "a0000000-0000-4000-8000-000000000004";
const phase5Id = "a0000000-0000-4000-8000-000000000005";
const phase6Id = "a0000000-0000-4000-8000-000000000006";

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
const moduleAppendicesAId = "b0000000-0000-4000-8000-000000000000";
const moduleAppendicesBId = "b0000000-0000-4000-8000-000000000001";
const moduleAppendicesCId = "b0000000-0000-4000-8000-000000000002";
const moduleAppendicesDId = "b0000000-0000-4000-8000-000000000003";
const moduleAppendicesEId = "b0000000-0000-4000-8000-000000000004";
const moduleAppendicesFId = "b0000000-0000-4000-8000-000000000005";
const moduleAppendicesGId = "b0000000-0000-4000-8000-000000000006";
const moduleAppendicesHId = "b0000000-0000-4000-8000-000000000007";

const module1_1Id = "b0000000-0000-4000-8000-000000000008";
const module2_1Id = "b0000000-0000-4000-8000-000000000009";
const module3_1Id = "b0000000-0000-4000-8000-00000000000a";
const module4_1Id = "b0000000-0000-4000-8000-00000000000b";
const module5_1Id = "b0000000-0000-4000-8000-00000000000c";
const module6_1Id = "b0000000-0000-4000-8000-00000000000d";

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
const week2ReviewQuizId = "c0000000-0000-4000-8000-000000000000";

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
    id: "d0000000-0000-4000-8000-000000000000",
    quiz_id: week2ReviewQuizId,
    question_text: "Which part of the hair follicle is responsible for hair growth?",
    question_type: 'mcq',
    options: ["Hair Shaft", "Dermal Papilla", "Sebaceous Gland", "Arrector Pili Muscle"],
    correct_answer: "Dermal Papilla",
    created_at: new Date().toISOString(),
  },
  {
    id: "d0000000-0000-4000-8000-000000000001",
    quiz_id: week2ReviewQuizId,
    question_text: "What is the primary goal of line cutting techniques?",
    question_type: 'mcq',
    options: ["To create soft, blended layers", "To establish sharp, defined outlines", "To add volume to the hair", "To remove bulk from the interior"],
    correct_answer: "To establish sharp, defined outlines",
    created_at: new Date().toISOString(),
  },
  {
    id: "d0000000-0000-4000-8000-000000000002",
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
  { id: "e0000000-0000-4000-8000-000000000000", module_id: moduleAppendicesAId, title: "Appendix A: Tool Encyclopedia — Clippers, Blades, Motors", objectives: "Understand the types and functions of various cutting tools.", content_html: `# Appendix A: Tool Encyclopedia — Clippers, Blades, Motors

## Purpose & Focus
Understand the types and functions of various cutting tools.

## Content
This section provides an in-depth look at the different types of clippers, blades, and motors used in professional barbering. Learn about their maintenance, usage, and how to choose the right tool for the job.
`, order_index: 0, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000001", module_id: moduleAppendicesBId, title: "Appendix B: Sanitation, Disinfection & Regulations", objectives: "Master salon hygiene and comply with industry regulations.", content_html: `# Appendix B: Sanitation, Disinfection & Regulations

## Purpose & Focus
Master salon hygiene and comply with industry regulations.

## Content
This appendix covers all aspects of sanitation and disinfection in a barbering environment, including state board regulations, proper cleaning procedures, and product safety.
`, order_index: 1, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000002", module_id: moduleAppendicesCId, title: "Appendix C: Hair & Scalp Science Atlas", objectives: "Gain a scientific understanding of hair and scalp health.", content_html: `# Appendix C: Hair & Scalp Science Atlas

## Purpose & Focus
Gain a scientific understanding of hair and scalp health.

## Content
Delve into the anatomy and physiology of hair and scalp. Understand common conditions, hair growth cycles, and how different treatments affect hair structure.
`, order_index: 2, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000003", module_id: moduleAppendicesDId, title: "Appendix D: First Aid & Blood Spill Protocol", objectives: "Learn emergency first aid and blood spill procedures.", content_html: `# Appendix D: First Aid & Blood Spill Protocol

## Purpose & Focus
Learn emergency first aid and blood spill procedures.

## Content
This section provides crucial information on handling minor injuries and implementing blood spill protocols to ensure client and barber safety.
`, order_index: 3, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000004", module_id: moduleAppendicesEId, title: "Appendix E: Consultation Scripts & Client Experience", objectives: "Develop strong consultation skills and enhance client satisfaction.", content_html: `# Appendix E: Consultation Scripts & Client Experience

## Purpose & Focus
Develop strong consultation skills and enhance client satisfaction.

## Content
Learn effective communication strategies, consultation scripts, and techniques to build rapport and provide an exceptional client experience.
`, order_index: 4, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000005", module_id: moduleAppendicesFId, title: "Appendix F: Geometry, Symmetry & Fade Blueprint", objectives: "Apply geometric principles to achieve balanced and symmetrical haircuts.", content_html: `# Appendix F: Geometry, Symmetry & Fade Blueprint

## Purpose & Focus
Apply geometric principles to achieve balanced and symmetrical haircuts.

## Content
Understand the mathematical principles behind perfect haircuts, including head shape analysis, sectioning for symmetry, and constructing flawless fades.
`, order_index: 5, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000006", module_id: moduleAppendicesGId, title: "Appendix G: Ergonomics, Injury Prevention & Workstation Setup", objectives: "Optimize your workstation for health and efficiency.", content_html: `# Appendix G: Ergonomics, Injury Prevention & Workstation Setup

## Purpose & Focus
Optimize your workstation for health and efficiency.

## Content
Discover ergonomic best practices to prevent common barbering injuries. Learn how to set up your workstation for maximum efficiency and comfort.
`, order_index: 6, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000007", module_id: moduleAppendicesHId, title: "Appendix H: Assessment Rubrics & Checklists", objectives: "Utilize rubrics and checklists for self-assessment and skill improvement.", content_html: `# Appendix H: Assessment Rubrics & Checklists

## Purpose & Focus
Utilize rubrics and checklists for self-assessment and skill improvement.

## Content
This appendix provides various rubrics and checklists to help you evaluate your own work and track your progress throughout the academy.
`, order_index: 7, quiz_id: null },

  // Week 1 Lessons
  { id: "e0000000-0000-4000-8000-000000000008", module_id: module1_1Id, title: "01 Course Overview and Introduction", objectives: "Understand the course structure and learning objectives.", content_html: `# Course Overview and Introduction

## 🎯 Learning Objectives
- Understand the structure, flow, and expectations of the AXUM Academy course.
- Recognize the role of line cutting and precision cutting in modern barbering.
- Begin developing a professional mindset toward barbering as both craft and culture.
- Identify personal goals and aspirations for your barbering journey.

## 🏠 At-Home Learning
### Welcome to AXUM Academy
Barbering is more than a trade — it’s a cultural expression, a way of carrying tradition while innovating for the future. At AXUM, barbering is:
- **Art**: Every haircut is a live canvas.
- **Science**: Precision depends on knowledge of tools, technique, and anatomy.
- **Lifestyle**: Cleanliness, respect, and community are the cornerstones of this craft.

### Reading
- “The Importance of Line & Precision Cutting” (1-page PDF).

### Reflection Prompt
Write in your journal (1 paragraph each):
1. What drew you to barbering?
2. What do you want to master most: clean lines, artistic designs, or overall craft?
3. How do you want people to feel when they sit in your chair?

## 🏫 In-Class Learning
- **Icebreaker**: Introductions + personal barbering goals.
- **Course Walkthrough**: Overview of the 6-week roadmap.
- **Visual Thinking Activity**: Group discussion on haircut examples.
- **Hands-On Exercise**: Sketch 3 haircut outlines (straight, curved, angular).

## ✍️ Assignment / Practice
- **At Home**: Record a 2-min video introducing yourself and your barbering mission.
- **In Class**: Submit 3 sketches of haircut outlines.

## 🧾 Review & Feedback
- Quiz: 5 quick questions on concepts.
- Peer feedback: Compliment + suggestion exchange.
- Instructor feedback on mission video and sketches.

## 📚 Resources
- *Milady Standard Barbering* (Intro & Ch.1).
- YouTube: “The Power of a Sharp Hairline”.
- Instagram: Case studies from @juliuscaesar and @robtheoriginal.
`, order_index: 0, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000009", module_id: module1_1Id, title: "02 History of Line Cutting and Precision Cutting", objectives: "Explore the historical evolution of barbering techniques.", content_html: `# History of Line Cutting and Precision Cutting

## 🎯 Learning Objectives
- Trace the evolution of line and precision cutting through history.
- Identify key figures and eras that shaped barbering.
- Connect cultural grooming traditions to modern practice.

## 🏠 At-Home Learning
### Reading
- Timeline of barbering from Ancient Egypt, Greece, and Rome, through the Renaissance and modern-day shops.
- Spotlight: African-American barber shops as cultural hubs.
- Influence of hip hop, sports, and fashion on line-ups and designs.

### Reflection Prompt
Which historical era or culture do you feel most connected to in terms of barbering? Why?

## 🏫 In-Class Learning
- **Lecture/Demo**: Visual slides of barbering across centuries.
- **Group Discussion**: Compare ancient grooming rituals to modern trends.
- **Hands-On Exercise**: Practice “ancient inspired” lines on paper before translating into hair.

## ✍️ Assignment / Practice
Write a one-page reflection on how history inspires your craft.

## 🧾 Review & Feedback
Quiz on key historical points. Group feedback on reflections.

## 📚 Resources
- *Milady Standard Barbering* (History of Barbering chapter).
- YouTube: “The History of Barbering” (5 min).
- Article: “Barbershops as Community Anchors”.
`, order_index: 1, quiz_id: null },
  { id: "e0000000-0000-4000-8000-00000000000a", module_id: module1_1Id, title: "03 Tools and Techniques", objectives: "Identify and correctly use essential barbering tools.", content_html: `# Tools and Techniques

## 🎯 Learning Objectives
- Learn the tools essential for line and precision cutting.
- Understand razors, clippers, trimmers, guards, and combs.
- Practice basic handling, grip, and safety principles.

## 🏠 At-Home Learning
### Reading
- Tool overview: Clippers, trimmers, razors, shears, combs, guards.
- Tool maintenance: Cleaning, oiling, and blade alignment.

### Video
- Short clip: “Essential Barber Tools and Their Uses”.

## 🏫 In-Class Learning
- Instructor demo: Proper grip + handling of each tool.
- Student rotation: Practice holding tools correctly.
- Safety practice: Pass tools to a partner correctly.

## ✍️ Assignment / Practice
At home: Clean and oil your clippers, record the process.
In class: Perform 3 passes with a clipper on a mannequin head.

## 🧾 Review & Feedback
- Quiz on tool names and uses.
- Peer and instructor feedback on handling techniques.

## 📚 Resources
- *Milady Standard Barbering*, Tools chapter.
- YouTube: “Clipper vs. Trimmer: What’s the Difference?”.
`, order_index: 2, quiz_id: null },
  { id: "e0000000-0000-4000-8000-00000000000b", module_id: module1_1Id, title: "04 Cleanliness and Hygiene", objectives: "Apply proper sanitation and hygiene practices in the salon.", content_html: `# Cleanliness and Hygiene

## 🎯 Learning Objectives
- Understand sterilization and sanitation in barbering.
- Learn how to maintain a clean workstation.
- Build client trust through professional hygiene.

## 🏠 At-Home Learning
- Reading: Disinfection vs. sterilization.
- Video: “Barber Shop Sanitation Rules”.

## 🏫 In-Class Learning
- Demo: Disinfecting clippers + tools.
- Group activity: Setting up a clean workstation.
- Peer check: Spot cleanliness errors in staged setups.

## ✍️ Assignment / Practice
At home: Write a sanitation checklist.
In class: Execute sanitation drill in under 10 minutes.

## 🧾 Review & Feedback
- Quiz: Identify correct sanitation practices.
- Instructor feedback on workstation setup.

## 📚 Resources
- Milady: Sanitation and Hygiene chapter.
- Local health regulations PDF.
`, order_index: 3, quiz_id: null },
  { id: "e0000000-0000-4000-8000-00000000000c", module_id: module1_1Id, title: "05 Safety and First Aid", objectives: "Implement safety protocols and basic first aid procedures.", content_html: `# Safety and First Aid

## 🎯 Learning Objectives
- Identify risks and hazards in cutting.
- Learn basic first aid for barbering accidents.
- Practice safe tool use.

## 🏠 At-Home Learning
- Reading: Common barbering accidents (cuts, burns, infections).
- Video: “Basic First Aid for Barbers”.

## 🏫 In-Class Learning
- Demo: Handling a cut client safely.
- Hands-on: Practice bandaging on a mannequin.
- Discussion: Protective gear (gloves, aprons, guards).

## ✍️ Assignment / Practice
At home: Write a short response — why safety = professionalism?
In class: Perform a mock “incident response drill”.

## 🧾 Review & Feedback
- Quiz: Safety scenarios.
- Peer feedback on drill performance.

## 📚 Resources
- Red Cross First Aid Basics PDF.
- Health & Safety Guidelines for Barbers.
`, order_index: 4, quiz_id: null },

  // Week 2 Lessons
  { id: "e0000000-0000-4000-8000-00000000000d", module_id: module2_1Id, title: "01 Understanding the Hair Follicle", objectives: "Gain knowledge of hair biology and growth cycles.", content_html: `# 01 Understanding the Hair Follicle

## 🎯 Learning Objectives
- Gain knowledge of hair biology and growth cycles.
- Identify different hair types and textures.
- Understand how hair structure influences cutting techniques.

## 🏠 At-Home Learning
### Reading
- **The Hair Follicle: A Microscopic Marvel**: Explore the intricate structure of the hair follicle, including the dermal papilla, hair bulb, sebaceous gland, and arrector pili muscle. Understand their individual functions and how they contribute to hair growth and health.
- **Hair Growth Cycle Explained**: Delve into the three main phases of hair growth:
    -   **Anagen (Growing Phase)**: The active growth period, lasting 2-7 years.
    -   **Catagen (Transition Phase)**: A short transitional phase where hair growth stops, lasting about 2-3 weeks.
    -   **Telogen (Resting Phase)**: The resting phase where old hair falls out, lasting around 3 months.
- **Hair Types and Textures**: Learn to differentiate between various hair types (straight, wavy, curly, coily) and textures (fine, medium, coarse). Understand how these characteristics affect hair's behavior during cutting and styling.
- **Impact of Hair Structure on Cutting**: Discover how the natural growth pattern, elasticity, and density of different hair types influence tool selection, cutting angles, and overall haircut outcome.

### Video
- **"The Hair Growth Cycle: An Animated Journey" (7 min)**: A visual explanation of the hair growth phases and the biological processes involved.
- **"Identifying Hair Types & Textures for Barbers" (12 min)**: A practical guide on how to assess a client's hair type and texture, and its implications for cutting.

### Reflection Prompt
Consider a client with very curly, dense hair versus a client with fine, straight hair. How would your approach to sectioning, tension, and tool choice differ significantly for each, based on your understanding of their hair follicles and structure?

## 🏫 In-Class Learning
- **Lecture/Discussion**:
    -   **Deep Dive into Hair Anatomy**: Review the detailed structure of the hair follicle and its components. Discuss common misconceptions about hair growth.
    -   **Interactive Hair Typing Session**: Using visual aids and possibly hair samples, practice identifying different hair types (Type 1-4, A-C sub-classifications) and textures.
    -   **Growth Patterns and Cowlicks**: Understand the significance of natural growth patterns, whorls, and cowlicks, and how to work with them rather than against them for a seamless cut.
- **Group Activity**:
    -   **"Client Scenario Challenge"**: Students are given various client profiles (e.g., receding hairline, thick Afro-textured hair, fine thinning hair) and must discuss and present their recommended cutting strategies, tool choices, and potential challenges.
    -   **Microscope Exploration (if available)**: Observe different hair strands under a microscope to see variations in cuticle layers, thickness, and cross-sectional shape.
- **Case Study**:
    -   **"The Unruly Cowlick"**: Analyze a case where a barber struggled with a prominent cowlick. Discuss solutions, including cutting techniques, styling advice, and client communication.

## ✍️ Assignment / Practice
- **At Home**:
    -   **Hair Analysis Journal**: For three different individuals (friends, family, or even yourself), document their hair type, texture, growth patterns, and any unique characteristics. Write a paragraph for each on how this information would guide your cutting decisions.
    -   **Research**: Choose one common hair or scalp condition (e.g., androgenetic alopecia, seborrheic dermatitis, psoriasis) and write a one-page summary detailing its causes, symptoms, and how a barber should approach a client with this condition (e.g., precautions, recommendations, when to refer to a dermatologist).
- **In Class**:
    -   **Hair Texture Assessment Drill**: In pairs, students will assess each other's hair (or mannequin hair) for type, texture, and growth patterns, providing a brief verbal report to the instructor.
    -   **Tool Adaptation Discussion**: Discuss how specific hair characteristics (e.g., extreme density, very fine hair) might necessitate adjusting clipper guards, blade types, or shear techniques.

## 🧾 Review & Feedback
- **Quiz**: A short quiz covering hair follicle anatomy, growth cycles, and hair typing terminology.
- **Peer Discussion**: Share insights from the "Hair Analysis Journal" and discuss different approaches to the research summaries.
- **Instructor Q&A**: Open forum for questions and clarification on complex hair science topics.

## 📚 Resources
- *Milady Standard Barbering*, "Hair and Scalp" chapter (latest edition).
- American Academy of Dermatology: [aad.org](https://www.aad.org/) (for hair loss and scalp conditions).
- Hair Science Online: [hairscience.org](https://www.hairscience.org/) (for in-depth articles).
`, order_index: 0, quiz_id: null },
  { id: "e0000000-0000-4000-8000-00000000000e", module_id: module2_1Id, title: "02 Line Cutting Techniques", objectives: "Master fundamental line cutting methods.", content_html: `# 02 Line Cutting Techniques

## 🎯 Learning Objectives
- Master fundamental line cutting methods.
- Execute precise straight and curved lines.
- Understand the importance of tension and angle.
- Develop a steady hand and keen eye for detail in creating sharp outlines.

## 🏠 At-Home Learning
### Reading
- **"The Art of the Edge: Fundamentals of Line Work"**: This article covers the foundational principles of creating sharp, clean lines in barbering. It emphasizes the importance of a steady hand, proper tool selection, and understanding hair growth patterns.
- **"Mastering the Hairline: Straight vs. Curved"**: A detailed guide on how to approach different hairline shapes. It provides step-by-step instructions for achieving crisp straight lines (e.g., for a box cut or temple fade) and smooth curved lines (e.g., for a rounded nape or C-cup).
- **"Tension and Angle: The Unsung Heroes of Line Cutting"**: Learn why consistent hair tension and the correct blade angle are critical for preventing uneven lines and irritation. Explore how different angles affect the final sharpness and longevity of the line.

### Video
- **"Beginner Line-Up Techniques: The Basics" (10 min)**: A comprehensive tutorial demonstrating how to hold trimmers, create a baseline, and execute simple straight and curved lines on a mannequin head.
- **"Achieving a Crisp C-Cup and Nape Line" (8 min)**: Focuses specifically on curved line work, showing techniques for smooth transitions and symmetrical results.
- **"Tool Control & Blade Angle for Sharp Lines" (5 min)**: Highlights common mistakes and best practices for maintaining optimal blade angle and tension.

### Reflection Prompt
Imagine you are performing a line-up on a client with a very uneven natural hairline. How would you use your understanding of tension, blade angle, and hair growth patterns to create the sharpest, most symmetrical line possible while minimizing the removal of natural hair? What challenges do you anticipate, and how would you address them?

## 🏫 In-Class Learning
- **Lecture/Demo**:
    -   **Tool Mastery for Line Work**: Review the specific features of trimmers (T-blade vs. square blade), edgers, and straight razors used for line cutting. Demonstrate proper cleaning and maintenance.
    -   **Establishing the Baseline**: Instructor demonstrates how to identify the natural hairline, establish a clean, symmetrical baseline, and work from the center outwards for both straight and curved lines on a mannequin.
    -   **The "Flick" and "Scoop" Techniques**: Demonstrate the subtle wrist movements required for a clean "flick" to remove hair without digging in, and the "scoop" for softer transitions.
- **Hands-On Exercise**:
    -   **Practice Sheet Drills**: Students will use trimmers (or even markers on paper) to practice drawing perfectly straight lines, various curved lines, and sharp corners. This builds muscle memory and hand-eye coordination.
    -   **Mannequin Line-Up Practice**: Students will perform basic hairline line-ups on mannequins, focusing on:
        -   Creating a crisp front hairline.
        -   Executing symmetrical temple lines.
        -   Shaping the nape line (straight, rounded, or tapered).
    -   **Tension and Angle Workshop**: Practice applying consistent tension to the skin and maintaining a precise blade angle (typically 90 degrees to the skin for initial lines, then adjusting for detailing) to avoid irritation and achieve maximum sharpness.
- **Peer Review**:
    -   Students will pair up to evaluate each other's line work on mannequins. Provide constructive feedback on symmetry, sharpness, and cleanliness of lines. Use a checklist focusing on key criteria.

## ✍️ Assignment / Practice
- **At Home**:
    -   **"Line Art Challenge"**: On a practice sheet or a digital drawing app, create 10 different line designs, including a mix of straight, curved, and angular elements. Focus on symmetry and precision.
    -   **Tool Maintenance Video**: Record a short video (2-3 minutes) demonstrating the proper cleaning, oiling, and blade alignment of your personal trimmers. Explain why each step is important.
- **In Class**:
    -   **Timed Hairline Line-Up**: Perform a complete hairline line-up (front, temples, nape) on a mannequin within a set time limit (e.g., 10-15 minutes), emphasizing speed without sacrificing precision.
    -   **Critique Session**: Present your timed line-up to the class and instructor for detailed feedback. Be prepared to explain your process and challenges.

## 🧾 Review & Feedback
- **Quiz**: A quick quiz identifying correct blade angles, common line-cutting tools, and techniques for achieving symmetry.
- **Instructor Feedback**: Individualized feedback on mannequin line-ups, focusing on areas for improvement in technique, consistency, and efficiency.
- **Group Discussion**: Share tips and tricks for achieving ultra-sharp lines and discuss common challenges encountered during practice.

## 📚 Resources
- *Milady Standard Barbering*, "Basic Haircutting" and "Shaving and Facial Hair Design" chapters.
- YouTube Channels: "360Jeezy", "Chris Bossio", "SlikNik The Barber" (for visual demonstrations).
- Online Articles: "Barbering 101: The Perfect Line Up" from professional barbering blogs.
`, order_index: 1, quiz_id: null },
  { id: "e0000000-0000-4000-8000-00000000000f", module_id: module2_1Id, title: "03 Precision Cutting Techniques", objectives: "Execute precise cutting methods for various styles.", content_html: `# 03 Precision Cutting Techniques

## 🎯 Learning Objectives
- Execute precise cutting methods for various styles.
- Master the use of shears and clippers for blending and shaping.
- Understand the principles of graduation and layering.
- Develop the ability to create smooth, seamless transitions and fades.

## 🏠 At-Home Learning
### Reading
- **"The Science of the Fade: Gradients and Tapers"**: This comprehensive guide breaks down the physics and artistry behind creating flawless fades. It explains how to achieve smooth transitions from skin to longer hair, covering different fade types (low, mid, high, skin).
- **"Scissor-Over-Comb & Clipper-Over-Comb Mastery"**: Learn the essential techniques for blending and shaping hair using a comb as a guide. Understand how to control the comb angle and tool movement to remove bulk and create soft, natural transitions.
- **"Graduation and Layering: Building Blocks of Haircuts"**: Explore the fundamental principles of graduation (building weight) and layering (removing weight). Understand how these techniques are used to create shape, movement, and texture in a haircut.

### Video
- **"Basic Fade Techniques: Low, Mid, High" (12 min)**: A step-by-step tutorial demonstrating how to set a baseline, use different guards, and blend effectively for various fade heights.
- **"Clipper-Over-Comb & Scissor-Over-Comb Explained" (10 min)**: Visual demonstrations of proper hand positioning, comb angle, and tool movement for seamless blending.
- **"Understanding Graduation and Layering in Barbering" (7 min)**: Illustrates how to apply these techniques to create different shapes and volumes in a haircut.

### Reflection Prompt
Consider a client who wants a "mid-fade" with a natural, blended top. Describe your step-by-step process for achieving this, focusing on how you would transition from the faded sides to the longer top, and what tools and techniques you would prioritize for a seamless result. What are the potential pitfalls, and how would you avoid them?

## 🏫 In-Class Learning
- **Lecture/Demo**:
    -   **Fade Theory & Zones**: Instructor explains the different zones of a fade (bald, shortest guard, blending zone) and how to systematically work through them. Demonstrate setting the initial guideline and using the "lever play" technique.
    -   **Tool Application for Blending**: Demonstrate advanced use of clippers with various guards, detailing trimmers, and straight razors for refining fades. Show how to use shears for point cutting and texturizing.
    -   **Head Shape Analysis for Fades**: Discuss how different head shapes (e.g., flat spots, prominent occipital bone) influence fade placement and blending strategies.
- **Hands-On Exercise**:
    -   **"Fade Ladder" Drill**: Students practice creating a series of distinct, evenly spaced guidelines on a mannequin, then systematically blend them out using increasing guard sizes and lever adjustments.
    -   **Basic Taper Fade Practice**: Students perform a basic taper fade on mannequins, focusing on:
        -   Establishing a clean, soft baseline.
        -   Creating a smooth, gradual transition from short to long.
        -   Using clipper-over-comb and scissor-over-comb for blending the top section into the fade.
    -   **Detailing with Trimmers and Razors**: Practice using the corners of trimmers and the edge of a straight razor to clean up the perimeter and enhance the sharpness of the fade line.
- **Peer Review**:
    -   Students will evaluate each other's fades on mannequins. Provide constructive feedback on the smoothness of the blend, the absence of harsh lines, and overall symmetry. Use a rubric focusing on fade quality.

## ✍️ Assignment / Practice
- **At Home**:
    -   **"Fade Blueprint" Drawing**: On a diagram of a head, draw and label the different zones of a low, mid, and high fade. Indicate which guards and techniques you would use in each zone.
    -   **Blending Practice**: Practice clipper-over-comb and scissor-over-comb techniques on a practice hair swatch or a section of a mannequin head for at least 30 minutes, focusing on achieving a consistent, even blend.
- **In Class**:
    -   **Full Taper Fade Execution**: Perform a complete taper fade on a mannequin, from setting the initial guideline to blending the top. The focus is on a clean, blended result within a reasonable timeframe.
    -   **Critique Session**: Present your fade to the class and instructor for detailed feedback on technical execution, blending quality, and overall shape.

## 🧾 Review & Feedback
- **Quiz**: A quiz identifying different fade types, blending tools, and the principles of graduation and layering.
- **Instructor Feedback**: Individualized feedback on mannequin fades, highlighting strengths and areas for improvement in blending, tool control, and efficiency.
- **Group Discussion**: Share challenges encountered during fade practice and discuss effective strategies for overcoming them.

## 📚 Resources
- *Milady Standard Barbering*, "Fading and Tapering" and "Clipper and Shear Techniques" chapters.
- YouTube Channels: "360Jeezy", "Chris Bossio", "Rum Barber" (for advanced fade techniques).
- Online Articles: "The Ultimate Guide to Fades" from professional barbering resources.
`, order_index: 2, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000010", module_id: module2_1Id, title: "04 Combining Line and Precision Cutting", objectives: "Integrate line and precision cutting for seamless results.", content_html: `# 04 Combining Line and Precision Cutting

## 🎯 Learning Objectives
- Integrate line and precision cutting for seamless results.
- Understand how to transition between different cutting techniques.
- Develop a cohesive workflow for a complete haircut.
- Master the art of creating a balanced and harmonious overall look.

## 🏠 At-Home Learning
### Reading
- **"Seamless Transitions: The Art of Blending Techniques"**: This article delves into the critical skill of transitioning smoothly between sharp line work and soft precision blends. It covers how to avoid harsh demarcation lines and create a cohesive flow throughout the haircut.
- **"Case Studies: Iconic Combined Cuts"**: Analyze various classic and modern haircuts that exemplify excellent integration of line and precision cutting (e.g., a classic pompadour with a sharp side part and a blended taper, or a textured crop with a crisp fringe line and a skin fade).
- **"Workflow Efficiency: From Consultation to Finish"**: Learn how to plan your haircutting process to efficiently move from establishing lines to executing precision blends, ensuring a consistent and high-quality result within a professional timeframe.

### Video
- **"Full Haircut Workflow: Line-Up to Fade & Style" (15 min)**: A comprehensive video demonstrating a complete haircut, starting with the line-up, moving to the fade, and finishing with styling, highlighting the transitions between each stage.
- **"Bridging the Gap: Connecting Lines and Fades" (10 min)**: Focuses specifically on the blending techniques used to connect a sharp perimeter line with a soft, graduated fade, ensuring no visible lines or steps.
- **"Symmetry & Balance in Combined Haircuts" (8 min)**: Explores how to maintain overall symmetry and balance when integrating different cutting techniques, considering head shape and client features.

### Reflection Prompt
You have a client requesting a "classic taper with a hard part and a natural-looking top." This requires both sharp line work (hard part, perimeter) and soft blending (taper, top). Outline your complete workflow, from initial sectioning to final styling, detailing how you would ensure a seamless and balanced integration of these contrasting techniques. What specific challenges might arise, and how would you overcome them?

## 🏫 In-Class Learning
- **Lecture/Demo**:
    -   **Integrated Haircut Planning**: Instructor demonstrates how to plan a haircut that requires both line and precision elements, emphasizing pre-sectioning, establishing guidelines, and anticipating blending needs.
    -   **Demonstration of Key Transitions**: Show specific techniques for smoothly transitioning from a sharp line (e.g., a C-cup or hard part) into a blended fade or graduated length. This includes using the corners of trimmers, shear-over-comb, and subtle clipper work.
    -   **Client Communication for Combined Styles**: Discuss how to effectively consult with clients about combined styles, managing expectations regarding sharpness, blend, and maintenance.
- **Hands-On Exercise**:
    -   **"Combined Cut Challenge"**: Students will perform a complete haircut on a mannequin that requires both prominent line work and intricate precision blending. Examples include:
        -   A low fade with a sharp front hairline and a textured top.
        -   A classic side part with a crisp line and a blended taper on the sides.
    -   **Focus on Transition Zones**: Pay close attention to the areas where line work meets blending, ensuring there are no visible lines of demarcation. Practice softening harsh lines with detailing tools.
    -   **Symmetry and Balance Check**: Regularly step back and assess the haircut from all angles, using mirrors to ensure symmetry and overall balance between the different elements.
- **Troubleshooting Session**:
    -   **Common Blending Issues**: Address problems like "lines getting stuck," uneven fades, or choppy transitions. Discuss and demonstrate corrective techniques.
    -   **Tool Selection for Specific Blends**: Experiment with different comb types, clipper guards, and shear sizes to find the optimal tools for various blending scenarios.

## ✍️ Assignment / Practice
- **At Home**:
    -   **"Signature Combined Cut" Sketch**: Design a unique haircut that effectively integrates both sharp line work and soft precision blending. Sketch the front, side, and back views, labeling the techniques used in each area.
    -   **Video Analysis**: Watch a professional barber perform a complex combined haircut. Identify at least five specific moments where they skillfully transition between line and precision techniques, and describe what they did.
- **In Class**:
    -   **Execute a Combined Haircut**: Perform a complete combined haircut on a mannequin, aiming for a high level of precision in both line work and blending. The focus is on the overall aesthetic and seamless integration.
    -   **Peer & Instructor Critique**: Present your finished haircut for detailed feedback. Be prepared to discuss your artistic choices, technical execution, and how you managed the transitions.

## 🧾 Review & Feedback
- **Quiz**: A quiz on identifying effective transitions, common challenges in combined cuts, and appropriate tool usage for integration.
- **Instructor Feedback**: Individualized assessment of the executed combined haircut, focusing on the quality of line work, smoothness of blends, overall balance, and efficiency of the workflow.
- **Group Discussion**: Share insights on successful strategies for integrating different cutting techniques and discuss how to develop a personal "signature style" that combines these elements.

## 📚 Resources
- *Milady Standard Barbering*, "Combination Cuts" and "Advanced Haircutting" chapters.
- Professional Barbering Magazines/Blogs: Look for articles and photo galleries showcasing integrated styles.
- Instagram/YouTube: Follow barbers renowned for their ability to combine sharp lines and smooth fades.
`, order_index: 3, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000011", module_id: module2_1Id, title: "05 Review and Feedback", objectives: "Evaluate basic cutting skills and receive constructive feedback.", content_html: `# 05 Review and Feedback

## 🎯 Learning Objectives
- Evaluate basic cutting skills and receive constructive feedback.
- Identify areas of strength and areas needing improvement.
- Consolidate understanding of Week 2's core concepts.
- Develop a critical eye for self-assessment and peer evaluation.

## 🏠 At-Home Learning
### Journal Prompt
Reflect on your progress this week. What was the most challenging technique you encountered (e.g., achieving a perfectly straight line, blending a specific fade, transitioning between techniques)? How did you attempt to overcome it, and what did you learn from the experience? What are you most proud of achieving this week, and why?

### Preparation for Practical Assessment
-   **Review Notes**: Go over all your notes from Week 2 lectures, demonstrations, and hands-on exercises.
-   **Practice Key Techniques**: Spend at least 1-2 hours practicing the most challenging techniques on a mannequin or practice sheet. Focus on consistency and precision.
-   **Self-Critique**: Perform a mock haircut on a mannequin and critically evaluate your own work using the assessment rubrics provided in Appendix H. Identify areas you would improve.

## 🏫 In-Class Learning
- **Practical Assessment**:
    -   **Full Basic Line and Precision Cut**: Students will perform a complete haircut on a mannequin, demonstrating all techniques learned in Week 2. This includes:
        -   Establishing a crisp front hairline and symmetrical temple lines.
        -   Executing a clean nape line (straight or rounded).
        -   Creating a basic taper fade with smooth blending.
        -   Seamlessly transitioning between line work and precision blending.
    -   **Instructor Observation**: The instructor will observe each student's technique, workflow, tool handling, and adherence to safety and hygiene protocols.
- **Instructor Feedback**:
    -   **One-on-One Review**: Each student will have a dedicated one-on-one session with the instructor. The instructor will provide detailed, constructive feedback on the practical assessment, highlighting strengths and areas for improvement.
    -   **Journal Reflection Discussion**: Discuss insights from your at-home journal reflections, connecting your self-assessment with the instructor's observations.
- **Group Discussion**:
    -   **"Week 2 Takeaways"**: An open forum where students share their key learning experiences, challenges, and "aha!" moments from the week.
    -   **Peer Learning**: Students can ask questions and offer advice to each other based on their experiences.

## ✍️ Assignment / Practice
- **At Home**:
    -   **Personalized Practice Plan**: Based on the feedback received from the instructor and your own self-assessment, create a detailed practice plan for the upcoming week (Week 3). This plan should specifically target 2-3 areas identified for improvement, outlining specific drills or exercises you will perform.
    -   **Research Corrective Techniques**: For one specific area where you struggled, research online or in your textbook for corrective techniques or alternative approaches.
- **In Class**:
    -   **Active Participation**: Engage actively in the feedback sessions, asking clarifying questions and demonstrating a receptive attitude towards constructive criticism.
    -   **Commitment to Growth**: Verbally commit to your personalized practice plan and share one specific goal for Week 3.

## 🧾 Review & Feedback
- **Quiz**: A comprehensive quiz covering all core concepts from Week 2, including hair biology, line cutting principles, precision blending techniques, and integrated haircut workflow.
- **Instructor's Final Assessment**: A summary of each student's performance in Week 2, providing a baseline for tracking future progress.
- **Peer Feedback**: Students provide brief, constructive feedback to one another on their overall progress and areas of noticeable improvement.

## 📚 Resources
- **Personal Notes and Practice Logs**: Your most valuable resource for tracking individual progress.
- *Milady Standard Barbering* (relevant chapters for review): Revisit sections on hair anatomy, line work, fading, and blending.
- **Online Tutorials**: Re-watch specific video tutorials that address techniques you found challenging.
- **Appendix H: Assessment Rubrics & Checklists**: Use these tools for ongoing self-evaluation.
`, order_index: 4, quiz_id: week2ReviewQuizId },

  // Week 3 Lessons
  { id: "e0000000-0000-4000-8000-000000000012", module_id: module3_1Id, title: "01 Advanced Line Cutting Techniques", objectives: "Explore complex line shapes (zig-zag, abstract, layered).", content_html: `# Advanced Line Cutting Techniques

## 🎯 Learning Objectives
- Explore complex line shapes (zig-zag, abstract, layered).
- Develop mastery of symmetry across unconventional lines.
- Build speed and accuracy while increasing creativity.

## 🏠 At-Home Learning
- Reading: Principles of geometry in haircutting, how to keep balance even in complex shapes.
- Video: “Top 10 Creative Line Cuts and Their Execution”.
- Journal: Which advanced line feels most natural to you? Which feels intimidating?

## 🏫 In-Class Learning
- Demo: Instructor demonstrates zig-zag, box cut, and asymmetrical outlines.
- Hands-on: Students practice zig-zag and layered lines on mannequins.
- Peer critique: Each student pairs up to evaluate balance and execution.

## ✍️ Assignment / Practice
At home: Sketch 5 advanced line concepts from reference images.
In class: Execute one chosen advanced line on a mannequin.

## 🧾 Review & Feedback
- Quiz: Identify correct vs. off-balance advanced lines.
- Instructor reviews execution consistency.

## 📚 Resources
- Book: *Milady Standard Barbering*, advanced techniques.
- YouTube: Creative barber line tutorials.
`, order_index: 0, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000013", module_id: module3_1Id, title: "02 Advanced Precision Cutting Techniques", objectives: "Refine taper, fade, and gradient blending with detail.", content_html: `# Advanced Precision Cutting Techniques

## 🎯 Learning Objectives
- Refine taper, fade, and gradient blending with detail.
- Master razor detailing and precision enhancements.
- Develop speed while maintaining flawless finish.

## 🏠 At-Home Learning
- Reading: Principles of gradient blending.
- Video: “Perfect Razor Finish & Detailing”.
- Exercise: Draw mirrored gradients on paper to train eye symmetry.

## 🏫 In-Class Learning
- Demo: Skin fade + razor enhancements.
- Hands-on: Students practice temple fade + razor detail on mannequins.
- Peer review: Assess symmetry of fades.

## ✍️ Assignment / Practice
At home: Record yourself performing a precision fade attempt (2–3 min).
In class: Execute fade + razor finish with feedback.

## 🧾 Review & Feedback
- Quiz: Gradient and taper recognition.
- Instructor and peer critiques.

## 📚 Resources
- YouTube: Chris Bossio advanced fades.
- IG: @vicblends detail fades.
`, order_index: 1, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000014", module_id: module3_1Id, title: "03 Combining Advanced Techniques", objectives: "Seamlessly blend advanced line and precision cutting methods.", content_html: `# Combining Advanced Techniques

## 🎯 Learning Objectives
- Integrate advanced line and precision into one signature cut.
- Balance complexity with client-ready execution.
- Develop workflow efficiency for professional environment.

## 🏠 At-Home Learning
- Video: “Signature Cuts: Blending Precision with Creativity”.
- Journal: What would your personal signature cut look like?

## 🏫 In-Class Learning
- Demo: Instructor executes freestyle design + fade.
- Hands-on: Students attempt their own variation.
- Peer showcase: Students present cuts and share artistic choices.

## ✍️ Assignment / Practice
At home: Sketch your personal “signature cut” (line + fade).
In class: Execute design + fade on mannequin.

## 🧾 Review & Feedback
- Peer review: Artistic vision and execution balance.
- Instructor feedback on technical quality.

## 📚 Resources
- Book: *Milady*, Advanced Blending.
`, order_index: 2, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000015", module_id: module3_1Id, title: "04 Review and Feedback (Intermediate)", objectives: "Assess intermediate cutting skills and refine techniques.", content_html: `# Review and Feedback: Intermediate Techniques

## 🎯 Learning Objectives
- Consolidate advanced line and fade skills.
- Reflect on progress and identify areas for next stage of growth.

## 🏠 At-Home Learning
- Journal: Which advanced skill are you most confident in? Which needs more practice?

## 🏫 In-Class Learning
- Showcase: Each student presents best advanced cut of week.
- Group roundtable: Students offer peer critique and insights.

## ✍️ Assignment / Practice
At home: Write practice plan for Week 4 (Design).
In class: Reflect with group and commit to learning goals.

## 🧾 Review & Feedback
- Peer + instructor review of presented cuts.
`, order_index: 3, quiz_id: null },

  // Week 4 Lessons
  { id: "e0000000-0000-4000-8000-000000000016", module_id: module4_1Id, title: "01 Introduction to Design", objectives: "Understand the principles of hair design and artistic expression.", content_html: `# Introduction to Design

## 🎯 Learning Objectives
- Explore principles of artistic design in barbering.
- Recognize how symmetry, proportion, and flow shape creative looks.
- Begin creating simple freestyle designs.

## 🏠 At-Home Learning
- Reading: Design principles — line, shape, space, texture, balance.
- Video: “Creative Barbering Basics”.
- Journal: How do you define your personal artistic style?

## 🏫 In-Class Learning
- Demo: Instructor executes a simple freestyle (star, wave).
- Hands-on: Students replicate on mannequins.
- Peer critique: Focus on flow and balance.

## ✍️ Assignment / Practice
At home: Sketch 3 possible designs.
In class: Execute 1 freestyle on mannequin.

## 🧾 Review & Feedback
- Instructor review of designs and execution quality.

## 📚 Resources
- Book: *Milady*, Creative Hair Design.
- YouTube: Creative barber showcases.
`, order_index: 0, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000017", module_id: module4_1Id, title: "02 Creating Designs with Line Cutting", objectives: "Utilize line cutting to create distinct hair designs.", content_html: `# Creating Designs with Line Cutting

## 🎯 Learning Objectives
- Use line cutting to create bold, artistic patterns.
- Study cultural influences in freestyle designs.

## 🏠 At-Home Learning
- Reading: Tribal, cultural, and street-inspired designs.
- Video: “Line Art in Hair: Global Inspirations”.
- Journal: Which cultural style inspires you most?

## 🏫 In-Class Learning
- Demo: Tribal-inspired designs.
- Hands-on: Students execute a bold pattern.
- Peer feedback: Evaluate flow and clarity.

## ✍️ Assignment / Practice
At home: Sketch 5 culturally inspired patterns.
In class: Attempt 1 design on mannequin.

## 🧾 Review & Feedback
- Quiz: Identify cultural references in designs.
`, order_index: 1, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000018", module_id: module4_1Id, title: "03 Creating Designs with Precision Cutting", objectives: "Employ precision cutting for intricate and detailed designs.", content_html: `# Creating Designs with Precision Cutting

## 🎯 Learning Objectives
- Apply precision detail to elevate artistic cuts.
- Use shading, gradients, and layering for depth.

## 🏠 At-Home Learning
- Reading: Techniques of shading in barbering.
- Video: “Precision Hair Art: Adding Depth”.
- Journal: Why does shading transform a design?

## 🏫 In-Class Learning
- Demo: Shaded freestyle cut.
- Hands-on: Students replicate on mannequins.
- Peer review: Focus on subtlety and depth.

## ✍️ Assignment / Practice
At home: Sketch a shaded design with pencil gradients.
In class: Perform shaded cut on mannequin.

## 🧾 Review & Feedback
- Peer + instructor feedback on shading quality.
`, order_index: 2, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000019", module_id: module4_1Id, title: "04 Combining Designs (Line + Precision)", objectives: "Integrate both line and precision cutting for complex designs.", content_html: `# Combining Designs: Line and Precision

## 🎯 Learning Objectives
- Combine bold line work with precision shading in one piece.
- Balance visibility with finesse.

## 🏠 At-Home Learning
- Video: “From Line to Shading: Barber Art Evolution”.
- Journal: Which element do you lean toward — bold or subtle?

## 🏫 In-Class Learning
- Demo: Instructor combines sharp lines with shaded gradients.
- Hands-on: Students attempt combination freestyle.
- Peer critique: Focus on composition balance.

## ✍️ Assignment / Practice
At home: Sketch a combined freestyle.
In class: Execute the design fully.

## 🧾 Review & Feedback
- Instructor assessment: Composition + execution.
`, order_index: 3, quiz_id: null },
  { id: "e0000000-0000-4000-8000-00000000001a", module_id: module4_1Id, title: "05 Review and Feedback (Design)", objectives: "Evaluate design skills and receive feedback on creative work.", content_html: `# Review and Feedback: Design

## 🎯 Learning Objectives
- Reflect on personal creative direction.
- Assess readiness for advanced mastery.

## 🏠 At-Home Learning
- Journal: What style do you want to be known for?

## 🏫 In-Class Learning
- Showcase: Present strongest freestyle.
- Group reflection: Strengths + originality.

## ✍️ Assignment / Practice
At home: Plan 3 personal “signature” design sketches.
In class: Execute 1 final freestyle of week.

## 🧾 Review & Feedback
- Peer + instructor critiques on originality.
`, order_index: 4, quiz_id: null },

  // Week 5 Lessons
  { id: "e0000000-0000-4000-8000-00000000001b", module_id: module5_1Id, title: "01 Advanced Design Techniques", objectives: "Master advanced techniques for highly creative hair designs.", content_html: `# Advanced Design Techniques

## 🎯 Learning Objectives
- Push boundaries with complex, multi-layered designs.
- Learn shading, depth, and texture for realism.
- Incorporate cultural or abstract inspirations.

## 🏠 At-Home Learning
- Video: “Next-Level Barber Art”.  
- Journal: What cultural story can you tell through design?

## 🏫 In-Class Learning
- Demo: Complex freestyle involving 2–3 layers of detail.
- Hands-on: Students execute advanced design attempt.

## ✍️ Assignment / Practice
At home: Sketch a multi-layer design concept.
In class: Translate sketch to hair canvas.

## 🧾 Review & Feedback
- Instructor + group feedback on complexity and execution.
`, order_index: 0, quiz_id: null },
  { id: "e0000000-0000-4000-8000-00000000001c", module_id: module5_1Id, title: "02 Practical Application", objectives: "Apply all learned skills in a comprehensive practical session.", content_html: `# Practical Application

## 🎯 Learning Objectives
- Apply all skills in simulated real-client environment.
- Manage time, cleanliness, and client interaction.
- Deliver professional-level haircut from start to finish.

## 🏠 At-Home Learning
- Reading: Customer experience principles in barbering.
- Journal: What kind of barber do you want to be known as?

## 🏫 In-Class Learning
- Simulation: Students work on live models or mannequins.
- Instructor observes time, cleanliness, and execution.

## ✍️ Assignment / Practice
At home: Write reflection on client experience.
In class: Perform full haircut timed session.

## 🧾 Review & Feedback
- Instructor review: Professionalism, cleanliness, final result.
`, order_index: 1, quiz_id: null },
  { id: "e0000000-0000-4000-8000-00000000001d", module_id: module5_1Id, title: "03 Review and Feedback (Craft)", objectives: "Receive detailed feedback on practical application and overall craft.", content_html: `# Review and Feedback: Mastering the Craft

## 🎯 Learning Objectives
- Evaluate progress across 5 weeks of training.
- Build confidence for final project execution.

## 🏠 At-Home Learning
- Journal: What skill makes you feel “ready” for real clients?

## 🏫 In-Class Learning
- Showcase: Students present strongest cut from the course.
- Feedback: Group + instructor discussion.

## ✍️ Assignment / Practice
At home: Draft final project idea with sketches.
In class: Share with peers and receive feedback.

## 🧾 Review & Feedback
- Instructor gives notes preparing for final showcase.
`, order_index: 2, quiz_id: null },

  // Week 6 Lessons
  { id: "e0000000-0000-4000-8000-00000000001e", module_id: module6_1Id, title: "01 Final Project Planning", objectives: "Plan and conceptualize the final graduation project.", content_html: `# Final Project Planning

## 🎯 Learning Objectives
- Develop a final project that showcases full skillset.
- Align project with personal brand and creative identity.

## 🏠 At-Home Learning
- Journal: Draft 3 project ideas — one technical, one creative, one mixed.
- Reading: “How to Plan a Creative Showcase”.
- Video: “From Concept to Execution in Barber Art”.

## 🏫 In-Class Learning
- Workshop: Students pitch final project ideas.
- Peer + instructor feedback session.
- Refinement: Students finalize project plan.

## ✍️ Assignment / Practice
At home: Create sketches + timeline for final cut.
In class: Present finalized project outline.

## 🧾 Review & Feedback
- Instructor approval before execution.
`, order_index: 0, quiz_id: null },
  { id: "e0000000-0000-4000-8000-00000000001f", module_id: module6_1Id, title: "02 Final Project Execution", objectives: "Execute the final project demonstrating mastery of all techniques.", content_html: `# Final Project Execution

## 🎯 Learning Objectives
- Execute final project at professional level.
- Demonstrate skill mastery, time management, and client experience.

## 🏠 At-Home Learning
- Prep tools, workstation, and sketch references.
- Journal: What mindset will you bring to final day?

## 🏫 In-Class Learning
- Execution: Students perform final cut (2–3 hours).
- Instructor monitors timing, hygiene, technique, creativity.

## ✍️ Assignment / Practice
At home: Reflect on execution experience.
In class: Complete final showcase cut.

## 🧾 Review & Feedback
- Peer + instructor grading rubric covering technical + creative execution.
`, order_index: 1, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000020", module_id: module6_1Id, title: "03 Review and Feedback (Final Project)", objectives: "Present and receive feedback on the completed final project.", content_html: `# Review and Feedback: Final Project

## 🎯 Learning Objectives
- Reflect on journey, strengths, and growth areas.
- Celebrate completion of AXUM training.

## 🏠 At-Home Learning
- Journal: Write “My Barbering Journey” essay (1 page).
- Reflection: Which moment during training shaped you most?

## 🏫 In-Class Learning
- Showcase: Present final projects to group.
- Reflection circle: Peers share feedback.

## ✍️ Assignment / Practice
At home: Write a “Barbering Vision Statement” (how you see yourself in 5 years).
In class: Share takeaway with group.

## 🧾 Review & Feedback
- Instructor delivers final assessments + personalized notes.
`, order_index: 2, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000021", module_id: module6_1Id, title: "04 Graduation Ceremony", objectives: "Celebrate the successful completion of the Axum Barber Academy.", content_html: `# Graduation Ceremony

## 🎯 Learning Objectives
- Celebrate transformation from student to professional.
- Build community pride and identity.

## 🏫 In-Class Learning
- Ceremony: Display final projects, invite peers and family.
- Certificates: Award completion certificates.
- Reflection: Group speech circle (each shares 1 insight).

## Closing Message
This is not the end, but the beginning of your career. Carry AXUM’s values of precision, creativity, and professionalism into every cut. You are now part of a legacy.
`, order_index: 3, quiz_id: null },
];