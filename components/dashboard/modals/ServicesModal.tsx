import { services } from "@/lib/site";
export default function ServicesModal() {
  return <div className="px-5 py-6 sm:px-7">
    <ul className="forge-services">
      {services.map((service,index)=><li key={service.title}>
        <span className="forge-service-number" aria-hidden="true">{String(index+1).padStart(2,"0")}</span>
        <div><h3 className="font-serif text-body font-bold text-ink">{service.title}</h3><p className="mt-2 text-fine leading-relaxed text-muted">{service.description}</p></div>
      </li>)}
    </ul>
  </div>;
}
