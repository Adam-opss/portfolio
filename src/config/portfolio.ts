/**
 * ──────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT
 * ──────────────────────────────────────────────────────────────────────────
 *  Edit this file to update the entire site. No component edits required.
 *  Every section reads from the exported `portfolio` object below.
 *
 *  NOTE: Replace placeholder values (name, links, dates, metrics) with your
 *  real information. Icon names map to lucide-react icons (see lib/icons.ts).
 */

export type ProficiencyLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface SocialLink {
  label: string;
  href: string;
  icon: string; // lucide icon key
}

export interface Skill {
  name: string;
  icon: string;
  /** 0–100 */
  level: number;
  proficiency: ProficiencyLevel;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  /** Bespoke monochrome data-viz mockup drawn on the card cover. */
  visual: "network" | "dashboard" | "line" | "pipeline" | "cluster" | "area";
  image?: string; // optional: path under /public or remote URL
  tech: string[];
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  logo?: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  achievements: string[];
  tech?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  location: string;
  start: string;
  end: string;
  description: string;
  highlights?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  icon: string;
}

export interface TechItem {
  name: string;
  category: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  avatar?: string;
}

export interface PortfolioConfig {
  person: {
    name: string;
    firstName: string;
    title: string;
    /** rotating roles for the typing animation */
    roles: string[];
    tagline: string;
    bio: string[];
    location: string;
    availability: string;
    email: string;
    resumeUrl?: string;
    avatar?: string;
  };
  social: SocialLink[];
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: Certification[];
  techStack: TechItem[];
  stats: Stat[];
  testimonials: Testimonial[];
}

export const portfolio: PortfolioConfig = {
  person: {
    name: "Adam Paľo",
    firstName: "Adam",
    title: "AI & Data Analytics",
    roles: [
      "AI & Machine Learning Student",
      "Data Analytics Enthusiast",
      "Business Intelligence Developer",
      "Data Visualization Designer",
      "Process Automation Builder",
    ],
    tagline:
      "Turning data into intelligence, and intelligence into decisions.",
    bio: [
      "I'm a student at the Technical University of Košice. I just finished my bachelor's in Business Informatics and I'm continuing into a master's in Artificial Intelligence, moving from turning data into business decisions toward building the systems that make them. I'm a big believer in AI: I use it in my work almost every day, and I'm convinced it's where the future is headed.",
      "My work lives where statistics, machine learning, and clean storytelling meet: models that find signal in noise and dashboards that make it impossible to ignore. Most recently that meant unsupervised anomaly detection for collusion in public procurement, the subject of my bachelor's thesis.",
      "Off the clock you'll find me on the football pitch, running or training, reading, or deep in a side project.",
    ],
    location: "Košice, Slovakia",
    availability: "Working student · open to AI/data roles",
    email: "ppalo.adam@gmail.com",
    resumeUrl: "/resume.pdf",
    // Your photo: drop a file named `profile.jpg` into the `portfolio/public`
    // folder and it shows automatically. A portrait (4:5, ~800×1000px) works
    // best. Until the file exists a tasteful placeholder is shown.
    avatar: "/profile.jpg",
  },

  social: [
    { label: "GitHub", href: "https://github.com/Adam-opss", icon: "Github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/adam-pa%C4%BEo-08a986389/",
      icon: "Linkedin",
    },
    { label: "Email", href: "mailto:ppalo.adam@gmail.com", icon: "Mail" },
  ],

  skills: [
    {
      id: "programming",
      label: "Programming",
      icon: "Code2",
      skills: [
        { name: "Python", icon: "FileCode", level: 80, proficiency: "Advanced" },
        { name: "SQL", icon: "Database", level: 78, proficiency: "Advanced" },
        { name: "Java", icon: "Coffee", level: 65, proficiency: "Intermediate" },
        { name: "TypeScript", icon: "Braces", level: 60, proficiency: "Intermediate" },
      ],
    },
    {
      id: "data-analytics",
      label: "Data Analytics",
      icon: "LineChart",
      skills: [
        { name: "Pandas", icon: "Table", level: 80, proficiency: "Advanced" },
        { name: "NumPy", icon: "Calculator", level: 70, proficiency: "Intermediate" },
        { name: "Statistics", icon: "Sigma", level: 68, proficiency: "Intermediate" },
        { name: "Feature Engineering", icon: "Wand2", level: 65, proficiency: "Intermediate" },
      ],
    },
    {
      id: "machine-learning",
      label: "Machine Learning",
      icon: "BrainCircuit",
      skills: [
        { name: "scikit-learn", icon: "Cog", level: 68, proficiency: "Intermediate" },
        { name: "Anomaly Detection", icon: "Radar", level: 70, proficiency: "Intermediate" },
        { name: "Clustering (DBSCAN)", icon: "Network", level: 68, proficiency: "Intermediate" },
        { name: "Isolation Forest", icon: "TreePine", level: 64, proficiency: "Intermediate" },
      ],
    },
    {
      id: "bi",
      label: "Business Intelligence",
      icon: "Presentation",
      skills: [
        { name: "Power BI", icon: "BarChart3", level: 68, proficiency: "Intermediate" },
        { name: "Tableau", icon: "AreaChart", level: 70, proficiency: "Intermediate" },
        { name: "DAX", icon: "Function", level: 55, proficiency: "Intermediate" },
        { name: "Streamlit", icon: "Activity", level: 64, proficiency: "Intermediate" },
        { name: "Reporting", icon: "FileBarChart", level: 70, proficiency: "Intermediate" },
      ],
    },
    {
      id: "cloud",
      label: "Cloud & DevOps",
      icon: "Container",
      skills: [
        { name: "Docker", icon: "Container", level: 66, proficiency: "Intermediate" },
        { name: "Docker Compose", icon: "Layers", level: 62, proficiency: "Intermediate" },
        { name: "Vercel", icon: "Cloud", level: 66, proficiency: "Intermediate" },
      ],
    },
    {
      id: "web",
      label: "Web Development",
      icon: "Braces",
      skills: [
        { name: "Next.js", icon: "Triangle", level: 64, proficiency: "Intermediate" },
        { name: "React", icon: "Atom", level: 64, proficiency: "Intermediate" },
        { name: "Node.js", icon: "Hexagon", level: 62, proficiency: "Intermediate" },
        { name: "Firebase", icon: "Flame", level: 60, proficiency: "Intermediate" },
      ],
    },
    {
      id: "databases",
      label: "Databases",
      icon: "Database",
      skills: [
        { name: "PostgreSQL", icon: "Database", level: 74, proficiency: "Advanced" },
        { name: "SQLite", icon: "HardDrive", level: 68, proficiency: "Intermediate" },
        { name: "MySQL", icon: "Database", level: 60, proficiency: "Intermediate" },
        { name: "Prisma", icon: "Boxes", level: 62, proficiency: "Intermediate" },
      ],
    },
    {
      id: "visualization",
      label: "Visualization",
      icon: "PieChart",
      skills: [
        { name: "Matplotlib", icon: "LineChart", level: 76, proficiency: "Advanced" },
        { name: "Seaborn", icon: "BarChart3", level: 70, proficiency: "Intermediate" },
        { name: "Tableau", icon: "AreaChart", level: 70, proficiency: "Intermediate" },
        { name: "Plotly", icon: "Activity", level: 62, proficiency: "Intermediate" },
        { name: "Recharts", icon: "LineChart", level: 64, proficiency: "Intermediate" },
      ],
    },
    {
      id: "tools",
      label: "Tools",
      icon: "Wrench",
      skills: [
        { name: "Git", icon: "GitBranch", level: 76, proficiency: "Advanced" },
        { name: "Jupyter", icon: "NotebookPen", level: 78, proficiency: "Advanced" },
        { name: "Excel", icon: "Sheet", level: 72, proficiency: "Intermediate" },
      ],
    },
  ],

  projects: [
    {
      id: "collusion-detection",
      title: "Collusion Detection in Public Procurement",
      description:
        "Unsupervised ML pipeline that surfaces collusive bidding patterns in EKS public-tender data using DBSCAN and Isolation Forest.",
      longDescription:
        "Bachelor's thesis project. I engineered features from thousands of public tenders, computed pairwise bidder profiles and win-rate anomalies, then combined density-based clustering (DBSCAN) with Isolation Forest to flag suspicious cartels. The pipeline ranks bidder pairs by anomaly score and visualizes point, contextual, and collective anomalies for investigators.",
      visual: "network",
      tech: ["Python", "scikit-learn", "Pandas", "DBSCAN", "Isolation Forest", "Matplotlib"],
      tags: ["Machine Learning", "Data Analytics"],
      github: "https://github.com/Adam-opss",
      demo: "",
      featured: true,
      metrics: [
        { label: "Tenders analyzed", value: "12k+" },
        { label: "Anomaly recall", value: "0.91" },
        { label: "Bidder pairs ranked", value: "3.4k" },
      ],
    },
    {
      id: "logistics-dashboard",
      title: "Logistics Analytics Dashboard",
      description:
        "End-to-end analytics on real-world logistics data: full ETL, then an interactive Tableau dashboard and a Streamlit web app. Took 1st place at the course hackathon.",
      longDescription:
        "Built for the Data Visualization course with real, messy industry data. We ran the full ETL phase, correcting, enriching, and cleaning the data, before building two parallel deliverables: an interactive Tableau dashboard and a functional Streamlit web app, comparing both tools side by side. The dashboard tracks margin, costs, revenue, order volumes, branch and agent performance, and geographic distribution across Europe. Our team took 1st place at the course hackathon and presented the results to the company's owners. Team: Adam Paľo, Andrea Kravcová, and Mariana Tomiová.",
      visual: "dashboard",
      tech: ["Tableau", "Streamlit", "Python", "Pandas", "ETL"],
      tags: ["Data Visualization", "Business Intelligence", "Data Analytics"],
      github: "",
      demo: "",
      featured: true,
      metrics: [
        { label: "Hackathon", value: "1st place" },
        { label: "Tools", value: "Tableau · Streamlit" },
        { label: "Pipeline", value: "Full ETL" },
      ],
    },
    {
      id: "moneyflow",
      title: "MoneyFlow",
      description:
        "A full-stack personal finance tracker: import transactions, categorize spending, set budgets, and explore cashflow analytics, dashboards, and trends. Built in Next.js and deployed on Vercel.",
      longDescription:
        "A full-stack personal finance tracker I built to manage my own money end to end. It includes a dashboard (monthly overview, top categories, budget progress, trend charts), a transactions page with month/category/type filters, note search, and CSV import/export, category insights with top merchants and rules, monthly budgets with overspending highlights, an analytics page with synchronized cashflow, suspicious-transaction detection, and payment-method breakdown, and recurring-transaction templates with one-click generation. Built with Next.js (App Router) and TypeScript, Prisma with PostgreSQL, shadcn-style UI, and Recharts, deployed on Vercel.",
      visual: "line",
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Recharts"],
      tags: ["Full-Stack", "Web App", "Data Visualization"],
      github: "",
      demo: "",
      featured: true,
      metrics: [
        { label: "Modules", value: "6" },
        { label: "Database", value: "Postgres" },
        { label: "Deploy", value: "Vercel" },
      ],
    },
    {
      id: "track-my-goals",
      title: "Track My Goals",
      description:
        "A containerized goal-tracking web app built for a cloud systems course: a Node/Express API with a PostgreSQL backend, orchestrated end to end with Docker Compose.",
      longDescription:
        "A goal-tracking web app I built to learn cloud and containerization fundamentals. An Express REST API backed by PostgreSQL is fully containerized and orchestrated with Docker Compose: separate web and database services on a bridge network, a named volume for persistent data, a database health check the web service waits on before starting, and automatic restart policies for resilience. The whole stack spins up locally with a single command.",
      visual: "pipeline",
      tech: ["Docker", "Docker Compose", "Node.js", "Express", "PostgreSQL"],
      tags: ["Cloud", "DevOps", "Web App"],
      github: "",
      demo: "",
      featured: false,
      metrics: [
        { label: "Containers", value: "2" },
        { label: "Database", value: "Postgres" },
        { label: "Infra", value: "Docker Compose" },
      ],
    },
    {
      id: "festival-ticketing",
      title: "Festival Ticketing System",
      description:
        "A Java festival ticket-selling system designed around clean OOP and classic design patterns (Factory, Decorator, Adapter), with custom exceptions and a full UML model.",
      longDescription:
        "An object-oriented programming assignment modeling a music-festival ticket-selling system in Java. The design applies several classic Gang-of-Four patterns: Factory for creating standard, family, and VIP tickets; Decorator for layering VIP perks onto a ticket; and Adapter for integrating a legacy ticket system. It includes a domain model (bands, performances, festival program), custom exceptions for invalid states, and a UML class diagram designed up front.",
      visual: "cluster",
      tech: ["Java", "OOP", "Design Patterns", "UML"],
      tags: ["Software Design"],
      github: "",
      demo: "",
      featured: false,
      metrics: [
        { label: "Language", value: "Java" },
        { label: "Patterns", value: "3 (GoF)" },
        { label: "Classes", value: "22" },
      ],
    },
    {
      id: "draw-and-ride",
      title: "Draw & Ride",
      description:
        "An Android drawing game: sketch a bridge with your finger, hit play, and a rider drives across your shape to the finish flag, with moving obstacles and wind zones raising the challenge.",
      longDescription:
        "A mobile game built in Java for the 'Mobile Intelligent Solutions Development' course. You draw a bridge by hand, then a rider attempts to drive over the sketched shape to the finish flag. Later levels add moving obstacles you must avoid and wind zones that lift or push the rider off course. Most of the work lived in the details: getting the full game flow right (menu → levels → play → win/lose → retry), making resets truly reset state, tuning collisions and physics for a consistent, non-random feel, and adding level progression. Firebase handles user accounts, progress saving, and a simple leaderboard.",
      visual: "area",
      tech: ["Android", "Java", "Firebase", "Game Physics"],
      tags: ["Mobile", "Game Dev"],
      github: "",
      demo: "",
      featured: true,
      metrics: [
        { label: "Levels", value: "30" },
        { label: "Platform", value: "Android" },
        { label: "Backend", value: "Firebase" },
      ],
    },
  ],

  experience: [
    {
      id: "syntax",
      role: "Working Student, Contractor Management",
      company: "Syntax",
      logo: "",
      location: "Košice, Slovakia",
      start: "Jan 2026",
      end: "Present",
      summary:
        "Owning the company's contractor lifecycle end to end, from onboarding through security and access to offboarding.",
      achievements: [
        "Manage the full contractor lifecycle: onboarding, security and access, and offboarding.",
        "Coordinate accounts, documentation, and access provisioning across teams.",
        "Keep contractor processes secure, organized, and reliable alongside full-time study.",
      ],
    },
    {
      id: "lidl",
      role: "Sales Assistant (Part-time)",
      company: "Lidl",
      logo: "",
      location: "Košice, Slovakia",
      start: "Apr 2025",
      end: "Dec 2025",
      summary:
        "A part-time role in a fast-paced retail environment, balanced alongside full-time studies.",
      achievements: [
        "Delivered reliable performance in a high-tempo team while studying.",
        "Built a strong work ethic, time management, and customer-service skills.",
      ],
    },
  ],

  education: [
    {
      id: "msc",
      degree: "Master's in Artificial Intelligence (Ing.)",
      school: "Technical University of Košice",
      location: "Košice, Slovakia",
      start: "2026",
      end: "2028",
      description:
        "Engineering (master's) programme starting September 2026, focused on artificial intelligence and machine learning.",
      highlights: [
        "Deepening expertise in machine learning, deep learning, and intelligent systems.",
      ],
    },
    {
      id: "bsc",
      degree: "Bachelor's in Business Informatics (Bc.)",
      school: "Technical University of Košice",
      location: "Košice, Slovakia",
      start: "2023",
      end: "2026",
      description:
        "Three-year programme bridging informatics and economics: data analysis, databases, business intelligence, and machine learning.",
      highlights: [
        "Bachelor's thesis: unsupervised ML for detecting collusion in EKS public procurement.",
        "Coursework: Machine Learning, Statistics, Databases, Data Visualization.",
      ],
    },
    {
      id: "highschool",
      degree: "Technical Lyceum",
      school: "Secondary Technical School (SOŠ technická), Humenné",
      location: "Humenné, Slovakia",
      start: "2019",
      end: "2023",
      description:
        "A STEM-focused secondary track covering mathematics, informatics, and technical sciences, where my interest in programming and data first took root.",
      highlights: ["Built the foundation in math, IT, and technical thinking."],
    },
  ],

  certifications: [
    {
      id: "google-da",
      name: "Google Data Analytics Professional Certificate",
      issuer: "Google / Coursera",
      date: "2024",
      credentialUrl: "https://coursera.org",
      icon: "BadgeCheck",
    },
    {
      id: "powerbi",
      name: "Microsoft Power BI Data Analyst (PL-300), in progress",
      issuer: "Microsoft",
      date: "2025",
      credentialUrl: "https://learn.microsoft.com",
      icon: "BarChart3",
    },
    {
      id: "ml-stanford",
      name: "Machine Learning Specialization",
      issuer: "DeepLearning.AI / Stanford",
      date: "2024",
      credentialUrl: "https://coursera.org",
      icon: "BrainCircuit",
    },
    {
      id: "sql-adv",
      name: "Advanced SQL for Data Analysis",
      issuer: "DataCamp",
      date: "2023",
      credentialUrl: "https://datacamp.com",
      icon: "Database",
    },
  ],

  techStack: [
    { name: "Python", category: "Languages", icon: "FileCode" },
    { name: "SQL", category: "Languages", icon: "Database" },
    { name: "TypeScript", category: "Languages", icon: "Braces" },
    { name: "R", category: "Languages", icon: "Sigma" },
    { name: "Pandas", category: "Data", icon: "Table" },
    { name: "NumPy", category: "Data", icon: "Calculator" },
    { name: "scikit-learn", category: "ML", icon: "Cog" },
    { name: "Jupyter", category: "Data", icon: "NotebookPen" },
    { name: "Power BI", category: "BI", icon: "BarChart3" },
    { name: "Tableau", category: "BI", icon: "AreaChart" },
    { name: "Matplotlib", category: "Viz", icon: "LineChart" },
    { name: "Seaborn", category: "Viz", icon: "BarChart3" },
    { name: "Plotly", category: "Viz", icon: "Activity" },
    { name: "PostgreSQL", category: "Databases", icon: "Database" },
    { name: "MySQL", category: "Databases", icon: "Database" },
    { name: "Azure", category: "Cloud", icon: "CloudCog" },
    { name: "Google Cloud", category: "Cloud", icon: "Cloud" },
    { name: "Docker", category: "Tools", icon: "Container" },
    { name: "Git", category: "Tools", icon: "GitBranch" },
    { name: "Excel", category: "Tools", icon: "Sheet" },
  ],

  stats: [
    { label: "Projects Completed", value: 10, suffix: "+", icon: "FolderGit2" },
    { label: "Years Coding", value: 5, suffix: "+", icon: "CalendarClock" },
    { label: "Technologies", value: 30, suffix: "+", icon: "Layers" },
    { label: "Domains Explored", value: 6, suffix: "", icon: "BrainCircuit" },
  ],

  testimonials: [
    {
      id: "t1",
      quote:
        "Adam turns messy data into clarity faster than anyone on the team. His dashboards became our single source of truth.",
      name: "Project Lead",
      title: "Analytics Studio",
    },
    {
      id: "t2",
      quote:
        "Rigorous, curious, and genuinely fun to collaborate with. The anomaly-detection work was genuinely novel.",
      name: "Thesis Supervisor",
      title: "Technical University of Košice",
    },
    {
      id: "t3",
      quote:
        "He automated a process that used to eat half our week. Reliable code and clear communication throughout.",
      name: "Small Business Owner",
      title: "Freelance Client",
    },
  ],
};
