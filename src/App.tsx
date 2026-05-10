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
  // Tuned for PC wheel + high-Hz monitors. Defaults can read as a
  // bit steppy on 120 Hz displays — lower lerp and a softer wheel
  // multiplier give a settled, glassy glide.
  //
  //   lerp 0.085           slower interpolation, smoother glide
  //                        (default 0.1 felt steppy on high-Hz)
  //   wheelMultiplier 0.85 softer wheel response, less overshoot
  //   syncTouch + lerp     keep touch devices tight (no effect on PC)
  //   easing (cubic-out)   natural glide for scrollTo (TOC clicks etc.)
  //   duration 1.0         slightly snappier programmatic scroll
  //                        (default 1.2 felt sluggish on TOC clicks)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      lenisOptions: {
        lerp: 0.085,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.6,
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.075,
        duration: 1.0,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      },
    });
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
