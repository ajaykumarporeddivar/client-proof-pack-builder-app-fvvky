'use client'

import React from 'react'
import { Modal, Button, Input } from '@/components/ui'

export function EntityDetailModal({
  item,
  open,
  onClose,
  title = 'Details',
}: {
  item?: Record<string, unknown> | null
  open: boolean
  onClose: () => void
  title?: string
}) {
  if (!open) return null
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="space-y-3">
        {item ? (
          Object.entries(item)
            .filter(([k]) => k !== 'id' && !k.startsWith('_'))
            .map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-t border-zinc-100 py-2">
                <span className="text-sm font-medium capitalize text-zinc-500">{k.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-sm text-zinc-900">{String(v ?? '—')}</span>
              </div>
            ))
        ) : (
          <p className="text-zinc-500 text-sm">No details available.</p>
        )}
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose} variant="secondary">Close</Button>
        </div>
      </div>
    </Modal>
  )
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = 'Confirm',
  message = 'Are you sure you want to proceed?',
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
}) {
  if (!open) return null
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-zinc-600 text-sm">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button onClick={() => { onConfirm(); onClose() }}>Confirm</Button>
      </div>
    </Modal>
  )
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = React.useState('')
  if (!open) return null
  return (
    <Modal open={open} onClose={onClose} title="Quick search">
      <Input
        placeholder="Search proof packs, clients..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        autoFocus
      />
      <div className="mt-4 flex justify-end">
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </div>
    </Modal>
  )
}
