'use client'

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  Loader2,
  ArrowUp,
  ArrowDown,
  X,
  type LucideIcon,
  Plus,
  ClipboardList,
  FolderOpen,
  AlertTriangle,
  FileText,
  Package,
} from 'lucide-react'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  href?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className,
  href,
  ...props
}: ButtonProps): React.JSX.Element {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400 disabled:opacity-50 disabled:pointer-events-none'

  const variantClasses = {
    primary: 'bg-zinc-900 text-white hover:bg-zinc-700',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200',
    outline: 'border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50',
    ghost: 'hover:bg-zinc-100 text-zinc-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-9 px-4 text-sm',
    lg: 'h-10 px-5 text-base',
  }

  const content = (
    <>
      {loading && <Spinner className="mr-2 h-4 w-4" />}
      {children}
    </>
  )

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    loading && 'pointer-events-none',
    className,
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  )
}

export function Card({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <div
      className={cn(
        'bg-white border border-zinc-200 rounded-xl shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}): React.JSX.Element {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)}>{children}</div>
}

export function CardTitle({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <h3
      className={cn(
        'font-bold text-zinc-900 tracking-tight text-lg',
        className,
      )}
    >
      {children}
    </h3>
  )
}

export function CardContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}): React.JSX.Element {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>
}

export function Badge({
  children,
  variant = 'default',
}: {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple'
}): React.JSX.Element {
  const variantClasses = {
    default: 'bg-zinc-100 text-zinc-800',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    error: 'bg-red-50 text-red-700 border border-red-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        variantClasses[variant],
      )}
    >
      {children}
    </span>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export function Input({
  label,
  error,
  icon,
  className,
  id,
  type = 'text',
  ...props
}: InputProps): React.JSX.Element {
  const inputId = id || React.useId()
  return (
    <div className={cn('flex flex-col space-y-1', className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-zinc-400 sm:text-sm">{icon}</span>
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            icon && 'pl-10',
            error && 'border-red-500 focus:ring-red-400',
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

export function Spinner({ className }: { className?: string }): React.JSX.Element {
  return (
    <Loader2
      className={cn('h-5 w-5 animate-spin text-zinc-500', className)}
      aria-hidden="true"
    />
  )
}

export function Avatar({
  name,
  size = 'md',
  className,
}: {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}): React.JSX.Element {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-indigo-500',
  ]
  const bgColor =
    colors[name.charCodeAt(0) % colors.length] || 'bg-zinc-500' // Fallback

  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  }

  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center rounded-full text-white font-medium',
        bgColor,
        sizeClasses[size],
        className,
      )}
    >
      {initials}
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  change?: string
  changeType?: 'up' | 'down' | 'neutral'
  icon?: React.ReactNode
  sparkline?: number[]
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  sparkline,
}: StatCardProps): React.JSX.Element {
  const changeClasses = {
    up: 'text-emerald-600',
    down: 'text-red-500',
    neutral: 'text-zinc-500',
  }

  const SparklineSVG = () => {
    if (!sparkline || sparkline.length < 2) return null

    const width = 40
    const height = 20
    const minVal = Math.min(...sparkline)
    const maxVal = Math.max(...sparkline)

    if (minVal === maxVal) { // Handle flat line
      const y = height / 2
      const points = sparkline.map((_, i) => `${(i / (sparkline.length - 1)) * width},${y}`).join(' ')
      return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <polyline
            fill="none"
            stroke="#6366f1" // A default color
            strokeWidth="1.5"
            strokeLinecap="round"
            points={points}
          />
        </svg>
      )
    }

    const points = sparkline
      .map((val, i) => {
        const x = (i / (sparkline.length - 1)) * width
        const y = height - ((val - minVal) / (maxVal - minVal)) * height
        return `${x},${y}`
      })
      .join(' ')

    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <polyline
          fill="none"
          stroke="#6366f1"
          strokeWidth="1.5"
          strokeLinecap="round"
          points={points}
        />
      </svg>
    )
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-zinc-500">{title}</h4>
        {icon && <div className="text-zinc-400">{icon}</div>}
      </div>
      <div className="flex items-end justify-between mt-2">
        <div className="text-3xl font-bold text-zinc-900">{value}</div>
        {sparkline && <SparklineSVG />}
      </div>
      {change && (
        <div className={cn('flex items-center mt-1 text-sm', changeClasses[changeType])}>
          {changeType === 'up' && <ArrowUp className="h-4 w-4 mr-1" />}
          {changeType === 'down' && <ArrowDown className="h-4 w-4 mr-1" />}
          <span>{change}</span>
        </div>
      )}
    </Card>
  )
}

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps): React.JSX.Element | null {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape)
    } else {
      document.removeEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open, handleEscape])

  if (!open) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fadein">
      <div
        ref={modalRef}
        className={cn(
          'bg-white rounded-2xl shadow-xl animate-slideup w-full',
          sizeClasses[size],
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-200">
          <h3 id="modal-title" className="text-lg font-semibold text-zinc-900">
            {title}
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5 text-zinc-500" />
          </Button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white border border-dashed border-zinc-200 rounded-xl shadow-sm">
      {Icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500">
          <Icon className="h-8 w-8" />
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold text-zinc-900">{title}</h3>
      <p className="mb-4 text-sm text-zinc-600 max-w-sm">{description}</p>
      {action && <div>{action}</div>}
    </div>
  )
}

interface TableColumn<T> {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
}

interface TableProps<T> {
  columns: Array<TableColumn<T>>
  data: T[]
  onRowClick?: (row: T) => void
}

export function Table<T extends { id: string | number }>({
  columns,
  data,
  onRowClick,
}: TableProps<T>): React.JSX.Element {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm">
      <table className="min-w-full divide-y divide-zinc-200 bg-white">
        <thead className="bg-zinc-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-zinc-500 text-sm">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={cn(
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-zinc-50',
                  onRowClick && 'cursor-pointer hover:bg-zinc-100',
                )}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={`${String(column.key)}-${row.id}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600"
                  >
                    {column.render
                      ? column.render(row)
                      : typeof column.key === 'string'
                        ? (row[column.key as keyof T] as React.ReactNode)
                        : null}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}