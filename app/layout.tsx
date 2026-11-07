import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getProfile } from "@/lib/content";
import { SITE_URL } from "@/lib/jsonld";
import { SITE_NAME, pageMetadata } from "@/lib/metadata";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import "./globals.css";

// Fonts (brief 1.1). Self-hosted by next/font; no request to Google at runtime.
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-inter-tight",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const profile = getProfile();

// Site defaults: the home page's Open Graph and Twitter blocks. Canonical is
// left to each page, so a route without its own (the 404) never claims "/".
const { openGraph, twitter } = pageMetadata({
  title: SITE_NAME,
  description: profile.headline,
  path: "/",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: profile.name,
    template: `%s | ${profile.name}`,
  },
  description: profile.oneLiner,
  openGraph,
  twitter,
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col bg-ground font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-button focus:bg-surface focus:px-4 focus:py-2 focus:text-ink focus:underline"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
