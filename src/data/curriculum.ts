export interface CurriculumModule {
  title: string;
  description: string;
}

export interface CurriculumPhase {
  id: string;
  title: string;
  weeks: number;
  modules: CurriculumModule[];
}

export const curriculumData: CurriculumPhase[] = [
  {
    id: "phase-1",
    title: "PHASE 1: PRINCIPLES",
    weeks: 13,
    modules: [
      {
        title: "Introduction to Hair Design and Sculpture Theory",
        description: "Students learn how sculpture theory applies to hair design. They study balance, proportion, and form, learning to visualize haircuts as three-dimensional shapes rather than flat designs. This conceptual approach helps students understand how hair moves, falls, and interacts with facial structure.",
      },
      {
        title: "Tools and Equipment Familiarization",
        description: "Students are introduced to the tools of the trade, including scissors, clippers, razors, combs, brushes, and thermal tools. Emphasis is placed on proper handling, maintenance, and sanitation. Each learner will understand why tool quality matters and how to select the right instrument for a particular technique.",
      },
      {
        title: "Shampooing, Blow Drying, and Product Finishing",
        description: "Hands-on instruction focuses on mastering professional shampoo techniques, scalp massage, and the use of appropriate products for different hair types. Blow drying methods are practiced to teach volume control, smooth finishes, and setting the hair for further styling.",
      },
      {
        title: "Infection Control, Microbiology, and First Aid",
        description: "Professional hair services require a clean and safe environment. This section covers microbiology basics, infection transmission, proper sanitation protocols, and workplace first aid. Students learn how to identify common risks and maintain a healthy salon space.",
      },
      {
        title: "Head Shape and Bone Structure Assessment",
        description: "Understanding bone structure is critical to tailoring haircuts to each client. Students learn how to read head shape, crown patterns, and facial features to customize designs that enhance natural beauty.",
      },
      {
        title: "Client Consultation Technique",
        description: "Students are trained to listen actively, ask the right questions, and assess client preferences, lifestyle, and hair history. These skills establish trust and ensure accurate results. Personal appraisal exercises help students reflect on their growth and professionalism.",
      },
      {
        title: "Glassbox Philosophy and History",
        description: "Students are introduced to the values that underpin the Axum education method. This includes the history of modern barbering and salon work, the development of precision cutting, and why Axum emphasizes craftsmanship, respect for clients, and continuous improvement.",
      },
    ],
  },
  {
    id: "phase-2",
    title: "PHASE 2: PRACTICE",
    weeks: 10,
    modules: [
      {
        title: "Precision Hair Cutting Techniques",
        description: "Students refine scissor-over-comb, clipper-over-comb, fading, tapering, and texturizing skills. They practice cutting straight lines, curves, and layers with accuracy, gradually building efficiency.",
      },
      {
        title: "Advanced Styling and Setting",
        description: "Rollers, pin curls, and braiding are combined to create more complex styles. Students learn how to achieve texture, movement, and volume while maintaining control.",
      },
      {
        title: "Technical Theory and Product Knowledge",
        description: "Learners deepen their understanding of hair structure, growth patterns, and product chemistry. This knowledge enables informed product selection and accurate service recommendations.",
      },
      {
        title: "Colour Services Introduction",
        description: "Students are introduced to colour charts, formulas, and application techniques. They learn how to mix and apply basic tints and semi-permanent colours while observing correct safety procedures.",
      },
      {
        title: "Professional Development and Client Building",
        description: "This module covers goal-setting, client retention strategies, salon operations, and basic business concepts. Students learn how to maintain positive professional relationships and how to use photos, video, and social media to promote their work.",
      },
    ],
  },
  {
    id: "phase-3",
    title: "PHASE 3: PERFORM",
    weeks: 10,
    modules: [
      {
        title: "Advanced Cutting and Colouring",
        description: "Students combine their knowledge of shape and form to execute creative cuts, colour corrections, and custom blends. Freehand fading techniques are introduced to develop flexibility and artistry.",
      },
      {
        title: "Wig and Extension Services",
        description: "Learners study how to measure, fit, and style wigs, as well as apply extensions safely. These skills prepare them for working with diverse client needs, including medical hair loss solutions.",
      },
      {
        title: "Salon Etiquette and Customer Care",
        description: "Phase 3 reinforces professional behavior, time management, and communication skills. Students learn how to navigate challenging client situations and maintain consistent service quality.",
      },
      {
        title: "Career Preparation and Networking",
        description: "Students meet with Axum’s salon and barbershop partners across the country. Networking events and career discussions help learners understand industry expectations and job placement opportunities.",
      },
      {
        title: "Mock Exams",
        description: "Technical and practical assessments simulate final exams. Students perform cutting, styling, and colour services under timed conditions to prepare for professional certification.",
      },
    ],
  },
  {
    id: "phase-4",
    title: "PHASE 4: PERFECT",
    weeks: 10,
    modules: [
      {
        title: "Intensive Client Work",
        description: "Morning and afternoon model sessions build stamina and real-world efficiency. Students learn to work independently while managing time constraints.",
      },
      {
        title: "Advanced Creative Techniques",
        description: "Lectures on disconnection, advanced layering, and graduation push students to experiment and develop personal styles. New finishing methods are explored to elevate overall presentation.",
      },
      {
        title: "Professional Identity and Employment Skills",
        description: "Students receive one-on-one coaching on interview techniques, portfolio development, and how to present themselves to potential employers.",
      },
      {
        title: "Capstone Performance",
        description: "This stage culminates with live model evaluations, advanced technical assessments, and feedback sessions from instructors. Students demonstrate complete readiness to enter the industry as highly skilled, independent professionals.",
      },
    ],
  },
];