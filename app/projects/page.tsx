import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import { getHome, getPage, getProjects, resolveImage } from "@/lib/content";
import { Container } from "../_components/container";
import { ProjectGrid } from "../_components/project/project-grid";
import {
  ProjectGridView,
  type ProjectCard,
} from "../_components/project/project-grid-view";
import { SectionHeader } from "../_components/section-header";

const page = getPage("projects");

export const metadata: Metadata = pageMetadata({
  title: page.meta.title,
  description: page.meta.description,
  path: "/projects",
});

function buildCards(): ProjectCard[] {
  const home = getHome();
  // Every project is listed (the Impact projects are not featured);
  // featured ones come first, each group in `order`.
  return [...getProjects()]
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .map((project) => {
      const cover = project.cover ? resolveImage(project.cover) : null;
      return {
        slug: project.slug,
        pillar: project.pillar,
        title: project.title,
        summary: project.summary,
        tags: project.tags,
        cover: cover
          ? { src: cover, alt: `${project.title} screenshot` }
          : null,
        live: project.live ?? null,
        page: {
          label: project.sections?.problem
            ? home.work.caseStudyLabel
            : home.work.pageLabel,
          href: `/projects/${project.slug}`,
        },
      };
    });
}

const badgeBase =
  "inline-block rounded-[6px] px-2 py-1 font-mono text-[11px] leading-none font-semibold tracking-[0.06em] uppercase";

/** Archive status badge (issue #43): Finished green, Prototype light green, the rest outlined. */
function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Finished"
      ? "bg-accent text-white"
      : status === "Prototype"
        ? "bg-accent-line text-ink"
        : "border-[1.5px] border-ink text-ink";
  return <span className={`${badgeBase} ${tone}`}>{status}</span>;
}

export default function Page() {
  const cards = buildCards();
  const { archive } = page;
  const columns = [
    archive.columns.year,
    archive.columns.project,
    archive.columns.what,
    archive.columns.status,
  ];

  return (
    <>
      <Container
        as="section"
        aria-label="Case studies"
        className="flex flex-col gap-8 pt-16 pb-14"
      >
        <SectionHeader level={1} title={page.title} lede={page.lede} />
        <Suspense
          fallback={
            <ProjectGridView
              cards={cards}
              filters={page.filters}
              active={null}
            />
          }
        >
          <ProjectGrid cards={cards} filters={page.filters} />
        </Suspense>
      </Container>

      <section
        aria-labelledby="archive-heading"
        className="border-y border-accent-line bg-accent-tint"
      >
        <Container className="flex flex-col gap-6 py-14">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 id="archive-heading" className="type-h2">
              {archive.heading}
            </h2>
            {archive.range ? (
              <p className="rounded-[6px] bg-accent-strong px-2.5 py-1 font-mono text-[12px] font-semibold tracking-[0.06em] text-white">
                {archive.range}
              </p>
            ) : null}
          </div>
          <div className="overflow-x-auto rounded-card border-[1.5px] border-accent-strong bg-surface">
            <table className="w-full min-w-[640px] border-collapse text-left text-[15px] leading-[1.5]">
              <thead>
                <tr className="bg-accent-strong">
                  {columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="px-4 py-3 font-mono text-[12px] font-semibold tracking-[0.08em] text-white uppercase"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {archive.items.map((row) => (
                  <tr
                    key={`${row.year}-${row.project}`}
                    className="border-b border-accent-divider bg-surface last:border-b-0 even:bg-accent-tint-2"
                  >
                    <td className="px-4 py-3 font-mono text-[13px] font-semibold whitespace-nowrap text-ink">
                      {row.year}
                    </td>
                    <td className="px-4 py-3 font-bold text-ink">
                      {row.project}
                    </td>
                    <td className="px-4 py-3 text-ink">{row.what}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  );
}
