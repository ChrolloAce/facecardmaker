import { CardState } from './schema'

/**
 * Default card state with 6 stats
 */
export const defaultCardState: CardState = {
  avatarUrl: undefined,
  brandText: 'umax',
  stats: [
    {
      id: '1',
      label: 'Overall',
      value: 96,
    },
    {
      id: '2',
      label: 'Jawline',
      value: 94,
    },
    {
      id: '3',
      label: 'Cheekbones',
      value: 92,
    },
    {
      id: '4',
      label: 'Eyes',
      value: 98,
    },
    {
      id: '5',
      label: 'Skin',
      value: 89,
    },
    {
      id: '6',
      label: 'Symmetry',
      value: 95,
    },
  ],
}

