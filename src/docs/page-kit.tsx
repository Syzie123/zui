import { type ReactNode } from 'react';
import { cn } from '../utils/cn';

/**
 * Reusable bits used across every doc page so they all read consistently:
 *  - <H2> / <H3> headings (auto-hash anchors via DocsTOC)
 *  - <P> body paragraph
 *  - <PropsTable> for component API
 *  - <InstallSnippet> for the npm command
 */

export const H2 = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn(
      'mt-12 mb-4 font-display text-2xl font-bold tracking-[-0.02em]',
      className
    )}
    {...rest}
  >
    {children}
  </h2>
);

export const H3 = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      'mt-8 mb-3 font-display text-lg font-semibold tracking-[-0.01em]',
      className
    )}
    {...rest}
  >
    {children}
  </h3>
);

export const P = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn(
      'my-3 text-[15px] leading-relaxed text-[var(--color-fg-muted)]',
      className
    )}
    {...rest}
  >
    {children}
  </p>
);

export const InlineCode = ({ children }: { children: ReactNode }) => (
  <code
    className={cn(
      'rounded-[var(--radius-sm)] px-1.5 py-0.5',
      'font-mono text-[0.85em]',
      'bg-[var(--color-bg-muted)] text-[var(--color-fg-base)]',
      'border border-[var(--color-border-subtle)]'
    )}
  >
    {children}
  </code>
);

/* ────────────────────────────────────────────────────────────
 * Props table — the canonical API doc presentation
 * ──────────────────────────────────────────────────────────── */

export interface PropRow {
  name: string;
  type: string;
  defaultValue?: string;
  description: ReactNode;
  required?: boolean;
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="my-4 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-base)]">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-[var(--color-bg-subtle)]">
          <tr>
            <Th>Prop</Th>
            <Th>Type</Th>
            <Th>Default</Th>
            <Th>Description</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.name}
              className={cn(
                i !== rows.length - 1 &&
                  'border-b border-[var(--color-border-subtle)]'
              )}
            >
              <Td>
                <span className="font-mono font-medium">{r.name}</span>
                {r.required && (
                  <span
                    className="ml-1 text-[var(--color-danger)]"
                    title="Required"
                  >
                    *
                  </span>
                )}
              </Td>
              <Td>
                <code className="font-mono text-[12.5px] text-[var(--color-accent-base)]">
                  {r.type}
                </code>
              </Td>
              <Td>
                {r.defaultValue ? (
                  <code className="font-mono text-[12.5px] text-[var(--color-fg-muted)]">
                    {r.defaultValue}
                  </code>
                ) : (
                  <span className="text-[var(--color-fg-subtle)]">—</span>
                )}
              </Td>
              <Td className="text-[var(--color-fg-muted)]">{r.description}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Th = ({ children }: { children: ReactNode }) => (
  <th className="border-b border-[var(--color-border-subtle)] px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
    {children}
  </th>
);
const Td = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <td
    className={cn(
      'px-4 py-3 align-top text-[13.5px]',
      className
    )}
  >
    {children}
  </td>
);

/* ────────────────────────────────────────────────────────────
 * Install snippet — terminal-style command pill, copy-able
 * ──────────────────────────────────────────────────────────── */

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function InstallSnippet({
  pkg,
  manager = 'npm',
}: {
  pkg: string;
  manager?: 'npm' | 'pnpm' | 'yarn';
}) {
  const [copied, setCopied] = useState(false);
  const cmd =
    manager === 'pnpm'
      ? `pnpm add ${pkg}`
      : manager === 'yarn'
        ? `yarn add ${pkg}`
        : `npm install ${pkg}`;

  const onCopy = async () => {
    await navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={cn(
        'group flex items-center gap-3 rounded-[var(--radius-lg)]',
        'border border-[var(--color-border-subtle)]',
        'bg-[var(--code-bg,var(--color-bg-subtle))]',
        'px-4 py-3 font-mono text-[13px]'
      )}
    >
      <span className="text-[var(--color-fg-subtle)]">$</span>
      <code className="flex-1 truncate text-[var(--color-fg-base)]">{cmd}</code>
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copy command"
        className="text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg-base)]"
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
