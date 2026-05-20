'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  PlusCircle,
  LayoutDashboard,
  Download,
  Settings,
  Users,
  FileText,
  type LucideIcon,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input, Button } from '@/components/ui' // Assuming Input and Button are from ui.tsx

export interface NavItem {
  icon: React.ReactNode // LucideIcon component
  label: string
  href: string
}

interface AppSidebarProps {
  items: NavItem[]
  projectName: string
}

export function AppSidebar({ items, projectName }: AppSidebarProps): JSX.Element {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-zinc-900 text-zinc-100 p-6 flex flex-col">
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-white">{projectName}</h1>
      </div>
      <nav className="flex-1 space-y-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={cn(
            'flex items-center gap-3 py-2 px-3 rounded-lg text-zinc-300 hover:bg-zinc-800 transition-colors',
            pathname === item.href && 'bg-zinc-800 text-white'
          )}>
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      {/* Muted text for plan */}
      <div className="mt-8 pt-4 border-t border-zinc-700 text-zinc-400 text-sm">
        <p>Pro Pack - $49/month</p>
        <p className="mt-1">Unlock full roadmap with one click!</p>
      </div>
    </aside>
  )
}

interface AppHeaderProps {
  title: string
  subtitle: string
  actions?: React.ReactNode
}

export function AppHeader({ title, subtitle, actions }: AppHeaderProps): JSX.Element {
  return (
    <header className="flex items-center justify-between py-4 border-b border-zinc-200 mb-6 bg-white pr-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">{title}</h2>
        <p className="text-zinc-600 text-sm">{subtitle}</p>
      </div>
      {actions && <div>{actions}</div>}
    </header>
  )
}