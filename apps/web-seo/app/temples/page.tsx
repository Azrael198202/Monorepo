// apps/web-seo/app/temples/page.tsx
import Link from "next/link";

export const metadata = {
  title: "寺院を探す | 禅旅プラットフォーム",
  description: "地域・宗派から寺院を検索し、歴史・本尊・法脈・建築文化・周辺非遺情報を閲覧できます。",
};

export default function TempleListPage() {
  // TODO: 未来这里调用 API 获取寺院列表
  return (
    <div className="page">
      <h1>寺院を探す</h1>
      <p>地域・宗派で絞り込んで、目的の寺院をお探しください。</p>
      {/* 筛选条件 */}
      <div className="filters">
        <select>
          <option>地域を選択</option>
        </select>
        <select>
          <option>宗派を選択</option>
        </select>
      </div>
      {/* 列表占位 */}
      <div className="list">
        <Link href="/temples/sample-temple" className="list-item">
          <h2>◯◯寺（サンプル）</h2>
          <p>歴史・本尊・法脈・建築などの概要をここに表示します。</p>
        </Link>
      </div>
    </div>
  );
}
