import { HomePage } from "@/components/pages/home-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avulus Cyber Space",
  description: "Клуб и ресторан 24/7 в центре Москвы. Приватные игровые комнаты, кухня и бар.",
  openGraph: {
    title: "Avulus Cyber Space",
    description: "Клуб и ресторан 24/7 в центре Москвы. Приватные игровые комнаты, кухня и бар.",
    type: "website"
  }
};

export default async function Page() {
  return <HomePage />;
}
