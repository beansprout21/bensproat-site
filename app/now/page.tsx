import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getNow, getProfile } from "@/lib/content";
import { CardStrip } from "../_components/card-strip";
import { Container } from "../_components/container";
import { formatDate } from "../_components/format-date";
import { Prose } from "../_components/prose";

const now = getNow();
const profile = getProfile();
const title = now.title ?? "Now";

export const metadata: Metadata = pageMetadata({
  title,
  description: now.description ?? profile.oneLiner,
  path: "/now",
});

/** "2026-11-07" to "Nov 2026" (UTC, like formatDate). */
function monthYear(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function Check() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

/** /now (brief 4.10, docs/issues/24-now-contact-resume-color.md): updated tag, the bullets in one card, then any paragraphs. */
export default function Page() {
  return (
    <Container
      as="section"
      aria-label={title}
      className="flex flex-col gap-8 pt-16 pb-16"
    >
      <div className="flex flex-col items-start gap-4">
        <p className="rounded-[6px] border-[1.5px] border-accent-line bg-accent-tint px-2.5 py-[5px] font-mono text-[12px] leading-[1.2] font-semibold tracking-[0.06em] text-ink uppercase">
          Updated {formatDate(now.updated)}
        </p>
        <h1 className="type-title">{title}</h1>
      </div>
      {now.items && now.items.length > 0 ? (
        <section
          aria-label={now.cardLabel ?? title}
          className="w-full max-w-[780px] overflow-hidden rounded-card border-[1.5px] border-accent-strong bg-surface"
        >
          <CardStrip
            label={now.cardLabel ?? title}
            right={monthYear(now.updated)}
          />
          <ul className="m-0 flex list-none flex-col p-0">
            {now.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 border-b border-accent-divider px-[22px] py-[18px] text-[18px] leading-[1.5] text-ink last:border-b-0"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-[6px] bg-accent text-white">
                  <Check />
                </span>
                <span className="min-w-0 pt-px">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {now.paragraphs.length > 0 ? <Prose paragraphs={now.paragraphs} /> : null}
    </Container>
  );
}
