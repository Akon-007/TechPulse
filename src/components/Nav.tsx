import { useState } from 'react';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  return (
    <header id="site-header" className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo & Desktop Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a 
              id="nav-logo"
              href="#" 
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 rounded-lg p-1"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-200 group-hover:bg-purple-700 transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                Tech<span className="text-purple-600">Pulse</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav" aria-label="Main Navigation" className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a 
                id="nav-link-home"
                href="#" 
                className="hover:text-slate-900 transition-colors py-2"
              >
                Home
              </a>
              
              <div className="relative group">
                <button
                  id="nav-dropdown-products-btn"
                  onClick={() => toggleDropdown('products')}
                  onMouseEnter={() => setActiveDropdown('products')}
                  className="flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors py-2 focus:outline-none"
                >
                  <span>Products</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </button>
                {activeDropdown === 'products' && (
                  <div 
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-0 mt-1 w-52 rounded-xl bg-white p-2 shadow-xl border border-slate-100 z-50"
                  >
                    <a href="#posts" className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg">Pulse Blog Feed</a>
                    <a href="#newsletter" className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg">Pulse Weekly Digest</a>
                    <a href="#footer" className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg">API Integrations</a>
                  </div>
                )}
              </div>

              <div className="relative group">
                <button
                  id="nav-dropdown-resources-btn"
                  onClick={() => toggleDropdown('resources')}
                  onMouseEnter={() => setActiveDropdown('resources')}
                  className="flex items-center gap-1 cursor-pointer text-purple-600 font-semibold py-2 focus:outline-none"
                >
                  <span>Resources</span>
                  <ChevronDown className="w-4 h-4 text-purple-600 transition-colors" />
                </button>
                {activeDropdown === 'resources' && (
                  <div 
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-0 mt-1 w-52 rounded-xl bg-white p-2 shadow-xl border border-slate-100 z-50"
                  >
                    <a href="#posts" className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg">Articles & Guides</a>
                    <a href="#search-input" className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg">Topic Library</a>
                    <a href="#footer" className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg">Developer Documentation</a>
                  </div>
                )}
              </div>

              <a 
                id="nav-link-pricing"
                href="#footer" 
                className="hover:text-slate-900 transition-colors py-2"
              >
                Pricing
              </a>
            </nav>
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              id="nav-btn-login"
              href="#login"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 px-4 py-2 rounded-lg transition-colors"
            >
              Log in
            </a>
            <a
              id="nav-btn-post"
              href="#newsletter"
              className="text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg shadow-sm shadow-purple-200 transition-all"
            >
              Subscribe
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div id="mobile-menu-drawer" className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <a
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          >
            Home
          </a>
          <a
            href="#posts"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          >
            Products
          </a>
          <a
            href="#posts"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-purple-600 bg-purple-50 font-semibold"
          >
            Resources
          </a>
          <a
            href="#footer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          >
            Pricing
          </a>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="#login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Log in
            </a>
            <a
              href="#newsletter"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-sm transition-colors"
            >
              Subscribe
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
