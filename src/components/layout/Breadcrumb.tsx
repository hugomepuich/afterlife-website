// src/components/layout/Breadcrumb.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMemo } from 'react';

type BreadcrumbSegment = {
  name: string;
  href: string;
  isLast: boolean;
};

// Map of path segments to readable names
const pathNameMap: Record<string, string> = {
  '': 'Home',
  'peoples': 'Peoples',
  'characters': 'Characters',
  'affiliations': 'Affiliations',
  'races': 'Races',
  'area': 'Areas',
};

// Custom hook to generate breadcrumb segments
function useBreadcrumbs() {
  const pathname = usePathname();
  
  return useMemo(() => {
    // Remove trailing slash and split path into segments
    const segments = pathname.replace(/\/$/, '').split('/').filter(Boolean);
    
    // Special case for home
    if (segments.length === 0) {
      return [{ name: 'Home', href: '/', isLast: true }];
    }
    
    // Generate breadcrumb segments with proper paths
    return [
      { name: 'Home', href: '/', isLast: false },
      ...segments.map((segment, index) => {
        const segmentPath = `/${segments.slice(0, index + 1).join('/')}`;
        
        // Try to get a readable name, or if it's a dynamic segment (like [slug]),
        // just use the raw segment as a fallback
        let name = pathNameMap[segment] || segment;
        
        // Check if this segment is likely a slug
        if (name === segment && segments[index - 1]) {
          // For slugs, reuse the same name as the previous segment but singular
          // e.g., "characters/ivy" would show "Character: ivy"
          const previousSegment = segments[index - 1];
          const previousName = pathNameMap[previousSegment] || previousSegment;
          
          // Convert to singular (simple approach)
          const singularName = previousName.endsWith('s') 
            ? previousName.slice(0, -1) 
            : previousName;
            
          name = `${singularName}: ${segment}`;
        }
        
        return {
          name,
          href: segmentPath,
          isLast: index === segments.length - 1,
        };
      }),
    ];
  }, [pathname]);
}

export default function Breadcrumb() {
  const breadcrumbs = useBreadcrumbs();
  
  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumbs on the home page
  }

  return (
    <nav className="bg-gray-900 border-y border-blue-900/30 shadow-md">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-3">
        <ol className="flex flex-wrap items-center text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li 
              key={breadcrumb.href} 
              className={`flex items-center ${
                breadcrumb.isLast ? 'text-blue-400 font-medium' : 'text-gray-300'
              }`}
            >
              {index > 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mx-2 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              
              {breadcrumb.isLast ? (
                <span className="drop-shadow-sm">{breadcrumb.name}</span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="hover:text-blue-400 transition-colors duration-200 drop-shadow-sm"
                >
                  {breadcrumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}