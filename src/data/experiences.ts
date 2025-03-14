import { IExperienceItem } from "@/types";

const experiences: IExperienceItem[] = [
  {
    designation: "Full Stack Developer",
    company: "Sparkle infotech",
    startDate: "may 2024",
    isCurrentJob: true,
    location: "surat, India",
    description: [
      "Currently working as a Full Stack Developer at Sparkle Infotech specializing in MERN, Next.js, and Webflow.",
      "Building and maintaining dynamic, high-performance web applications using the MERN stack.",
      "Developing modern, responsive, and SEO-friendly websites using Next.js.",
      "Creating visually appealing and interactive web experiences using Webflow.",
      "Implementing best practices for clean code, scalability, and maintainability.",
    ],
  },
  {
    designation: "Angular Development trainee ",
    company: "Toshal infotech",
    startDate: "dec 2023",
    endDate: "march 2024",
    isCurrentJob: false,
    location: "Surat, India",
    description: [
      "Assisting in the development of dynamic and responsive web applications.",
      "Collaborating with senior developers to enhance performance and functionality.",
      "Implementing clean code practices and adhering to modern development techniques.",
      "Developed a recipe book web app with features for creating, updating, and managing recipes.",
    ],
  },
];

export default experiences;
