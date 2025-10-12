import React from 'react'
import { CardState } from '@/lib/schema'
import { getInitials } from '@/lib/format'

interface CardPreviewProps {
  state: CardState
  size?: 'phone' | 'thumbnail'
  className?: string
}

/**
 * Get progress bar color based on value
 */
const getProgressColor = (value: number): { bg: string; shadow: string } => {
  if (value >= 91) {
    // Excellent: Bright neon green
    return { bg: '#00FF84', shadow: '0 0 8px rgba(0, 255, 132, 0.5)' }
  } else if (value >= 71) {
    // Good: Regular green
    return { bg: '#10B981', shadow: '0 0 8px rgba(16, 185, 129, 0.5)' }
  } else if (value >= 41) {
    // Medium: Yellow
    return { bg: '#FBBF24', shadow: '0 0 8px rgba(251, 191, 36, 0.5)' }
  } else {
    // Low: Red
    return { bg: '#EF4444', shadow: '0 0 8px rgba(239, 68, 68, 0.5)' }
  }
}

/**
 * CardPreview - Sleek, futuristic analytics dashboard design
 */
export const CardPreview = React.forwardRef<HTMLDivElement, CardPreviewProps>(
  ({ state, size = 'phone', className = '' }, ref) => {
    const scale = size === 'thumbnail' ? 0.6 : 1
    
    // Split stats into two columns (3 each) with safety check
    const stats = state.stats || []
    const leftColumn = stats.slice(0, 3)
    const rightColumn = stats.slice(3, 6)
    
    return (
      <div
        ref={ref}
        className={`relative mx-auto px-2 sm:px-4 ${className}`}
        style={{
          maxWidth: size === 'phone' ? '600px' : '360px',
          transform: size === 'thumbnail' ? `scale(${scale})` : undefined,
          transformOrigin: 'top center',
          paddingTop: '40px',
          paddingBottom: '60px',
        }}
      >
        {/* Card Container */}
        <div
          className="relative w-full rounded-[20px] sm:rounded-[24px] shadow-2xl overflow-visible pt-10 sm:pt-12"
          style={{
            backgroundColor: '#0D0D0D',
            boxShadow: '0 0 60px rgba(0, 255, 132, 0.3), 0 0 100px rgba(0, 255, 132, 0.15), 0 8px 32px rgba(0, 0, 0, 0.8)',
          }}
        >
          {/* Profile Image - Overlapping Top Edge */}
          <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 z-10">
            {state.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={state.avatarUrl}
                alt="Profile"
                className="w-16 h-16 sm:w-20 md:w-24 sm:h-20 md:h-24 rounded-full object-cover"
                style={{
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                }}
              />
            ) : (
              <div 
                className="w-16 h-16 sm:w-20 md:w-24 sm:h-20 md:h-24 rounded-full flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-br from-gray-600 to-gray-800"
                style={{
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                }}
              >
                {getInitials('User')}
              </div>
            )}
          </div>
          
          {/* Card Body */}
          <div className="px-4 sm:px-8 md:px-12 pt-6 sm:pt-8 pb-6 sm:pb-8">
            {/* Two Column Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-8 md:gap-12">
              {/* Left Column */}
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                {leftColumn.map((stat) => {
                  const colors = getProgressColor(stat.value)
                  return (
                    <div key={stat.id} className="space-y-2 sm:space-y-3">
                      {/* Label */}
                      <div 
                        className="text-[10px] sm:text-xs md:text-sm font-medium tracking-wide"
                        style={{ color: '#B3B3B3' }}
                      >
                        {stat.label}
                      </div>
                      
                      {/* Value */}
                      <div 
                        className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
                        style={{ color: '#FFFFFF' }}
                      >
                        {stat.value}
                      </div>
                      
                      {/* Progress Bar */}
                      <div 
                        className="h-[5px] sm:h-[6px] rounded-full overflow-hidden"
                        style={{ backgroundColor: '#1E1E1E' }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${stat.value}%`,
                            backgroundColor: colors.bg,
                            boxShadow: colors.shadow,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Right Column */}
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                {rightColumn.map((stat) => {
                  const colors = getProgressColor(stat.value)
                  return (
                    <div key={stat.id} className="space-y-2 sm:space-y-3">
                      {/* Label */}
                      <div 
                        className="text-[10px] sm:text-xs md:text-sm font-medium tracking-wide"
                        style={{ color: '#B3B3B3' }}
                      >
                        {stat.label}
                      </div>
                      
                      {/* Value */}
                      <div 
                        className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
                        style={{ color: '#FFFFFF' }}
                      >
                        {stat.value}
                      </div>
                      
                      {/* Progress Bar */}
                      <div 
                        className="h-[5px] sm:h-[6px] rounded-full overflow-hidden"
                        style={{ backgroundColor: '#1E1E1E' }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${stat.value}%`,
                            backgroundColor: colors.bg,
                            boxShadow: colors.shadow,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          
          {/* Footer Brand */}
          <div className="pb-4 sm:pb-6 pt-3 sm:pt-4 flex items-center justify-center gap-1.5 sm:gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo.jpg" 
              alt="Logo" 
              className="w-5 h-5 sm:w-6 md:w-8 sm:h-6 md:h-8 rounded-sm object-cover"
            />
            <p 
              className="text-xs sm:text-sm md:text-base font-semibold"
              style={{ color: '#FFFFFF' }}
            >
              {state.brandText}
            </p>
          </div>
        </div>
      </div>
    )
  }
)

CardPreview.displayName = 'CardPreview'
