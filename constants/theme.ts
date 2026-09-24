// Powered by OnSpace.AI
// Design tokens for IdeiaRapida - "Nova Riqueza" wealth theme

export const colors = {
  // Base
  background: '#F7F4ED',
  surface: '#FFFFFF',
  surfaceAlt: '#EFEAE0',

  // Brand - emerald wealth
  primary: '#0F5132',
  primaryDark: '#0A3D26',
  primarySoft: '#E3EFE8',

  // Emphasis - gold
  gold: '#C9A227',
  goldSoft: '#F6EFD6',

  // Text
  text: '#16201B',
  textSubtle: '#5B6660',
  textMuted: '#8A938D',
  onPrimary: '#FFFFFF',

  // Semantic
  success: '#1E8E5A',
  warning: '#C77D19',
  danger: '#C0392B',

  // Lines
  border: '#E2DDD1',
  borderStrong: '#CFC8B8',

  // Profit levels
  profitHigh: '#0F5132',
  profitMid: '#C9A227',
  profitLow: '#8A938D',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  display: 34,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const shadow = {
  card: {
    shadowColor: '#0A3D26',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  soft: {
    shadowColor: '#0A3D26',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
} as const;
