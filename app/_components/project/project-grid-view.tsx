import Link from "next/link";
import { WorkCard, type WorkCardProps } from "../work-card";

export type Pillar = "builder" | "founder" | "impact";
export const PILLARS: Pillar[] = ["builder", "founder", "impact"];

export type ProjectCard = Omit<WorkCardProps, "className" | "style"> & {
  slug: string;
  pillar: Pillar;
};

export type FilterLabels = Record<"all" | Pillar, string>;

type ProjectGridViewProps = {
  cards: ProjectCard[];
  filters: FilterLabels;
  /** Active pillar, or null for all. */
  active: Pillar | null;
};

const pillBase =
  "inline-flex min-h-[44px] items-center rounded-full border px-4 font-mono text-[12.5px] font-medium tracking-[0.06em] uppercase no-underline transition-[color,background-color,border-color]";

/**
 * Filter pills plus the case-study grid (brief 4.5). The pills are real links
 * to `?pillar=`, so they work without JavaScript; the client wrapper reads the
 * search params and passes `active`.
 */
export function ProjectGridView({
  cards,
  filters,
  active,
}: ProjectGridViewProps) {
  const options: { key: Pillar | null; label: string; href: string }[] = [
    { key: null, label: filters.all, href: "/projects" },
    ...PILLARS.map((pillar) => ({
      key: pillar,
      label: filters[pillar],
      href: `/projects?pillar=${pillar}`,
    })),
  ];
  const visible = active
    ? cards.filter((card) => card.pillar === active)
    : cards;

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="Filter projects by pillar">
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {options.map((option) => {
            const current = option.key === active;
            return (
              <li key={option.label}>
                <Link
                  href={option.href}
                  scroll={false}
                  aria-current={current ? "page" : undefined}
                  className={`${pillBase} ${
                    current
                      ? "border-accent-line bg-accent-tint text-accent-strong"
                      : "border-line bg-surface text-ink-2 hover:text-ink"
                  }`}
                >
                  {option.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
        {visible.map((card) => (
          <WorkCard
            key={card.slug}
            title={card.title}
            summary={card.summary}
            tags={card.tags}
            cover={card.cover}
            live={card.live}
            page={card.page}
            headingLevel={2}
          />
        ))}
      </div>
    </div>
  );
}
