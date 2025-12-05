// apps/web-seo/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-title">中日佛教文化デジタル会員プラットフォーム</div>
          <p className="footer-text">
            寺院・非遺文化・修行体験を通じて、「心を整える」旅と日常をつなぎます。
          </p>
        </div>
        <div className="footer-links">
          <Link href="/about">運営団体について</Link>
          <Link href="/about#terms">利用規約</Link>
          <Link href="/about#privacy">プライバシーポリシー</Link>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} Zen Culture Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
