import { CyberclubPage } from "@/components/pages/cyberclub-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("ru", "cyberclub");

export default async function Page() {
  return <CyberclubPage locale="ru" />;
}
