import type { Metadata } from "next";
import { LogisticsCaseStudy } from "@/components/sections/LogisticsCaseStudy";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Logistics Analytics Dashboard",
  description:
    "Data-visualization case study: cleaning a 4,922-order freight-forwarding dataset, rebuilding 68% of missing revenue with regression, and turning it into a Tableau dashboard and a Streamlit app. First place at the course hackathon.",
};

export default function LogisticsPage() {
  return (
    <>
      <LogisticsCaseStudy />
      <Footer />
    </>
  );
}
