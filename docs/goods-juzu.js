// goods-juzu.js
(function () {
  // --- smooth scroll helper (data-scroll) ---
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-scroll]");
    if (!t) return;
    const sel = t.getAttribute("data-scroll");
    const el = sel ? document.querySelector(sel) : null;
    if (!el) return;
    e.preventDefault();
    closeMenu();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // --- Lightbox ---
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  // data-lightbox を持つボタン/要素で拡大
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lightbox]");
    if (!btn) return;
    const src = btn.getAttribute("data-lightbox");
    if (!src) return;
    const img = btn.querySelector("img");
    openLightbox(src, img ? img.alt : "");
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
})();
