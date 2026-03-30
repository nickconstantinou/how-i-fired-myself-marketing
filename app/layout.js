import Link from 'next/link'
import Navbar from './components/Navbar'
import './globals.css'

const BASE_URL = 'https://theantiretirementguide.co.uk'

const TITLE = 'The Anti-Retirement Guide | Design Your Next Chapter'
const DESCRIPTION = "For people who are close to retirement but haven't been able to move. Not because the money isn't there. Because the thing on the other side doesn't have a shape yet."

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: 'index, follow',
  alternates: {
    canonical: BASE_URL + '/',
    languages: {
      'en-GB': BASE_URL + '/',
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: BASE_URL + '/',
    siteName: 'The Anti-Retirement Guide',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <head>
        {/* Geo / Location meta tags for UK targeting */}
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <meta name="ICBM" content="51.5074, -0.1278" />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Canonical + hreflang */}
        <link rel="canonical" href={BASE_URL + '/'} />
        <link rel="alternate" hrefLang="en-GB" href={BASE_URL + '/'} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL + '/'} />

        {/* Open Graph */}
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BASE_URL + '/'} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="The Anti-Retirement Guide" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />

        {/* Schema.org Book JSON-LD */}
        <script type="application/ld+json" src="/schema-book.json" />

        {/* Tailwind + Fonts */}
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

        {/* PostHog Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.__SV=1,t.createElement("script")).src="https://cdn.jsdelivr.net/npm/posthog-js@4/dist/posthog.min.js",t.head.appendChild(e=t.createElement("script")),e.onload=function(){window.posthog.init("phc_IdAZHvksJADiN0p8Cm7H73jh5NT6oQaoYfUgaPPRB28",{api_host:"https://app.posthog.com",autocapture:false})}},r=function(t,e){return function(){var n=Array.prototype.slice.call(arguments,0);e&&t(n.concat(n)),window.posthog.capture.apply(window.posthog,n)}},o=function(t,e){return function(){var n=Array.prototype.slice.call(arguments,0);e&&t(n.concat(n)),window.posthog.people.set.apply(window.posthog,n)}},n="capture identify alias people.set set_config".split(" "),p=r.bind(null,"event");for(var i=0;i<n.length;i++)window.posthog[n[i]]=p;window.posthog.register=r.bind(null,"register"),window.posthog.unregister=r.bind(null,"unregister"),window.posthog.get_distinct_id=r.bind(null,"get_distinct_id"),window.posthog.get_session_id=r.bind(null,"get_session_id")})(document,window.posthog||[]);
            `
          }}
        />

        {/* Meta Pixel — fires on all pages */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1661332635055180');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1661332635055180&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Navigation */}
        <Navbar />

        {/* Vanilla JS hamburger fallback for static export */}
        <script dangerouslySetInnerHTML={{ __html: `
(function() {
  var toggle = document.getElementById('mobile-menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', function() {
    var isOpen = menu.classList.contains('hidden') === false;
    if (isOpen) {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      menu.classList.remove('hidden');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
})();
        ` }} />

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
              <Link href="/fear-quiz" className="hover:text-amber-400 transition-colors">Fear Quiz</Link>
            </div>
            <p className="text-slate-500">© 2026 Nick Constantinou. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
