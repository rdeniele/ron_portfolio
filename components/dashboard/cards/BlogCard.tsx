import { blogPosts } from "@/lib/blog";

const latest = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))[0];

export default function BlogCard() {
  return (
    <div className="flex h-full items-center justify-between gap-3">
      <p className="truncate text-fine text-muted">
        <span className="text-accent-ink">latest</span>
        <span className="mx-1.5 text-line-strong">/</span>
        {latest.shortTitle ?? latest.title}
      </p>
      <span
        aria-hidden="true"
        className="shrink-0 text-accent transition-transform duration-200 group-hover/card:translate-x-0.5"
      >
        &#8594;
      </span>
    </div>
  );
}
