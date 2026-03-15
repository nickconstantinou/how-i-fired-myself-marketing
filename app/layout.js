import Link from 'next/link'
import Navbar from './components/Navbar'
import './globals.css'

export const metadata = {
  title: 'DON\'T RETIRE — ESCAPE | The Anti-Retirement Guide',
  description: "The Anti-Retirement Guide for pre-retirees who aren't ready to stop—they're ready to escape and start something new.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@400;500;600&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'Source Sans 3', system-ui, sans-serif; }
          h1, h2, h3 { font-family: 'Playfair Display', Georgia, serif; }
          .btn-primary { background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%); color: #0f172a; padding: 1rem 2.5rem; border-radius: 9999px; font-weight: 600; display: inline-block; transition: all 0.3s; letter-spacing: 0.5px; }
          .btn-primary:hover { background: linear-gradient(135deg, #f4d03f 0%, #d4af37 100%); transform: translateY(-3px); box-shadow: 0 10px 25px -5px rgba(212, 175, 55, 0.4); }
          .hero { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%); }
          .section-alt { background: #fafbfc; }
          .card { background: white; border-radius: 1rem; padding: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03); border: 1px solid #e5e7eb; }
          h1 { font-size: 3.5rem; line-height: 1.15; letter-spacing: -0.02em; }
          h2 { font-size: 2.5rem; letter-spacing: -0.01em; }
          h3 { font-size: 1.5rem; }
          .gold-text { color: #d4af37; text-shadow: 0 0 1px rgba(0,0,0,0.3); }
          .gold-text-alt { color: #b8962e; }
          .nav-link { position: relative; }
          .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: #d4af37; transition: width 0.3s; }
          .nav-link:hover::after { width: 100%; }
        `}</style>
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        {children}

        {/* Footer */}
        <footer className="mt-auto py-14 bg-slate-950 text-slate-400 border-t border-slate-800">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="flex justify-center gap-8 mb-8 flex-wrap">
              <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-amber-400 transition-colors">About</Link>
              <Link href="/blog" className="hover:text-amber-400 transition-colors">Blog</Link>
              <Link href="/faq" className="hover:text-amber-400 transition-colors">FAQ</Link>
              <Link href="/jumpstart" className="hover:text-amber-400 transition-colors">Free Guide</Link>
            </div>
            <p className="text-slate-500">© 2026 How I FIREd Myself. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
