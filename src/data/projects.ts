import { IProjectItem, ProjectType, RepoType } from "@/types";

const projects: IProjectItem[] = [
  {
    id: "e-commerce-app-mern",
    title: "E-commerce App",
    description:
      "An e-commerce web application developed using React.js, Material UI, Redux, and Stripe.",
    icon: "/skills/react.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/suthar-suresh/Ecommerce_mern",
    url: "https://sk-ecommerce-mern.vercel.app/",
    tags: ["React.js", "Redux", "Material UI", "Stripe"],
  },
];
export default projects;
