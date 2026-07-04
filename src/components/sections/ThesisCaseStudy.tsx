"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Database,
  Users,
  Percent,
  Network,
  TreePine,
  Crosshair,
  FileSearch,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText } from "@/components/ui/GradientText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────────────────── */
/*  Bilingual copy (real numbers from the thesis pipeline)                    */
/* ────────────────────────────────────────────────────────────────────────── */

const copy = {
  en: {
    back: "Back to portfolio",
    eyebrow: "Case study · Bachelor's thesis",
    title: "Detecting collusion in",
    titleAccent: "public procurement",
    subtitle:
      "An unsupervised machine-learning pipeline over Slovak public-procurement data (EKS) that surfaces pairs of companies whose bidding behaviour deviates from healthy competition: cover bidding, price coordination, and bid rotation.",
    meta: ["Technical University of Košice", "2025/2026", "Python · scikit-learn"],
    statsTitle: "The funnel at a glance",
    stats: [
      { value: 160387, label: "procurement records" },
      { value: 12840, label: "bidder pairs evaluated" },
      { value: 763, label: "suspicious pairs screened" },
      { value: 194, label: "priority pairs flagged" },
    ],
    problemEyebrow: "01 · Problem",
    problemTitle: "Why this matters",
    problemBody: [
      "Public procurement is where public money meets private suppliers, and it only works when companies genuinely compete. Colluding bidders quietly split the market instead: one firm submits a deliberately losing 'cover' bid, prices are coordinated, or wins rotate between partners in a fixed rhythm.",
      "These patterns are nearly invisible when you look at tenders one by one. They only emerge when you analyse the long-term behaviour of pairs of companies across thousands of tenders, which is exactly what this thesis does with unsupervised machine learning, since no labelled examples of confirmed collusion exist.",
    ],
    dataEyebrow: "02 · Data",
    dataTitle: "From raw records to comparable pairs",
    dataBody:
      "The source is a real EKS (Slovak electronic contracting system) dataset of 160,387 procurement records. After filtering to tenders with 2 to 10 bidders (where collusion is feasible and measurable), every pair of companies that met in at least 10 common tenders becomes an observation: 12,840 pairs in total. A first statistical screen, win rate of at least 70% or volume capture of at least 80%, narrows this to 763 suspicious pairs that proceed to modelling.",
    pipelineEyebrow: "03 · Pipeline",
    pipelineTitle: "Seven steps, one reproducible flow",
    pipeline: [
      {
        num: "01",
        title: "Data preparation",
        desc: "Load 160,387 records, filter to 2-10 bidders per tender, normalise company IDs, build lookup tables.",
      },
      {
        num: "02",
        title: "Pair generation",
        desc: "Generate all bidder pairs per tender; keep pairs with 10+ shared tenders → 12,840 pairs.",
      },
      {
        num: "03",
        title: "Win-rate screening",
        desc: "Compute top win rate and capture rate per pair; thresholds (70% / 80%) → 763 suspicious pairs.",
      },
      {
        num: "04",
        title: "Feature engineering",
        desc: "Four behavioural signals per pair: volume capture, saving variability, competition level, win alternation.",
      },
      {
        num: "05",
        title: "DBSCAN clustering",
        desc: "StandardScaler + k-distance tuning (ε = 0.6, min_samples = 5) → 7 clusters + 21.8% noise (166 pairs).",
      },
      {
        num: "06",
        title: "Isolation Forest",
        desc: "Anomaly scores (contamination = 0.15) → 115 anomalous pairs; combined with DBSCAN into a priority list of 194.",
      },
      {
        num: "07",
        title: "Pair profiles",
        desc: "Deep-dive visual profiles of four selected pairs for investigator-style review.",
      },
    ],
    featuresEyebrow: "04 · Features",
    featuresTitle: "Four signals of unhealthy competition",
    features: [
      {
        icon: Percent,
        name: "volume_capture",
        desc: "Share of the tender volume the pair wins when they meet. Close to 100% means the pair dominates 'their' market.",
      },
      {
        icon: Database,
        name: "saving_cv",
        desc: "Variability of savings versus the estimated price. Suspiciously stable savings suggest price coordination.",
      },
      {
        icon: Users,
        name: "median_applicants",
        desc: "Typical number of bidders around the pair. Persistently low competition is fertile ground for collusion.",
      },
      {
        icon: Crosshair,
        name: "win_alternation",
        desc: "How regularly wins alternate between the two firms. A steady rhythm points to bid rotation.",
      },
    ],
    anomalyEyebrow: "05 · Findings",
    anomalyTitle: "What the data shows",
    anomalyBody:
      "Three charts straight from the pipeline output, each carrying one finding:",
    anomalies: [
      {
        img: "/thesis/winrate-distribution.png",
        title: "The 70% threshold isolates a rare tail",
        desc: "Winner win rates peak between 25% and 40% for every group size, and only about 3% of pairs clear the 70% screening threshold. The screen flags a small extreme tail, not ordinary market leaders.",
      },
      {
        img: "/thesis/dbscan-clusters.png",
        title: "One normal pattern, suspicion on the edges",
        desc: "DBSCAN over the PCA projection finds a single dominant cluster of 561 'ordinary' pairs, six micro-clusters of 3 to 9 pairs, and 166 noise pairs. Collusion candidates do not form a tidy group of their own; they fall outside every common pattern.",
      },
      {
        img: "/thesis/if-vs-dbscan.png",
        title: "Two independent methods, one story",
        desc: "The same landscape scored by Isolation Forest (left) and clustered by DBSCAN (right): the high-anomaly red points trace the same rim that DBSCAN labels as noise. When two unrelated methods point at the same pairs, that agreement is what the priority list is built on.",
      },
    ],
    resultsEyebrow: "06 · Models & results",
    resultsTitle: "Two independent detectors, one priority list",
    dbscan: {
      icon: Network,
      title: "DBSCAN",
      body: "Density-based clustering finds the 'shapes' of normal behaviour without a predefined number of clusters. Result: 7 behavioural clusters, with 21.8% of pairs (166) left as noise, i.e. not matching any common pattern.",
    },
    iforest: {
      icon: TreePine,
      title: "Isolation Forest",
      body: "An ensemble of random trees isolates unusual observations quickly; the fewer splits needed, the more anomalous the pair. With contamination at 0.15 it flags 115 pairs with the highest anomaly scores.",
    },
    intersection:
      "Pairs flagged by both methods carry the strongest signal. Combining the two views produces a ranked priority list of 194 pairs, with four of them profiled in depth as investigator-ready case files.",
    learningsEyebrow: "07 · Takeaways",
    learningsTitle: "What I learned",
    learnings: [
      "Unsupervised problems live or die by feature design: the four behavioural signals matter more than the choice of algorithm.",
      "Two independent detectors beat one: the DBSCAN × Isolation Forest intersection cuts false positives dramatically.",
      "Results are only useful if a non-data-scientist can read them, so the pipeline ends with visual pair profiles, not just scores.",
    ],
    ctaTitle: "Want the details?",
    ctaBody:
      "The full methodology, parameter tuning, and case profiles are in the thesis. Happy to walk through any part of it.",
    ctaCode: "View my GitHub",
    ctaContact: "Get in touch",
  },
  sk: {
    back: "Späť na portfólio",
    eyebrow: "Prípadová štúdia · Bakalárska práca",
    title: "Detekcia kolúzie vo",
    titleAccent: "verejnom obstarávaní",
    subtitle:
      "Pipeline strojového učenia bez učiteľa nad slovenskými dátami verejného obstarávania (EKS), ktorá odhaľuje dvojice firiem so správaním odchyľujúcim sa od zdravej súťaže: krycie ponuky, cenová koordinácia a rotácia víťazov.",
    meta: ["Technická univerzita v Košiciach", "2025/2026", "Python · scikit-learn"],
    statsTitle: "Lievik v skratke",
    stats: [
      { value: 160387, label: "záznamov obstarávaní" },
      { value: 12840, label: "hodnotených dvojíc" },
      { value: 763, label: "podozrivých po skríningu" },
      { value: 194, label: "prioritných dvojíc" },
    ],
    problemEyebrow: "01 · Problém",
    problemTitle: "Prečo na tom záleží",
    problemBody: [
      "Verejné obstarávanie je miesto, kde sa verejné peniaze stretávajú so súkromnými dodávateľmi, a funguje len vtedy, keď firmy skutočne súťažia. Kolúzne dvojice si trh potichu delia: jedna firma podá zámerne prehrávajúcu 'kryciu' ponuku, ceny sú koordinované, alebo sa výhry striedajú v pravidelnom rytme.",
      "Tieto vzorce sú pri pohľade na jednotlivé tendre takmer neviditeľné. Ukážu sa až pri analýze dlhodobého správania dvojíc firiem naprieč tisíckami tendrov, presne to robí táto práca pomocou učenia bez učiteľa, keďže označené príklady potvrdenej kolúzie neexistujú.",
    ],
    dataEyebrow: "02 · Dáta",
    dataTitle: "Od surových záznamov k porovnateľným dvojiciam",
    dataBody:
      "Zdrojom je reálny dataset EKS (elektronický kontraktačný systém) so 160 387 záznamami obstarávaní. Po filtrovaní na tendre s 2 až 10 uchádzačmi (kde je kolúzia uskutočniteľná a merateľná) sa každá dvojica firiem, ktorá sa stretla aspoň v 10 spoločných tendroch, stáva pozorovaním: spolu 12 840 dvojíc. Prvý štatistický skríning, miera výhier aspoň 70 % alebo podiel na objeme aspoň 80 %, ich zúži na 763 podozrivých dvojíc, ktoré idú do modelovania.",
    pipelineEyebrow: "03 · Pipeline",
    pipelineTitle: "Sedem krokov, jeden reprodukovateľný tok",
    pipeline: [
      {
        num: "01",
        title: "Príprava dát",
        desc: "Načítanie 160 387 záznamov, filter na 2-10 uchádzačov, normalizácia IČO, lookup tabuľky.",
      },
      {
        num: "02",
        title: "Generovanie dvojíc",
        desc: "Všetky dvojice uchádzačov v tendri; ponechané dvojice s 10+ spoločnými tendrami → 12 840 dvojíc.",
      },
      {
        num: "03",
        title: "Skríning miery výhier",
        desc: "Výpočet top win rate a capture rate; prahy (70 % / 80 %) → 763 podozrivých dvojíc.",
      },
      {
        num: "04",
        title: "Tvorba príznakov",
        desc: "Štyri behaviorálne signály na dvojicu: podiel na objeme, variabilita úspor, úroveň konkurencie, striedanie výhier.",
      },
      {
        num: "05",
        title: "Zhlukovanie DBSCAN",
        desc: "StandardScaler + ladenie cez k-distance (ε = 0,6, min_samples = 5) → 7 zhlukov + 21,8 % šum (166 dvojíc).",
      },
      {
        num: "06",
        title: "Isolation Forest",
        desc: "Skóre anomálnosti (contamination = 0,15) → 115 anomálnych dvojíc; spolu s DBSCAN prioritný zoznam 194.",
      },
      {
        num: "07",
        title: "Profily dvojíc",
        desc: "Detailné vizuálne profily štyroch vybraných dvojíc pripravené na vyšetrovateľské posúdenie.",
      },
    ],
    featuresEyebrow: "04 · Príznaky",
    featuresTitle: "Štyri signály nezdravej súťaže",
    features: [
      {
        icon: Percent,
        name: "volume_capture",
        desc: "Podiel objemu tendrov, ktorý dvojica vyhráva, keď sa stretne. Blízko 100 % znamená, že dvojica ovláda 'svoj' trh.",
      },
      {
        icon: Database,
        name: "saving_cv",
        desc: "Variabilita úspor voči predpokladanej cene. Podozrivo stabilné úspory naznačujú cenovú koordináciu.",
      },
      {
        icon: Users,
        name: "median_applicants",
        desc: "Typický počet uchádzačov okolo dvojice. Trvalo nízka konkurencia je živnou pôdou pre kolúziu.",
      },
      {
        icon: Crosshair,
        name: "win_alternation",
        desc: "Ako pravidelne sa výhry striedajú medzi dvoma firmami. Stály rytmus ukazuje na rotáciu ponúk.",
      },
    ],
    anomalyEyebrow: "05 · Zistenia",
    anomalyTitle: "Čo dáta ukázali",
    anomalyBody:
      "Tri grafy priamo z výstupov pipeline, každý nesie jedno zistenie:",
    anomalies: [
      {
        img: "/thesis/winrate-distribution.png",
        title: "Prah 70 % izoluje vzácny chvost",
        desc: "Miera výhier víťaza vrcholí medzi 25 % a 40 % pri každej veľkosti skupiny a prah 70 % prekročia len asi 3 % dvojíc. Skríning teda označuje malý extrémny chvost, nie bežných lídrov trhu.",
      },
      {
        img: "/thesis/dbscan-clusters.png",
        title: "Jeden normál, podozrenie na okrajoch",
        desc: "DBSCAN nad PCA projekciou nachádza jeden dominantný zhluk 561 'bežných' dvojíc, šesť mikro-zhlukov s 3 až 9 dvojicami a 166 dvojíc ako šum. Kandidáti na kolúziu netvoria vlastnú úhľadnú skupinu; vypadávajú zo všetkých bežných vzorcov.",
      },
      {
        img: "/thesis/if-vs-dbscan.png",
        title: "Dve nezávislé metódy, jeden príbeh",
        desc: "Rovnaká krajina skórovaná Isolation Forestom (vľavo) a zhlukovaná DBSCAN-om (vpravo): červené body s vysokou anomáliou kopírujú ten istý okraj, ktorý DBSCAN označuje ako šum. Práve zhoda dvoch nesúvisiacich metód je základ prioritného zoznamu.",
      },
    ],
    resultsEyebrow: "06 · Modely a výsledky",
    resultsTitle: "Dva nezávislé detektory, jeden prioritný zoznam",
    dbscan: {
      icon: Network,
      title: "DBSCAN",
      body: "Hustotné zhlukovanie nachádza 'tvary' normálneho správania bez vopred zadaného počtu zhlukov. Výsledok: 7 behaviorálnych zhlukov a 21,8 % dvojíc (166) ako šum, teda mimo bežných vzorcov.",
    },
    iforest: {
      icon: TreePine,
      title: "Isolation Forest",
      body: "Súbor náhodných stromov rýchlo izoluje nezvyčajné pozorovania; čím menej deliacich krokov, tým anomálnejšia dvojica. Pri contamination 0,15 označí 115 dvojíc s najvyšším skóre.",
    },
    intersection:
      "Najsilnejší signál nesú dvojice označené oboma metódami. Kombinácia oboch pohľadov dáva zoradený prioritný zoznam 194 dvojíc, zo štyroch z nich vznikli podrobné prípadové profily.",
    learningsEyebrow: "07 · Ponaučenia",
    learningsTitle: "Čo som sa naučil",
    learnings: [
      "Úlohy bez učiteľa stoja a padajú na návrhu príznakov: štyri behaviorálne signály sú dôležitejšie než voľba algoritmu.",
      "Dva nezávislé detektory sú lepšie než jeden: prienik DBSCAN × Isolation Forest výrazne znižuje falošné poplachy.",
      "Výsledky sú užitočné, len ak ich prečíta aj človek mimo data science, preto pipeline končí vizuálnymi profilmi dvojíc, nie iba skóre.",
    ],
    ctaTitle: "Chceš detaily?",
    ctaBody:
      "Kompletná metodika, ladenie parametrov aj prípadové profily sú v texte práce. Rád ktorúkoľvek časť vysvetlím.",
    ctaCode: "Pozrieť môj GitHub",
    ctaContact: "Ozvi sa mi",
  },
} as const;

/* ────────────────────────────────────────────────────────────────────────── */

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  const [num, label] = eyebrow.split("·").map((s) => s.trim());
  return (
    <div className="mb-8">
      <Reveal>
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-sm font-medium text-accent-blue">
            {num}
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            {label}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

export function ThesisCaseStudy() {
  const { lang, content } = useLanguage();
  const t = copy[lang];
  const email = content.person.email;
  const github =
    content.social.find((s) => s.label === "GitHub")?.href ??
    "https://github.com/Adam-opss";

  return (
    <article className="relative mx-auto w-full max-w-4xl px-6 pb-24 pt-32">
      {/* Back */}
      <Reveal direction="none">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm text-muted backdrop-blur transition hover:border-accent-blue/50 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {t.back}
        </Link>
      </Reveal>

      {/* Header */}
      <header className="mt-10">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted">
            {t.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {t.title} <GradientText>{t.titleAccent}</GradientText>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-justify text-base leading-relaxed text-muted sm:text-lg">
            {t.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-6 flex flex-wrap gap-2">
            {t.meta.map((m) => (
              <span
                key={m}
                className="rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted"
              >
                {m}
              </span>
            ))}
          </div>
        </Reveal>
      </header>

      {/* Funnel stats */}
      <Reveal delay={0.2}>
        <div className="mt-14 overflow-hidden rounded-3xl border border-border bg-surface/50 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
            {t.stats.map((s, i) => (
              <div key={s.label} className="bg-surface/80 p-6 text-center">
                <p className="font-display text-3xl font-bold tabular-nums text-foreground">
                  <AnimatedCounter value={s.value} duration={1400 + i * 200} />
                </p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Problem */}
      <section className="mt-20">
        <SectionHeading eyebrow={t.problemEyebrow} title={t.problemTitle} />
        <div className="space-y-5">
          {t.problemBody.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-justify leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Data */}
      <section className="mt-20">
        <SectionHeading eyebrow={t.dataEyebrow} title={t.dataTitle} />
        <Reveal>
          <p className="text-justify leading-relaxed text-muted">{t.dataBody}</p>
        </Reveal>
      </section>

      {/* Pipeline */}
      <section className="mt-20">
        <SectionHeading eyebrow={t.pipelineEyebrow} title={t.pipelineTitle} />
        <div className="relative">
          <div className="absolute bottom-4 left-[15px] top-4 w-px bg-border" />
          <div className="space-y-3">
            {t.pipeline.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className="relative flex gap-5 pl-0"
              >
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-mono text-[11px] font-semibold text-accent-blue">
                  {step.num}
                </span>
                <div className="min-w-0 flex-1 rounded-2xl border border-border bg-surface/60 p-4 backdrop-blur">
                  <p className="font-display text-sm font-semibold text-foreground">
                    {step.title}
                  </p>
                  <p className="mt-1 text-justify text-sm leading-relaxed text-muted">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mt-20">
        <SectionHeading eyebrow={t.featuresEyebrow} title={t.featuresTitle} />
        <div className="grid gap-4 sm:grid-cols-2">
          {t.features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-2/60 text-accent-blue">
                    <Icon className="h-4 w-4" />
                  </span>
                  <code className="font-mono text-sm font-semibold text-foreground">
                    {f.name}
                  </code>
                </div>
                <p className="text-justify text-sm leading-relaxed text-muted">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Anomaly taxonomy */}
      <section className="mt-20">
        <SectionHeading eyebrow={t.anomalyEyebrow} title={t.anomalyTitle} />
        <Reveal>
          <p className="mb-8 text-justify leading-relaxed text-muted">
            {t.anomalyBody}
          </p>
        </Reveal>
        <div className="space-y-10">
          {t.anomalies.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <figure>
                <div className="overflow-hidden rounded-2xl border border-border bg-white p-3 shadow-soft">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.img}
                    alt={a.title}
                    loading="lazy"
                    className="w-full rounded-lg"
                  />
                </div>
                <figcaption className="mt-3 flex gap-3 px-1">
                  <span className="font-mono text-xs font-semibold text-accent-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-muted">
                    <span className="font-medium text-foreground">
                      {a.title}.
                    </span>{" "}
                    {a.desc}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Models & results */}
      <section className="mt-20">
        <SectionHeading eyebrow={t.resultsEyebrow} title={t.resultsTitle} />
        <div className="grid gap-4 sm:grid-cols-2">
          {[t.dbscan, t.iforest].map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2/60 text-accent-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {m.title}
                    </h3>
                  </div>
                  <p className="text-justify text-sm leading-relaxed text-muted">
                    {m.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.15}>
          <div className="mt-4 flex items-start gap-4 rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-6">
            <FileSearch className="mt-0.5 h-5 w-5 shrink-0 text-accent-blue" />
            <p className="text-justify text-sm leading-relaxed text-foreground/90">
              {t.intersection}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Learnings */}
      <section className="mt-20">
        <SectionHeading eyebrow={t.learningsEyebrow} title={t.learningsTitle} />
        <ul className="space-y-4">
          {t.learnings.map((l, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <li className="flex gap-4">
                <span className="mt-1 font-mono text-xs font-semibold text-accent-blue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="flex-1 text-justify leading-relaxed text-muted">
                  {l}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <Reveal delay={0.1}>
        <div className="mt-20 rounded-3xl border border-border bg-surface/60 p-8 text-center backdrop-blur sm:p-10">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            {t.ctaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {t.ctaBody}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 rounded-full bg-accent-blue px-6 py-3 text-sm font-medium text-on-accent shadow-glow transition hover:opacity-90",
              )}
            >
              <Github className="h-4 w-4" /> {t.ctaCode}
            </a>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent-blue/50"
            >
              {t.ctaContact} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Reveal>
    </article>
  );
}
