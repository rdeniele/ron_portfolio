import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site";
import { getBlogPost } from "@/lib/blog";

const post = getBlogPost("computer-science-to-web-development-ai-marketing")!;

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

const takeaways = [
  "you don't have to know your final career path before you start.",
  "your degree does not have to define everything you do.",
  "learn beyond what school teaches you.",
  "build real projects, not just tutorials.",
  "rejection is part of the process, not proof that you are incapable.",
  "it is okay to start again, more than once.",
];

const lessons = [
  {
    title: "you don't have to know your final career path",
    body: "sometimes you discover what you want by trying something and realizing it isn't for you. changing direction is not the same as being lost.",
  },
  {
    title: "your degree does not have to define everything you do",
    body: "my degree is in computer science, but my current skill set extends into design, marketing, video editing, and automation. a degree gives you a foundation, not a ceiling.",
  },
  {
    title: "learn beyond what school teaches",
    body: "youtube, documentation, experimentation, ai tools, and real projects became part of my learning process. school can give you a foundation. your curiosity determines how far you take it.",
  },
  {
    title: "build things",
    body: "you can watch tutorials and read documentation for weeks, but eventually you need to build something. every project taught me something that simply studying could not.",
  },
  {
    title: "rejection is part of the process",
    body: "rejection can show you where you need to improve, or it can simply mean the opportunity was not a fit. it is not proof that you are incapable.",
  },
];

const journeySteps = [
  "gaming",
  "side hustles",
  "aircraft maintenance",
  "computer science",
  "game development",
  "web development",
  "first job",
  "machine learning thesis",
  "burnout",
  "ai development",
  "ai-assisted coding",
  "web development + design + marketing + video + automation",
  "wisker and other projects",
];

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

export default function BlogPostCareerJourney() {
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
        <P>my career path was not something i planned from the beginning.</P>
        <P>
          i did not enter college knowing that i would eventually work
          across web development, ai, design, video editing, marketing, and
          automation.
        </P>
        <P>in fact, i started out somewhere completely different.</P>
        <P>
          looking back, most of my career has been shaped by trying things,
          realizing what worked for me, failing at some things, learning new
          skills, and following opportunities as they came.
        </P>
        <P>this is how i got here.</P>

        <div className="mt-8 rounded-lg border border-line bg-card p-6">
          <p className="text-sm font-medium text-foreground">
            quick takeaways, if you only skim this
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
            {takeaways.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>

        <Divider />
        <H2>before computer science: gaming and side hustles</H2>
        <P>i&apos;ve always been interested in computers and games.</P>
        <P>
          as a student, i was the kind of person who spent a lot of time
          gaming. but i was also interested in finding ways to make some
          money on the side.
        </P>
        <P>
          during the time when online gaming was booming, i started selling
          phone load and mobile data to some of my classmates.
        </P>
        <P>it was a small side hustle, but it taught me something early on.</P>
        <P>
          i liked finding ways to solve problems and make something useful
          for other people.
        </P>
        <P>
          i didn&apos;t know it at the time, but that mindset would
          eventually become part of how i approached technology and
          business.
        </P>

        <Divider />
        <H2>the pandemic changed my plans</H2>
        <P>then the pandemic happened.</P>
        <P>like many students, i suddenly had to deal with online education.</P>
        <P>everything changed.</P>
        <P>
          classes moved online, routines disappeared, and nobody really knew
          what the best way to learn in that environment was.
        </P>
        <P>at that point, i was also figuring out what i wanted to study.</P>
        <P>
          i initially chose bachelor of science in aircraft maintenance
          technology.
        </P>
        <P>
          it seemed interesting, but i eventually realized that it was not a
          good fit for how i learn.
        </P>
        <P>
          aircraft maintenance is a very practical field. i am someone who
          learns better when i can physically interact with something,
          experiment with it, and explore how it works.
        </P>
        <P>
          with online education making that difficult, i struggled to
          connect with the course.
        </P>
        <P>eventually, i made the decision to shift.</P>
        <P>that&apos;s when i moved into bachelor of science in computer science.</P>

        <Divider />
        <H2>starting computer science</H2>
        <P>the transition to computer science was not perfect.</P>
        <P>i wouldn&apos;t say i immediately became a great programmer.</P>
        <P>but my grades were fine and generally above average, so i decided to continue.</P>
        <P>i eventually specialized in game development.</P>
        <P>that made sense for me.</P>
        <P>
          i already enjoyed games, so learning how games were actually built
          was something i found exciting.
        </P>
        <P>
          one of the projects i remember most was an infinite runner game
          called run thru.
        </P>
        <P>i worked on both the programming and the artwork.</P>
        <P>at school, i learned the fundamentals.</P>
        <P>but when i wanted to go beyond what was taught in class, i turned to youtube.</P>
        <P>
          i would search for tutorials, experiment with what i learned, and
          try to figure out how to make things work.
        </P>
        <P>that pattern became extremely important to my development as a programmer.</P>
        <P>school gave me the foundation.</P>
        <P>the internet helped me explore beyond it.</P>

        <Divider />
        <H2>realizing game development was not enough</H2>
        <P>
          as i reached my third year of college, i started thinking more
          seriously about what i could actually do after graduation.
        </P>
        <P>
          i enjoyed game development, but i also started noticing that game
          development opportunities in the philippines were relatively
          limited compared with other areas of software development.
        </P>
        <P>i began exploring web development.</P>
        <P>at first, i learned the basics:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>html</li>
          <li>css</li>
          <li>javascript</li>
        </ul>
        <P>
          interestingly, these were things i was learning outside of what
          was being taught in our college classes at the time.
        </P>
        <P>
          i started experimenting with websites and slowly became more
          comfortable with web development.
        </P>
        <P>eventually, that led to my first job.</P>

        <Divider />
        <H2>my first job in web development and design</H2>
        <P>
          my first job involved web development and design for marketing,
          particularly for real estate-related projects.
        </P>
        <P>getting that first opportunity was exciting.</P>
        <P>but there was another problem.</P>
        <P>i was still a student.</P>
        <P>
          i was working while taking classes, completing assignments,
          working on performance tasks, and eventually dealing with my
          thesis.
        </P>
        <P>trying to balance everything became extremely difficult.</P>
        <P>there were days when i had to switch between:</P>
        <p className="mt-4 font-medium text-foreground">
          work → classes → assignments → thesis → work again
        </p>
        <P>and there was very little room for rest.</P>
        <P>
          at the time, i didn&apos;t fully understand how exhausting that
          combination could become.
        </P>
        <P>i just kept pushing because i wanted to finish everything.</P>

        <Divider />
        <H2>fourth year: thesis, machine learning, and asl</H2>
        <P>then fourth year arrived.</P>
        <P>my group needed to work on our thesis, and we decided to explore machine learning.</P>
        <P>the initial concept came from one of my classmates.</P>
        <P>the idea was to create a system that could recognize american sign language.</P>
        <P>eventually, we developed the concept into an asl-to-text-to-speech system.</P>
        <P>
          the project involved technologies and concepts that were very
          different from the web development i had been doing.
        </P>
        <P>
          we worked with machine learning models involving cnns and rnns,
          along with other components required for the system.
        </P>
        <P>it was challenging.</P>
        <P>very challenging.</P>
        <P>i was also the person doing most of the coding for the thesis.</P>
        <P>
          at times, i was essentially coding the project on my own while
          still dealing with my job, classes, and other requirements.
        </P>
        <P>it was exhausting.</P>
        <P>but there was something i genuinely enjoyed about it.</P>
        <P>whenever something finally worked, i would get extremely excited.</P>
        <P>a model finally trained.</P>
        <P>something finally detected the sign.</P>
        <P>a feature finally worked.</P>
        <P>a bug finally disappeared.</P>
        <P>those moments made all the frustration worth it.</P>
        <P>it reminded me why i enjoyed technology in the first place.</P>
        <P>
          i liked building things and seeing an idea turn into something
          that actually worked.
        </P>

        <Divider />
        <H2>burnout after college</H2>
        <P>after everything was finished, i stopped working for a while.</P>
        <P>
          i had spent so much time coding, studying, working, and dealing
          with deadlines that i eventually became burned out.
        </P>
        <P>for several months, i didn&apos;t feel like coding anymore.</P>
        <P>that was strange for me.</P>
        <P>
          programming had been such a large part of my life, but suddenly i
          didn&apos;t want to open an editor and write code.
        </P>
        <P>i started questioning whether i wanted to continue down the same path.</P>
        <P>eventually, something unexpected helped me move forward.</P>
        <P>ai.</P>

        <Divider />
        <H2>discovering ai-assisted development</H2>
        <P>i started working in ai development, and the company encouraged us to use tools such as:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>claude</li>
          <li>github copilot</li>
          <li>cursor</li>
        </ul>
        <P>this introduced me to a different way of developing software.</P>
        <P>
          instead of writing every single line manually, i could use ai to
          help with parts of the development process.
        </P>
        <P>
          i could describe what i wanted to build, ask for implementation
          ideas, troubleshoot problems, and move through repetitive
          development tasks faster.
        </P>
        <P>this became my introduction to ai-assisted coding.</P>
        <P>but i also learned an important lesson.</P>
        <P>ai can help you write code.</P>
        <P>that does not mean you automatically understand the code.</P>
        <P>
          i still had to read what was generated, test it, debug it, modify
          it, and understand how it fit into the rest of the application.
        </P>
        <P>
          for me, ai became another tool in my development process rather
          than something that replaced programming knowledge.
        </P>

        <Divider />
        <H2>my career started expanding beyond programming</H2>
        <P>as i continued working, i started taking on different side projects.</P>
        <P>some were related to web development.</P>
        <P>others involved design, video editing, marketing, and automation.</P>
        <P>i realized that i enjoyed working across different areas.</P>
        <P>i didn&apos;t necessarily want to be limited to one role.</P>
        <P>i enjoyed building the website, but i also enjoyed thinking about how the website would be marketed.</P>
        <P>i enjoyed coding, but i also enjoyed design.</P>
        <P>i enjoyed creating something, but i also wanted to understand how people would discover and use it.</P>
        <P>this gradually pushed my career toward a combination of:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>web development</li>
          <li>ai</li>
          <li>design</li>
          <li>video editing</li>
          <li>marketing</li>
          <li>automation</li>
        </ul>
        <P>
          rather than seeing these as completely separate skills, i started
          seeing how they could work together.
        </P>

        <Divider />
        <H2>getting rejected again and again</H2>
        <P>before reaching some of the roles i have today, i went through a lot of rejection.</P>
        <P>
          if i tried to count every application, i would estimate that i
          have been rejected from hundreds of positions, potentially more
          than 500.
        </P>
        <P>i don&apos;t have an exact verified count, so i don&apos;t want to pretend that number is precise.</P>
        <P>but there were a lot.</P>
        <P>enough that rejection became a normal part of the process.</P>
        <P>some applications went nowhere.</P>
        <P>some reached interviews.</P>
        <P>some reached conversations.</P>
        <P>some seemed promising and still didn&apos;t work out.</P>
        <P>at first, rejection was frustrating.</P>
        <P>eventually, i started looking at it differently.</P>
        <P>
          every application forced me to look at my skills, portfolio,
          resume, communication, and the kind of work i actually wanted to
          do.
        </P>
        <P>i also started realizing that the job market does not simply ask:</P>
        <Quote>&quot;are you good?&quot;</Quote>
        <P>it asks:</P>
        <Quote>&quot;are your skills a match for what we need right now?&quot;</Quote>
        <P>that is a very different question.</P>

        <Divider />
        <H2>taking different roles</H2>
        <P>
          instead of waiting for the perfect job title, i started taking
          different opportunities that allowed me to build experience.
        </P>
        <P>i worked on projects involving:</P>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
          <li>web development</li>
          <li>marketing</li>
          <li>automation</li>
          <li>video editing</li>
          <li>design</li>
          <li>ai-assisted development</li>
        </ul>
        <P>
          some of these roles were not exactly what i imagined myself doing
          when i started studying computer science.
        </P>
        <P>but they helped me develop a wider skill set.</P>
        <P>
          i began to see myself less as someone who only writes code and
          more as someone who can help take an idea from concept to
          execution.
        </P>

        <Divider />
        <H2>building wisker alongside my work</H2>
        <P>at the same time, i started building my own project.</P>
        <P>
          that project became{" "}
          <a
            href="https://www.wisker.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline decoration-line underline-offset-4 transition-colors hover:decoration-foreground"
          >
            wisker
          </a>
          , an ai-powered study tool designed to help students prepare for
          exams and study more effectively.
        </P>
        <P>wisker was inspired by my own experience as a student and my interest in active recall.</P>
        <P>building wisker gave me another opportunity to combine many of the skills i had developed.</P>
        <P>it involved:</P>

        <H3>development</H3>
        <P>building the application and connecting the different technologies.</P>

        <H3>ai</H3>
        <P>using ai capabilities to create study resources.</P>

        <H3>design</H3>
        <P>thinking about how the application should look and feel.</P>

        <H3>marketing</H3>
        <P>figuring out how to reach students.</P>

        <H3>content</H3>
        <P>creating educational content around studying and active recall.</P>

        <P>it became a project where many parts of my career came together.</P>

        <Divider />
        <H2>where i am now</H2>
        <P>right now, i am still figuring things out.</P>
        <P>
          i&apos;m working across web development, ai, design, video
          editing, marketing, and automation while continuing to build my
          own projects.
        </P>
        <P>i don&apos;t consider myself finished.</P>
        <P>i&apos;m still learning.</P>
        <P>i&apos;m still experimenting.</P>
        <P>
          and i&apos;m still trying to figure out what direction i want my
          career to take long term.
        </P>
        <P>for now, i want to continue growing in this direction while keeping my side projects alive.</P>
        <P>one reason i enjoy building my own projects is that they give me a place to experiment and stay creative.</P>
        <P>wisker is one of those projects.</P>

        <Divider />
        <H2>what my journey taught me</H2>
        <P>looking back, there are a few things i learned from this journey.</P>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {lessons.map((lesson, i) => (
            <li
              key={lesson.title}
              className="rounded-lg border border-line bg-card p-5"
            >
              <p className="text-xs text-muted">tip {i + 1}</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {lesson.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {lesson.body}
              </p>
            </li>
          ))}
        </ul>

        <Divider />
        <H2>i&apos;m still building</H2>
        <P>i don&apos;t have a perfect career story.</P>
        <P>there was no straight line from university to where i am now.</P>
        <P>it was more like:</P>
        <ol className="mt-6 flex flex-col items-start gap-2 text-sm leading-relaxed text-muted">
          {journeySteps.map((step, i) => (
            <li key={step} className="flex flex-col gap-2">
              <span className="rounded-full border border-line px-4 py-1.5 font-medium text-foreground">
                {step}
              </span>
              {i < journeySteps.length - 1 && (
                <span aria-hidden="true" className="pl-4 text-muted">
                  ↓
                </span>
              )}
            </li>
          ))}
        </ol>
        <P>and i&apos;m still somewhere in the middle of that journey.</P>
        <P>i don&apos;t know exactly where the next few years will take me.</P>
        <P>
          for now, i want to keep learning, keep building, and keep
          exploring the different areas of technology and creative work that
          i enjoy.
        </P>
        <P>
          maybe the biggest lesson from my career so far is that you
          don&apos;t always need to know exactly where you&apos;re going.
        </P>
        <P>
          sometimes you just need to keep moving, keep learning, and pay
          attention to where the journey takes you.
        </P>

        <Divider />
        <H2>one thing i know</H2>
        <StoryImage
          src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1200&q=80"
          alt="silhouette of a person standing by the water at dusk"
          credit={{ name: "Mohamed Nohassi", url: "https://unsplash.com/@coopery" }}
        />
        <P>i&apos;ve taken a lot of different paths.</P>
        <P>
          i changed courses. i explored game development. i learned web
          development. i worked with ai. i moved into design, video editing,
          marketing, and automation. i&apos;ve built projects, experienced
          burnout, faced rejection, and started over more than once.
        </P>
        <P>i still don&apos;t know exactly where this journey will take me.</P>
        <P>but there is one thing i know.</P>
        <p className="mt-4 text-lg font-semibold text-foreground">
          life will end one day.
        </p>
        <P>that thought can sound heavy, but to me, it also makes life feel more meaningful.</P>
        <P>
          we don&apos;t have unlimited time to figure everything out. we
          will make mistakes. we will choose the wrong path sometimes. we
          will fail. we will lose opportunities. we might even feel like
          we&apos;ve fallen too far behind.
        </P>
        <P>
          but as long as we&apos;re still here,{" "}
          <span className="font-semibold text-foreground">
            we can always start again.
          </span>
        </P>
        <P>you can learn something new.</P>
        <P>you can change careers.</P>
        <P>you can go back to school.</P>
        <P>you can rebuild your finances.</P>
        <P>you can start a project.</P>
        <P>you can fix the things you neglected.</P>
        <P>you can become a different version of yourself.</P>
        <P>you don&apos;t have to have everything figured out today.</P>
        <P>
          i&apos;ve taken different paths throughout my life, and i don&apos;t
          think all of them were wasted. each one taught me something that
          eventually became useful somewhere else.
        </P>
        <P>so wherever you are right now, don&apos;t assume that your current situation is where your story ends.</P>
        <p className="mt-4 font-semibold text-foreground">
          life will end one day, but until then, we can always start again
          and get our lives together.
        </p>
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
