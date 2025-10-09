'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Download, Image as ImageIcon, FileImage } from 'lucide-react'
import { exportCardAsPNG, exportCardAsSVG, export2UpComparison } from '@/lib/export'

interface ExportControlsProps {
  beforeCardRef: React.RefObject<HTMLDivElement | null>
  afterCardRef: React.RefObject<HTMLDivElement | null>
  currentMode: 'before' | 'after' | 'compare-side' | 'compare-slider'
}

/**
 * ExportControls - Buttons to export cards in various formats
 */
export function ExportControls({
  beforeCardRef,
  afterCardRef,
  currentMode,
}: ExportControlsProps) {
  const handleExportPNG = async () => {
    const ref = currentMode === 'before' ? beforeCardRef : afterCardRef
    if (!ref.current) return

    try {
      await exportCardAsPNG(ref.current, `facecard-${currentMode}.png`)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export image. Please try again.')
    }
  }

  const handleExportSVG = async () => {
    const ref = currentMode === 'before' ? beforeCardRef : afterCardRef
    if (!ref.current) return

    try {
      await exportCardAsSVG(ref.current, `facecard-${currentMode}.svg`)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export image. Please try again.')
    }
  }

  const handleExport2Up = async () => {
    if (!beforeCardRef.current || !afterCardRef.current) return

    try {
      await export2UpComparison(
        beforeCardRef.current,
        afterCardRef.current,
        'facecard-comparison.png'
      )
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export comparison. Please try again.')
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={handleExportPNG} variant="default" size="sm">
        <Download className="w-4 h-4 sm:mr-2" />
        <span className="hidden sm:inline">Export PNG</span>
      </Button>
      
      <Button onClick={handleExportSVG} variant="outline" size="sm">
        <FileImage className="w-4 h-4 sm:mr-2" />
        <span className="hidden sm:inline">SVG</span>
      </Button>
      
      <Button onClick={handleExport2Up} variant="outline" size="sm" className="whitespace-nowrap">
        <ImageIcon className="w-4 h-4 sm:mr-2" />
        <span className="hidden sm:inline">2-Up</span>
      </Button>
    </div>
  )
}

