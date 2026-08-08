"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Percent,
  Route,
  Gauge,
  Sigma,
  LineChart,
  Layers,
  FileSearch,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText } from "@/components/ui/GradientText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RegressionScatter } from "@/components/charts/RegressionScatter";
import { MonthlyBars } from "@/components/charts/MonthlyBars";
import { RouteScatter } from "@/components/charts/RouteScatter";
import { cn } from "@/lib/utils";

const FINDING_CHARTS = [RegressionScatter, MonthlyBars, RouteScatter];

/* ────────────────────────────────────────────────────────────────────────── */
/*  Bilingual copy (real numbers from the Transport Data 2025 analysis)        */
/* ────────────────────────────────────────────────────────────────────────── */

const REPO = "https://github.com/Adam-opss/logistics-analytics-dashboard";

const copy = {
  en: {
    back: "Back to portfolio",
    eyebrow: "Case study · Data visualization",
    title: "Turning messy logistics data into",
    titleAccent: "profitable decisions",
    subtitle:
      "A full analytics build on a real freight-forwarding dataset: cleaning a 4,922-order export, rebuilding 68% of missing revenue with regression, and turning it into a Tableau dashboard and a Streamlit app that show which routes and agents actually make money. First place at the course hackathon.",
    meta: ["Technical University of Košice", "2025/2026", "Tableau · Python · Streamlit"],
    statsTitle: "The project at a glance",
    stats: [
      { value: 4922, label: "orders analysed" },
      { value: 40, label: "data attributes" },
      { value: 6526118, label: "EUR revenue modelled" },
      { value: 1031011, label: "EUR gross profit" },
    ],
    problemEyebrow: "01 · Problem",
    problemTitle: "Why this matters",
    problemBody: [
      "A freight forwarder moves thousands of international shipments a year through a network of agents and carriers. The money is made or lost at the level of individual routes and agents, but that signal is buried in a raw operational export: 40 columns, inconsistent formats, and revenue recorded for only a third of the orders.",
      "The questions management wants answered are simple to ask and hard to pull from that file: which routes are worth protecting, which agents actually add margin, and where the company quietly loses money. Answering them meant first making the data trustworthy, then turning it into something a non-analyst owner can read in seconds.",
    ],
    dataEyebrow: "02 · Data",
    dataTitle: "From a messy export to a clean model",
    dataBody:
      "The source is a single Excel fact table of 4,922 international transport orders spanning April 2025 to March 2026 across more than 30 European countries, with 40 attributes covering finance, geography, distance, and organisation. The real work was data quality: 67.7% of revenue values were missing, three date columns were stored as text, and country plus arrival time were packed into single fields. Five columns were entirely empty. Everything downstream depended on fixing this first.",
    pipelineEyebrow: "03 · Pipeline",
    pipelineTitle: "From raw file to dashboard",
    pipeline: [
      {
        num: "01",
        title: "Load & profile",
        desc: "Read 4,922 orders and 40 attributes, profile null rates, flag the columns worth keeping.",
      },
      {
        num: "02",
        title: "Clean & parse",
        desc: "Parse text dates, split country codes and arrival times out of mixed fields, standardise agent names.",
      },
      {
        num: "03",
        title: "Impute revenue",
        desc: "Rebuild the 67.7% missing revenue with an OLS regression on cost (r = 0.967), flagging each value as actual or estimated.",
      },
      {
        num: "04",
        title: "Engineer metrics",
        desc: "Derive profit, margin %, route (origin to destination), transit days, total km, and revenue per km as Tableau calculated fields.",
      },
      {
        num: "05",
        title: "Segment",
        desc: "Bucket orders into margin categories, load types (FTL / HTL / LTL), and distance-based route segments.",
      },
      {
        num: "06",
        title: "Cluster routes",
        desc: "Group routes with K-Means on frequency, average profit, and distance into four strategic segments.",
      },
      {
        num: "07",
        title: "Visualise",
        desc: "Assemble an interactive Tableau dashboard and a parallel Streamlit app for margin, routes, and agent performance.",
      },
    ],
    featuresEyebrow: "04 · Metrics",
    featuresTitle: "The calculated fields that drive it",
    features: [
      {
        icon: Sigma,
        name: "Revenue_EUR",
        desc: "Imputation-aware revenue: real values win, the regression estimate fills the gaps, and a flag marks which is which.",
      },
      {
        icon: Percent,
        name: "Margin_Pct",
        desc: "Profit as a share of revenue per order, the metric that separates busy routes from genuinely profitable ones.",
      },
      {
        icon: Route,
        name: "Route_OD",
        desc: "Origin-to-destination key built from the two country codes, the backbone of the geographic analysis.",
      },
      {
        icon: Gauge,
        name: "Revenue_per_KM",
        desc: "Revenue earned per loaded kilometre, exposing routes that look big but earn little for the distance.",
      },
    ],
    anomalyEyebrow: "05 · Findings",
    anomalyTitle: "What the data shows",
    anomalyBody:
      "Three charts from the analysis, each carrying one finding:",
    anomalies: [
      {
        img: "/logistics/cost-revenue-regression.png",
        title: "Cost predicts revenue, so the gaps can be filled",
        desc: "Across the 1,592 completed orders, cost and revenue move together almost perfectly (r = 0.967, R² = 0.94). That relationship is strong enough to rebuild the missing revenue with a simple regression at about 10.6% average error, turning an unusable third of the data into something analysable.",
      },
      {
        img: "/logistics/missing-revenue-pattern.png",
        title: "The missing revenue is a system gap, not noise",
        desc: "Revenue is 0% available from April to December 2025 and 100% from January 2026 onward. That clean break points to a delayed export from the invoicing system rather than random data loss, which is exactly the case where regression imputation is defensible.",
      },
      {
        img: "/logistics/route-clusters.png",
        title: "Every route falls into one of four strategies",
        desc: "Clustering routes on frequency, average profit, and distance splits them into four groups: core routes to protect, premium occasional routes to grow, high-volume low-margin routes to renegotiate, and marginal routes to review. Frequency alone is misleading; the busiest route is not the most profitable.",
      },
    ],
    resultsEyebrow: "06 · Models & results",
    resultsTitle: "Two techniques, one clear picture",
    dbscan: {
      icon: LineChart,
      title: "Regression imputation",
      body: "An OLS model on cost rebuilds the 67.7% missing revenue (R² = 0.94, MAPE 10.6%). Real values always take priority; the estimate only fills true gaps, and every row is flagged actual or estimated.",
    },
    iforest: {
      icon: Layers,
      title: "K-Means route clustering",
      body: "Routes are grouped in a space of frequency, average profit, and distance into four segments, each mapped to a concrete action from protect to review.",
    },
    intersection:
      "The headline insight cuts across both: high revenue is not high margin. The busiest agents and routes are often mid-margin, while smaller premium routes quietly outperform. Ranking on average profit per order, not turnover, changes who looks like the best performer.",
    learningsEyebrow: "07 · Takeaways",
    learningsTitle: "What I learned",
    learnings: [
      "Most of the value was in the cleaning: 68% missing revenue could have sunk the project, but a defensible imputation turned it into the analysis's strongest chart.",
      "Segmentation beats a single ranking: four route strategies tell an owner what to do, where one big profit table would not.",
      "Two tools, one story: building the same views in both Tableau and Streamlit forced the analysis to be clear enough to survive either medium.",
    ],
    ctaTitle: "Want the details?",
    ctaBody:
      "The full ETL, calculated fields, and both dashboards are in the repository. Happy to walk through any part of it.",
    ctaCode: "View the code",
    ctaContact: "Get in touch",
  },
  sk: {
    back: "Späť na portfólio",
    eyebrow: "Prípadová štúdia · Dátová vizualizácia",
    title: "Ako z neprehľadných logistických dát spraviť",
    titleAccent: "ziskové rozhodnutia",
    subtitle:
      "Kompletná analytika nad reálnym datasetom špedičnej firmy: vyčistenie exportu s 4 922 objednávkami, obnovenie 68 % chýbajúcich výnosov regresiou a premena na Tableau dashboard a Streamlit aplikáciu, ktoré ukážu, ktoré trasy a agenti skutočne zarábajú. Prvé miesto na predmetovom hackathone.",
    meta: ["Technická univerzita v Košiciach", "2025/2026", "Tableau · Python · Streamlit"],
    statsTitle: "Projekt v skratke",
    stats: [
      { value: 4922, label: "analyzovaných objednávok" },
      { value: 40, label: "dátových atribútov" },
      { value: 6526118, label: "EUR modelovaných výnosov" },
      { value: 1031011, label: "EUR hrubého zisku" },
    ],
    problemEyebrow: "01 · Problém",
    problemTitle: "Prečo na tom záleží",
    problemBody: [
      "Špedičná firma prepraví ročne tisíce medzinárodných zásielok cez sieť agentov a dopravcov. Peniaze sa získavajú alebo strácajú na úrovni jednotlivých trás a agentov, no tento signál je pochovaný v surovom prevádzkovom exporte: 40 stĺpcov, nekonzistentné formáty a výnosy zaznamenané len pri tretine objednávok.",
      "Otázky vedenia sa ľahko položia, ale ťažko vyčítajú z takého súboru: ktoré trasy sa oplatí chrániť, ktorí agenti reálne prinášajú maržu a kde firma potichu stráca. Odpovedať na ne znamenalo najprv spraviť dáta dôveryhodnými a potom ich premeniť na niečo, čo majiteľ bez analytického zázemia prečíta za pár sekúnd.",
    ],
    dataEyebrow: "02 · Dáta",
    dataTitle: "Od neprehľadného exportu k čistému modelu",
    dataBody:
      "Zdrojom je jedna Excel fakt tabuľka so 4 922 medzinárodnými prepravnými objednávkami od apríla 2025 do marca 2026 naprieč viac ako 30 európskymi krajinami, so 40 atribútmi pokrývajúcimi financie, geografiu, vzdialenosti a organizáciu. Skutočná práca bola kvalita dát: 67,7 % hodnôt výnosov chýbalo, tri stĺpce s dátumami boli uložené ako text a krajina spolu s časom príjazdu boli natlačené v jednom poli. Päť stĺpcov bolo úplne prázdnych. Všetko ďalšie záviselo od toho, či sa toto najprv opraví.",
    pipelineEyebrow: "03 · Pipeline",
    pipelineTitle: "Od surového súboru k dashboardu",
    pipeline: [
      {
        num: "01",
        title: "Načítanie a profilovanie",
        desc: "Načítanie 4 922 objednávok a 40 atribútov, profil chýbajúcich hodnôt, výber stĺpcov na ponechanie.",
      },
      {
        num: "02",
        title: "Čistenie a parsovanie",
        desc: "Parsovanie textových dátumov, oddelenie kódov krajín a časov príjazdu z miešaných polí, zjednotenie mien agentov.",
      },
      {
        num: "03",
        title: "Imputácia výnosov",
        desc: "Obnovenie 67,7 % chýbajúcich výnosov OLS regresiou na nákladoch (r = 0,967), každá hodnota označená ako skutočná alebo odhadnutá.",
      },
      {
        num: "04",
        title: "Tvorba metrík",
        desc: "Odvodenie zisku, marže %, trasy (odkiaľ kam), dní prepravy, celkových km a výnosov na km ako Tableau calculated fields.",
      },
      {
        num: "05",
        title: "Segmentácia",
        desc: "Zaradenie objednávok do maržových kategórií, typov prepravy (FTL / HTL / LTL) a vzdialenostných segmentov trás.",
      },
      {
        num: "06",
        title: "Zhlukovanie trás",
        desc: "Zoskupenie trás pomocou K-Means podľa frekvencie, priemerného zisku a vzdialenosti do štyroch strategických segmentov.",
      },
      {
        num: "07",
        title: "Vizualizácia",
        desc: "Zostavenie interaktívneho Tableau dashboardu a paralelnej Streamlit aplikácie pre maržu, trasy a výkon agentov.",
      },
    ],
    featuresEyebrow: "04 · Metriky",
    featuresTitle: "Vypočítané polia, ktoré to poháňajú",
    features: [
      {
        icon: Sigma,
        name: "Revenue_EUR",
        desc: "Výnosy zohľadňujúce imputáciu: skutočné hodnoty majú prednosť, regresný odhad dopĺňa medzery a príznak označí, čo je čo.",
      },
      {
        icon: Percent,
        name: "Margin_Pct",
        desc: "Zisk ako podiel na výnosoch objednávky, metrika, ktorá oddelí vyťažené trasy od skutočne ziskových.",
      },
      {
        icon: Route,
        name: "Route_OD",
        desc: "Kľúč odkiaľ-kam zostavený z dvoch kódov krajín, chrbtica geografickej analýzy.",
      },
      {
        icon: Gauge,
        name: "Revenue_per_KM",
        desc: "Výnos na naložený kilometer, odhalí trasy, ktoré vyzerajú veľké, ale na vzdialenosť zarobia málo.",
      },
    ],
    anomalyEyebrow: "05 · Zistenia",
    anomalyTitle: "Čo dáta ukázali",
    anomalyBody:
      "Tri grafy z analýzy, každý nesie jedno zistenie:",
    anomalies: [
      {
        img: "/logistics/cost-revenue-regression.png",
        title: "Náklady predpovedajú výnosy, medzery sa dajú doplniť",
        desc: "Naprieč 1 592 dokončenými objednávkami sa náklady a výnosy pohybujú takmer dokonale spolu (r = 0,967, R² = 0,94). Tento vzťah je dosť silný na obnovenie chýbajúcich výnosov jednoduchou regresiou s priemernou chybou okolo 10,6 %, čím sa nepoužiteľná tretina dát stane analyzovateľnou.",
      },
      {
        img: "/logistics/missing-revenue-pattern.png",
        title: "Chýbajúce výnosy sú systémová medzera, nie šum",
        desc: "Výnosy sú dostupné na 0 % od apríla do decembra 2025 a na 100 % od januára 2026. Tento čistý zlom ukazuje na oneskorený export z fakturačného systému, nie na náhodnú stratu dát, čo je presne prípad, kde je regresná imputácia obhájiteľná.",
      },
      {
        img: "/logistics/route-clusters.png",
        title: "Každá trasa spadá do jednej zo štyroch stratégií",
        desc: "Zhlukovanie trás podľa frekvencie, priemerného zisku a vzdialenosti ich rozdelí do štyroch skupín: nosné trasy chrániť, prémiové príležitostné rozvíjať, vysokoobjemové s nízkou maržou prevyjednať a okrajové prehodnotiť. Samotná frekvencia klame; najvyťaženejšia trasa nie je najziskovejšia.",
      },
    ],
    resultsEyebrow: "06 · Modely a výsledky",
    resultsTitle: "Dve techniky, jeden jasný obraz",
    dbscan: {
      icon: LineChart,
      title: "Regresná imputácia",
      body: "OLS model na nákladoch obnoví 67,7 % chýbajúcich výnosov (R² = 0,94, MAPE 10,6 %). Skutočné hodnoty majú vždy prednosť; odhad dopĺňa len reálne medzery a každý riadok je označený ako skutočný alebo odhadnutý.",
    },
    iforest: {
      icon: Layers,
      title: "Zhlukovanie trás K-Means",
      body: "Trasy sú zoskupené v priestore frekvencie, priemerného zisku a vzdialenosti do štyroch segmentov, každý priradený ku konkrétnej akcii od chrániť po prehodnotiť.",
    },
    intersection:
      "Hlavné zistenie prechádza oboma: vysoké výnosy nie sú vysoká marža. Najvyťaženejší agenti a trasy majú často strednú maržu, kým menšie prémiové trasy potichu prekonávajú. Hodnotenie podľa priemerného zisku na objednávku, nie podľa obratu, mení to, kto vyzerá ako najlepší.",
    learningsEyebrow: "07 · Ponaučenia",
    learningsTitle: "Čo som sa naučil",
    learnings: [
      "Väčšina hodnoty bola v čistení: 68 % chýbajúcich výnosov mohlo projekt potopiť, no obhájiteľná imputácia z nich spravila najsilnejší graf analýzy.",
      "Segmentácia poráža jeden rebríček: štyri stratégie trás povedia majiteľovi, čo robiť, kde jedna veľká tabuľka zisku nie.",
      "Dva nástroje, jeden príbeh: postaviť tie isté pohľady v Tableau aj v Streamlite prinútilo analýzu byť dosť jasná, aby prežila v oboch médiách.",
    ],
    ctaTitle: "Chceš detaily?",
    ctaBody:
      "Kompletné ETL, vypočítané polia aj oba dashboardy sú v repozitári. Rád ktorúkoľvek časť vysvetlím.",
    ctaCode: "Pozrieť kód",
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

export function LogisticsCaseStudy() {
  const { lang, content } = useLanguage();
  const t = copy[lang];
  const email = content.person.email;

  return (
    <article className="relative mx-auto w-full max-w-4xl px-6 pb-24 pt-32">
      {/* Back */}
      <Reveal direction="none">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm text-muted backdrop-blur transition hover:border-accent-blue/50 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" /> {t.back}
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

      {/* Stats */}
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

      {/* Metrics */}
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

      {/* Findings */}
      <section className="mt-20">
        <SectionHeading eyebrow={t.anomalyEyebrow} title={t.anomalyTitle} />
        <Reveal>
          <p className="mb-8 text-justify leading-relaxed text-muted">
            {t.anomalyBody}
          </p>
        </Reveal>
        <div className="space-y-10">
          {t.anomalies.map((a, i) => {
            const Chart = FINDING_CHARTS[i];
            return (
              <Reveal key={a.title} delay={i * 0.05}>
                <figure>
                  <Chart />
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
            );
          })}
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
              href={REPO}
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
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent-blue/50"
            >
              {t.ctaContact} <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </Reveal>
    </article>
  );
}
