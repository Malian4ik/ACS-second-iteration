import type { Metadata } from "next";
import { Manrope, Oswald } from "next/font/google";
import type { ReactNode } from "react";

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
  description: "Клуб и ресторан 24/7 в центре Москвы."
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
