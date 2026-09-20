import { redirect } from "next/navigation";
import { defaultDiscipline } from "@/lib/dashboard";

/** the site opens on the web page; the other crafts live at their own routes */
export default function Home() {
  redirect(defaultDiscipline.path);
}
