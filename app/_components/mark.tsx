type MarkProps = {
  size?: 24 | 26;
  className?: string;
};

/**
 * The sprout mark (brief 1.5). Stroke in the accent color; the draw-on
 * animation lives in globals.css under `.mark` and is disabled by
 * prefers-reduced-motion. Decorative, so hidden from assistive tech.
 */
export function Mark({ size = 26, className = "" }: MarkProps) {
  return (
    <svg
      className={`mark shrink-0 text-accent ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21V10.5" />
      <path d="M12 14.5C9 14.5 6.2 12.4 5.5 8.6C9.3 8.3 12 10.6 12 14.5Z" />
      <path d="M12 10.5C12 6.6 14.8 4.2 18.6 4C18 7.9 15.2 10.5 12 10.5Z" />
    </svg>
  );
}
