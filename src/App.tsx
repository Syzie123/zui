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

  // Native browser scroll only. (Tried locomotive-scroll v5 / Lenis —
  // defaults flickered on PC trackpads + high-Hz monitors and tuning
  // didn't fully settle it. The CSS `scroll-behavior: smooth` on <html>
  // already handles anchor smooth-scroll natively.)

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
