import Link from "next/link";
import { WorkCard, type WorkCardProps } from "../work-card";

export type Pillar = "builder" | "founder" | "impact";
export const PILLARS: Pillar[] = ["builder", "founder", "impact"];

export type ProjectCard = Omit<
  WorkCardProps,
  "className" | "style" | "variant" | "strip" | "headingLevel"
> & {
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

const filterBase =
  "inline-flex min-h-[44px] items-center gap-2.5 rounded-button px-[18px] font-mono text-[13px] font-semibold tracking-[0.08em] uppercase no-underline transition-[color,background-color,border-color]";

/** Right-hand label on the card strip when the project has a live URL. */
const LIVE_LABEL = "Live";

/**
 * Filter buttons plus the case-study grid (brief 4.5, docs/issues/22-projects-color.md).
 * The filters are real links
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
                  className={`${filterBase} ${
                    current
                      ? "bg-accent-strong text-white"
                      : "border-[1.5px] border-accent-line bg-accent-tint text-ink hover:border-accent"
                  }`}
                >
                  {option.key ? (
                    <span
                      aria-hidden="true"
                      className={`size-[9px] shrink-0 rounded-[2px] ${
                        current ? "bg-on-dark-accent" : "bg-accent"
                      }`}
                    />
                  ) : null}
                  {option.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
        {visible.map((card, index) => (
          <WorkCard
            key={card.slug}
            variant="strip"
            strip={{
              number: index + 1,
              label: filters[card.pillar],
              right: card.live ? LIVE_LABEL : undefined,
            }}
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
