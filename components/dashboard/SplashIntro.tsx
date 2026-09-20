/**
 * The opening card: the name on a full-bleed panel that lifts away to reveal
 * the dashboard.
 *
 * Deliberately stateless. It renders on the server, so the very first paint is
 * the splash rather than a flash of dashboard, and the animation is pure CSS
 * that ends on its final frame, so the panel clears even where the script
 * never runs. Whether it plays at all is decided before paint by the inline
 * script in the root layout, which marks repeat visits with data-splash="seen".
 */
export default function SplashIntro({ label }: { label: string }) {
  return (
    <div className="splash" aria-hidden="true">
      <div className="splash-mark">
        <p className="splash-name font-serif">ron deniele d. paragoso</p>
        <p className="label splash-label">
          <span className="splash-dot" />
          {label}
        </p>
      </div>
    </div>
  );
}
