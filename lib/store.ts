import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CardState } from './schema'
import { defaultCardState } from './seed-data'

/**
 * Store state interface
 */
interface EditorStore {
  card: CardState
  
  // Actions
  updateCard: (updates: Partial<CardState>) => void
  resetCard: () => void
}

/**
 * Main editor store with localStorage persistence
 */
export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      card: defaultCardState,
      
      updateCard: (updates) =>
        set((state) => ({
          card: { ...state.card, ...updates },
        })),
      
      resetCard: () => set({ card: defaultCardState }),
    }),
    {
      name: 'analytics-card-editor-v2', // Changed key to avoid old schema conflicts
    }
  )
)
