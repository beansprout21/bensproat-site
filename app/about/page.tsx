import type { Metadata } from "next";
import Image from "next/image";
import { getPage, getProfile, resolveImage } from "@/lib/content";
import { buildProfilePage, serializeJsonLd } from "@/lib/jsonld";
import { Container } from "../_components/container";

const page = getPage("about");

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
};

/** /about (brief 4.4). Every string comes from content/pages/about.yaml; photos arrive with #10. */
export default function Page() {
  const profile = getProfile();
  const { threads, timeline, offKeyboard } = page;
  const headerImage = resolveImage(page.header.image);
  const grassImage = resolveImage(offKeyboard.image);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildProfilePage(profile, "/about")),
        }}
      />

      {headerImage ? (
        <Container as="section" aria-label="Photo" className="pt-8">
          <Image
            src={headerImage}
            alt={page.header.alt}
            width={1600}
            height={1067}
            sizes="(min-width: 1200px) 1040px, calc(100vw - 40px)"
            loading="eager"
            fetchPriority="high"
            className="h-auto max-h-[520px] w-full rounded-image border border-line object-cover"
          />
        </Container>
      ) : null}

      <Container
        as="section"
        aria-label="Introduction"
        className="flex flex-col gap-4 pt-12 pb-10"
      >
        <h1 className="type-title">{page.title}</h1>
        <p className="type-lede max-w-[60ch] text-ink-2">{page.lede}</p>
        <p className="type-body max-w-[64ch] text-ink-2">{page.bio}</p>
      </Container>

      <section
        aria-label={threads.heading}
        className="border-y border-line bg-ground-2"
      >
        <Container className="flex flex-col gap-6 py-14">
          <h2 className="type-h2">{threads.heading}</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
            {threads.items.map((thread) => (
              <article
                key={thread.title}
                className="flex min-w-0 flex-col gap-3 rounded-card border border-line bg-surface p-6"
              >
                <h3 className="type-h3">{thread.title}</h3>
                <p className="font-display text-[18px] leading-[1.35] font-medium text-ink">
                  {thread.quote}
                </p>
                {thread.paragraph ? (
                  <p className="text-[15px] leading-[1.55] text-ink-2">
                    {thread.paragraph}
                  </p>
                ) : null}
                <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                  {thread.items.map((item) => (
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
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Container
        as="section"
        aria-label={timeline.heading}
        className="flex flex-col gap-6 pt-14 pb-10"
      >
        <h2 className="type-h2">{timeline.heading}</h2>
        <ol className="m-0 flex max-w-[72ch] list-none flex-col border-t border-line p-0">
          {timeline.items.map((item) => (
            <li
              key={item.year + item.text}
              className="grid gap-x-4 gap-y-1 border-b border-line py-4 sm:grid-cols-[96px_1fr]"
            >
              <span className="font-mono text-[12.5px] tracking-[0.04em] text-muted">
                {item.year}
              </span>
              <span className="text-[15.5px] leading-[1.55] text-ink-2">
                {item.text}
              </span>
            </li>
          ))}
        </ol>
      </Container>

      <Container
        as="section"
        aria-label={offKeyboard.heading}
        className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-center gap-10 pt-6 pb-16"
      >
        <div className="flex min-w-0 flex-col gap-4">
          <h2 className="type-h2">{offKeyboard.heading}</h2>
          <p className="type-body text-ink-2">{offKeyboard.paragraph}</p>
        </div>
        {grassImage ? (
          <Image
            src={grassImage}
            alt={offKeyboard.alt}
            width={1400}
            height={1050}
            sizes="(min-width: 800px) 50vw, 100vw"
            className="h-auto w-full rounded-image border border-line object-cover"
          />
        ) : null}
      </Container>
    </>
  );
}
