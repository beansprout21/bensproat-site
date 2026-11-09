import Link from "next/link";
import { Suspense } from "react";
import {
  getHome,
  getLinks,
  getPage,
  getProfile,
  getDefaultResume,
  getProjects,
  type PageFooter,
  type PageName,
} from "@/lib/content";
import { ExternalLink, NewTabNote, newTabProps } from "./external-link";
import {
  FooterBlock,
  footerSecondaryClass,
  type FooterConfig,
} from "./footer-block";

const REPO_URL = "https://github.com/beansprout21/bensproat-site";
const PROFILE_LINK_ICONS = ["linkedin", "github", "devpost"];
const PAGE_NAMES: PageName[] = [
  "ventures",
  "hire",
  "about",
  "contact",
  "projects",
  "resume",
];

const headingClass =
  "font-display text-[clamp(30px,3.4vw,42px)] leading-[1.08] font-bold tracking-[-0.02em] text-on-dark";
const linkClass =
  "inline-flex min-h-[44px] items-center px-2.5 text-[15px] font-medium text-on-dark no-underline underline-offset-4 hover:underline";

/** Heading plus the extra buttons a page's content asks for (brief 4.2, 4.3). */
function footerConfig(
  footer: PageFooter,
  booking: string | null,
  resumeHref: string,
): FooterConfig {
  const buttons: FooterConfig["buttons"] = [];
  if (footer.bookingLabel && booking) {
    buttons.push({ label: footer.bookingLabel, href: booking, external: true });
  }
  if (footer.resumeLabel) {
    buttons.push({ label: footer.resumeLabel, href: resumeHref });
  }
  return { heading: footer.heading, buttons };
}

/**
 * Dark footer band (brief 1.5): heading and buttons, profile links, the
 * built-in-public line. The default heading comes from content/home.yaml;
 * pages and projects override it (and add buttons) through their content files.
 */
export function SiteFooter() {
  const profile = getProfile();
  const home = getHome();
  const contact = getPage("contact");
  const resumeHref = getDefaultResume()?.file ?? "/resume";

  const fallback = footerConfig(home.footer, contact.booking, resumeHref);
  const configs: Record<string, FooterConfig> = { "/": fallback };
  for (const name of PAGE_NAMES) {
    const footer = getPage(name).footer;
    if (footer) {
      configs[`/${name}`] = footerConfig(footer, contact.booking, resumeHref);
    }
  }
  for (const project of getProjects()) {
    if (project.footerHeading) {
      configs[`/projects/${project.slug}`] = {
        heading: project.footerHeading,
        buttons: [],
      };
    }
  }

  const profileLinks = getLinks().filter((link) =>
    PROFILE_LINK_ICONS.includes(link.icon),
  );
  const leadClass =
    "inline-flex min-h-[46px] items-center rounded-button bg-on-dark px-5 text-[15px] font-semibold text-ink no-underline hover:bg-white";
  const leadButtons = (
    <>
      <a href={`mailto:${profile.email}`} className={leadClass}>
        {profile.email}
      </a>
      <a href={profile.phoneHref} className={leadClass}>
        {profile.phone}
      </a>
    </>
  );
  const linksPage = getPage("links");
  const tailButtons = (
    <Link href="/links" className={footerSecondaryClass}>
      {linksPage.name}
    </Link>
  );

  return (
    <footer className="bg-ink text-on-dark">
      <div className="container-x flex flex-col gap-9 pt-16 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <Suspense
            fallback={
              <>
                <h2 className={headingClass}>{fallback.heading}</h2>
                <div className="flex flex-wrap gap-3">
                  {leadButtons}
                  {tailButtons}
                </div>
              </>
            }
          >
            <FooterBlock
              configs={configs}
              fallback={fallback}
              headingClass={headingClass}
              leadButtons={leadButtons}
              tailButtons={tailButtons}
            />
          </Suspense>
        </div>
        <nav aria-label="Profiles" className="flex flex-wrap gap-x-2 gap-y-1">
          {profileLinks.map((link) => (
            <ExternalLink
              key={link.url}
              href={link.url}
              me
              className={linkClass}
            >
              {link.label}
            </ExternalLink>
          ))}
          <Link href="/resume" className={linkClass}>
            Resume
          </Link>
        </nav>
        <p className="font-mono text-[12.5px] leading-[1.6] text-on-dark-muted">
          Built by Ben with a team of Claude agents, in public:{" "}
          <a
            href={REPO_URL}
            {...newTabProps()}
            className="text-on-dark-accent underline underline-offset-4 hover:text-on-dark"
          >
            github.com/beansprout21/bensproat-site
            <NewTabNote />
          </a>
        </p>
      </div>
    </footer>
  );
}
