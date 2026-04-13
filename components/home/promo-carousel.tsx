"use client";

import Image from "next/image";
import { useRef } from "react";

import { TrackedLink } from "@/components/ui/tracked-link";
import type { PromoCard } from "@/lib/cms-schema";

type Props = {
  cards: PromoCard[];
};

export function PromoCarousel({ cards }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    const firstCard = scroller.querySelector<HTMLElement>("[data-promo-card]");
    const gap = 20;
    const amount = firstCard ? firstCard.offsetWidth + gap : scroller.clientWidth * 0.85;
    scroller.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end gap-3">
        <button
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/5 text-lg text-white transition hover:border-[var(--accent-green)] hover:text-[var(--accent-sand)]"
          onClick={() => scrollByCard(-1)}
          type="button"
        >
          ←
        </button>
        <button
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/5 text-lg text-white transition hover:border-[var(--accent-green)] hover:text-[var(--accent-sand)]"
          onClick={() => scrollByCard(1)}
          type="button"
        >
          →
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card) => (
          <article
            key={card.id}
            data-promo-card
            className="group flex min-h-[32rem] min-w-[86%] snap-start flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#0f1115] md:min-w-[48%] xl:min-w-[31%]"
          >
            <div className="relative aspect-[5/4] overflow-hidden">
              <Image
                alt={card.title}
                className="object-cover transition duration-700 group-hover:scale-105"
                fill
                sizes="(max-width: 768px) 86vw, (max-width: 1280px) 48vw, 31vw"
                src={card.imageUrl}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.05),rgba(7,7,7,0.4),rgba(7,7,7,0.94))]" />
            </div>

            <div className="flex flex-1 flex-col space-y-5 p-6">
              <h3 className="font-[family:var(--font-oswald)] text-4xl uppercase leading-[0.92] text-white">
                {card.title}
              </h3>
              <p className="flex-1 text-sm leading-7 text-white/66">{card.description}</p>
              <TrackedLink
                className="inline-flex w-fit items-center justify-center rounded-full border border-[rgba(26,90,73,0.55)] bg-[rgba(26,90,73,0.14)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[rgba(26,90,73,0.26)]"
                goal={`promo_${card.id}`}
                href={card.cta.href}
                target="_blank"
              >
                {card.cta.label}
              </TrackedLink>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
