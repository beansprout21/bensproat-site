"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import type { DoorKey, HomeState } from "@/lib/content";
import { Button } from "../button";
import { Container } from "../container";
import { DoorCard } from "../door-card";
import { ProofCard } from "../proof-card";
import { WorkCard } from "../work-card";

type LinkProps = { label: string; href: string; external?: boolean };

export type HomeRouterProps = {
  hero: {
    name: string;
    headline: string;
    sub: string;
    availability: string | null;
    resume: LinkProps;
    email: LinkProps;
    photo: { src: string; alt: string; width: number; height: number } | null;
  };
  /** Default state plus one per door key. */
  states: { default: HomeState } & Partial<Record<DoorKey, HomeState>>;
  proof: {
    eyebrowPrefix: string;
    caption: string;
    items: {
      slug: string;
      kind: string;
      title: string;
      text: string;
      live: { label: string; url: string } | null;
      page: { label: string; href: string };
    }[];
  };
  doors: {
    heading: string;
    lede: string;
    items: {
      key: DoorKey;
      title: string;
      text: string;
      href: string;
      external: boolean;
    }[];
  };
  work: {
    heading: string;
    all: LinkProps;
    items: {
      slug: string;
      title: string;
      summary: string;
      tags: string[];
      cover: { src: string; alt: string } | null;
      live: { label: string; url: string } | null;
      page: { label: string; href: string };
    }[];
  };
};

const sectionHeading =
  "font-display text-[clamp(28px,3vw,36px)] leading-[1.1] font-bold tracking-[-0.02em] text-ink";

/** Exactly three columns above 720px and one below (brief 1.4); the reorder depends on it. */
const grid3 = "grid grid-cols-1 gap-5 min-[721px]:grid-cols-3";

/**
 * Reorder animation (brief section 2): DOM order stays fixed. Above 720px a
 * card slides to its slot with translateX(shift * (100% + gap)); below it the
 * grid uses `order` and no transform. --slot and --shift come from moverStyle.
 */
const mover =
  "transition-transform duration-[420ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] max-[720px]:[order:var(--slot)] min-[721px]:[transform:translateX(calc(var(--shift)*(100%_+_20px)))]";

/** Position of each card for the current order: slot (0-based) and shift from its DOM index. */
function positions(slugs: string[], order: string[]) {
  return slugs.map((slug, index) => {
    const slot = order.indexOf(slug);
    return slot === -1
      ? { slot: index, shift: 0 }
      : { slot, shift: slot - index };
  });
}

function moverStyle(position: { slot: number; shift: number }): CSSProperties {
  return {
    "--slot": position.slot,
    "--shift": position.shift,
  } as CSSProperties;
}

/**
 * The home page's one client component (brief section 2). Owns the door
 * state; hover or focus on a door previews that visitor's order, leaving it
 * restores the default. Every door is a plain link, so nothing here is needed
 * for the page to work without JavaScript.
 */
export function HomeRouter({
  hero,
  states,
  proof,
  doors,
  work,
}: HomeRouterProps) {
  const [door, setDoor] = useState<DoorKey | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const state = (door && states[door]) || states.default;
  const proofPositions = positions(
    proof.items.map((item) => item.slug),
    state.order,
  );
  const workPositions = positions(
    work.items.map((item) => item.slug),
    state.order,
  );

  return (
    <>
      <Container
        as="section"
        aria-label="Introduction"
        className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-center gap-10 pt-16 pb-14"
      >
        <div className="flex min-w-0 flex-col gap-[22px]">
          <p className="font-display text-[18px] font-semibold text-ink">
            {hero.name}
          </p>
          <h1 className="type-display text-ink">{hero.headline}</h1>
          <p className="max-w-[44ch] text-[20px] leading-[1.5] text-ink-2">
            {hero.sub}
          </p>
          {hero.availability ? (
            <p className="inline-flex items-center gap-2.5 font-mono text-[12.5px] tracking-[0.02em] text-ink-2">
              <span
                className="size-2 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              {hero.availability}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-3 pt-1.5">
            <Button href={state.cta.href} external={state.cta.external}>
              {state.cta.label}
            </Button>
            <Button href={hero.resume.href} variant="secondary">
              {hero.resume.label}
            </Button>
            <Button href={hero.email.href} variant="text">
              {hero.email.label}
            </Button>
          </div>
        </div>
        {hero.photo ? (
          <div className="flex min-w-0 justify-end">
            <Image
              src={hero.photo.src}
              alt={hero.photo.alt}
              width={hero.photo.width}
              height={hero.photo.height}
              sizes="(min-width: 800px) 420px, 100vw"
              loading="eager"
              fetchPriority="high"
              className="h-auto w-full max-w-[420px] rounded-image border border-line object-cover"
            />
          </div>
        ) : null}
      </Container>

      <section aria-label="Proof" className="border-y border-line bg-ground-2">
        <Container className="flex flex-col gap-[22px] py-11">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="type-mono-label text-muted">
              {proof.eyebrowPrefix} {state.who}
            </p>
            <p className="text-[14px] text-muted">{proof.caption}</p>
          </div>
          <div className={grid3}>
            {proof.items.map((item, index) => (
              <ProofCard
                key={item.slug}
                rank={proofPositions[index].slot + 1}
                kind={item.kind}
                title={item.title}
                text={item.text}
                live={item.live}
                page={item.page}
                className={mover}
                style={moverStyle(proofPositions[index])}
              />
            ))}
          </div>
        </Container>
      </section>

      <Container
        as="section"
        aria-label="Choose your path"
        className="flex flex-col gap-[26px] pt-16 pb-14"
      >
        <div className="flex max-w-[60ch] flex-col gap-2.5">
          <h2 className={sectionHeading}>{doors.heading}</h2>
          <p className="text-[17px] leading-[1.5] text-ink-2">{doors.lede}</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-4">
          {doors.items.map((item) => (
            <DoorCard
              key={item.key}
              title={item.title}
              text={item.text}
              href={item.href}
              external={item.external}
              active={door === item.key}
              dimmed={door !== null && door !== item.key}
              onEnter={() => {
                if (canHover) setDoor(item.key);
              }}
              onFocusEnter={() => setDoor(item.key)}
              onLeave={() => setDoor(null)}
            />
          ))}
        </div>
      </Container>

      <Container
        as="section"
        aria-label={work.heading}
        className="flex flex-col gap-[26px] pt-6 pb-16"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="work" className={sectionHeading}>
            {work.heading}
          </h2>
          <Link
            href={work.all.href}
            className="inline-flex min-h-[44px] items-center text-[14.5px] font-semibold text-accent no-underline hover:text-accent-strong"
          >
            {work.all.label}
          </Link>
        </div>
        <div className={grid3}>
          {work.items.map((item, index) => (
            <WorkCard
              key={item.slug}
              title={item.title}
              summary={item.summary}
              tags={item.tags}
              cover={item.cover}
              live={item.live}
              page={item.page}
              className={mover}
              style={moverStyle(workPositions[index])}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
