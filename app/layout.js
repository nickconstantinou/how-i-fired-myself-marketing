import './globals.css'

export const metadata = {
  title: 'How I FIREd Myself - The Anti-Retirement Guide',
  description: 'The anti-retirement guide for pre-retirees who aren\'t ready to stop—they\'re ready to start something new.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
