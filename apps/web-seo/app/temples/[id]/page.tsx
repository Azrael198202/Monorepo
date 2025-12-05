// apps/web-seo/app/temples/[id]/page.tsx
type Props = {
  params: { id: string };
};

export default function TempleDetailPage({ params }: Props) {
  const { id } = params;
  // TODO: 根据 id 调用 API 获取寺院信息

  return (
    <div className="page">
      <h1>寺院名（{id}）</h1>

      <nav className="tabs">
        <a href="#history">歴史・起源</a>
        <a href="#honzon">本尊・祖師</a>
        <a href="#lineage">法脈系図</a>
        <a href="#architecture">建築・文化</a>
        <a href="#photos">寺院写真</a>
        <a href="#heritages">周辺非遺</a>
        <a href="#events">寺院活動</a>
      </nav>

      <section id="history">
        <h2>歴史・起源</h2>
        <p>ここに寺院の歴史・起源の本文が入ります。（後でAPI連携）</p>
      </section>

      <section id="honzon">
        <h2>本尊・祖師</h2>
        <p>本尊・祖師に関する説明。</p>
      </section>

      <section id="lineage">
        <h2>法脈系図（中日関連）</h2>
        <p>系図の図表やテキストをここに表示。</p>
      </section>

      <section id="architecture">
        <h2>建築・文化</h2>
        <p>伽藍配置・建築様式・文化財など。</p>
      </section>

      <section id="photos">
        <h2>寺院写真</h2>
        <div className="photo-grid">写真ギャラリーのエリア</div>
      </section>

      <section id="heritages">
        <h2>周辺非遺</h2>
        <p>この寺院と関わりの深い非遺文化の一覧。</p>
      </section>

      <section id="events">
        <h2>寺院活動一覧</h2>
        <p>法会・講座・行事などのリスト。</p>
      </section>
    </div>
  );
}
