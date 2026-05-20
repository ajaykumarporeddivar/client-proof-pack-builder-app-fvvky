'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface BarChartProps {
  labels: string[]
  data: number[]
  title?: string
  subtitle?: string
}

export function BarChart({ labels, data, title, subtitle }: BarChartProps): JSX.Element {
  const maxDataValue = Math.max(...data)
  const chartHeight = 150 // fixed height for bars container

  return (
    <div className="flex flex-col h-full p-4">
      {title && <h3 className="text-lg font-bold text-zinc-900 tracking-tight mb-1">{title}</h3>}
      {subtitle && <p className="text-zinc-600 text-sm mb-4">{subtitle}</p>}
      <div className="flex-1 flex items-end gap-1.5 h-full relative" style={{ height: chartHeight }}>
        {data.map((value, index) => (
          <div
            key={labels[index]}
            className="flex flex-col items-center justify-end w-full relative group"
            style={{ flexBasis: `calc(100% / ${data.length})` }}
          >
            <div
              className="w-4 bg-zinc-700 rounded-sm transition-all duration-200 hover:bg-zinc-600"
              style={{ height: `${(value / maxDataValue) * chartHeight}px` }}
            ></div>
            <span className="absolute bottom-full mb-1 text-xs text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">
              {value}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        {labels.map((label, index) => (
          <span key={index} className="text-xs text-zinc-400" style={{ flexBasis: `calc(100% / ${data.length})`, textAlign: 'center' }}>
            {label.slice(0, 3)}
          </span>
        ))}
      </div>
    </div>
  )
}

interface SparklineProps {
  data: number[]
  color?: string
  width?: string
  height?: string
}

export function Sparkline({ data, color = 'bg-emerald-500', width = 'w-24', height = 'h-8' }: SparklineProps): JSX.Element {
  if (data.length < 2) {
    return <div className={cn(width, height, 'flex items-center justify-center text-zinc-400 text-xs')}>N/A</div>
  }

  const normalizedData = data.map((value, i, arr) => {
    const min = Math.min(...arr)
    const max = Math.max(...arr)
    return (value - min) / (max - min)
  })

  return (
    <div className={cn('relative overflow-hidden', width, height)}>
      <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          className={cn('text-emerald-500')}
          points={normalizedData
            .map((val, i) => `${(i / (data.length - 1)) * 100},${100 - val * 100}`)
            .join(' ')}
        />
      </svg>
    </div>
  )
}