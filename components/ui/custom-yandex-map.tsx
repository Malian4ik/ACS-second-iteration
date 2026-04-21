"use client";

import { useEffect, useRef } from "react";

export function CustomYandexMap({ embedUrl }: { embedUrl: string }) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Helper to safely extract params from the embedUrl
    let coords: [number, number] = [55.750145, 37.648259]; // [lat, lon]
    let zoomLevel = 17;

    try {
      const url = new URL(embedUrl);
      const ll = url.searchParams.get("ll");
      if (ll) {
        const parts = ll.split("%2C").length > 1 ? ll.split("%2C") : ll.split(",");
        if (parts.length === 2) {
          coords = [parseFloat(parts[1]), parseFloat(parts[0])];
        }
      }
      const z = url.searchParams.get("z");
      if (z) {
        zoomLevel = parseInt(z, 10);
      }
    } catch(e) {
      console.warn("Failed to parse mapEmbedUrl", e);
    }

    const scriptId = "yandex-maps-api-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        // @ts-ignore
        if (window.ymaps) {
          // @ts-ignore
          window.ymaps.ready(initMap);
        }
      };
    } else {
      // @ts-ignore
      if (window.ymaps && window.ymaps.Map) {
        // @ts-ignore
        window.ymaps.ready(initMap);
      } else {
        script.addEventListener("load", () => {
          // @ts-ignore
          if (window.ymaps) {
            // @ts-ignore
            window.ymaps.ready(initMap);
          }
        });
      }
    }

    function initMap() {
      if (!mapContainerRef.current) return;
      mapContainerRef.current.innerHTML = "";

      // @ts-ignore
      const map = new window.ymaps.Map(mapContainerRef.current, {
        center: coords,
        zoom: zoomLevel,
        controls: ["zoomControl"]
      });

      // @ts-ignore
      const placemark = new window.ymaps.Placemark(coords, {
        hintContent: "Avulus Cyber Space",
        balloonContent: "Avulus Cyber Space"
      }, {
        iconLayout: "default#image",
        iconImageHref: "/Sublogo/Avulus-Sublogo-Red-CMYK.gif",
        iconImageSize: [60, 60],
        iconImageOffset: [-30, -30]
      });

      map.geoObjects.add(placemark);

      // Disable scroll zoom for better UX
      map.behaviors.disable("scrollZoom");

      // Apply dark theme by inverting map tiles via CSS
      setTimeout(() => {
        try {
          const groundPane = map.panes.get("ground").getElement();
          if (groundPane) {
            groundPane.style.filter = "invert(100%) hue-rotate(180deg) brightness(85%) contrast(90%)";
          }
        } catch (e) {
          console.warn("Could not apply dark mode to map", e);
        }
      }, 50);
    }
  }, [embedUrl]);

  return (
    <div
      ref={mapContainerRef}
      className="h-[380px] w-full md:h-[460px]"
      style={{ borderRadius: "22px", overflow: "hidden" }}
    />
  );
}
