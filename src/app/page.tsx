import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Footer } from "@/components/layout/Footer";

/**
 * Below-the-fold sections are dynamically imported so the initial bundle stays
 * lean - they hydrate as the user scrolls toward them.
 */
const Experience = dynamic(() =>
  import("@/components/sections/Experience").then((m) => m.Experience),
);
const Education = dynamic(() =>
  import("@/components/sections/Education").then((m) => m.Education),
);
const TechStack = dynamic(() =>
  import("@/components/sections/TechStack").then((m) => m.TechStack),
);
const Stats = dynamic(() =>
  import("@/components/sections/Stats").then((m) => m.Stats),
);
const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((m) => m.Contact),
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <TechStack />
      <Stats />
      <Contact />
      <Footer />
    </>
  );
}
