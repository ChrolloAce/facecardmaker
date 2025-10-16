'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { exportCardAsPNG } from '@/lib/export'

interface ExportControlsProps {
  cardRef: React.RefObject<HTMLDivElement | null>
}

/**
 * ExportControls - Download button for exporting the card
 */
export function ExportControls({ cardRef }: ExportControlsProps) {
  const handleExport = async () => {
    try {
      if (!cardRef.current) {
        console.error('Card ref not found')
        alert('Card element not found. Please refresh the page.')
        return
      }
      
      // Debug: Check what images are in the element
      const images = cardRef.current.querySelectorAll('img')
      console.log('=== PRE-EXPORT DEBUG ===')
      console.log('Found images to export:', images.length)
      
      images.forEach((img, i) => {
        const isDataUrl = img.src.startsWith('data:')
        console.log(`Image ${i} (${isDataUrl ? 'DATA URL' : 'REGULAR'}):`, {
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          hasAlt: img.alt,
          srcPreview: isDataUrl ? 'data:image/...' : img.src,
          displayStyle: window.getComputedStyle(img).display,
          visibility: window.getComputedStyle(img).visibility,
        })
      })
      
      // Check if avatar image exists
      const avatarImage = images[0] // Should be the first image
      if (avatarImage && avatarImage.src.startsWith('data:')) {
        console.log('✅ Avatar data URL found, size:', avatarImage.naturalWidth, 'x', avatarImage.naturalHeight)
      } else if (avatarImage) {
        console.log('Avatar found but might not be loaded:', avatarImage.src.substring(0, 60))
      } else {
        console.warn('⚠️ No avatar image found')
      }
      
      await exportCardAsPNG(cardRef.current, 'facecard.png')
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export. Please try again.')
    }
  }

  return (
    <Button 
      onClick={handleExport} 
      size="lg"
      className="rounded-full shadow-2xl transition-all duration-300 hover:scale-110 text-black font-bold"
      style={{
        background: 'linear-gradient(135deg, #00FF84 0%, #00D96F 100%)',
        boxShadow: '0 8px 32px rgba(0, 255, 132, 0.5), 0 0 20px rgba(0, 255, 132, 0.3)',
      }}
    >
      <Download className="w-5 h-5 mr-2" />
      <span className="font-semibold">Download</span>
    </Button>
  )
}
