import { z } from 'zod'

/**
 * Schema for a single stat in the card
 */
export const StatSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.number().min(0).max(100), // 0-100 score
})

export type Stat = z.infer<typeof StatSchema>

/**
 * Schema for the complete card state
 */
export const CardStateSchema = z.object({
  avatarUrl: z.string().optional(),
  brandText: z.string().default('umax'),
  stats: z.array(StatSchema).length(6), // Exactly 6 stats (3 per column)
})

export type CardState = z.infer<typeof CardStateSchema>

