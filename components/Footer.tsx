import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-8 text-xs text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="transition-colors hover:text-foreground"
        >
          {siteConfig.email}
        </a>
      </div>
    </footer>
  );
}
