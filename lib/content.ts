import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

// Content lives in /content. Every loader validates with zod and throws on
// invalid data, so bad content fails `pnpm content:check` and `pnpm build`.
// Schemas are strict: an unknown key is an error. Facts Ben still owes are
// nullable and default to null; components omit the element when null, so a
// placeholder can never render.

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// ---------------------------------------------------------------------------
// Primitives

const text = z.string().min(1);
const textList = z.array(text);
/** A fact Ben still owes: absent or null in the file, null in code. */
const owedText = z.string().min(1).nullable().default(null);
const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Expected YYYY-MM");
const slug = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Expected kebab-case");
/** Site-relative path such as "/projects/sprout". */
const sitePath = z
  .string()
  .regex(/^\/[^\s]*$/, "Expected a site path starting with /");
const href = z.union([z.url(), sitePath]);
/** A file under /public, for example "/images/headshot.jpg". */
const publicPath = z
  .string()
  .regex(
    /^\/(images|resumes)\/[^\s]+$/,
    "Expected a path under /images or /resumes",
  );

// ---------------------------------------------------------------------------
// Shared shapes

export const PageLinkSchema = z.strictObject({
  label: text,
  href,
  /** Opens in a new tab with the arrow-out icon. */
  external: z.boolean().default(false),
});

export const StatSchema = z.strictObject({ value: text, label: text });
const LeadTextSchema = z.strictObject({ lead: text, text });
const TitleTextSchema = z.strictObject({ title: text, text });
const StepSchema = z.strictObject({ title: text, text: text.optional() });
const MetaSchema = z.strictObject({ title: text, description: text });

/** Per-page footer: heading override plus optional extra buttons. */
export const PageFooterSchema = z.strictObject({
  heading: text,
  /** Label of the "Book a call" button, shown only when contact.booking is set. */
  bookingLabel: text.optional(),
  /** Label of a resume button, shown next to the email button. */
  resumeLabel: text.optional(),
});

// ---------------------------------------------------------------------------
// Projects (brief 3.1)

export const ProjectSectionsSchema = z.strictObject({
  problem: z
    .strictObject({
      heading: text,
      paragraphs: textList.min(1),
      stats: z.array(StatSchema).optional(),
    })
    .optional(),
  built: z
    .strictObject({
      heading: text,
      paragraphs: textList,
      steps: z.array(LeadTextSchema).optional(),
    })
    .optional(),
  how: z
    .strictObject({
      heading: text,
      paragraphs: textList,
      columns: z.array(TitleTextSchema).optional(),
      pipelineLabel: text.optional(),
      pipeline: z.array(StepSchema).optional(),
    })
    .optional(),
  failed: z
    .strictObject({ heading: text, items: z.array(LeadTextSchema).min(1) })
    .optional(),
  results: z.strictObject({ heading: text, items: textList.min(1) }).optional(),
  visuals: z
    .strictObject({
      images: z.array(z.strictObject({ src: publicPath, alt: text })),
      video: z.strictObject({ url: z.url(), label: text }).optional(),
    })
    .optional(),
  footnote: text.optional(),
});

export const ProjectSchema = z.strictObject({
  slug,
  title: text,
  /** Short badge shown next to the title, for example the contest win. */
  badge: text.optional(),
  pillar: z.enum(["builder", "founder", "impact"]),
  /** The lede on the project page. */
  oneLineResult: text,
  /** One or two sentences for cards. */
  summary: text,
  role: text,
  team: text.optional(),
  /** Human text, for example "October 2026, a 24-hour build". */
  when: text,
  dates: z.strictObject({ start: yearMonth, end: yearMonth.optional() }),
  status: z.enum(["live", "in-progress", "archived"]),
  /** Human text for the metadata row. */
  statusText: text.optional(),
  stack: textList,
  /** Two to four short words for the mono line on cards. */
  tags: textList.min(1).max(4),
  /** The tangible product; always first in link rows. */
  live: z.strictObject({ label: text, url: z.url() }).optional(),
  links: z.array(
    z.strictObject({
      label: text,
      url: z.url(),
      kind: z.enum(["live", "code", "devpost", "site", "other"]),
    }),
  ),
  /** Stat tiles, up to four. */
  metrics: z.array(StatSchema).max(4),
  cover: publicPath.optional(),
  /** Featured projects come first in the /projects grid; every project is listed. */
  featured: z.boolean(),
  order: z.int(),
  /** Footer heading override for this project's page. */
  footerHeading: text.optional(),
  /** Meta description when `oneLineResult` is outside 70 to 160 characters (#35). */
  metaDescription: text.optional(),
  /** Award named in the project's JSON-LD (docs/brief-c5.md 3). */
  award: text.optional(),
  /** Share-image eyebrow; falls back to "Project" (docs/brief-c5.md 2). */
  ogEyebrow: text.optional(),
  /** Share-image sub line, at most two lines; falls back to `summary`. */
  ogLine: text.optional(),
  /** Body paragraphs for project pages that are not full case studies. */
  paragraphs: textList.optional(),
  /** Present only for full case studies. */
  sections: ProjectSectionsSchema.optional(),
});

// ---------------------------------------------------------------------------
// Profile, links, resumes, now

export const ProfileSchema = z.strictObject({
  name: text,
  oneLiner: text,
  /** Long form for metadata descriptions and JSON-LD. */
  headline: text,
  email: z.email(),
  /** Display form, for example "(301) 751-2668". */
  phone: text,
  /** tel: link with the country code, for example "tel:+13017512668". */
  phoneHref: z.string().regex(/^tel:\+\d{8,15}$/, "Expected tel:+<digits>"),
  sameAs: z.array(z.url()),
});

export const LinkSchema = z.strictObject({
  label: text,
  /** Smaller line under the label on /links, for example "Try it live". */
  note: text.optional(),
  url: href,
  /** Plain key such as "github"; also used to pick links for the home page and footer. */
  icon: text,
  order: z.int(),
});

export const ResumeSchema = z.strictObject({
  id: text,
  label: text,
  audience: z.enum(["ai-product", "engineering", "founder"]),
  /** Path under /public, for example "/resumes/ai-product.pdf". */
  file: publicPath,
  updated: z.iso.date(),
});

export const NowSchema = z.strictObject({
  updated: z.iso.date(),
  /** Page title and meta description; the page falls back to "Now" and the profile one-liner. */
  title: text.optional(),
  description: text.optional(),
  /** Bullet list, shown in one card above the paragraphs. */
  items: textList.optional(),
  /** Strip label on the bullet card, for example "What I'm working on". */
  cardLabel: text.optional(),
});

// ---------------------------------------------------------------------------
// Home (brief 3.2, 4.1 and section 2)

export const DoorKeySchema = z.enum([
  "building",
  "hiring",
  "about",
  "automation",
]);

/** The home page's fixed project order and hero button. */
export const HomeStateSchema = z.strictObject({
  /** Project slugs, first to last, for Selected work. */
  order: textList.min(1),
  /** The hero's primary button. */
  cta: PageLinkSchema,
});

export const HomeSchema = z.strictObject({
  meta: z.strictObject({ title: text }),
  hero: z.strictObject({
    name: text,
    headline: text,
    /** The exact ending of `headline`, rendered in the accent color. */
    headlineAccent: owedText,
    sub: text,
    availability: owedText,
    /** Pill pinned inside the photo's bottom-left corner. */
    photoTag: owedText,
    resumeLabel: text,
    emailLabel: text,
  }),
  default: HomeStateSchema,
  doors: z.strictObject({
    heading: text,
    lede: text,
    /** What the panel under the doors says before a door is picked. */
    panel: z.strictObject({ label: text, text }),
    items: z
      .array(
        z.strictObject({
          key: DoorKeySchema,
          title: text,
          /** Panel label once this door is picked. */
          kicker: text,
          text,
          ctaLabel: text,
          href,
          external: z.boolean().default(false),
        }),
      )
      .min(1),
  }),
  work: z.strictObject({
    /** Mono label above the heading. */
    label: text,
    heading: text,
    allLabel: text,
    caseStudyLabel: text,
    pageLabel: text,
    /** Card copy per project; shown in `default.order`. */
    items: z
      .array(
        z.strictObject({
          slug,
          kind: text,
          title: text,
          text,
          liveLabel: text,
          pageLabel: text,
        }),
      )
      .min(1),
  }),
  /** Resume section after Selected work (issue #56). */
  resume: z.strictObject({ heading: text, lede: text, fullLinkLabel: text }),
  now: z.strictObject({ label: text, line: owedText, linkLabel: text }),
  footer: PageFooterSchema,
});

// ---------------------------------------------------------------------------
// Page files (brief 4.2 to 4.8)

export const VenturesSchema = z.strictObject({
  meta: MetaSchema,
  eyebrow: text,
  title: text,
  lede: text,
  nowBuilding: z.strictObject({
    heading: text,
    items: z
      .array(
        z.strictObject({ title: text, text, links: z.array(PageLinkSchema) }),
      )
      .min(1),
  }),
  howIBuild: z.strictObject({
    heading: text,
    paragraphs: textList.min(1),
    links: z.array(PageLinkSchema),
    pipeline: z.array(StepSchema).min(1),
  }),
  lookingFor: z.strictObject({ heading: text, text: owedText }),
  supportingProof: z.array(
    z.strictObject({
      label: text,
      detail: text.optional(),
      href: href.optional(),
    }),
  ),
  footer: PageFooterSchema,
});

export const HireSchema = z.strictObject({
  meta: MetaSchema,
  eyebrow: text,
  title: text,
  availability: owedText,
  skills: z.strictObject({
    heading: text,
    items: z
      .array(z.strictObject({ title: text, items: textList.min(1) }))
      .min(1),
  }),
  evidence: z.strictObject({ heading: text, slugs: textList.min(1) }),
  experience: z.strictObject({
    heading: text,
    items: z.array(z.strictObject({ dates: text, text })).min(1),
  }),
  /** Schools, newest first, in the same shape as experience. */
  education: z.strictObject({
    heading: text,
    items: z.array(z.strictObject({ dates: text, text })).min(1),
  }),
  resumePicker: z.strictObject({
    heading: text,
    downloadLabel: text,
    /** Button label while a PDF is missing; the card then links to /resume. */
    fallbackLabel: text,
    items: z
      .array(
        z.strictObject({
          audience: z.enum(["ai-product", "engineering", "founder"]),
          title: text,
          text,
        }),
      )
      .min(1),
  }),
  footer: PageFooterSchema,
});

export const AboutSchema = z.strictObject({
  meta: MetaSchema,
  header: z.strictObject({ image: publicPath, alt: text }),
  title: text,
  lede: text,
  bio: text,
  threads: z.strictObject({
    heading: text,
    items: z
      .array(
        z.strictObject({
          title: text,
          quote: text,
          paragraph: text.optional(),
          items: textList.min(1),
        }),
      )
      .length(3),
  }),
  timeline: z.strictObject({
    heading: text,
    items: z.array(z.strictObject({ year: text, text })).min(1),
  }),
  offKeyboard: z.strictObject({
    heading: text,
    image: publicPath,
    alt: text,
    paragraph: text,
  }),
  footer: PageFooterSchema,
});

export const ContactSchema = z.strictObject({
  meta: MetaSchema,
  title: text,
  lede: text,
  /** Booking URL; null until Ben picks a tool. */
  booking: z.url().nullable().default(null),
  bookingLabel: text,
  /** Email card: strip label, right-hand strip label and button label. */
  emailCard: z.strictObject({ label: text, right: text, buttonLabel: text }),
  /** Phone card under the email card: strip label and button label. */
  phoneCard: z.strictObject({ label: text, buttonLabel: text }),
  /** Mono kind label on each link tile, keyed by the link's icon in links.yaml. */
  tileKinds: z.record(z.string(), text),
  footer: PageFooterSchema,
});

export const ProjectsPageSchema = z.strictObject({
  meta: MetaSchema,
  title: text,
  lede: text,
  filters: z.strictObject({
    all: text,
    builder: text,
    founder: text,
    impact: text,
  }),
  archive: z.strictObject({
    heading: text,
    /** Tag next to the heading, for example "2017 to 2026". */
    range: text.optional(),
    columns: z.strictObject({
      year: text,
      project: text,
      what: text,
      status: text,
    }),
    items: z
      .array(
        z.strictObject({ year: text, project: text, what: text, status: text }),
      )
      .min(1),
  }),
  footer: PageFooterSchema.optional(),
});

export const ResumePageSchema = z.strictObject({
  meta: MetaSchema,
  title: text,
  lede: text,
  downloadLabel: text,
  /** Right-hand label on each download card's strip. */
  downloadTag: text,
  /** "At a glance" band: heading and the three card strip labels. */
  summary: z.strictObject({
    heading: text,
    education: text,
    experience: text,
    skills: text,
  }),
  /** Shown while resumes.yaml is empty: "<before> <linkLabel> <after>" with the link as mailto. */
  emptyState: z.strictObject({ before: text, linkLabel: text, after: text }),
  footer: PageFooterSchema.optional(),
});

/** /links: metadata and its visitor-facing name; the links themselves come from links.yaml. */
export const LinksPageSchema = z.strictObject({
  meta: MetaSchema,
  /** What visitors see the page called, for example "All my links". */
  name: text,
  /** One line under the name, wherever the page is offered. */
  description: text,
  footer: PageFooterSchema.optional(),
});

const PAGE_SCHEMAS = {
  ventures: VenturesSchema,
  hire: HireSchema,
  about: AboutSchema,
  contact: ContactSchema,
  projects: ProjectsPageSchema,
  resume: ResumePageSchema,
  links: LinksPageSchema,
} as const;

// ---------------------------------------------------------------------------
// Types

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectSections = z.infer<typeof ProjectSectionsSchema>;
export type Stat = z.infer<typeof StatSchema>;
export type PageLink = z.infer<typeof PageLinkSchema>;
export type PageFooter = z.infer<typeof PageFooterSchema>;
export type Resume = z.infer<typeof ResumeSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Link = z.infer<typeof LinkSchema>;
export type Now = z.infer<typeof NowSchema> & { paragraphs: string[] };
export type Home = z.infer<typeof HomeSchema>;
export type HomeState = z.infer<typeof HomeStateSchema>;
export type DoorKey = z.infer<typeof DoorKeySchema>;
export type PageName = keyof typeof PAGE_SCHEMAS;
export type PageContent<K extends PageName> = z.infer<(typeof PAGE_SCHEMAS)[K]>;

// ---------------------------------------------------------------------------
// Loading

function readContentFile(relativePath: string): string {
  return fs.readFileSync(path.join(CONTENT_DIR, relativePath), "utf8");
}

function validate<T>(schema: z.ZodType<T>, data: unknown, source: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Invalid content in content/${source}:\n${z.prettifyError(result.error)}`,
    );
  }
  return result.data;
}

function loadYaml<T>(schema: z.ZodType<T>, relativePath: string): T {
  return validate(
    schema,
    parseYaml(readContentFile(relativePath)),
    relativePath,
  );
}

export function getProfile(): Profile {
  return loadYaml(ProfileSchema, "profile.yaml");
}

export function getLinks(): Link[] {
  return loadYaml(z.array(LinkSchema), "links.yaml").toSorted(
    (a, b) => a.order - b.order,
  );
}

export function getResumes(): Resume[] {
  return loadYaml(z.array(ResumeSchema), "resumes.yaml");
}

/** now.mdx: frontmatter plus a plain-text body split into paragraphs on blank lines. */
export function getNow(): Now {
  const { data, content } = matter(readContentFile("now.mdx"));
  const frontmatter = validate(NowSchema, data, "now.mdx");
  const paragraphs = content
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  return { ...frontmatter, paragraphs };
}

export function getHome(): Home {
  return loadYaml(HomeSchema, "home.yaml");
}

export function getPage<K extends PageName>(name: K): PageContent<K> {
  // The schema map is a union to TypeScript; each name maps to exactly one schema.
  const schema = PAGE_SCHEMAS[name] as unknown as z.ZodType<PageContent<K>>;
  return loadYaml(schema, `pages/${name}.yaml`);
}

/** Projects from content/projects/<slug>.yaml, sorted by `order`. */
export function getProjects(): Project[] {
  const dir = path.join(CONTENT_DIR, "projects");
  const projects = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".yaml"))
    .map((file) => {
      const source = `projects/${file}`;
      const project = loadYaml(ProjectSchema, source);
      if (`${project.slug}.yaml` !== file) {
        throw new Error(
          `Invalid content in content/${source}: slug "${project.slug}" must match the file name`,
        );
      }
      // A file at public/images/projects/<slug>.jpg is the cover unless the
      // YAML names one; pages still pass every cover through resolveImage.
      const conventionalCover = `/images/projects/${project.slug}.jpg`;
      if (!project.cover && resolveImage(conventionalCover)) {
        return { ...project, cover: conventionalCover };
      }
      return project;
    });
  return projects.toSorted((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

/** Footer heading overrides keyed by pathname, for the layout's SiteFooter. */
export function getFooterHeadings(): Record<string, string> {
  const headings: Record<string, string> = { "/": getHome().footer.heading };
  for (const name of Object.keys(PAGE_SCHEMAS) as PageName[]) {
    const footer = getPage(name).footer;
    if (footer) headings[`/${name}`] = footer.heading;
  }
  for (const project of getProjects()) {
    if (project.footerHeading) {
      headings[`/projects/${project.slug}`] = project.footerHeading;
    }
  }
  return headings;
}

/** Returns the path when the file exists under /public, else null, so pages can omit missing images. */
export function resolveImage(src: string): string | null {
  return fs.existsSync(path.join(PUBLIC_DIR, src)) ? src : null;
}

// ---------------------------------------------------------------------------
// Whole-content validation (pnpm content:check, run before every build)

function requireSlugs(known: Set<string>, slugs: string[], where: string) {
  for (const candidate of slugs) {
    if (!known.has(candidate)) {
      throw new Error(
        `Invalid content: ${where} refers to unknown project "${candidate}"`,
      );
    }
  }
}

/** Loads and validates every content file and the references between them. */
export function validateAllContent(): void {
  getProfile();
  getLinks();
  getResumes();
  getNow();

  const projects = getProjects();
  const slugs = new Set(projects.map((project) => project.slug));

  const home = getHome();
  requireSlugs(slugs, home.default.order, "home.yaml default.order");
  const workSlugs = home.work.items.map((item) => item.slug);
  requireSlugs(slugs, workSlugs, "home.yaml work.items");
  const missing = home.default.order.filter((key) => !workSlugs.includes(key));
  if (missing.length > 0) {
    throw new Error(
      `Invalid content: home.yaml work.items has no card for ${missing.join(", ")} (default.order)`,
    );
  }
  const { headline, headlineAccent } = home.hero;
  if (headlineAccent !== null && !headline.endsWith(headlineAccent)) {
    throw new Error(
      `Invalid content: home.yaml hero.headlineAccent "${headlineAccent}" must be the exact ending of hero.headline "${headline}"`,
    );
  }

  const hire = getPage("hire");
  requireSlugs(slugs, hire.evidence.slugs, "pages/hire.yaml evidence.slugs");
  getPage("ventures");
  getPage("about");
  getPage("contact");
  getPage("projects");
  getPage("resume");
  getPage("links");
}
