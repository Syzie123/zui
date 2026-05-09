import { useEffect, useMemo, useRef, useState } from 'react';
import { CornerDownLeft, FileText, Search } from 'lucide-react';
import { Dialog } from '../components/Dialog';
import { useHashRoute } from '../hooks/useHashRoute';
import { DOCS, flatPages } from './registry';
import { cn } from '../utils/cn';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocsSearch({ open, onOpenChange }: Props) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { navigate } = useHashRoute();

  // Reset state when opened
  useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const groups = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return DOCS;
    return DOCS
      .map((g) => ({
        ...g,
        pages: g.pages.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.slug.includes(query)
        ),
      }))
      .filter((g) => g.pages.length > 0);
  }, [q]);

  const flat = useMemo(() => groups.flatMap((g) => g.pages), [groups]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = flat[active];
      if (target) {
        navigate(`/components/${target.slug}`);
        onOpenChange(false);
      }
    }
  };

  // Adjust active when filter changes
  useEffect(() => {
    setActive(0);
  }, [q]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        showCloseButton={false}
        className="max-w-xl overflow-hidden p-0"
      >
        <Dialog.Title className="sr-only">Search documentation</Dialog.Title>
        <Dialog.Description className="sr-only">
          Type to filter components and patterns.
        </Dialog.Description>

        <div className="flex items-center gap-3 border-b border-[var(--color-border-subtle)] px-4">
          <Search className="size-4 text-[var(--color-fg-subtle)]" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search components, patterns, hooks…"
            className="h-12 w-full bg-transparent text-[15px] outline-none placeholder:text-[var(--color-fg-subtle)]"
          />
          <kbd className="rounded border border-[var(--color-border-base)] bg-[var(--color-bg-subtle)] px-1.5 py-0.5 font-mono text-[10px] font-medium text-[var(--color-fg-subtle)]">
            ESC
          </kbd>
        </div>

        <div className="zui-scroll max-h-[60vh] overflow-y-auto p-2">
          {flat.length === 0 ? (
            <p className="py-12 text-center text-sm text-[var(--color-fg-muted)]">
              No results for <span className="font-medium">"{q}"</span>
            </p>
          ) : (
            groups.map((g) => (
              <div key={g.name} className="mb-2">
                <p className="mb-1 px-2.5 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
                  {g.name}
                </p>
                <ul>
                  {g.pages.map((p) => {
                    const idx = flat.indexOf(p);
                    const isActive = idx === active;
                    return (
                      <li key={p.slug}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => {
                            navigate(`/components/${p.slug}`);
                            onOpenChange(false);
                          }}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-[var(--radius-md)] px-2.5 py-2.5 text-left',
                            'transition-colors',
                            isActive && 'bg-[var(--color-bg-subtle)]'
                          )}
                        >
                          <FileText className="size-4 shrink-0 text-[var(--color-fg-subtle)]" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {p.title}
                            </p>
                            <p className="truncate text-xs text-[var(--color-fg-muted)]">
                              {p.description}
                            </p>
                          </div>
                          {isActive && (
                            <CornerDownLeft className="size-4 text-[var(--color-fg-subtle)]" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[var(--color-border-subtle)] px-4 py-2.5 text-[11px] text-[var(--color-fg-subtle)]">
          <div className="flex items-center gap-3">
            <Hint keys={['↑', '↓']} label="Navigate" />
            <Hint keys={['↵']} label="Open" />
            <Hint keys={['esc']} label="Close" />
          </div>
          <span>
            {flatPages().length} pages
          </span>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

function Hint({ keys, label }: { keys: string[]; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      {keys.map((k) => (
        <kbd
          key={k}
          className="rounded border border-[var(--color-border-base)] bg-[var(--color-bg-subtle)] px-1 py-0.5 font-mono text-[10px] font-medium"
        >
          {k}
        </kbd>
      ))}
      <span>{label}</span>
    </span>
  );
}
