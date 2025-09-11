export interface DailyLesson {
  day: number; // Day number within the course (e.g., Day 1, Day 2)
  title: string;
  description: string;
}

export interface WeeklySchedule {
  week: number;
  title: string;
  days: DailyLesson[];
}

export const courseOutline: WeeklySchedule[] = [
  {
    week: 1,
    title: "Introduction to Line Cutting and Precision Cutting",
    days: [
      { day: 1, title: "Course Overview and Introduction", description: "Welcome and course introduction, overview of the course structure and expectations, importance of line cutting and precision cutting in men's grooming." },
      { day: 2, title: "History of Line Cutting and Precision Cutting", description: "Evolution of line cutting and precision cutting, key figures and their contributions, influence of line cutting and precision cutting on men's grooming." },
      { day: 3, title: "Tools and Techniques", description: "Introduction to the tools used in line cutting and precision cutting, understanding the different types of razors and cutting tools, basic techniques and principles of line cutting and precision cutting." },
      { day: 4, title: "Cleanliness and Hygiene", description: "Importance of cleanliness and hygiene in the barbering profession, proper sterilization and disinfection techniques, maintaining a clean and organized workspace." },
      { day: 5, title: "Safety and First Aid", description: "Understanding the risks and potential hazards in line cutting and precision cutting, basic first aid and emergency procedures, importance of wearing protective gear." },
    ],
  },
  {
    week: 2,
    title: "Mastering the Basics",
    days: [
      { day: 6, title: "Understanding the Hair Follicle", description: "Structure and function of the hair follicle, importance of understanding the hair follicle in line cutting and precision cutting." },
      { day: 7, title: "Line Cutting Techniques", description: "Basic line cutting techniques and principles, creating straight lines and angles, practicing on dummy heads and live clients." },
      { day: 8, title: "Precision Cutting Techniques", description: "Basic precision cutting techniques and principles, creating sharp points and curves, practicing on dummy heads and live clients." },
      { day: 9, title: "Combining Line Cutting and Precision Cutting", description: "Understanding how to combine line cutting and precision cutting techniques, creating simple designs and patterns, practicing on dummy heads and live clients." },
      { day: 10, title: "Review and Feedback", description: "Review of the week's learning, feedback and suggestions for improvement, Q&A session." },
    ],
  },
  {
    week: 3,
    title: "Intermediate Techniques",
    days: [
      { day: 11, title: "Advanced Line Cutting Techniques", description: "Advanced line cutting techniques and principles, creating more complex designs and patterns, practicing on dummy heads and live clients." },
      { day: 12, title: "Advanced Precision Cutting Techniques", description: "Advanced precision cutting techniques and principles, creating more intricate designs and patterns, practicing on dummy heads and live clients." },
      { day: 13, title: "Combining Advanced Techniques", description: "Understanding how to combine advanced line cutting and precision cutting techniques, creating more complex designs and patterns, practicing on dummy heads and live clients." },
      { day: 14, title: "Review and Feedback", description: "Review of the week's learning, feedback and suggestions for improvement, Q&A session." },
    ],
  },
  {
    week: 4,
    title: "Design and Creativity",
    days: [
      { day: 15, title: "Introduction to Design", description: "Understanding the principles of design, importance of design in men's grooming, introduction to different design styles and trends." },
      { day: 16, title: "Creating Designs with Line Cutting", description: "Techniques for creating designs using line cutting, practicing on dummy heads and live clients." },
      { day: 17, title: "Creating Designs with Precision Cutting", description: "Techniques for creating designs using precision cutting, practicing on dummy heads and live clients." },
      { day: 18, title: "Combining Designs with Line Cutting and Precision Cutting", description: "Techniques for combining designs using line cutting and precision cutting, practicing on dummy heads and live clients." },
      { day: 19, title: "Review and Feedback", description: "Review of the week's learning, feedback and suggestions for improvement, Q&A session." },
    ],
  },
  {
    week: 5,
    title: "Mastering the Craft",
    days: [
      { day: 20, title: "Advanced Design Techniques", description: "Advanced techniques for creating designs using line cutting and precision cutting, practicing on dummy heads and live clients." },
      { day: 21, title: "Practical Application", description: "Applying the learned techniques in a practical setting, performing line cutting and precision cutting on live clients, receiving feedback and making adjustments." },
      { day: 22, title: "Review and Feedback", description: "Review of the week's learning, feedback and suggestions for improvement, Q&A session." },
    ],
  },
  {
    week: 6,
    title: "Final Project and Graduation",
    days: [
      { day: 23, title: "Final Project Planning", description: "Planning the final project, which will involve creating a unique design using line cutting and precision cutting, receiving feedback and making adjustments." },
      { day: 24, title: "Final Project Execution", description: "Executing the final project, which will involve creating the design on a live client, receiving feedback and making adjustments." },
      { day: 25, title: "Review and Feedback", description: "Review of the final project, feedback and suggestions for improvement, Q&A session." },
      { day: 26, title: "Graduation Ceremony", description: "Presentation of the final projects, graduation ceremony and recognition of the students' achievements, discussion of the future of line cutting and precision cutting in men's grooming." },
    ],
  },
];