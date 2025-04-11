// src/components/layout/Footer.tsx
export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="bg-black/90 border-t border-blue-900/30 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center">
            <div className="h-8 w-8 mb-4">
              {/* Simple logo icon */}
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            
            <div className="flex space-x-8 mb-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">About</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">Contact</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">Terms</a>
            </div>
            
            <p className="text-gray-600 text-sm">
              © {currentYear} Wiki Universe. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }