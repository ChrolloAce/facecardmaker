'use client'

import React, { useRef } from 'react'
import { useEditorStore } from '@/lib/store'
import { CardPreview } from '@/components/CardPreview'
import { CompareSlider } from '@/components/CompareSlider'
import { EditorPanel } from '@/components/EditorPanel'
import { ExportControls } from '@/components/ExportControls'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Home() {
  const {
    mode,
    before,
    after,
    setMode,
    updateBefore,
    updateAfter,
    resetBefore,
    resetAfter,
    duplicateBeforeToAfter,
    duplicateAfterToBefore,
  } = useEditorStore()

  const beforeCardRef = useRef<HTMLDivElement>(null)
  const afterCardRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0C0F] to-[#08090A]">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">FaceCard Editor</h1>
              <p className="text-sm text-gray-400">
                Create and customize before/after comparison cards
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ExportControls
                beforeCardRef={beforeCardRef}
                afterCardRef={afterCardRef}
                currentMode={mode === 'compare-side' || mode === 'compare-slider' ? 'after' : mode}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <Card className="p-6">
              <Tabs defaultValue="after" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="before">Before</TabsTrigger>
                  <TabsTrigger value="after">After</TabsTrigger>
                </TabsList>

                <TabsContent value="before">
                  <EditorPanel
                    state={before}
                    onUpdate={updateBefore}
                    onReset={resetBefore}
                    onDuplicate={duplicateBeforeToAfter}
                    label="Before"
                  />
                </TabsContent>

                <TabsContent value="after">
                  <EditorPanel
                    state={after}
                    onUpdate={updateAfter}
                    onReset={resetAfter}
                    onDuplicate={duplicateAfterToBefore}
                    label="After"
                  />
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Preview</h3>
                  <div className="flex gap-2">
                    <Button
                      variant={mode === 'before' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMode('before')}
                    >
                      Before
                    </Button>
                    <Button
                      variant={mode === 'after' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMode('after')}
                    >
                      After
                    </Button>
                    <Button
                      variant={mode === 'compare-side' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMode('compare-side')}
                    >
                      Side-by-Side
                    </Button>
                    <Button
                      variant={mode === 'compare-slider' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMode('compare-slider')}
                    >
                      Slider
                    </Button>
                  </div>
                </div>

                <div className="min-h-[600px] flex items-center justify-center p-4">
                  {mode === 'before' && (
                    <div ref={beforeCardRef}>
                      <CardPreview state={before} />
                    </div>
                  )}

                  {mode === 'after' && (
                    <div ref={afterCardRef}>
                      <CardPreview state={after} />
                    </div>
                  )}

                  {mode === 'compare-side' && (
                    <div className="grid md:grid-cols-2 gap-6 w-full">
                      <div>
                        <div className="mb-3 text-center">
                          <span className="inline-block px-3 py-1 bg-gray-800 text-white text-sm font-semibold rounded-full">
                            Before
                          </span>
                        </div>
                        <div ref={beforeCardRef}>
                          <CardPreview state={before} size="thumbnail" />
                        </div>
                      </div>
                      <div>
                        <div className="mb-3 text-center">
                          <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full">
                            After
                          </span>
                        </div>
                        <div ref={afterCardRef}>
                          <CardPreview state={after} size="thumbnail" />
                        </div>
                      </div>
                    </div>
                  )}

                  {mode === 'compare-slider' && (
                    <div className="w-full">
                      <div className="hidden">
                        <div ref={beforeCardRef}>
                          <CardPreview state={before} />
                        </div>
                        <div ref={afterCardRef}>
                          <CardPreview state={after} />
                        </div>
                      </div>
                      <CompareSlider beforeState={before} afterState={after} />
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Quick Tips */}
            <Card className="p-6">
              <h4 className="font-semibold mb-3">Quick Tips</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Edit traits by adjusting ratings, labels, and emojis</li>
                <li>• Upload custom avatars with the crop tool</li>
                <li>• Use &quot;Duplicate&quot; to copy settings between Before/After</li>
                <li>• Export single cards or side-by-side comparisons</li>
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
    </div>
  )
}
