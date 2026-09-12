export const siteConfig = {
  // set NEXT_PUBLIC_SITE_URL (or edit this) once you have your real domain
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rondeniele.vercel.app",
  name: "ron deniele d. paragoso",
  alternateName: "ronddpixels",
  initials: "rdp",
  title: "ron deniele d. paragoso — digital marketer, web developer & designer",
  description:
    "portfolio of ron deniele d. paragoso — digital marketing specialist and content creator, web developer and designer, video editor, and digital artist. explore projects, services, and creative work.",
  email: "work.rparagoso@gmail.com",
  ogImage: "/works/ron_hero_image.png",
  keywords: [
    "ron deniele paragoso",
    "ron paragoso",
    "ron deniele",
    "rond paragoso",
    "ronddpixels",
    "rdp portfolio",
    "digital marketing",
    "digital marketer",
    "content creation",
    "content creator",
    "content strategist",
    "web development",
    "web developer",
    "software developer",
    "ai developer",
    "creative web developer",
    "web design",
    "web designer",
    "frontend developer",
    "full-stack marketer",
    "ui ux designer",
    "video editing",
    "video editor",
    "motion graphics",
    "graphic design",
    "digital art",
    "digital artist",
    "brand identity design",
    "landing page design",
    "google analytics",
    "google tag manager",
    "ai image generation",
    "portfolio",
    "freelance digital marketer",
    "freelance web developer",
    "freelance video editor",
    "hire web developer",
    "hire digital marketer",
    "hire video editor",
  ],
  sameAs: [
    "https://www.linkedin.com/in/rondparagoso",
    "https://github.com/rdeniele",
    "https://www.tiktok.com/@ronddpixels",
    "https://www.instagram.com/ronddpixels/?hl=en",
  ],
};

export type WorkCategory =
  | "digital marketing and content creation"
  | "web development & design"
  | "video editing"
  | "digital art";

export const workCategories: WorkCategory[] = [
  "web development & design",
  "digital marketing and content creation",
  "video editing",
  "digital art",
];

export type Work = {
  title: string;
  category: WorkCategory;
  description: string;
  /** path under /public, e.g. /works/wisker.jpg */
  image?: string;
  /** two or more images shown side by side instead of a single thumbnail */
  images?: string[];
  /** blur the thumbnail — for confidential client work */
  blurImage?: boolean;
  /**
   * the project's real, reachable production url. set only where a live site
   * exists — it is what the in-portfolio browser preview loads, so design-only
   * work deliberately leaves it undefined.
   */
  liveUrl?: string;
  links?: { label: string; href: string }[];
};

export const works: Work[] = [
  // digital marketing
  {
    title: "wisker",
    category: "digital marketing and content creation",
    description:
      "social media marketing for an ai-assisted study platform — content and community growth for students using summaries, quizzes, and flashcards.",
    image: "/works/digital marketing/wisker.png",
    links: [
      {
        label: "view on facebook",
        href: "https://www.facebook.com/profile.php?id=61577887210771",
      },
    ],
  },
  {
    title: "pera stories ph",
    category: "digital marketing and content creation",
    description:
      "a channel that teaches personal finance through storytelling — making money lessons simple and relatable.",
    image: "/works/digital marketing/perastoriesph.png",
    links: [
      {
        label: "watch on youtube",
        href: "https://www.youtube.com/@pera_stories_ph",
      },
    ],
  },

  {
    title: "ronddpixels",
    category: "digital marketing and content creation",
    description:
      "my personal brand about different things in my life — hobbies, interests, and more.",
    images: [
      "/works/digital marketing/ronddpixelstiktok.png",
      "/works/digital marketing/ronddpixelsinstagram.png",
    ],
    links: [
      { label: "tiktok", href: "https://www.tiktok.com/@ronddpixels" },
      {
        label: "instagram",
        href: "https://www.instagram.com/ronddpixels/?hl=en",
      },
    ],
  },

  // web development & design
  {
    title: "wisker",
    category: "web development & design",
    description:
      "ai-assisted study platform that turns pdfs, slides, and images into summaries, quizzes, and flashcards for active recall.",
    image: "/works/web development and design/wisker_landingpage.png",
    liveUrl: "https://wisker-web.vercel.app",
    links: [{ label: "visit site", href: "https://wisker-web.vercel.app" }],
  },
  {
    title: "simplabots",
    category: "web development & design",
    description:
      "ai platform with multiple agents and bots that help businesses automate and scale.",
    image: "/works/web development and design/simplabots.png",
    liveUrl: "https://simplabots.com",
    links: [{ label: "visit site", href: "https://simplabots.com" }],
  },
  {
    title: "artbliss hotel",
    category: "web development & design",
    description:
      "landing page for a nature-friendly hotel and real estate brand.",
    image: "/works/web development and design/artbliss_about_page.png",
    liveUrl: "https://www.artblisshotel.com",
    links: [{ label: "visit site", href: "https://www.artblisshotel.com" }],
  },
  {
    title: "home team capital",
    category: "web development & design",
    description: "landing page for a real estate investing brand.",
    image: "/works/web development and design/home team capital.png",
    liveUrl: "https://hometeamcapital.vercel.app",
    links: [
      { label: "visit site", href: "https://hometeamcapital.vercel.app" },
    ],
  },
  {
    title: "coastal haven design + build",
    category: "web development & design",
    description:
      "landing page showcasing a gallery of designs for real estate projects.",
    image:
      "/works/web development and design/coastalhavendesign_plus_build.png",
    liveUrl: "https://www.coastalhaven-design-build.com",
    links: [
      {
        label: "visit site",
        href: "https://www.coastalhaven-design-build.com",
      },
    ],
  },
  {
    title: "dwell luxury rentals",
    category: "web development & design",
    description: "landing page for a luxury rentals real estate brand.",
    image: "/works/web development and design/dwell luxury rentals.png",
    liveUrl: "https://www.dwelluxuryrentals.com",
    links: [{ label: "visit site", href: "https://www.dwelluxuryrentals.com" }],
  },
  {
    title: "home team luxury rentals",
    category: "web development & design",
    description: "landing page for a luxury rentals real estate brand.",
    image: "/works/web development and design/hometeamluxuryrentals.png",
    liveUrl: "https://hometeamluxuryrentals.com",
    links: [{ label: "visit site", href: "https://hometeamluxuryrentals.com" }],
  },
  {
    title: "home team vacation rentals",
    category: "web development & design",
    description: "landing page for a vacation rentals real estate brand.",
    image: "/works/web development and design/HTVR-B4hj3Yjo.png",
  },
  {
    title: "budyet",
    category: "web development & design",
    description: "design and build for a budgeting web app.",
    image: "/works/web development and design/BudYet.png",
  },
  {
    title: "haulivo",
    category: "web development & design",
    description: "website design and build for haulivo.",
    image: "/works/web development and design/Haulivo.png",
  },
  {
    title: "signiton",
    category: "web development & design",
    description: "design for an e-signature web app.",
    image: "/works/web development and design/SignItOn.jpg",
  },
  {
    title: "bean brewing cafe",
    category: "web development & design",
    description: "website design for a coffee shop brand.",
    image: "/works/web development and design/bean-brewing-cafe.png",
  },
  {
    title: "donmacc",
    category: "web development & design",
    description: "website design for donmacc.",
    image: "/works/web development and design/donmacc.png",
  },
  {
    title: "finsensei chat ai",
    category: "web development & design",
    description: "web app design for an ai finance chat assistant.",
    image: "/works/web development and design/finsenseichatAI.png",
  },
  {
    title: "mybot",
    category: "web development & design",
    description: "web app design for a chatbot platform.",
    image: "/works/web development and design/myBot.png",
  },
  {
    title: "notejewel ai",
    category: "web development & design",
    description: "web app design for an ai note-taking tool.",
    image: "/works/web development and design/noteJewel_AI.png",
  },
  {
    title: "ritwal",
    category: "web development & design",
    description: "website design for ritwal.",
    image: "/works/web development and design/ritwal.png",
  },
  {
    title: "thoughts",
    category: "web development & design",
    description: "website design for thoughts.",
    image: "/works/web development and design/thoughts.png",
  },

  // video editing
  {
    title: "wisker ad ep. 1",
    category: "video editing",
    description: "promotional ad for the wisker study platform.",
    links: [
      {
        label: "watch",
        href: "https://drive.google.com/file/d/1zw_E0bOUEipmycTOei9tcehHQAknlxyF/view?usp=sharing",
      },
    ],
  },
  {
    title: "wisker app demo ad",
    category: "video editing",
    description: "app demo ad walking through the wisker experience.",
    links: [
      {
        label: "watch",
        href: "https://drive.google.com/file/d/1x5e0d1rkHDghiSXku-f5odrZiXcWmaQi/view?usp=sharing",
      },
    ],
  },
  {
    title: "wisker app demo ad 2",
    category: "video editing",
    description: "follow-up demo ad for the wisker app.",
    links: [
      {
        label: "watch",
        href: "https://drive.google.com/file/d/10_RWf2oZj4SInH-FPBJLYDVNfFDvyU_u/view?usp=sharing",
      },
    ],
  },
  {
    title: "podcast",
    category: "video editing",
    description: "podcast episode edit — pacing, cuts, and polish.",
    links: [
      {
        label: "watch",
        href: "https://drive.google.com/file/d/1D4mXrkCRrOo98vIfYKnTaL7s3grNKIwQ/view?usp=sharing",
      },
    ],
  },
  {
    title: "real estate marketing ad",
    category: "video editing",
    description: "marketing ad edit for a real estate brand.",
    links: [
      {
        label: "watch",
        href: "https://drive.google.com/file/d/1IurR70QbXLRynB_Wagbt2D12st5BkAZ0/view?usp=sharing",
      },
    ],
  },
  {
    title: "psychology brand",
    category: "video editing",
    description: "video edit for a psychology brand.",
    links: [
      {
        label: "watch",
        href: "https://drive.google.com/file/d/1AD7BrXsZHovCRug_BGZ4Vg6g9S1Hx4oT/view?usp=sharing",
      },
    ],
  },
  {
    title: "sticker brand — ai ugc",
    category: "video editing",
    description: "ai-generated ugc-style ad for a sticker brand.",
    links: [
      {
        label: "watch",
        href: "https://drive.google.com/file/d/1KyIar_4wH6d8mC-YwM0-k0uv7xpuC8lv/view?usp=sharing",
      },
    ],
  },
  {
    title: "ointment brand — ai ugc",
    category: "video editing",
    description: "ai-generated ugc-style ad for a skincare ointment brand.",
    blurImage: true,
    links: [
      {
        label: "watch",
        href: "https://drive.google.com/file/d/1diYrC55z3HnEEkIPQu_kjse1OBfvHOl7/view?usp=sharing",
      },
    ],
  },
  {
    title: "paint brand",
    category: "video editing",
    description: "series of video ads edited for a paint brand.",
    blurImage: true,
    links: [
      {
        label: "watch 1",
        href: "https://drive.google.com/file/d/1_pWsPxmW8y6EUEOzMhUjlnt8HARxUyO-/view?usp=sharing",
      },
      {
        label: "watch 2",
        href: "https://drive.google.com/file/d/11yrpjC4uPG-C7PbXeTNTcXGIPcBL0k8s/view?usp=sharing",
      },
      {
        label: "watch 3",
        href: "https://drive.google.com/file/d/1ygLauzZ6PC5UIeSMzcvWGqKBgJH2J05Y/view?usp=sharing",
      },
    ],
  },
  {
    title: "ai saas company",
    category: "video editing",
    description:
      "series of video ads for an ai saas company, where i work as a full-stack marketer.",
    blurImage: true,
    links: [
      {
        label: "watch 1",
        href: "https://drive.google.com/file/d/1w2vr-BchDMX5H9TzNdEos_e30ST770PJ/view?usp=sharing",
      },
      {
        label: "watch 2",
        href: "https://drive.google.com/file/d/1s4Qnsqa_MblC_0IAw548l6OoEDG6q_X-/view?usp=sharing",
      },
      {
        label: "watch 3",
        href: "https://drive.google.com/file/d/15gKuDvTUfBUCoZ3r223w-PKzqWNpC8_y/view?usp=sharing",
      },
      {
        label: "watch 4",
        href: "https://drive.google.com/file/d/1qcqOdgKBZX7YttknwdnAPaFEB0lVaacq/view?usp=sharing",
      },
      {
        label: "watch 5",
        href: "https://drive.google.com/file/d/17rI_WEqtyqzFPMLBkS2RNvxMuccarK2I/view?usp=sharing",
      },
      {
        label: "watch 6",
        href: "https://drive.google.com/file/d/1aj9sDpyMTYYg_wXG8yWiPVDbm7hlyk2E/view?usp=sharing",
      },
      {
        label: "watch 7",
        href: "https://drive.google.com/file/d/1GOKdOzVG7z_9dPohuyxYcyFNekvepjyB/view?usp=sharing",
      },
    ],
  },

  // digital art
  {
    title: "wisker pubmat",
    category: "digital art",
    description: "publication material designed for wisker.",
    image: "/works/graphics/wiskerpubmat.png",
  },
  {
    title: "wisker",
    category: "digital art",
    description: "social media graphic for wisker.",
    image: "/works/graphics/wisker2.jpg",
  },
  {
    title: "handyranie",
    category: "digital art",
    description: "brand graphic for handyranie.",
    image: "/works/graphics/handyranie.png",
  },
  {
    title: "haulivo",
    category: "digital art",
    description: "brand graphic for haulivo.",
    image: "/works/graphics/haulivo.png",
  },
  {
    title: "hayde park hotel",
    category: "digital art",
    description: "graphic design for hayde park hotel.",
    image: "/works/graphics/haydeparkhotel.png",
  },
  {
    title: "legality",
    category: "digital art",
    description: "graphic design for legality.",
    image: "/works/graphics/legality.png",
  },
  {
    title: "thoughts",
    category: "digital art",
    description: "brand graphic for thoughts.",
    image: "/works/graphics/thoughts.png",
  },
  {
    title: "vireonest",
    category: "digital art",
    description: "brand graphic for vireonest.",
    image: "/works/graphics/vireonest.png",
  },
];

export type ExperienceRole = {
  title: string;
  period: string;
  type?: string;
  current?: boolean;
  bullets: string[];
};

export type Experience = {
  company: string;
  location: string;
  roles: ExperienceRole[];
};

export const experience: Experience[] = [
  {
    company: "holistic seo digital",
    location: "remote",
    roles: [
      {
        title: "web developer",
        period: "jul 2026 - present",
        type: "full-time",
        current: true,
        bullets: [
          "build landing pages and handle the technical side of web projects, including domains, dns, and nameserver configuration.",
          "work across figma, figma-to-code, codepen, claude, and website builders to move quickly from design to a finished page.",
        ],
      },
    ],
  },
  {
    company: "gintex.ai",
    location: "remote",
    roles: [
      {
        title: "video editor, marketing & automations",
        period: "jun 2026 - present",
        type: "part-time",
        current: true,
        bullets: [
          "edit ads, reels, and carousels, and write scripts for video and social content.",
          "plan marketing campaigns, build landing pages and static graphics, and automate marketing workflows using the company's own app.",
        ],
      },
    ],
  },
  {
    company: "the rise collective",
    location: "florida, usa - remote",
    roles: [
      {
        title: "technical marketing & web systems specialist",
        period: "jan 2026 - mar 2026",
        bullets: [
          "built and optimized responsive web applications and landing pages, translating figma and canva designs into high-quality ui with strong ux consistency across devices.",
          "developed 5+ responsive websites from figma and canva designs, contributing to a 30–40% improvement in engagement.",
        ],
      },
      {
        title: "marketing data & analytics specialist",
        period: "dec 2025 - jan 2026",
        type: "contract",
        bullets: [
          "implemented google analytics and google tag manager for full tracking coverage across key user events, building reporting dashboards that cut manual reporting time by 50%.",
          "analyzed performance data to identify bottlenecks, driving a 20% improvement in conversion-related metrics.",
        ],
      },
      {
        title: "technical marketing & web systems specialist",
        period: "jan 2024 - feb 2025",
        bullets: [
          "designed and developed 10+ responsive websites with user-focused ui, improving load times by 30%+ and core web vitals.",
          "managed ongoing maintenance, including bug fixes, updates, and performance improvements.",
        ],
      },
    ],
  },
  {
    company: "outrank strategy",
    location: "centerville, ut - remote",
    roles: [
      {
        title: "front-end and ai developer",
        period: "jun 2025",
        type: "full-time",
        bullets: [
          "developed and maintained responsive front-end interfaces for ai-powered saas platforms using next.js and tailwind css, as part of a 3-person front-end team within a 6-developer team.",
          "ensured ui quality through front-end testing, debugging, and git-based version control, working closely with back-end developers for smooth integration and deployment.",
        ],
      },
    ],
  },
  {
    company: "green module systems",
    location: "bacolod city, philippines",
    roles: [
      {
        title: "software developer",
        period: "jun 2024 - aug 2024",
        type: "intern",
        bullets: [
          "developed and deployed finance and hr systems using laravel and codeigniter, improving operational efficiency by 60%.",
          "managed application deployment and server environments, handling maintenance and debugging for internal tools.",
        ],
      },
    ],
  },
];

export const skillGroups = [
  {
    group: "development",
    skills: [
      "frontend development",
      "backend development",
      "web development",
      "web design",
      "ui design",
      "ux design",
      "landing page design",
      "conversion-focused design",
    ],
  },
  {
    group: "marketing & content",
    skills: [
      "digital marketing",
      "content creation",
      "content strategy",
      "social media content creation",
      "short-form video content",
      "ugc-style content creation",
      "marketing campaign support",
      "paid ads management (boosted posts)",
    ],
  },
  {
    group: "analytics",
    skills: ["google analytics", "google tag manager", "analytics tracking"],
  },
  {
    group: "design & video",
    skills: [
      "digital art",
      "graphic design",
      "brand identity design",
      "ai image generation",
      "video editing",
      "motion graphics",
    ],
  },
];

export const services = [
  {
    title: "digital marketing and content creation",
    description:
      "social media management, seo, content creation, and campaigns that grow your brand.",
  },
  {
    title: "web development & design",
    description:
      "modern, responsive, and fast websites — designed and built from the ground up.",
  },
  {
    title: "video editing",
    description:
      "engaging edits for promos, socials, and events — from raw footage to final cut.",
  },
  {
    title: "digital art",
    description:
      "illustrations, posters, and custom artwork with a distinct personal style.",
  },
];

/* ---------------------------------------------------------------------------
 * dashboard content
 * ------------------------------------------------------------------------- */

export const identity = {
  greeting: "hi, i'm",
  name: "ron deniele d. paragoso",
  /** cycled by the typewriter, and listed in full on the identity card */
  roles: [
    "web developer",
    "software developer",
    "ai developer",
    "digital marketer",
    "content creator",
    "digital artist",
    "creative web developer",
  ],
  /** one-line positioning statement shown on the identity card */
  statement: "i build brands and experiences that feel simple and work beautifully.",
  /** compact role line used in the sidebar under the portrait */
  roleLine: "digital marketer · web developer · designer · video editor",
  portrait: "/works/ron_hero_image.png",
};

/** the about story, broken into short readable sections rather than one block */
export const about = {
  lede:
    "i'm ron — a multidisciplinary creative working across digital marketing and content creation, web development and design, video editing, and digital art.",
  sections: [
    {
      label: "origin",
      body:
        "it started young, with a love for drawing — that grew into painting, digital art, and every creative discipline i could get my hands on.",
    },
    {
      label: "grit",
      body:
        "i also grew up gaming, especially mmorpgs and strategy games. years of grinding taught me patience and grit, and a mindset of never giving up — something that shows up in how i approach every project today.",
    },
    {
      label: "craft",
      body:
        "in college i took up computer science, which let me merge that technical foundation with my creative side — building websites and web designs where art and code work together. from there i expanded into video editing, graphics design, and logo design.",
    },
    {
      label: "ai",
      body:
        "more recently, i've been learning and working with ai — using it to assist my workflow, increase efficiency, and raise the quality of what i deliver, without losing the human creativity behind it.",
    },
    {
      label: "philosophy",
      body:
        "through it all, i love keeping things minimal: clear messaging, clean layouts, and work that speaks for itself. whether it's growing a brand online, building a website, cutting a video, or painting something from scratch, i bring the same care to every project.",
    },
  ],
};

export const contact = {
  prompt: "have a project in mind or just want to say hi?",
  email: siteConfig.email,
  typeformId: "01KY00H0BEYVDEVT9K7ZZ3DKT6",
  socials: [
    { label: "linkedin", href: "https://www.linkedin.com/in/rondparagoso" },
    { label: "github", href: "https://github.com/rdeniele" },
  ],
};

export const careerBlurb =
  "the roles that shaped how i work today, from interning on backend systems to building web apps, running marketing analytics, and now working across development and marketing at once.";
