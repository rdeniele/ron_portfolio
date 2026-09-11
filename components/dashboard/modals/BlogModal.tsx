import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";

const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function BlogModal() {
  return (
    <div className="px-5 py-5 sm:px-7 sm:py-6">
      <ul className="divide-y divide-line">
        {posts.map((post, i) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              data-autofocus={i === 0 || undefined}
              className="group/post flex gap-4 py-4 transition-colors duration-150 first:pt-0"
            >
              <div className="relative hidden h-20 w-28 shrink-0 overflow-hidden rounded-md border border-line bg-sunk sm:block">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-300 group-hover/post:scale-[1.04]"
                />
              </div>

              <div className="min-w-0">
                <p className="label text-faint">{formatDate(post.date)}</p>
                <h3 className="mt-1 font-serif text-lead leading-snug text-ink transition-colors duration-150 group-hover/post:text-accent-ink">
                  {post.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-fine leading-relaxed text-muted">
                  {post.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/blog"
        className="label mt-5 inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-2 text-ink transition-[border-color,background-color,transform] duration-150 hover:border-accent hover:bg-accent-soft active:scale-[0.97]"
      >
        all posts
        <span aria-hidden="true">&#8594;</span>
      </Link>
    </div>
  );
}
