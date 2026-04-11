import { HomePage } from "@/components/pages/home-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("ru", "home");

export default async function Page() {
  return <HomePage locale="ru" />;
}
