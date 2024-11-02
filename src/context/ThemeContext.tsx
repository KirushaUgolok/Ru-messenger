import React, { createContext, useContext, useState } from 'react';
import type { Theme } from '../types';

interface ThemeContextType {
  theme: Theme['id'];
  setTheme: (theme: Theme['id']) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes: Theme[] = [
  { id: 'light', name: 'Светлая тема' },
  { id: 'dark', name: 'Темная тема' },
  { id: 'futuristic', name: 'Футуристичная тема' },
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme['id']>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
