import type { ReactNode } from "react";

type ContainerProps = {
  as?: "div" | "section" | "article" | "nav" | "header" | "footer";
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
};

/** Centered 1120px column with the responsive side padding from brief 1.4. */
export function Container({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag className={`container-x ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
