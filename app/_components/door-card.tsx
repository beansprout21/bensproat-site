import { ArrowOut } from "./icons";

export type DoorCardProps = {
  /** 1-based position, rendered as "01". */
  number: number;
  title: string;
  /** The door leads off the site; shows the arrow-out icon. */
  external?: boolean;
  selected: boolean;
  /** id of the panel this tile updates. */
  controls: string;
  onToggle: () => void;
};

const base =
  "group flex aspect-square min-w-0 flex-col justify-between rounded-card border-[3px] border-accent-strong p-[clamp(14px,2vw,22px)] text-left transition-[transform,background-color,color] duration-[260ms,200ms,200ms] ease-out";

/**
 * A visitor door on the home page (docs/issues/19-home-refresh.md): a square
 * toggle button. Picking it fills the panel under the tiles; hover and focus
 * only change its own styles.
 */
export function DoorCard({
  number,
  title,
  external = false,
  selected,
  controls,
  onToggle,
}: DoorCardProps) {
  const state = selected
    ? "bg-accent-strong text-white motion-safe:[transform:scale(1.07)]"
    : "bg-surface text-ink hover:bg-accent-tint";
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-controls={controls}
      onClick={onToggle}
      className={`${base} ${state}`}
    >
      <span className="flex items-start justify-between gap-2">
        <span
          className={`font-mono text-[13px] font-semibold tracking-[0.1em] ${
            selected ? "text-white" : "text-accent-strong"
          }`}
        >
          {String(number).padStart(2, "0")}
        </span>
        {external ? (
          <ArrowOut
            className={selected ? "text-white" : "text-accent-strong"}
          />
        ) : null}
      </span>
      <span className="font-display text-[clamp(19px,2vw,24px)] leading-[1.15] font-bold tracking-[-0.015em]">
        {title}
      </span>
    </button>
  );
}
