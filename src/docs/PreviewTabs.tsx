import { useState, type ReactNode } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '../utils/cn';
import { CodeBlock } from './CodeBlock';

interface PreviewTabsProps {
  preview: ReactNode;
  code: string;
  language?: string;
  /** Filename shown in code-tab header (e.g. "button-demo.tsx"). */
  filename?: string;
  /** Trailing action shown top-right inside the preview frame. */
  action?: ReactNode;
  /** Allow the demo to be re-mounted via a key bump. */
  resettable?: boolean;
  className?: string;
  /** Make the preview surface a specific min-height. */
  minHeight?: string;
}

export function PreviewTabs({
  preview,
  code,
  language = 'tsx',
  filename,
  action,
  resettable = true,
  className,
  minHeight = '24rem',
}: PreviewTabsProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const [resetKey, setResetKey] = useState(0);

  return (
    <div data-animate-up className={cn('w-full', className)}>
      {/* Tab strip */}
      <div className="mb-3 flex items-center justify-between border-b border-[var(--color-border-base)]">
        <div className="flex items-center">
          {(['preview', 'code'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                'relative -mb-px px-4 py-2 text-sm font-medium capitalize',
                'transition-colors duration-[var(--duration-fast)]',
                tab === t
                  ? 'text-[var(--color-fg-base)]'
                  : 'text-[var(--color-fg-muted)] hover:text-[var(--color-fg-base)]',
                'after:absolute after:inset-x-0 after:-bottom-px after:h-[2px]',
                'after:rounded-full after:bg-[var(--color-fg-base)]',
                'after:transition-transform after:duration-[var(--duration-base)]',
                tab === t ? 'after:scale-x-100' : 'after:scale-x-0'
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Panel */}
      {tab === 'preview' ? (
        <div
          className={cn(
            'relative overflow-hidden rounded-[var(--radius-xl)]',
            'border border-[var(--color-border-base)]',
            'bg-[radial-gradient(ellipse_at_top,var(--color-bg-subtle),transparent_70%)]'
          )}
          style={{ minHeight }}
        >
          {/* Faint dotted texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(color-mix(in oklch, var(--color-fg-base) 6%, transparent) 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }}
            aria-hidden
          />

          {/* Top action bar */}
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1">
            {action}
            {resettable && (
              <button
                type="button"
                aria-label="Reset"
                onClick={() => setResetKey((k) => k + 1)}
                className={cn(
                  'inline-flex size-8 items-center justify-center',
                  'rounded-[var(--radius-md)]',
                  'border border-[var(--color-border-subtle)]',
                  'bg-[var(--color-bg-elevated)]',
                  'text-[var(--color-fg-muted)]',
                  'transition-colors hover:text-[var(--color-fg-base)]'
                )}
              >
                <RotateCcw className="size-3.5" />
              </button>
            )}
          </div>

          <div
            className="relative flex h-full items-center justify-center p-8 sm:p-12"
            style={{ minHeight }}
            key={resetKey}
          >
            {preview}
          </div>
        </div>
      ) : (
        <CodeBlock code={code} language={language} filename={filename} />
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * Optional "Open in v0" / external action (purely decorative).
 * ──────────────────────────────────────────────────────────── */
export function OpenInButton({
  label = 'Open in editor',
  href,
}: {
  label?: string;
  href?: string;
}) {
  return (
    <a
      href={href ?? '#'}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'inline-flex h-8 items-center gap-1.5 px-3',
        'rounded-[var(--radius-md)]',
        'border border-[var(--color-border-subtle)]',
        'bg-[var(--color-bg-elevated)]',
        'text-xs font-medium text-[var(--color-fg-base)]',
        'transition-colors hover:bg-[var(--color-bg-subtle)]'
      )}
    >
      {label}
      <ArrowRight className="size-3" />
    </a>
  );
}
