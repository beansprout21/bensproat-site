import type { Metadata } from "next";
import { getLinks } from "@/lib/content";
import { Container } from "../_components/container";

export const metadata: Metadata = { title: "Links" };

// Plain server-rendered anchors: works without JavaScript.
export default function Page() {
  const links = getLinks();

  return (
    <Container className="py-16 md:py-24">
      <h1 className="type-title">Links</h1>
      <ul className="mt-8 flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              rel="me"
              className="flex min-h-14 w-full items-center justify-center rounded-card border border-line bg-surface px-6 py-4 text-lg font-medium text-ink no-underline hover:bg-ground-2"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
