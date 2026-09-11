import Image from "next/image";
import { workCategories, works } from "@/lib/site";

/** every project image, in the order the works appear */
const THUMBS = works.flatMap((work) =>
  work.images ?? (work.image ? [work.image] : []),
);

export default function WorksCard() {
  return (
    <div className="flex h-full flex-col gap-2.5">
      {/* A marquee rather than a static grid: it shows far more of the work in
          the same space. The track is the list rendered twice and shifted by
          exactly half its width, which is what makes the loop seamless. */}
      <div className="marquee min-h-0 flex-1">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-run" key={copy} aria-hidden={copy === 1}>
              {THUMBS.map((src) => (
                <div
                  key={`${copy}-${src}`}
                  className="thumb-duotone relative h-full w-[7.5rem] shrink-0 overflow-hidden rounded-md border border-line bg-sunk @min-[22rem]:w-[9.5rem]"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="152px"
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* the full category breakdown only fits once the card is wide enough */}
      <ul className="hidden shrink-0 flex-wrap gap-x-4 gap-y-1 @min-[22rem]:flex">
        {workCategories.map((cat) => (
          <li key={cat} className="label text-faint">
            {cat.replace(" and content creation", "").replace(" & design", "")}
            <span className="ml-1.5 text-accent-ink tabular-nums">
              {works.filter((w) => w.category === cat).length}
            </span>
          </li>
        ))}
      </ul>

      <p className="label shrink-0 text-faint @min-[22rem]:hidden">
        {works.length} projects
        <span className="mx-1.5 text-line-strong">/</span>
        {workCategories.length} categories
      </p>
    </div>
  );
}
