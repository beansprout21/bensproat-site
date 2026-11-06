type IconProps = {
  className?: string;
};

/** Arrow pointing out of the corner: marks links that open a new tab. */
export function ArrowOut({ className = "" }: IconProps) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 3h7v7M13 3L6 10" />
    </svg>
  );
}

/** Arrow pointing right: used between steps and on "next" style links. */
export function ArrowRight({ className = "" }: IconProps) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
