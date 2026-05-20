import {
  MOCK_CLIENTS,
  MOCK_PROOF_PACKS,
  MOCK_REPORT_ITEMS,
  STATS,
} from '@/lib/data'
import { type Client, type ProofPack, type ReportItem } from '@/lib/types'
import { type NextRequest } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function GET(request: NextRequest): Promise<Response> {
  const entityParam = request.nextUrl.searchParams.get('entity')

  let data:
    | { [key: string]: Client[] | ProofPack[] | ReportItem[] | typeof STATS }
    | undefined
  let total: number | { clients: number; proof_packs: number; report_items: number } | undefined

  if (entityParam === 'clients') {
    data = { clients: MOCK_CLIENTS, stats: STATS }
    total = MOCK_CLIENTS.length
  } else if (entityParam === 'proof_packs') {
    data = { proof_packs: MOCK_PROOF_PACKS, stats: STATS }
    total = MOCK_PROOF_PACKS.length
  } else if (entityParam === 'report_items') {
    data = { report_items: MOCK_REPORT_ITEMS, stats: STATS }
    total = MOCK_REPORT_ITEMS.length
  } else {
    // Return all data if no specific entity is requested
    data = {
      clients: MOCK_CLIENTS,
      proof_packs: MOCK_PROOF_PACKS,
      report_items: MOCK_REPORT_ITEMS,
      stats: STATS,
    }
    total = {
      clients: MOCK_CLIENTS.length,
      proof_packs: MOCK_PROOF_PACKS.length,
      report_items: MOCK_REPORT_ITEMS.length,
    }
  }

  if (!data) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid entity specified' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ ok: true, data, total }), {
    status: 200,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  })
}

export async function POST(request: NextRequest): Promise<Response> {
  const body = await request.json()
  return new Response(
    JSON.stringify({
      ok: true,
      message: 'Demo mode — data not persisted',
      received: body,
    }),
    {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    },
  )
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS,
  })
}