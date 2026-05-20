'use client'

import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  CheckCircle,
  AlertTriangle,
  Info,
  Archive,
  Trash2,
  ThumbsUp,
  X,
  type LucideIcon,
  SearchIcon,
  Command,
} from 'lucide-react'
import { Modal, Button, Badge, Avatar, Input, Kbd } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useDemoToast } from '@/hooks/useApp'

// Helper to format values for display
const formatValue = (key: string, value: unknown): React.ReactNode => {
  if (value === null || value === undefined) {
    return 'N/A'
  }

  // Handle boolean values
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }

  // Handle dates (ISO strings)
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)) {
    try {
      return new Date(value).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      // Fallback if date parsing fails
    }
  }

  // Handle numbers, especially if they look like report items (e.g., conversions, percentages)
  if (typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)) && key !== 'id')) {
    const numValue = Number(value)
    if (key.toLowerCase().includes('percentage') || key.toLowerCase().includes('rate')) {
      return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(numValue / 100)
    }
    if (key.toLowerCase().includes('amount') || key.toLowerCase().includes('cost')) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numValue)
    }
    return new Intl.NumberFormat('en-US').format(numValue)
  }

  // Generic string display
  return String(value)
}

interface EntityDetailModalProps {
  item: Record<string, unknown> | null
  open: boolean
  onClose: () => void
  title: string
}

export function EntityDetailModal({ item, open, onClose, title }: EntityDetailModalProps): JSX.Element {
  const { show: showToast } = useDemoToast()

  const getStatusVariant = (status: string): 'success' | 'warning' | 'info' | 'error' => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'ready_for_export':
      case 'exported':
        return 'success'
      case 'pending':
      case 'pending_review':
      case 'draft':
      case 'inactive':
        return 'info'
      case 'archived':
        return 'warning'
      case 'deleted':
        return 'error'
      default:
        return 'info'
    }
  }

  const handleAction = (action: string, variant: 'success' | 'warning' | 'error'): void => {
    showToast(`${title} ${item?.title || item?.name || item?.id || 'record'} ${action} successfully!`, variant)
    onClose()
  }

  if (!item) return <Modal open={open} onClose={onClose} title={title} />

  // Filter out internal/system fields and 'id'
  const displayEntries = Object.entries(item).filter(
    ([key]) =>
      key !== 'id' &&
      key !== 'clientId' &&
      key !== 'proofPackId' &&
      key !== 'userId' &&
      key !== '__typename' && // GraphQL specific
      key !== 'updatedAt' &&
      key !== 'createdAt',
  )

  return (
    <Modal open={open} onClose={onClose} title={title} className="max-w-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-zinc-900">{item.title || item.name || 'Details'}</h3>
        {item.status && (
          <Badge variant={getStatusVariant(item.status as string)} className="capitalize">
            {item.status as string}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        {displayEntries.map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="font-semibold text-zinc-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}:
            </span>
            <span className="text-zinc-600 break-words">{formatValue(key, value)}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="danger" onClick={() => handleAction('deleted', 'error')}>
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </Button>
        <Button variant="secondary" onClick={() => handleAction('archived', 'warning')}>
          <Archive className="w-4 h-4 mr-2" /> Archive
        </Button>
        <Button variant="primary" onClick={() => handleAction('approved', 'success')}>
          <ThumbsUp className="w-4 h-4 mr-2" /> Approve
        </Button>
      </div>
    </Modal>
  )
}

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  title: string
  message: string | React.ReactNode
  onConfirm: () => void
  confirmLabel?: string
  variant?: 'danger' | 'info'
}

export function ConfirmModal({
  open,
  onClose,
  title,
  message,
  onConfirm,
  confirmLabel = 'Confirm',
  variant = 'info',
}: ConfirmModalProps): JSX.Element {
  return (
    <Modal open={open} onClose={onClose} title={title} className="max-w-sm">
      <div className="text-center">
        {variant === 'danger' && <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />}
        {variant === 'info' && <Info className="mx-auto h-12 w-12 text-zinc-500 mb-4" />}
        <h3 className="text-lg font-bold text-zinc-900 mb-2">{title}</h3>
        <p className="text-zinc-600 text-sm mb-6">{message}</p>
        <div className="flex justify-center gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant={variant === 'danger' ? 'danger' : 'primary'} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

interface CommandPaletteItem {
  label: string
  href: string
  icon?: LucideIcon
  description?: string
}

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  items: CommandPaletteItem[]
}

export function CommandPalette({ open, onClose, items }: CommandPaletteProps): JSX.Element {
  const router = useRouter()
  const [search, setSearch] = useState<string>('')
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setSearch('')
      setSelectedIndex(0)
      inputRef.current?.focus()
    }
  }, [open])

  const filteredItems = React.useMemo(() => {
    if (!search) return items
    const lowercasedSearch = search.toLowerCase()
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(lowercasedSearch) ||
        item.description?.toLowerCase().includes(lowercasedSearch),
    )
  }, [items, search])

  useEffect(() => {
    if (selectedIndex >= filteredItems.length && filteredItems.length > 0) {
      setSelectedIndex(filteredItems.length - 1)
    } else if (filteredItems.length === 0) {
      setSelectedIndex(0)
    }
  }, [filteredItems, selectedIndex])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % filteredItems.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
          break
        case 'Enter':
          e.preventDefault()
          if (filteredItems[selectedIndex]) {
            router.push(filteredItems[selectedIndex].href)
            onClose()
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
        case 'k':
          if ((e.metaKey || e.ctrlKey) && !open) {
            e.preventDefault()
            // This case handles opening via Cmd+K, but the global listener for that usually
            // lives outside the CommandPalette itself. It's a UX convention.
            // Here, we ensure if it's already open, 'k' doesn't interfere.
          }
          break
      }
    },
    [open, filteredItems, selectedIndex, router, onClose],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current && filteredItems.length > 0) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [selectedIndex, filteredItems.length])

  return (
    <Modal open={open} onClose={onClose} title="Command Palette" className="max-w-xl p-0">
      <div className="flex items-center border-b border-zinc-200 p-4">
        <SearchIcon className="h-5 w-5 text-zinc-400 mr-2" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search commands or navigate..."
          className="flex-grow border-none focus:ring-0 p-0 text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search"
        />
      </div>

      {filteredItems.length === 0 ? (
        <div className="p-8 text-center text-zinc-500">No results found for &quot;{search}&quot;.</div>
      ) : (
        <div ref={listRef} className="max-h-80 overflow-y-auto py-2">
          {filteredItems.map((item, index) => {
            const Icon = item.icon
            const isSelected = index === selectedIndex
            return (
              <button
                key={item.href}
                className={cn(
                  'flex items-center w-full px-4 py-3 text-left hover:bg-zinc-100 cursor-pointer',
                  isSelected && 'bg-zinc-100',
                )}
                onClick={() => {
                  router.push(item.href)
                  onClose()
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {Icon && <Icon className="h-5 w-5 text-zinc-600 mr-3" />}
                <div className="flex-grow">
                  <div className="font-medium text-zinc-900">{item.label}</div>
                  {item.description && <div className="text-sm text-zinc-500">{item.description}</div>}
                </div>
              </button>
            )
          })}
        </div>
      )}

      <div className="p-3 border-t border-zinc-200 text-xs text-zinc-500 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          <span className="mr-2">to navigate</span>
          <Kbd>↵</Kbd>
          <span>to select</span>
        </div>
        <div className="flex items-center gap-2">
          <Kbd>esc</Kbd>
          <span>to close</span>
        </div>
      </div>
    </Modal>
  )
}