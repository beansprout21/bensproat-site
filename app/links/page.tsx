import type { Metadata } from "next";
import Image from "next/image";
import { getLinks, getProfile, getResumes, resolveImage } from "@/lib/content";
import { Container } from "../_components/container";

const profile = getProfile();
const HEADSHOT = {
  src: "/images/headshot.jpg",
  alt: "Ben Sproat, smiling, in a navy shirt against a white wall",
};
/** Links that are Ben's own profiles get rel="me". */
const PROFILE_ICONS = ["linkedin", "github", "devpost", "email"];

export const metadata: Metadata = {
  title: "Links",
  description: profile.oneLiner,
};

/**
 * /links (brief 4.9): the phone-first link page for the NFC card and QR code.
 * Plain anchors in a single column, so it works without JavaScript; `/card`
 * redirects here with `?src=card` (next.config.ts).
 */
export default function Page() {
  const resumes = getResumes();
  const defaultResume =
    resumes.find((resume) => resume.audience === "ai-product") ?? resumes[0];
  const headshot = resolveImage(HEADSHOT.src);
  const links = getLinks().map((link) => ({
    ...link,
    href:
      link.icon === "resume" ? (defaultResume?.file ?? "/resume") : link.url,
  }));

  return (
    <Container
      as="section"
      aria-label="Links"
      className="flex flex-col gap-7 py-12"
    >
      <div className="mx-auto flex w-full max-w-[520px] flex-col items-center gap-3 text-center">
        {headshot ? (
          <Image
            src={headshot}
            alt={HEADSHOT.alt}
            width={96}
            height={96}
            sizes="96px"
            loading="eager"
            fetchPriority="high"
            className="size-24 rounded-full border border-line object-cover"
          />
        ) : null}
        <h1 className="font-display text-[26px] leading-[1.15] font-semibold tracking-[-0.01em] text-ink">
          {profile.name}
        </h1>
        <p className="text-[16px] leading-[1.5] text-ink-2">
          {profile.oneLiner}
        </p>
      </div>
      <ul className="mx-auto m-0 flex w-full max-w-[520px] list-none flex-col gap-3 p-0">
        {links.map((link) => (
          <li key={link.icon}>
            <a
              href={link.href}
              rel={PROFILE_ICONS.includes(link.icon) ? "me" : undefined}
              className="flex min-h-14 w-full flex-col items-center justify-center rounded-card border border-line bg-surface px-6 py-3 text-center no-underline hover:bg-ground-2"
            >
              <span className="text-[17px] font-semibold text-ink">
                {link.label}
              </span>
              {link.note ? (
                <span className="font-mono text-[12px] tracking-[0.06em] text-muted uppercase">
                  {link.note}
                </span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
