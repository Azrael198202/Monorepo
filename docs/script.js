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

  /* ===============================
   * 5. 禅旅の寺院：拖动 + 滚轮横向滚动
   * =============================== */
  var templeGalleries = document.querySelectorAll(".temple-gallery");

  templeGalleries.forEach(function (gallery) {
    if (!gallery) return;

    // 1) 鼠标滚轮：上下滚 → 左右滚
    gallery.addEventListener(
      "wheel",
      function (e) {
        // 把上下滚转成左右滚；如果已经是横向滚，则保持默认
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault(); // 不让页面整体上下滚
          var speed = 1.1; // 滚动速度可调
          gallery.scrollLeft += e.deltaY * speed;
        }
      },
      { passive: false }
    );

    // 2) 鼠标按住拖动
    var isDown = false;
    var startX = 0;
    var scrollLeft = 0;

    gallery.addEventListener("mousedown", function (e) {
      isDown = true;
      gallery.classList.add("is-dragging");
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });

    ["mouseleave", "mouseup"].forEach(function (evt) {
      gallery.addEventListener(evt, function () {
        isDown = false;
        gallery.classList.remove("is-dragging");
      });
    });

    gallery.addEventListener("mousemove", function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - gallery.offsetLeft;
      var walk = (x - startX) * 1.2; // 数值越大 → 滚得越快
      gallery.scrollLeft = scrollLeft - walk;
    });

    // 3) 触摸滑动（手机 / 平板）
    var touchStartX = 0;
    var touchStartScroll = 0;

    gallery.addEventListener("touchstart", function (e) {
      var t = e.touches[0];
      touchStartX = t.pageX;
      touchStartScroll = gallery.scrollLeft;
    });

    gallery.addEventListener("touchmove", function (e) {
      var t = e.touches[0];
      var deltaX = t.pageX - touchStartX;
      gallery.scrollLeft = touchStartScroll - deltaX;
    });
  });

  /* ===============================
   * 6. experience Accordion
   * =============================== */
  const items = document.querySelectorAll(".exp-item");

  // 初始化：根据 open 类设置初始状态
  items.forEach((item) => {
    const body = item.querySelector(".exp-body");
    const toggle = item.querySelector(".exp-toggle");

    if (!body || !toggle) return;

    if (item.classList.contains("open")) {
      body.style.maxHeight = body.scrollHeight + "px";
      toggle.textContent = "×";
    } else {
      body.style.maxHeight = 0;
      toggle.textContent = "＋";
    }
  });

  // 绑定点击事件（点击整行头部）
  items.forEach((item) => {
    const head = item.querySelector(".exp-head");
    const body = item.querySelector(".exp-body");
    const toggle = item.querySelector(".exp-toggle");

    if (!head || !body || !toggle) return;

    head.addEventListener("click", function (e) {
      e.preventDefault();

      const isOpen = item.classList.contains("open");

      // 先关闭全部
      items.forEach((other) => {
        const otherBody = other.querySelector(".exp-body");
        const otherToggle = other.querySelector(".exp-toggle");
        if (!otherBody || !otherToggle) return;

        other.classList.remove("open");
        otherBody.style.maxHeight = 0;
        otherToggle.textContent = "＋";
      });

      // 再决定当前这个：如果原来是关的 → 打开
      if (!isOpen) {
        item.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
        toggle.textContent = "×";
      } else {
        // 原来是开的，再点就完全收起
        item.classList.remove("open");
        body.style.maxHeight = 0;
        toggle.textContent = "＋";
      }
    });
  });

  // 窗口 resize 时，重新计算已展开项高度，防止文字换行截断
  window.addEventListener("resize", function () {
    items.forEach((item) => {
      const body = item.querySelector(".exp-body");
      if (!body) return;
      if (item.classList.contains("open")) {
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });


  // ===============================
});

document.querySelectorAll(".temple-gallery-wrapper").forEach(function (wrapper) {
  const gallery = wrapper.querySelector(".temple-gallery");
  const btnLeft = wrapper.querySelector(".temple-arrow-left");
  const btnRight = wrapper.querySelector(".temple-arrow-right");

  if (!gallery || !btnLeft || !btnRight) return;

  const scrollAmount = 600; // ← 每次移动多少像素（可调）

  btnLeft.addEventListener("click", function () {
    gallery.scrollBy({
      left: -scrollAmount,
      behavior: "smooth"
    });
  });

  btnRight.addEventListener("click", function () {
    gallery.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
  });

  /* ================= 卷轴 Section：首次进入时展开 ================= */

  (function () {
    var scrollSection = document.getElementById("zen-scroll");
    if (!scrollSection) return;

    var hasOpened = false;
    var ctaBtn = scrollSection.querySelector(".scroll-cta");

    // 1) 使用 IntersectionObserver，第一次进视口时触发展开
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !hasOpened) {
            hasOpened = true;
            scrollSection.classList.add("is-open");
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.4 // 有 40% 高度进入视口就算“看到了”
      }
    );

    observer.observe(scrollSection);

    // 2) 点击按钮时，播放按钮的 pulse 动画
    if (ctaBtn) {
      ctaBtn.addEventListener("click", function () {
        // 先移除再强制 reflow，再加上，确保每次点击都能重新触发动画
        ctaBtn.classList.remove("is-pulse");
        void ctaBtn.offsetWidth;
        ctaBtn.classList.add("is-pulse");

        // 这里如果之后想要滚动到其他 section，可以在下面加：
        // const target = document.querySelector(".temples");
        // if (target) {
        //   window.scrollTo({
        //     top: target.offsetTop,
        //     behavior: "smooth"
        //   });
        // }
      });
    }
  })();

});