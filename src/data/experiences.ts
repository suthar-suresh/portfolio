import { IExperienceItem } from "@/types";

const experiences: IExperienceItem[] = [
  {
    designation: "Full Stack Software Engineer",
    company: "Codestarn Technologies",
    startDate: "Mar 2026",
    isCurrentJob: true,
    location: "Surat, Gujarat, India",
    employmentType: "Full-time",
    workplaceType: "On-site",
    description: [
      "Building full-stack features for a real estate project.",
      "Developing practical experience with AI workflows, including retrieval-augmented generation (RAG) and AI agents.",
    ],
  },
  {
    designation: "Back End Developer",
    company: "Freshcodes Technology",
    startDate: "Dec 2025",
    endDate: "Feb 2026",
    isCurrentJob: false,
    location: "Surat, Gujarat, India",
    employmentType: "Full-time",
    workplaceType: "On-site",
    description: [
      "Developed and maintained NestJS backend services for an ERP system supporting MR and MCR workflows.",
      "Contributed to the backend of an n8n-inspired automation platform, including functionality for creating workflow nodes.",
    ],
  },
  {
    designation: "Full Stack Engineer",
    company: "Sparkle Infotech",
    startDate: "May 2024",
    endDate: "Nov 2025",
    isCurrentJob: false,
    location: "Surat, Gujarat, India",
    employmentType: "Full-time",
    workplaceType: "On-site",
    skills: ["Next.js", "MEAN Stack", "+5 skills"],
    description: [
      "Worked as a Full Stack Engineer specializing in MERN, Next.js, and Webflow.",
      "Built and maintained dynamic, high-performance web applications using the MERN stack.",
      "Developed modern, responsive, and SEO-friendly websites using Next.js.",
      "Created visually appealing and interactive web experiences using Webflow.",
      "Implemented best practices for clean code, scalability, and maintainability.",
    ],
  },
  {
    designation: "Trainee",
    company: "Toshal Infotech Pvt. Ltd.",
    startDate: "Dec 2023",
    endDate: "Mar 2024",
    isCurrentJob: false,
    location: "Surat, Gujarat, India",
    employmentType: "Full-time",
    workplaceType: "On-site",
    skills: ["Angular", "TypeScript", "+1 skill"],
    description: [
      "Assisting in the development of dynamic and responsive web applications.",
      "Collaborating with senior developers to enhance performance and functionality.",
      "Implementing clean code practices and adhering to modern development techniques.",
      "Developed a recipe book web app with features for creating, updating, and managing recipes.",
    ],
  },
];

export default experiences;
