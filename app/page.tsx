import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import SocialLinks from "@/components/SocialLinks";
import Typewriter from "@/components/Typewriter";
import WorksGallery from "@/components/WorksGallery";
import { experience, services, skillGroups } from "@/lib/site";

const roles = [
  "digital marketer",
  "web developer & designer",
  "video editor",
  "digital artist",
];

export default function Home() {
  return (
    <div>
      {/* hero — full-bleed so the background shapes never clip at the container edge */}
      <section className="relative overflow-hidden">
        {/* decorative parallax shapes */}
        <Parallax
          speed={0.35}
          className="pointer-events-none absolute right-[-8rem] top-10 sm:right-[4vw]"
        >
          <div className="h-96 w-96 rounded-full bg-line/70 blur-3xl" />
        </Parallax>
        <Parallax
          speed={-0.25}
          className="pointer-events-none absolute bottom-4 left-[-8rem] sm:left-[2vw]"
        >
          <div className="h-80 w-80 rounded-full bg-line/50 blur-3xl" />
        </Parallax>

        <Parallax
          speed={-0.08}
          className="relative mx-auto flex min-h-[80vh] max-w-5xl flex-col justify-center px-6 py-24"
        >
          <div className="flex flex-col items-start gap-12 sm:flex-row sm:items-center sm:justify-between sm:gap-16">
            <div>
              <Reveal>
                <p className="text-sm text-muted">hi, i&apos;m</p>
              </Reveal>
              <Reveal delay={100}>
                <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-6xl">
                  ron deniele d. paragoso
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-6 text-lg text-muted sm:text-xl">
                  <span className="sr-only">
                    digital marketer, web developer &amp; designer, video
                    editor, and digital artist
                  </span>
                  <span aria-hidden="true">i&apos;m a </span>
                  <Typewriter words={roles} className="text-foreground" />
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                  i build brands and experiences that feel simple and work
                  beautifully.
                </p>
              </Reveal>
              <Reveal delay={400}>
                <div className="mt-10 flex gap-4">
                  <a
                    href="#works"
                    className="rounded-full bg-foreground px-6 py-2.5 text-sm text-background transition-opacity hover:opacity-80"
                  >
                    view works
                  </a>
                  <a
                    href="#contact"
                    className="rounded-full border border-line px-6 py-2.5 text-sm text-muted transition-colors hover:border-foreground hover:text-foreground"
                  >
                    get in touch
                  </a>
                </div>
              </Reveal>
              <Reveal delay={500}>
                <SocialLinks className="mt-8" />
              </Reveal>
            </div>

            <Reveal delay={200} className="shrink-0">
              <div className="relative h-56 w-56 overflow-hidden rounded-full border border-line bg-card sm:h-72 sm:w-72">
                <Image
                  src="/works/ron_hero_image.png"
                  alt="ron deniele d. paragoso"
                  fill
                  priority
                  sizes="(min-width: 640px) 288px, 224px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Parallax>
      </section>

      <div className="mx-auto max-w-5xl px-6">
      {/* services */}
      <section id="services" className="scroll-mt-24 border-t border-line py-24">
        <Reveal>
          <h2 className="text-sm tracking-widest text-muted">services</h2>
        </Reveal>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <li key={service.title}>
              <Reveal
                delay={i * 100}
                className="h-full rounded-lg border border-line bg-card p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="text-base font-medium">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* works */}
      <section id="works" className="scroll-mt-24 border-t border-line py-24">
        <Reveal>
          <h2 className="text-sm tracking-widest text-muted">works</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            selected projects from each field — pick a category to explore.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8">
            <WorksGallery />
          </div>
        </Reveal>
      </section>

      {/* skills */}
      <section id="skills" className="scroll-mt-24 border-t border-line py-24">
        <Reveal>
          <h2 className="text-sm tracking-widest text-muted">skills</h2>
        </Reveal>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.group} delay={i * 100}>
              <h3 className="text-xs tracking-widest text-muted">
                {group.group}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* about */}
      <section id="about" className="scroll-mt-24 border-t border-line py-24">
        <Reveal>
          <h2 className="text-sm tracking-widest text-muted">about</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed">
            i&apos;m ron — a multidisciplinary creative working across
            digital marketing and content creation, web development and
            design, video editing, and digital art.
          </p>
        </Reveal>
        <div className="mt-4 max-w-2xl space-y-4 text-base leading-relaxed text-muted">
          <Reveal delay={150}>
            <p>
              it started young, with a love for drawing — that grew into
              painting, digital art, and every creative discipline i could
              get my hands on.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p>
              i also grew up gaming, especially mmorpgs and strategy games.
              years of grinding taught me patience and grit, and a mindset of
              never giving up — something that shows up in how i approach
              every project today.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <p>
              in college i took up computer science, which let me merge that
              technical foundation with my creative side — building websites
              and web designs where art and code work together. from there i
              expanded into video editing, graphics design, and logo design.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p>
              more recently, i&apos;ve been learning and working with ai —
              using it to assist my workflow, increase efficiency, and raise
              the quality of what i deliver, without losing the human
              creativity behind it.
            </p>
          </Reveal>
          <Reveal delay={350}>
            <p>
              through it all, i love keeping things minimal: clear messaging,
              clean layouts, and work that speaks for itself. whether it&apos;s
              growing a brand online, building a website, cutting a video, or
              painting something from scratch, i bring the same care to every
              project.
            </p>
          </Reveal>
        </div>
      </section>

      {/* career */}
      <section id="career" className="scroll-mt-24 border-t border-line py-24">
        <Reveal>
          <h2 className="text-sm tracking-widest text-muted">career</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            the roles that shaped how i work today, from interning on
            backend systems to building web apps, running marketing
            analytics, and now working across development and marketing at
            once.
          </p>
        </Reveal>

        <div className="mt-10 space-y-6">
          {experience.map((company, i) => (
            <Reveal key={company.company} delay={i * 80}>
              <div className="rounded-lg border border-line bg-card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-medium">{company.company}</h3>
                  <span className="text-xs text-muted">
                    {company.location}
                  </span>
                </div>

                <div className="mt-5 space-y-5 border-l border-line pl-5">
                  {company.roles.map((role) => (
                    <div
                      key={`${company.company}-${role.title}-${role.period}`}
                      className="relative"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute -left-6 top-1.5 h-2 w-2 rounded-full ${
                          role.current ? "bg-foreground" : "bg-line"
                        }`}
                      />
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium">{role.title}</p>
                        {role.current && (
                          <span className="rounded-full border border-foreground px-2 py-0.5 text-[10px] tracking-wide text-foreground">
                            current
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        {role.period}
                        {role.type ? ` · ${role.type}` : ""}
                      </p>
                      <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted">
                        {role.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="scroll-mt-24 border-t border-line py-24">
        <Reveal>
          <h2 className="text-sm tracking-widest text-muted">contact</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed">
            have a project in mind or just want to say hi? fill out the form
            below.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </section>
      </div>
    </div>
  );
}
