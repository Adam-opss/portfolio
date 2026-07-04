import type { Metadata } from "next";
import { ThesisCaseStudy } from "@/components/sections/ThesisCaseStudy";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Collusion Detection in Public Procurement",
  description:
    "Bachelor's thesis case study: unsupervised machine learning (DBSCAN + Isolation Forest) applied to 160k+ Slovak public-procurement records to surface collusive bidding patterns.",
};

export default function ThesisPage() {
  return (
    <>
      <ThesisCaseStudy />
      <Footer />
    </>
  );
}
