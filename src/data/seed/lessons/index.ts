import { CurriculumLesson } from '@/data/curriculum';
import {
  moduleAppendicesAId,
  moduleAppendicesBId,
  moduleAppendicesCId,
  moduleAppendicesDId,
  moduleAppendicesEId,
  moduleAppendicesFId,
  moduleAppendicesGId,
  moduleAppendicesHId,
  module1_1Id,
  module2_1Id,
  module3_1Id,
  module4_1Id,
  module5_1Id,
  module6_1Id,
} from '@/data/seed/modules';
import { week2ReviewQuizId } from '@/data/seed/quizzes';

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
- Quiz: On tool names and uses.
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
Consider a client with very curly, dense hair versus a client with fine, straight hair. How would your approach to sectioning, tension, and tool choice differ significantly for each, based on your understanding of their hair follicles and structure? What challenges do you anticipate, and how would you address them?

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
    -   **Personalized Practice Plan**: Based on the feedback received from the instructor and your own self-assessment, create a detailed practice plan for the upcoming week (Week 3). This plan should specifically target 2-3 areas identified for improvement, outlining concrete drills or exercises you will perform.
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
  { id: "e0000000-0000-4000-8000-000000000012", module_id: module3_1Id, title: "01 Advanced Line Cutting Techniques", objectives: "Explore complex line shapes (zig-zag, abstract, layered).", content_html: `# 01 Advanced Line Cutting Techniques

## 🎯 Learning Objectives
- Explore complex line shapes (zig-zag, abstract, layered).
- Develop mastery of symmetry across unconventional lines.
- Build speed and accuracy while increasing creativity.
- Understand how to adapt line work to different hair textures and head shapes.

## 🏠 At-Home Learning
### Reading
- **"Geometry in Haircutting: Beyond the Straight Line"**: This article delves into the mathematical principles behind creating balanced and symmetrical lines, even when they are complex or asymmetrical. It covers concepts like focal points, negative space, and visual weight.
- **"Creative Line Art: Zig-Zags, Layers, and Abstract Designs"**: Explore various advanced line patterns, including sharp zig-zags, subtle layered lines that create texture, and freehand abstract designs. Learn how to break down complex designs into manageable steps.
- **"Maintaining Balance in Unconventional Lines"**: Understand how to ensure a haircut remains balanced and aesthetically pleasing even when incorporating non-traditional line work. This includes techniques for cross-checking and using reference points.

### Video
- **"Top 10 Creative Line Cuts and Their Execution" (15 min)**: A visual showcase and breakdown of intricate line designs, demonstrating the tools and techniques used to achieve them.
- **"Mastering Asymmetrical Line-Ups" (10 min)**: Focuses on creating intentional asymmetry while maintaining overall balance and flow in the haircut.
- **"Speed and Accuracy Drills for Line Work" (8 min)**: Demonstrates exercises to improve hand stability, precision, and efficiency when executing detailed lines.

### Reflection Prompt
Choose one advanced line cutting technique (e.g., a complex zig-zag, a layered line, or an asymmetrical design). Describe the steps you would take to execute it on a client, considering their hair type and head shape. What specific challenges might you face in maintaining symmetry and sharpness, and how would you overcome them?

## 🏫 In-Class Learning
- **Lecture/Demo**:
    -   **Deconstructing Complex Lines**: Instructor demonstrates how to break down intricate line designs into simpler components. Showcases techniques for creating sharp angles, smooth curves within complex patterns, and layered lines for added dimension.
    -   **Tool Selection for Detail**: Discuss and demonstrate the use of various trimmers (fine-tooth, wide-tooth), straight razors, and even small shears for executing advanced line work with precision.
    -   **Symmetry Mapping for Advanced Designs**: Introduce advanced methods for mapping out complex designs on the head, ensuring balance and consistency from all angles.
- **Hands-On Exercise**:
    -   **"Advanced Line Drills"**: Students practice creating zig-zag patterns, layered lines, and abstract shapes on practice sheets and then on mannequins. Focus on clean intersections and consistent depth.
    -   **Asymmetrical Line Practice**: Students attempt to create an intentionally asymmetrical line design on a mannequin, focusing on balancing the visual weight and flow.
    -   **Speed and Accuracy Challenge**: Perform a complex line-up within a timed session, aiming to improve efficiency without compromising precision.
- **Peer Critique**:
    -   Students will pair up to evaluate each other's advanced line work on mannequins. Provide constructive feedback on the sharpness of lines, symmetry (or intentional asymmetry), and overall creativity. Use a detailed rubric.

## ✍️ Assignment / Practice
- **At Home**:
    -   **"Advanced Line Concept Portfolio"**: Sketch 5 different advanced line concepts from reference images (e.g., online, magazines). For each sketch, briefly describe the tools and techniques you would use to execute it.
    -   **Video Practice**: Record yourself performing an advanced line cutting technique (e.g., a zig-zag or layered line) on a mannequin for 5-7 minutes. Analyze your own video for areas of improvement.
- **In Class**:
    -   **Execute Chosen Advanced Line**: Each student will choose one advanced line concept and execute it on a mannequin, demonstrating their mastery of the technique.
    -   **Presentation & Critique**: Present your executed design to the class and instructor, explaining your creative process and technical challenges. Receive detailed feedback.

## 🧾 Review & Feedback
- **Quiz**: A quiz identifying various complex line shapes, principles of symmetry in advanced designs, and appropriate tools for intricate line work.
- **Instructor Reviews**: Individualized feedback on the executed advanced line designs, focusing on precision, creativity, and consistency.
- **Group Discussion**: Share insights on overcoming challenges in advanced line cutting and discuss strategies for incorporating more creative elements into daily work.

## 📚 Resources
- *Milady Standard Barbering*, "Advanced Haircutting Techniques" chapter.
- YouTube: Channels specializing in creative barbering and hair art (e.g., "Rob the Original," "A-Rod the Barber").
- Instagram: Explore hashtags like #hairart, #barberdesign, #creativebarber for inspiration.
`, order_index: 0, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000013", module_id: module3_1Id, title: "02 Advanced Precision Cutting Techniques", objectives: "Refine taper, fade, and gradient blending with detail.", content_html: `# 02 Advanced Precision Cutting Techniques

## 🎯 Learning Objectives
- Refine taper, fade, and gradient blending with detail.
- Master razor detailing and precision enhancements.
- Develop speed while maintaining flawless finish.
- Learn to adapt advanced blending techniques to diverse hair types and textures.

## 🏠 At-Home Learning
### Reading
- **"The Art of the Seamless Gradient: Advanced Blending Principles"**: This article explores the nuances of creating ultra-smooth fades and tapers, focusing on eliminating all lines of demarcation. It covers techniques like "fading up" vs. "fading down" and advanced lever play.
- **"Razor Detailing: The Ultimate Finish"**: Learn about the various applications of a straight razor for refining hairlines, softening edges, removing fine hairs, and adding texture. Understand safety protocols and proper skin tension for razor work.
- **"Efficiency in Precision: Balancing Speed and Quality"**: Discover strategies for improving your speed and workflow in precision cutting without compromising the quality of the blend or the sharpness of the lines. This includes efficient sectioning and tool transitions.

### Video
- **"Perfect Razor Finish & Detailing: Advanced Techniques" (15 min)**: A detailed tutorial on using a straight razor for intricate detailing around the hairline, beard, and for adding texture.
- **"Skin Fade Mastery: Zero to Hero Blending" (12 min)**: Demonstrates advanced techniques for achieving a flawless skin fade, including bald-line removal and seamless blending into longer lengths.
- **"Gradient Blending Exercises for Eye Symmetry" (8 min)**: Visual exercises and drills to train your eye to recognize subtle imperfections in fades and improve your ability to create symmetrical gradients.

### Reflection Prompt
You have a client with very dense, dark hair requesting a "high skin fade with a sharp C-cup." This combination demands extreme precision in both blending and line work. Outline your step-by-step approach, detailing how you would achieve a flawless skin fade, execute the C-cup, and ensure a seamless transition between the two. What are the specific challenges with dense hair, and how would you address them?

## 🏫 In-Class Learning
- **Lecture/Demo**:
    -   **Advanced Lever Play & Guard Selection**: Instructor demonstrates intricate lever adjustments and the strategic use of half-guards and no-guards for ultra-fine blending.
    -   **Razor Techniques for Fades**: Showcase various razor techniques for cleaning up the perimeter, softening harsh lines, and adding subtle texture to the fade. Emphasize safety and client comfort.
    -   **Cross-Checking & Mirror Work**: Discuss and demonstrate advanced methods for cross-checking fades from multiple angles and using mirrors to identify and correct imperfections.
- **Hands-On Exercise**:
    -   **"Skin Fade Challenge"**: Students perform a high skin fade on mannequins, focusing on achieving a completely bald transition and a perfectly smooth gradient into the longer hair.
    -   **Razor Detailing Practice**: Students practice using a straight razor for refining hairlines, cleaning up the nape, and adding subtle texture to the top section of a mannequin's hair.
    -   **Timed Precision Fade**: Execute a precision fade (e.g., a mid-taper fade) on a mannequin within a set time limit, focusing on both speed and a flawless finish.
- **Peer Review**:
    -   Students will evaluate each other's advanced fades and razor work on mannequins. Provide constructive feedback on the smoothness of the blend, the sharpness of razor lines, and overall symmetry. Use a detailed rubric.

## ✍️ Assignment / Practice
- **At Home**:
    -   **"Gradient Blueprint"**: On a head diagram, draw and label the precise guard and lever settings you would use for a skin fade, a mid-taper, and a high fade. Detail the blending steps for each.
    -   **Video Practice**: Record yourself performing a precision fade attempt (e.g., a temple fade with razor detail) on a mannequin for 7-10 minutes. Analyze your own video for areas of improvement in technique and efficiency.
- **In Class**:
    -   **Execute Advanced Fade + Razor Finish**: Each student will perform an advanced fade (e.g., a skin fade or a complex taper) with razor enhancements on a mannequin, demonstrating mastery of blending and detailing.
    -   **Presentation & Critique**: Present your executed cut to the class and instructor, explaining your process and challenges. Receive detailed feedback.

## 🧾 Review & Feedback
- **Quiz**: A quiz on advanced blending techniques, razor detailing applications, and strategies for achieving speed and accuracy in precision cutting.
- **Instructor Reviews**: Individualized feedback on the executed advanced fades and razor work, focusing on the quality of the blend, sharpness of lines, and overall finish.
- **Group Discussion**: Share insights on overcoming challenges in advanced precision cutting and discuss strategies for refining your eye for detail.

## 📚 Resources
- YouTube: Chris Bossio, 360Jeezy, Vic Blends (for advanced fade and razor techniques).
- Instagram: Follow barbers known for their flawless fades and intricate detailing.
- Professional Barbering Forums: Engage in discussions about advanced blending challenges and solutions.
`, order_index: 1, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000014", module_id: module3_1Id, title: "03 Combining Advanced Techniques", objectives: "Seamlessly blend advanced line and precision cutting methods.", content_html: `# 03 Combining Advanced Techniques

## 🎯 Learning Objectives
- Integrate advanced line and precision into one signature cut.
- Balance complexity with client-ready execution.
- Develop workflow efficiency for professional environment.
- Master the art of creating a cohesive and visually striking overall haircut.

## 🏠 At-Home Learning
### Reading
- **"The Signature Cut: Blending Precision with Creativity"**: This article explores how master barbers combine various advanced line and precision techniques to create unique, recognizable "signature" haircuts. It emphasizes the importance of artistic vision and technical execution.
- **"Workflow Optimization for Complex Haircuts"**: Learn strategies for efficiently executing haircuts that involve multiple advanced techniques. This includes planning the sequence of cuts, managing tool changes, and maintaining focus throughout the process.
- **"Client-Ready Execution: From Concept to Chair"**: Understand how to translate complex artistic concepts into practical, wearable haircuts that meet client expectations and can be maintained.

### Video
- **"Signature Cuts: Blending Precision with Creativity" (18 min)**: A comprehensive video demonstrating the creation of a complex haircut that integrates advanced line work (e.g., a detailed design) with a high-precision fade and razor finish.
- **"Balancing Complexity and Wearability in Hair Art" (10 min)**: Discusses how to create visually stunning haircuts that are also practical for the client's lifestyle and maintenance routine.
- **"Professional Workflow: Speed, Accuracy, and Client Experience" (12 min)**: Highlights best practices for maintaining efficiency and professionalism during complex haircutting services.

### Reflection Prompt
Imagine a client requests a haircut that features a bold, abstract line design on one side, seamlessly blending into a low skin fade, with a textured top that complements the overall look. How would you approach this "signature cut" from consultation to final styling, ensuring both the artistic elements and the technical precision are flawless? What challenges might arise in integrating these advanced techniques, and how would you address them?

## 🏫 In-Class Learning
- **Lecture/Demo**:
    -   **Integrated Design & Execution Planning**: Instructor demonstrates how to plan a complex haircut that combines advanced line work (e.g., a multi-layered design) with advanced precision blending (e.g., a skin fade with razor enhancements).
    -   **Seamless Transition Strategies**: Showcase specific techniques for smoothly transitioning between intricate line designs and soft, blended areas, ensuring no harsh lines or disconnects.
    -   **Time Management for Complex Cuts**: Discuss strategies for managing time effectively during complex haircuts, breaking down the process into manageable segments.
- **Hands-On Exercise**:
    -   **"Signature Cut Creation"**: Students will attempt to create their own "signature cut" on a mannequin, integrating at least one advanced line cutting technique and one advanced precision cutting technique.
    -   **Focus on Cohesion**: Emphasize creating a cohesive look where all elements complement each other, rather than appearing as separate components.
    -   **Problem-Solving Workshop**: Address common issues encountered when combining advanced techniques, such as maintaining symmetry across different textures or blending intricate designs into fades.
- **Peer Showcase**:
    -   Students will present their "signature cuts" to the class, explaining their artistic vision, the techniques used, and any challenges encountered. Peers will provide constructive feedback on creativity, technical execution, and overall balance.

## ✍️ Assignment / Practice
- **At Home**:
    -   **"Personal Signature Cut" Sketch**: Develop a detailed sketch of your personal "signature cut" that integrates advanced line and precision techniques. Include front, side, and back views, and annotate the specific techniques you would use.
    -   **Workflow Outline**: Create a step-by-step workflow outline for executing your signature cut, including estimated time for each stage and a list of all necessary tools.
- **In Class**:
    -   **Execute Signature Cut**: Perform your designed "signature cut" on a mannequin, focusing on flawless execution and seamless integration of all advanced techniques.
    -   **Presentation & Critique**: Present your finished signature cut to the class and instructor for detailed feedback on artistic vision, technical mastery, and client-readiness.

## 🧾 Review & Feedback
- **Peer Review**: Students provide detailed feedback to each other on the artistic vision, technical execution, and overall balance of the combined advanced cuts.
- **Instructor Feedback**: Individualized assessment of the executed signature cuts, focusing on the integration of techniques, creativity, and professional finish.
- **Group Discussion**: Share insights on developing a personal artistic style and strategies for confidently executing complex, client-ready haircuts.

## 📚 Resources
- Book: *Milady Standard Barbering*, "Advanced Haircutting" and "Creative Hair Design" chapters.
- Online Portfolios: Study the work of renowned barbers who specialize in creative and complex haircuts.
- Design Theory Resources: Explore resources on art and design principles (e.g., balance, contrast, rhythm) and how they apply to haircutting.
`, order_index: 2, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000015", module_id: module3_1Id, title: "04 Review and Feedback (Intermediate)", objectives: "Assess intermediate cutting skills and refine techniques.", content_html: `# 04 Review and Feedback: Intermediate Techniques

## 🎯 Learning Objectives
- Consolidate advanced line and fade skills.
- Reflect on progress and identify areas for next stage of growth.
- Develop a critical eye for self-assessment and peer evaluation of complex techniques.
- Build confidence in executing intricate haircuts under pressure.

## 🏠 At-Home Learning
### Journal Prompt
Reflect on your progress during Week 3. Which advanced skill (e.g., zig-zag lines, skin fades, combining techniques) did you find most challenging, and what steps did you take to improve? What is one specific "breakthrough" moment you had this week, and how will it impact your future practice?

### Preparation for Showcase
-   **Review All Techniques**: Go over all notes and practice logs from Week 3. Revisit any challenging techniques.
-   **Refine Your Best Cut**: Choose your strongest advanced cut from the week (either a line design, a precision fade, or a combined cut) and spend dedicated time refining it on a mannequin. Aim for perfection.
-   **Self-Critique**: Use the assessment rubrics (Appendix H) to critically evaluate your chosen cut. Identify any remaining imperfections and plan how to address them.

## 🏫 In-Class Learning
- **Showcase**:
    -   **"Intermediate Mastery Showcase"**: Each student will present their best advanced cut from the week on a mannequin. This is an opportunity to demonstrate their refined skills in advanced line work, precision blending, or integrated techniques.
    -   **Instructor Observation**: The instructor will observe the presented cuts, noting technical execution, creativity, and overall finish.
- **Group Roundtable**:
    -   **Peer Critique and Insights**: Students will engage in a structured roundtable discussion, offering constructive feedback to their peers. Focus on specific technical aspects, artistic choices, and areas for improvement.
    -   **Sharing Strategies**: Students will share insights into how they approached challenging techniques, what worked well, and what they learned from their mistakes.
- **Instructor-Led Debrief**:
    -   **Consolidation of Learning**: The instructor will lead a discussion to consolidate the key learnings from Week 3, highlighting common successes and areas that still require attention.
    -   **Q&A Session**: Open forum for students to ask questions and seek clarification on any advanced techniques.

## ✍️ Assignment / Practice
- **At Home**:
    -   **"Week 4 Practice Plan"**: Based on the feedback received during the showcase and your own reflections, create a detailed practice plan for the upcoming Week 4 (Design & Creativity). This plan should specifically target 2-3 areas for further development, outlining concrete drills or exercises.
    -   **Research Design Inspiration**: Begin researching creative hair designs, patterns, and artistic influences to prepare for the next week's focus on design.
- **In Class**:
    -   **Commitment to Learning Goals**: Verbally commit to your personalized practice plan for Week 4 and share one specific learning goal you aim to achieve.
    -   **Active Participation**: Engage actively in the critique and discussion sessions, demonstrating a professional and growth-oriented mindset.

## 🧾 Review & Feedback
- **Peer + Instructor Review**: Comprehensive review of the presented advanced cuts, focusing on technical mastery, artistic expression, and adherence to professional standards.
- **Instructor's Assessment**: A summary of each student's performance in Week 3, providing a benchmark for their progress in advanced techniques.
- **Individualized Feedback**: Personalized notes from the instructor, guiding students on their next steps and preparing them for the creative challenges of Week 4.

## 📚 Resources
- **Personal Notes and Practice Logs**: Continue to be your primary resource for tracking individual progress.
- *Milady Standard Barbering* (relevant chapters for review): Revisit sections on advanced line work, precision blending, and integrated techniques.
- **Appendix H: Assessment Rubrics & Checklists**: Utilize these for ongoing self-evaluation and peer assessment.
- **Online Barbering Communities**: Engage with online forums or social media groups to seek advice and inspiration for advanced techniques.
`, order_index: 3, quiz_id: null },

  // Week 4 Lessons
  { id: "e0000000-0000-4000-8000-000000000016", module_id: module4_1Id, title: "01 Introduction to Design", objectives: "Understand the principles of hair design and artistic expression.", content_html: `# Introduction to Design

## 🎯 Learning Objectives
- Explore principles of artistic design in barbering.
- Recognize how symmetry, proportion, and flow shape creative looks.
- Begin creating simple freestyle designs.

## 🏠 At-Home Learning
### Reading
- **"The Fundamentals of Hair Design: Line, Shape, Space, Texture, Balance"**: This article breaks down the core principles of artistic design and explains how each applies to haircutting. Understand how to use these elements to create visually appealing and harmonious styles.
- **"Unlocking Creativity: A Barber's Guide to Artistic Expression"**: Explore different approaches to creative barbering, from classic interpretations to avant-garde designs. Learn how to develop your unique artistic voice.

### Video
- **"Creative Barbering Basics: Simple Freestyle Designs" (10 min)**: A tutorial demonstrating how to execute fundamental freestyle designs like stars, waves, and basic geometric patterns on a mannequin.
- **"Understanding Symmetry and Proportion in Haircuts" (7 min)**: Explains how to assess head shape and facial features to create balanced designs that complement the client.

### Journal Prompt
How do you define your personal artistic style, and how do you envision it influencing your barbering designs? What emotions or impressions do you want your designs to evoke in clients?

## 🏫 In-Class Learning
- **Lecture/Demo**:
    -   **Design Principles in Practice**: Instructor reviews the principles of line, shape, space, texture, and balance, demonstrating how they are applied in various haircut designs.
    -   **Simple Freestyle Execution**: Instructor executes a simple freestyle design (e.g., a star, a wave, a basic tribal pattern) on a mannequin, emphasizing clean lines, consistent depth, and proper tool handling.
    -   **Client Consultation for Creative Designs**: Discuss how to effectively consult with clients who want creative designs, managing expectations and translating their ideas into a feasible haircut.
- **Hands-On Exercise**:
    -   **"Freestyle Replication"**: Students replicate the instructor's simple freestyle design on their mannequins, focusing on precision and consistency.
    -   **"Design Element Practice"**: Practice creating individual design elements (e.g., sharp angles, smooth curves, dots, dashes) on practice sheets or mannequin sections to build muscle memory.
    -   **Peer Critique**: Students pair up to evaluate each other's freestyle designs, focusing on the clarity of lines, balance, and overall aesthetic appeal.
- **Group Discussion**:
    -   **"Inspiration Board Creation"**: Students share images or ideas that inspire their creative designs, discussing how they might translate these inspirations into hair art.

## ✍️ Assignment / Practice
- **At Home**:
    -   **"Design Sketchbook"**: Sketch 3-5 different possible freestyle designs. For each design, label the key design principles you are applying (e.g., "symmetry," "curved lines," "negative space").
    -   **Research Creative Barbers**: Identify 2-3 barbers on social media or online platforms whose creative designs you admire. Analyze their work and note what makes their designs stand out.
- **In Class**:
    -   **Execute One Freestyle Design**: Each student will choose one of their sketched designs and execute it on a mannequin, demonstrating their understanding of basic design principles.
    -   **Presentation & Critique**: Present your executed freestyle design to the class and instructor, explaining your creative process and technical execution. Receive detailed feedback.

## 🧾 Review & Feedback
- **Instructor Review**: Individualized feedback on the executed designs, focusing on the application of design principles, technical precision, and creative expression.
- **Group Discussion**: Share insights on developing a personal artistic style and strategies for confidently approaching creative designs.

## 📚 Resources
- Book: *Milady Standard Barbering*, "Creative Hair Design" chapter.
- YouTube: Channels featuring creative barber showcases and design tutorials (e.g., "Rob the Original," "A-Rod the Barber").
- Instagram: Explore hashtags like #hairart, #barberdesign, #creativebarber for inspiration.
`, order_index: 0, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000017", module_id: module4_1Id, title: "02 Creating Designs with Line Cutting", objectives: "Utilize line cutting to create distinct hair designs.", content_html: `# Creating Designs with Line Cutting

## 🎯 Learning Objectives
- Use line cutting to create bold, artistic patterns.
- Study cultural influences in freestyle designs.
- Develop precision and control when executing intricate line-based designs.
- Understand how to adapt line designs to different hair textures and client preferences.

## 🏠 At-Home Learning
### Reading
- **"Global Inspirations: Tribal, Cultural, and Street-Inspired Designs"**: This article explores the rich history and cultural significance of various line-based hair designs from around the world. Learn about patterns inspired by tribal art, geometric motifs, and urban street styles.
- **"The Psychology of Lines: Boldness, Movement, and Impact"**: Understand how different types of lines (straight, curved, angular, broken) can evoke different feelings and create specific visual impacts in a haircut design.

### Video
- **"Line Art in Hair: Global Inspirations & Techniques" (12 min)**: A visual journey showcasing diverse line-based hair art from different cultures, with demonstrations of how to create similar patterns.
- **"Executing Bold Patterns: Tools and Control" (9 min)**: Focuses on the specific tools (e.g., fine-tooth trimmers, straight razors) and techniques required to create sharp, bold, and intricate line patterns.

### Journal Prompt
Choose one cultural style or artistic movement that particularly inspires you. How would you translate its core elements (e.g., symmetry, asymmetry, specific motifs, flow) into a bold line-cutting design for a client? Describe the visual impact you aim to achieve.

## 🏫 In-Class Learning
- **Lecture/Demo**:
    -   **Cultural Design Deconstruction**: Instructor presents examples of culturally inspired line designs, breaking down their geometric structure and artistic intent.
    -   **Bold Pattern Execution**: Instructor demonstrates how to execute a complex, bold line pattern (e.g., a tribal motif, a complex geometric design) on a mannequin, emphasizing clean sections, consistent depth, and sharp edges.
    -   **Adapting Designs to Head Shape**: Discuss how to modify line designs to best suit different head shapes and natural hair growth patterns, ensuring the design flows organically.
- **Hands-On Exercise**:
    -   **"Culturally Inspired Pattern Challenge"**: Students will attempt to execute a bold, culturally inspired line pattern on a mannequin. Focus on replicating intricate details and maintaining overall symmetry or intentional asymmetry.
    -   **"Precision Line Drills"**: Practice creating very fine lines, sharp corners, and complex intersections using trimmers and straight razors on practice sheets or mannequin sections.
    -   **Peer Feedback**: Students pair up to evaluate each other's bold line designs, focusing on the clarity of the pattern, the sharpness of the lines, and the overall artistic impact.
- **Group Discussion**:
    -   **"Design Storytelling"**: Students share their executed designs and explain the cultural or artistic story behind their creation.

## ✍️ Assignment / Practice
- **At Home**:
    -   **"Pattern Portfolio"**: Sketch 5 different culturally inspired or abstract line patterns. For each, identify the cultural origin (if applicable) and describe the tools and techniques you would use.
    -   **Video Practice**: Record yourself performing a complex line-cutting design on a mannequin for 5-7 minutes. Analyze your video for areas of improvement in precision and flow.
- **In Class**:
    -   **Execute One Design**: Each student will choose one of their sketched patterns and execute it on a mannequin, demonstrating their ability to create bold, artistic line designs.
    -   **Critique Session**: Present your executed design to the class and instructor, explaining your creative process and technical execution. Receive detailed feedback.

## 🧾 Review & Feedback
- **Quiz**: A quiz identifying cultural references in various hair designs and questions on techniques for executing bold line patterns.
- **Instructor Reviews**: Individualized feedback on the executed line designs, focusing on artistic interpretation, technical precision, and creative impact.
- **Group Discussion**: Share insights on finding inspiration for line designs and strategies for confidently executing complex patterns.

## 📚 Resources
- *Milady Standard Barbering*, "Creative Hair Design" and "Advanced Haircutting" chapters.
- YouTube: Channels specializing in hair art and design (e.g., "Rob the Original," "A-Rod the Barber").
- Instagram: Explore hashtags like #hairart, #barberdesign, #culturalhaircuts for inspiration.
`, order_index: 1, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000018", module_id: module4_1Id, title: "03 Creating Designs with Precision Cutting", objectives: "Employ precision cutting for intricate and detailed designs.", content_html: `# Creating Designs with Precision Cutting

## 🎯 Learning Objectives
- Apply precision detail to elevate artistic cuts.
- Use shading, gradients, and layering for depth.
- Develop advanced techniques for creating intricate and subtle designs.
- Understand how precision cutting enhances the overall artistic impact of a haircut.

## 🏠 At-Home Learning
### Reading
- **"The Art of Shading in Barbering: Creating Depth and Dimension"**: This article delves into the principles of shading using clippers and trimmers. Learn how to create soft gradients, subtle shadows, and textured effects that add depth to a design.
- **"Precision Hair Art: Adding Depth with Layering and Texturizing"**: Explore how layering and texturizing techniques can be used to enhance artistic cuts, creating visual interest and movement within the design.

### Video
- **"Precision Hair Art: Adding Depth with Shading and Gradients" (15 min)**: A detailed tutorial demonstrating various shading techniques using different guards and lever play to create subtle and dramatic depth in hair designs.
- **"Layering and Texturizing for Artistic Cuts" (10 min)**: Shows how to use shears and thinning shears to add texture and movement, making designs appear more dynamic and realistic.

### Journal Prompt
Why does shading transform a design from a flat pattern into a dynamic, three-dimensional piece of art? Describe a specific design where you would use shading to create a sense of depth or movement, and explain your technique.

## 🏫 In-Class Learning
- **Lecture/Demo**:
    -   **Shading Theory**: Instructor explains the principles of light and shadow as applied to hair design. Demonstrates how to use different clipper guards and lever settings to create various levels of shading and gradient effects.
    -   **Layering for Depth**: Instructor showcases how to use precision layering and point cutting with shears to add texture and depth to a design, making it appear more intricate and realistic.
    -   **Integrating Shading into Designs**: Demonstrate how to seamlessly incorporate shading and depth into existing line-based designs or create entirely new designs using only precision cutting techniques.
- **Hands-On Exercise**:
    -   **"Shaded Freestyle Cut"**: Students will attempt to create a freestyle design on a mannequin that primarily uses shading and gradients to create depth and visual interest. This could be a geometric shape with internal shading or an abstract pattern.
    -   **"Layering for Texture"**: Practice using shears for point cutting and deep notching to create soft, textured edges and internal movement within a design.
    -   **Peer Review**: Students pair up to evaluate each other's shaded designs, focusing on the subtlety of the gradients, the effectiveness of depth creation, and overall artistic impact.
- **Group Discussion**:
    -   **"The Power of Subtlety"**: Discuss how subtle precision cutting techniques can often have a more profound artistic impact than bold line work alone.

## ✍️ Assignment / Practice
- **At Home**:
    -   **"Shaded Design Sketch"**: Sketch 3-5 different shaded designs, using pencil gradients to illustrate the depth and dimension you aim to achieve. For each, describe the precision cutting techniques you would employ.
    -   **Video Practice**: Record yourself performing a shaded design on a mannequin for 7-10 minutes. Focus on smooth transitions and consistent depth in your shading.
- **In Class**:
    -   **Perform Shaded Cut**: Each student will perform a shaded design on a mannequin, demonstrating their ability to use precision cutting for depth and artistic effect.
    -   **Critique Session**: Present your executed design to the class and instructor, explaining your creative process and technical execution. Receive detailed feedback.

## 🧾 Review & Feedback
- **Peer + Instructor Feedback**: Comprehensive feedback on the shading quality, depth creation, and overall artistic merit of the precision-cut designs.
- **Instructor Reviews**: Individualized assessment of the executed designs, focusing on technical mastery of blending, layering, and texturizing for artistic purposes.

## 📚 Resources
- *Milady Standard Barbering*, "Advanced Haircutting" and "Creative Hair Design" chapters.
- YouTube: Channels specializing in hair art and design, particularly those demonstrating shading and texturizing techniques.
- Instagram: Explore hashtags like #hairshading, #barberart, #precisiondesign for inspiration.
`, order_index: 2, quiz_id: null },
  { id: "e0000000-0000-4000-8000-000000000019", module_id: module4_1Id, title: "04 Combining Designs (Line + Precision)", objectives: "Integrate both line and precision cutting for complex designs.", content_html: `# Combining Designs: Line and Precision

## 🎯 Learning Objectives
- Combine bold line work with precision shading in one piece.
- Balance visibility with finesse.
- Master the integration of contrasting cutting techniques for a cohesive artistic statement.
- Develop a sophisticated understanding of composition and visual hierarchy in hair design.

## 🏠 At-Home Learning
### Reading
- **"From Line to Shading: The Evolution of Barber Art"**: This article explores how master barbers combine sharp, defined lines with soft, blended shading to create complex and dynamic hair designs. It emphasizes the interplay between contrasting elements.
- **"Composition and Visual Hierarchy in Hair Design"**: Learn about the principles of composition (e.g., focal point, rhythm, unity) and how to apply them when integrating different design elements. Understand how to guide the viewer's eye through your design.

### Video
- **"Instructor Demo: Combining Sharp Lines with Shaded Gradients" (18 min)**: A comprehensive video demonstrating the creation of a complex haircut that integrates bold line work (e.g., a detailed design) with a high-precision fade and razor finish.
- **"Balancing Boldness and Subtlety in Hair Art" (10 min)**: Discusses how to create visually stunning haircuts that effectively use both prominent lines and subtle shading without one overpowering the other.

### Journal Prompt
Which element do you naturally lean toward in your designs—bold lines or subtle shading? How can you intentionally challenge yourself to incorporate more of the contrasting element to create a more balanced and dynamic combined design?

## 🏫 In-Class Learning
- **Lecture/Demo**:
    -   **Integrated Design Planning**: Instructor demonstrates how to plan a complex haircut that combines advanced line work (e.g., a multi-layered design) with advanced precision blending (e.g., a skin fade with razor enhancements).
    -   **Seamless Transition Strategies**: Showcase specific techniques for smoothly transitioning between intricate line designs and soft, blended areas, ensuring no harsh lines or disconnects.
    -   **Compositional Balance**: Discuss and demonstrate how to achieve compositional balance when integrating different design elements, ensuring the overall look is harmonious and visually appealing.
- **Hands-On Exercise**:
    -   **"Combination Freestyle Challenge"**: Students will attempt to create a freestyle design on a mannequin that effectively integrates both bold line work and precision shading/gradients. This could involve a sharp geometric pattern that fades into a soft blend, or a textured design with crisp outlines.
    -   **Focus on Cohesion**: Emphasize creating a cohesive look where all elements complement each other, rather than appearing as separate components.
    -   **Problem-Solving Workshop**: Address common issues encountered when combining advanced techniques, such as maintaining symmetry across different textures or blending intricate designs into fades.
- **Peer Critique**:
    -   Students will present their "combination freestyles" to the class, explaining their artistic vision, the techniques used, and any challenges encountered. Peers will provide constructive feedback on creativity, technical execution, and overall balance.

## ✍️ Assignment / Practice
- **At Home**:
    -   **"Combined Freestyle Sketch"**: Develop a detailed sketch of a combined freestyle design that integrates both sharp line work and soft precision blending. Include front, side, and back views, and annotate the specific techniques you would use.
    -   **Inspiration Analysis**: Find 3-5 examples of combined hair designs online. Analyze how the artists balanced lines and shading, and identify what makes each design successful.
- **In Class**:
    -   **Execute Combined Design**: Perform your designed "combination freestyle" on a mannequin, focusing on flawless execution and seamless integration of all advanced techniques.
    -   **Presentation & Critique**: Present your finished design to the class and instructor for detailed feedback on artistic vision, technical mastery, and compositional balance.

## 🧾 Review & Feedback
- **Instructor Assessment**: Comprehensive assessment of the executed combined designs, focusing on the integration of techniques, compositional balance, and overall artistic impact.
- **Group Discussion**: Share insights on the challenges and rewards of combining contrasting design elements, and discuss strategies for developing a unique artistic signature.

## 📚 Resources
- *Milady Standard Barbering*, "Creative Hair Design" and "Advanced Haircutting" chapters.
- Online Portfolios: Study the work of renowned barbers who specialize in creative and complex haircuts.
- Design Theory Resources: Explore resources on art and design principles (e.g., balance, contrast, rhythm) and how they apply to haircutting.
`, order_index: 3, quiz_id: null },
  { id: "e0000000-0000-4000-8000-00000000001a", module_id: module4_1Id, title: "05 Review and Feedback (Design)", objectives: "Evaluate design skills and receive feedback on creative work.", content_html: `# Review and Feedback: Design

## 🎯 Learning Objectives
- Reflect on personal creative direction.
- Assess readiness for advanced mastery.
- Consolidate understanding of design principles and their application.
- Develop a refined critical eye for evaluating artistic hair designs.

## 🏠 At-Home Learning
### Journal Prompt
What style or type of design do you want to be known for as a barber? How has your understanding of design principles evolved this week, and how will this influence your future creative work?

### Preparation for Showcase
-   **Review All Designs**: Go over all your sketches and practice designs from Week 4.
-   **Refine Your Strongest Freestyle**: Choose your most successful or creatively challenging freestyle design from the week and spend dedicated time refining it on a mannequin. Aim for perfection in both line work and shading.
-   **Self-Critique**: Use the assessment rubrics (Appendix H) to critically evaluate your chosen design. Identify any remaining imperfections and plan how to address them.

## 🏫 In-Class Learning
- **Showcase**:
    -   **"Design Mastery Showcase"**: Each student will present their strongest freestyle design from the week on a mannequin. This is an opportunity to demonstrate their refined skills in creative line work, precision shading, and integrated designs.
    -   **Instructor Observation**: The instructor will observe the presented designs, noting artistic vision, technical execution, and overall impact.
- **Group Reflection**:
    -   **Strengths + Originality**: Students will engage in a structured group reflection, offering constructive feedback to their peers. Focus on the originality of the design, the clarity of the artistic statement, and the technical execution.
    -   **Sharing Creative Process**: Students will share insights into their creative process, how they found inspiration, and how they overcame design challenges.
- **Instructor-Led Debrief**:
    -   **Consolidation of Design Principles**: The instructor will lead a discussion to consolidate the key learnings from Week 4, highlighting common successes and areas that still require attention in design.
    -   **Q&A Session**: Open forum for students to ask questions and seek clarification on any design concepts or techniques.

## ✍️ Assignment / Practice
- **At Home**:
    -   **"Signature Design Portfolio"**: Plan 3 personal "signature" design sketches. These should be complex, multi-layered designs that showcase your unique artistic style and integrate both line and precision cutting.
    -   **Research Advanced Design Techniques**: Begin researching advanced design techniques (e.g., 3D hair art, color integration, extreme texture) to prepare for the next week's focus on mastering the craft.
- **In Class**:
    -   **Execute One Final Freestyle**: Perform one final freestyle design of the week on a mannequin, aiming to incorporate all learned design principles and techniques.
    -   **Commitment to Growth**: Verbally commit to your personalized practice plan for Week 5 and share one specific learning goal you aim to achieve in mastering the craft.

## 🧾 Review & Feedback
- **Peer + Instructor Critiques**: Comprehensive critiques on the originality, artistic merit, and technical execution of the presented designs.
- **Instructor's Assessment**: A summary of each student's performance in Week 4, providing a benchmark for their progress in creative hair design.
- **Individualized Feedback**: Personalized notes from the instructor, guiding students on their next steps and preparing them for the practical application challenges of Week 5.

## 📚 Resources
- **Personal Notes and Practice Logs**: Continue to be your primary resource for tracking individual progress.
- *Milady Standard Barbering* (relevant chapters for review): Revisit sections on creative hair design, advanced techniques, and artistic principles.
- **Appendix H: Assessment Rubrics & Checklists**: Utilize these for ongoing self-evaluation and peer assessment.
- **Online Barbering Communities**: Engage with online forums or social media groups to seek advice and inspiration for advanced designs.
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