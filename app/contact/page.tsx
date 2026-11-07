import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { getLinks, getPage, getProfile } from "@/lib/content";
import { Button } from "../_components/button";
import { Container } from "../_components/container";

const page = getPage("contact");
const PROFILE_LINK_ICONS = ["linkedin", "github", "devpost"];

export const metadata: Metadata = pageMetadata({
  title: page.meta.title,
  description: page.meta.description,
  path: "/contact",
});

/** Renders the links line with the "/links" path as a link to the page. */
function LinksLine({ text }: { text: string }) {
  const [before, after] = text.split("/links");
  if (after === undefined) return <>{text}</>;
  return (
    <>
      {before}
      <Link
        href="/links"
        className="font-medium text-ink underline underline-offset-4"
      >
        /links
      </Link>
      {after}
    </>
  );
}

/** /contact (brief 4.8). Every string comes from content/pages/contact.yaml and the profile. */
export default function Page() {
  const profile = getProfile();
  const profileLinks = getLinks().filter((link) =>
    PROFILE_LINK_ICONS.includes(link.icon),
  );

  return (
    <Container
      as="section"
      aria-label="Contact"
      className="flex flex-col gap-8 pt-16 pb-16"
    >
      <div className="flex flex-col gap-3">
        <h1 className="type-title">{page.title}</h1>
        <p className="type-lede text-ink-2">{page.lede}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button href={`mailto:${profile.email}`}>{profile.email}</Button>
        {page.booking ? (
          <Button href={page.booking} external variant="secondary">
            {page.bookingLabel}
          </Button>
        ) : null}
      </div>
      <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0">
        {profileLinks.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              rel="me"
              className="inline-flex min-h-[44px] items-center text-[15px] font-medium text-ink-2 underline underline-offset-4 hover:text-ink"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="type-body max-w-[60ch] text-ink-2">
        <LinksLine text={page.linksLine} />
      </p>
    </Container>
  );
}
