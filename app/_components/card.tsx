import type { ReactNode } from "react";

type CardProps = {
  as?: "div" | "article" | "section" | "li";
  className?: string;
  children: ReactNode;
};

/** Surface card (brief 1.5): white, 1px line border, 12px radius, 24px padding. */
export function Card({ as: Tag = "div", className = "", children }: CardProps) {
  return (
    <Tag
      className={`flex min-w-0 flex-col gap-3 rounded-card border border-line bg-surface p-6 ${className}`}
    >
      {children}
    </Tag>
  );
}
