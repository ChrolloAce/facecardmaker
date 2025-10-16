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
        className={`relative mx-auto ${className}`}
        style={{
          width: '600px',
          maxWidth: '100%',
          transform: size === 'thumbnail' ? `scale(${scale})` : undefined,
          transformOrigin: 'top center',
        }}
      >
        <div
          ref={ref}
          style={{
            padding: '120px',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '640px',
            minHeight: '640px',
          }}
        >
        {/* Card Container */}
        <div
          style={{
            position: 'relative',
            width: '420px',
            margin: '0 auto',
            backgroundColor: '#0D0D0D',
            borderRadius: '20px',
            paddingTop: '48px',
            overflow: 'visible',
            boxShadow: '0 0 50px rgba(0, 255, 132, 0.5), 0 0 100px rgba(0, 255, 132, 0.25), 0 10px 40px rgba(0, 0, 0, 0.9)',
          }}
        >
          {/* Profile Image - Overlapping Top Edge */}
          <div 
            style={{
              position: 'absolute',
              top: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
            }}
          >
            {state.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={state.avatarUrl}
                src={state.avatarUrl}
                alt="Profile"
                loading="eager"
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                  display: 'block',
                }}
              />
            ) : (
              <div 
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  background: 'linear-gradient(to bottom right, #4B5563, #1F2937)',
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                }}
              >
                {getInitials('User')}
              </div>
            )}
          </div>
          
          {/* Card Body */}
          <div style={{ padding: '28px 36px' }}>
            {/* Two Column Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px' }}>
              {/* Left Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {leftColumn.map((stat) => {
                  const colors = getProgressColor(stat.value)
                  return (
                    <div key={stat.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {/* Label */}
                      <div 
                        style={{ 
                          color: '#B3B3B3',
                          fontSize: '13px',
                          fontWeight: '500',
                          letterSpacing: '0.025em',
                        }}
                      >
                        {stat.label}
                      </div>
                      
                      {/* Value */}
                      <div 
                        style={{ 
                          color: '#FFFFFF',
                          fontSize: '32px',
                          fontWeight: 'bold',
                          letterSpacing: '-0.025em',
                          lineHeight: '1',
                        }}
                      >
                        {stat.value}
                      </div>
                      
                      {/* Progress Bar */}
                      <div 
                        style={{ 
                          backgroundColor: '#1E1E1E',
                          height: '6px',
                          borderRadius: '9999px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${stat.value}%`,
                            backgroundColor: colors.bg,
                            boxShadow: colors.shadow,
                            borderRadius: '9999px',
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Right Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {rightColumn.map((stat) => {
                  const colors = getProgressColor(stat.value)
                  return (
                    <div key={stat.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {/* Label */}
                      <div 
                        style={{ 
                          color: '#B3B3B3',
                          fontSize: '13px',
                          fontWeight: '500',
                          letterSpacing: '0.025em',
                        }}
                      >
                        {stat.label}
                      </div>
                      
                      {/* Value */}
                      <div 
                        style={{ 
                          color: '#FFFFFF',
                          fontSize: '32px',
                          fontWeight: 'bold',
                          letterSpacing: '-0.025em',
                          lineHeight: '1',
                        }}
                      >
                        {stat.value}
                      </div>
                      
                      {/* Progress Bar */}
                      <div 
                        style={{ 
                          backgroundColor: '#1E1E1E',
                          height: '6px',
                          borderRadius: '9999px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${stat.value}%`,
                            backgroundColor: colors.bg,
                            boxShadow: colors.shadow,
                            borderRadius: '9999px',
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
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '20px',
              paddingTop: '14px',
              gap: '6px',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo.jpg" 
              alt="Logo"
              loading="eager"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '4px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <p 
              style={{ 
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: '600',
                margin: '0',
              }}
            >
              {state.brandText}
            </p>
          </div>
        </div>
        </div>
      </div>
    )
  }
)

CardPreview.displayName = 'CardPreview'
