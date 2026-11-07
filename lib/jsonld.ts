import type { Profile, Project } from "./content";

// Structured data (docs/brief-c5.md section 3). Every node points at the
// Person by `@id` instead of repeating it; each page's graph defines the
// Person once, so every reference resolves inside that page.

export const SITE_URL = "https://bensproat.com";
export const PERSON_ID = `${SITE_URL}/#person`;

const CONTEXT = "https://schema.org";
const personRef = { "@id": PERSON_ID };

type Node = Record<string, unknown>;

function absolute(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function buildPerson(profile: Profile): Node {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    url: SITE_URL,
    description: profile.oneLiner,
    jobTitle: "AI product builder",
    image: absolute("/images/headshot.jpg"),
    email: `mailto:${profile.email}`,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "The Pennsylvania State University",
      url: "https://www.psu.edu",
    },
    memberOf: {
      "@type": "Organization",
      name: "Schreyer Honors College",
      url: "https://www.shc.psu.edu",
    },
    knowsAbout: [
      "AI product development",
      "AI consulting",
      "Next.js",
      "Claude API",
      "CAD",
      "Rapid prototyping",
    ],
    sameAs: profile.sameAs,
  };
}

/** The two organizations Ben founded. `founder` points at the Person only; no co-founder is named. */
export function buildOrganizations(): Node[] {
  return [
    {
      "@type": "Organization",
      name: "Sproat Systems",
      url: "https://sproatsystems.com",
      description:
        "AI consulting and automation for healthcare practices and small businesses.",
      founder: personRef,
    },
    {
      "@type": "Organization",
      name: "Priming Labs",
      url: "https://priminglabs.com",
      founder: personRef,
    },
  ];
}

export function buildWebSite(profile: Profile): Node {
  return {
    "@type": "WebSite",
    name: profile.name,
    url: SITE_URL,
    author: personRef,
  };
}

/** ProfilePage for /about: the Person is embedded as the main entity. */
export function buildProfilePage(profile: Profile, pagePath: string): Node {
  return {
    "@context": CONTEXT,
    "@type": "ProfilePage",
    url: absolute(pagePath),
    mainEntity: buildPerson(profile),
  };
}

/** Home: one graph with WebSite, ProfilePage, Person and both Organizations. */
export function buildHomeGraph(profile: Profile): Node {
  return {
    "@context": CONTEXT,
    "@graph": [
      buildWebSite(profile),
      { "@type": "ProfilePage", url: absolute("/"), mainEntity: personRef },
      buildPerson(profile),
      ...buildOrganizations(),
    ],
  };
}

/**
 * The lead sentence of a one-line result: the claim about the work. Later
 * sentences are role and credit lines, and Priming's names the co-founder,
 * who stays out of JSON-LD (docs/brief-c5.md 3).
 */
function leadSentence(text: string): string {
  const match = text.match(/^.+?[.!?](?=\s+[A-Z]|$)/);
  return match ? match[0] : text;
}

/** Project pages: CreativeWork plus breadcrumbs, with the Person they reference. */
export function buildProjectGraph(profile: Profile, project: Project): Node {
  const url = absolute(`/projects/${project.slug}`);
  const work: Node = {
    "@type": "CreativeWork",
    name: project.title,
    description: leadSentence(project.oneLineResult),
    url,
    author: personRef,
    dateCreated: project.dates.start,
  };
  if (project.live) work.sameAs = project.live.url;
  if (project.award) work.award = project.award;

  return {
    "@context": CONTEXT,
    "@graph": [
      work,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: "Home", item: SITE_URL },
          { name: "Projects", item: absolute("/projects") },
          { name: project.title, item: url },
        ].map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          ...crumb,
        })),
      },
      buildPerson(profile),
    ],
  };
}

/** Serializes JSON-LD for a <script> tag, escaping "<" to prevent XSS. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
