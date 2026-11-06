"use client";

import { useSearchParams } from "next/navigation";
import {
  PILLARS,
  ProjectGridView,
  type FilterLabels,
  type Pillar,
  type ProjectCard,
} from "./project-grid-view";

type ProjectGridProps = {
  cards: ProjectCard[];
  filters: FilterLabels;
};

/** Reads `?pillar=` on the client and filters the grid; the server renders the unfiltered view. */
export function ProjectGrid({ cards, filters }: ProjectGridProps) {
  const searchParams = useSearchParams();
  const requested = searchParams.get("pillar");
  const active = PILLARS.includes(requested as Pillar)
    ? (requested as Pillar)
    : null;
  return <ProjectGridView cards={cards} filters={filters} active={active} />;
}
