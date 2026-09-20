import Image from "next/image";
import WorkGlyph from "@/components/dashboard/WorkGlyph";
import { works, type WorkCategory } from "@/lib/site";

export default function WorksCard({ category }: { category: WorkCategory }) {
  const items = works.filter((w) => w.category === category);
  const live = items.filter((w) => w.liveUrl).length;

  /**
   * One tile per image, and a gradient glyph for a project that has none, so
   * link-only work (the video edits) still fills the strip.
   */
  type Tile = { key: string; src: string | null; title: string };
  const tiles = items.flatMap<Tile>((work) => {
    const images = work.images ?? (work.image ? [work.image] : []);
    return images.length > 0
      ? images.map((src) => ({ key: src, src, title: work.title }))
      : [{ key: work.title, src: null, title: work.title }];
  });

  return (
    <div className="flex h-full flex-col gap-2.5">
      {/* A marquee rather than a static grid: it shows far more of the work in
          the same space. The track is the list rendered twice and shifted by
          exactly half its width, which is what makes the loop seamless. */}
      <div className="marquee min-h-0 flex-1">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-run" key={copy} aria-hidden={copy === 1}>
              {tiles.map((tile) => (
                <div
                  key={`${copy}-${tile.key}`}
                  className={`relative h-full w-[7.5rem] shrink-0 overflow-hidden rounded-md border border-line bg-sunk @min-[22rem]:w-[9.5rem] ${
                    tile.src ? "thumb-duotone" : ""
                  }`}
                >
                  {tile.src ? (
                    <Image
                      src={tile.src}
                      alt=""
                      fill
                      sizes="152px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <WorkGlyph title={tile.title} textClassName="text-title" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="label shrink-0 text-faint">
        {items.length} projects
        {live > 0 && (
          <>
            <span className="mx-1.5 text-line-strong">/</span>
            <span className="text-accent-ink">{live} live</span>
          </>
        )}
      </p>
    </div>
  );
}
