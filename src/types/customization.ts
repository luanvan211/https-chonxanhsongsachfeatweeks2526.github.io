export type BottleType = 'metal' | 'tritan';

export interface CustomizationState {
  type: BottleType;
  color: string;
  texture?: string;
  charms?: string[];
  engraving?: string;
  image?: string;
}

export const COLORS = [
  { name: 'Classic Black', value: '#1a1a1a' },
  { name: 'Steel Silver', value: '#e2e8f0' },
  { name: 'Ocean Blue', value: '#0ea5e9' },
  { name: 'Forest Green', value: '#22c55e' },
  { name: 'Sunset Orange', value: '#f97316' },
];

export const CHARMS = [
  { id: 'heart', name: 'Heart', icon: '❤️' },
  { id: 'star', name: 'Star', icon: '⭐' },
  { id: 'leaf', name: 'Leaf', icon: '🍃' },
  { id: 'coffee', name: 'Coffee', icon: '☕' },
];
