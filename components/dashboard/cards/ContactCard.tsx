import { contact } from "@/lib/site";

export default function ContactCard() {
  return (
    <div className="flex h-full items-center justify-between gap-3">
      <p className="truncate text-fine text-muted">{contact.email}</p>
      <span
        aria-hidden="true"
        className="shrink-0 text-accent-ink transition-transform duration-200 group-hover/card:translate-x-0.5"
      >
        &#8599;
      </span>
    </div>
  );
}
