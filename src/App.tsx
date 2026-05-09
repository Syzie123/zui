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

  // Route table — small enough to keep inline.
  // /                       → Home
  // /components             → docs index (redirect to introduction)
  // /components/<slug>      → DocsLayout with that slug
  let view: React.ReactNode;
  if (path === '/' || path === '') {
    view = <Home />;
  } else if (path === '/components') {
    view = <DocsLayout slug="introduction" />;
  } else if (path.startsWith('/components/')) {
    const slug = path.replace(/^\/components\//, '');
    view = <DocsLayout slug={slug} />;
  } else {
    // Unknown — show 404 within the docs layout
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
