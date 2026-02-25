'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
type Theme = 'light' | 'dark';

export interface AccentOption {
  key: string;
  label: string;
  color: string;
}

export const accentOptions: AccentOption[] = [
  { key: 'grey', label: 'Grey (default)', color: '#6b7280' },
  { key: 'purple', label: 'Purple', color: '#6366f1' },
  { key: 'green', label: 'Green', color: '#22c55e' },
  { key: 'cyan', label: 'Cyan', color: '#06b6d4' },
  { key: 'magenta', label: 'Magenta', color: '#ec4899' },
];

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  accent: string;
  setAccent: (key: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyAccent(key: string) {
  const opt = accentOptions.find(o => o.key === key) || accentOptions[0];
  document.documentElement.style.setProperty('--accent-color', opt.color);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [accent, setAccentState] = useState('grey');

  useEffect(() => {
    const stored = localStorage.getItem('aerwave-theme') as Theme | null;
    if (stored) {
      setThemeState(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark');
      document.documentElement.classList.add('dark');
    }
    // Load accent from localStorage
    const localAccent = localStorage.getItem('aerwave-accent') || 'grey';
    setAccentState(localAccent);
    applyAccent(localAccent);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('aerwave-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const setAccent = (key: string) => {
    setAccentState(key);
    localStorage.setItem('aerwave-accent', key);
    applyAccent(key);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, accent, setAccent }}>
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
