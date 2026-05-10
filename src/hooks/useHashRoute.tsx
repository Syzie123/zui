import { useEffect, useState, useCallback } from 'react';

/**
 * Clean-URL router built on the History API. Returns the current path
 * (eg. "/components/button") and a `navigate` function.
 *
 * The name is kept as `useHashRoute` for backwards compatibility — every
 * call site already imports it. The behaviour, though, is now real
 * pushState routing, so URLs no longer carry the `#`.
 *
 * Deployment note: the host must serve `index.html` for unknown paths
 * (Vercel / Netlify / Cloudflare Pages do this by default; for GitHub
 * Pages the included 404.html re-bootstraps the SPA).
 */
export function useHashRoute(): {
  path: string;
  navigate: (next: string) => void;
} {
  const [path, setPath] = useState<string>(() =>
    typeof window === 'undefined' ? '/' : currentPath()
  );

  useEffect(() => {
    const onPop = () => setPath(currentPath());
    window.addEventListener('popstate', onPop);
    // Custom event we dispatch from `navigate` since pushState doesn't fire popstate.
    window.addEventListener('zui:navigate', onPop as EventListener);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('zui:navigate', onPop as EventListener);
    };
  }, []);

  const navigate = useCallback((next: string) => {
    const target = next.startsWith('/') ? next : `/${next}`;
    if (window.location.pathname !== target) {
      window.history.pushState({}, '', target);
      window.dispatchEvent(new Event('zui:navigate'));
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return { path, navigate };
}

/* Pulls the current path, peels off any legacy `#` hash people may have
   bookmarked under the old router so deep-links don't 404. */
function currentPath(): string {
  const { pathname, hash } = window.location;
  if (pathname === '/' && hash.startsWith('#/')) {
    // Migrate legacy `/#/components/x` to `/components/x` so reload works.
    const migrated = hash.replace(/^#/, '');
    window.history.replaceState({}, '', migrated || '/');
    return migrated || '/';
  }
  return pathname || '/';
}

/**
 * <Link> — routed anchor that intercepts clicks and uses pushState.
 * Drops in for `<a>` and preserves modifier-click semantics (cmd-click,
 * middle-click etc. still open in a new tab via the native href).
 */
export function Link({
  href,
  className,
  children,
  onClick,
  target,
  rel,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const target_ = href ?? '/';
  return (
    <a
      href={target_}
      target={target}
      rel={rel}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        // Respect cmd/ctrl/shift/middle-click + explicit target=_blank.
        if (
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          target === '_blank'
        ) {
          return;
        }
        e.preventDefault();
        if (window.location.pathname !== target_) {
          window.history.pushState({}, '', target_);
          window.dispatchEvent(new Event('zui:navigate'));
        }
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
