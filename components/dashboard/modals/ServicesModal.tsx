"use client";
import { useState } from "react";
import { services } from "@/lib/site";
import ChapterPager from "@/components/dashboard/ChapterPager";
export default function ServicesModal() {
  const [selected,setSelected] = useState(0);
  const active = services[selected];
  return <div className="px-5 py-6 sm:px-7">
    <ChapterPager index={selected} count={services.length} label="services" controls="service-details" onChange={setSelected} />
    <section id="service-details" className="forge-journal-page"><h3 className="font-serif text-title text-ink">{active.title}</h3><p className="mt-3 text-body leading-relaxed text-muted">{active.description}</p></section>
  </div>;
}
