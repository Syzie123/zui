import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn } from '../utils/cn';

/**
 * Compact install snippet rendered automatically on every component /
 * effect / pattern / ecommerce doc page (the DocsLayout decides where).
 *
 * The Installation page itself shows the verbose 3-manager grid; this
 * is just the one-line pill that lives at the top of every other page.
 */
export function InstallPill({
  pkg = '@zui.react/zui',
  className,
}: {
  pkg?: string;
  className?: string;
}) {
  const cmd = `npm install ${pkg}`;
  const [copied, setCopied] = useState(false);

  return (
    <div
      className={cn(
        'flex w-fit items-center gap-2.5',
        'rounded-[var(--radius-lg)]',
        'border border-[var(--color-border-base)]',
        'bg-[var(--color-bg-elevated)]',
        'px-3.5 py-1.5',
        'font-mono text-[12.5px]',
        'transition-colors hover:border-[var(--color-border-strong)]',
        className
      )}
    >
      <Terminal className="size-3.5 text-[var(--color-fg-subtle)]" />
      <code className="select-all whitespace-nowrap text-[var(--color-fg-base)]">
        {cmd}
      </code>
      <button
        type="button"
        aria-label="Copy install command"
        onClick={() => {
          navigator.clipboard.writeText(cmd);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className={cn(
          '-mr-1 inline-flex size-6 items-center justify-center rounded-[var(--radius-sm)]',
          'text-[var(--color-fg-subtle)]',
          'transition-colors',
          'hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg-base)]',
          'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]'
        )}
      >
        {copied ? (
          <Check className="size-3.5 text-[var(--color-success)]" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    </div>
  );
}
