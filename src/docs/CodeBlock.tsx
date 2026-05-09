import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { highlight } from '../utils/highlight';
import { cn } from '../utils/cn';
import './code.css';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  /** Show top filename header bar. */
  filename?: string;
  /** Hide the copy button (e.g. for inline snippets). */
  noCopy?: boolean;
}

export function CodeBlock({
  code,
  language = 'tsx',
  className,
  filename,
  noCopy,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const html = highlight(code.trim());

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* no-op */
    }
  };

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-[var(--radius-xl)]',
        'border border-[var(--color-border-subtle)]',
        'bg-[var(--code-bg)]',
        className
      )}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] px-4 py-2">
          <span className="font-mono text-xs text-[var(--color-fg-muted)]">
            {filename}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-fg-subtle)]">
            {language}
          </span>
        </div>
      )}

      {!noCopy && (
        <button
          type="button"
          aria-label="Copy code"
          onClick={onCopy}
          className={cn(
            'absolute right-3 top-3 z-10',
            'inline-flex size-8 items-center justify-center',
            'rounded-[var(--radius-md)]',
            'border border-[var(--color-border-subtle)]',
            'bg-[var(--color-bg-elevated)] backdrop-blur-sm',
            'text-[var(--color-fg-muted)]',
            'opacity-0 transition-all duration-[var(--duration-fast)]',
            'group-hover:opacity-100 hover:text-[var(--color-fg-base)]',
            'focus-visible:opacity-100 focus-visible:shadow-[var(--shadow-focus)]'
          )}
        >
          {copied ? (
            <Check className="size-3.5 text-[var(--color-success)]" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      )}

      <pre className="zui-scroll overflow-x-auto p-4 text-[13px] leading-[1.65]">
        <code
          className="font-mono"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  );
}
