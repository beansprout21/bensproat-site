import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects, type Project } from "@/lib/content";
import { Container } from "../../_components/container";
import { Pill } from "../../_components/pill";
import { CaseStudySections } from "../../_components/project/case-study";
import {
  MetadataRow,
  type MetadataItem,
} from "../../_components/project/metadata-row";
import { ProjectLinks } from "../../_components/project/case-study";
import { StatTile } from "../../_components/stat-tile";

const STATUS_LABELS: Record<Project["status"], string> = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
};

/** The Role cell is hidden while Ben has not supplied the role (brief, issue #4 notes). */
const ROLE_PLACEHOLDER = "To be confirmed";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project
    ? { title: project.title, description: project.oneLineResult }
    : {};
}

function metadataItems(project: Project): MetadataItem[] {
  const items: MetadataItem[] = [];
  if (project.role !== ROLE_PLACEHOLDER) {
    items.push({ label: "Role", value: project.role });
  }
  if (project.team) items.push({ label: "Team", value: project.team });
  items.push({ label: "When", value: project.when });
  items.push({
    label: "Status",
    value: project.statusText ?? STATUS_LABELS[project.status],
  });
  if (project.stack.length > 0) {
    items.push({ label: "Stack", value: project.stack.join(", ") });
  }
  return items;
}

export default async function Page({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const isCaseStudy = Boolean(project.sections?.problem);

  return (
    <>
      <Container
        as="section"
        aria-label="Project summary"
        className="flex flex-col gap-7 pt-12 pb-10"
      >
        <p className="font-mono text-[12.5px] tracking-[0.04em] text-muted">
          <Link
            href="/projects"
            className="text-muted no-underline hover:text-ink"
          >
            Projects
          </Link>{" "}
          / {project.title}
        </p>
        <div className="flex max-w-[64ch] flex-col gap-[18px]">
          <div className="flex flex-wrap items-center gap-3.5">
            <h1 className="type-title">{project.title}</h1>
            {project.badge ? <Pill>{project.badge}</Pill> : null}
          </div>
          <p className="font-display text-[clamp(20px,2.2vw,26px)] leading-[1.35] font-medium tracking-[-0.01em] text-pretty text-ink">
            {project.oneLineResult}
          </p>
          <div className="pt-1">
            <ProjectLinks project={project} />
          </div>
        </div>
        <MetadataRow items={metadataItems(project)} />
      </Container>

      {project.metrics.length > 0 ? (
        <Container
          as="section"
          aria-label="Results in numbers"
          className="pb-12"
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
            {project.metrics.map((metric) => (
              <StatTile
                key={metric.label}
                value={metric.value}
                label={metric.label}
              />
            ))}
          </div>
        </Container>
      ) : null}

      {isCaseStudy || project.paragraphs || project.sections ? (
        <CaseStudySections project={project} />
      ) : null}
    </>
  );
}
