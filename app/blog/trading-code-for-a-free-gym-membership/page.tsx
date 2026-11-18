import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site";
import { getBlogPost } from "@/lib/blog";

const post = getBlogPost("trading-code-for-a-free-gym-membership")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  keywords: post.keywords,
  alternates: {
    canonical: `/blog/${post.slug}`,
  },
  openGraph: {
    type: "article",
    url: `${siteConfig.url}/blog/${post.slug}`,
    siteName: siteConfig.name,
    title: post.title,
    description: post.description,
    publishedTime: post.date,
    authors: [siteConfig.name],
    images: [
      {
        url: post.image,
        width: 1200,
        height: 630,
        alt: post.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description,
    images: [post.image],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "home", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "blog",
          item: `${siteConfig.url}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `${siteConfig.url}/blog/${post.slug}`,
        },
      ],
    },
    {
      "@type": "Article",
      "@id": `${siteConfig.url}/blog/${post.slug}#article`,
      headline: post.title,
      description: post.description,
      image: `${siteConfig.url}${post.image}`,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      publisher: {
        "@type": "Person",
        name: siteConfig.name,
      },
      mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    },
  ],
};

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-14 text-xl font-semibold leading-snug sm:text-2xl">
      {children}
    </h2>
  );
}

function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-8 text-base font-semibold sm:text-lg">{children}</h3>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 leading-relaxed text-muted">{children}</p>;
}

function List({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
      {children}
    </ul>
  );
}

function Divider() {
  return <hr className="mt-14 border-line" />;
}

/** a tiktok video, played in place rather than linked out */
function TikTok({ id, title }: { id: string; title: string }) {
  return (
    <div className="mx-auto aspect-[9/16] w-full max-w-[325px] overflow-hidden rounded-lg border border-line bg-line/50">
      <iframe
        src={`https://www.tiktok.com/player/v1/${id}?music_info=1&description=1`}
        title={title}
        loading="lazy"
        allow="encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

function Strong({ children }: { children: ReactNode }) {
  return <strong className="text-foreground">{children}</strong>;
}

export default function BlogPostTradingCodeForAGymMembership() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Reveal>
        <p className="text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-foreground">
            home
          </Link>{" "}
          /{" "}
          <Link href="/blog" className="transition-colors hover:text-foreground">
            blog
          </Link>{" "}
          / {post.slug}
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
          {post.title.toLowerCase()}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span aria-hidden="true">·</span>
          <span>ron deniele d. paragoso</span>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="relative mt-8 aspect-video overflow-hidden rounded-lg border border-line bg-line/50">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      <div className="mt-10">
        <P>
          i build software for a living. my gym runs on a paper sign-in sheet
          and a whiteboard. so i made an offer: i build them a proper system,
          and in return i train there for free, for life.
        </P>
        <p className="mt-4 leading-relaxed text-muted">
          see it live:{" "}
          <a
            href="https://darylfitnessgym.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-2 hover:text-foreground"
          >
            darylfitnessgym.vercel.app
          </a>
        </p>

        <Divider />
        <H2>the short version</H2>
        <P>
          daryl fitness gym tracked memberships the old way: names on a paper
          sheet, end dates on a whiteboard. it works, but nobody can check their
          own membership, and the front desk has to keep everything in their
          head.
        </P>
        <P>
          i built a membership system that replaces both. members check their
          status on their phone, and the front desk renews plans, logs walk-ins
          and sees the day at a glance.
        </P>
        <P>
          the deal is simple. the gym gets a 7 to 14 day free trial. if they
          want to keep it, it&apos;s a deal: the system for a lifetime free
          membership. if not, i turn the system off. no hard feelings.
        </P>

        <Divider />
        <H2>the build, on tiktok</H2>
        <P>i posted the process as i went. here&apos;s where it stands.</P>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <TikTok
            id="7709349721466244372"
            title="will we get a free gym membership? let's find out"
          />
          <TikTok
            id="7709448963807530261"
            title="pitching my gym a system for a free lifetime membership"
          />
        </div>
        <p className="mt-4 text-center text-sm text-muted">
          more on{" "}
          <a
            href="https://www.tiktok.com/@ronddpixels_"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-2 hover:text-foreground"
          >
            @ronddpixels_
          </a>
        </p>

        <Divider />
        <H2>what the system does</H2>
        <H3>for members</H3>
        <List>
          <li>
            <Strong>register once:</Strong> name, mobile number, a 6-digit pin
            and an optional photo.
          </li>
          <li>
            <Strong>see your status:</Strong> pending until you pay at the desk,
            then active, expiring soon or expired, with the end date.
          </li>
          <li>
            <Strong>clock in and out with a qr code:</Strong> scan the code at
            the gym and your visit is logged.
          </li>
          <li>
            <Strong>install it:</Strong>{" "}it works as an app on android and
            iphone, and there&apos;s an android apk on the site.
          </li>
        </List>
        <H3>for the front desk</H3>
        <List>
          <li>
            <Strong>member list:</Strong> search and filter everyone, edit
            details, reset a pin or turn a member off.
          </li>
          <li>
            <Strong>renew in one tap:</Strong> weekly, half-month, monthly, or a
            set date.
          </li>
          <li>
            <Strong>walk-ins and a daily summary:</Strong> who came in today,
            and how the day went.
          </li>
          <li>
            <Strong>attendance:</Strong>{" "}who&apos;s in the gym right now, and
            visits per day.
          </li>
          <li>
            <Strong>roles:</Strong> owner and co-admin accounts, so the people
            running the gym each get their own login.
          </li>
        </List>
        <P>
          payment stays cash at the front desk. the app never touches money, it
          just keeps track of who has paid until when.
        </P>

        <Divider />
        <H2>the fix i found</H2>
        <P>
          once i pictured the system in a real gym, i noticed a gap. clocking in
          meant scanning a qr code with your phone. but not every member has a
          phone with them, and not everyone has mobile data.
        </P>
        <P>
          so the front desk can now clock members in and out for them. staff
          open the member, check their status and days left, and tap{" "}
          <Strong>clock in</Strong> or <Strong>clock out</Strong>. it follows
          the same rules as scanning: only active or expiring members can clock
          in, and the visit lands in the same attendance records. members who
          are inside get a green &quot;in gym&quot; tag on the list.
        </P>
        <P>
          a small change, but it means the system works for everyone who walks
          in, not just the people with a phone and a signal.
        </P>

        <Divider />
        <H2>how i built it</H2>
        <List>
          <li>
            <Strong>app:</Strong> next.js, typescript and tailwind css
          </li>
          <li>
            <Strong>database, login and photos:</Strong> supabase, with
            row-level security so members only ever see their own data
          </li>
          <li>
            <Strong>phones:</Strong> an installable web app, plus an android
            apk
          </li>
          <li>
            <Strong>hosting:</Strong> vercel
          </li>
        </List>
        <P>
          dates run on manila time, and money is in pesos, because that&apos;s
          where the gym is.
        </P>

        <Divider />
        <H2>what i learned</H2>
        <P>
          <Strong>build for the people at the desk.</Strong> the front desk is
          who uses this every day, so renewing a plan or clocking someone in has
          to take one tap, not a menu hunt.
        </P>
        <P>
          <Strong>not everyone has a phone or a signal.</Strong> a system that
          assumes everyone does leaves people out. the front-desk clock in was
          the fix.
        </P>
        <P>
          <Strong>a free trial lowers the risk for both sides.</Strong> the gym
          sees it working before agreeing to anything, and i find out quickly
          whether it&apos;s worth keeping.
        </P>

        <Divider />
        <H2>where it is now</H2>
        <P>
          the gym is in its free trial. if they keep it, i get a lifetime
          membership and they get a system built around how they actually run.
          if not, i switch it off and take what i learned to the next one.
        </P>
        <p className="mt-4 font-medium text-foreground">
          i&apos;ll update this post when the trial ends.
        </p>

        <a
          href="https://darylfitnessgym.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-foreground px-6 py-2.5 text-sm text-background transition-opacity hover:opacity-80"
        >
          see the system ↗
        </a>
      </div>

      <Reveal delay={150}>
        <div className="mt-16 border-t border-line pt-8">
          <Link
            href="/blog"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            ← back to blog
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
