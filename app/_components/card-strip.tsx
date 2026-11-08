export type CardStripProps = {
  /** 1-based position, rendered as "01" in a light-green circle. */
  number?: number;
  label: string;
  /** Optional label pinned to the right, for example "Live". */
  right?: string;
  className?: string;
};

/**
 * Dark-green header strip for colored cards (docs/issues/22-projects-color.md),
 * shared by /projects, /about and the /now, /contact and /resume cards.
 */
export function CardStrip({
  number,
  label,
  right,
  className = "",
}: CardStripProps) {
  return (
    <div
      className={`flex items-center gap-3 bg-accent-strong px-[18px] py-[11px] font-mono text-[12px] leading-[1.3] font-semibold tracking-[0.1em] text-white uppercase ${className}`}
    >
      {number !== undefined ? (
        <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-on-dark-accent text-[11px] tracking-[0.04em] text-ink">
          {String(number).padStart(2, "0")}
        </span>
      ) : null}
      <span className="min-w-0">{label}</span>
      {right ? <span className="ml-auto shrink-0">{right}</span> : null}
    </div>
  );
}
