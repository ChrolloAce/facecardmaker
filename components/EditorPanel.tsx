'use client'

import React from 'react'
import { CardState, Trait } from '@/lib/schema'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { AvatarPicker } from './AvatarPicker'
import { Trash2, GripVertical, Plus } from 'lucide-react'
import { clamp } from '@/lib/format'

interface EditorPanelProps {
  state: CardState
  onUpdate: (updates: Partial<CardState>) => void
  onReset: () => void
  onDuplicate?: () => void
  label: string
}

/**
 * EditorPanel - Form controls for editing card state
 */
export function EditorPanel({
  state,
  onUpdate,
  onReset,
  onDuplicate,
  label,
}: EditorPanelProps) {
  const updateTrait = (id: string, updates: Partial<Trait>) => {
    const updatedTraits = state.traits.map((trait) =>
      trait.id === id ? { ...trait, ...updates } : trait
    )
    onUpdate({ traits: updatedTraits })
  }

  const removeTrait = (id: string) => {
    const updatedTraits = state.traits.filter((trait) => trait.id !== id)
    onUpdate({ traits: updatedTraits })
  }

  const addTrait = () => {
    const newTrait: Trait = {
      id: Date.now().toString(),
      icon: '⭐',
      label: 'New Trait',
      sublabel: 'Description',
      rating: 5.0,
    }
    onUpdate({ traits: [...state.traits, newTrait] })
  }

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900 rounded-lg border">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{label} Editor</h3>
        <div className="flex gap-2">
          {onDuplicate && (
            <Button variant="outline" size="sm" onClick={onDuplicate}>
              Duplicate
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>

      {/* Basic Info */}
      <div className="space-y-4">
        <div>
          <Label>Headline Prefix</Label>
          <Input
            value={state.headlinePrefix}
            onChange={(e) => onUpdate({ headlinePrefix: e.target.value })}
            placeholder="You're a"
          />
        </div>

        <div>
          <Label>Score (0.0 - 10.0)</Label>
          <div className="flex gap-2">
            <Slider
              value={[state.score]}
              onValueChange={([value]) => onUpdate({ score: clamp(value, 0, 10) })}
              min={0}
              max={10}
              step={0.1}
              className="flex-1"
            />
            <Input
              type="number"
              value={state.score.toFixed(1)}
              onChange={(e) =>
                onUpdate({ score: clamp(parseFloat(e.target.value) || 0, 0, 10) })
              }
              step={0.1}
              min={0}
              max={10}
              className="w-20"
            />
          </div>
        </div>

        <div>
          <Label>Percentile Text</Label>
          <Input
            value={state.percentileText}
            onChange={(e) => onUpdate({ percentileText: e.target.value })}
            placeholder="Top 92% of men"
          />
        </div>

        <AvatarPicker
          currentUrl={state.avatarUrl}
          onUrlChange={(url) => onUpdate({ avatarUrl: url })}
        />

        <div>
          <Label>Brand Text</Label>
          <Input
            value={state.brandText}
            onChange={(e) => onUpdate({ brandText: e.target.value })}
            placeholder="facecard.ai"
          />
        </div>

        <div>
          <Label>Hint Text</Label>
          <Input
            value={state.hintText}
            onChange={(e) => onUpdate({ hintText: e.target.value })}
            placeholder="Swipe for detailed analysis →"
          />
        </div>

        <div>
          <Label>CTA Button Label</Label>
          <Input
            value={state.ctaLabel}
            onChange={(e) => onUpdate({ ctaLabel: e.target.value })}
            placeholder="Share Result"
          />
        </div>
      </div>

      {/* Traits Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Traits</Label>
          <Button variant="outline" size="sm" onClick={addTrait}>
            <Plus className="w-4 h-4 mr-1" />
            Add Trait
          </Button>
        </div>

        <div className="space-y-3">
          {state.traits.map((trait) => (
            <div
              key={trait.id}
              className="p-4 border rounded-lg space-y-3 bg-gray-50 dark:bg-gray-800"
            >
              <div className="flex items-start gap-2">
                <div className="cursor-move pt-2">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Icon/Emoji</Label>
                      <Input
                        value={trait.icon}
                        onChange={(e) => updateTrait(trait.id, { icon: e.target.value })}
                        placeholder="✨"
                        className="text-center"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Label</Label>
                      <Input
                        value={trait.label}
                        onChange={(e) => updateTrait(trait.id, { label: e.target.value })}
                        placeholder="Skin"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs">Sublabel</Label>
                    <Input
                      value={trait.sublabel || ''}
                      onChange={(e) =>
                        updateTrait(trait.id, { sublabel: e.target.value })
                      }
                      placeholder="Excellent Texture"
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Rating (0.0 - 10.0)</Label>
                    <div className="flex gap-2">
                      <Slider
                        value={[trait.rating]}
                        onValueChange={([value]) =>
                          updateTrait(trait.id, { rating: clamp(value, 0, 10) })
                        }
                        min={0}
                        max={10}
                        step={0.1}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={trait.rating.toFixed(1)}
                        onChange={(e) =>
                          updateTrait(trait.id, {
                            rating: clamp(parseFloat(e.target.value) || 0, 0, 10),
                          })
                        }
                        step={0.1}
                        min={0}
                        max={10}
                        className="w-20"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTrait(trait.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

