// apps/web-seo/app/layout.tsx
import "./../styles/globals.css";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "中日佛教文化数字会员平台",
  description:
    "通过寺院介绍、非物质文化遗产、活动新闻与线上会员服务，连接中日佛教文化与现代生活。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <div className="site-wrapper">
          {/* <Header /> */}
          <main className="main">{children}</main>
          {/* <Footer /> */}          
        </div>
      </body>
    </html>
  );
}
