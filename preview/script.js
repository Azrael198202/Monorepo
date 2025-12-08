document.addEventListener("DOMContentLoaded", function () {
  /* ---------- 视频弹层 ---------- */
  var openBtn = document.getElementById("heroVideoOpen");
  var overlay = document.getElementById("heroVideoOverlay");
  var closeBtn = document.getElementById("heroVideoClose");
  var video = overlay && overlay.querySelector("video");

  function openVideo() {
    if (!overlay) return;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    if (video) {
      try {
        video.currentTime = 0;
        video.play();
      } catch (e) { }
    }
  }

  function closeVideo() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    if (video) {
      try {
        video.pause();
      } catch (e) { }
    }
  }

  if (openBtn) {
    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openVideo();
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeVideo);
  }
  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeVideo();
    });
  }

  /* ---------- 右上菜单（全屏左图＋右内容） ---------- */
  var menuBtn = document.getElementById("heroMenuToggle");
  var menuOverlay = document.getElementById("heroMenuOverlay");
  var menuClose = document.getElementById("heroMenuClose");

  function openMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.add("is-open");
    menuOverlay.setAttribute("aria-hidden", "false");
    if (menuBtn) menuBtn.classList.add("is-active");
    document.body.classList.add("menu-open"); // 禁止页面滚动
  }

  function closeMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.remove("is-open");
    menuOverlay.setAttribute("aria-hidden", "true");
    if (menuBtn) menuBtn.classList.remove("is-active");
    document.body.classList.remove("menu-open");
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      if (menuOverlay && menuOverlay.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }

  if (menuOverlay) {
    // 点击黑色背景就关闭
    menuOverlay.addEventListener("click", function (e) {
      if (e.target === menuOverlay) {
        closeMenu();
      }
    });
  }

  // ESC 关闭菜单和视频
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
      closeVideo();
    }
  });

  /* ---------- 滚动特效 D 方案：
        1) 第一次向下滚动：Hero 淡出 + 自动滚到下一块
        2) 后续 section 逐段滑入（类似 ScrollReveal 效果）
  --------------------------------------------- */

  var heroEl = document.querySelector(".hero");
  var allSections = Array.prototype.slice.call(document.querySelectorAll("section"));

  // 除了 hero 以外的内容区
  var contentSections = allSections.filter(function (sec) {
    return !sec.classList.contains("hero");
  });

  // 给所有内容区添加基础 reveal 类（CSS 里有 .reveal-section）
  contentSections.forEach(function (sec) {
    sec.classList.add("reveal-section");
  });

  // hero 下面的第一块内容（比如 .intro）
  var firstContentSection = contentSections.length > 0 ? contentSections[0] : null;

  // IntersectionObserver：控制第 2 块开始的滑入
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  // 从第二块内容开始交给 Observer（第一块由第一次滚动控制）
  contentSections.slice(1).forEach(function (sec) {
    observer.observe(sec);
  });

  // 第一次向下滚轮：Hero 淡出 & 自动滚到第一块内容
  var firstScrollDone = false;

  window.addEventListener(
    "wheel",
    function (e) {
      if (firstScrollDone) return;
      if (e.deltaY <= 0) return; // 只处理向下滚

      if (!firstContentSection) return;

      firstScrollDone = true;

      // 第一块内容淡入
      firstContentSection.classList.add("is-visible");

      // 平滑滚动到第一块内容顶部
      window.scrollTo({
        top: firstContentSection.offsetTop,
        behavior: "smooth"
      });
    },
    { passive: true }
  );

  window.addEventListener("scroll", function () {
    if (!heroEl) return;

    var scrollTop = window.scrollY || document.documentElement.scrollTop || 0;

    // 在页面最顶端的时候，显示 hero
    if (scrollTop < 10) {
      heroEl.classList.remove("hero-fade-out");
    } else {
      // 向下滚动一点，就让 hero 淡出
      heroEl.classList.add("hero-fade-out");
    }
  });

  // 保险：刷新时如果已经在下面，让视窗内的 section 直接可见
  contentSections.forEach(function (sec) {
    var rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      sec.classList.add("is-visible");
    }
  });
});
