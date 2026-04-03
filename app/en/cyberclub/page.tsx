import { CyberclubPage } from "@/components/pages/cyberclub-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("en", "cyberclub");

export default function Page() {
  return <CyberclubPage locale="en" />;
}
