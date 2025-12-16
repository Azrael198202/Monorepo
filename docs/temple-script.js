/* ===============================
   * 1. Scroll Spy for TOC
   * =============================== */
const sections = document.querySelectorAll('section[id]');
const tocLinks = document.querySelectorAll('.toc-links a');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  },
  {
    rootMargin: '-40% 0px -50% 0px',
    threshold: 0
  }
);

sections.forEach(section => observer.observe(section));

document.querySelectorAll(".feature-media[data-gallery], .feature-media.media-stack").forEach(g=>{
  const main = g.querySelector(".media-main img, .gallery-main img");
  g.querySelectorAll("[data-src]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      g.querySelectorAll(".is-active").forEach(x=>x.classList.remove("is-active"));
      btn.classList.add("is-active");
      main.src = btn.dataset.src;
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  /* ===============================
   * 1. Hero 视频弹层
   * =============================== */
  var videoOpenBtn = document.getElementById("heroVideoOpen");
  var videoOverlay = document.getElementById("heroVideoOverlay");
  var videoCloseBtn = document.getElementById("heroVideoClose");
  var videoEl = videoOverlay
    ? videoOverlay.querySelector("video, iframe")
    : null;

  function openHeroVideo() {
    if (!videoOverlay) return;
    videoOverlay.classList.add("is-open");
    videoOverlay.setAttribute("aria-hidden", "false");

    if (videoEl && videoEl.tagName.toLowerCase() === "video") {
      try {
        videoEl.currentTime = 0;
        videoEl.play();
      } catch (e) {
        // ignore
      }
    }
  }

  function closeHeroVideo() {
    if (!videoOverlay) return;
    videoOverlay.classList.remove("is-open");
    videoOverlay.setAttribute("aria-hidden", "true");

    if (videoEl && videoEl.tagName.toLowerCase() === "video") {
      try {
        videoEl.pause();
      } catch (e) {
        // ignore
      }
    }
  }

  if (videoOpenBtn) {
    videoOpenBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openHeroVideo();
    });
  }

  if (videoCloseBtn) {
    videoCloseBtn.addEventListener("click", function () {
      closeHeroVideo();
    });
  }

  if (videoOverlay) {
    videoOverlay.addEventListener("click", function (e) {
      // 点击遮罩空白区域关闭
      if (e.target === videoOverlay) {
        closeHeroVideo();
      }
    });
  }

  /* ===============================
   * 2. 右上菜单（左图 + 右内容）
   * =============================== */
  var menuBtn = document.getElementById("heroMenuBtn");
  var menuOverlay = document.getElementById("heroMenuOverlay");
  var menuCloseBtn = document.getElementById("heroMenuClose");

  let scrollY = 0;

  // ----------------------
  // 打开菜单：锁定滚动
  // ----------------------
  function openMenu() {
    if (!menuOverlay) return;

    // 记录当前滚动位置
    scrollY = window.scrollY || window.pageYOffset;

    // 锁定 body（禁止滚动 + 固定位置）
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    // 打开菜单
    menuOverlay.classList.add("is-open");
    document.body.classList.add("menu-open");

    if (menuBtn) {
      menuBtn.classList.add("is-active");
    }
  }

  // ----------------------
  // 关闭菜单：恢复滚动
  // ----------------------
  function closeMenu() {
    if (!menuOverlay) return;

    // 关闭菜单
    menuOverlay.classList.remove("is-open");
    document.body.classList.remove("menu-open");

    if (menuBtn) {
      menuBtn.classList.remove("is-active");
    }

    // 解除 body 固定
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";

    // 恢复到原滚动位置
    window.scrollTo(0, scrollY);
  }

  // ----------------------
  // 按钮事件
  // ----------------------
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      if (menuOverlay && menuOverlay.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (menuCloseBtn) {
    menuCloseBtn.addEventListener("click", function () {
      closeMenu();
    });
  }

  // 点击遮罩关闭
  if (menuOverlay) {
    menuOverlay.addEventListener("click", function (e) {
      if (e.target === menuOverlay) {
        closeMenu();
      }
    });

    // 阻止滚轮与触摸滚动（让背景完全不动）
    menuOverlay.addEventListener(
      "wheel",
      (e) => e.preventDefault(),
      { passive: false }
    );
    menuOverlay.addEventListener(
      "touchmove",
      (e) => e.preventDefault(),
      { passive: false }
    );
  }


  /* ===============================
   * 3. Hero 滚动淡出 + Section Scroll Reveal
   * =============================== */
  var heroEl = document.querySelector(".hero");
  var revealSections = Array.prototype.slice.call(
    document.querySelectorAll(".reveal-section")
  );
  var pageTopLayer = document.querySelector(".page-top-layer");
  var footerHero = document.querySelector(".footer-hero");
  var curtainMax = 1200;

  // 初始：如果已经在可视区则加 is-visible
  function revealOnLoad() {
    revealSections.forEach(function (sec) {
      var rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        sec.classList.add("is-visible");
      }
    });
  }

  revealOnLoad();

  window.addEventListener("scroll", function () {
    // Hero 淡出
    if (heroEl) {
      var scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;

      if (scrollTop < 10) {
        heroEl.classList.remove("hero-fade-out");
      } else {
        heroEl.classList.add("hero-fade-out");
      }
    }

    // Scroll Reveal
    revealSections.forEach(function (sec) {
      if (sec.classList.contains("is-visible")) return;
      var rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
        sec.classList.add("is-visible");
      }
    });

    // =========================
    // 拉窗帘：接近页面底部时，
    // 只移动 page-top-layer，footer 保持不动
    // =========================
    if (pageTopLayer && footerHero) {
      var docEl = document.documentElement;
      var scrollY =
        window.scrollY || docEl.scrollTop || 0;
      var maxScroll = docEl.scrollHeight - window.innerHeight;

      // 从倒数一屏开始做“拉窗帘”动画
      var start = maxScroll - window.innerHeight;
      if (start < 0) start = 0;

      if (scrollY <= start) {
        // 还没进入拉窗帘区域
        pageTopLayer.style.transform = "translateY(0)";
        footerHero.classList.remove("is-visible");
      } else {
        // 进入拉窗帘阶段：0~1 的进度
        var progress = Math.min(
          (scrollY - start) / window.innerHeight,
          1
        );
        var offset = -curtainMax * progress;
        pageTopLayer.style.transform =
          "translateY(" + offset + "px)";

        // 同时让 footer 的背景 & 文案淡入
        footerHero.classList.add("is-visible");
      }
    }
  });

  /* ===============================
   * 4. 第一次滚轮：从 Hero 跳到第一块内容
   * =============================== */
  var firstContentSection = document.querySelector(".intro");
  var firstScrollDone = false;

  window.addEventListener(
    "wheel",
    function (e) {
      // ✅ 如果鼠标在寺院ギャラリー中，则交给寺院逻辑，不处理这里
      if (e.target && e.target.closest && e.target.closest(".temple-gallery")) {
        return;
      }

      if (firstScrollDone) return;
      if (e.deltaY <= 0) return; // 只处理向下滚

      if (!firstContentSection) return;

      firstScrollDone = true;
      firstContentSection.classList.add("is-visible");

      window.scrollTo({
        top: firstContentSection.offsetTop,
        behavior: "smooth"
      });
    },
    { passive: true }
  );

});
