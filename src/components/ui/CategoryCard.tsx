// /app/components/ui/CategoryCard.tsx
import Link from 'next/link';

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
}

export default function CategoryCard({ title, description, href }: CategoryCardProps) {
  return (
    <Link href={href}>
      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}