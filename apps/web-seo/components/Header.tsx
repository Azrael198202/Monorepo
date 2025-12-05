// apps/web-seo/components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/temples", label: "寺院を探す" },
  { href: "/heritages", label: "非遺文化" },
  { href: "/news", label: "活動・ニュース" },
  { href: "/about", label: "私たちについて" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          禅旅プラットフォーム
        </Link>
        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                "nav-link" +
                (pathname.startsWith(item.href) ? " nav-link-active" : "")
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-auth">
          <Link href="/login" className="btn-outline">
            ログイン
          </Link>
          <Link href="/register" className="btn-primary">
            会員登録
          </Link>
        </div>
      </div>
    </header>
  );
}
