import { LocaleHtmlController } from "@/components/layout/locale-html-controller";
import { LandingPageRenderer } from "@/components/pages/landing-page-renderer";
import { getCmsContent } from "@/lib/cms";
import type { Locale } from "@/lib/content";

export async function HomePage({ locale }: { locale: Locale }) {
  const content = await getCmsContent();

  return (
    <>
      <LocaleHtmlController locale={locale} />
      <LandingPageRenderer content={content} />
    </>
  );
}
