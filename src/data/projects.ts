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
  {
    id: "Sparkle infotech",
    title: "Sparkle Infotech - On-demand software solution",
    description:
     "Sparkle Infotech is a leading service-based company specializing in custom web application development, offering end-to-end solutions to clients worldwide.",
    icon: "/skills/nextjs.png",
    repoType: RepoType.Private,
    projectType: ProjectType.Personal,
    url: "https://sparkleinfotech.com/",
    tags: ["next.js", "Chakra UI", "Strapi"],
  },
  // {
  //   id: "GPSATSYS",
  //   title: "GPSATSYS",
  //   description:
  //    `GPSat Systems is an Australian company specializing in GPS and GNSS engineering for mission-critical applications in Defense, Aerospace, and Mining. Their GRIFFIN technology detects and locates radio frequency interference (RFI), enhancing system resilience.`,
  //   icon: "/skills/react.svg",
  //   repoType: RepoType.Private,
  //   projectType: ProjectType.Personal,
  //   url: "https://gpsatsys.com.au/griffin/",
  //   tags: ["React.js", "Redux", "Material UI", "ExpressJs"],
  // },
];
export default projects;
