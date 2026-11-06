import type { Metadata } from "next";
import { getLinks } from "@/lib/content";

export const metadata: Metadata = { title: "Links" };

// Plain server-rendered anchors: works without JavaScript.
export default function Page() {
  const links = getLinks();

  return (
    <>
      <h1 className="text-3xl font-semibold">Links</h1>
      <ul className="mt-8 flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              rel="me"
              className="flex min-h-14 w-full items-center justify-center rounded-lg border border-neutral-300 px-6 py-4 text-lg font-medium hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
