/**
 * Stands in for a project that has no screenshot: a two-stop gradient with the
 * project's initials over it.
 *
 * The hue comes from the title, so a project keeps the same colour everywhere
 * it appears (card strip, grid tile, detail panel) and the set as a whole
 * reads as a palette rather than as noise.
 */

/** a small, stable hash so the same title always lands on the same hue */
function hueOf(title: string) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash * 31 + title.charCodeAt(i)) % 360;
  }
  return hash;
}

/** up to two letters, skipping words that carry no identity */
export function initialsOf(title: string) {
  const skip = new Set(["a", "an", "the", "and", "of", "for", "ep."]);
  const words = title
    .replace(/[^\p{L}\p{N}\s.]/gu, " ")
    .split(/\s+/)
    .filter((w) => w && !skip.has(w.toLowerCase()));
  if (words.length === 0) return title.slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function WorkGlyph({
  title,
  className = "",
  textClassName = "text-lead",
}: {
  title: string;
  className?: string;
  /** the caller owns the size, since a strip tile and a detail panel differ */
  textClassName?: string;
}) {
  const hue = hueOf(title);
  return (
    <div
      aria-hidden="true"
      className={`work-glyph grid h-full w-full place-items-center ${className}`}
      style={
        {
          "--glyph-from": `hsl(${hue} 62% 46%)`,
          "--glyph-to": `hsl(${(hue + 46) % 360} 58% 24%)`,
        } as React.CSSProperties
      }
    >
      <span
        className={`font-serif leading-none text-white/90 ${textClassName}`}
      >
        {initialsOf(title)}
      </span>
    </div>
  );
}
