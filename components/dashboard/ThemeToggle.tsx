"use client";

const STORAGE_KEY = "rdp-theme";

/**
 * Which icon shows is decided in CSS from the same signals that drive the
 * palette (`data-theme` plus `prefers-color-scheme`), so there is no theme
 * state to hydrate and no flash of the wrong icon on load.
 */
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage can be blocked - the toggle still works for this session */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="switch between light and dark theme"
      className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line text-muted transition-[color,border-color,transform] duration-150 hover:border-line-strong hover:text-ink active:scale-95"
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
        {/* shown while the light palette is active - press to go dark */}
        <path
          className="icon-moon"
          d="M13.5 9.5A5.6 5.6 0 0 1 6.5 2.5a5.8 5.8 0 1 0 7 7Z"
          fill="currentColor"
        />
        {/* shown while the dark palette is active - press to go light */}
        <g className="icon-sun">
          <circle cx="8" cy="8" r="3" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
            <path d="M8 1v1.6M8 13.4V15M1 8h1.6M13.4 8H15M3 3l1.1 1.1M11.9 11.9 13 13M13 3l-1.1 1.1M4.1 11.9 3 13" />
          </g>
        </g>
      </svg>
    </button>
  );
}
