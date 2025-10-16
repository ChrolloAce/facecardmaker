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
      
      updateCard: (updates) => {
        // Debug logging for avatar updates
        if (updates.avatarUrl !== undefined) {
          const isDataUrl = updates.avatarUrl?.startsWith('data:')
          console.log('💾 Saving avatar to store:', {
            hasAvatar: !!updates.avatarUrl,
            isDataUrl,
            sizeKB: updates.avatarUrl ? Math.round(updates.avatarUrl.length / 1024) : 0
          })
        }
        
        set((state) => ({
          card: { ...state.card, ...updates },
        }))
      },
      
      resetCard: () => set({ card: defaultCardState }),
    }),
    {
      name: 'facecard-editor-v4', // Updated with color-coded progress bars
    }
  )
)
