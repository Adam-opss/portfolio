import { portfolio } from "./portfolio";

/** Site-wide metadata used for SEO, Open Graph, and structured data. */
export const site = {
  name: portfolio.person.name,
  title: `${portfolio.person.name} · ${portfolio.person.title}`,
  description: portfolio.person.tagline,
  // Update to your deployed domain (used for canonical + OG URLs).
  url: "https://adampalo.dev",
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
