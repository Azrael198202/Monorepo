// goods-juzu.js
(() => {
  "use strict";

  /* =========================
   * Helpers
   * ========================= */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const safeCloseMenu = () => {
    // 兼容：如果主站 script.js 有 closeMenu() 就调用，没有就忽略
    if (typeof window.closeMenu === "function") {
      try { window.closeMenu(); } catch (_) { }
    }
    // 兼容：如果本页有 overlay 结构，也尝试关闭（可选）
    const overlay = $("#heroMenuOverlay");
    if (overlay && overlay.classList.contains("is-open")) {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("menu-open");
    }
  };

  /* =========================
   * 1) Smooth scroll (data-scroll)
   * ========================= */
  const initSmoothScroll = () => {
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-scroll]");
      if (!t) return;

      const sel = t.getAttribute("data-scroll");
      if (!sel) return;

      const el = document.querySelector(sel);
      if (!el) return;

      e.preventDefault();
      safeCloseMenu();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  /* =========================
   * 2) Lightbox (data-lightbox)
   * ========================= */
  const initLightbox = () => {
    const lightbox = $("#lightbox");
    const lightboxImg = $("#lightboxImg");
    const lightboxClose = $("#lightboxClose");

    if (!lightbox || !lightboxImg) return;

    const open = (src, alt) => {
      if (!src) return;
      lightboxImg.src = src;
      lightboxImg.alt = alt || "";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
      document.body.style.overflow = "";
    };

    // click to open
    // 打开「当前显示的主图」
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lightbox-current]");
      if (!btn) return;

      // 向上找到对应的 media 容器
      const media = btn.closest(".feature-media");
      if (!media) return;

      // 取当前主图
      const mainImg = media.querySelector(".media-main img");
      if (!mainImg || !mainImg.src) return;

      open(mainImg.src, mainImg.alt || "");
    });


    // close buttons
    if (lightboxClose) lightboxClose.addEventListener("click", close);

    // click outside image to close
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });

    // ESC to close
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  };

  /* =========================
   * 3) Material Slider (data-slider)
   * ========================= */
  const initMaterialSliders = () => {
    $$("[data-slider]").forEach((slider) => {
      const images = $$("img", slider);
      const dots = $$(".dot", slider);
      if (images.length <= 1) return;

      let index = 0;
      let timer = null;
      const interval = Number(slider.dataset.interval) || 3500;

      const setActive = (next) => {
        images[index]?.classList.remove("is-active");
        dots[index]?.classList.remove("is-active");

        index = next;

        images[index]?.classList.add("is-active");
        dots[index]?.classList.add("is-active");
      };

      const next = () => setActive((index + 1) % images.length);

      const start = () => {
        stop();
        timer = window.setInterval(next, interval);
      };

      const stop = () => {
        if (timer) window.clearInterval(timer);
        timer = null;
      };

      // autoplay
      start();

      // hover pause (PC only feel, harmless on mobile)
      slider.addEventListener("mouseenter", stop);
      slider.addEventListener("mouseleave", start);

      // dots click (optional)
      dots.forEach((d, i) => {
        d.addEventListener("click", (e) => {
          e.preventDefault();
          setActive(i);
          start(); // reset timer after manual
        });
      });
    });
  };

  /* =========================
   * 4) Feature media gallery switch (legacy)
   *    - 你原来用 $$，这里已统一
   * ========================= */
  const initFeatureMediaSwitch = () => {
    $$(".feature-media[data-gallery], .feature-media.media-stack").forEach((g) => {
      const main = g.querySelector(".media-main img, .gallery-main img");
      if (!main) return;

      g.querySelectorAll("[data-src]").forEach((btn) => {
        btn.addEventListener("click", () => {
          g.querySelectorAll(".is-active").forEach((x) => x.classList.remove("is-active"));
          btn.classList.add("is-active");
          main.src = btn.dataset.src;
        });
      });
    });
  };

  /* =========================
   * Boot
   * ========================= */
  document.addEventListener("DOMContentLoaded", () => {
    initSmoothScroll();
    initLightbox();
    initMaterialSliders();
    initFeatureMediaSwitch();
  });
})();
