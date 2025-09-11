-- Clear existing data (optional, but good for a fresh start during development)
DELETE FROM quiz_questions;
DELETE FROM quizzes;
DELETE FROM lessons;
DELETE FROM modules;
DELETE FROM phases;

-- Insert Sample Phases
INSERT INTO public.phases (id, title, description, weeks, order_index, created_at)
VALUES
  ('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Phase 1: Foundations of Hair Styling', 'Learn the fundamental techniques and theories of hair styling, from basic cuts to essential tools.', 4, 1, NOW()),
  ('b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'Phase 2: Advanced Cutting & Coloring', 'Dive deeper into complex cutting methods, advanced coloring techniques, and client consultation.', 6, 2, NOW()),
  ('c3d4e5f6-a7b8-9012-3456-7890abcdef01', 'Phase 3: Extensions & Creative Styling', 'Master hair extensions, intricate updos, and develop your unique creative styling approach.', 5, 3, NOW());

-- Insert Sample Modules for Phase 1
INSERT INTO public.modules (id, phase_id, title, description, order_index, created_at)
VALUES
  ('m1a1b2c3-d4e5-f678-9012-34567890abcd', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Module 1.1: Tools & Sanitation', 'Understand the essential tools of the trade and proper sanitation practices.', 1, NOW()),
  ('m1e5f6g7-h8i9-j012-3456-7890abcdefgh', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Module 1.2: Basic Hair Anatomy & Growth', 'Explore the structure of hair and its growth cycles.', 2, NOW()),
  ('m1i9j0k1-l2m3-n456-7890-abcdefghijkl', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Module 1.3: Shampooing & Conditioning', 'Master the art of effective hair cleansing and conditioning.', 3, NOW());

-- Insert Sample Modules for Phase 2
INSERT INTO public.modules (id, phase_id, title, description, order_index, created_at)
VALUES
  ('m2a1b2c3-d4e5-f678-9012-34567890abcd', 'b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'Module 2.1: Precision Cutting', 'Learn advanced techniques for precise and intricate haircuts.', 1, NOW()),
  ('m2e5f6g7-h8i9-j012-3456-7890abcdefgh', 'b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'Module 2.2: Advanced Color Theory', 'Deep dive into color science, correction, and creative applications.', 2, NOW());

-- Insert Sample Lessons for Module 1.1
INSERT INTO public.lessons (id, module_id, title, objectives, content_html, video_url, resources_url, order_index, created_at)
VALUES
  ('l1a1b2c3-d4e5-f678-9012-34567890abcd', 'm1a1b2c3-d4e5-f678-9012-34567890abcd', 'Lesson 1: Introduction to Tools', 'Identify and understand the function of basic hair styling tools.', '<p>This lesson introduces you to the essential tools every hair stylist needs. We will cover combs, brushes, scissors, clippers, and various heat styling tools.</p>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://example.com/tools-guide.pdf', 1, NOW()),
  ('l2e5f6g7-h8i9-j012-3456-7890abcdefgh', 'm1a1b2c3-d4e5-f678-9012-34567890abcd', 'Lesson 2: Sanitation & Safety', 'Apply proper sanitation and safety protocols in a salon environment.', '<p>Maintaining a clean and safe environment is crucial. This lesson covers sterilization techniques, cross-contamination prevention, and client safety measures.</p>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://example.com/safety-checklist.pdf', 2, NOW());

-- Insert Sample Lessons for Module 1.2
INSERT INTO public.lessons (id, module_id, title, objectives, content_html, video_url, resources_url, order_index, created_at)
VALUES
  ('l3i9j0k1-l2m3-n456-7890-abcdefghijkl', 'm1e5f6g7-h8i9-j012-3456-7890abcdefgh', 'Lesson 3: Hair Structure', 'Describe the layers and components of a hair strand.', '<p>Understanding hair structure is key to effective treatments. We will examine the cuticle, cortex, and medulla, and how they influence hair health and appearance.</p>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', NULL, 1, NOW());

-- Insert Sample Quizzes
INSERT INTO public.quizzes (id, lesson_id, title, description, created_at)
VALUES
  ('q1a1b2c3-d4e5-f678-9012-34567890abcd', 'l1a1b2c3-d4e5-f678-9012-34567890abcd', 'Tools & Sanitation Quiz', 'A quick check on your knowledge of basic tools and sanitation.', NOW()),
  ('q2e5f6g7-h8i9-j012-3456-7890abcdefgh', 'l3i9j0k1-l2m3-n456-7890-abcdefghijkl', 'Hair Structure Quiz', 'Test your understanding of hair anatomy.', NOW());

-- Update lessons to link to quizzes
UPDATE public.lessons SET quiz_id = 'q1a1b2c3-d4e5-f678-9012-34567890abcd' WHERE id = 'l1a1b2c3-d4e5-f678-9012-34567890abcd';
UPDATE public.lessons SET quiz_id = 'q2e5f6g7-h8i9-j012-3456-7890abcdefgh' WHERE id = 'l3i9j0k1-l2m3-n456-7890-abcdefghijkl';

-- Insert Sample Quiz Questions for Quiz 1
INSERT INTO public.quiz_questions (id, quiz_id, question_text, question_type, options, correct_answer, created_at)
VALUES
  ('qq1a1b2c-d4e5-f678-9012-34567890abcd', 'q1a1b2c3-d4e5-f678-9012-34567890abcd', 'Which tool is primarily used for precise cutting?', 'mcq', '{"Clippers", "Shears", "Trimmers", "Razors"}', 'Shears', NOW()),
  ('qq2e5f6g-h8i9-j012-3456-7890abcdefgh', 'q1a1b2c3-d4e5-f678-9012-34567890abcd', 'What is the most important step before starting any service?', 'mcq', '{"Client consultation", "Sanitation", "Tool preparation", "Styling"}', 'Sanitation', NOW());

-- Insert Sample Quiz Questions for Quiz 2
INSERT INTO public.quiz_questions (id, quiz_id, question_text, question_type, options, correct_answer, created_at)
VALUES
  ('qq3i9j0k-l2m3-n456-7890-abcdefghijkl', 'q2e5f6g7-h8i9-j012-3456-7890abcdefgh', 'Which part of the hair strand is responsible for its elasticity and strength?', 'mcq', '{"Cuticle", "Cortex", "Medulla", "Follicle"}', 'Cortex', NOW()),
  ('qq4m3n4o-p5q6-r789-0123-4567890abcde', 'q2e5f6g7-h8i9-j012-3456-7890abcdefgh', 'What is the outermost layer of the hair shaft?', 'mcq', '{"Cortex", "Medulla", "Cuticle", "Root"}', 'Cuticle', NOW());