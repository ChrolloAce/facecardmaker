import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CardState } from './schema'
import { defaultAfterState } from './seed-data'

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
      card: defaultAfterState,
      
      updateCard: (updates) =>
        set((state) => ({
          card: { ...state.card, ...updates },
        })),
      
      resetCard: () => set({ card: defaultAfterState }),
    }),
    {
      name: 'facecard-editor-storage',
    }
  )
)
