import { services } from "@/lib/site";

export default function ServicesModal() {
  return (
    <div className="grid gap-px bg-line sm:grid-cols-2">
      {services.map((service, i) => (
        <div key={service.title} className="bg-surface p-5 sm:p-7">
          <span className="label text-faint tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 font-serif text-title leading-tight text-ink">
            {service.title}
          </h3>
          <p className="mt-2 text-fine leading-relaxed text-muted">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  );
}
