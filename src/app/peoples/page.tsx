// /src/app/peoples/page.tsx
import Link from 'next/link';

export default function PeoplesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Peoples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/peoples/affiliations">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow h-full">
            <h2 className="text-xl font-bold mb-2">Affiliations</h2>
            <p className="text-gray-600">
              Discover the various groups, organizations, and factions that shape our world.
              Learn about their history, goals, and notable members.
            </p>
          </div>
        </Link>
        
        <Link href="/peoples/characters">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow h-full">
            <h2 className="text-xl font-bold mb-2">Characters</h2>
            <p className="text-gray-600">
              Meet the important individuals who have made their mark on history.
              Explore their backgrounds, relationships, and contributions.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}