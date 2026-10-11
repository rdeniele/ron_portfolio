"use client";

export default function ChapterPager({ index, count, label, controls, onChange }: {
  index: number; count: number; label: string; controls: string;
  onChange: (index: number) => void;
}) {
  return <div className="forge-chapter-pager" role="group" aria-label={`${label} pages`}>
    <button type="button" aria-label={`previous ${label} page`} aria-controls={controls} onClick={()=>onChange((index - 1 + count) % count)}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
    </button>
    <span aria-live="polite" aria-atomic="true">{index + 1} <span>/</span> {count}</span>
    <button type="button" aria-label={`next ${label} page`} aria-controls={controls} onClick={()=>onChange((index + 1) % count)}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg>
    </button>
  </div>;
}
