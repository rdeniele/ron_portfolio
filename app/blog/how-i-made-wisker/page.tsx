import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site";
import { getBlogPost } from "@/lib/blog";

const post = getBlogPost("how-i-made-wisker")!;

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

function StoryImage({
  src,
  alt,
  credit,
}: {
  src: string;
  alt: string;
  credit?: { name: string; url: string };
}) {
  return (
    <div className="mt-6">
      <div className="relative aspect-video overflow-hidden rounded-lg border border-line bg-line/50">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>
      {credit && (
        <p className="mt-2 text-xs text-muted">
          photo by{" "}
          <a
            href={credit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-2 hover:text-foreground"
          >
            {credit.name}
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
    </div>
  );
}

export default function BlogPostHowIMadeWisker() {
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
      </Reveal>

      <div className="mt-10">
        <P>wisker started with a simple idea:</P>
        <Quote>how can i help students prepare better for their exams and studies?</Quote>
        <P>i did not start with a big business plan or a complicated product strategy.</P>
        <P>i started with something much more personal.</P>
        <P>
          i wanted to build something around a study technique that had
          genuinely helped me.
        </P>
        <P>that technique was active recall.</P>

        <Divider />
        <H2>how active recall inspired wisker</H2>
        <P>before college, i was not exactly the student who had everything figured out.</P>
        <P>back when i was in high school, my grades were not particularly good.</P>
        <P>
          i struggled with studying and did not always know how to prepare
          effectively for exams.
        </P>
        <P>things started changing when i got to college.</P>
        <P>
          i began discovering different study techniques through youtube
          videos, educational content creators, and people sharing how they
          studied.
        </P>
        <P>one concept that stood out to me was active recall.</P>
        <P>
          instead of simply reading the same notes over and over, active
          recall encourages you to retrieve information from memory.
        </P>
        <P>for example, instead of reading:</P>
        <Quote>the mitochondria is the powerhouse of the cell.</Quote>
        <P>you could turn it into a question:</P>
        <Quote>what is the powerhouse of the cell?</Quote>
        <P>then try to answer it without looking at the answer.</P>
        <P>that small change made studying feel different to me.</P>
        <P>
          i started using techniques like this myself, and i noticed that i
          was doing better academically.
        </P>
        <P>that experience eventually became part of the inspiration behind wisker.</P>
        <P>
          i wanted to create something that could help other students
          prepare for exams using similar study principles.
        </P>

        <Divider />
        <H2>the first version was not wisker</H2>
        <StoryImage
          src="/works/web development and design/noteJewel_AI.png"
          alt="notejewel, the first prototype that became wisker"
        />
        <P>wisker did not start as wisker.</P>
        <P>the first prototype was called notejewel.</P>
        <P>
          at that stage, i was experimenting with the idea of creating a
          study application that could help students work with their notes
          and learning materials.
        </P>
        <P>the prototype helped me understand what i actually wanted the product to become.</P>
        <P>
          as i continued developing the idea, i realized that the original
          name and direction were not quite right.
        </P>
        <P>so i decided to rebrand it.</P>
        <P>that is when wisker started taking shape.</P>

        <H3>why wisker?</H3>
        <P>the product eventually became more than just a place to store notes.</P>
        <P>
          i wanted it to become a study companion that could help students
          actively interact with their learning materials.
        </P>
        <P>that meant focusing on things like:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>quizzes</li>
          <li>flashcards</li>
          <li>study materials</li>
          <li>active recall</li>
          <li>ai-assisted study preparation</li>
        </ul>
        <P>and then came the mascot.</P>

        <Divider />
        <H2>meet wisky, the orange cat</H2>
        <StoryImage
          src="/works/digital marketing/wisker.png"
          alt="wisky, wisker's orange cat study mascot"
        />
        <P>every study buddy needs a study buddy.</P>
        <P>that is where wisky came in.</P>
        <P>wisky is wisker&apos;s orange cat study mascot.</P>
        <P>
          the idea was to make the product feel less like another academic
          tool and more like something students could enjoy using.
        </P>
        <P>studying can already feel stressful.</P>
        <P>i wanted the personality of wisker to feel a little more approachable.</P>
        <P>
          so instead of making everything feel overly academic and serious,
          we introduced wisky as the friendly orange cat that accompanies the
          experience.
        </P>

        <Divider />
        <H2>rebuilding the look of wisker</H2>
        <P>
          once i became more confident about what wisker was supposed to be,
          i knew the application needed a better visual direction.
        </P>
        <P>at first, i was trying to handle everything myself.</P>
        <P>
          but i realized that if i wanted to focus on actually building the
          product, i needed help with the design.
        </P>
        <P>so i hired some of my friends to work on the ui and ux.</P>
        <P>
          they helped rethink the interface, layouts, and overall visual
          direction of the application.
        </P>
        <P>
          this allowed me to focus more heavily on development while they
          focused on how the product should look and feel.
        </P>
        <P>the result was a significant change from the original prototype.</P>
        <P>it was not just a rebrand.</P>
        <P>the application itself changed.</P>

        <Divider />
        <H2>the tech stack behind wisker</H2>
        <StoryImage
          src="https://images.unsplash.com/photo-1619410283995-43d9134e7656?auto=format&fit=crop&w=1200&q=80"
          alt="code editor displaying react source code"
          credit={{ name: "Juanjo Jaramillo", url: "https://unsplash.com/@juanjodev02" }}
        />
        <P>wisker was built using a combination of modern web technologies and ai.</P>
        <P>the main technology stack for the web application is:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>next.js</li>
          <li>prisma</li>
          <li>supabase</li>
          <li>together ai api</li>
        </ul>

        <H3>next.js</H3>
        <P>next.js is the main framework used to build the web application.</P>
        <P>it provides the foundation for the frontend and application structure.</P>

        <H3>prisma</H3>
        <P>prisma is used as the database orm.</P>
        <P>
          it makes it easier for the application to interact with the
          database while keeping the data models organized.
        </P>

        <H3>supabase</H3>
        <P>
          supabase handles parts of the backend infrastructure, including
          database and storage functionality.
        </P>
        <P>
          it became an important part of the application&apos;s
          infrastructure because i wanted a relatively straightforward way to
          manage backend services while building the product.
        </P>

        <H3>together ai</H3>
        <P>together ai provides the ai capabilities used within wisker.</P>
        <P>
          this allows wisker to use ai as part of the process of turning
          study materials into useful study resources.
        </P>

        <Divider />
        <H2>ai-assisted coding and manual development</H2>
        <P>another interesting part of building wisker was how i actually wrote the software.</P>
        <P>i used a combination of ai-assisted coding and manual coding.</P>
        <P>
          ai coding tools helped me move faster, especially when i needed to
          explore an unfamiliar implementation, generate boilerplate,
          troubleshoot problems, or work through repetitive parts of
          development.
        </P>
        <P>but i did not want to simply copy code without understanding it.</P>
        <P>i still read through the code, tested it, modified it, and worked to understand what was happening.</P>
        <P>that distinction became especially important as the application became more complicated.</P>
        <P>ai can help you write code faster.</P>
        <P>it does not automatically mean you understand the code.</P>
        <P>
          for me, the goal was to use ai as a development assistant rather
          than treat it as a replacement for understanding the application.
        </P>

        <Divider />
        <H2>from web app to mobile app</H2>
        <P>
          after getting the web application to a point where i could
          continue developing it, i started thinking about another problem.
        </P>
        <P>students use their phones constantly.</P>
        <P>
          if wisker is supposed to become a study companion, having a mobile
          experience makes a lot of sense.
        </P>
        <P>so i started working on a mobile version.</P>
        <P>the technology stack changed slightly.</P>
        <P>instead of next.js, the mobile application uses:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>react native</li>
          <li>expo</li>
          <li>prisma</li>
          <li>supabase</li>
          <li>together ai api</li>
        </ul>
        <P>the goal is to bring the same general wisker experience to mobile devices.</P>
        <P>as of now, the mobile application is still ongoing and being prepared for a demo.</P>
        <P>it is not finished yet, but it is another step in the development of wisker.</P>

        <Divider />
        <H2>building wisker while working two jobs</H2>
        <StoryImage
          src="https://images.unsplash.com/photo-1568436015740-0a0bdc73a2d0?auto=format&fit=crop&w=1200&q=80"
          alt="person resting their head on their hand after a long day of work"
          credit={{ name: "Siavash Ghanbari", url: "https://unsplash.com/@siavashghanbari" }}
        />
        <P>one of the biggest challenges was time.</P>
        <P>while continuing to work on wisker, i also became busy with two jobs.</P>
        <P>that meant i had significantly less time available for development.</P>
        <P>this was another reason ai-assisted coding became more important to my workflow.</P>
        <P>
          instead of spending hours on every small implementation, i could
          use ai to help speed up certain parts of development.
        </P>
        <P>but i still made an effort to read the code carefully and understand what i was adding.</P>
        <P>the process became a balance between:</P>
        <p className="mt-4 font-medium text-foreground">
          ai assistance + manual coding + testing + understanding the code
        </p>
        <P>it was not always easy.</P>
        <P>there were times when i had to put development on hold simply because i had other responsibilities.</P>
        <P>but i kept coming back to it.</P>

        <Divider />
        <H2>so, how is wisker doing?</H2>
        <P>this is probably the part that is most important to me.</P>
        <P>as of this writing, wisker currently has 20 users.</P>
        <P>that number is not huge.</P>
        <P>and i want to be honest about that.</P>
        <P>most of those users are currently inactive.</P>
        <P>
          so while getting the first 20 users was exciting, it also showed me
          that getting people to sign up is only one part of building a
          product.
        </P>
        <P>the bigger challenge is getting students to actually come back and use it.</P>
        <P>that is where my focus is now.</P>

        <Divider />
        <H2>the next challenge: marketing wisker</H2>
        <P>at this stage, i am shifting more of my attention toward marketing.</P>
        <P>i am currently focusing on platforms such as:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>facebook</li>
          <li>tiktok</li>
          <li>instagram</li>
        </ul>
        <P>instead of simply telling students:</P>
        <Quote>&quot;use wisker.&quot;</Quote>
        <P>i want to provide something useful first.</P>
        <P>that led to another idea.</P>

        <H3>learn with wisky</H3>
        <P>i started creating a content channel called learn with wisky.</P>
        <P>the idea is simple.</P>
        <P>
          instead of immediately promoting wisker, i want to teach students
          useful study techniques.
        </P>
        <P>the content will start with topics such as:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>active recall</li>
          <li>better study techniques</li>
          <li>exam preparation</li>
          <li>flashcards</li>
          <li>study habits</li>
          <li>learning strategies</li>
        </ul>
        <P>
          then, over time, i can naturally introduce wisker as a tool that
          students can use to apply some of these techniques.
        </P>
        <P>
          the goal is to build an audience around learning, rather than
          simply building an audience around a product.
        </P>

        <H3>why i&apos;m taking this approach</H3>
        <P>
          if i were a student seeing an advertisement for an app i&apos;ve
          never heard of, i might ignore it.
        </P>
        <P>but if i find a video that teaches me something useful, i might actually watch it.</P>
        <P>maybe i learn about active recall.</P>
        <P>then i see another video about using flashcards effectively.</P>
        <P>then i see how to turn my lecture notes into practice questions.</P>
        <P>eventually, i might discover that wisker can help me do those things.</P>
        <P>that is the kind of relationship i want to build with students.</P>
        <p className="mt-4 font-medium text-foreground">help first. product second.</p>

        <Divider />
        <H2>what i have learned from building wisker</H2>
        <P>
          building wisker has taught me that creating an application is only
          one part of building a product.
        </P>
        <P>you can spend months working on:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>features</li>
          <li>ui</li>
          <li>backend systems</li>
          <li>ai integrations</li>
          <li>databases</li>
          <li>mobile applications</li>
        </ul>
        <P>and still have very few people using the product.</P>
        <P>that was something i had to experience myself.</P>
        <P>
          having 20 users is exciting, but seeing that most of them are
          inactive also tells me that there is more work to do.
        </P>
        <P>the product needs to become something students actually want to return to.</P>
        <P>
          that means i need to listen to users, improve the experience,
          create useful content, and figure out what makes wisker valuable
          enough to become part of someone&apos;s study routine.
        </P>

        <Divider />
        <H2>what comes next for wisker?</H2>
        <P>right now, my priorities are relatively simple.</P>

        <H3>1. improve the product</H3>
        <P>continue improving wisker based on what i learn from users.</P>

        <H3>2. finish the mobile demo</H3>
        <P>continue developing the react native and expo version of wisker.</P>

        <H3>3. build learn with wisky</H3>
        <P>create educational content around studying, active recall, and learning techniques.</P>

        <H3>4. grow the audience</H3>
        <P>focus on facebook, tiktok, and instagram to reach more students.</P>

        <H3>5. understand user retention</H3>
        <P>the goal is not simply to get more registrations.</P>
        <P>
          i want to understand why students return, why they stop using
          wisker, and what would make the product genuinely useful in their
          daily study routine.
        </P>

        <Divider />
        <H2>from notejewel to wisker</H2>
        <P>looking back, wisker has already changed quite a bit.</P>
        <P>it started as a simple prototype called notejewel.</P>
        <P>then came the rebrand.</P>
        <P>then the new interface.</P>
        <P>then wisky.</P>
        <P>then the ai features.</P>
        <P>then the mobile application.</P>
        <P>
          now the focus is shifting toward marketing, content, and actually
          getting students to use the product.
        </P>
        <P>there is still a long way to go.</P>
        <P>but i think that is part of what makes building a product interesting.</P>
        <P>you don&apos;t start with the final version.</P>
        <P>you start with an idea.</P>
        <P>you build something.</P>
        <P>you learn.</P>
        <P>you change it.</P>
        <P>you launch it.</P>
        <P>you see what happens.</P>
        <P>then you build again.</P>

        <Divider />
        <H2>why i built wisker</H2>
        <P>at the end of the day, wisker comes back to the reason i started it.</P>
        <P>i was once a student who struggled academically.</P>
        <P>later, i discovered study techniques that helped me become a better student.</P>
        <P>active recall was one of the ideas that made a difference for me.</P>
        <P>now i want to build something that can help other students discover better ways to study too.</P>
        <P>wisker is still a work in progress.</P>
        <P>the product is not perfect.</P>
        <P>the user base is still small.</P>
        <P>the mobile app is still being developed.</P>
        <P>the marketing is still being figured out.</P>
        <P>but it exists.</P>
        <P>and it is growing.</P>
        <P>
          for now, i&apos;m going to keep building, keep learning, and keep
          trying to make wisker a better study companion for students.
        </P>
        <P>
          from a high school student who struggled with studying, to
          building an ai study app for students.
        </P>
        <p className="mt-4 font-medium text-foreground">that&apos;s the story of wisker so far.</p>

        <a
          href="https://www.wisker.app"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-foreground px-6 py-2.5 text-sm text-background transition-opacity hover:opacity-80"
        >
          try wisker ↗
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
