import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CardState, ViewMode } from './schema'
import { defaultBeforeState, defaultAfterState } from './seed-data'

/**
 * Store state interface
 */
interface EditorStore {
  mode: ViewMode
  before: CardState
  after: CardState
  
  // Actions
  setMode: (mode: ViewMode) => void
  updateBefore: (updates: Partial<CardState>) => void
  updateAfter: (updates: Partial<CardState>) => void
  resetBefore: () => void
  resetAfter: () => void
  duplicateBeforeToAfter: () => void
  duplicateAfterToBefore: () => void
}

/**
 * Main editor store with localStorage persistence
 */
export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      mode: 'after',
      before: defaultBeforeState,
      after: defaultAfterState,
      
      setMode: (mode) => set({ mode }),
      
      updateBefore: (updates) =>
        set((state) => ({
          before: { ...state.before, ...updates },
        })),
      
      updateAfter: (updates) =>
        set((state) => ({
          after: { ...state.after, ...updates },
        })),
      
      resetBefore: () => set({ before: defaultBeforeState }),
      
      resetAfter: () => set({ after: defaultAfterState }),
      
      duplicateBeforeToAfter: () =>
        set((state) => ({ after: { ...state.before } })),
      
      duplicateAfterToBefore: () =>
        set((state) => ({ before: { ...state.after } })),
    }),
    {
      name: 'facecard-editor-storage',
    }
  )
)

