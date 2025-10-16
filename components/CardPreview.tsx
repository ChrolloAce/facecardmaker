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
        className={`relative mx-auto ${className}`}
        style={{
          width: '600px',
          maxWidth: '100%',
          transform: size === 'thumbnail' ? `scale(${scale})` : undefined,
          transformOrigin: 'top center',
          padding: '80px 60px',
        }}
      >
        {/* Card Container */}
        <div
          className="relative rounded-[24px] shadow-2xl overflow-visible pt-12"
          style={{
            width: '480px',
            maxWidth: '100%',
            margin: '0 auto',
            backgroundColor: '#0D0D0D',
            boxShadow: '0 0 60px rgba(0, 255, 132, 0.3), 0 0 100px rgba(0, 255, 132, 0.15), 0 8px 32px rgba(0, 0, 0, 0.8)',
          }}
        >
          {/* Profile Image - Overlapping Top Edge */}
          <div 
            className="absolute z-10"
            style={{
              top: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            {state.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={state.avatarUrl}
                alt="Profile"
                crossOrigin="anonymous"
                className="rounded-full object-cover"
                style={{
                  width: '96px',
                  height: '96px',
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                }}
              />
            ) : (
              <div 
                className="rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br from-gray-600 to-gray-800"
                style={{
                  width: '96px',
                  height: '96px',
                  fontSize: '32px',
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                }}
              >
                {getInitials('User')}
              </div>
            )}
          </div>
          
          {/* Card Body */}
          <div style={{ padding: '32px 48px' }}>
            {/* Two Column Grid */}
            <div className="grid grid-cols-2" style={{ gap: '48px' }}>
              {/* Left Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {leftColumn.map((stat) => {
                  const colors = getProgressColor(stat.value)
                  return (
                    <div key={stat.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {/* Label */}
                      <div 
                        className="font-medium tracking-wide"
                        style={{ 
                          color: '#B3B3B3',
                          fontSize: '14px',
                        }}
                      >
                        {stat.label}
                      </div>
                      
                      {/* Value */}
                      <div 
                        className="font-bold tracking-tight"
                        style={{ 
                          color: '#FFFFFF',
                          fontSize: '36px',
                        }}
                      >
                        {stat.value}
                      </div>
                      
                      {/* Progress Bar */}
                      <div 
                        className="rounded-full overflow-hidden"
                        style={{ 
                          backgroundColor: '#1E1E1E',
                          height: '6px',
                        }}
                      >
                        <div
                          className="h-full rounded-full"
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {rightColumn.map((stat) => {
                  const colors = getProgressColor(stat.value)
                  return (
                    <div key={stat.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {/* Label */}
                      <div 
                        className="font-medium tracking-wide"
                        style={{ 
                          color: '#B3B3B3',
                          fontSize: '14px',
                        }}
                      >
                        {stat.label}
                      </div>
                      
                      {/* Value */}
                      <div 
                        className="font-bold tracking-tight"
                        style={{ 
                          color: '#FFFFFF',
                          fontSize: '36px',
                        }}
                      >
                        {stat.value}
                      </div>
                      
                      {/* Progress Bar */}
                      <div 
                        className="rounded-full overflow-hidden"
                        style={{ 
                          backgroundColor: '#1E1E1E',
                          height: '6px',
                        }}
                      >
                        <div
                          className="h-full rounded-full"
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
          <div 
            className="flex items-center justify-center"
            style={{
              paddingBottom: '24px',
              paddingTop: '16px',
              gap: '8px',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo.jpg" 
              alt="Logo" 
              crossOrigin="anonymous"
              className="rounded-sm object-cover"
              style={{
                width: '32px',
                height: '32px',
              }}
            />
            <p 
              className="font-semibold"
              style={{ 
                color: '#FFFFFF',
                fontSize: '16px',
              }}
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
