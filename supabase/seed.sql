-- Clear existing curriculum data to prevent duplicate key errors on re-seeding
DELETE FROM public.quiz_attempts;
DELETE FROM public.student_progress;
DELETE FROM public.educator_notes;
DELETE FROM public.quiz_questions;
DELETE FROM public.quizzes;
DELETE FROM public.lessons;
DELETE FROM public.modules;
DELETE FROM public.phases;

-- Phase 1: Principles – Week 1: Axum History & Philosophy
INSERT INTO public.phases (id, title, weeks, description, order_index)
VALUES (
  'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  'AXUM Internal Training Curriculum: Phase 1 – Principles',
  1,
  'This foundational phase introduces learners to the AXUM Internal Training Curriculum, focusing on the rich history and unique philosophy of barbering, particularly Axum''s distinctive approach. It lays the essential groundwork for all future modules, emphasizing why understanding these core principles is vital for every aspiring stylist''s successful career.',
  0
);

-- Module 1A: Axum History & Philosophy
INSERT INTO public.modules (id, phase_id, title, description, order_index)
VALUES (
  'b1c2d3e4-f5a6-7890-1234-567890abcdef',
  'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  'Axum History & Philosophy',
  'This module delves into the historical evolution of barbering, the distinctive philosophy of Axum, and the paramount importance of continuous professional development, forming the substantive core of Phase 1.',
  0
);

-- Quiz for Lesson 1A.1: History and Tradition of Barbering
INSERT INTO public.quizzes (id, lesson_id, title, description)
VALUES (
  'f1a2b3c4-d5e6-7890-1234-567890abcdef',
  NULL,
  'Quiz: History and Tradition of Barbering',
  'Test your knowledge on the historical evolution and cultural significance of barbering.'
);

-- Quiz Questions for Quiz: History and Tradition of Barbering
INSERT INTO public.quiz_questions (id, quiz_id, question_text, question_type, options, correct_answer)
VALUES
  (gen_random_uuid(), 'f1a2b3c4-d5e6-7890-1234-567890abcdef', 'When did barbering roots trace back to ancient Egypt?', 'mcq', '["1500 BC", "2500 BC", "3500 BC", "4500 BC"]', '3500 BC'),
  (gen_random_uuid(), 'f1a2b3c4-d5e6-7890-1234-567890abcdef', 'What did "barber-surgeons" perform in medieval times?', 'mcq', '["Hair cutting only", "Teeth pulling only", "Bloodletting only", "All of the above"]', 'All of the above'),
  (gen_random_uuid(), 'f1a2b3c4-d5e6-7890-1234-567890abcdef', 'Who established America’s first barbering school in Chicago and in what year?', 'mcq', '["John Doe in 1900", "A.B. Mohler in 1893", "Jane Smith in 1850", "Robert Johnson in 1920"]', 'A.B. Mohler in 1893');

-- Lesson 1A.1: History and Tradition of Barbering
INSERT INTO public.lessons (id, module_id, title, objectives, content_html, video_url, resources_url, order_index, quiz_id, created_at)
VALUES (
  'c1d2e3f4-a5b6-7890-1234-567890abcdef',
  'b1c2d3e4-f5a6-7890-1234-567890abcdef',
  'History and Tradition of Barbering',
  'Summarize the rich history of barbering and its cultural significance across various time periods, including its ancient origins in Egypt as far back as 3500 BC, and the roles of medieval barber-surgeons. Identify key milestones in barber education, such as the establishment of America’s first barber school in Chicago in 1893, and relate these historical developments to contemporary professional development pathways.',
  '<h2>A. History and Tradition of Barbering</h2><p>Barbering is one of the world''s oldest professions. Barbers have been respected artisans for millennia, with a history that can be traced back as far as 3500 BC in ancient Egypt, where they often served as religious or community leaders performing sacred hair rituals. In many cultures, they were as important as doctors, and medieval barber-surgeons would cut hair, pull teeth, and even perform bloodletting. The red stripes on the traditional barber’s pole symbolize the bloodletting procedures once performed by these barber-surgeons.</p><p>A significant turning point for the profession in the United States came in 1893, when A.B. Mohler opened the first barbering school in Chicago, officially professionalizing the trade. This move established that barbering is a learned profession based on theory and technique, not just a craft.</p><p>Today''s barbering apprenticeships, where new stylists are mentored by experienced instructors through hands-on training, trace back centuries to the guild-like training of old. Modern learners observe and practice alongside senior barbers, blending traditional clipper techniques with salon-style scissor work.</p>',
  NULL, -- video_url
  NULL, -- resources_url
  0,
  'f1a2b3c4-d5e6-7890-1234-567890abcdef',
  NOW()
);

-- Quiz for Lesson 1A.2: The Axum Philosophy
INSERT INTO public.quizzes (id, lesson_id, title, description)
VALUES (
  'a2b3c4d5-e6f7-8901-2345-67890abcdef0',
  NULL,
  'Quiz: The Axum Philosophy',
  'Assess your understanding of Axum''s core mission, values, and unique approach to hairstyling.'
);

-- Quiz Questions for Quiz: The Axum Philosophy
INSERT INTO public.quiz_questions (id, quiz_id, question_text, question_type, options, correct_answer)
VALUES
  (gen_random_uuid(), 'a2b3c4d5-e6f7-8901-2345-67890abcdef0', 'What is a cornerstone of the Axum philosophy regarding skills?', 'mcq', '["Emphasis on advanced techniques only", "Focus on traditional clipper work only", "Unwavering emphasis on solid fundamentals", "Prioritizing creative techniques first"]', 'Unwavering emphasis on solid fundamentals'),
  (gen_random_uuid(), 'a2b3c4d5-e6f7-8901-2345-67890abcdef0', 'What does the phrase "comfortable, yet challenged" imply in Axum''s philosophy?', 'mcq', '["A relaxed learning environment with no challenges", "A learning environment where only easy tasks are given", "A carefully scaffolded learning environment", "A competitive environment where only the best succeed"]', 'A carefully scaffolded learning environment');

-- Lesson 1A.2: The Axum Philosophy
INSERT INTO public.lessons (id, module_id, title, objectives, content_html, video_url, resources_url, order_index, quiz_id, created_at)
VALUES (
  'd1e2f3a4-b5c6-7890-1234-567890abcdef',
  'b1c2d3e4-f5a6-7890-1234-567890abcdef',
  'The Axum Philosophy',
  'Articulate Axum’s core mission and values, explaining precisely how these principles influence and shape daily practice within the profession. Explain the critical importance of ongoing education and the mastery of fundamental skills in fostering successful hairstyling careers.',
  '<h2>B. The Axum Philosophy</h2><p>AXUM has built on this legacy by creating a modern approach to short-hair grooming that combines traditional clipper work with scissor techniques. The philosophy emphasizes mastering both classic men''s clipping and advanced stylist methods. The organization''s approach is grounded in solid fundamentals, focusing first on core skills like hygiene, tool handling, and basic cuts before moving on to more creative techniques.</p><p>According to the AXUM mission, "through the AXUM fundamentals, one will achieve personal and professional progression". Learning is incremental, with each new technique building on previous ones to ensure students feel "comfortable, yet challenged" as they advance. This approach extends to constantly evolving trends, as AXUM trainers stress that hairstyling is a blend of art and science, requiring "a keen eye for detail, a deep understanding of individual hair types".</p>',
  NULL, -- video_url
  NULL, -- resources_url
  1,
  'a2b3c4d5-e6f7-8901-2345-67890abcdef0',
  NOW()
);

-- Quiz for Lesson 1A.3: Importance of Continuous Improvement
INSERT INTO public.quizzes (id, lesson_id, title, description)
VALUES (
  'b2c3d4e5-f6a7-8901-2345-67890abcdef1',
  NULL,
  'Quiz: Importance of Continuous Improvement',
  'Evaluate your understanding of why continuous learning is vital for a successful hairstyling career.'
);

-- Quiz Questions for Quiz: Importance of Continuous Improvement
INSERT INTO public.quiz_questions (id, quiz_id, question_text, question_type, options, correct_answer)
VALUES
  (gen_random_uuid(), 'b2c3d4e5-f6a7-8901-2345-67890abcdef1', 'According to Axum trainers, hairstyling requires what dual nature?', 'mcq', '["Speed and efficiency", "Art and science", "Marketing and sales", "Strength and endurance"]', 'Art and science'),
  (gen_random_uuid(), 'b2c3d4e5-f6a7-8901-2345-67890abcdef1', 'What is considered the "cornerstone of a successful career" by Axum?', 'mcq', '["Natural talent", "Extensive marketing", "Continuous education", "Low pricing"]', 'Continuous education');

-- Lesson 1A.3: Importance of Continuous Improvement, Practical Assignment, Resources, Summary & Conclusion
INSERT INTO public.lessons (id, module_id, title, objectives, content_html, video_url, resources_url, order_index, quiz_id, created_at)
VALUES (
  'e1f2a3b4-c5d6-7890-1234-567890abcdef',
  'b1c2d3e4-f5a6-7890-1234-567890abcdef',
  'Importance of Continuous Improvement & Practical Application',
  'Explain the critical importance of ongoing education and the mastery of fundamental skills in fostering successful hairstyling careers. Apply Axum''s philosophy to simulated real-world situations and articulate how understanding this philosophy influences career growth.',
  '<h2>C. The Importance of Ongoing Education</h2><p>A core belief of AXUM is that by mastering fundamental techniques and embracing lifelong education, each stylist will grow into a confident senior professional. Continuous education is considered the "cornerstone of a successful career", and AXUM embeds this mindset from day one. By staying ahead of the curve with the latest tools and fashions through workshops and certifications, stylists can confidently adapt to new styles and technologies.</p><h3>Practical Assignment: Reflective Journaling</h3><p>To solidify your understanding of Axum’s philosophy and its practical application, you will begin a reflective journaling practice. For the remainder of this phase, dedicate 15-20 minutes each day to writing in your journal. Consider the following prompts:</p><ul><li>How did today’s lesson connect with Axum’s core values?</li><li>Describe a situation where understanding Axum’s philosophy could guide your decision-making in a client interaction.</li><li>What new fundamental skill did you practice today, and how does it contribute to your overall mastery?</li><li>How do you plan to incorporate continuous improvement into your daily routine as a stylist?</li></ul><p>This journal will not be graded, but it is a crucial tool for self-reflection and internalizing the principles discussed. It will help you bridge the gap between theoretical knowledge and practical application, a key component of the Axum training methodology.</p><h3>Resources:</h3><ul><li>Recommended Reading: "The Art of the Cut" by [Author Name]</li><li>Online Course: "Advanced Barbering Techniques" on [Platform Name]</li><li>Industry Blog: "Modern Barber Trends"</li></ul><h3>Summary & Conclusion:</h3><p>Phase 1 has laid the groundwork for your journey into the world of professional hairstyling with Axum. By understanding the rich history of barbering, internalizing the unique Axum philosophy, and committing to continuous improvement, you are now equipped with the foundational knowledge and mindset necessary for success. Remember, every great stylist began with a solid understanding of the basics and a relentless pursuit of mastery. Embrace this journey, and let your passion for the craft guide you.</p>',
  NULL, -- video_url
  NULL, -- resources_url
  2,
  'b2c3d4e5-f6a7-8901-2345-67890abcdef1',
  NOW()
);