'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Card, Badge, Button, Input } from '@/components/ui'
import { MOCK_PROOF_PACKS, MOCK_CLIENTS, MOCK_REPORT_ITEMS } from '@/lib/data'
import { formatDate } from '@/lib/utils'

export default function FeaturePage() {
  const params = useParams()
  const slug = (params.feature as string) ?? ''
  const [search, setSearch] = useState('')

  if (slug === 'proof-pack-intake') {
    const items = MOCK_PROOF_PACKS.filter(p =>
      !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.clientName?.toLowerCase().includes(search.toLowerCase())
    )
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-zinc-950">Proof Pack Intake</h1>
            <p className="text-zinc-500">{items.length} proof packs in queue</p>
          </div>
          <Button>+ New Proof Pack</Button>
        </div>
        <Input placeholder="Search proof packs..." value={search} onChange={e => setSearch(e.target.value)} />
        <Card>
          <table className="w-full">
            <tbody>
              {items.map(pack => (
                <tr key={pack.id} className="border-t border-zinc-100 hover:bg-zinc-50">
                  <td className="py-3 px-4 font-medium text-zinc-950">{pack.title}</td>
                  <td className="py-3 px-4 text-zinc-500">{pack.clientName}</td>
                  <td className="py-3 px-4 text-zinc-500">{pack.reportingPeriod}</td>
                  <td className="py-3 px-4">
                    <Badge variant={pack.status === 'ready_for_export' ? 'success' : pack.status === 'pending_review' ? 'warning' : 'info'}>
                      {pack.status.replace(/_/g, ' ')}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-zinc-400 text-sm">{formatDate(pack.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    )
  }

  if (slug === 'proof-pack-exports') {
    const exported = MOCK_PROOF_PACKS.filter(p =>
      (!search || p.title.toLowerCase().includes(search.toLowerCase())) &&
      (p.status === 'ready_for_export' || p.status === 'exported')
    )
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-zinc-950">Proof Pack Exports</h1>
            <p className="text-zinc-500">{exported.length} packs ready for export</p>
          </div>
          <Button variant="secondary">Export All CSV</Button>
        </div>
        <Input placeholder="Search exports..." value={search} onChange={e => setSearch(e.target.value)} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {exported.map(pack => (
            <Card key={pack.id}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-zinc-900">{pack.title}</p>
                  <p className="mt-1 text-sm text-zinc-500">{pack.clientName}</p>
                  <p className="mt-1 text-xs text-zinc-400">{pack.reportingPeriod}</p>
                </div>
                <Badge variant={pack.status === 'exported' ? 'info' : 'success'}>
                  {pack.status.replace(/_/g, ' ')}
                </Badge>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="secondary" className="flex-1 text-xs">Export PDF</Button>
                <Button variant="ghost" className="flex-1 text-xs">Export CSV</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (slug === 'settings') {
    return (
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-black text-zinc-950">Settings</h1>
        <Card>
          <h2 className="font-bold text-zinc-950 mb-4">Account</h2>
          <div className="space-y-3">
            <div><p className="text-sm text-zinc-500">Email</p><p className="font-medium text-zinc-900">demo@agency.com</p></div>
            <div><p className="text-sm text-zinc-500">Plan</p><p className="font-medium text-zinc-900">Free</p></div>
          </div>
          <Button className="mt-6">Upgrade to Pro</Button>
        </Card>
      </div>
    )
  }

  // Fallback hub
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-black text-zinc-950">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Proof Pack Intake', href: '/dashboard/proof-pack-intake', count: MOCK_PROOF_PACKS.length },
          { label: 'Proof Pack Exports', href: '/dashboard/proof-pack-exports', count: MOCK_PROOF_PACKS.filter(p => p.status === 'ready_for_export' || p.status === 'exported').length },
          { label: 'Active Clients', href: '/dashboard', count: MOCK_CLIENTS.filter(c => c.status === 'active').length },
        ].map(item => (
          <Card key={item.label}>
            <p className="text-3xl font-black text-zinc-950">{item.count}</p>
            <p className="mt-1 font-semibold text-zinc-900">{item.label}</p>
            <a href={item.href} className="mt-3 block text-sm font-medium text-zinc-500 hover:text-zinc-900">View all →</a>
          </Card>
        ))}
      </div>
    </div>
  )
}
