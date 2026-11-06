import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowOut } from "./icons";

type Variant = "primary" | "secondary" | "text";

const base =
  "inline-flex min-h-[46px] items-center justify-center gap-2 rounded-button px-5 text-[15px] leading-none font-semibold no-underline transition-[color,background-color,border-color]";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-strong",
  secondary:
    "border border-line-strong bg-surface px-[18px] text-ink hover:bg-ground-2",
  text: "px-2.5 font-medium text-ink-2 underline underline-offset-4 hover:text-ink",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type AnchorButtonProps = CommonProps & {
  href: string;
  /** Opens in a new tab with the arrow-out icon and a screen-reader note. */
  external?: boolean;
};

type RealButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
    external?: undefined;
  };

export type ButtonProps = AnchorButtonProps | RealButtonProps;

/** Buttons from brief 1.5. Renders an anchor whenever it has an href. */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    className = "",
    children,
    href,
    external,
    ...rest
  } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href !== undefined) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
          <ArrowOut />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      );
    }
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
