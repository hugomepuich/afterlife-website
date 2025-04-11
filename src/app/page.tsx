// /app/page.tsx
import Link from 'next/link';
import CategoryCard from '../components/ui/CategoryCard';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Wiki Universe</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CategoryCard 
          title="Areas" 
          description="Explore cities, dungeons, hunt zones, and peace zones"
          href="/area"
        />
        <CategoryCard 
          title="Races" 
          description="Discover the different races of our universe"
          href="/races"
        />
        <CategoryCard 
          title="Peoples" 
          description="Learn about affiliations and important characters"
          href="/peoples"
        />
      </div>
    </main>
  );
}