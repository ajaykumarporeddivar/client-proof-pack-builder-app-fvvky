'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui'
import { AppHeader } from '@/components/layout'
import { formatDate } from '@/lib/utils'
// ⚠ Import ONLY the MOCK arrays defined in your SPEC CONTRACT Entity Reference Table:
import { MOCK_PROOF_PACKS } from '@/lib/data'
import { Search, Plus, Download, Eye } from 'lucide-react'
import type { ProofPack } from '@/lib/types'

export default function FeaturePage(): JSX.Element {
  const params = useParams()
  const slug = (params.feature as string) ?? ''
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  // ── Feature 1: New Proof Pack Intake (/dashboard/proof-pack-intake) ──────────────────────
  if (slug === 'proof-pack-intake') {
    const items = MOCK_PROOF_PACKS.filter((p: ProofPack) =>
      (!search || p.title.toLowerCase().includes(search.toLowerCase()) || (p.clientName && p.clientName.toLowerCase().includes(search.toLowerCase()))) &&
      (!statusFilter || p.status === statusFilter)
    )
    return (
      <div className="space-y-6">
        <AppHeader
          title="New Proof Pack Intake"
          subtitle={`${items.length} proof packs total`}
          actions={<Button size="sm"><Plus size={14} className="mr-1" />New Proof Pack</Button>}
        />
        <Card>
          <CardHeader>
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search proof packs..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none"
              >
                <option value="">All statuses</option>
                <option value="draft">Draft</option>
                <option value="pending_review">Pending Review</option>
                <option value="ready_for_export">Ready for Export</option>
                <option value="exported">Exported</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-100">
                <tr className="text-left text-zinc-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Client Name</th>
                  <th className="px-6 py-3">Reporting Period</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Items</th>
                  <th className="px-6 py-3">Created</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {items.map((item: ProofPack) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelected(selected === item.id ? null : item.id)}
                    className={`hover:bg-zinc-50 cursor-pointer transition-colors ${selected === item.id ? 'bg-indigo-50' : ''}`}
                  >
                    <td className="px-6 py-3 font-medium text-zinc-900">{item.title}</td>
                    <td className="px-6 py-3 text-zinc-500">{item.clientName}</td>
                    <td className="px-6 py-3 text-zinc-700">{item.reportingPeriod}</td>
                    <td className="px-6 py-3">
                      <Badge variant={
                          item.status === 'ready_for_export' ? 'success' :
                          item.status === 'pending_review' ? 'warning' :
                          item.status === 'exported' ? 'primary' : 'info'
                      }>
                        {item.status.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-zinc-500">{item.reportItemCount ?? 0}</td>
                    <td className="px-6 py-3 text-zinc-400 text-xs">{formatDate(item.createdAt)}</td>
                    <td className="px-6 py-3">
                      <button className="text-zinc-400 hover:text-zinc-700 p-1"><Eye size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3 border-t border-zinc-100 text-xs text-zinc-400">
              Showing {items.length} of {MOCK_PROOF_PACKS.length} proof packs
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Feature 2: Agency Dashboard (/dashboard/dashboard) ──────────────────────
  if (slug === 'dashboard') {
    const activePacks = MOCK_PROOF_PACKS.filter((p: ProofPack) => p.status === 'draft' || p.status === 'pending_review');
    const items = activePacks.filter((p: ProofPack) =>
      !search || JSON.stringify(p).toLowerCase().includes(search.toLowerCase())
    )
    return (
      <div className="space-y-6">
        <AppHeader
          title="Agency Dashboard"
          subtitle={`${items.length} active proof packs`}
          actions={<Button size="sm"><Plus size={14} className="mr-1" />Create New Pack</Button>}
        />
        <div className="mb-4">
          <div className="relative max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search dashboard items..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item: ProofPack) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelected(item.id)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                    {(item.clientName || 'N/A').slice(0, 2).toUpperCase()}
                  </div>
                  <Badge variant={
                          item.status === 'ready_for_export' ? 'success' :
                          item.status === 'pending_review' ? 'warning' :
                          item.status === 'exported' ? 'primary' : 'info'
                      }>
                        {item.status.replace(/_/g, ' ')}
                  </Badge>
                </div>
                <h3 className="font-semibold text-zinc-900 text-sm mb-1">{item.title}</h3>
                <p className="text-zinc-500 text-xs mb-3">{item.clientName}</p>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>{item.reportingPeriod}</span>
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // ── Feature 3: Proof Pack Exports (/dashboard/proof-pack-exports) ──────────────────────
  if (slug === 'proof-pack-exports') {
    const exportablePacks = MOCK_PROOF_PACKS.filter((p: ProofPack) => p.status === 'ready_for_export' || p.status === 'exported');
    const items = exportablePacks.filter((p: ProofPack) =>
      !search || JSON.stringify(p).toLowerCase().includes(search.toLowerCase())
    )
    return (
      <div className="space-y-6">
        <AppHeader
          title="Proof Pack Exports"
          subtitle={`${items.length} exportable proof packs`}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Download size={14} className="mr-1" />Export All</Button>
              <Button size="sm"><Plus size={14} className="mr-1" />New Proof Pack</Button>
            </div>
          }
        />
        <Card>
          <CardHeader>
            <div className="relative max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search exports..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-100">
                <tr className="text-left text-zinc-500 text-xs uppercase tracking-wide">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Client Name</th>
                  <th className="px-6 py-3">Reporting Period</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {items.map((item: ProofPack) => (
                  <tr key={item.id} className="hover:bg-zinc-50 cursor-pointer" onClick={() => setSelected(item.id)}>
                    <td className="px-6 py-3 font-medium text-zinc-900">{item.title}</td>
                    <td className="px-6 py-3 text-zinc-500">{item.clientName}</td>
                    <td className="px-6 py-3 text-zinc-700">{item.reportingPeriod}</td>
                    <td className="px-6 py-3">
                        <Badge variant={
                          item.status === 'ready_for_export' ? 'success' :
                          item.status === 'pending_review' ? 'warning' :
                          item.status === 'exported' ? 'primary' : 'info'
                      }>
                        {item.status.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-zinc-400 text-xs">{formatDate(item.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Default: feature hub ──────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <AppHeader title="Features" subtitle="Select a feature to get started" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { slug: 'proof-pack-intake', name: 'New Proof Pack Intake', description: 'Capture client data and campaign results.', count: MOCK_PROOF_PACKS.length },
          { slug: 'dashboard', name: 'Agency Dashboard', description: 'Monitor proof pack progress and prioritize work.', count: MOCK_PROOF_PACKS.length },
          { slug: 'proof-pack-exports', name: 'Proof Pack Exports', description: 'Generate client-ready reports and secure renewals.', count: MOCK_PROOF_PACKS.length },
        ].map(f => (
          <a key={f.slug} href={`/dashboard/${f.slug}`}>
            <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                  <Eye size={20} />
                </div>
                <h3 className="font-bold text-zinc-900 mb-1">{f.name}</h3>
                <p className="text-zinc-500 text-sm mb-4">{f.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">{f.count} records</span>
                  <span className="text-xs font-medium text-indigo-600">Open →</span>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}