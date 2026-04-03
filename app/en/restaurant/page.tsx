import { RestaurantPage } from "@/components/pages/restaurant-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("en", "restaurant");

export default function Page() {
  return <RestaurantPage locale="en" />;
}
