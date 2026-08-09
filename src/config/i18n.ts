/**
 * UI string dictionary for the two supported locales. Content data (projects,
 * bio, etc.) lives in the portfolio configs; this holds the interface labels.
 */
export type Locale = "en" | "sk";

export interface NavItem {
  id: string;
  label: string;
}

export interface UIStrings {
  nav: NavItem[];
  common: {
    search: string;
    language: string;
  };
  hero: {
    greeting: string;
    lead: string;
    viewProjects: string;
    getInTouch: string;
  };
  about: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    location: string;
    email: string;
    availability: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    proficiency: Record<
      "Beginner" | "Intermediate" | "Advanced" | "Expert",
      string
    >;
  };
  projects: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    all: string;
    searchPlaceholder: string;
    featured: string;
    code: string;
    demo: string;
    details: string;
    techStack: string;
    viewCode: string;
    liveDemo: string;
    caseStudy: string;
    noResults: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    present: string;
  };
  education: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    coursework: string;
    upcoming: string;
    done: string;
  };
  stack: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    all: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    findOnline: string;
    downloadCv: string;
    replies: string;
    name: string;
    email: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    sent: string;
    error: string;
  };
  footer: {
    connect: string;
    letsWork: string;
    together: string;
    navigate: string;
    connectHeading: string;
    rights: string;
    built: string;
    press: string;
  };
  palette: {
    placeholder: string;
    navigation: string;
    projects: string;
    actions: string;
    links: string;
    goTo: string;
    project: string;
    copyEmail: string;
    open: string;
    navigateHint: string;
    selectHint: string;
    noResults: string;
  };
}

const en: UIStrings = {
  nav: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "stack", label: "Stack" },
    { id: "contact", label: "Contact" },
  ],
  common: { search: "Search", language: "Language" },
  hero: {
    greeting: "Hi, I'm ",
    lead: "I work across machine learning, business intelligence, and data visualization, making messy datasets clear, and clear data actionable.",
    viewProjects: "View Projects",
    getInTouch: "Get in touch",
  },
  about: {
    eyebrow: "About me",
    title: "A bit about",
    titleAccent: "who I am",
    subtitle: "Data-driven, design-minded, and relentlessly curious.",
    location: "Location",
    email: "Email",
    availability: "Availability",
  },
  skills: {
    eyebrow: "Capabilities",
    title: "Skills &",
    titleAccent: "expertise",
    description:
      "A focused toolkit spanning the full analytics lifecycle, from raw data to deployed insight.",
    proficiency: {
      Beginner: "Beginner",
      Intermediate: "Intermediate",
      Advanced: "Advanced",
      Expert: "Expert",
    },
  },
  projects: {
    eyebrow: "Selected work",
    title: "Featured",
    titleAccent: "projects",
    description:
      "A selection of analytics, machine-learning, and BI work, each solving a real problem end to end.",
    all: "All",
    searchPlaceholder: "Search projects…",
    featured: "Featured",
    code: "Code",
    demo: "Demo",
    details: "Details →",
    techStack: "Tech stack",
    viewCode: "View Code",
    liveDemo: "Live Demo",
    caseStudy: "Case study",
    noResults: "No projects match your filters.",
  },
  experience: {
    eyebrow: "Career",
    title: "Work",
    titleAccent: "experience",
    description: "Where I've applied data and automation to real-world problems.",
    present: "Present",
  },
  education: {
    eyebrow: "Academics",
    title: "Education &",
    titleAccent: "learning",
    description:
      "My academic foundation in data, mathematics, and computer science.",
    coursework: "Key coursework",
    upcoming: "Starting Sept 2026",
    done: "Completed",
  },
  stack: {
    eyebrow: "Toolbox",
    title: "Tech",
    titleAccent: "stack",
    description: "The languages, frameworks, and platforms I reach for.",
    all: "All",
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Let's build",
    titleAccent: "something",
    description:
      "Open to internships, junior roles, and interesting data problems. Drop me a line.",
    findOnline: "Find me online",
    downloadCv: "Download CV",
    replies: "Usually replies within 24 hours.",
    name: "Name",
    email: "Email",
    message: "Message",
    namePlaceholder: "Jane Doe",
    emailPlaceholder: "jane@company.com",
    messagePlaceholder: "Tell me about the role or project…",
    send: "Send Message",
    sending: "Sending",
    sent: "Message sent",
    error: "Something went wrong, try again",
  },
  footer: {
    connect: "Let's connect",
    letsWork: "Let's work",
    together: "together",
    navigate: "Navigate",
    connectHeading: "Connect",
    rights: "All rights reserved.",
    built: "Built with Next.js, Tailwind & Framer Motion · Press",
    press: "Press",
  },
  palette: {
    placeholder: "Search sections, projects, actions…",
    navigation: "Navigation",
    projects: "Projects",
    actions: "Actions",
    links: "Links",
    goTo: "Go to",
    project: "Project",
    copyEmail: "Copy email address",
    open: "Open",
    navigateHint: "navigate",
    selectHint: "select",
    noResults: "No results for",
  },
};

const sk: UIStrings = {
  nav: [
    { id: "about", label: "O mne" },
    { id: "skills", label: "Zručnosti" },
    { id: "projects", label: "Projekty" },
    { id: "experience", label: "Skúsenosti" },
    { id: "education", label: "Vzdelanie" },
    { id: "stack", label: "Technológie" },
    { id: "contact", label: "Kontakt" },
  ],
  common: { search: "Hľadať", language: "Jazyk" },
  hero: {
    greeting: "Ahoj, som ",
    lead: "Venujem sa strojovému učeniu, business intelligence a vizualizácii dát – neprehľadné dáta mením na jasné a jasné dáta na použiteľné.",
    viewProjects: "Pozrieť projekty",
    getInTouch: "Kontaktuj ma",
  },
  about: {
    eyebrow: "O mne",
    title: "Niečo o tom,",
    titleAccent: "kto som",
    subtitle: "Zameraný na dáta, s citom pre dizajn a neúnavne zvedavý.",
    location: "Lokalita",
    email: "Email",
    availability: "Dostupnosť",
  },
  skills: {
    eyebrow: "Schopnosti",
    title: "Zručnosti a",
    titleAccent: "expertíza",
    description:
      "Zameraná sada nástrojov pokrývajúca celý dátový životný cyklus – od surových dát po nasadené výstupy.",
    proficiency: {
      Beginner: "Základy",
      Intermediate: "Stredne pokročilý",
      Advanced: "Pokročilý",
      Expert: "Expert",
    },
  },
  projects: {
    eyebrow: "Vybrané práce",
    title: "Vybrané",
    titleAccent: "projekty",
    description:
      "Výber z analytických, ML a BI projektov – každý rieši reálny problém od začiatku do konca.",
    all: "Všetky",
    searchPlaceholder: "Hľadať projekty…",
    featured: "Odporúčané",
    code: "Kód",
    demo: "Demo",
    details: "Detaily →",
    techStack: "Technológie",
    viewCode: "Zobraziť kód",
    liveDemo: "Živé demo",
    caseStudy: "Prípadová štúdia",
    noResults: "Žiadne projekty nezodpovedajú filtrom.",
  },
  experience: {
    eyebrow: "Kariéra",
    title: "Pracovné",
    titleAccent: "skúsenosti",
    description: "Kde som aplikoval dáta a automatizáciu na reálne problémy.",
    present: "súčasnosť",
  },
  education: {
    eyebrow: "Akademická pôda",
    title: "Vzdelanie a",
    titleAccent: "štúdium",
    description:
      "Môj akademický základ v dátach, matematike a informatike.",
    coursework: "Kľúčové predmety",
    upcoming: "Od septembra 2026",
    done: "Ukončené",
  },
  stack: {
    eyebrow: "Nástroje",
    title: "Technologický",
    titleAccent: "stack",
    description: "Jazyky, frameworky a platformy, po ktorých siaham.",
    all: "Všetky",
  },
  contact: {
    eyebrow: "Ozvi sa",
    title: "Poďme spolu",
    titleAccent: "niečo vytvoriť",
    description:
      "Otvorený stážam, junior pozíciám a zaujímavým dátovým problémom. Napíš mi.",
    findOnline: "Nájdeš ma online",
    downloadCv: "Stiahnuť CV",
    replies: "Zvyčajne odpoviem do 24 hodín.",
    name: "Meno",
    email: "Email",
    message: "Správa",
    namePlaceholder: "Ján Novák",
    emailPlaceholder: "jan@firma.sk",
    messagePlaceholder: "Napíš mi o pozícii alebo projekte…",
    send: "Odoslať správu",
    sending: "Odosielam",
    sent: "Správa odoslaná",
    error: "Niečo sa pokazilo, skús znova",
  },
  footer: {
    connect: "Spojme sa",
    letsWork: "Poďme",
    together: "spolupracovať",
    navigate: "Navigácia",
    connectHeading: "Spojenie",
    rights: "Všetky práva vyhradené.",
    built: "Postavené na Next.js, Tailwind a Framer Motion · Stlač",
    press: "Stlač",
  },
  palette: {
    placeholder: "Hľadaj sekcie, projekty, akcie…",
    navigation: "Navigácia",
    projects: "Projekty",
    actions: "Akcie",
    links: "Odkazy",
    goTo: "Prejsť na",
    project: "Projekt",
    copyEmail: "Kopírovať e-mail",
    open: "Otvoriť",
    navigateHint: "pohyb",
    selectHint: "výber",
    noResults: "Žiadne výsledky pre",
  },
};

export const uiStrings: Record<Locale, UIStrings> = { en, sk };
