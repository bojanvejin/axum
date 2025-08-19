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
  '<h2>A. History and Tradition of Barbering</h2><p>Barbering, an ancient and revered profession, boasts a history as rich and intricate as the hairstyles it has shaped. Its roots trace back to ancient Egypt, as far back as 3500 BC, where barbers were not merely stylists but highly respected figures, often serving as priests or medicine men. They performed rituals, shaved heads for hygiene, and even conducted minor surgical procedures. This dual role of barber and healer continued into medieval Europe, where "barber-surgeons" were common, performing bloodletting, tooth extractions, and other medical treatments alongside their tonsorial duties. The iconic barber pole, with its red and white stripes, is a direct legacy of this era, symbolizing blood and bandages.</p><p>The professionalization of barbering began to take shape in the 19th century. In 1893, A.B. Mohler established America’s first barbering school in Chicago, marking a pivotal moment in formalizing education and standards within the industry. This was followed by the establishment of barber licensing laws, further solidifying the profession''s legitimacy and ensuring public safety. The 20th century saw barbering evolve with changing fashion trends, from the classic cuts of the mid-century to the diverse styles of today. Throughout these transformations, the barber shop remained a vital community hub, a place for social interaction, discussion, and camaraderie.</p><p>Understanding this history is not just an academic exercise; it provides context and depth to your chosen career. It connects you to a lineage of skilled artisans and highlights the enduring importance of the barber''s role in society. This historical perspective underscores the value of continuous learning and adaptation, principles that are central to the Axum philosophy.</p>',
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
  '<h2>B. The Axum Philosophy</h2><p>At Axum, our philosophy is built on a foundation of unwavering emphasis on solid fundamentals. We believe that true mastery in hairstyling stems not from chasing fleeting trends, but from a deep understanding and consistent application of core techniques. Our mission is to cultivate stylists who are not only technically proficient but also embody the artistry and professionalism that define excellence in our craft.</p><p>We foster a learning environment that is both comfortable and challenging. This means providing comprehensive, step-by-step instruction that builds confidence, while simultaneously pushing our students to expand their boundaries and refine their skills. We believe in a carefully scaffolded approach, ensuring that each new concept builds logically upon the last, allowing for deep comprehension and retention.</p><p>Our values extend beyond the technical. We emphasize the importance of client connection, ethical practice, and a commitment to continuous personal and professional growth. We see hairstyling as more than just a service; it’s an opportunity to build relationships, inspire confidence, and contribute positively to our community. This holistic approach ensures that our graduates are not just skilled barbers, but well-rounded professionals ready to thrive in any setting.</p>',
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
  '<h2>C. Importance of Continuous Improvement</h2><p>The world of hairstyling is dynamic, constantly evolving with new trends, techniques, and technologies. To remain relevant and excel in this competitive field, continuous improvement is not just an advantage—it’s a necessity. At Axum, we instill in our students the understanding that their education does not end upon graduation; it’s a lifelong journey.</p><p>Our trainers, who are masters of both the art and science of hairstyling, emphasize that true expertise comes from consistent practice, critical self-assessment, and a commitment to staying abreast of industry innovations. This includes attending workshops, engaging with peer networks, and actively seeking feedback to refine one’s craft. The pursuit of excellence is an ongoing process, and we provide the tools and mindset for our students to embrace it.</p><h3>Practical Assignment: Reflective Journaling</h3><p>To solidify your understanding of Axum’s philosophy and its practical application, you will begin a reflective journaling practice. For the remainder of this phase, dedicate 15-20 minutes each day to writing in your journal. Consider the following prompts:</p><ul><li>How did today’s lesson connect with Axum’s core values?</li><li>Describe a situation where understanding Axum’s philosophy could guide your decision-making in a client interaction.</li><li>What new fundamental skill did you practice today, and how does it contribute to your overall mastery?</li><li>How do you plan to incorporate continuous improvement into your daily routine as a stylist?</li></ul><p>This journal will not be graded, but it is a crucial tool for self-reflection and internalizing the principles discussed. It will help you bridge the gap between theoretical knowledge and practical application, a key component of the Axum training methodology.</p><h3>Resources:</h3><ul><li>Recommended Reading: "The Art of the Cut" by [Author Name]</li><li>Online Course: "Advanced Barbering Techniques" on [Platform Name]</li><li>Industry Blog: "Modern Barber Trends"</li></ul><h3>Summary & Conclusion:</h3><p>Phase 1 has laid the groundwork for your journey into the world of professional hairstyling with Axum. By understanding the rich history of barbering, internalizing the unique Axum philosophy, and committing to continuous improvement, you are now equipped with the foundational knowledge and mindset necessary for success. Remember, every great stylist began with a solid understanding of the basics and a relentless pursuit of mastery. Embrace this journey, and let your passion for the craft guide you.</p>',
  NULL, -- video_url
  NULL, -- resources_url
  2,
  'b2c3d4e5-f6a7-8901-2345-67890abcdef1',
  NOW()
);