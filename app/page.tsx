'use client'

import React, { useRef } from 'react'
import { useEditorStore } from '@/lib/store'
import { CardPreview } from '@/components/CardPreview'
import { EditorPanel } from '@/components/EditorPanel'
import { ExportControls } from '@/components/ExportControls'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Home() {
  const {
    card,
    updateCard,
    resetCard,
  } = useEditorStore()

  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0C0F] to-[#08090A]">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-white truncate">FaceCard Editor</h1>
              <p className="text-xs md:text-sm text-gray-400 hidden sm:block">
                Create and customize your card
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 overflow-x-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={resetCard}
                className="whitespace-nowrap"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8 max-w-[1400px]">
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Editor Panel */}
          <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
            <Card className="p-6">
              <EditorPanel
                state={card}
                onUpdate={updateCard}
                onReset={resetCard}
                label="Card"
              />
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-4 md:space-y-6 order-1 lg:order-2 lg:sticky lg:top-8 lg:self-start">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">Preview</h3>
                </div>

                <div className="min-h-[600px] flex items-center justify-center p-4">
                  <div ref={cardRef}>
                    <CardPreview state={card} />
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Tips */}
            <Card className="p-6">
              <h4 className="font-semibold mb-3">Quick Tips</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Edit traits by adjusting ratings, labels, and emojis</li>
                <li>• Upload custom avatars with the crop tool</li>
                <li>• Click the download button to export your card</li>
                <li>• All changes are automatically saved to your browser</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-400">
          <p>FaceCard Editor • Built with Next.js, React, and Tailwind CSS</p>
        </div>
      </footer>

      {/* Floating Export Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <ExportControls cardRef={cardRef} />
      </div>
    </div>
  )
}
