type SectionHeaderProps = {
  /** Mono eyebrow above the heading, for example "01 / Problem". */
  eyebrow?: string;
  title: string;
  lede?: string;
  /** 1 for a page title block, 2 (default) for a section. */
  level?: 1 | 2;
  id?: string;
  className?: string;
};

/** Eyebrow, heading and optional lede, capped at 64ch (brief 1.5). */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  level = 2,
  id,
  className = "",
}: SectionHeaderProps) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className={`flex max-w-[64ch] flex-col gap-3 ${className}`}>
      {eyebrow ? <p className="type-mono-label text-muted">{eyebrow}</p> : null}
      <Heading id={id} className={level === 1 ? "type-title" : "type-h2"}>
        {title}
      </Heading>
      {lede ? <p className="type-lede text-ink-2">{lede}</p> : null}
    </div>
  );
}
