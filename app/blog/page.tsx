import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "blog",
  description:
    "articles on digital marketing, web development, and the ai tools i build and use, written by ron deniele d. paragoso.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/blog`,
    title: `blog | ${siteConfig.name}`,
    description:
      "articles on digital marketing, web development, and the ai tools i build and use.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1024,
        height: 1024,
        alt: siteConfig.name,
      },
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "home", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "blog",
      item: `${siteConfig.url}/blog`,
    },
  ],
};

export default function BlogsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Reveal>
        <p className="text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-foreground">
            home
          </Link>{" "}
          / blog
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
          blog
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          thoughts and write-ups on digital marketing, web development, and
          the ai tools i build and use.
        </p>
      </Reveal>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {blogPosts.map((post, i) => (
          <li key={post.slug}>
            <Reveal delay={i * 100}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-card transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden bg-line/50">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <time
                    dateTime={post.date}
                    className="text-xs text-muted"
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="mt-2 text-base font-medium">
                    {post.shortTitle ?? post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {post.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
