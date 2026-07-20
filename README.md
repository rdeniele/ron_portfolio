# ron deniele d. paragoso — portfolio

minimal personal portfolio built with next.js, typescript, and tailwind css.

## fields

- digital marketing
- web development & design
- video editing
- digital art

## getting started

```bash
npm install
npm run dev
```

open [http://localhost:3000](http://localhost:3000).

## customizing

- **your details, services, and projects** live in [`lib/site.ts`](lib/site.ts) — edit the placeholder projects there.
- **project images**: drop files into `public/works/` and set the `image` field on each work (e.g. `/works/my-project.jpg`).
- **domain**: set `NEXT_PUBLIC_SITE_URL` (or edit `siteConfig.url`) once you have your real domain so seo tags, sitemap, and robots point to it.

## seo

includes open graph + twitter metadata, json-ld person/website schema, `sitemap.xml`, and `robots.txt` out of the box.
