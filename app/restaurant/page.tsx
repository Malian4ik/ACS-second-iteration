import { RestaurantPage } from "@/components/pages/restaurant-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("ru", "restaurant");

export default async function Page() {
  return <RestaurantPage locale="ru" />;
}
