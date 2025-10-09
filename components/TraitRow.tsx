import React from 'react'
import { Trait } from '@/lib/schema'
import { formatScore } from '@/lib/format'

interface TraitRowProps {
  trait: Trait
  showDivider?: boolean
}

/**
 * TraitRow - Displays a single trait with icon, label, sublabel, and rating
 * Following exact visual specifications from the reference design
 */
export function TraitRow({ trait, showDivider = true }: TraitRowProps) {
  return (
    <div
      className={`flex items-center gap-3 py-[10px] ${
        showDivider ? 'border-b border-[#2A2B31]' : ''
      }`}
    >
      {/* Icon/Emoji */}
      <div className="flex-shrink-0 text-[22px] leading-none" role="img">
        {trait.icon}
      </div>
      
      {/* Label and Sublabel */}
      <div className="flex-1 min-w-0">
        <div className="text-[16px] font-semibold leading-tight text-[#F3F4F6]">
          {trait.label}
        </div>
        {trait.sublabel && (
          <div className="text-[13px] font-medium leading-tight text-[#9DA3AE] mt-0.5">
            {trait.sublabel}
          </div>
        )}
      </div>
      
      {/* Rating */}
      <div className="flex-shrink-0 text-[22px] font-extrabold text-white min-w-[48px] text-right tabular-nums">
        {formatScore(trait.rating)}
      </div>
    </div>
  )
}

