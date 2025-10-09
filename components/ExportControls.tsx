'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { exportCardAsPNG, export2UpComparison } from '@/lib/export'

interface ExportControlsProps {
  beforeCardRef: React.RefObject<HTMLDivElement | null>
  afterCardRef: React.RefObject<HTMLDivElement | null>
  currentMode: 'before' | 'after' | 'compare-side'
}

/**
 * ExportControls - Smart export button that adapts to current view mode
 */
export function ExportControls({
  beforeCardRef,
  afterCardRef,
  currentMode,
}: ExportControlsProps) {
  const handleExport = async () => {
    try {
      if (currentMode === 'compare-side') {
        // Export side-by-side comparison
        if (!beforeCardRef.current || !afterCardRef.current) return
        await export2UpComparison(
          beforeCardRef.current,
          afterCardRef.current,
          'facecard-comparison.png'
        )
      } else {
        // Export single card (before or after)
        const ref = currentMode === 'before' ? beforeCardRef : afterCardRef
        if (!ref.current) return
        await exportCardAsPNG(ref.current, `facecard-${currentMode}.png`)
      }
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export. Please try again.')
    }
  }

  // Dynamic button label based on mode
  const getButtonLabel = () => {
    switch (currentMode) {
      case 'before':
        return 'Export Before'
      case 'after':
        return 'Export After'
      case 'compare-side':
        return 'Export Comparison'
      default:
        return 'Export'
    }
  }

  return (
    <Button onClick={handleExport} variant="default" size="sm">
      <Download className="w-4 h-4 sm:mr-2" />
      <span className="hidden sm:inline">{getButtonLabel()}</span>
    </Button>
  )
}
