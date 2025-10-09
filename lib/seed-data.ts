import { CardState } from './schema'

/**
 * Default "Before" state - lower ratings, needs improvement
 */
export const defaultBeforeState: CardState = {
  headlinePrefix: "You're a",
  score: 7.2,
  percentileText: 'Top 68% of men',
  avatarUrl: undefined,
  brandText: 'The Facecard App',
  hintText: 'Swipe for detailed analysis →',
  traits: [
    {
      id: '1',
      icon: '✨',
      label: 'Skin',
      sublabel: 'Needs Improvement',
      rating: 7.0,
    },
    {
      id: '2',
      icon: '🔥',
      label: 'Masculinity',
      sublabel: 'Average Dimorphism',
      rating: 7.5,
    },
    {
      id: '3',
      icon: '😐',
      label: 'Jawline',
      sublabel: 'Moderately Defined',
      rating: 7.8,
    },
    {
      id: '4',
      icon: '💇',
      label: 'Hairline',
      sublabel: 'Receding Slightly',
      rating: 6.8,
    },
    {
      id: '5',
      icon: '👁️',
      label: 'Eyes',
      sublabel: 'Standard Shape',
      rating: 7.1,
    },
  ],
}

/**
 * Default "After" state - improved ratings
 */
export const defaultAfterState: CardState = {
  headlinePrefix: "You're a",
  score: 8.9,
  percentileText: 'Top 92% of men',
  avatarUrl: undefined,
  brandText: 'The Facecard App',
  hintText: 'Swipe for detailed analysis →',
  traits: [
    {
      id: '1',
      icon: '✨',
      label: 'Skin',
      sublabel: 'Excellent Texture',
      rating: 9.1,
    },
    {
      id: '2',
      icon: '🔥',
      label: 'Masculinity',
      sublabel: 'Moderate Dimorphism',
      rating: 9.0,
    },
    {
      id: '3',
      icon: '😊',
      label: 'Jawline',
      sublabel: 'Well Defined',
      rating: 9.4,
    },
    {
      id: '4',
      icon: '💇‍♂️',
      label: 'Hairline',
      sublabel: 'Lush Thick Hair',
      rating: 9.1,
    },
    {
      id: '5',
      icon: '👁️',
      label: 'Eyes',
      sublabel: 'Almond Shape',
      rating: 8.4,
    },
  ],
}

