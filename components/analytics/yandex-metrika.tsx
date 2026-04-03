import Script from "next/script";

const metrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

export function YandexMetrika() {
  if (!metrikaId) {
    return null;
  }

  return (
    <>
      <Script id="yandex-metrika-base" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {
              if (document.scripts[j].src === r) { return; }
            }
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${metrikaId}, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true
          });
        `}
      </Script>
      <Script id="yandex-metrika-scroll-depth" strategy="afterInteractive">
        {`
          (function() {
            var thresholds = [25, 50, 75, 100];
            var sent = {};

            function sendDepth() {
              var scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
              var viewport = window.innerHeight || document.documentElement.clientHeight || 0;
              var height = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
              ) - viewport;
              var progress = height > 0 ? Math.round(((scrollTop + viewport) / (height + viewport)) * 100) : 100;

              thresholds.forEach(function(threshold) {
                if (progress >= threshold && !sent[threshold] && typeof window.ym === "function") {
                  sent[threshold] = true;
                  window.ym(${metrikaId}, "reachGoal", "scroll_" + threshold);
                }
              });
            }

            window.addEventListener("scroll", sendDepth, { passive: true });
            window.addEventListener("load", sendDepth);
            sendDepth();
          })();
        `}
      </Script>
    </>
  );
}
