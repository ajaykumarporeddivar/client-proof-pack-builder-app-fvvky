import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Client Proof Pack Builder — Justify retainers. Secure renewals.',
  description: 'The Client Proof Pack Builder transforms scattered campaign results into structured, client-ready proof packs, ensuring agencies can quickly justify retainers and secure renewals.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {/* Persistent Demo Mode Banner */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 text-zinc-100 text-xs px-4 py-2 flex justify-between items-center">
          <span>⚡ Demo Mode — Client Proof Pack Builder · Built with NEXUS OS</span>
          <Link href="/dashboard" className="text-white hover:text-indigo-400 transition-colors">
            Open Dashboard →
          </Link>
        </div>
        <div className="pt-9"> {/* Offset for fixed banner */}
          {children}
        </div>
      </body>
    </html>
  )
}