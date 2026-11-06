import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { getProfile } from "@/lib/content";
import { SITE_URL } from "@/lib/jsonld";
import "./globals.css";

const profile = getProfile();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: profile.name,
    template: `%s | ${profile.name}`,
  },
  description: profile.oneLiner,
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:px-4 focus:py-2 focus:underline"
        >
          Skip to content
        </a>
        <main
          id="main"
          tabIndex={-1}
          className="mx-auto max-w-2xl px-6 py-16 focus:outline-none"
        >
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
