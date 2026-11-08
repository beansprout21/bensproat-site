/**
 * Four stacked studded bricks in the site greens, shown beside the /about
 * title above 720 px (docs/issues/23-about-color.md). Decorative only.
 */
export function Bricks({ className = "" }: { className?: string }) {
  const outline = { stroke: "var(--color-accent-strong)", strokeWidth: 2 };
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 260 220"
      width="260"
      height="220"
      className={`flex-none ${className}`}
    >
      <g transform="translate(30 150)" fill="var(--color-accent-strong)">
        <rect x="0" y="10" width="200" height="56" rx="5" />
        <rect
          x="0"
          y="54"
          width="200"
          height="12"
          rx="3"
          fill="var(--color-accent-deep)"
        />
        <rect x="16" y="0" width="30" height="14" rx="3" />
        <rect x="62" y="0" width="30" height="14" rx="3" />
        <rect x="108" y="0" width="30" height="14" rx="3" />
        <rect x="154" y="0" width="30" height="14" rx="3" />
      </g>
      <g transform="translate(76 92)" fill="var(--color-accent)">
        <rect x="0" y="10" width="146" height="50" rx="5" />
        <rect
          x="0"
          y="50"
          width="146"
          height="10"
          rx="3"
          fill="var(--color-accent-strong)"
        />
        <rect x="14" y="0" width="28" height="14" rx="3" />
        <rect x="58" y="0" width="28" height="14" rx="3" />
        <rect x="102" y="0" width="28" height="14" rx="3" />
      </g>
      <g
        transform="translate(96 34) rotate(-8)"
        fill="var(--color-on-dark-accent)"
        {...outline}
      >
        <rect x="0" y="10" width="96" height="46" rx="5" />
        <rect x="14" y="0" width="26" height="14" rx="3" />
        <rect x="56" y="0" width="26" height="14" rx="3" />
      </g>
      <g
        transform="translate(206 120) rotate(14)"
        fill="var(--color-accent-line)"
        {...outline}
      >
        <rect x="0" y="8" width="40" height="30" rx="4" />
        <rect x="9" y="0" width="22" height="11" rx="3" />
      </g>
    </svg>
  );
}
