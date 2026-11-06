import type { ReactNode } from "react";

type PillProps = {
  className?: string;
  children: ReactNode;
};

/** 30px mono pill on the accent tint (brief 1.5). */
export function Pill({ className = "", children }: PillProps) {
  return (
    <span
      className={`inline-flex min-h-[30px] items-center rounded-full border border-accent-line bg-accent-tint px-3 font-mono text-[12px] tracking-[0.04em] text-accent-strong ${className}`}
    >
      {children}
    </span>
  );
}
