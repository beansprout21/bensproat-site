import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

// Content lives in /content. Every loader validates with zod and throws on
// invalid data, so bad content fails `pnpm content:check` and `pnpm build`.

const CONTENT_DIR = path.join(process.cwd(), "content");

const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Expected YYYY-MM");

export const ProjectSchema = z.strictObject({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Expected kebab-case"),
  title: z.string().min(1),
  oneLineResult: z.string().min(1),
  pillar: z.enum(["builder", "founder", "impact"]),
  role: z.string().min(1),
  dates: z.strictObject({
    start: yearMonth,
    end: yearMonth.optional(),
  }),
  status: z.enum(["live", "in-progress", "archived"]),
  stack: z.array(z.string().min(1)),
  metrics: z.array(
    z.strictObject({ label: z.string().min(1), value: z.string().min(1) }),
  ),
  links: z.array(z.strictObject({ label: z.string().min(1), url: z.url() })),
  featured: z.boolean(),
  order: z.int(),
});

export const ResumeSchema = z.strictObject({
  id: z.string().min(1),
  label: z.string().min(1),
  audience: z.enum(["ai-product", "engineering", "founder"]),
  // Path under /public, for example "/resumes/ai-product.pdf".
  file: z.string().startsWith("/"),
  updated: z.iso.date(),
});

export const ProfileSchema = z.strictObject({
  name: z.string().min(1),
  oneLiner: z.string().min(1),
  email: z.email(),
  sameAs: z.array(z.url()),
});

export const LinkSchema = z.strictObject({
  label: z.string().min(1),
  url: z.url(),
  // Plain key such as "github". Icons are not rendered yet.
  icon: z.string().min(1),
  order: z.int(),
});

export const NowSchema = z.strictObject({
  updated: z.iso.date(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Resume = z.infer<typeof ResumeSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Link = z.infer<typeof LinkSchema>;
export type Now = z.infer<typeof NowSchema> & { body: string };

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

export function getNow(): Now {
  const { data, content } = matter(readContentFile("now.mdx"));
  return { ...validate(NowSchema, data, "now.mdx"), body: content.trim() };
}

export function getProjects(): Project[] {
  const dir = path.join(CONTENT_DIR, "projects");
  const projects = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const source = `projects/${file}`;
      const project = validate(
        ProjectSchema,
        matter(readContentFile(source)).data,
        source,
      );
      if (`${project.slug}.mdx` !== file) {
        throw new Error(
          `Invalid content in content/${source}: slug "${project.slug}" must match the file name`,
        );
      }
      return project;
    });
  return projects.toSorted((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

/** Loads and validates every content file. Used by `pnpm content:check`. */
export function validateAllContent(): void {
  getProfile();
  getLinks();
  getResumes();
  getNow();
  getProjects();
}
