import { z } from 'zod'

/**
 * Schema for a single trait row in the card
 */
export const TraitSchema = z.object({
  id: z.string(),
  icon: z.string(),
  label: z.string(),
  sublabel: z.string().optional(),
  rating: z.number().min(0).max(10),
})

export type Trait = z.infer<typeof TraitSchema>

/**
 * Schema for the complete card state
 */
export const CardStateSchema = z.object({
  headlinePrefix: z.string().default("You're a"),
  score: z.number().min(0).max(10),
  percentileText: z.string(),
  avatarUrl: z.string().optional(),
  brandText: z.string().default('The Facecard App'),
  hintText: z.string().default('Swipe for detailed analysis →'),
  traits: z.array(TraitSchema),
})

export type CardState = z.infer<typeof CardStateSchema>

/**
 * Schema for the complete editor store state
 */
export const EditorStoreSchema = z.object({
  mode: z.enum(['before', 'after', 'compare-side', 'compare-slider']).default('after'),
  before: CardStateSchema,
  after: CardStateSchema,
})

export type EditorStoreState = z.infer<typeof EditorStoreSchema>

/**
 * Type for the active view mode
 */
export type ViewMode = 'before' | 'after' | 'compare-side' | 'compare-slider'

