import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Oswald } from "next/font/google";

import { YandexMetrika } from "@/components/analytics/yandex-metrika";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-space-grotesk"
});

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  variable: "--font-oswald"
});

export const metadata: Metadata = {
  title: {
    default: "Avulus Cyber Space",
    template: "%s"
  },
  description: "Премиальный киберклуб и ресторан 24/7 в центре Москвы.",
  icons: {
    icon: "/sublogo/Avulus-Sublogo-Red-CMYK.gif",
    shortcut: "/sublogo/Avulus-Sublogo-Red-CMYK.gif",
    apple: "/sublogo/Avulus-Sublogo-Red-CMYK.gif"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${oswald.variable}`}>
        <YandexMetrika />
        {children}
      </body>
    </html>
  );
}
