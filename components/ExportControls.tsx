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
      if (!cardRef.current) return
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
      className="rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110"
      style={{
        background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
        boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)',
      }}
    >
      <Download className="w-5 h-5 mr-2" />
      <span className="font-semibold">Download</span>
    </Button>
  )
}
