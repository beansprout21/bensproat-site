import Link from "next/link";
import { ArrowOut } from "./icons";

export type DoorCardProps = {
  title: string;
  text: string;
  href: string;
  external?: boolean;
  /** This door is being previewed. */
  active?: boolean;
  /** Another door is being previewed. */
  dimmed?: boolean;
  /** Pointer entered the card (the home page gates this on hover-capable devices). */
  onEnter?: () => void;
  /** Keyboard focus reached the card; previews on every device. */
  onFocusEnter?: () => void;
  /** Pointer left or focus moved away. */
  onLeave?: () => void;
};

const base =
  "flex min-w-0 flex-col gap-2 rounded-card border p-[22px] no-underline transition-[border-color,background-color,opacity] duration-[180ms] ease-out";

/**
 * A visitor door (brief 1.5 and section 2): the whole card is a plain link.
 * Hover and focus handlers let the home page preview a visitor's order.
 */
export function DoorCard({
  title,
  text,
  href,
  external = false,
  active = false,
  dimmed = false,
  onEnter,
  onFocusEnter,
  onLeave,
}: DoorCardProps) {
  const className = `${base} ${
    active ? "border-accent bg-accent-tint" : "border-line bg-surface"
  } ${dimmed ? "opacity-[0.72]" : ""}`;
  const handlers = {
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onFocus: onFocusEnter ?? onEnter,
    onBlur: onLeave,
  };
  const body = (
    <>
      <span className="flex items-center gap-2 font-display text-[22px] leading-[1.2] font-semibold tracking-[-0.01em] text-ink">
        {title}
        {external ? <ArrowOut className="text-accent" /> : null}
      </span>
      <span className="text-[14.5px] leading-[1.5] text-ink-2">{text}</span>
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...handlers}
      >
        {body}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...handlers}>
      {body}
    </Link>
  );
}
