export type BlogPost = {
  slug: string;
  title: string;
  /** shorter title used for cards / nav, if the full title is long */
  shortTitle?: string;
  description: string;
  date: string;
  /** path under /public, or a full https url */
  image: string;
  imageAlt: string;
  imageCredit?: { name: string; url: string };
  keywords: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-study-tool",
    title:
      "Wisker: An AI Study Tool for Quizzes, Flashcards, and Smarter Studying",
    shortTitle: "Wisker: An AI Study Tool for Smarter Studying",
    description:
      "Wisker is an AI study tool that turns PDFs, notes, and slides into quizzes and flashcards. See how an AI quiz generator and flashcard maker can help you study smarter.",
    date: "2026-08-10",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "person taking notes by hand while studying at a desk",
    imageCredit: {
      name: "Unseen Studio",
      url: "https://unsplash.com/@uns__nstudio",
    },
    keywords: [
      "ai study tool",
      "ai quiz generator",
      "ai flashcard generator",
      "flashcard maker",
      "quiz maker",
      "study smarter",
      "active recall",
      "wisker app",
    ],
  },
  {
    slug: "best-websites-tools-for-students",
    title: "Best Websites and Tools for Students: A Student's Essential Toolkit",
    shortTitle: "Best Websites and Tools for Students",
    description:
      "A student's toolkit of the best websites and apps for notes, deadlines, studying, research, presentations, video editing, and citations, including Notion, Wisker, Canva, and Google Scholar.",
    date: "2026-08-10",
    image:
      "https://images.unsplash.com/photo-1764096534662-a194a348c4a0?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "desk with a laptop, books, and papers at night",
    imageCredit: {
      name: "Yen Vu",
      url: "https://unsplash.com/@yenvu2410",
    },
    keywords: [
      "best websites for students",
      "best apps for students",
      "student productivity tools",
      "study tools",
      "notion for students",
      "google scholar",
      "citation machine",
      "wisker app",
      "student toolkit",
    ],
  },
  {
    slug: "how-i-made-wisker",
    title: "How I Made Wisker: From a Study Idea to an AI Study App",
    shortTitle: "How I Made Wisker",
    description:
      "The story of building Wisker, an AI study app, from a NoteJewel prototype and active recall study technique to a Next.js and React Native product with 20 users.",
    date: "2026-08-10",
    image: "/works/graphics/wiskerpubmat.png",
    imageAlt: "wisker ai study buddy product screenshot with the wisky mascot",
    keywords: [
      "how i made wisker",
      "wisker app story",
      "building an ai study app",
      "indie hacker story",
      "active recall",
      "notejewel",
      "wisky mascot",
      "next.js ai app",
    ],
  },
  {
    slug: "computer-science-to-web-development-ai-marketing",
    title:
      "How I Went From a Computer Science Student to Working in Web Development, AI, and Marketing",
    shortTitle: "From CS Student to Web Dev, AI & Marketing",
    description:
      "My career path from a computer science student to working in web development, AI, design, video editing, and marketing, plus the lessons burnout and rejection taught me along the way.",
    date: "2026-08-11",
    image:
      "https://images.unsplash.com/photo-1536420123832-cd5867531583?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "aerial view of a winding road through a forest",
    imageCredit: {
      name: "Taneli Lahtinen",
      url: "https://unsplash.com/@tanelah",
    },
    keywords: [
      "computer science career path",
      "how i became a web developer",
      "self-taught developer",
      "career change tips",
      "ai assisted development",
      "tech career journey",
      "dealing with rejection in tech",
      "burnout in software development",
      "wisker app",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
