import type { Metadata } from "next";
import PortfolioDashboard from "@/components/dashboard/PortfolioDashboard";
import { disciplineById } from "@/lib/dashboard";

const discipline = disciplineById["web"];

export const metadata: Metadata = {
  title: discipline.title,
  description: discipline.description,
  alternates: { canonical: discipline.path },
};

export default function Page() {
  return <PortfolioDashboard discipline={discipline} />;
}
