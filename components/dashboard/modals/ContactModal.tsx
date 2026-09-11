"use client";

import Script from "next/script";
import { contact } from "@/lib/site";

export default function ContactModal() {
  return (
    <div className="px-5 py-6 sm:px-7">
      <p className="font-serif text-lead leading-snug text-ink">
        {contact.prompt}
      </p>

      <a
        href={`mailto:${contact.email}`}
        data-autofocus
        className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-line px-4 py-3 transition-[border-color,background-color,transform] duration-150 hover:border-accent hover:bg-accent-soft active:scale-[0.99]"
      >
        <span className="truncate text-body text-ink">{contact.email}</span>
        <span aria-hidden="true" className="shrink-0 text-accent">
          &#8599;
        </span>
      </a>

      <div className="mt-3 flex flex-wrap gap-2">
        {contact.socials.map((social) => (
          <a
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-muted transition-[border-color,color,transform] duration-150 hover:border-line-strong hover:text-ink active:scale-[0.97]"
          >
            {social.label}
            <span aria-hidden="true">&#8599;</span>
          </a>
        ))}
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <p className="label text-faint">or send a brief</p>
        <div className="mt-3 overflow-hidden rounded-lg border border-line">
          <div data-tf-live={contact.typeformId} />
        </div>
        <Script
          src="https://embed.typeform.com/next/embed.js"
          strategy="lazyOnload"
        />
      </div>
    </div>
  );
}
