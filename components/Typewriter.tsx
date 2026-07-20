"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
};

export default function Typewriter({
  words,
  typingSpeed = 70,
  deletingSpeed = 40,
  pause = 1600,
  className,
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const word = words[index % words.length];
    let timeout: number | undefined;

    if (!deleting && text === word) {
      timeout = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = window.setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deletingSpeed : typingSpeed,
      );
    }
    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, reduced, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className} aria-hidden="true">
      {reduced ? words[0] : text}
      <span className="cursor-blink ml-0.5 inline-block h-[1em] w-px translate-y-[0.15em] bg-current" />
    </span>
  );
}
