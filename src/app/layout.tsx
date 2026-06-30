import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { portfolio } from "@/config/portfolio";
import { CommandPaletteProvider } from "@/components/providers/CommandPalette";
import { CursorProvider } from "@/components/providers/CursorProvider";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { BackToTop } from "@/components/layout/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Resolve the canonical origin: an explicit env var wins, otherwise use the
// Vercel-provided deployment URL, falling back to the configured site URL.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : site.url);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: siteUrl,
    title: site.title,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
};

/** JSON-LD structured data for rich search results. */
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.person.name,
    jobTitle: portfolio.person.title,
    email: `mailto:${portfolio.person.email}`,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: portfolio.person.location,
    },
    sameAs: portfolio.social
      .filter((s) => s.href.startsWith("http"))
      .map((s) => s.href),
    knowsAbout: site.keywords,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} ${mono.variable} font-sans antialiased`}
      >
        <StructuredData />
        <CommandPaletteProvider>
          <LoadingScreen />
          <AnimatedBackground />
          <GrainOverlay />
          <ScrollProgress />
          <CursorProvider />
          <Navbar />
          <main className="relative">{children}</main>
          <BackToTop />
        </CommandPaletteProvider>
      </body>
    </html>
  );
}
