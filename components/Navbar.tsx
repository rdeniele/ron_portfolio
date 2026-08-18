"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site";

const links = [
  { label: "services", href: "/#services" },
  { label: "works", href: "/#works" },
  { label: "about", href: "/#about" },
  { label: "career", href: "/#career" },
  { label: "blog", href: "/blog" },
  { label: "contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur">
      <nav
        aria-label="main navigation"
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
      >
        <a
          href="/"
          aria-label="go to home"
          className="text-lg font-semibold tracking-widest"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setOpen(false);
          }}
        >
          {siteConfig.initials}
        </a>

        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="relative text-sm text-muted transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? "close menu" : "open menu"}
          aria-expanded={open}
          className="-m-2 flex flex-col gap-1.5 p-2 sm:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-px w-6 bg-foreground" />
          <span className="h-px w-6 bg-foreground" />
        </button>
      </nav>

      {open && (
        <ul className="border-t border-line px-6 py-4 sm:hidden">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="block py-2 text-sm text-muted transition-colors hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
