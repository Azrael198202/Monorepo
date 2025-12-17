document.addEventListener("DOMContentLoaded", function () {
  /* ===============================
   * 0. Helpers
   * =============================== */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ===============================
   * 1. Scroll Spy for TOC
   * =============================== */
  const sections = $$("section[id]");
  const tocLinks = $$(".toc-links a");

  if (sections.length && tocLinks.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          tocLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ===============================
   * 2. Feature media gallery switch
   * =============================== */
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

  /* ===============================
   * 3. Typewriter (top->bottom, right-> left by natural flow)
   * =============================== */
  (function initVerticalTypewriter() {
    const area = document.getElementById("typeArea");
    const source = document.getElementById("typeSource");
    if (!area || !source) return;

    let parsed;
    try { parsed = JSON.parse(source.textContent || "{}"); } catch { return; }
    const text = parsed?.text ? String(parsed.text) : "";
    if (!text) return;

    const SPEED = 40;
    const PUNCT_PAUSE = 220;
    const NEWLINE_PAUSE = 320;
    const COL_SIZE = 15;

    const isPunct = (ch) => /[，。．、,\.！!？\?：:；;・…]/.test(ch);

    // ✅ 只把“可见字”计入10格（空格/标点不占格）
    function isVisibleChar(ch) {
      if (ch === " " || ch === "\t") return false;
      if (ch === "\n") return false;
      if (isPunct(ch)) return false;
      return true;
    }

    area.innerHTML = "";
    const cols = [];

    function getCol(i) {
      if (cols[i]) return cols[i];
      const col = document.createElement("div");
      col.className = "type-col";
      cols[i] = col;
      area.appendChild(col);
      return col;
    }

    const chars = Array.from(text);
    let idx = 0;
    let visibleCount = 0; // 只统计可见字

    function addChar(ch) {
      // 换行：强制换到下一列（但不生成空列）
      if (ch === "\n") {
        visibleCount = Math.ceil(visibleCount / COL_SIZE) * COL_SIZE;
        return;
      }

      // 空格不显示（卷轴排版更像样）
      if (ch === " " || ch === "\t") return;

      const colIndex = Math.floor(visibleCount / COL_SIZE);
      const col = getCol(colIndex);

      const span = document.createElement("span");
      span.className = "char";
      span.textContent = ch;
      col.appendChild(span);

      requestAnimationFrame(() => span.classList.add("on"));

      // 只有可见字才计数（标点不计数，但仍显示）
      if (!isPunct(ch)) visibleCount += 1;
    }


    function tick() {
      if (idx >= chars.length) return;
      const ch = chars[idx++];
      addChar(ch);

      let delay = SPEED;
      if (ch === "\n") delay += NEWLINE_PAUSE;
      else if (isPunct(ch)) delay += PUNCT_PAUSE;

      setTimeout(tick, delay);
    }

    tick();
  })();



  /* ===============================
   * 4. Hero 视频弹层
   * =============================== */
  (function initHeroVideo() {
    const videoOpenBtn = $("#heroVideoOpen");
    const videoOverlay = $("#heroVideoOverlay");
    const videoCloseBtn = $("#heroVideoClose");
    const videoEl = videoOverlay ? videoOverlay.querySelector("video, iframe") : null;

    function openHeroVideo() {
      if (!videoOverlay) return;
      videoOverlay.classList.add("is-open");
      videoOverlay.setAttribute("aria-hidden", "false");

      if (videoEl && videoEl.tagName.toLowerCase() === "video") {
        try {
          videoEl.currentTime = 0;
          videoEl.play();
        } catch (e) { }
      }
    }

    function closeHeroVideo() {
      if (!videoOverlay) return;
      videoOverlay.classList.remove("is-open");
      videoOverlay.setAttribute("aria-hidden", "true");

      if (videoEl && videoEl.tagName.toLowerCase() === "video") {
        try {
          videoEl.pause();
        } catch (e) { }
      }
    }

    if (videoOpenBtn) {
      videoOpenBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openHeroVideo();
      });
    }

    if (videoCloseBtn) {
      videoCloseBtn.addEventListener("click", closeHeroVideo);
    }

    if (videoOverlay) {
      videoOverlay.addEventListener("click", (e) => {
        if (e.target === videoOverlay) closeHeroVideo();
      });
    }
  })();

  /* ===============================
   * 5. 右上菜单（左图 + 右内容）
   * =============================== */
  (function initHeroMenu() {
    const menuBtn = $("#heroMenuBtn");
    const menuOverlay = $("#heroMenuOverlay");
    const menuCloseBtn = $("#heroMenuClose");

    let lockedScrollY = 0;

    function openMenu() {
      if (!menuOverlay) return;

      lockedScrollY = window.scrollY || window.pageYOffset || 0;

      document.body.style.position = "fixed";
      document.body.style.top = `-${lockedScrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      menuOverlay.classList.add("is-open");
      document.body.classList.add("menu-open");
      if (menuBtn) menuBtn.classList.add("is-active");
    }

    function closeMenu() {
      if (!menuOverlay) return;

      menuOverlay.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      if (menuBtn) menuBtn.classList.remove("is-active");

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, lockedScrollY);
    }

    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        if (menuOverlay && menuOverlay.classList.contains("is-open")) closeMenu();
        else openMenu();
      });
    }

    if (menuCloseBtn) {
      menuCloseBtn.addEventListener("click", closeMenu);
    }

    if (menuOverlay) {
      menuOverlay.addEventListener("click", (e) => {
        if (e.target === menuOverlay) closeMenu();
      });

      // prevent background scroll
      menuOverlay.addEventListener("wheel", (e) => e.preventDefault(), { passive: false });
      menuOverlay.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });
    }
  })();

  /* ===============================
   * 6. Hero 滚动淡出 + Section Scroll Reveal + Curtain
   * =============================== */
  (function initScrollEffects() {
    const heroEl = $(".hero");
    const revealSections = $$(".reveal-section");
    const pageTopLayer = $(".page-top-layer");
    const footerHero = $(".footer-hero");
    const curtainMax = 1200;

    function revealOnLoad() {
      revealSections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) sec.classList.add("is-visible");
      });
    }

    function onScroll() {
      const docEl = document.documentElement;
      const scrollY = window.scrollY || docEl.scrollTop || 0;

      // Hero fade out
      if (heroEl) {
        if (scrollY < 10) heroEl.classList.remove("hero-fade-out");
        else heroEl.classList.add("hero-fade-out");
      }

      // Reveal sections
      revealSections.forEach((sec) => {
        if (sec.classList.contains("is-visible")) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
          sec.classList.add("is-visible");
        }
      });

      // Curtain (page-top-layer moves, footer stays)
      if (pageTopLayer && footerHero) {
        const maxScroll = docEl.scrollHeight - window.innerHeight;
        let start = maxScroll - window.innerHeight;
        if (start < 0) start = 0;

        if (scrollY <= start) {
          pageTopLayer.style.transform = "translateY(0)";
          footerHero.classList.remove("is-visible");
        } else {
          const progress = Math.min((scrollY - start) / window.innerHeight, 1);
          const offset = -curtainMax * progress;
          pageTopLayer.style.transform = `translateY(${offset}px)`;
          footerHero.classList.add("is-visible");
        }
      }
    }

    revealOnLoad();
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

  /* ===============================
   * 7. 第一次滚轮：从 Hero 跳到第一块内容
   * =============================== */
  (function initFirstWheelJump() {
    const firstContentSection = $(".intro");
    let firstScrollDone = false;

    window.addEventListener(
      "wheel",
      (e) => {
        // 鼠标在寺院 gallery 里：不拦截
        if (e.target && e.target.closest && e.target.closest(".temple-gallery")) return;

        if (firstScrollDone) return;
        if (e.deltaY <= 0) return;
        if (!firstContentSection) return;

        firstScrollDone = true;
        firstContentSection.classList.add("is-visible");

        window.scrollTo({
          top: firstContentSection.offsetTop,
          behavior: "smooth",
        });
      },
      { passive: true }
    );
  })();

  
});
