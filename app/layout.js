import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'How I FIREd Myself - The Anti-Retirement Guide',
  description: "The anti-retirement guide for pre-retirees who aren't ready to stop—they're ready to start something new.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="bg-emerald-900 text-white">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="font-bold text-xl">
              How I FIREd Myself
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-emerald-200">Home</Link>
              <Link href="/about" className="hover:text-emerald-200">About</Link>
              <Link href="/blog" className="hover:text-emerald-200">Blog</Link>
              <Link href="/faq" className="hover:text-emerald-200">FAQ</Link>
              <Link href="/jumpstart" className="text-amber-400 hover:text-amber-300">Free Guide</Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        {children}

        {/* Footer */}
        <footer className="mt-auto py-8 bg-emerald-950 text-emerald-200">
          <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <Link href="/faq" className="hover:text-white">FAQ</Link>
            <Link href="/jumpstart" className="hover:text-white">Free Guide</Link>
            <a href="#" className="hover:text-white">Privacy</a>
          </div>
        </footer>
      </body>
    </html>
  )
}
