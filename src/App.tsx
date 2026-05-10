import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/locomotive-scroll.css';

import { Tooltip } from './components/Tooltip';
import { ToastProvider } from './components/Toast';
import { useTheme } from './hooks/useTheme';
import { useHashRoute } from './hooks/useHashRoute';
import { Home } from './docs/Home';
import { DocsLayout } from './docs/DocsLayout';

export default function App() {
  // Subscribing in App ensures the active theme class is on <html>
  // before any portal-mounted overlay reads its tokens.
  useTheme();
  const { path } = useHashRoute();

  // ─────────────────────────────────────────────────────────────
  // Locomotive Scroll v5 (Lenis-based) — global smooth scroll.
  //
  // v5 hooks into the wheel/touch events and animates window scroll
  // directly, so it does NOT wrap <body> in a transformed container.
  // Result: sticky elements, IntersectionObserver, scrollIntoView,
  // and our hash routing all keep working.
  //
  // Init once on mount, destroy on unmount. Lenis auto-detects content
  // resizes via ResizeObserver, so route changes don't need a re-init.
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const scroll = new LocomotiveScroll();
    return () => {
      scroll.destroy();
    };
  }, []);

  // Route table — small enough to keep inline.
  let view: React.ReactNode;
  if (path === '/' || path === '') {
    view = <Home />;
  } else if (path === '/components') {
    view = <DocsLayout slug="introduction" />;
  } else if (path.startsWith('/components/')) {
    const slug = path.replace(/^\/components\//, '');
    view = <DocsLayout slug={slug} />;
  } else {
    view = <DocsLayout slug="__not_found__" />;
  }

  return (
    <Tooltip.Provider>
      <ToastProvider position="bottom-right" duration={4000}>
        {view}
      </ToastProvider>
    </Tooltip.Provider>
  );
}
