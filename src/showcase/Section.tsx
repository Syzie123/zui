import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, description, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-20 py-16 sm:py-20 lg:py-28', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mb-8 max-w-2xl sm:mb-12 lg:mb-16">
          {eyebrow && (
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-accent-base)]">
              {eyebrow}
            </p>
          )}
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-fg-muted)] sm:mt-4 sm:text-base">
              {description}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}

interface DemoProps {
  label?: string;
  children: ReactNode;
  className?: string;
  /** Use a denser surface for tight component grids. */
  flush?: boolean;
  /** Make the surface span the available column. */
  fullBleed?: boolean;
}

export function Demo({ label, children, className, flush, fullBleed }: DemoProps) {
  return (
    <figure
      className={cn(
        'group relative flex flex-col overflow-hidden',
        'rounded-[var(--radius-2xl)] border border-[var(--color-border-base)]',
        'bg-[var(--color-bg-elevated)] shadow-[var(--shadow-xs)]',
        'transition-[box-shadow,border-color,transform]',
        'duration-[var(--duration-base)] ease-[var(--ease-out)]',
        'hover:shadow-[var(--shadow-md)] hover:border-[var(--color-border-strong)]',
        className
      )}
    >
      <div
        className={cn(
          'relative flex min-h-[12rem] flex-1 items-center justify-center',
          flush ? 'p-4 sm:p-6' : 'p-6 sm:p-10',
          fullBleed && 'p-0 sm:p-0',
          // Soft inner gradient — unifies the demo surface
          'bg-[radial-gradient(ellipse_at_top,var(--color-bg-subtle),transparent_70%)]'
        )}
      >
        {/* Faint dotted texture for spatial cue */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(color-mix(in oklch, var(--color-fg-base) 6%, transparent) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
          }}
          aria-hidden
        />
        <div className="relative flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {children}
        </div>
      </div>
      {label && (
        <figcaption
          className={cn(
            'flex items-center gap-2 px-4 py-2.5',
            'border-t border-[var(--color-border-subtle)]',
            'bg-[var(--color-bg-subtle)]',
            'text-xs font-medium tracking-wide text-[var(--color-fg-muted)]'
          )}
        >
          <span className="inline-block size-1.5 rounded-full bg-[var(--color-accent-base)]" aria-hidden />
          {label}
        </figcaption>
      )}
    </figure>
  );
}
