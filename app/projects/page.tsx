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
  return getProjects()
    .filter((project) => project.featured)
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
        aria-label={archive.heading}
        className="border-t border-line bg-ground-2"
      >
        <Container className="flex flex-col gap-6 py-14">
          <h2 className="type-h2">{archive.heading}</h2>
          <div className="overflow-x-auto rounded-card border border-line bg-surface">
            <table className="w-full min-w-[640px] border-collapse text-left text-[15px] leading-[1.5]">
              <thead>
                <tr className="border-b border-line">
                  {columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="px-4 py-3 font-mono text-[12px] font-medium tracking-[0.06em] text-muted uppercase"
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
                    className="border-b border-line last:border-b-0"
                  >
                    <td className="px-4 py-3 font-mono text-[13px] whitespace-nowrap text-muted">
                      {row.year}
                    </td>
                    <td className="px-4 py-3 font-medium text-ink">
                      {row.project}
                    </td>
                    <td className="px-4 py-3 text-ink-2">{row.what}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-ink-2">
                      {row.status}
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
