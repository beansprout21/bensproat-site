import type { Metadata } from "next";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { Card } from "../_components/card";
import { Container } from "../_components/container";
import { LinkRow } from "../_components/link-row";
import { PipelineRow } from "../_components/project/pipeline-row";
import { Prose } from "../_components/prose";

const page = getPage("ventures");

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
};

/** /ventures, "Build with me" (brief 4.2). Every string comes from content/pages/ventures.yaml. */
export default function Page() {
  const { nowBuilding, howIBuild, lookingFor, supportingProof } = page;

  return (
    <>
      <Container
        as="section"
        aria-label="Introduction"
        className="flex flex-col gap-3 pt-16 pb-10"
      >
        <p className="type-mono-label text-muted">{page.eyebrow}</p>
        <h1 className="type-title max-w-[22ch]">{page.title}</h1>
        <p className="type-lede max-w-[60ch] text-ink-2">{page.lede}</p>
      </Container>

      <Container
        as="section"
        aria-label={nowBuilding.heading}
        className="flex flex-col gap-6 pb-14"
      >
        <h2 className="type-h2">{nowBuilding.heading}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
          {nowBuilding.items.map((item) => (
            <Card as="article" key={item.title}>
              <h3 className="type-h3">{item.title}</h3>
              <p className="text-[15px] leading-[1.55] text-ink-2">
                {item.text}
              </p>
              <LinkRow links={item.links} className="mt-auto" />
            </Card>
          ))}
        </div>
      </Container>

      <section
        aria-label={howIBuild.heading}
        className="border-y border-line bg-ground-2"
      >
        <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-center gap-10 py-14">
          <div className="flex min-w-0 flex-col gap-4">
            <h2 className="type-h2">{howIBuild.heading}</h2>
            <Prose paragraphs={howIBuild.paragraphs} />
            <LinkRow links={howIBuild.links} />
          </div>
          <div className="min-w-0 rounded-card border border-line bg-surface p-6">
            <PipelineRow steps={howIBuild.pipeline} />
          </div>
        </Container>
      </section>

      {lookingFor.text ? (
        <Container
          as="section"
          aria-label={lookingFor.heading}
          className="flex flex-col gap-4 pt-14"
        >
          <h2 className="type-h2">{lookingFor.heading}</h2>
          <p className="type-body max-w-[60ch] text-ink-2">{lookingFor.text}</p>
        </Container>
      ) : null}

      <Container as="section" aria-label="Supporting proof" className="py-14">
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-x-8 gap-y-6 border-t border-line p-0 pt-6">
          {supportingProof.map((item) => (
            <li key={item.label} className="flex min-w-0 flex-col gap-1.5">
              {item.href ? (
                <Link
                  href={item.href}
                  className="type-mono-label text-accent underline underline-offset-4 hover:text-accent-strong"
                >
                  {item.label}
                </Link>
              ) : (
                <p className="type-mono-label text-muted">{item.label}</p>
              )}
              {item.detail ? (
                <p className="text-[15px] leading-[1.5] text-ink">
                  {item.detail}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
