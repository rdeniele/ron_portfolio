import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site";
import { getBlogPost } from "@/lib/blog";

const post = getBlogPost("ai-study-tool")!;

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

const faqs = [
  {
    q: "what is an ai study tool?",
    a: "an ai study tool uses artificial intelligence to help students create, organize, or interact with study materials. wisker uses ai to help turn materials such as pdfs, images, and notes into study resources.",
  },
  {
    q: "what is an ai quiz generator?",
    a: "an ai quiz generator uses artificial intelligence to create questions from information you provide. wisker can help turn your study materials into practice quizzes so you can test your understanding.",
  },
  {
    q: "what is an ai flashcard generator?",
    a: "an ai flashcard generator uses artificial intelligence to create question-and-answer flashcards from study materials. wisker can help transform notes and other materials into flashcards for active recall.",
  },
  {
    q: "can ai make flashcards from notes?",
    a: "yes. ai can analyze notes and identify information that can be converted into question-and-answer flashcards. wisker is designed to help students transform their existing study materials into flashcards.",
  },
  {
    q: "what is the difference between a quiz maker and an ai quiz generator?",
    a: "a traditional quiz maker generally requires you to create questions manually. an ai quiz generator can use your existing information to help generate questions automatically.",
  },
  {
    q: "is wisker an ai study assistant?",
    a: "wisker is an ai-powered study tool designed to help students transform their existing materials into quizzes, flashcards, and other study resources.",
  },
  {
    q: "can wisker create quizzes from pdfs?",
    a: "wisker supports pdfs as study materials and can use the information in those materials to help create study resources such as quizzes and flashcards.",
  },
  {
    q: "is ai enough to study for an exam?",
    a: "ai should be treated as a study aid rather than a replacement for learning. students should still review their original materials, verify important information, understand the concepts, and actively practice what they learn.",
  },
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
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
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
  return (
    <p className="mt-4 leading-relaxed text-muted">{children}</p>
  );
}

export default function BlogPost1() {
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
          <P>
            studying can take hours, not only because the material is
            difficult, but because preparing your study materials takes time.
          </P>
          <P>
            you may have lecture notes, pdfs, presentations, screenshots, and
            other materials to review. before you can properly study them,
            you may still need to create practice questions, flashcards,
            summaries, and other resources.
          </P>
          <P>
            <a
              href="https://www.wisker.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline decoration-line underline-offset-4 transition-colors hover:decoration-foreground"
            >
              wisker
            </a>{" "}
            is an ai study tool that helps make this process easier.
          </P>
          <P>
            instead of manually creating every quiz and flashcard, you can
            use wisker to transform your existing study materials into
            useful resources for studying and review.
          </P>
          <P>
            whether you are preparing for an exam, reviewing lecture notes,
            or trying to organize a large amount of information, wisker
            helps you spend less time preparing your study materials and
            more time actually studying.
          </P>

          <H2>what is an ai study tool?</H2>
          <P>
            an ai study tool uses artificial intelligence to help students
            learn, review, and organize information.
          </P>
          <P>traditional studying often looks like this:</P>
          <P>
            read your notes → create questions → make flashcards → review →
            repeat
          </P>
          <P>an ai-powered study tool can simplify the preparation process:</P>
          <P>
            upload your materials → generate study resources → practice →
            review
          </P>
          <P>
            instead of manually converting every chapter or lecture into
            questions and flashcards, you can give wisker your existing
            study materials and let ai help create them for you.
          </P>
          <P>
            wisker can work with different types of study materials,
            including pdfs, images, and manually entered notes.
          </P>
          <P>
            this is especially useful when you already have the information
            you need but do not want to spend hours turning it into study
            materials.
          </P>

          <H2>ai quiz generator: turn your notes into practice questions</H2>
          <P>one effective way to study is through active recall.</P>
          <P>
            rather than simply reading your notes repeatedly, active recall
            encourages you to retrieve information from memory.
          </P>
          <P>an ai quiz generator can help make this process easier.</P>
          <P>
            with wisker, you can use your study materials to create practice
            questions that you can answer while reviewing.
          </P>
          <P>for example, imagine you have a 30-page biology pdf.</P>
          <P>you could manually create questions such as:</P>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
            <li>what is cellular respiration?</li>
            <li>what are the stages of cellular respiration?</li>
            <li>where does glycolysis occur?</li>
            <li>what is the role of atp?</li>
          </ul>
          <P>
            creating these questions yourself can take considerable time.
          </P>
          <P>
            wisker can help turn your study material into practice questions
            so you can spend more time answering and reviewing instead of
            preparing everything manually.
          </P>

          <H3>why use an ai quiz generator?</H3>
          <P>
            creating a practice quiz from scratch requires several steps.
          </P>
          <P>
            you need to read the material, identify important concepts,
            write questions, create answers, and check whether the
            questions actually test what you need to know.
          </P>
          <P>
            an ai quiz generator can reduce some of that preparation work.
          </P>
          <P>
            with wisker, you can turn your existing study materials into
            practice questions and use them to identify areas that need
            more review.
          </P>
          <P>
            the goal is not to eliminate studying. the goal is to make the
            preparation process more efficient.
          </P>

          <H2>
            ai flashcard generator: create flashcards from your study
            materials
          </H2>
          <P>
            flashcards are another popular way to review information
            because they encourage active recall.
          </P>
          <P>
            the problem is that creating flashcards manually can become
            tedious, especially when you are studying a large subject.
          </P>
          <P>
            an ai flashcard generator can help automate part of that
            process.
          </P>
          <P>
            instead of writing every question and answer yourself, you can
            use wisker to transform information from your study materials
            into flashcards.
          </P>
          <P>for example:</P>
          <div className="mt-4 rounded-lg border border-line bg-card p-5 text-sm leading-relaxed">
            <p>
              <span className="text-muted">question:</span> what is the
              powerhouse of the cell?
            </p>
            <p className="mt-2">
              <span className="text-muted">answer:</span> the mitochondria.
            </p>
          </div>
          <P>
            for more complex subjects, flashcards can also help you review
            concepts, terminology, processes, and important facts.
          </P>
          <P>
            the purpose is not simply to create as many flashcards as
            possible.
          </P>
          <P>
            the purpose is to turn your existing information into something
            you can actively review.
          </P>

          <H3>flashcard maker vs. ai flashcard generator</H3>
          <P>
            a traditional flashcard maker usually requires you to create
            each card yourself.
          </P>
          <P>
            you write the question, write the answer, and repeat the
            process for every card.
          </P>
          <P>
            that can work well when you only need a few flashcards.
            however, creating dozens or hundreds of cards can take a
            significant amount of time.
          </P>
          <P>an ai flashcard generator approaches the process differently.</P>
          <P>
            you provide the material, and ai helps identify information
            that can be converted into flashcards.
          </P>
          <P>
            wisker is designed around this idea. instead of starting with
            an empty flashcard set, you can start with the study materials
            you already have.
          </P>
          <P>
            this can make it easier to turn your notes and other materials
            into something you can use for active recall.
          </P>

          <H2>ai quiz maker vs. traditional quiz maker</H2>
          <P>
            a traditional quiz maker can be useful when you want complete
            control over every question.
          </P>
          <P>
            you choose the questions, answers, format, and structure of
            your quiz.
          </P>
          <P>
            however, students often face a different problem. they may know
            they need to practice, but they do not have enough time to
            create the practice material themselves.
          </P>
          <P>this is where an ai quiz generator can be useful.</P>
          <P>
            instead of manually writing every question, you can use wisker
            to help generate questions based on your existing study
            materials.
          </P>
          <P>
            that means you can spend more time answering questions and
            reviewing your mistakes.
          </P>

          <H2>how to use wisker as an ai study tool</H2>
          <P>getting started with wisker is simple.</P>

          <H3>1. add your study materials</H3>
          <P>start with the material you are already studying.</P>
          <P>you can use resources such as:</P>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
            <li>pdfs</li>
            <li>images</li>
            <li>lecture notes</li>
            <li>manually entered notes</li>
            <li>other study materials</li>
          </ul>
          <P>you do not have to rebuild your study materials from scratch.</P>
          <P>start with the information you already have.</P>

          <H3>2. let wisker process your materials</H3>
          <P>
            wisker&apos;s ai analyzes the information you provide and helps
            turn it into study resources.
          </P>
          <P>
            instead of manually going through every page looking for
            possible questions, definitions, and important concepts, ai can
            help identify information that can be used for studying.
          </P>

          <H3>3. generate quizzes</H3>
          <P>use your materials to create practice questions.</P>
          <P>
            answer the questions without looking at your notes first. then
            review the answers and identify the topics you need to study
            more.
          </P>
          <P>this gives you a more active way to review your material.</P>

          <H3>4. generate flashcards</H3>
          <P>you can also turn your study materials into flashcards.</P>
          <P>flashcards can be useful for reviewing:</P>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
            <li>definitions</li>
            <li>concepts</li>
            <li>facts</li>
            <li>terminology</li>
            <li>processes</li>
            <li>important information</li>
          </ul>
          <P>
            instead of spending hours creating every card manually, you can
            use wisker to help prepare them for you.
          </P>

          <H3>5. review and practice</H3>
          <P>
            once your study resources are ready, use them as part of your
            study routine.
          </P>
          <P>a simple process could look like:</P>
          <P>learn → test yourself → review mistakes → practice again</P>
          <P>
            this lets you spend more of your study time actually engaging
            with the material.
          </P>

          <H2>why use ai for studying?</H2>
          <P>ai should not replace learning.</P>
          <P>
            instead, it can reduce some of the repetitive work involved in
            preparing for exams and reviewing information.
          </P>
          <P>
            for example, manually creating 100 flashcards can take a
            significant amount of time. if your main goal is to understand
            and remember the material, you may want to spend more of that
            time actually practicing.
          </P>
          <P>ai can help with the preparation.</P>
          <P>you still need to:</P>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
            <li>think about the answers</li>
            <li>understand the concepts</li>
            <li>review your mistakes</li>
            <li>identify weak areas</li>
            <li>apply what you have learned</li>
          </ul>
          <P>think of wisker as a study assistant.</P>
          <P>
            it helps you prepare materials, while you remain responsible
            for learning and understanding the content.
          </P>

          <H2>how to study more effectively with wisker</H2>
          <P>generating quizzes and flashcards is only part of the process.</P>
          <P>how you use them matters too.</P>

          <H3>use active recall</H3>
          <P>
            when reviewing a flashcard, do not immediately look at the
            answer.
          </P>
          <P>first, try to answer the question from memory.</P>
          <P>for example:</P>
          <P>what are the four bases found in dna?</P>
          <P>try to answer:</P>
          <P>adenine, thymine, cytosine, and guanine.</P>
          <P>then check your answer.</P>
          <P>
            this forces you to retrieve information instead of simply
            recognizing it on the page.
          </P>

          <H3>focus on what you do not know</H3>
          <P>if you repeatedly get a question wrong, pay attention to it.</P>
          <P>review the concept again and test yourself later.</P>
          <P>
            you do not need to spend equal amounts of time on everything.
            focus more attention on the topics you find difficult.
          </P>

          <H3>start with your existing materials</H3>
          <P>
            your class notes, lecture slides, pdfs, and other materials
            already contain information that you need to study.
          </P>
          <P>
            instead of searching for completely different resources, you
            can use those materials as the starting point for creating
            quizzes and flashcards with wisker.
          </P>

          <H2>who is wisker for?</H2>
          <P>
            wisker is designed for students who want a simpler way to
            prepare for studying.
          </P>

          <H3>college students</H3>
          <P>
            turn lecture notes and pdfs into quizzes and flashcards that can
            help you prepare for exams.
          </P>

          <H3>high school students</H3>
          <P>
            create additional practice materials from class notes and other
            learning resources.
          </P>

          <H3>university students with heavy coursework</H3>
          <P>
            when you have several subjects and large amounts of material to
            review, reducing the time spent creating study resources can be
            helpful.
          </P>

          <H3>students preparing for exams</H3>
          <P>
            create practice questions and flashcards from your study
            materials and use them to test your knowledge before an exam.
          </P>

          <H3>students who want a more organized study process</H3>
          <P>
            instead of keeping notes, questions, and flashcards in separate
            places, you can use wisker to help transform your materials
            into structured study resources.
          </P>

          <H2>wisker vs. studying from notes alone</H2>
          <P>
            reading your notes is useful, but reading something repeatedly
            does not necessarily mean you can recall it when you need it.
          </P>
          <P>consider two different study approaches.</P>

          <H3>traditional review</H3>
          <P>
            read your notes. read them again. highlight important sections.
            read them again. hope you remember everything during the exam.
          </P>

          <H3>active study</H3>
          <P>
            read your material. create questions. try answering without
            looking at the answer. identify what you got wrong. review the
            weak areas. test yourself again.
          </P>
          <P>
            the second approach requires you to actively retrieve
            information from memory.
          </P>
          <P>
            wisker is designed to make that type of study easier by helping
            you turn your existing materials into quizzes and flashcards.
          </P>

          <H2>turn your study materials into a study system</H2>
          <P>you may already have most of the information you need.</P>
          <P>
            the challenge is often turning that information into something
            you can actively practice.
          </P>
          <P>a pdf contains information.</P>
          <P>lecture notes contain information.</P>
          <P>a screenshot contains information.</P>
          <P>a quiz gives you a way to test yourself.</P>
          <P>a flashcard gives you a way to practice remembering.</P>
          <P>
            that is where an ai study tool like wisker can be useful.
          </P>
          <P>instead of spending hours asking:</P>
          <P>how do i create 50 flashcards?</P>
          <P>you can focus on:</P>
          <P>what do i need to learn?</P>
          <P>
            wisker helps bridge the gap between having study materials and
            actually practicing with them.
          </P>

          <H2>start studying with wisker</H2>
          <P>
            studying does not have to begin with hours of preparation.
          </P>
          <P>
            take the materials you already have and turn them into
            resources you can actively practice with.
          </P>
          <P>
            wisker uses ai to help transform your notes, pdfs, images, and
            other study materials into quizzes, flashcards, and other study
            resources.
          </P>
          <P>
            whether you are looking for an ai study tool, ai quiz
            generator, ai flashcard generator, flashcard maker, or quiz
            maker, wisker can help reduce the time you spend creating study
            materials so you can spend more time actually learning.
          </P>
          <P>
            study smarter. practice more. make your study materials work
            harder with wisker.
          </P>

          <a
            href="https://www.wisker.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-foreground px-6 py-2.5 text-sm text-background transition-opacity hover:opacity-80"
          >
            start studying with wisker ↗
          </a>
        </div>

      <Reveal delay={100}>
        <section aria-labelledby="faq-heading" className="mt-16">
          <h2 id="faq-heading" className="text-xl font-semibold sm:text-2xl">
            frequently asked questions
          </h2>
          <dl className="mt-6 divide-y divide-line border-t border-line">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-5">
                <dt className="text-base font-medium">{faq.q}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

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
