import React from 'react'
import { CardState } from '@/lib/schema'
import { formatScore, getInitials } from '@/lib/format'
import { TraitRow } from './TraitRow'

interface CardPreviewProps {
  state: CardState
  size?: 'phone' | 'thumbnail'
  className?: string
}

/**
 * CardPreview - Renders the face card with pixel-accurate styling
 * Matches the reference design exactly
 */
export const CardPreview = React.forwardRef<HTMLDivElement, CardPreviewProps>(
  ({ state, size = 'phone', className = '' }, ref) => {
    const scale = size === 'thumbnail' ? 0.6 : 1
    
    return (
      <div
        ref={ref}
        className={`relative mx-auto ${className}`}
        style={{
          maxWidth: size === 'phone' ? '500px' : '300px',
          transform: size === 'thumbnail' ? `scale(${scale})` : undefined,
          transformOrigin: 'top center',
        }}
      >
        {/* Card Container */}
        <div
          className="relative w-full rounded-[28px] border border-[#2A2B31] shadow-2xl overflow-hidden"
          style={{
            backgroundColor: '#1B1C1F',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 60px rgba(255, 255, 255, 0.02)',
          }}
        >
          {/* Inner Content */}
          <div className="px-6 pt-6 pb-[18px]">
            {/* Header Row */}
            <div className="flex items-start justify-between gap-4 mb-4">
              {/* Title Block */}
              <div className="flex-1 min-w-0">
                <h1 className="text-[28px] font-bold leading-tight text-white tracking-[-0.3px] mb-0.5">
                  {state.headlinePrefix} {formatScore(state.score)}
                </h1>
                <p className="text-[14px] font-medium text-[#A8ABB3]">
                  {state.percentileText}
                </p>
              </div>
              
              {/* Avatar */}
              <div className="flex-shrink-0">
                {state.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={state.avatarUrl}
                    alt="Avatar"
                    className="w-16 h-16 rounded-full ring-2 ring-white/20 shadow-md object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full ring-2 ring-white/20 shadow-md flex items-center justify-center text-white text-lg font-bold bg-gradient-to-br from-purple-600 to-blue-600">
                    {getInitials(state.percentileText)}
                  </div>
                )}
              </div>
            </div>
            
            {/* Divider */}
            <div className="h-px bg-[#2A2B31] my-4" />
            
            {/* Section Title */}
            <h2 className="text-[18px] font-bold text-[#E7E9EE] mb-2 mt-1">
              Your Traits
            </h2>
            
            {/* Traits List */}
            <div className="space-y-0">
              {state.traits.map((trait, index) => (
                <TraitRow
                  key={trait.id}
                  trait={trait}
                  showDivider={index < state.traits.length - 1}
                />
              ))}
            </div>
            
            {/* Footer Hint */}
            <div className="mt-6 mb-3 text-center">
              <p className="text-[13px] text-[#9DA3AE]">{state.hintText}</p>
            </div>
            
            {/* Brand Label */}
            <div className="text-center">
              <p className="text-[14px] text-[#8A8F99]">{state.brandText}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

CardPreview.displayName = 'CardPreview'

