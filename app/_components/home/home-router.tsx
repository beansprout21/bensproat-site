"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { DoorKey } from "@/lib/content";
import { Button } from "../button";
import { Container } from "../container";
import { DoorCard } from "../door-card";
import { ArrowOut } from "../icons";
import { SelectedWorkCard } from "./selected-work-card";

type LinkProps = { label: string; href: string; external?: boolean };

type Door = {
  key: DoorKey;
  title: string;
  kicker: string;
  text: string;
  ctaLabel: string;
  href: string;
  external: boolean;
};

export type HomeRouterProps = {
  hero: {
    name: string;
    headline: string;
    /** Exact ending of `headline`, shown in the accent color. */
    headlineAccent: string | null;
    sub: string;
    availability: string | null;
    cta: LinkProps;
    resume: LinkProps;
    email: LinkProps;
    photo: { src: string; alt: string; width: number; height: number } | null;
    photoTag: string | null;
  };
  doors: {
    heading: string;
    lede: string;
    panel: { label: string; text: string };
    items: Door[];
  };
  work: {
    label: string;
    heading: string;
    all: LinkProps;
    items: {
      slug: string;
      kind: string;
      title: string;
      text: string;
      tags: string[];
      live: { label: string; url: string } | null;
      page: { label: string; href: string };
    }[];
  };
};

const sectionHeading =
  "font-display text-[clamp(28px,3vw,36px)] leading-[1.1] font-bold tracking-[-0.02em] text-ink";

const PANEL_ID = "door-panel";

/** One row of the panel: mono label, paragraph, and the button when a door is picked. */
function PanelRow({
  label,
  text,
  action,
}: {
  label: string;
  text: string;
  action: ReactNode;
}) {
  return (
    <div className="flex flex-wrap content-start items-start gap-x-6 gap-y-2 self-start [grid-area:1/1]">
      <p className="type-mono-label basis-full text-ink">{label}</p>
      <p className="min-w-0 flex-[1_1_320px] py-[11px] text-[16px] leading-[1.5] text-ink">
        {text}
      </p>
      {action}
    </div>
  );
}

/** A stand-in the size of the panel's primary button, for the height sizer. */
function ButtonShape({ door }: { door: Door }) {
  return (
    <span className="inline-flex min-h-[46px] items-center gap-2 px-5 text-[15px] leading-none font-semibold">
      {door.ctaLabel}
      {door.external ? <ArrowOut /> : null}
    </span>
  );
}

/**
 * The home page's one client component (docs/issues/19-home-refresh.md). It
 * holds the picked door, which fills the panel under the tiles. Nothing else
 * on the page changes: the hero button and the Selected work order are fixed.
 */
export function HomeRouter({ hero, doors, work }: HomeRouterProps) {
  const [picked, setPicked] = useState<DoorKey | null>(null);
  const door = doors.items.find((item) => item.key === picked) ?? null;

  const headlineStart = hero.headlineAccent
    ? hero.headline.slice(0, hero.headline.length - hero.headlineAccent.length)
    : hero.headline;

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
          <h1 className="type-display text-ink">
            {headlineStart}
            {hero.headlineAccent ? (
              <span className="text-accent">{hero.headlineAccent}</span>
            ) : null}
          </h1>
          <p className="max-w-[44ch] text-[20px] leading-[1.5] text-ink">
            {hero.sub}
          </p>
          {hero.availability ? (
            <p className="inline-flex items-center gap-3.5 pl-1 font-mono text-[13px] tracking-[0.02em] text-ink">
              <span
                className="size-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_0_4px_var(--color-accent-line)]"
                aria-hidden="true"
              />
              {hero.availability}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-3 pt-1.5">
            <Button href={hero.cta.href} external={hero.cta.external}>
              {hero.cta.label}
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
            <div className="relative w-full max-w-[438px] pr-2.5 pb-2.5 min-[721px]:pr-[18px] min-[721px]:pb-[18px]">
              <div
                aria-hidden="true"
                className="absolute inset-0 top-2.5 left-2.5 rounded-image bg-accent-line min-[721px]:top-[18px] min-[721px]:left-[18px]"
              />
              <div className="relative">
                <Image
                  src={hero.photo.src}
                  alt={hero.photo.alt}
                  width={hero.photo.width}
                  height={hero.photo.height}
                  sizes="(min-width: 800px) 420px, calc(100vw - 50px)"
                  loading="eager"
                  fetchPriority="high"
                  className="block h-auto w-full rounded-image border-[7px] border-accent-strong object-cover"
                />
                {hero.photoTag ? (
                  <p className="absolute bottom-5 left-5 rounded-full bg-accent-strong px-[13px] py-[7px] font-mono text-[12px] leading-none font-semibold tracking-[0.08em] text-white uppercase">
                    {hero.photoTag}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </Container>

      <Container
        as="section"
        aria-labelledby="doors-heading"
        className="flex flex-col gap-[26px] pt-14 pb-16"
      >
        <div className="flex max-w-[60ch] flex-col gap-2.5">
          <h2 id="doors-heading" className={sectionHeading}>
            {doors.heading}
          </h2>
          <p className="text-[17px] leading-[1.5] text-ink">{doors.lede}</p>
        </div>
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute top-1/2 right-[12.5%] left-[12.5%] h-1 -translate-y-1/2 bg-accent max-[720px]:hidden"
          />
          <div className="relative grid grid-cols-2 gap-5 min-[721px]:grid-cols-4 min-[721px]:gap-7">
            {doors.items.map((item, index) => (
              <DoorCard
                key={item.key}
                number={index + 1}
                title={item.title}
                external={item.external}
                selected={picked === item.key}
                controls={PANEL_ID}
                onToggle={() =>
                  setPicked((current) =>
                    current === item.key ? null : item.key,
                  )
                }
              />
            ))}
          </div>
        </div>
        <noscript>
          <ul className="flex flex-col gap-2">
            {doors.items.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className="text-[16px] font-semibold text-ink underline underline-offset-4"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </noscript>
        <div
          id={PANEL_ID}
          aria-live="polite"
          className={`grid rounded-card border-[1.5px] px-7 py-6 ${
            door ? "border-accent bg-accent-tint" : "border-line bg-surface"
          }`}
        >
          {/* Every state's content stacked invisibly in the same cell, so the
              panel is always as tall as the longest one: picking a door never
              moves anything below it, at any width. */}
          <div aria-hidden="true" className="invisible grid [grid-area:1/1]">
            <PanelRow
              label={doors.panel.label}
              text={doors.panel.text}
              action={null}
            />
            {doors.items.map((item) => (
              <PanelRow
                key={item.key}
                label={item.kicker}
                text={item.text}
                action={<ButtonShape door={item} />}
              />
            ))}
          </div>
          {door ? (
            <PanelRow
              label={door.kicker}
              text={door.text}
              action={
                <Button href={door.href} external={door.external}>
                  {door.ctaLabel}
                </Button>
              }
            />
          ) : (
            <PanelRow
              label={doors.panel.label}
              text={doors.panel.text}
              action={null}
            />
          )}
        </div>
      </Container>

      <section
        aria-labelledby="work"
        className="border-y border-accent-line bg-accent-tint"
      >
        <Container className="flex flex-col gap-[26px] py-16">
          <div className="flex flex-col gap-2.5">
            <p className="type-mono-label text-ink">{work.label}</p>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h2 id="work" className={sectionHeading}>
                {work.heading}
              </h2>
              <Link
                href={work.all.href}
                className="inline-flex min-h-[44px] items-center text-[14.5px] font-semibold text-accent-strong no-underline hover:text-ink"
              >
                {work.all.label}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 min-[721px]:grid-cols-3">
            {work.items.map((item, index) => (
              <SelectedWorkCard
                key={item.slug}
                number={index + 1}
                kind={item.kind}
                title={item.title}
                text={item.text}
                tags={item.tags}
                live={item.live}
                page={item.page}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
