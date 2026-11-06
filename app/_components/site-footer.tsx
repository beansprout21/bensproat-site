import Link from "next/link";
import { Suspense } from "react";
import {
  getFooterHeadings,
  getHome,
  getLinks,
  getProfile,
} from "@/lib/content";
import { FooterHeading } from "./footer-heading";

const REPO_URL = "https://github.com/beansprout21/bensproat-site";
const PROFILE_LINK_ICONS = ["linkedin", "github", "devpost"];

const headingClass =
  "font-display text-[clamp(30px,3.4vw,42px)] leading-[1.08] font-bold tracking-[-0.02em] text-on-dark";
const linkClass =
  "inline-flex min-h-[44px] items-center px-2.5 text-[15px] font-medium text-on-dark no-underline underline-offset-4 hover:underline";

/**
 * Dark footer band (brief 1.5): heading and email, profile links, the
 * built-in-public line. The default heading comes from content/home.yaml and
 * per-page overrides from the page and project files (getFooterHeadings).
 */
export function SiteFooter() {
  const profile = getProfile();
  const fallback = getHome().footer.heading;
  const headings = getFooterHeadings();
  const profileLinks = getLinks().filter((link) =>
    PROFILE_LINK_ICONS.includes(link.icon),
  );

  return (
    <footer className="bg-ink text-on-dark">
      <div className="container-x flex flex-col gap-9 pt-16 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <Suspense fallback={<h2 className={headingClass}>{fallback}</h2>}>
            <FooterHeading
              headings={headings}
              fallback={fallback}
              className={headingClass}
            />
          </Suspense>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-[46px] items-center rounded-button bg-on-dark px-5 text-[15px] font-semibold text-ink no-underline hover:bg-white"
          >
            {profile.email}
          </a>
        </div>
        <nav aria-label="Profiles" className="flex flex-wrap gap-x-2 gap-y-1">
          {profileLinks.map((link) => (
            <a key={link.url} href={link.url} rel="me" className={linkClass}>
              {link.label}
            </a>
          ))}
          <Link href="/resume" className={linkClass}>
            Resume
          </Link>
          <Link href="/links" className={linkClass}>
            Phone version: /links
          </Link>
        </nav>
        <p className="font-mono text-[12.5px] leading-[1.6] text-on-dark-muted">
          Built by Ben with a team of Claude agents, in public:{" "}
          <a
            href={REPO_URL}
            className="text-on-dark-accent underline underline-offset-4 hover:text-on-dark"
          >
            github.com/beansprout21/bensproat-site
          </a>
        </p>
      </div>
    </footer>
  );
}
