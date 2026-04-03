import { HomePage } from "@/components/pages/home-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("en", "home");

export default function Page() {
  return <HomePage locale="en" />;
}
