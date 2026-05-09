import { useEffect, useState } from 'react';
import { cn } from '../utils/cn';

interface TOCItem {
  id: string;
  text: string;
  level: number; // 2 or 3
}

/**
 * "On this page" navigator. Scrapes h2/h3 from the active page on mount,
 * highlights the visible heading via IntersectionObserver.
 */
export function DocsTOC({ contentRef }: { contentRef: React.RefObject<HTMLElement> }) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const headings = Array.from(root.querySelectorAll<HTMLHeadingElement>('h2, h3'));
    const collected: TOCItem[] = headings.map((h) => {
      if (!h.id) {
        h.id = h.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') ?? '';
      }
      return {
        id: h.id,
        text: h.textContent ?? '',
        level: h.tagName === 'H2' ? 2 : 3,
      };
    });
    setItems(collected);

    if (collected.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -65% 0px' }
    );

    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [contentRef]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden w-56 shrink-0 xl:block">
      <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto py-8 pl-6 text-sm zui-scroll">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
          On This Page
        </p>
        <ul className="flex flex-col gap-1.5 border-l border-[var(--color-border-subtle)]">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(it.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.replaceState(null, '', `#${it.id}`);
                  }
                }}
                className={cn(
                  '-ml-px block border-l-2 py-0.5 pl-3',
                  'transition-colors duration-[var(--duration-fast)]',
                  it.level === 3 && 'pl-6',
                  active === it.id
                    ? 'border-[var(--color-fg-base)] text-[var(--color-fg-base)] font-medium'
                    : 'border-transparent text-[var(--color-fg-muted)] hover:text-[var(--color-fg-base)]'
                )}
              >
                {it.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
