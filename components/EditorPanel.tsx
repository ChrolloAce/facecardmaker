'use client'

import React from 'react'
import { CardState, Stat } from '@/lib/schema'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { AvatarPicker } from './AvatarPicker'
import { Trash2, GripVertical, Plus } from 'lucide-react'

interface EditorPanelProps {
  state: CardState
  onUpdate: (updates: Partial<CardState>) => void
  onReset: () => void
  label: string
}

const clamp = (value: number, min: number, max: number) => 
  Math.min(Math.max(value, min), max)

/**
 * EditorPanel - Form controls for editing card state
 */
export function EditorPanel({
  state,
  onUpdate,
  onReset,
  label,
}: EditorPanelProps) {
  const updateStat = (id: string, updates: Partial<Stat>) => {
    const updatedStats = state.stats.map((stat) =>
      stat.id === id ? { ...stat, ...updates } : stat
    )
    onUpdate({ stats: updatedStats })
  }

  const removeStat = (id: string) => {
    if (state.stats.length <= 6) {
      alert('You must have exactly 6 stats')
      return
    }
    const updatedStats = state.stats.filter((stat) => stat.id !== id)
    onUpdate({ stats: updatedStats })
  }

  const addStat = () => {
    if (state.stats.length >= 6) {
      alert('Maximum 6 stats allowed')
      return
    }
    const newStat: Stat = {
      id: Date.now().toString(),
      label: 'New Stat',
      value: 50,
    }
    onUpdate({ stats: [...state.stats, newStat] })
  }

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900 rounded-lg border">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{label} Editor</h3>
        <Button variant="outline" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>

      {/* Basic Info */}
      <div className="space-y-4">
        <AvatarPicker
          currentUrl={state.avatarUrl}
          onUrlChange={(url) => onUpdate({ avatarUrl: url })}
        />

        <div>
          <Label>Brand Text</Label>
          <Input
            value={state.brandText}
            onChange={(e) => onUpdate({ brandText: e.target.value })}
            placeholder="umax"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Stats (6 required)</Label>
          {state.stats.length < 6 && (
            <Button variant="outline" size="sm" onClick={addStat}>
              <Plus className="w-4 h-4 mr-1" />
              Add Stat
            </Button>
          )}
        </div>

        <div className="space-y-3">
          {state.stats.map((stat, index) => (
            <div
              key={stat.id}
              className="p-4 border rounded-lg space-y-3 bg-gray-50 dark:bg-gray-800"
            >
              <div className="flex items-start gap-2">
                <div className="cursor-move pt-2">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 w-6">
                      #{index + 1}
                    </span>
                    <div className="flex-1">
                      <Label className="text-xs">Label</Label>
                      <Input
                        value={stat.label}
                        onChange={(e) => updateStat(stat.id, { label: e.target.value })}
                        placeholder="Overall"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs">Value (0 - 100)</Label>
                    <div className="flex gap-2">
                      <Slider
                        value={[stat.value]}
                        onValueChange={([value]) =>
                          updateStat(stat.id, { value: clamp(Math.round(value), 0, 100) })
                        }
                        min={0}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={stat.value}
                        onChange={(e) =>
                          updateStat(stat.id, {
                            value: clamp(parseInt(e.target.value) || 0, 0, 100),
                          })
                        }
                        step={1}
                        min={0}
                        max={100}
                        className="w-20"
                      />
                    </div>
                  </div>
                </div>
                {state.stats.length > 6 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStat(stat.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
