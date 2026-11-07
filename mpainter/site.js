/* mPainter landing page — sticky header state, scroll reveals, demo player. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Sticky header gets a hairline once the page has moved ─────────── */
  var topbar = document.getElementById("topbar");
  if (topbar) {
    var onScroll = function () {
      topbar.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ── Reveal on scroll, staggered within each group ─────────────────── */
  var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var seen = new WeakMap();
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var parent = el.parentNode;
          var n = seen.get(parent) || 0;
          seen.set(parent, n + 1);
          el.style.transitionDelay = Math.min(n, 4) * 70 + "ms";
          el.classList.add("is-in");
          observer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    items.forEach(function (el) { observer.observe(el); });

    /* Anything already on screen at load should not wait for a scroll. */
    window.setTimeout(function () {
      items.forEach(function (el) {
        if (el.classList.contains("is-in")) return;
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
      });
    }, 60);
  }

  /* ── Demo player ───────────────────────────────────────────────────── */
  var frame = document.getElementById("demo");
  var video = document.getElementById("demo-video");
  var play = document.getElementById("demo-play");

  if (frame && video && play) {
    play.addEventListener("click", function () {
      /* Native controls stay off until playback starts, so the poster frame
         reads as a still image; from then on they are the control surface. */
      video.controls = true;
      var started = video.play();
      if (started && typeof started.catch === "function") {
        started.catch(function () {
          /* Autoplay policy or codec trouble: fall back to the native controls. */
          frame.classList.add("is-playing");
          video.focus();
        });
      }
    });
    video.addEventListener("play", function () { frame.classList.add("is-playing"); });
    video.addEventListener("pause", function () {
      if (video.currentTime === 0 || video.ended) frame.classList.remove("is-playing");
    });
    video.addEventListener("ended", function () { frame.classList.remove("is-playing"); });
  }
})();
