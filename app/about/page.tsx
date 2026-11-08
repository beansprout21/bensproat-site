import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { getPage, getProfile, resolveImage } from "@/lib/content";
import { buildProfilePage, serializeJsonLd } from "@/lib/jsonld";
import { Bricks } from "../_components/about/bricks";
import { CardStrip } from "../_components/card-strip";
import { Container } from "../_components/container";

const page = getPage("about");

export const metadata: Metadata = pageMetadata({
  title: page.meta.title,
  description: page.meta.description,
  path: "/about",
});

/** /about (brief 4.4). Every string comes from content/pages/about.yaml; photos arrive with #10. */
export default function Page() {
  const profile = getProfile();
  const { threads, timeline, offKeyboard } = page;
  const headerImage = resolveImage(page.header.image);
  const grassImage = resolveImage(offKeyboard.image);
  // The most recent year gets the brighter badge.
  const latestYear = timeline.items
    .map((item) => item.year)
    .reduce((latest, year) => (year > latest ? year : latest));

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
            className="h-auto max-h-[520px] w-full rounded-image border-[7px] border-accent-strong object-cover"
          />
        </Container>
      ) : null}

      <Container
        as="section"
        aria-label="Introduction"
        className="flex flex-col gap-4 pt-12 pb-10"
      >
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
            <h1 className="type-title">{page.title}</h1>
            <p className="type-lede max-w-[60ch] text-ink-2">{page.lede}</p>
          </div>
          <Bricks className="max-[720px]:hidden" />
        </div>
        <p className="type-body max-w-[64ch] text-ink-2">{page.bio}</p>
      </Container>

      <section
        aria-label={threads.heading}
        className="border-y border-accent-line bg-accent-tint"
      >
        <Container className="flex flex-col gap-6 py-14">
          <h2 className="type-h2">{threads.heading}</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
            {threads.items.map((thread, index) => (
              <article
                key={thread.title}
                className="flex min-w-0 flex-col overflow-hidden rounded-card border-[1.5px] border-accent-strong bg-surface"
              >
                {/* The strip is a div, so the heading role sits on a wrapper. */}
                <div role="heading" aria-level={3}>
                  <CardStrip number={index + 1} label={thread.title} />
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <p className="border-l-4 border-on-dark-accent pl-3 font-display text-[19px] leading-[1.35] font-bold text-ink">
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
                        className="flex gap-3 text-[14.5px] leading-[1.55] text-ink-2"
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
        <ol className="m-0 flex max-w-[72ch] list-none flex-col p-0">
          {timeline.items.map((item) => (
            <li
              key={item.year + item.text}
              className="relative grid grid-cols-[84px_1fr] items-start gap-x-4 py-3 before:absolute before:top-0 before:bottom-0 before:left-[24px] before:w-[3px] before:bg-accent-line first:before:top-6 last:before:bottom-auto last:before:h-6"
            >
              <span
                className={`relative w-fit rounded-[6px] px-2.5 py-[5px] font-mono text-[13px] leading-[1.1] font-semibold text-white ${
                  item.year === latestYear ? "bg-accent" : "bg-accent-strong"
                }`}
              >
                {item.year}
              </span>
              <span className="text-[16px] leading-[1.55] text-ink-2">
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
            className="h-auto w-full rounded-image border-[7px] border-accent-strong object-cover"
          />
        ) : null}
      </Container>
    </>
  );
}
