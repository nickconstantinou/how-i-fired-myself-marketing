'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl sm:text-2xl tracking-tight text-white">
            How I <span style={{color: '#d4af37', textShadow: '0 0 1px rgba(0,0,0,0.3)'}}>Escaped</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 lg:gap-8 items-center">
            <Link href="/" className="text-slate-300 hover:text-amber-400 transition-colors text-sm lg:text-base">
              Home
            </Link>
            <Link href="/about" className="text-slate-300 hover:text-amber-400 transition-colors text-sm lg:text-base">
              About
            </Link>
            <Link href="/blog" className="text-slate-300 hover:text-amber-400 transition-colors text-sm lg:text-base">
              Blog
            </Link>
            <Link href="/faq" className="text-slate-300 hover:text-amber-400 transition-colors text-sm lg:text-base">
              FAQ
            </Link>
            <Link href="/jumpstart" className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-4 lg:px-5 py-2 lg:py-2.5 rounded-full font-semibold hover:from-amber-500 hover:to-amber-400 transition-all text-sm lg:text-base">
              Free Guide
            </Link>
          </div>

          {/* Mobile Hamburger Button - with inline onclick */}
          <button 
            id="mobile-menu-toggle"
            className="md:hidden p-2 text-white hover:text-amber-400 transition-colors"
            aria-label="Toggle menu"
            aria-expanded="false"
            onclick="document.getElementById('mobile-menu').classList.toggle('hidden'); document.getElementById('mobile-menu-toggle').setAttribute('aria-expanded', document.getElementById('mobile-menu').classList.contains('hidden') ? 'false' : 'true')"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden md:hidden mt-4 pb-4 border-t border-slate-800 pt-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-lg text-slate-300 hover:text-amber-400 transition-colors py-2">
              Home
            </Link>
            <Link href="/about" className="text-lg text-slate-300 hover:text-amber-400 transition-colors py-2">
              About
            </Link>
            <Link href="/blog" className="text-lg text-slate-300 hover:text-amber-400 transition-colors py-2">
              Blog
            </Link>
            <Link href="/faq" className="text-lg text-slate-300 hover:text-amber-400 transition-colors py-2">
              FAQ
            </Link>
            <Link href="/jumpstart" className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-5 py-3 rounded-full font-semibold hover:from-amber-500 hover:to-amber-400 transition-all text-center mt-2">
              Free Guide
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
