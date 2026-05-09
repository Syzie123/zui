import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'zui-animations';

/**
 * Global animation toggle — persists across sessions, syncs to a
 * `data-animations="on"` attribute on `<html>` so any component can
 * read the state via plain CSS.
 *
 * Default: off (instant, no entrance animations, no idle bobbing —
 * but normal hover/focus transitions still work; those are wired
 * to `prefers-reduced-motion` instead).
 */
export function useAnimations(): {
  enabled: boolean;
  toggle: () => void;
  set: (next: boolean) => void;
} {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY) === 'on';
  });

  useEffect(() => {
    const html = document.documentElement;
    if (enabled) html.setAttribute('data-animations', 'on');
    else html.removeAttribute('data-animations');
    localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off');
  }, [enabled]);

  const toggle = useCallback(() => setEnabled((v) => !v), []);
  const set = useCallback((next: boolean) => setEnabled(next), []);

  return { enabled, toggle, set };
}
