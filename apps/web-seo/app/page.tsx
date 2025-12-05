// apps/web-seo/app/page.tsx
import Link from "next/link";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
// import IntroCardsSection from "../components/IntroCardsSection";
// import TempleHighlight from "../components/TempleHighlight";
// import HeritageHighlight from "../components/HeritageHighlight";
// import NewsSection from "../components/NewsSection";
// import MembershipTeaser from "../components/MembershipTeaser";
import Footer from "../components/Footer";

export const metadata = {
  title: "禅旅プラットフォーム | 寺院・非遺文化・修行体験",
  description:
    "寺院を探し、非物質文化遺産にふれ、オンライン修行・会員サービスを通じて中日仏教文化を学べるデジタルプラットフォームです。",
};

export default function HomePage() {
  return (
    <div className="page">
      {/* 顶部导航（从 index.html 的 Navigation 区域拆出来） */}
      <Navigation />

      {/* Hero 区域（大图 + 标题 + 按钮） */}
      <HeroSection />

      {/* 「このサイトでできること」类似的四块入口卡片 */}
      {/* <IntroCardsSection /> */}

      {/* 「寺院を探す」重点推荐（部分寺院卡片 / carousel） */}
      {/* <TempleHighlight /> */}

      {/* 非遺文化推荐 */}
      {/* <HeritageHighlight /> */}

      {/* 活動・ニュース 列表区块 */}
      {/* <NewsSection /> */}

      {/* 会員サービス / 会员系统 引导区块 */}
      {/* <MembershipTeaser /> */}

      {/* 页脚 */}
      <Footer />
    </div>
  );
    
}
