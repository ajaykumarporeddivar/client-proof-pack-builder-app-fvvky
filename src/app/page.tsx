import Link from 'next/link'

export const metadata = {
  title: 'Client Proof Pack Builder — Justify retainers. Secure renewals.',
  description:
    'Transform scattered campaign results into client-ready proof packs that justify retainers and secure renewals.',
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="sticky top-0 z-40 border-b border-zinc-100 bg-white/90 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="text-lg font-black text-zinc-900">Client Proof Pack Builder</span>
          <Link
            href="/dashboard"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700"
          >
            Open dashboard
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Agency reporting, solved
        </p>
        <h1 className="mt-4 text-5xl font-black leading-tight tracking-tight text-zinc-950 md:text-6xl">
          Justify retainers.<br />Secure renewals.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-zinc-600">
          Turn scattered campaign results into structured, client-ready proof packs in minutes — not hours.
          Show ROI, close renewals, and stop losing clients to poor reporting.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-xl bg-zinc-900 px-8 py-3.5 text-base font-bold text-white hover:bg-zinc-700"
          >
            Build your first proof pack
          </Link>
          <Link
            href="#features"
            className="rounded-xl border border-zinc-200 px-8 py-3.5 text-base font-semibold text-zinc-700 hover:bg-zinc-50"
          >
            See how it works
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-zinc-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-black text-zinc-950">Three workflows, one platform</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Proof Pack Intake',
                desc: 'Capture raw campaign results and client requests into a structured, searchable queue.',
                href: '/dashboard/proof-pack-intake',
              },
              {
                title: 'Report Builder',
                desc: 'Assemble metrics, screenshots, and commentary into polished client-ready reports.',
                href: '/dashboard',
              },
              {
                title: 'Proof Pack Exports',
                desc: 'Export branded PDF or CSV proof packs and share with clients in one click.',
                href: '/dashboard/proof-pack-exports',
              },
            ].map(f => (
              <div key={f.title} className="rounded-2xl border border-zinc-200 bg-white p-8">
                <h3 className="text-xl font-bold text-zinc-950">{f.title}</h3>
                <p className="mt-3 text-zinc-600">{f.desc}</p>
                <Link
                  href={f.href}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-zinc-900 hover:underline"
                >
                  Open →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black text-zinc-950">Simple pricing</h2>
          <p className="mt-3 text-zinc-600">Start free. Upgrade when you need the full proof pack arsenal.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 p-8 text-left">
              <p className="text-lg font-bold text-zinc-950">Free</p>
              <p className="mt-2 text-4xl font-black text-zinc-950">$0</p>
              <p className="mt-4 text-zinc-600">3 proof packs per month, PDF export, basic reporting.</p>
              <Link href="/dashboard" className="mt-6 block rounded-xl border border-zinc-900 px-6 py-3 text-center font-semibold text-zinc-900 hover:bg-zinc-50">
                Get started free
              </Link>
            </div>
            <div className="rounded-2xl border-2 border-zinc-900 bg-zinc-900 p-8 text-left text-white">
              <p className="text-lg font-bold">Pro</p>
              <p className="mt-2 text-4xl font-black">$49<span className="text-xl font-normal text-zinc-400">/mo</span></p>
              <p className="mt-4 text-zinc-400">Unlimited proof packs, white-label exports, client portal, priority support.</p>
              <Link href="/dashboard" className="mt-6 block rounded-xl bg-white px-6 py-3 text-center font-semibold text-zinc-900 hover:bg-zinc-100">
                Start Pro trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-100 px-6 py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Client Proof Pack Builder · Built with NEXUS OS
      </footer>
    </main>
  )
}
