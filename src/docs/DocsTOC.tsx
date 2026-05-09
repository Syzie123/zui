import { useEffect, useState } from 'react';
import { Edit3, Github, Lightbulb, Sparkles } from 'lucide-react';
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

    // Collect headings, ensure each has an id
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

  return (
    <aside className="hidden w-56 shrink-0 xl:block">
      <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto py-8 pl-6 text-sm zui-scroll">
        {items.length > 0 && (
          <>
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
          </>
        )}

        <div className="mt-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
            Contribute
          </p>
          <ul className="flex flex-col gap-1.5 text-[13px]">
            <ContribLink icon={<Github className="size-3.5" />} label="Report an issue" />
            <ContribLink icon={<Lightbulb className="size-3.5" />} label="Request a feature" />
            <ContribLink icon={<Edit3 className="size-3.5" />} label="Edit this page" />
          </ul>
        </div>

        <PromoCard />
      </div>
    </aside>
  );
}

function ContribLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <li>
      <a
        href="#"
        className="inline-flex items-center gap-2 text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg-base)]"
      >
        {icon}
        {label}
      </a>
    </li>
  );
}

function PromoCard() {
  return (
    <div
      className={cn(
        'mt-10 overflow-hidden rounded-[var(--radius-xl)]',
        'border border-[var(--color-border-subtle)]',
        'bg-[var(--color-bg-elevated)] p-5'
      )}
    >
      <div className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-success)]">
        <span className="size-1.5 rounded-full bg-[var(--color-success)]" />
        Limited time offer
      </div>
      <p className="text-[15px] font-bold leading-tight tracking-[-0.02em]">
        Ship <em className="not-italic">Faster</em> with ZUI Pro
      </p>
      <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-fg-muted)]">
        Stop building from scratch. Get production-ready templates and 50+ premium components.
      </p>
      <ul className="mt-3 flex flex-col gap-1.5 text-[12px]">
        {[
          'Next.js 15 + TypeScript ready',
          'Copy, paste, customize in minutes',
          'Save 100+ hours of development',
        ].map((t) => (
          <li key={t} className="flex items-start gap-2">
            <Sparkles className="mt-0.5 size-3 text-[var(--color-accent-base)]" />
            <span className="text-[var(--color-fg-muted)]">{t}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-2xl font-bold tracking-[-0.02em]">$199</span>
        <span className="text-xs text-[var(--color-fg-muted)]">once</span>
      </div>
    </div>
  );
}
