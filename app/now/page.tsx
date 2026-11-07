import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getNow, getProfile } from "@/lib/content";
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

/** /now (brief 4.10): paragraphs and bullets from content/now.mdx with the updated date. */
export default function Page() {
  return (
    <Container
      as="section"
      aria-label={title}
      className="flex flex-col gap-6 pt-16 pb-16"
    >
      <div className="flex flex-col gap-3">
        <h1 className="type-title">{title}</h1>
        <p className="type-mono-label text-muted">
          Updated {formatDate(now.updated)}
        </p>
      </div>
      {now.paragraphs.length > 0 ? <Prose paragraphs={now.paragraphs} /> : null}
      {now.items && now.items.length > 0 ? (
        <ul className="m-0 flex max-w-[64ch] list-none flex-col gap-2.5 p-0">
          {now.items.map((item) => (
            <li key={item} className="type-body flex gap-3 text-ink-2">
              <span
                className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </Container>
  );
}
