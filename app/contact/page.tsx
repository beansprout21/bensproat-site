import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { getLinks, getPage, getProfile, getResumes } from "@/lib/content";
import { Button } from "../_components/button";
import { CardStrip } from "../_components/card-strip";
import { Container } from "../_components/container";
import { ArrowRight } from "../_components/icons";

const page = getPage("contact");
const resumePage = getPage("resume");
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

type Tile = {
  key: string;
  kind: string;
  name: string;
  href: string;
  me: boolean;
};

/** /contact (brief 4.8, docs/issues/24-now-contact-resume-color.md). Every string comes from content/pages/contact.yaml, links.yaml and the profile. */
export default function Page() {
  const profile = getProfile();
  const resumes = getResumes();
  const defaultResume =
    resumes.find((resume) => resume.audience === "ai-product") ?? resumes[0];
  const tiles: Tile[] = getLinks()
    .filter((link) => PROFILE_LINK_ICONS.includes(link.icon))
    .map((link) => ({
      key: link.icon,
      kind: page.tileKinds[link.icon] ?? link.label,
      name: link.label,
      href: link.url,
      me: true,
    }));
  tiles.push({
    key: "resume",
    kind: page.tileKinds.resume ?? resumePage.title,
    name: resumePage.title,
    href: defaultResume?.file ?? "/resume",
    me: false,
  });

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
      <div className="w-full max-w-[780px] overflow-hidden rounded-card border-[1.5px] border-accent-strong bg-surface">
        <CardStrip label={page.emailCard.label} right={page.emailCard.right} />
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 p-[22px]">
          <p className="min-w-0 font-display text-[clamp(22px,3vw,30px)] leading-[1.2] font-bold tracking-[-0.01em] [overflow-wrap:anywhere] text-ink">
            {profile.email}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={`mailto:${profile.email}`}>
              {page.emailCard.buttonLabel}
            </Button>
            {page.booking ? (
              <Button href={page.booking} external variant="secondary">
                {page.bookingLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      <ul className="m-0 grid w-full max-w-[780px] list-none grid-cols-2 gap-4 p-0 min-[721px]:grid-cols-4">
        {tiles.map((tile) => (
          <li key={tile.key} className="min-w-0">
            <a
              href={tile.href}
              rel={tile.me ? "me" : undefined}
              className="group flex h-full min-h-[120px] flex-col justify-between gap-4 rounded-card border-[1.5px] border-accent-strong bg-surface p-[18px] text-ink no-underline transition-[background-color] hover:bg-accent-tint"
            >
              <span className="flex items-center justify-between gap-2">
                <span className="font-mono text-[12px] font-semibold tracking-[0.08em] uppercase">
                  {tile.kind}
                </span>
                <ArrowRight className="text-accent" />
              </span>
              <span className="font-display text-[22px] leading-[1.15] font-bold tracking-[-0.01em]">
                {tile.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="type-body w-full max-w-[780px] rounded-card border-[1.5px] border-accent-line bg-accent-tint px-5 py-4 text-ink-2">
        <LinksLine text={page.linksLine} />
      </p>
    </Container>
  );
}
