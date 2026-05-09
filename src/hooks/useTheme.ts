import { useCallback, useEffect, useState } from 'react';

export type Theme = 'clean' | 'dark' | 'luminous';

const THEME_CLASSES: Record<Theme, string> = {
  clean:    'theme-clean',
  dark:     'theme-dark',
  luminous: 'theme-luminous',
};

const STORAGE_KEY = 'zui-theme';

function readStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'clean';
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored && stored in THEME_CLASSES) return stored;
  return 'clean';
}

function applyThemeToHtml(theme: Theme) {
  const html = document.documentElement;
  Object.values(THEME_CLASSES).forEach((cls) => html.classList.remove(cls));
  html.classList.add(THEME_CLASSES[theme]);
  html.style.colorScheme = theme === 'clean' ? 'light' : 'dark';
}

export function useTheme(): {
  theme: Theme;
  setTheme: (next: Theme) => void;
  cycleTheme: () => void;
} {
  const [theme, setThemeState] = useState<Theme>(() => readStoredTheme());

  useEffect(() => {
    applyThemeToHtml(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const cycleTheme = useCallback(() => {
    setThemeState((t) => {
      const order: Theme[] = ['clean', 'dark', 'luminous'];
      return order[(order.indexOf(t) + 1) % order.length];
    });
  }, []);

  return { theme, setTheme, cycleTheme };
}
