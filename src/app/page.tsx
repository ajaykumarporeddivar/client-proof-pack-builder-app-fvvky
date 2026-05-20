import Link from 'next/link'
import { Inter } from 'next/font/google'
import {
  Sparkles,
  Award,
  Lock,
  PlusCircle,
  LayoutDashboard,
  Download,
  Lightbulb,
  Workflow,
  ClipboardList,
  Star,
  ArrowRight,
} from 'lucide-react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Client Proof Pack Builder — Justify retainers. Secure renewals.',
  description:
    'The Client Proof Pack Builder transforms scattered campaign results into structured, client-ready proof packs, ensuring agencies can quickly justify retainers and secure renewals.',
}

export default function LandingPage(): JSX.Element {
  const features = [
    {
      icon: PlusCircle,
      name: 'New Proof Pack Intake',
      painPoint: 'Turn messy intake into a clean queue',
      description:
        'Input raw campaign results and client requests into a structured, actionable queue for proof pack creation.',
    },
    {
      icon: LayoutDashboard,
      name: 'Agency Dashboard',
      painPoint: 'Prioritize high-value work',
      description:
        'Manage all pending proof pack requests, efficiently allocate resources, and ensure timely client reporting.',
    },
    {
      icon: Download,
      name: 'Proof Pack Export',
      painPoint: 'Export client-ready outputs, prove ROI',
      description:
        'Produce professional, branded reports that justify retainers and secure renewals with a single click.',
    },
  ]

  const roadmapFeatures = [
    {
      name: 'Intake Automation',
      value: 'Automatically ingest data from marketing platforms.',
      tier: 'Pro / Enterprise',
    },
    {
      name: 'Reporting Automation',
      value: 'Schedule and auto-generate recurring client reports.',
      tier: 'Pro / Enterprise',
    },
    {
      name: 'Exports Automation',
      value: 'Set up recurring email exports for proof packs.',
      tier: 'Pro / Enterprise',
    },
    {
      name: 'Advanced Agent Automation', // "Small digital agency owners automation" from brief was awkward
      value: 'AI agents handle initial data parsing and report drafting.',
      tier: 'Enterprise',
    },
    {
      name: 'Team Roles & Permissions',
      value: 'Define access and approval workflows for your team.',
      tier: 'Pro / Enterprise',
    },
    {
      name: 'Real Database Persistence',
      value: 'Secure, scalable storage for all your client data.',
      tier: 'Pro / Enterprise',
    },
    {
      name: 'Billing & Entitlements',
      value: 'Manage subscriptions and feature access seamlessly.',
      tier: 'Pro / Enterprise',
    },
    {
      name: 'Advanced Analytics',
      value: 'Benchmark your client performance against industry standards.',
      tier: 'Enterprise',
    },
  ]

  const howItWorksSteps = [
    {
      number: 1,
      title: 'Capture Insights',
      description:
        'Effortlessly input raw campaign data, client requests, and key metrics into structured "Proof Records", turning scattered info into an organized queue.',
      icon: Lightbulb,
    },
    {
      number: 2,
      title: 'Triage & Prioritize',
      description:
        'Utilize your personalized dashboard to view, sort, and manage all pending proof packs. Prioritize high-value work and track progress at a glance.',
      icon: Workflow,
    },
    {
      number: 3,
      title: 'Export & Impress',
      description:
        'Generate professional, client-ready reports with one click. Showcase tangible ROI, justify your value, and secure renewals without manual spreadsheet hassle.',
      icon: ClipboardList,
    },
  ]

  return (
    <div className={inter.className}>
      {/* NAV BAR */}
      <nav className="fixed top-10 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-100 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg" />
            <span className="font-bold text-lg text-zinc-900">
              Client Proof Pack Builder
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              href="#features"
              className="text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="bg-zinc-900 text-white rounded-lg px-4 py-2 hover:bg-zinc-700 transition-colors flex items-center gap-2"
            >
              Open Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-10">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-12">
          <div className="max-w-4xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-3 py-1 text-sm font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/50 mb-4">
              <Sparkles className="h-4 w-4 mr-1" /> AI-Powered Agency Workflows
            </span>
            <h1 className="font-black text-5xl md:text-7xl tracking-tight leading-none text-white mt-4">
              Transform Scattered Results into Client-Ready Proof Packs
            </h1>
            <p className="text-zinc-400 text-xl mt-4 max-w-2xl mx-auto">
              Client Proof Pack Builder streamlines reporting, helping small
              digital agencies justify retainers and secure renewals with minimal
              effort.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="bg-white text-zinc-900 font-bold rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                Start Free Today <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/dashboard"
                className="border border-zinc-600 text-zinc-300 rounded-xl px-8 py-4 hover:bg-zinc-800 transition-colors flex items-center gap-2"
              >
                See It Live <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* HERO VISUAL (CSS-only UI mockup) */}
            <div className="relative rounded-2xl bg-zinc-800/50 border border-zinc-700 p-6 max-w-3xl mx-auto mt-16 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-zinc-700 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                </div>
                <div className="flex space-x-2">
                  <div className="w-24 h-4 bg-zinc-700 rounded-md" />
                  <div className="w-16 h-4 bg-zinc-700 rounded-md" />
                </div>
              </div>

              {/* Sidebar + Main Content */}
              <div className="flex space-x-4">
                {/* Sidebar */}
                <div className="w-1/4 space-y-3">
                  <div className="h-5 bg-zinc-700 rounded-md w-3/4" />
                  <div className="h-5 bg-indigo-500 rounded-md w-full animate-pulse" />
                  <div className="h-5 bg-zinc-700 rounded-md w-5/6" />
                  <div className="h-5 bg-zinc-700 rounded-md w-2/3" />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 space-y-4">
                  {/* Top bar with filter/search */}
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-zinc-700 rounded-md w-1/3" />
                    <div className="h-6 bg-zinc-700 rounded-md w-1/4" />
                  </div>
                  {/* Table rows */}
                  <div className="space-y-2">
                    <div className="h-8 bg-zinc-700 rounded-md" />
                    <div className="h-8 bg-zinc-700 rounded-md" />
                    <div className="h-8 bg-emerald-500 rounded-md w-3/4 animate-pulse" />
                    <div className="h-8 bg-zinc-700 rounded-md" />
                    <div className="h-8 bg-zinc-700 rounded-md w-5/6" />
                  </div>
                  {/* Chart/graph placeholder */}
                  <div className="h-28 bg-zinc-700 rounded-md flex items-end p-2 space-x-1">
                    <div className="w-1/6 h-3/4 bg-indigo-500 rounded-sm" />
                    <div className="w-1/6 h-1/2 bg-indigo-500 rounded-sm" />
                    <div className="w-1/6 h-full bg-indigo-500 rounded-sm" />
                    <div className="w-1/6 h-2/3 bg-indigo-500 rounded-sm" />
                    <div className="w-1/6 h-1/3 bg-indigo-500 rounded-sm" />
                    <div className="w-1/6 h-3/5 bg-indigo-500 rounded-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF BAR */}
        <section className="bg-zinc-800/30 border-y border-zinc-700/50 py-8 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-black text-4xl text-white">10,000+</p>
              <p className="text-zinc-400 text-sm mt-1">Users</p>
            </div>
            <div>
              <p className="font-black text-4xl text-white">99.9%</p>
              <p className="text-zinc-400 text-sm mt-1">Uptime</p>
            </div>
            <div>
              <p className="font-black text-4xl text-white">$50M+</p>
              <p className="text-zinc-400 text-sm mt-1">Value Justified</p>
            </div>
            <div>
              <p className="font-black text-4xl text-white">4.9<span className="text-amber-400">★</span></p>
              <p className="text-zinc-400 text-sm mt-1">Rating</p>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="bg-white py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-zinc-900 font-black text-4xl text-center tracking-tight">
              The 3 workflows that solve chaotic client reporting
            </h2>
            <p className="text-zinc-500 mt-3 text-center max-w-2xl mx-auto text-lg">
              Streamline your agency&apos;s reporting process from messy inputs
              to polished, client-ready proof packs, ensuring clarity and
              justification.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-zinc-50 rounded-2xl border border-zinc-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 p-3 mb-4">
                    <feature.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-xl text-zinc-900 mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-zinc-600 mb-3">{feature.painPoint}</p>
                  <p className="text-zinc-500 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCKED ROADMAP / SELLING POINTS SECTION */}
        <section className="bg-zinc-950 text-white py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-black text-white tracking-tight">
              Unlock the full roadmap in one click
            </h2>
            <p className="text-zinc-400 mt-3 max-w-2xl mx-auto text-lg">
              Upgrade today to instantly activate these powerful features,
              designed to scale your agency&apos;s proof pack operations and
              collaboration capabilities.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmapFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 text-left"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Lock className="h-5 w-5 text-zinc-400" />
                    <h3 className="font-semibold text-lg text-white">
                      {feature.name}
                    </h3>
                  </div>
                  <p className="text-zinc-300 text-sm">{feature.value}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="inline-flex items-center rounded-full bg-zinc-700/50 px-3 py-1 text-xs font-medium text-zinc-300">
                      {feature.tier}
                    </span>
                    <span className="text-zinc-500 text-xs italic">
                      Available after upgrade
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="#pricing"
              className="mt-12 inline-flex items-center bg-indigo-600 text-white rounded-xl px-8 py-4 font-bold hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Unlock full roadmap <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-zinc-50 py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-zinc-900 font-black text-4xl text-center tracking-tight">
              How Client Proof Pack Builder Works
            </h2>
            <p className="text-zinc-500 mt-3 text-center max-w-2xl mx-auto text-lg">
              Our streamlined process ensures your agency proves its value
              consistently and effortlessly.
            </p>

            <div className="mt-16 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
              {howItWorksSteps.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center text-center max-w-sm">
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white text-2xl font-bold">
                      {step.number}
                      <div className="absolute top-0 right-0 -mr-4 mt-2">
                        <step.icon className="h-6 w-6 text-indigo-200 opacity-75" />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl text-zinc-900 mt-6 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-zinc-600">{step.description}</p>
                  </div>
                  {index < howItWorksSteps.length - 1 && (
                    <ArrowRight className="h-8 w-8 text-zinc-400 md:block rotate-90 md:rotate-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="bg-white py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-zinc-900 font-black text-4xl tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-zinc-500 mt-3 max-w-xl mx-auto text-lg">
              Choose the plan that fits your agency&apos;s needs. Scale as you grow.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Tier */}
              <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-8 flex flex-col items-center">
                <h3 className="font-bold text-2xl text-zinc-900">Lite Pack</h3>
                <p className="text-zinc-600 mt-2">Perfect for trying it out</p>
                <div className="mt-6">
                  <span className="text-5xl font-black text-zinc-900">₹0</span>
                  <span className="text-zinc-600">/month</span>
                </div>
                <ul className="mt-8 space-y-4 text-zinc-600 text-left w-full">
                  <li className="flex items-center">
                    <Award className="h-5 w-5 text-emerald-500 mr-2" /> 1 Active Client
                  </li>
                  <li className="flex items-center">
                    <Award className="h-5 w-5 text-emerald-500 mr-2" /> 2 Proof Packs
                  </li>
                  <li className="flex items-center">
                    <Award className="h-5 w-5 text-emerald-500 mr-2" /> Basic PDF Export
                  </li>
                </ul>
                <Link
                  href="/dashboard"
                  className="mt-10 bg-zinc-900 text-white rounded-lg px-6 py-3 w-full text-center hover:bg-zinc-700 transition-colors font-semibold"
                >
                  Get Started
                </Link>
              </div>

              {/* Pro Tier (Highlighted) */}
              <div className="bg-zinc-900 text-white rounded-xl shadow-md p-8 flex flex-col items-center transform scale-105