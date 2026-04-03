import { RoomsPage } from "@/components/pages/rooms-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("en", "rooms");

type Props = {
  searchParams?: Promise<{
    format?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const resolved = await searchParams;
  return <RoomsPage locale="en" searchParams={resolved} />;
}
