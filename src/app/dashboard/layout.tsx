'use client'

import React from 'react'
import { AppSidebar, NavItem } from '@/components/layout'
import {
  PlusCircle,
  LayoutDashboard,
  Download,
  Settings,
  Users,
  FileText,
} from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  const navItems: NavItem[] = [
    { icon: <PlusCircle size={16} />, label: 'New Proof Pack', href: '/dashboard/proof-pack-intake' },
    { icon: <LayoutDashboard size={16} />, label: 'Dashboard', href: '/dashboard/dashboard' },
    { icon: <Download size={16} />, label: 'Proof Pack Exports', href: '/dashboard/proof-pack-exports' },
    { icon: <Users size={16} />, label: 'Clients', href: '/dashboard/clients' },
    { icon: <FileText size={16} />, label: 'Reports', href: '/dashboard/reports' },
    { icon: <Settings size={16} />, label: 'Settings', href: '/dashboard/settings' },
  ]

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AppSidebar items={navItems} projectName="Client Proof Pack Builder" />
      <div className="flex-1 ml-64 flex flex-col min-h-full">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}