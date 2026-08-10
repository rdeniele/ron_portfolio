import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site";
import { getBlogPost } from "@/lib/blog";

const post = getBlogPost("best-websites-tools-for-students")!;

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

const tools = [
  { name: "notion", purpose: "note-taking and organization" },
  { name: "google calendar", purpose: "scheduling and deadlines" },
  { name: "wisker", purpose: "studying and review" },
  { name: "youtube", purpose: "free educational resources" },
  { name: "google drive", purpose: "cloud storage and file sharing" },
  { name: "canva", purpose: "presentations and graphics" },
  { name: "capcut", purpose: "video editing" },
  { name: "google scholar", purpose: "academic research" },
  { name: "citation machine", purpose: "citations and references" },
  { name: "microsoft, google, wps", purpose: "documents and spreadsheets" },
];

type ToolMedia = {
  image: string;
  imageAlt: string;
  credit?: { name: string; url: string };
  links: { label: string; url: string }[];
};

const toolMedia: Record<number, ToolMedia> = {
  1: {
    image:
      "https://images.unsplash.com/photo-1568150279679-d16bc9eb9eb1?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "spiral notebook used for taking notes",
    credit: { name: "Marissa Grootes", url: "https://unsplash.com/@marissacristina" },
    links: [{ label: "visit notion", url: "https://www.notion.so" }],
  },
  2: {
    image:
      "https://images.unsplash.com/photo-1642417188964-870c08705ef3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "tablet showing a calendar on the screen",
    credit: { name: "Crystal Y", url: "https://unsplash.com/@slowlivecreate" },
    links: [{ label: "visit google calendar", url: "https://calendar.google.com" }],
  },
  3: {
    image: "/works/web development and design/wisker_landingpage.png",
    imageAlt: "wisker ai study app landing page",
    links: [{ label: "visit wisker", url: "https://www.wisker.app" }],
  },
  4: {
    image:
      "https://images.unsplash.com/photo-1542471562201-7086102e3374?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "laptop open to a video, used for learning online",
    credit: { name: "Zac Durant", url: "https://unsplash.com/@zacdurant" },
    links: [{ label: "visit youtube", url: "https://www.youtube.com" }],
  },
  5: {
    image:
      "https://images.unsplash.com/photo-1667984390538-3dea7a3fe33d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "3d render of a cloud computing and storage concept",
    credit: { name: "Growtika", url: "https://unsplash.com/@growtika" },
    links: [{ label: "visit google drive", url: "https://drive.google.com" }],
  },
  6: {
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "laptop screen showing colorful design software",
    credit: { name: "Andras Vas", url: "https://unsplash.com/@wasdrew" },
    links: [{ label: "visit canva", url: "https://www.canva.com" }],
  },
  7: {
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "monitor displaying a video editing timeline",
    credit: { name: "Peter Stumpf", url: "https://unsplash.com/@peter_s" },
    links: [{ label: "visit capcut", url: "https://www.capcut.com" }],
  },
  8: {
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "library shelves used for academic research",
    credit: { name: "Janko Ferlič", url: "https://unsplash.com/@itfeelslikefilm" },
    links: [{ label: "visit google scholar", url: "https://scholar.google.com" }],
  },
  9: {
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "fountain pen on lined paper, used for writing citations",
    credit: { name: "Aaron Burden", url: "https://unsplash.com/@aaronburden" },
    links: [{ label: "visit citation machine", url: "https://www.citationmachine.net" }],
  },
  10: {
    image:
      "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "person typing a document on a laptop",
    credit: { name: "Burst", url: "https://unsplash.com/@burst" },
    links: [
      { label: "microsoft 365", url: "https://www.microsoft.com/microsoft-365" },
      { label: "google docs", url: "https://docs.google.com" },
      { label: "wps office", url: "https://www.wps.com" },
    ],
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
    {
      "@type": "ItemList",
      name: "best websites and tools for students",
      itemListElement: tools.map((tool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: tool.name,
        description: tool.purpose,
      })),
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

function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="mt-4 border-l-2 border-line pl-4 leading-relaxed text-muted italic">
      {children}
    </blockquote>
  );
}

function Divider() {
  return <hr className="mt-14 border-line" />;
}

function ToolImage({ tool }: { tool: number }) {
  const media = toolMedia[tool];
  return (
    <div className="mt-6">
      <div className="relative aspect-video overflow-hidden rounded-lg border border-line bg-line/50">
        <Image
          src={media.image}
          alt={media.imageAlt}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        {media.credit ? (
          <p className="text-xs text-muted">
            photo by{" "}
            <a
              href={media.credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line underline-offset-2 hover:text-foreground"
            >
              {media.credit.name}
            </a>{" "}
            on{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line underline-offset-2 hover:text-foreground"
            >
              unsplash
            </a>
          </p>
        ) : (
          <span />
        )}
        <div className="flex flex-wrap gap-2">
          {media.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BlogPostStudentTools() {
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
          <Link
            href="/blog"
            className="transition-colors hover:text-foreground"
          >
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
        {post.imageCredit && (
          <p className="mt-2 text-xs text-muted">
            photo by{" "}
            <a
              href={post.imageCredit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line underline-offset-2 hover:text-foreground"
            >
              {post.imageCredit.name}
            </a>{" "}
            on{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line underline-offset-2 hover:text-foreground"
            >
              unsplash
            </a>
          </p>
        )}
      </Reveal>

      <div className="mt-10">
        <P>being a student means constantly switching between different tasks.</P>
        <P>
          you need to take notes during class, organize assignments, keep
          track of deadlines, research for papers, create presentations, edit
          videos, manage files, study for exams, and somehow keep everything
          organized.
        </P>
        <P>
          over time, i found that having the right tools can make student
          life much easier.
        </P>
        <P>
          these are some of the websites and apps i would recommend to
          students based on the different tasks they need to accomplish.
          some are useful for studying, while others are better for
          organization, research, productivity, design, or school projects.
        </P>
        <P>here are the tools i would personally keep in a student toolkit.</P>

        <Divider />
        <H2>1. notion: for notes and organization</H2>
        <ToolImage tool={1} />
        <P>
          notion is one of the most flexible tools students can use for
          organizing information.
        </P>
        <P>you can use it for:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>class notes</li>
          <li>to-do lists</li>
          <li>project planning</li>
          <li>assignment tracking</li>
          <li>study schedules</li>
          <li>personal databases</li>
          <li>research organization</li>
          <li>semester planning</li>
        </ul>
        <P>
          one of the biggest advantages of notion is that you can build your
          own system around how you study.
        </P>
        <P>for example, you could create a workspace containing:</P>
        <P>
          <span className="font-medium text-foreground">
            subjects → notes → assignments → deadlines → study materials
          </span>
        </P>
        <P>
          instead of having information scattered across different apps, you
          can keep many of your school-related resources organized in one
          place.
        </P>
        <P>
          if you like customizing your own productivity system, notion is
          worth exploring.
        </P>

        <Divider />
        <H2>2. google calendar: for managing your timeline</H2>
        <ToolImage tool={2} />
        <P>
          google calendar is one of the simplest tools on this list, but it
          can make a major difference when you actually use it consistently.
        </P>
        <P>students often have several deadlines happening at the same time.</P>
        <P>you might have:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>exams</li>
          <li>assignments</li>
          <li>presentations</li>
          <li>group projects</li>
          <li>meetings</li>
          <li>thesis deadlines</li>
          <li>organization activities</li>
        </ul>
        <P>
          instead of trying to remember everything, put important dates into
          your calendar.
        </P>
        <P>you can also create a timeline for larger projects.</P>
        <P>for example, instead of putting only:</P>
        <Quote>research paper due: friday</Quote>
        <P>you could schedule:</P>
        <ul className="mt-4 space-y-2 leading-relaxed text-muted">
          <li>
            <span className="font-medium text-foreground">monday:</span>{" "}
            research sources
          </li>
          <li>
            <span className="font-medium text-foreground">tuesday:</span>{" "}
            create outline
          </li>
          <li>
            <span className="font-medium text-foreground">wednesday:</span>{" "}
            write first draft
          </li>
          <li>
            <span className="font-medium text-foreground">thursday:</span>{" "}
            edit and proofread
          </li>
          <li>
            <span className="font-medium text-foreground">friday:</span> submit
          </li>
        </ul>
        <P>
          this makes large assignments feel more manageable because
          you&apos;re turning one large deadline into smaller steps.
        </P>

        <Divider />
        <H2>3. wisker: for reviewing and studying</H2>
        <ToolImage tool={3} />
        <P>
          studying is one of the biggest parts of being a student, especially
          when exams are coming up.
        </P>
        <P>
          this is where{" "}
          <a
            href="https://www.wisker.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline decoration-line underline-offset-4 transition-colors hover:decoration-foreground"
          >
            wisker
          </a>{" "}
          can be useful.
        </P>
        <P>
          wisker is an ai-powered study tool that can help turn your existing
          study materials into resources for review.
        </P>
        <P>you can use materials such as:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>pdfs</li>
          <li>images</li>
          <li>lecture notes</li>
          <li>manually entered notes</li>
        </ul>
        <P>
          then use wisker to help create quizzes and flashcards that you can
          use for practice.
        </P>
        <P>instead of only rereading your notes, you can test yourself.</P>
        <P>
          for example, you might have a long lecture pdf that you need to
          review before an exam.
        </P>
        <P>
          rather than spending a lot of time manually creating questions and
          flashcards, you can use wisker to help turn that material into
          something you can actively practice with.
        </P>
        <P>
          this is particularly useful when you have several subjects to
          review and limited time to prepare your study materials.
        </P>

        <H3>why i recommend it</H3>
        <P>
          one of the biggest problems i experienced as a student was spending
          so much time preparing to study that i had less time to actually
          study.
        </P>
        <P>
          creating flashcards, writing practice questions, and organizing
          notes can take hours.
        </P>
        <P>tools like wisker can help reduce some of that preparation work.</P>
        <P>
          you still need to understand the material yourself, but having
          study resources ready can make the review process easier.
        </P>

        <Divider />
        <H2>4. youtube: for free learning resources</H2>
        <ToolImage tool={4} />
        <P>youtube is one of the most underrated resources available to students.</P>
        <P>
          there are countless educational videos covering subjects ranging
          from programming and mathematics to design, science, business,
          languages, and more.
        </P>
        <P>sometimes your professor&apos;s explanation is enough.</P>
        <P>sometimes it isn&apos;t.</P>
        <P>
          when i struggled to understand a topic, one of the first things i
          would do was search for another explanation on youtube.
        </P>
        <P>
          the advantage is that you can often find multiple explanations of
          the same concept.
        </P>
        <P>
          for example, if you don&apos;t understand a programming concept
          from your lecture, you can search for a tutorial that explains the
          same concept using a different approach.
        </P>
        <P>
          youtube is especially useful because many educational resources
          are available for free.
        </P>

        <H3>use youtube as a supplement</H3>
        <P>
          i would not recommend relying on youtube as your only source of
          information.
        </P>
        <P>
          use it alongside your classes, textbooks, lecture materials, and
          other reliable sources.
        </P>
        <P>
          think of it as having access to thousands of additional
          explanations whenever you need them.
        </P>

        <Divider />
        <H2>5. google drive: for files and file sharing</H2>
        <ToolImage tool={5} />
        <P>
          google drive is extremely useful for students because school
          generates a lot of files.
        </P>
        <P>you may have:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>pdfs</li>
          <li>powerpoint presentations</li>
          <li>word documents</li>
          <li>research papers</li>
          <li>images</li>
          <li>videos</li>
          <li>spreadsheets</li>
          <li>group project files</li>
        </ul>
        <P>keeping everything on one computer can become risky.</P>
        <P>
          if your laptop stops working, you don&apos;t want your thesis or
          final project disappearing with it.
        </P>
        <P>
          google drive gives you cloud storage that you can access from
          different devices.
        </P>
        <P>
          it is also useful for group projects because files can be shared
          with classmates.
        </P>
        <P>
          instead of sending multiple versions of the same document through
          chat, you can share a file and collaborate around the same
          document.
        </P>

        <H3>a simple organization system</H3>
        <P>you could organize your drive like this:</P>
        <p className="mt-4 font-medium text-foreground">university</p>
        <ul className="mt-4 list-none space-y-2 pl-5 leading-relaxed text-muted">
          <li>→ year 1</li>
          <li>→ year 2</li>
          <li>→ year 3</li>
          <li>→ year 4</li>
        </ul>
        <P>and inside each year:</P>
        <p className="mt-4 font-medium text-foreground">subject</p>
        <ul className="mt-4 list-none space-y-2 pl-5 leading-relaxed text-muted">
          <li>→ notes</li>
          <li>→ assignments</li>
          <li>→ projects</li>
          <li>→ presentations</li>
          <li>→ exams</li>
        </ul>
        <P>a simple structure can save you a lot of time later.</P>

        <Divider />
        <H2>6. canva: for presentations and graphics</H2>
        <ToolImage tool={6} />
        <P>canva is especially useful when you need to create something visual.</P>
        <P>students can use canva for:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>powerpoint presentations</li>
          <li>infographics</li>
          <li>posters</li>
          <li>social media graphics</li>
          <li>reports</li>
          <li>presentation covers</li>
          <li>diagrams</li>
          <li>certificates</li>
          <li>school event materials</li>
        </ul>
        <P>
          not everyone has experience with graphic design, and not every
          student needs professional design software.
        </P>
        <P>
          canva makes it easier to start with templates and customize them
          for your project.
        </P>
        <P>
          for presentations, the templates can also help when you&apos;re
          struggling with the question:
        </P>
        <Quote>&quot;how am i supposed to design this?&quot;</Quote>
        <P>
          instead of starting with a blank page, you can use an existing
          layout and adapt it to your content.
        </P>
        <P>just remember that a good presentation is not only about design.</P>
        <P>your information, structure, and delivery still matter.</P>

        <Divider />
        <H2>7. capcut: for video editing</H2>
        <ToolImage tool={7} />
        <P>capcut is useful when a school project requires video.</P>
        <P>
          video assignments are becoming more common, especially for
          presentations, documentaries, promotional projects, and creative
          assignments.
        </P>
        <P>capcut can be used for:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>cutting clips</li>
          <li>adding subtitles</li>
          <li>adding transitions</li>
          <li>adding music</li>
          <li>adding text</li>
          <li>basic effects</li>
          <li>creating short-form videos</li>
          <li>editing presentations and school projects</li>
        </ul>
        <P>
          you don&apos;t necessarily need expensive professional video
          editing software for a basic school project.
        </P>
        <P>for many student assignments, a simpler editor can be enough.</P>
        <P>
          the important thing is to focus on the content and storytelling
          rather than adding effects just because they are available.
        </P>

        <Divider />
        <H2>8. google scholar: for research</H2>
        <ToolImage tool={8} />
        <P>
          google scholar is one of the websites i would strongly recommend
          learning how to use properly.
        </P>
        <P>
          if you&apos;re working on a research paper, thesis, literature
          review, or academic project, you need reliable sources.
        </P>
        <P>google scholar helps you search for academic literature such as:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>research papers</li>
          <li>journal articles</li>
          <li>conference papers</li>
          <li>theses</li>
          <li>academic publications</li>
        </ul>
        <P>
          instead of searching the general web for every topic, you can use
          google scholar to specifically look for academic sources.
        </P>
        <P>for example, if you&apos;re researching:</P>
        <Quote>
          &quot;the effects of social media on student performance&quot;
        </Quote>
        <P>
          you can search the topic in google scholar and explore relevant
          academic literature.
        </P>

        <H3>learn to evaluate your sources</H3>
        <P>
          finding a paper does not automatically mean it is appropriate for
          your research.
        </P>
        <P>pay attention to:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>who published it</li>
          <li>when it was published</li>
          <li>where it was published</li>
          <li>the research methodology</li>
          <li>the number and quality of sources</li>
          <li>whether the study actually supports your argument</li>
        </ul>
        <P>
          google scholar helps you find research, but you still need to
          evaluate what you find.
        </P>

        <Divider />
        <H2>9. citation machine: for creating references</H2>
        <ToolImage tool={9} />
        <P>
          when you&apos;re writing a research paper, one of the most annoying
          parts can be formatting citations.
        </P>
        <P>different schools and professors may require different citation styles.</P>
        <P>for example:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>apa</li>
          <li>mla</li>
          <li>chicago</li>
        </ul>
        <P>
          <a
            href="https://www.citationmachine.net"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline decoration-line underline-offset-4 transition-colors hover:decoration-foreground"
          >
            citation machine
          </a>{" "}
          can help generate citations and references in different formats.
        </P>
        <P>
          you can provide information about a source and use the tool to
          help format the citation.
        </P>
        <P>
          this can save time, especially when you&apos;re working with a
          large number of sources.
        </P>
        <P>however, don&apos;t blindly trust automatically generated citations.</P>
        <P>
          always check the result against your professor&apos;s required
          citation style and the actual source information.
        </P>
        <P>
          a citation generator can help with formatting, but you are still
          responsible for making sure your references are accurate.
        </P>

        <Divider />
        <H2>10. microsoft office, google docs, and other document tools</H2>
        <ToolImage tool={10} />
        <P>
          finally, students should be comfortable using basic document and
          productivity software.
        </P>
        <P>this includes tools from:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>microsoft</li>
          <li>google</li>
          <li>wps</li>
        </ul>
        <P>some of the most commonly useful applications include:</P>

        <H3>word processors</H3>
        <P>for writing:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>essays</li>
          <li>reports</li>
          <li>research papers</li>
          <li>documentation</li>
          <li>assignments</li>
        </ul>
        <P>examples include microsoft word, google docs, and wps writer.</P>

        <H3>spreadsheets</H3>
        <P>for:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>calculations</li>
          <li>tables</li>
          <li>data</li>
          <li>budgets</li>
          <li>research data</li>
          <li>tracking information</li>
        </ul>
        <P>
          examples include microsoft excel, google sheets, and wps
          spreadsheets.
        </P>

        <H3>presentations</H3>
        <P>for:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>class presentations</li>
          <li>project presentations</li>
          <li>research presentations</li>
          <li>group projects</li>
        </ul>
        <P>
          examples include microsoft powerpoint, google slides, and wps
          presentation.
        </P>
        <P>
          these may not be the most exciting tools on the list, but they are
          some of the most practical.
        </P>
        <P>
          at some point in your academic life, you will probably need to
          write a document, create a presentation, or work with data.
        </P>
        <P>knowing how to use these applications will save you time.</P>

        <Divider />
        <H2>my recommended student toolkit</H2>
        <P>
          if i had to organize these tools based on what i would use them
          for, i would divide them like this:
        </P>
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-card">
                <th className="px-4 py-3 font-medium">purpose</th>
                <th className="px-4 py-3 font-medium">tool</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {tools.map((tool) => (
                <tr key={tool.name}>
                  <td className="px-4 py-3 text-muted">{tool.purpose}</td>
                  <td className="px-4 py-3">{tool.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <P>you don&apos;t necessarily need every tool.</P>
        <P>
          the goal is not to install dozens of apps and create another
          complicated system.
        </P>
        <P>
          the goal is to find a few tools that solve the problems you
          actually have.
        </P>

        <Divider />
        <H2>how i would combine these tools</H2>
        <P>the real value comes from using these tools together.</P>
        <P>for example, imagine you have an upcoming exam.</P>
        <P>you could use:</P>
        <ol className="mt-4 space-y-3 leading-relaxed text-muted">
          <li>
            <span className="font-medium text-foreground">google calendar:</span>{" "}
            schedule when you will study and set your exam deadline.
          </li>
          <li>
            <span className="font-medium text-foreground">google drive:</span>{" "}
            keep your lecture pdfs, slides, and other study materials
            organized.
          </li>
          <li>
            <span className="font-medium text-foreground">notion:</span>{" "}
            keep your personal notes and study plan organized.
          </li>
          <li>
            <span className="font-medium text-foreground">wisker:</span>{" "}
            turn your study materials into quizzes and flashcards.
          </li>
          <li>
            <span className="font-medium text-foreground">youtube:</span>{" "}
            look for additional explanations when you don&apos;t understand a
            topic.
          </li>
        </ol>
        <P>this creates a simple workflow:</P>
        <p className="mt-4 font-medium text-foreground">
          organize → learn → practice → review
        </p>
        <P>for a research project, the workflow might look different:</P>
        <p className="mt-4 font-medium text-foreground">
          google scholar → google drive → microsoft word / google docs →
          citation machine
        </p>
        <P>for a presentation:</P>
        <p className="mt-4 font-medium text-foreground">
          research → google docs → canva / powerpoint → presentation
        </p>
        <P>for a video project:</P>
        <p className="mt-4 font-medium text-foreground">
          research → script → capcut → final video
        </p>
        <P>
          the best tools are not necessarily the ones with the most features.
        </P>
        <P>they are the ones that fit into your workflow.</P>

        <Divider />
        <H2>final thoughts</H2>
        <P>
          being a student can sometimes feel like having ten different jobs
          at the same time.
        </P>
        <P>
          you are a researcher, writer, designer, presenter, project
          manager, editor, and sometimes even a video producer.
        </P>
        <P>
          the right tools cannot do the work for you, but they can make many
          parts of student life easier.
        </P>
        <P>if i had to choose only a few tools to start with, i would focus on:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>google calendar for managing deadlines.</li>
          <li>google drive for keeping files organized.</li>
          <li>notion for notes and personal organization.</li>
          <li>wisker for reviewing and practicing.</li>
          <li>google scholar for academic research.</li>
          <li>canva for presentations and visual work.</li>
        </ul>
        <P>
          then add tools like capcut, citation machine, microsoft office,
          google docs, or wps depending on the requirements of your classes
          and projects.
        </P>
        <P>you do not need the most complicated productivity system.</P>
        <P>
          you just need a system that helps you stay organized, find your
          materials, and actually get your work done.
        </P>
        <P>and as a student, sometimes that alone makes a huge difference.</P>
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
