export type Theme = {
  dark: boolean;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  onPrimary: string;
  success: string;
  danger: string;
};

export const lightTheme: Theme = {
  dark: false,
  background: '#F8F6F4',
  surface: '#FFFFFF',
  text: '#111827',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  primary: '#EA580C',
  onPrimary: '#FFFFFF',
  success: '#16A34A',
  danger: '#DC2626',
};

export const darkTheme: Theme = {
  dark: true,
  background: '#0B1120',
  surface: '#151E30',
  text: '#F3F4F6',
  textMuted: '#9CA3AF',
  border: '#263147',
  primary: '#F97316',
  onPrimary: '#FFFFFF',
  success: '#22C55E',
  danger: '#F87171',
};
