"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NavLinkList, menuButtonClass, type NavItem } from "./nav-link-list";

const PANEL_ID = "nav-menu-panel";

/**
 * The phone menu (issue #67): below 900 px the header shows this button in
 * place of the eight links. Pressing it opens a panel under the header with
 * one link per row. Escape closes the panel and returns focus to the button;
 * choosing a link closes it. At 900 px and up nothing here is visible.
 */
export function NavMenu({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => setOpen((value) => !value)}
        className={menuButtonClass}
      >
        {open ? "Close" : "Menu"}
      </button>
      <div
        id={PANEL_ID}
        hidden={!open}
        className="absolute top-full right-0 left-0 z-20 border-b border-line bg-ground shadow-[0_12px_24px_-16px_rgba(21,23,26,0.35)] min-[900px]:hidden"
      >
        <div className="container-x flex flex-col py-2">
          <NavLinkList
            items={items}
            pathname={pathname}
            linkClassName="flex min-h-[48px] items-center rounded-button px-3 text-[17px] no-underline"
            onNavigate={() => setOpen(false)}
          />
        </div>
      </div>
    </>
  );
}
