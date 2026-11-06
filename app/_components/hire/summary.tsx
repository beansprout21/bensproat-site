import type { PageContent } from "@/lib/content";
import { Card } from "../card";

type Hire = PageContent<"hire">;

/** The three skill cards from content/pages/hire.yaml, shared by /hire and /resume. */
export function SkillsGrid({ skills }: { skills: Hire["skills"] }) {
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
}: {
  experience: Hire["experience"];
}) {
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

/** The education paragraph, shared by /hire and /resume. */
export function EducationBlock({
  education,
}: {
  education: Hire["education"];
}) {
  return <p className="type-body max-w-[60ch] text-ink-2">{education.text}</p>;
}
