import Image from "next/image";
import { workCategories, works } from "@/lib/site";

const PREVIEW = [
  "/works/web development and design/wisker_landingpage.png",
  "/works/web development and design/simplabots.png",
  "/works/web development and design/artbliss_about_page.png",
  "/works/graphics/wiskerpubmat.png",
];

export default function WorksCard() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-2 @min-[22rem]:grid-cols-4">
        {PREVIEW.map((src, i) => (
          <div
            key={src}
            className={`relative min-h-0 overflow-hidden rounded-md border border-line bg-sunk ${
              i > 1 ? "hidden @min-[22rem]:block" : ""
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 1023px) 24vw, 160px"
              className="object-cover object-top opacity-90 transition-[opacity,transform] duration-300 group-hover/card:opacity-100 group-hover/card:scale-[1.03]"
              priority={i < 2}
            />
          </div>
        ))}
      </div>
      {/* the full category breakdown only fits once the card is wide enough */}
      <ul className="hidden shrink-0 flex-wrap gap-x-4 gap-y-1 @min-[22rem]:flex">
        {workCategories.map((cat) => (
          <li key={cat} className="label text-faint">
            {cat.replace(" and content creation", "").replace(" & design", "")}
            <span className="ml-1.5 text-accent tabular-nums">
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
