/**
 * Single source of truth for all portfolio content.
 * Edit this file to change copy, projects, experience, links, etc.
 */

export const profile = {
  name: "Rishbh Bhawsar",
  role: "Software Development Engineer",
  shortRole: "Frontend Engineer",
  tagline:
    "Software Engineer focused on Angular applications, enterprise platforms, and scalable web solutions. Angular, TypeScript, NGXS, Keycloak SSO, Socket.IO, Firebase, and AWS integrations.",
  location: "Indore, India",
  email: "rishbhbhawsar24@gmail.com",
  github: "https://github.com/rishbh-bhawsar",
  linkedin: "https://www.linkedin.com/in/rishbh-bhawsar",
  // leetcode: "https://leetcode.com/risheek_14",
  // codechef: "https://www.codechef.com/users/risheek_14",
  resumeUrl: "/resume.pdf",
  resumeUpdated: "Jun 2026",
  avatarUrl: "/avatar.png",
  available: true,
  roles: [
  "Angular Developer",
  "Frontend Engineer",
  "UI Architect",
  "Web Application Developer",
],
} as const;

export const about = {
  paragraphs: [
    "I build scalable web applications that balance performance, usability, and maintainability. Over the last 4.5+ years, I've worked on professional networking platforms, healthcare staffing systems, enterprise dashboards, and real-time applications using Angular, TypeScript, and modern web technologies.",
    "My favorite kind of engineering is the practical kind: reusable components, clean architecture, predictable behavior, and solutions that remain easy to maintain as products grow. I care about user experience, application performance, code quality, and building software that teams can confidently extend and support.",
    "Outside of work, I explore new Angular features, build personal projects, strengthen my problem-solving skills, and stay current with modern frontend and full-stack development practices.",
  ],
  highlights: [
  { label: "Years Building Web Applications", value: "4.5+" },
  { label: "Users Served Across Platforms", value: "10K+" },
  { label: "Production Applications Delivered", value: "10+" },
  { label: "API Integrations Implemented", value: "50+" },
],
} as const;

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  bullets: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
  company: "Ideal IT Techno",
  role: "Software Engineer",
  period: "Nov 2021 — Present",
  location: "Indore, India",
  type: "Onsite",
  bullets: [
    "Built and scaled Sohaara, a professional networking platform serving 10,000+ users.",
    "Implemented Keycloak SSO and RBAC across multiple applications for secure authentication and authorization.",
    "Developed real-time chat, notifications, and live streaming features using Socket.IO, Firebase, and HLS.js.",
    "Created enterprise admin dashboards with Angular, NGXS, and Ng Zorro for platform operations and analytics.",
    "Integrated Google Maps, HERE Maps, OneSignal, AWS SDK, and FingerprintJS services.",
    "Improved application performance by 30% through lazy loading, code splitting, and bundle optimization."
  ],
  stack: [
    "Angular",
    "TypeScript",
    "NGXS",
    "Keycloak",
    "Socket.IO",
    "Firebase",
    "AWS",
    "Google Maps"
  ]
},
  {
  company: "PageUp Soft Pvt. Ltd.",
  role: "Angular Developer Intern",
  period: "Aug 2020 — Oct 2020",
  location: "Indore, India",
  type: "Onsite",
  bullets: [
    "Built responsive web interfaces using Angular, TypeScript, HTML, CSS, and Bootstrap.",
    "Developed reusable UI components and integrated REST APIs.",
    "Implemented form validations, routing, and frontend best practices.",
    "Worked closely with senior developers in Agile development workflows."
  ],
  stack: [
    "Angular",
    "TypeScript",
    "Bootstrap",
    "REST APIs",
    "Git"
  ]
}
];

export type Project = {
  title: string;
  period: string;
  blurb: string;
  problem: string;
  architecture: string[];
  stack: string[];
  website: string;
  demo?: string;
  highlight?: string;
};

export const projects: Project[] = [
  {
  title: "MyShyft",
  period: "Apr 2023",
  blurb: "Healthcare staffing and workforce management platform connecting healthcare facilities with qualified professionals.",
  problem:
    "Managing healthcare staffing is challenging when facilities need qualified professionals on short notice. MyShyft streamlines shift scheduling, workforce management, compliance tracking, and facility discovery through a centralized platform.",
  architecture: [
    "Built a calendar-driven scheduling system with shift assignment, availability tracking, and workforce management workflows.",
    "Integrated Google Maps for location-based facility discovery, helping healthcare professionals find nearby opportunities efficiently.",
    "Implemented Firebase-powered authentication, real-time notifications, and user engagement features across the platform.",
    "Developed responsive dashboards for staffing operations, compliance monitoring, reporting, and workforce administration.",
  ],
  stack: [
    "Angular 12",
    "TypeScript",
    "Firebase",
    "Google Maps",
    "FullCalendar",
    "Bootstrap",
    "REST APIs"
  ],
  website: "https://myshyft.org/",
},
{
  title: "LivelyConnect Admin Dashboard",
  period: "Jan 2022",
  highlight: "Enterprise",
  blurb: "Centralized admin platform for user management, content moderation, reporting, and operational workflows.",
  problem:
    "Managing platform operations at scale requires powerful internal tools. LivelyConnect provides administrators with a unified dashboard for managing users, content, analytics, and business operations efficiently.",
  architecture: [
    "Built a modular admin platform with reusable components and scalable UI patterns for rapid feature development.",
    "Developed advanced data tables with filtering, sorting, pagination, and bulk actions to efficiently manage large datasets.",
    "Implemented role-based access controls, protected workflows, and centralized state management for secure platform administration.",
    "Designed reporting and analytics interfaces that provide operational insights, content oversight, and user activity monitoring."
  ],
  stack: [
    "Next.js 14",
    "React 18",
    "Redux Toolkit",
    "TanStack Table",
    "Radix UI",
    "REST APIs",
    "SSR"
  ],
  website: "https://devadmin.livelyconnect.com/",
}
];

export type SkillGroup = {
  category: string;
  items: { name: string; note?: string }[];
};

export const skills: SkillGroup[] = [
  {
    category: "Core Backend",
    items: [
      { name: "Node.js", note: "production" },
      { name: "Express.js" },
      { name: "REST APIs" }
    ],
  },
  {
    category: "Languages",
    items: [
      { name: "Angular", note: "primary" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "React" },
      { name: "Next.js" },
    ],
  },
  {
    category: "Data & Caching",
    items: [
      { name: "MySql", note: "primary" },
      { name: "Firebase" },
    ],
  },
  {
    category: "Architecture",
    items: [
      { name: "Enterprise Web Applications" },
      { name: "Modular Architecture" },
      { name: "State Management (NGXS)" },
      { name: "Authentication & Authorization" },
      { name: "Real-Time Communication" },
    ],
  },
  {
    category: "Messaging",
    items: [
      { name: "WebSockets" },
    ],
  },
  // {
  //   category: "AI / LLM",
  //   items: [
  //     { name: "RAG" },
  //     { name: "LangChain" },
  //     { name: "LangGraph" },
  //     { name: "Hugging Face" },
  //   ],
  // },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Docker" },
      { name: "CI/CD" },
      { name: "Git" },
      { name: "Postman" },
    ],
  },
  {
    category: "Security",
    items: [
      { name: "keycloak" },
      { name: "JWT" },
    ],
  },
];

export type Achievement = {
  label: string;
  detail: string;
  href?: string;
};

export const achievements: Achievement[] = [
  {
    label: "B.Tech",
    detail: "Oriental University Indore · CGPA 7.31 (2015–2019)",
  },
];

export const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;
