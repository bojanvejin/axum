-- Seed data for phases
INSERT INTO public.phases (id, title, description, weeks, order_index) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'PHASE 1: PRINCIPLES', 'Phase 1 lays the groundwork for all future learning. It introduces students to their tools, the theory of hair design, and the professional standards that will guide them throughout their careers. By establishing a foundation in both knowledge and technique, this phase ensures that every learner understands the ''why'' behind each practice before progressing to advanced applications.', 13, 1),
('b1fccb00-0d1c-4ff9-cc7e-7cc0ce491b22', 'PHASE 2: PRACTICE', 'This stage moves learners from controlled exercises to real-world practice. Students work with models and clients to apply fundamental skills in practical settings. Phase 2 emphasizes repetition, accuracy, speed, and confidence building.', 10, 2),
('c2gddc11-1e2d-5gg0-dd8f-8dd1df502c33', 'PHASE 3: PERFORM', 'Phase 3 focuses on performance at a professional level. Students are expected to handle real clients with minimal supervision while learning advanced services that elevate their craft.', 10, 3),
('d3heede2-2f3e-6hh1-ee9g-9ee2eg613d44', 'PHASE 4: PERFECT', 'This final stage is about mastery. Students refine their craft under close supervision, working with live models in real salon conditions. The focus is on polishing technical skill, artistic vision, and speed.', 10, 4)
ON CONFLICT (id) DO NOTHING;

-- Seed data for modules (Phase 1)
INSERT INTO public.modules (id, phase_id, title, description, order_index) VALUES
('e4ifff33-3g4f-7ii2-ff0h-0ff3fh724e55', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Introduction to Hair Design and Sculpture Theory', 'Students learn how sculpture theory applies to hair design. They study balance, proportion, and form, learning to visualize haircuts as three-dimensional shapes rather than flat designs. This conceptual approach helps students understand how hair moves, falls, and interacts with facial structure.', 1),
('f5jggg44-4h5g-8jj3-gg1i-1gg4gi835f66', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Tools and Equipment Familiarization', 'Students are introduced to the tools of the trade, including scissors, clippers, razors, combs, brushes, and thermal tools. Emphasis is placed on proper handling, maintenance, and sanitation. Each learner will understand why tool quality matters and how to select the right instrument for a particular technique.', 2),
('g6khhh55-5i6h-9kk4-hh2j-2hh5hj946g77', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Shampooing, Blow Drying, and Product Finishing', 'Hands-on instruction focuses on mastering professional shampoo techniques, scalp massage, and the use of appropriate products for different hair types. Blow drying methods are practiced to teach volume control, smooth finishes, and setting the hair for further styling.', 3),
('h7liii66-6j7i-0ll5-ii3k-3ii6ik057h88', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Infection Control, Microbiology, and First Aid', 'Professional hair services require a clean and safe environment. This section covers microbiology basics, infection transmission, proper sanitation protocols, and workplace first aid. Students learn how to identify common risks and maintain a healthy salon space.', 4),
('i8mjjj77-7k8j-1mm6-jj4l-4jj7jl168i99', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Head Shape and Bone Structure Assessment', 'Understanding bone structure is critical to tailoring haircuts to each client. Students learn how to read head shape, crown patterns, and facial features to customize designs that enhance natural beauty.', 5),
('j9nkkk88-8l9k-2nn7-kk5m-5kk8km279j00', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Client Consultation Technique', 'Students are trained to listen actively, ask the right questions, and assess client preferences, lifestyle, and hair history. These skills establish trust and ensure accurate results. Personal appraisal exercises help students reflect on their growth and professionalism.', 6),
('k0olll99-9m0l-3oo8-ll6n-6ll9ln380k11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Glassbox Philosophy and History', 'Students are introduced to the values that underpin the Axum education method. This includes the history of modern barbering and salon work, the development of precision cutting, and why Axum emphasizes craftsmanship, respect for clients, and continuous improvement.', 7)
ON CONFLICT (id) DO NOTHING;

-- Seed data for modules (Phase 2)
INSERT INTO public.modules (id, phase_id, title, description, order_index) VALUES
('l1pmmm00-0n1m-4pp9-mm7o-7mm0mo491l22', 'b1fccb00-0d1c-4ff9-cc7e-7cc0ce491b22', 'Precision Hair Cutting Techniques', 'Students refine scissor-over-comb, clipper-over-comb, fading, tapering, and texturizing skills. They practice cutting straight lines, curves, and layers with accuracy, gradually building efficiency.', 1),
('m2qnnn11-1o2n-5qq0-nn8p-8nn1np502m33', 'b1fccb00-0d1c-4ff9-cc7e-7cc0ce491b22', 'Advanced Styling and Setting', 'Rollers, pin curls, and braiding are combined to create more complex styles. Students learn how to achieve texture, movement, and volume while maintaining control.', 2),
('n3rooo22-2p3o-6rr1-oo9q-9oo2oq613n44', 'b1fccb00-0d1c-4ff9-cc7e-7cc0ce491b22', 'Technical Theory and Product Knowledge', 'Learners deepen their understanding of hair structure, growth patterns, and product chemistry. This knowledge enables informed product selection and accurate service recommendations.', 3),
('o4pspp33-3q4p-7ss2-pp0r-0pp3pr724o55', 'b1fccb00-0d1c-4ff9-cc7e-7cc0ce491b22', 'Colour Services Introduction', 'Students are introduced to colour charts, formulas, and application techniques. They learn how to mix and apply basic tints and semi-permanent colours while observing correct safety procedures.', 4),
('p5qtqq44-4r5q-8tt3-qq1s-1qq4qs835p66', 'b1fccb00-0d1c-4ff9-cc7e-7cc0ce491b22', 'Professional Development and Client Building', 'This module covers goal-setting, client retention strategies, salon operations, and basic business concepts. Students learn how to maintain positive professional relationships and how to use photos, video, and social media to promote their work.', 5)
ON CONFLICT (id) DO NOTHING;

-- Seed data for modules (Phase 3)
INSERT INTO public.modules (id, phase_id, title, description, order_index) VALUES
('q6rurr55-5s6r-9uu4-rr2t-2rr5rt946q77', 'c2gddc11-1e2d-5gg0-dd8f-8dd1df502c33', 'Advanced Cutting and Colouring', 'Students combine their knowledge of shape and form to execute creative cuts, colour corrections, and custom blends. Freehand fading techniques are introduced to develop flexibility and artistry.', 1),
('r7svss66-6t7s-0vv5-ss3u-3ss6su057r88', 'c2gddc11-1e2d-5gg0-dd8f-8dd1df502c33', 'Wig and Extension Services', 'Learners study how to measure, fit, and style wigs, as well as apply extensions safely. These skills prepare them for working with diverse client needs, including medical hair loss solutions.', 2),
('s8twtt77-7u8t-1ww6-tt4v-4tt7tv168s99', 'c2gddc11-1e2d-5gg0-dd8f-8dd1df502c33', 'Salon Etiquette and Customer Care', 'Phase 3 reinforces professional behavior, time management, and communication skills. Students learn how to navigate challenging client situations and maintain consistent service quality.', 3),
('t9uxuu88-8v9u-2xx7-uu5w-5uu8uw279t00', 'c2gddc11-1e2d-5gg0-dd8f-8dd1df502c33', 'Career Preparation and Networking', 'Students meet with Axum’s salon and barbershop partners across the country. Networking events and career discussions help learners understand industry expectations and job placement opportunities.', 4),
('u0vyvv99-9w0v-3yy8-vv6x-6vv9vx380u11', 'c2gddc11-1e2d-5gg0-dd8f-8dd1df502c33', 'Mock Exams', 'Technical and practical assessments simulate final exams. Students perform cutting, styling, and colour services under timed conditions to prepare for professional certification.', 5)
ON CONFLICT (id) DO NOTHING;

-- Seed data for modules (Phase 4)
INSERT INTO public.modules (id, phase_id, title, description, order_index) VALUES
('v1wzww00-0x1w-4zz9-ww7y-7ww0wy491v22', 'd3heede2-2f3e-6hh1-ee9g-9ee2eg613d44', 'Intensive Client Work', 'Morning and afternoon model sessions build stamina and real-world efficiency. Students learn to work independently while managing time constraints.', 1),
('w2xaaa11-1y2x-5aaa-xx8z-8xx1xz502w33', 'd3heede2-2f3e-6hh1-ee9g-9ee2eg613d44', 'Advanced Creative Techniques', 'Lectures on disconnection, advanced layering, and graduation push students to experiment and develop personal styles. New finishing methods are explored to elevate overall presentation.', 2),
('x3ybbb22-2z3y-6bbb-yy9a-9yy2ya613x44', 'd3heede2-2f3e-6hh1-ee9g-9ee2eg613d44', 'Professional Identity and Employment Skills', 'Students receive one-on-one coaching on interview techniques, portfolio development, and how to present themselves to potential employers.', 3),
('y4zccc33-3a4z-7ccc-zz0b-0zz3zb724y55', 'd3heede2-2f3e-6hh1-ee9g-9ee2eg613d44', 'Capstone Performance', 'This stage culminates with live model evaluations, advanced technical assessments, and feedback sessions from instructors. Students demonstrate complete readiness to enter the industry as highly skilled, independent professionals.', 4)
ON CONFLICT (id) DO NOTHING;

-- Seed data for quizzes
INSERT INTO public.quizzes (id, lesson_id, title, description) VALUES
('quiz-tools-equipment-1', NULL, 'Tools & Equipment Basics Quiz', 'Test your knowledge on fundamental hair cutting tools and equipment.')
ON CONFLICT (id) DO NOTHING;

-- Seed data for quiz questions
INSERT INTO public.quiz_questions (id, quiz_id, question_text, question_type, options, correct_answer) VALUES
('qq-tools-1-q1', 'quiz-tools-equipment-1', 'Which type of shears is best for removing bulk and blending lines without significantly changing hair length?', 'mcq', '{"Straight Shears", "Thinning Shears", "Chunking Shears", "Long Shears"}', 'Thinning Shears'),
('qq-tools-1-q2', 'quiz-tools-equipment-1', 'What is the primary purpose of clipper guards?', 'mcq', '{"To protect the blades", "To determine the length of the cut", "To hold hair in place", "To clean the clippers"}', 'To determine the length of the cut'),
('qq-tools-1-q3', 'quiz-tools-equipment-1', 'Which comb is ideal for detangling wet hair?', 'mcq', '{"Cutting Comb", "Tail Comb", "Wide-Tooth Comb", "Fine-Tooth Comb"}', 'Wide-Tooth Comb')
ON CONFLICT (id) DO NOTHING;

-- Seed data for lessons (Phase 1, Module 2: Tools and Equipment Familiarization)
INSERT INTO public.lessons (id, module_id, title, objectives, content_html, video_url, resources_url, order_index, quiz_id) VALUES
('lesson-tools-equipment-1', 'f5jggg44-4h5g-8jj3-gg1i-1gg4gi835f66', 'Introduction to Cutting Tools', 'Understand the types of scissors and their uses; Learn proper handling and maintenance of shears.', '<p>Welcome to the "Tools and Equipment Familiarization" module. This week, we dive deep into the essential instruments that will become extensions of your hands: cutting tools. Mastering these tools is not just about technique, but also about understanding their design, purpose, and how to maintain them for optimal performance and hygiene.</p>
<h3>Scissors (Shears)</h3>
<p>Scissors are the most fundamental tool for any hair professional. They come in various shapes, sizes, and materials, each designed for specific cutting tasks.</p>
<h4>Types of Scissors:</h4>
<ul>
    <li><strong>Straight Shears:</strong> The most common type, used for blunt cutting, solid forms, and general trimming. They typically range from 5 to 7 inches.</li>
    <li><strong>Thinning Shears:</strong> Also known as texturizing shears, these have teeth on one or both blades. They are used to remove bulk, blend lines, and create texture without significantly changing the length of the hair.</li>
    <li><strong>Chunking Shears:</strong> Similar to thinning shears but with wider teeth, designed to remove larger sections of hair for a more dramatic textured look.</li>
    <li><strong>Long Shears:</strong> Typically 7 inches or longer, ideal for cutting long hair, creating long layers, and for barbering techniques like scissor-over-comb.</li>
</ul>
<h4>Anatomy of a Shear:</h4>
<p>Understanding the parts of your scissors is crucial for proper handling and maintenance:</p>
<ul>
    <li><strong>Blades:</strong> The cutting edges. They can be convex (sharp, precise) or beveled (durable, good for blunt cuts).</li>
    <li><strong>Pivot Screw:</strong> Connects the two blades and allows for smooth opening and closing. Proper tension is vital.</li>
    <li><strong>Finger Holes:</strong> Where your thumb and ring finger rest.</li>
    <li><strong>Finger Rest (Tang):</strong> Provides stability and leverage for your pinky finger.</li>
</ul>
<p><strong>Maintenance:</strong> Always clean your shears after each use, lubricate the pivot screw regularly, and store them safely to prevent damage. Professional sharpening is recommended every 6-12 months depending on usage.</p>
<h3>Clippers</h3>
<p>Clippers are indispensable for shorter haircuts, fading, and creating precise lines. They come in corded and cordless versions, with various motor types.</p>
<h4>Types of Clippers:</h4>
<ul>
    <li><strong>Magnetic Motor Clippers:</strong> Durable and powerful, good for heavy-duty cutting.</li>
    <li><strong>Rotary Motor Clippers:</strong> Versatile and quiet, suitable for all hair types and general cutting.</li>
    <li><strong>Pivot Motor Clippers:</b> Offers good power and speed, often used for wet hair.</li>
</ul>
<h4>Clipper Guards:</h4>
<p>These attachments determine the length of the cut. They are numbered, with lower numbers indicating shorter cuts (e.g., #1 for 1/8 inch, #8 for 1 inch).</p>
<p><strong>Maintenance:</strong> Clean blades after each use, oil regularly, and ensure the blade is aligned correctly.</p>
<h3>Combs and Brushes</h3>
<p>These tools are essential for sectioning, detangling, styling, and guiding your cuts.</p>
<h4>Types of Combs:</h4>
<ul>
    <li><strong>Cutting Combs:</strong> Have fine teeth on one side and wider teeth on the other, used for precision cutting and sectioning.</li>
    <li><strong>Tail Combs:</strong> Feature a long, thin handle for precise sectioning and parting.</li>
    <li><strong>Wide-Tooth Combs:</strong> Ideal for detangling wet hair and distributing product.</li>
</ul>
<h4>Types of Brushes:</h4>
<ul>
    <li><strong>Vent Brushes:</strong> Allow air to flow through, speeding up blow-drying.</li>
    <li><strong>Round Brushes:</strong> Used for creating volume, curls, and waves during blow-drying.</li>
    <li><strong>Paddle Brushes:</strong> Great for smoothing and detangling long hair.</li>
</ul>
<p><strong>Sanitation:</strong> All combs and brushes must be thoroughly cleaned and disinfected after every client to prevent the spread of bacteria and fungi.</p>
<p>By understanding and respecting your tools, you lay the foundation for precision, creativity, and client safety in your hair design career.</p>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://example.com/tools_equipment_guide.pdf', 1, 'quiz-tools-equipment-1'),
('lesson-tools-equipment-2', 'f5jggg44-4h5g-8jj3-gg1i-1gg4gi835f66', 'Razors and Thermal Tools', 'Learn to safely use razors for texturizing; Understand different thermal tools and their heat settings.', '<p>This lesson focuses on razors and thermal tools, which add versatility and finishing touches to your hair designs. Proper technique and safety are paramount when working with these instruments.</p>
<h3>Razors</h3>
<p>Haircutting razors are used to create soft, feathered edges, reduce bulk, and add texture. They are excellent for achieving a more natural, less blunt finish than scissors.</p>
<h4>Types of Razors:</h4>
<ul>
    <li><strong>Straight Razors:</strong> Traditional razors that use disposable blades. They offer maximum control and precision for advanced texturizing.</li>
    <li><strong>Shaper Razors:</strong> Often have guards or combs built into the blade holder, making them safer for beginners and for general texturizing.</li>
</ul>
<p><strong>Safety and Technique:</strong> Always use a fresh, sharp blade. Hold the razor at a shallow angle to the hair to avoid cutting too much or creating harsh lines. Practice on mannequins until you are confident. Razors are typically used on wet hair.</p>
<h3>Thermal Tools</h3>
<p>Thermal tools use heat to reshape and style hair, creating curls, waves, or sleek straight looks. Understanding heat settings and hair protection is crucial.</p>
<h4>Types of Thermal Tools:</h4>
<ul>
    <li><strong>Flat Irons (Straighteners):</strong> Used to straighten hair, create soft waves, or even tight curls depending on technique. Look for ceramic or tourmaline plates for even heat distribution and reduced damage.</li>
    <li><strong>Curling Irons/Wands:</b> Come in various barrel sizes to create different curl patterns, from tight ringlets to loose waves. Wands offer a more natural, less structured curl.</li>
    <li><strong>Hot Rollers:</strong> Provide volume and soft curls, often used for setting hair.</li>
</ul>
<p><strong>Heat Protection:</strong> Always apply a heat protectant spray to the hair before using thermal tools. Adjust heat settings based on hair type (lower heat for fine/damaged hair, higher for thick/coarse hair). Avoid holding heat on one section for too long.</p>
<p>Mastering these tools will expand your styling capabilities, allowing you to offer a wider range of services and achieve diverse looks for your clients.</p>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://example.com/thermal_tools_safety.pdf', 2, NULL)
ON CONFLICT (id) DO NOTHING;

-- Add more lessons for other modules/phases as needed, following the structure above.
-- Example for Phase 1, Module 1: Introduction to Hair Design and Sculpture Theory
INSERT INTO public.lessons (id, module_id, title, objectives, content_html, video_url, resources_url, order_index, quiz_id) VALUES
('lesson-sculpture-theory-1', 'e4ifff33-3g4f-7ii2-ff0h-0ff3fh724e55', 'Understanding Form and Balance', 'Define form and balance in hair design; Analyze facial structures for optimal hair shapes.', '<p>In this foundational lesson, we explore how the principles of sculpture theory apply directly to hair design. Haircutting is not merely about removing length; it''s about sculpting a three-dimensional form that complements the client''s unique features.</p>
<h3>Form and Shape</h3>
<p>Every haircut creates a form. This form can be solid, graduated, layered, or a combination. Understanding these basic forms is the first step to visualizing the end result before you even pick up your shears.</p>
<ul>
    <li><strong>Solid Form:</strong> Hair is cut to one length, creating a heavy, blunt perimeter. Think of a classic bob.</li>
    <li><strong>Graduated Form:</strong> Hair is cut with a gradual increase in length from the nape to the crown, creating a stacked effect. This adds volume and shape.</li>
    <li><strong>Layered Form:</strong> Hair is cut with varying lengths throughout, creating movement and texture. Layers can be uniform, increasing, or decreasing.</li>
</ul>
<h3>Balance and Proportion</h3>
<p>Balance in hair design refers to the visual equilibrium of the haircut in relation to the client''s head and body. Proportion is about the harmonious relationship between different parts of the haircut and the client''s features.</p>
<p>Consider the client''s face shape (oval, round, square, heart, long) and bone structure. A well-balanced haircut enhances their best features and minimizes less desirable ones.</p>
<p><strong>Exercise:</strong> Observe different head shapes and imagine how various forms would sit on them. Sketch out a few ideas, focusing on how the hair''s form interacts with the face.</p>', 'https://www.youtube.com/embed/dQw4w9WgXcQ', NULL, 1, NULL)
ON CONFLICT (id) DO NOTHING;