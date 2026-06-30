import { portfolio } from "./portfolio";

/** Site-wide metadata used for SEO, Open Graph, and structured data. */
export const site = {
  name: portfolio.person.name,
  title: `${portfolio.person.name} · ${portfolio.person.title}`,
  description: portfolio.person.tagline,
  // Deployed domain (used for canonical, sitemap, robots, structured data).
  // Update this if you later attach a custom domain.
  url: "https://portfolio-weld-eight-26.vercel.app",
  ogImage: "/og.png",
  locale: "en_US",
  keywords: [
    "Data Analytics",
    "Machine Learning",
    "Business Intelligence",
    "Data Visualization",
    "Python",
    "SQL",
    "Power BI",
    "Tableau",
    portfolio.person.name,
  ],
  // Section anchors used by the navbar + command palette.
  nav: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "stack", label: "Stack" },
    { id: "contact", label: "Contact" },
  ],
} as const;
