import type { PageContent } from "@/lib/content";
import { Card } from "../card";

type Hire = PageContent<"hire">;

/**
 * "default" for /hire. "carded" for /resume (docs/issues/24-now-contact-resume-color.md):
 * the block sits inside a shared strip card, so skills drop their own card
 * borders and experience rows get light-green dividers.
 */
type Variant = "default" | "carded";

/** The three skill cards from content/pages/hire.yaml, shared by /hire and /resume. */
export function SkillsGrid({
  skills,
  variant = "default",
}: {
  skills: Hire["skills"];
  variant?: Variant;
}) {
  if (variant === "carded") {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-x-8 gap-y-6">
        {skills.items.map((group) => (
          <div key={group.title} className="flex min-w-0 flex-col gap-3">
            <h3 className="type-h3">{group.title}</h3>
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[15px] leading-[1.55] text-ink-2"
                >
                  <span
                    className="mt-[0.5em] size-2 shrink-0 rounded-[2px] bg-accent"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
      {skills.items.map((group) => (
        <Card as="article" key={group.title}>
          <h3 className="type-h3">{group.title}</h3>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
            {group.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[15px] leading-[1.55] text-ink-2"
              >
                <span
                  className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}

/** The experience list with mono dates, shared by /hire and /resume. */
export function ExperienceList({
  experience,
  variant = "default",
}: {
  experience: Hire["experience"];
  variant?: Variant;
}) {
  if (variant === "carded") {
    return (
      <ul className="m-0 flex list-none flex-col p-0">
        {experience.items.map((item) => (
          <li
            key={item.dates + item.text}
            className="grid gap-x-4 gap-y-1 border-b border-accent-divider py-3.5 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[150px_1fr]"
          >
            <span className="font-mono text-[12.5px] font-semibold tracking-[0.04em] text-ink">
              {item.dates}
            </span>
            <span className="text-[15.5px] leading-[1.55] text-ink-2">
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="m-0 flex list-none flex-col border-t border-line p-0">
      {experience.items.map((item) => (
        <li
          key={item.dates + item.text}
          className="grid gap-x-4 gap-y-1 border-b border-line py-4 sm:grid-cols-[160px_1fr]"
        >
          <span className="font-mono text-[12.5px] tracking-[0.04em] text-muted">
            {item.dates}
          </span>
          <span className="text-[15.5px] leading-[1.55] text-ink-2">
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** The education list with mono dates, shared by /hire and /resume (same rows as experience). */
export function EducationBlock({
  education,
  variant = "default",
}: {
  education: Hire["education"];
  variant?: Variant;
}) {
  return <ExperienceList experience={education} variant={variant} />;
}
