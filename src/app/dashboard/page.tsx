import { BarChart, Sparkline } from '@/components/charts'
import { Card, StatCard } from '@/components/ui'
import { MOCK_PROOF_PACKS, MOCK_CLIENTS, STATS, CHART_DATA } from '@/lib/data'

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Overview</p>
        <h1 className="mt-1 text-3xl font-black text-zinc-950">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Proof Packs" value={STATS.totalProofPacks} change={STATS.totalProofPacksGrowth} changeType="up" />
        <StatCard title="Ready for Export" value={STATS.packsReadyForExport} change={STATS.packsReadyForExportGrowth} />
        <StatCard title="Active Clients" value={String(MOCK_CLIENTS.filter(c => c.status === 'active').length)} />
        <StatCard title="In Review" value={String(MOCK_PROOF_PACKS.filter(p => p.status === 'pending_review').length)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card>
          <h2 className="font-bold text-zinc-950">Proof Packs Created (Weekly)</h2>
          <div className="mt-4">
            <BarChart data={CHART_DATA.weekly} labels={CHART_DATA.labels} />
          </div>
        </Card>
        <Card>
          <h2 className="font-bold text-zinc-950">Proof Pack Value Trend</h2>
          <div className="mt-4 text-zinc-900">
            <Sparkline data={CHART_DATA.proofPackValue} />
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="font-bold text-zinc-950">Recent Proof Packs</h2>
        <table className="mt-4 w-full text-sm">
          <tbody>
            {MOCK_PROOF_PACKS.slice(0, 6).map(pack => (
              <tr key={pack.id} className="border-t border-zinc-100">
                <td className="py-3 font-medium text-zinc-950">{pack.title}</td>
                <td className="py-3 text-zinc-500">{pack.clientName}</td>
                <td className="py-3 capitalize text-zinc-500">{pack.status.replace(/_/g, ' ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <h2 className="font-bold text-zinc-950">Active Clients</h2>
        <table className="mt-4 w-full text-sm">
          <tbody>
            {MOCK_CLIENTS.filter(c => c.status === 'active').slice(0, 5).map(client => (
              <tr key={client.id} className="border-t border-zinc-100">
                <td className="py-3 font-medium text-zinc-950">{client.name}</td>
                <td className="py-3 text-zinc-500">{client.contactEmail}</td>
                <td className="py-3 text-zinc-500">{client.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
