import { useEffect, useState, useCallback } from 'react';

/**
 * Tiny hash-based router. Returns the current path (e.g. "/docs/button")
 * and a `navigate` function. No external deps, no server config needed.
 */
export function useHashRoute(): {
  path: string;
  navigate: (next: string) => void;
} {
  const [hash, setHash] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash : ''
  );

  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const path = hash.replace(/^#/, '') || '/';

  const navigate = useCallback((next: string) => {
    const target = next.startsWith('#') ? next : `#${next}`;
    if (window.location.hash !== target) {
      window.location.hash = target;
    }
    // scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return { path, navigate };
}

/**
 * <Link> — routed anchor that uses hash routing. Drops in for `<a>`.
 */
export function Link({
  href,
  className,
  children,
  onClick,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={`#${href ?? '/'}`}
      onClick={(e) => {
        onClick?.(e);
        // Let native anchor behavior handle hash navigation; just scroll.
        setTimeout(
          () => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }),
          0
        );
      }}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
