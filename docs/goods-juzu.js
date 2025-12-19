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
 * 2) Lightbox
 *   A) data-lightbox-current : 打开当前 media-main 的 src
 *   B) data-lightbox="..."    : 打开指定 src（照片墙等）
 * ========================= */
  const initLightbox = () => {
    const lightbox = $("#lightbox");
    const lightboxImg = $("#lightboxImg");
    const lightboxClose = $("#lightboxClose");
    const lightboxCap = $("#lightboxCap"); // 可选：如果没有这个元素也不报错

    if (!lightbox || !lightboxImg) return;

    const open = (src, alt, cap) => {
      if (!src) return;
      lightboxImg.src = src;
      lightboxImg.alt = alt || "";
      if (lightboxCap) lightboxCap.textContent = cap || "";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
      lightboxImg.alt = "";
      if (lightboxCap) lightboxCap.textContent = "";
      document.body.style.overflow = "";
    };

    // ✅ click to open (两种入口都支持)
    document.addEventListener("click", (e) => {
      // B) data-lightbox="..."
      const fixed = e.target.closest("[data-lightbox]");
      if (fixed) {
        const src = fixed.getAttribute("data-lightbox");
        if (!src) return;
        const img = fixed.querySelector("img");
        const cap = fixed.getAttribute("data-caption") || "";
        open(src, img ? img.alt : "", cap);
        return;
      }

      // A) data-lightbox-current（当前主图）
      const btn = e.target.closest("[data-lightbox-current]");
      if (!btn) return;

      const media = btn.closest(".feature-media");
      if (!media) return;

      const mainImg = media.querySelector(".media-main img");
      if (!mainImg || !mainImg.src) return;

      // 如果你希望 caption 用当前缩略图的说明，也可以从 data-caption 拿
      const cap = btn.getAttribute("data-caption") || "";
      open(mainImg.src, mainImg.alt || "", cap);
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
 * Photo Wall Filter (2D)
 * 素材 × 視点
 * ========================= */
  const initPhotoWallFilter = () => {
    const tabs = document.querySelectorAll(".wall-tab[data-wall-filter]");
    const items = document.querySelectorAll("[data-wall-item]");
    if (!tabs.length || !items.length) return;

    const state = {
      material: "all",
      view: "all"
    };

    const apply = () => {
      items.forEach((it) => {
        const m = it.getAttribute("data-material") || "all";
        const v = it.getAttribute("data-view") || "all";

        const okMaterial = (state.material === "all") || (m === state.material);
        const okView = (state.view === "all") || (v === state.view);

        it.classList.toggle("is-hidden", !(okMaterial && okView));
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const group = tab.getAttribute("data-filter-group");
        const value = tab.getAttribute("data-wall-filter");

        // 同一 group 内切换 active
        tabs.forEach((t) => {
          if (t.getAttribute("data-filter-group") === group) {
            t.classList.remove("is-active");
          }
        });
        tab.classList.add("is-active");

        state[group] = value;
        apply();
      });
    });

    // 初期表示
    apply();
  };



  /* =========================
   * Boot
   * ========================= */
  document.addEventListener("DOMContentLoaded", () => {
    initSmoothScroll();
    initLightbox();
    initMaterialSliders();
    initFeatureMediaSwitch();
    initPhotoWallFilter();
  });
})();
