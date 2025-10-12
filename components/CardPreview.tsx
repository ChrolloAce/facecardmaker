import React from 'react'
import { CardState } from '@/lib/schema'
import { getInitials } from '@/lib/format'

interface CardPreviewProps {
  state: CardState
  size?: 'phone' | 'thumbnail'
  className?: string
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
          maxWidth: size === 'phone' ? '500px' : '300px',
          transform: size === 'thumbnail' ? `scale(${scale})` : undefined,
          transformOrigin: 'top center',
          paddingTop: '60px', // Add padding to capture overlapping profile image
        }}
      >
        {/* Card Container */}
        <div
          className="relative w-full rounded-[24px] shadow-2xl overflow-visible pt-12"
          style={{
            backgroundColor: '#0D0D0D',
            boxShadow: '0 0 80px rgba(0, 255, 132, 0.3), 0 0 120px rgba(0, 255, 132, 0.15), 0 8px 32px rgba(0, 0, 0, 0.8)',
          }}
        >
          {/* Profile Image - Overlapping Top Edge */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
            {state.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={state.avatarUrl}
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                style={{
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                }}
              />
            ) : (
              <div 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold bg-gradient-to-br from-gray-600 to-gray-800"
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
          <div className="px-6 sm:px-8 pt-8 pb-6">
            {/* Two Column Grid */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {/* Left Column */}
              <div className="space-y-4 sm:space-y-5">
                {leftColumn.map((stat) => (
                  <div key={stat.id} className="space-y-2">
                    {/* Label */}
                    <div 
                      className="text-xs sm:text-sm font-medium tracking-wide"
                      style={{ color: '#B3B3B3' }}
                    >
                      {stat.label}
                    </div>
                    
                    {/* Value */}
                    <div 
                      className="text-2xl sm:text-3xl font-bold tracking-tight"
                      style={{ color: '#FFFFFF' }}
                    >
                      {stat.value}
                    </div>
                    
                    {/* Progress Bar */}
                    <div 
                      className="h-[6px] rounded-full overflow-hidden"
                      style={{ backgroundColor: '#1E1E1E' }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${stat.value}%`,
                          backgroundColor: '#00FF84',
                          boxShadow: '0 0 8px rgba(0, 255, 132, 0.5)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Right Column */}
              <div className="space-y-4 sm:space-y-5">
                {rightColumn.map((stat) => (
                  <div key={stat.id} className="space-y-2">
                    {/* Label */}
                    <div 
                      className="text-xs sm:text-sm font-medium tracking-wide"
                      style={{ color: '#B3B3B3' }}
                    >
                      {stat.label}
                    </div>
                    
                    {/* Value */}
                    <div 
                      className="text-2xl sm:text-3xl font-bold tracking-tight"
                      style={{ color: '#FFFFFF' }}
                    >
                      {stat.value}
                    </div>
                    
                    {/* Progress Bar */}
                    <div 
                      className="h-[6px] rounded-full overflow-hidden"
                      style={{ backgroundColor: '#1E1E1E' }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${stat.value}%`,
                          backgroundColor: '#00FF84',
                          boxShadow: '0 0 8px rgba(0, 255, 132, 0.5)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer Brand */}
          <div className="pb-4 text-center">
            <p 
              className="text-xs sm:text-sm font-medium opacity-50"
              style={{ color: '#B3B3B3' }}
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
