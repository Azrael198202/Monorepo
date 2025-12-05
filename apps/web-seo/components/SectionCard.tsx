// apps/web-seo/components/SectionCard.tsx
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  href: string;
};

export default function SectionCard({ title, description, href }: Props) {
  return (
    <Link href={href} className="section-card">
      <h3 className="section-card-title">{title}</h3>
      <p className="section-card-desc">{description}</p>
      <span className="section-card-more">詳しく見る →</span>
    </Link>
  );
}
