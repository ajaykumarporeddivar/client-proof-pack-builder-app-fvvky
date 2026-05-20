import {
  MOCK_CLIENTS,
  MOCK_PROOF_PACKS,
  MOCK_REPORT_ITEMS,
} from '@/lib/data'
import { type Client, type ProofPack, type ReportItem } from '@/lib/types'
import { type NextRequest } from 'next/server'

type SearchResultItem =
  | (Client & { __type: 'client' })
  | (ProofPack & { __type: 'proof_pack' })
  | (ReportItem & { __type: 'report_item' })

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') || ''
  const typeFilter = searchParams.get('type')

  const lowerCaseQuery = query.toLowerCase()
  let results: SearchResultItem[] = []

  function tagItems<T extends { id: string }, K extends SearchResultItem['__type']>(
    arr: T[],
    type: K,
  ): (T & { __type: K })[] {
    return arr.map((item) => ({ ...item, __type: type }))
  }

  if (!query) {
    // If query is empty, return the first 5 items from a combined set
    const allItems: SearchResultItem[] = [
      ...tagItems(MOCK_CLIENTS, 'client'),
      ...tagItems(MOCK_PROOF_PACKS, 'proof_pack'),
      ...tagItems(MOCK_REPORT_ITEMS, 'report_item'),
    ]
    results = allItems.slice(0, 5)
  } else {
    // Search clients
    if (!typeFilter || typeFilter === 'clients') {
      const clientResults = MOCK_CLIENTS.filter((client) =>
        client.name.toLowerCase().includes(lowerCaseQuery),
      ).map((client) => ({ ...client, __type: 'client' as const }))
      results.push(...clientResults)
    }

    // Search proof packs
    if (!typeFilter || typeFilter === 'proof_packs') {
      const proofPackResults = MOCK_PROOF_PACKS.filter(
        (pack) =>
          pack.title.toLowerCase().includes(lowerCaseQuery) ||
          (pack.clientName && pack.clientName.toLowerCase().includes(lowerCaseQuery)),
      ).map((pack) => ({ ...pack, __type: 'proof_pack' as const }))
      results.push(...proofPackResults)
    }

    // Search report items
    if (!typeFilter || typeFilter === 'report_items') {
      const reportItemResults = MOCK_REPORT_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerCaseQuery) ||
          (item.description && item.description.toLowerCase().includes(lowerCaseQuery)),
      ).map((item) => ({ ...item, __type: 'report_item' as const }))
      results.push(...reportItemResults)
    }
  }

  // Limit results to a maximum of 20
  const finalResults = results.slice(0, 20)

  return new Response(
    JSON.stringify({
      ok: true,
      data: {
        results: finalResults,
        total: finalResults.length,
        query: query,
      },
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