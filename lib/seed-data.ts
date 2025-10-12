import { CardState } from './schema'

/**
 * Default card state with 6 stats
 */
export const defaultCardState: CardState = {
  avatarUrl: undefined,
  brandText: 'The Facecard App',
  stats: [
    {
      id: '1',
      label: 'Overall',
      value: 96, // Neon green (91+)
    },
    {
      id: '2',
      label: 'Jawline',
      value: 82, // Green (71-90)
    },
    {
      id: '3',
      label: 'Cheekbones',
      value: 65, // Yellow (41-70)
    },
    {
      id: '4',
      label: 'Eyes',
      value: 98, // Neon green (91+)
    },
    {
      id: '5',
      label: 'Skin',
      value: 38, // Red (0-40)
    },
    {
      id: '6',
      label: 'Symmetry',
      value: 75, // Green (71-90)
    },
  ],
}

