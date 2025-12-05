// apps/web-seo/components/HeroSection.tsx
import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="hero" className="section hero-section">
      <div className="hero-bg">
        <img src="/images/hero-main.png" alt="山水と寺院" />
      </div>

      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="hero-sub">
          寺院や山林に足を踏み入れ、静けさとゆるやかな時間の中で、
          あらためて自分と向き合う
        </p>
        <h1 className="hero-title">
          旅の途中で、
          <br />
          心の帰る場所に出会う
        </h1>

        <div className="hero-actions">
          <button className="btn btn-primary">観光ルートのご相談</button>
          <button className="btn btn-outline">禅修の旅を紐解く</button>
        </div>

        <p className="hero-trust">Trusted by over 10K people</p>
      </div>

      <div className="hero-video-card">
        {/* 这里可以放一张封面图 + “Discover full video” */}
        <img src="/images/hero-video-thumb.jpg" alt="禅旅紹介動画" />
        <button className="hero-video-button">Discover full video</button>
      </div>
    </section>
  );
}

