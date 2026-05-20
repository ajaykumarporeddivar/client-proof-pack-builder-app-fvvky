export interface Client {
  id: string
  name: string
  contactEmail: string
  status: 'active' | 'inactive' | 'archived'
  createdAt: string
  updatedAt: string
}

export interface ProofPack {
  id: string
  clientId: string
  title: string
  reportingPeriod: string
  status: 'draft' | 'pending_review' | 'ready_for_export' | 'exported'
  createdAt: string
  updatedAt: string
  // Derived fields for display/mock data, not direct DB columns:
  clientName?: string
  reportItemCount?: number
}

export interface ReportItem {
  id: string
  proofPackId: string
  title: string
  category: 'kpi' | 'chart_data' | 'general_insight'
  type: 'number' | 'text' | 'url' | 'date' | 'currency' | 'percentage'
  value: string
  unit?: string
  description?: string
  sourceUrl?: string
  status: 'active' | 'archived'
  createdAt: string
  updatedAt: string
}

export interface DemoUser {
  id: string
  name: string
  email: string
  role: string
  plan: string
  avatar: string
  joinedAt: string
}

export interface RecentActivityItem {
  id: string
  type: 'proof_pack_created' | 'proof_pack_exported' | 'report_item_added' | 'client_added'
  targetId: string // ID of the proof pack, report item, or client
  description: string
  timestamp: string
}