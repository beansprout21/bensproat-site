import type { ReactNode } from "react";

type ContainerProps = {
  as?: "div" | "section" | "article" | "nav" | "header" | "footer";
  className?: string;
  children: ReactNode;
};

/** Centered 1120px column with the responsive side padding from brief 1.4. */
export function Container({
  as: Tag = "div",
  className = "",
  children,
}: ContainerProps) {
  return <Tag className={`container-x ${className}`}>{children}</Tag>;
}
