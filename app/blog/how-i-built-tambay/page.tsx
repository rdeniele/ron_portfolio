import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site";
import { getBlogPost } from "@/lib/blog";

const post = getBlogPost("how-i-built-tambay")!;

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

function PostQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="mt-6 space-y-3 border-l-2 border-line pl-4 leading-relaxed text-muted">
      {children}
    </blockquote>
  );
}

function Divider() {
  return <hr className="mt-14 border-line" />;
}

function StoryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mt-6">
      <div className="relative aspect-video overflow-hidden rounded-lg border border-line bg-line/50">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

export default function BlogPostHowIBuiltTambay() {
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
            className="object-cover object-top"
          />
        </div>
      </Reveal>

      <div className="mt-10">
        <P>
          a community app for friends, built when discord got banned in the
          philippines.
        </P>
        <p className="mt-4 leading-relaxed text-muted">
          try it:{" "}
          <a
            href="https://www.tambay.site"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-2 hover:text-foreground"
          >
            tambay.site
          </a>
        </p>

        <Divider />
        <H2>the short version</H2>
        <P>
          when discord got banned in the philippines, my friends and i lost the
          place where we hung out. i saw an opening, so i built a replacement.
        </P>
        <P>
          tambay is a community app where friends get their own space, called a
          tambayan, with chat, voice calls, screen share and watching videos
          together.
        </P>
        <P>
          i shared it on facebook and got about 98k engagement. in 3 days, 336
          people signed up to try it. it is the first app i have built that got
          more than 20 users, outside my other projects.
        </P>

        <Divider />
        <H2>why i built it</H2>
        <P>
          discord was where my friends and i talked, played and spent time
          together. when it was banned in the philippines, that stopped
          overnight.
        </P>
        <P>
          i did not want to move a whole barkada to a tool that felt like a poor
          copy, so i decided to build our own place.
        </P>
        <P>
          the name says it: &quot;tambay&quot; is filipino for hanging out. i
          wanted an app that felt like that, relaxed and made for us, not a
          corporate workspace.
        </P>

        <Divider />
        <H2>what tambay does</H2>
        <List>
          <li>
            <strong className="text-foreground">tambayans:</strong> your own
            space with text rooms and voice huts.
          </li>
          <li>
            <strong className="text-foreground">
              voice, camera and screen share:
            </strong>{" "}
            hop into a hut and talk, share your camera or show your screen.
          </li>
          <li>
            <strong className="text-foreground">meowtch party:</strong> paste a
            youtube link or a video file and everyone in the tambayan watches
            the same moment together.
          </li>
          <li>
            <strong className="text-foreground">meowp3:</strong> a shared music
            queue for youtube, spotify and soundcloud.
          </li>
          <li>
            <strong className="text-foreground">
              voice messages, soundboard and reactions:
            </strong>{" "}
            send a voice note, play sounds in a call and react to messages.
          </li>
          <li>
            <strong className="text-foreground">buddy:</strong> direct messages
            with your friends.
          </li>
          <li>
            <strong className="text-foreground">roles and moderation:</strong>{" "}
            owner, admin and co-admin roles, reports, kick votes and an activity
            log, so communities can run themselves.
          </li>
          <li>
            <strong className="text-foreground">apps:</strong> windows and
            android, so you can use it outside the browser.
          </li>
        </List>
        <StoryImage
          src="/blog/tambay-app-screens.webp"
          alt="tambay text rooms, voice huts and chat, shown on the landing page"
        />

        <Divider />
        <H2>how i built it</H2>
        <P>
          i built tambay with the help of claude code. i chose the stack and the
          direction, and used claude code to move fast on the implementation.
        </P>

        <H3>tech stack</H3>
        <List>
          <li>
            <strong className="text-foreground">web app:</strong> next.js and
            react
          </li>
          <li>
            <strong className="text-foreground">database:</strong> postgresql
            with prisma
          </li>
          <li>
            <strong className="text-foreground">
              auth, realtime and storage:
            </strong>{" "}
            supabase
          </li>
          <li>
            <strong className="text-foreground">voice and video:</strong> livekit
          </li>
          <li>
            <strong className="text-foreground">email:</strong> resend
          </li>
          <li>
            <strong className="text-foreground">rate limiting:</strong> upstash
            redis
          </li>
          <li>
            <strong className="text-foreground">mobile app:</strong> capacitor
            (android)
          </li>
          <li>
            <strong className="text-foreground">desktop app:</strong> tauri
            (windows)
          </li>
          <li>
            <strong className="text-foreground">hosting:</strong> vercel
          </li>
          <li>
            <strong className="text-foreground">domain:</strong> hostinger
          </li>
        </List>

        <H3>a few decisions i am happy with</H3>
        <P>
          <strong className="text-foreground">
            one codebase, three places to use it.
          </strong>{" "}
          the windows and android apps are thin windows around the live site.
          when i update the site, every app updates with it, and the windows
          installer stays around 1 mb.
        </P>
        <StoryImage
          src="/blog/tambay-platforms.webp"
          alt="tambay download options for windows, android, iphone and linux"
        />
        <P>
          <strong className="text-foreground">
            the server decides, not the browser.
          </strong>{" "}
          permissions and moderation rules are checked on the server every time.
          hiding a button is never the only protection.
        </P>
        <P>
          <strong className="text-foreground">
            watching together stays in sync.
          </strong>{" "}
          for meowtch party, the server holds where &quot;now&quot; is in the
          video. no single person&apos;s player is the boss, so it does not
          drift when someone joins late or pauses.
        </P>
        <P>
          <strong className="text-foreground">private by default.</strong> users
          verify their email, tambayans are invite-only, and realtime channels
          are private so browsers can listen but never publish.
        </P>

        <Divider />
        <H2>the launch</H2>
        <P>
          i first posted in appbuildersph to get real public users, not just
          people i already knew. this is the post, word for word:
        </P>
        <PostQuote>
          <p>
            hi guys since some platforms for group/friendly communications is
            mostly blocked in PH,
          </p>
          <p>i built this for friends.</p>
          <p>but if you wanna try it out, here it is: https://www.tambay.site/</p>
          <p>
            <strong className="text-foreground">edit:</strong> email
            verification is currently limited, so there may be times when the
            verification email doesn&apos;t arrive. i can manually verify
            accounts for now.
          </p>
          <p>
            downloadable apps are now available here:
            https://www.tambay.site/download. there are instructions on the
            download page for installing the apps.
          </p>
          <p>
            i don&apos;t have the means to officially publish tambay on google
            play store, app store, microsoft store, etc. yet, so the apps
            currently need to be installed through the provided instructions.
          </p>
          <p>
            for those looking for a public chat, i tried making one here on
            tambay. feel free to join and meet new people! just a small reminder
            to please be respectful and friendly toward each other.
          </p>
          <p>still working on it and adding more features along the way.</p>
        </PostQuote>
        <P>
          it landed at 986 reactions, 209 shares and 82 comments, reaching about
          98k engagement. i also posted on my personal feed for close friends,
          which is where the first users came from.
        </P>
        <P>that gave me 336 users in 3 days.</P>
        <p className="mt-4 leading-relaxed text-muted">
          <a
            href="https://www.facebook.com/share/p/1QFFx5Rvro/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-2 hover:text-foreground"
          >
            read the launch post on facebook
          </a>
        </p>

        <Divider />
        <H2>what i learned</H2>
        <P>
          <strong className="text-foreground">
            timing matters more than polish.
          </strong>{" "}
          discord&apos;s ban created a real need. people were looking for
          somewhere to go, and i was ready with something they could try that
          same week.
        </P>
        <P>
          <strong className="text-foreground">
            post where builders and users both are.
          </strong>{" "}
          appbuildersph gave me public users and honest feedback, not just
          friends being nice.
        </P>
        <P>
          <strong className="text-foreground">not everything ships.</strong>{" "}
          sign-in with google did not work reliably inside the mobile app, so i
          turned it off for now and kept email and password. i would rather have
          a smaller app that works than a bigger one that breaks.
        </P>

        <Divider />
        <H2>where it is now</H2>
        <P>
          the rush has died down, which is normal. a few people, fewer than 10,
          still use tambay, and i am grateful for every one of them.
        </P>
        <P>
          i plan to keep it running: the domain costs 83 pesos for a year, so
          the cost of keeping it alive is very small.
        </P>

        <Divider />
        <H2>what is next</H2>
        <P>
          i want to build features that make tambay a platform of its own, not a
          shadow of discord. the plan is to focus on things made for filipino
          barkadas and small communities, and to keep adding features that
          people cannot get anywhere else.
        </P>
        <p className="mt-4 font-medium text-foreground">
          if you want to try it, or have ideas for what i should build next,
          come hang out.
        </p>

        <a
          href="https://www.tambay.site"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-foreground px-6 py-2.5 text-sm text-background transition-opacity hover:opacity-80"
        >
          try tambay ↗
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
