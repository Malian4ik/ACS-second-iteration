import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Oswald, Space_Grotesk } from "next/font/google";

import { YandexMetrika } from "@/components/analytics/yandex-metrika";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald"
});

export const metadata: Metadata = {
  title: "Avulus Cyber Space",
  description: "Флагманский cyberclub и ресторан 24/7 в центре Москвы."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${oswald.variable}`}>
        <YandexMetrika />
        {children}
      </body>
    </html>
  );
}
