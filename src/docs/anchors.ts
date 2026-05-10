import { useEffect, useState } from 'react';

/**
 * Tiny pub/sub for the active page's H2/H3 anchors.
 *
 * `DocsTOC` already does the DOM scrape (scoped to `<main>`) — when it
 * resolves the heading list, it calls `setActiveAnchors`. The sidebar
 * subscribes via `useActiveAnchors()` and renders sub-nodes under the
 * active page.
 *
 * Decoupled this way so the sidebar doesn't need a ref to the main
 * content node and we don't double-scrape the DOM.
 */

export interface DocAnchor {
  id: string;
  text: string;
  level: 2 | 3;
}

let _slug: string | null = null;
let _anchors: DocAnchor[] = [];
const _listeners = new Set<() => void>();

export function setActiveAnchors(slug: string, anchors: DocAnchor[]) {
  _slug = slug;
  _anchors = anchors;
  _listeners.forEach((fn) => fn());
}

export function getActiveAnchors(): { slug: string | null; anchors: DocAnchor[] } {
  return { slug: _slug, anchors: _anchors };
}

/** Subscribe to anchor updates. Returns the latest snapshot. */
export function useActiveAnchors(): { slug: string | null; anchors: DocAnchor[] } {
  const [snapshot, setSnapshot] = useState(() => ({
    slug: _slug,
    anchors: _anchors,
  }));

  useEffect(() => {
    const fn = () => setSnapshot({ slug: _slug, anchors: _anchors });
    _listeners.add(fn);
    fn(); // sync to current state on mount
    return () => {
      _listeners.delete(fn);
    };
  }, []);

  return snapshot;
}
