// src/constants/theme.js

export const Colors = {
  background: '#0F0F0F',
  surface: '#1A1A1A',
  card: '#222222',
  cardBorder: '#2E2E2E',
  orange: '#FF8C00',
  orangeLight: '#FFA500',
  text: '#F0F0F0',
  textMuted: '#888888',
  textSecondary: '#BBBBBB',
  green: '#22C55E',
  red: '#EF4444',
  blue: '#3B82F6',
  purple: '#A855F7',
  cyan: '#06B6D4',
  amber: '#F59E0B',
  white: '#FFFFFF',
  black: '#000000',
  inputBg: '#1E1E1E',
  separator: '#2A2A2A',
};

export const Gradients = {
  orange: ['#FF8C00', '#FFA500'],
  card: ['#1A1200', '#2A1800'],
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

export const Typography = {
  h1: { fontSize: 24, fontWeight: '800', color: Colors.text },
  h2: { fontSize: 20, fontWeight: '700', color: Colors.text },
  h3: { fontSize: 16, fontWeight: '700', color: Colors.text },
  body: { fontSize: 14, fontWeight: '400', color: Colors.text },
  caption: { fontSize: 12, fontWeight: '400', color: Colors.textMuted },
  label: { fontSize: 11, fontWeight: '600', color: Colors.textMuted, letterSpacing: 0.6, textTransform: 'uppercase' },
};

export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fab: {
    shadowColor: Colors.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
};

export const CATEGORIES = [
  { name: 'Vehicle', icon: 'car', emoji: '🚗', color: Colors.orange },
  { name: 'Insurance', icon: 'shield', emoji: '🛡️', color: Colors.blue },
  { name: 'Subscription', icon: 'tv', emoji: '📺', color: Colors.purple },
  { name: 'Rent', icon: 'home', emoji: '🏠', color: Colors.green },
  { name: 'Recharge', icon: 'smartphone', emoji: '📱', color: Colors.cyan },
  { name: 'Warranty', icon: 'tool', emoji: '🔧', color: Colors.amber },
];

export const CURRENCIES = ['₹', '$', '€', '£'];
export const REMINDERS = ['3 days before', '7 days before', '14 days before', '30 days before', '60 days before'];
