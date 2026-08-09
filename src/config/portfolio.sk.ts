/**
 * Slovak content overlay. Reuses the English config's structure (icons, levels,
 * dates, tech, links, metric values) and overrides only the human-readable text,
 * so the two languages never drift structurally.
 */
import { portfolio, type PortfolioConfig } from "./portfolio";

const pick = (map: Record<string, string>, key: string) => map[key] ?? key;

const skillCategory: Record<string, string> = {
  programming: "Programovanie",
  "data-analytics": "Dátová analytika",
  "machine-learning": "Strojové učenie",
  bi: "Business Intelligence",
  cloud: "Cloud a DevOps",
  web: "Webový vývoj",
  databases: "Databázy",
  visualization: "Vizualizácia",
  tools: "Nástroje",
};

const techCategory: Record<string, string> = {
  Languages: "Jazyky",
  Data: "Dáta",
  ML: "ML",
  BI: "BI",
  Viz: "Vizualizácia",
  Databases: "Databázy",
  Cloud: "Cloud",
  Tools: "Nástroje",
};

const tagMap: Record<string, string> = {
  "Machine Learning": "Strojové učenie",
  "Data Analytics": "Dátová analytika",
  "Business Intelligence": "Business Intelligence",
  "Data Visualization": "Vizualizácia dát",
  "Full-Stack": "Full-Stack",
  "Web App": "Webová aplikácia",
  Cloud: "Cloud",
  DevOps: "DevOps",
  Mobile: "Mobil",
  "Game Dev": "Vývoj hier",
  "Software Design": "Softvérový dizajn",
};

const metricMap: Record<string, string> = {
  "Records analyzed": "Analyzované záznamy",
  "Bidder pairs evaluated": "Hodnotené dvojice",
  "Priority pairs flagged": "Prioritné dvojice",
  Tools: "Nástroje",
  Modules: "Moduly",
  Database: "Databáza",
  Deploy: "Nasadenie",
  Containers: "Kontajnery",
  Infra: "Infra",
  Language: "Jazyk",
  Patterns: "Vzory",
  Classes: "Triedy",
  Levels: "Levely",
  Platform: "Platforma",
  Backend: "Backend",
};

const statMap: Record<string, string> = {
  "Projects Completed": "Dokončené projekty",
  "Years Coding": "Rokov programovania",
  Technologies: "Technológie",
  "Domains Explored": "Preskúmané oblasti",
};

interface ProjectText {
  title?: string;
  description: string;
  longDescription: string;
}

const projectSk: Record<string, ProjectText> = {
  "collusion-detection": {
    title: "Detekcia kolúzie vo verejnom obstarávaní",
    description:
      "Nekontrolovaná ML pipeline, ktorá odhaľuje kolúzne vzorce v dátach verejných tendrov (EKS) pomocou DBSCAN a Isolation Forest.",
    longDescription:
      "Bakalárska práca. Z tisícov verejných tendrov som vytvoril príznaky, vypočítal profily dvojíc uchádzačov a anomálie vo výhrach, a následne skombinoval hustotné klastrovanie (DBSCAN) s Isolation Forest na označenie podozrivých kartelov. Pipeline zoraďuje dvojice uchádzačov podľa skóre anomálie a vizualizuje bodové, kontextové a kolektívne anomálie.",
  },
  "logistics-dashboard": {
    title: "Analytický dashboard logistiky",
    description:
      "Kompletná analytika nad reálnymi logistickými dátami: plné ETL, interaktívny Tableau dashboard a Streamlit webová aplikácia. 1. miesto na hackathone predmetu.",
    longDescription:
      "Projekt pre predmet Dátová vizualizácia s reálnymi, neupravenými dátami z praxe. Prešli sme celou fázou ETL – opravou, obohatením a čistením dát – a potom postavili dva paralelné výstupy: interaktívny Tableau dashboard a funkčnú Streamlit aplikáciu, s porovnaním oboch nástrojov. Dashboard sleduje maržu, náklady, výnosy, objemy objednávok, výkon pobočiek a agentov a geografické rozloženie po Európe. Náš tím získal 1. miesto na hackathone a výsledky sme odprezentovali majiteľom firmy. Tím: Adam Paľo, Andrea Kravcová a Mariana Tomiová.",
  },
  moneyflow: {
    description:
      "Full-stack aplikácia na správu osobných financií: import transakcií, kategorizácia výdavkov, rozpočty a analytika cashflow, dashboardy a trendy. Postavené v Next.js, nasadené na Verceli.",
    longDescription:
      "Full-stack aplikácia na správu vlastných financií od začiatku do konca. Obsahuje dashboard (mesačný prehľad, top kategórie, plnenie rozpočtu, trendové grafy), stránku transakcií s filtrami (mesiac/kategória/typ), vyhľadávaním v poznámkach a CSV importom/exportom, prehľady kategórií s top obchodníkmi a pravidlami, mesačné rozpočty s upozornením na prekročenie, analytickú stránku so synchronizovaným cashflow, detekciou podozrivých transakcií a rozpisom podľa spôsobu platby, a šablóny opakovaných transakcií. Postavené v Next.js (App Router) a TypeScripte, Prisma s PostgreSQL, shadcn UI a Recharts, nasadené na Verceli.",
  },
  "track-my-goals": {
    description:
      "Kontajnerizovaná webová aplikácia na sledovanie cieľov pre predmet cloudových systémov: Node/Express API s PostgreSQL, kompletne orchestrovaná cez Docker Compose.",
    longDescription:
      "Aplikácia na sledovanie cieľov, ktorú som postavil, aby som sa naučil základy cloudu a kontajnerizácie. Express REST API s PostgreSQL je plne kontajnerizované a orchestrované cez Docker Compose: samostatné web a databázové služby v sieti, pomenovaný volume pre perzistentné dáta, health check databázy, na ktorý web čaká pred štartom, a automatické reštarty pre odolnosť. Celý stack sa spustí lokálne jedným príkazom.",
  },
  "festival-ticketing": {
    title: "Systém predaja lístkov na festival",
    description:
      "Java systém predaja lístkov na festival postavený na čistom OOP a klasických návrhových vzoroch (Factory, Decorator, Adapter), s vlastnými výnimkami a UML modelom.",
    longDescription:
      "Zadanie z objektovo orientovaného programovania modelujúce systém predaja lístkov na hudobný festival v Jave. Návrh využíva viacero klasických Gang-of-Four vzorov: Factory na tvorbu štandardných, rodinných a VIP lístkov; Decorator na pridávanie VIP výhod k lístku; a Adapter na integráciu staršieho systému lístkov. Obsahuje doménový model (kapely, vystúpenia, program festivalu), vlastné výnimky pre neplatné stavy a vopred navrhnutý UML diagram tried.",
  },
  "draw-and-ride": {
    description:
      "Android kresliaca hra: prstom nakreslíš most, spustíš hru a jazdec sa snaží prejsť po tvojom tvare do cieľa – s pohyblivými prekážkami a vetrom, ktoré zvyšujú náročnosť.",
    longDescription:
      "Mobilná hra v Jave pre predmet Vývoj mobilných inteligentných riešení. Rukou nakreslíš most a jazdec sa snaží prejsť po nakreslenom tvare do cieľa. Neskoršie levely pridávajú pohyblivé prekážky, ktorým sa treba vyhnúť, a veterné zóny, ktoré jazdca dvíhajú alebo zhadzujú z trasy. Najviac práce bolo v detailoch: doladiť celý priebeh hry (menu → levely → hra → výhra/prehra → opakovanie), zabezpečiť, aby reset naozaj všetko vynuloval, vyladiť kolízie a fyziku na konzistentný pocit, a pridať progresiu levelov. Firebase rieši účty používateľov, ukladanie postupu a jednoduchý rebríček.",
  },
};

interface ExpText {
  role: string;
  summary: string;
  achievements: string[];
}

const expSk: Record<string, ExpText> = {
  syntax: {
    role: "Working Student, správa kontraktorov",
    summary:
      "Kompletná starostlivosť o životný cyklus kontraktorov firmy – od onboardingu cez bezpečnosť a prístupy až po offboarding.",
    achievements: [
      "Spravujem celý životný cyklus kontraktorov: onboarding, bezpečnosť a prístupy, offboarding.",
      "Koordinujem účty, dokumentáciu a prideľovanie prístupov naprieč tímami.",
      "Udržiavam procesy kontraktorov bezpečné, prehľadné a spoľahlivé popri dennom štúdiu.",
    ],
  },
  lidl: {
    role: "Predavač (brigáda)",
    summary:
      "Brigáda v rýchlom maloobchodnom prostredí popri dennom štúdiu.",
    achievements: [
      "Spoľahlivý výkon v rýchlom tíme popri štúdiu.",
      "Vybudoval som si pracovitosť, time management a zákaznícke zručnosti.",
    ],
  },
};

interface EduText {
  degree: string;
  school: string;
  description: string;
  highlights?: string[];
  courses?: string[];
}

const eduSk: Record<string, EduText> = {
  msc: {
    degree: "Magisterské štúdium Umelej inteligencie (Ing.)",
    school: "Technická univerzita v Košiciach",
    description:
      "Inžinierske (magisterské) štúdium so začiatkom v septembri 2026, zamerané na umelú inteligenciu a strojové učenie.",
    highlights: [
      "Prehlbovanie znalostí v strojovom učení, hlbokom učení a inteligentných systémoch.",
    ],
    courses: [
      "Objavovanie znalostí",
      "Škálovateľné strojové učenie",
      "Spracovanie prirodzeného jazyka",
      "Počítačové videnie",
      "Priestorovo-časové dáta",
      "Vysvetliteľnosť AI",
    ],
  },
  bsc: {
    degree: "Bakalárske štúdium Hospodárskej informatiky (Bc.)",
    school: "Technická univerzita v Košiciach",
    description:
      "Trojročné štúdium spájajúce informatiku a ekonómiu: analýza dát, databázy, business intelligence a strojové učenie.",
    highlights: [
      "Bakalárska práca: nekontrolované ML na detekciu kolúzie vo verejnom obstarávaní (EKS).",
      "Prvé miesto na hackathone z predmetu Dátová vizualizácia.",
    ],
    courses: [
      "Jazyky pre dátovú analytiku",
      "Podniková analytika",
      "Vizualizácia dát",
      "Štatistika a pravdepodobnosť",
      "Databázové systémy",
      "Znalostné systémy",
    ],
  },
  highschool: {
    degree: "Technické lýceum",
    school: "Stredná odborná škola technická, Humenné",
    description:
      "Stredoškolské štúdium so zameraním na STEM – matematika, informatika a technické predmety, kde sa zrodil môj záujem o programovanie a dáta.",
    highlights: ["Základ v matematike, IT a technickom myslení."],
    courses: ["Matematika", "Informatika", "Programovanie", "Technické vedy"],
  },
};

export const portfolioSk: PortfolioConfig = {
  ...portfolio,
  person: {
    ...portfolio.person,
    title: "AI a dátová analytika",
    roles: [
      "Študent AI a strojového učenia",
      "Nadšenec dátovej analytiky",
      "Vývojár business intelligence",
      "Dizajnér vizualizácie dát",
      "Tvorca automatizácie procesov",
    ],
    tagline: "Mením dáta na inteligenciu a inteligenciu na rozhodnutia.",
    bio: [
      "Som študent na Technickej univerzite v Košiciach. Práve som dokončil bakalára z Hospodárskej informatiky a pokračujem na inžinierskom štúdiu Umelej inteligencie – od premeny dát na obchodné rozhodnutia sa posúvam k tvorbe systémov, ktoré tie rozhodnutia robia. Som veľký fanúšik AI: využívam ju v práci takmer každý deň a som presvedčený, že práve za ňou je budúcnosť.",
      "Moja práca stojí na priesečníku štatistiky, strojového učenia a čistého rozprávania dátami: modely, ktoré nájdu signál v šume, a dashboardy, ktoré sa nedajú prehliadnuť. Naposledy to bola nekontrolovaná detekcia anomálií pri kolúzii vo verejnom obstarávaní – téma mojej bakalárskej práce.",
      "Vo voľnom čase ma nájdeš na futbalovom ihrisku, pri behu alebo tréningu, s knihou, alebo ponoreného vo vlastnom projekte.",
    ],
    location: "Košice, Slovensko",
    availability: "Working student · otvorený AI/dátovým pozíciám",
  },

  skills: portfolio.skills.map((cat) => ({
    ...cat,
    label: pick(skillCategory, cat.id),
  })),

  techStack: portfolio.techStack.map((item) => ({
    ...item,
    category: pick(techCategory, item.category),
  })),

  projects: portfolio.projects.map((p) => {
    const o = projectSk[p.id];
    return {
      ...p,
      title: o?.title ?? p.title,
      description: o?.description ?? p.description,
      longDescription: o?.longDescription ?? p.longDescription,
      tags: p.tags.map((tg) => pick(tagMap, tg)),
      metrics: p.metrics?.map((m) => ({ ...m, label: pick(metricMap, m.label) })),
    };
  }),

  experience: portfolio.experience.map((e) => {
    const o = expSk[e.id];
    return {
      ...e,
      role: o?.role ?? e.role,
      summary: o?.summary ?? e.summary,
      achievements: o?.achievements ?? e.achievements,
      location: "Košice, Slovensko",
    };
  }),

  education: portfolio.education.map((ed) => {
    const o = eduSk[ed.id];
    return {
      ...ed,
      degree: o?.degree ?? ed.degree,
      school: o?.school ?? ed.school,
      description: o?.description ?? ed.description,
      highlights: o?.highlights ?? ed.highlights,
      courses: o?.courses ?? ed.courses,
      location: ed.location.replace("Slovakia", "Slovensko"),
    };
  }),

  stats: portfolio.stats.map((s) => ({ ...s, label: pick(statMap, s.label) })),
};
