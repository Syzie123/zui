import { useState } from 'react';
import { cn } from '../../utils/cn';
import {
  type EcommerceVariant,
  shellByVariant,
  ctaByVariant,
  inputByVariant,
} from './variant';

export interface OrderLine {
  label: string;
  /** Pre-formatted price string. Negative values for discounts can include a `-`. */
  value: string;
  /** Visual emphasis (e.g. discount = success green, total = bold). */
  tone?: 'default' | 'muted' | 'success' | 'danger' | 'total';
}

export interface OrderSummaryProps {
  variant?: EcommerceVariant;
  /** Flip dark surface for the summary (used in screenshot 3). */
  dark?: boolean;
  title?: string;
  /** Top-level items (each product, with quantity in label). */
  items?: OrderLine[];
  /** Sub-totals: subtotal, tax, shipping, etc. */
  meta?: OrderLine[];
  /** Bottom row — usually "Total". */
  total: { label: string; value: string };
  /** Show coupon row. */
  couponable?: boolean;
  onApplyCoupon?: (code: string) => void;
  /** Primary CTA at the bottom (e.g. "Checkout"). Hidden if absent. */
  ctaLabel?: string;
  onCta?: () => void;
  className?: string;
}

const toneClasses: Record<NonNullable<OrderLine['tone']>, string> = {
  default: 'text-[var(--color-fg-base)]',
  muted: 'text-[var(--color-fg-muted)]',
  success: 'text-[var(--color-success)]',
  danger: 'text-[var(--color-danger)]',
  total: 'text-[var(--color-fg-base)] font-semibold',
};

export function OrderSummary({
  variant = 'rounded',
  dark,
  title = 'Order summary',
  items = [],
  meta = [],
  total,
  couponable,
  onApplyCoupon,
  ctaLabel,
  onCta,
  className,
}: OrderSummaryProps) {
  const [coupon, setCoupon] = useState('');

  return (
    <section
      className={cn(
        'flex w-full max-w-md flex-col p-5 sm:p-6',
        shellByVariant[variant],
        dark && [
          'bg-[var(--color-bg-inverse)] text-[var(--color-fg-on-inverse)]',
          'border-transparent',
          variant === 'brutal' && 'border-[var(--color-fg-on-inverse)] shadow-[4px_4px_0_0_var(--color-fg-on-inverse)]',
        ],
        className
      )}
    >
      <h3
        className={cn(
          'font-display text-lg font-semibold tracking-[-0.02em]',
          dark && 'text-[var(--color-fg-on-inverse)]'
        )}
      >
        {title}
      </h3>

      {items.length > 0 && (
        <ul
          className={cn(
            'mt-4 flex flex-col gap-2.5 pb-4',
            'border-b',
            dark
              ? 'border-[oklch(99%_0_0/0.10)]'
              : 'border-[var(--color-border-subtle)]'
          )}
        >
          {items.map((it, i) => (
            <li key={i} className="flex items-center justify-between gap-3 text-sm">
              <span
                className={cn(
                  dark ? 'text-[var(--color-fg-on-inverse)]' : toneClasses[it.tone ?? 'default']
                )}
              >
                {it.label}
              </span>
              <span
                className={cn(
                  'font-medium tabular-nums',
                  dark ? 'text-[var(--color-fg-on-inverse)]' : toneClasses[it.tone ?? 'default']
                )}
              >
                {it.value}
              </span>
            </li>
          ))}
        </ul>
      )}

      {meta.length > 0 && (
        <ul
          className={cn(
            'flex flex-col gap-2.5 py-4',
            'border-b',
            dark
              ? 'border-[oklch(99%_0_0/0.10)]'
              : 'border-[var(--color-border-subtle)]'
          )}
        >
          {meta.map((it, i) => (
            <li key={i} className="flex items-center justify-between gap-3 text-sm">
              <span className={cn(toneClasses[it.tone ?? 'muted'], dark && 'text-[oklch(99%_0_0/0.7)]')}>
                {it.label}
              </span>
              <span
                className={cn(
                  'font-medium tabular-nums',
                  toneClasses[it.tone ?? 'default'],
                  dark && it.tone !== 'success' && 'text-[var(--color-fg-on-inverse)]'
                )}
              >
                {it.value}
              </span>
            </li>
          ))}
        </ul>
      )}

      {couponable && (
        <div
          className={cn(
            'mt-4 flex items-center gap-2 p-1',
            inputByVariant[variant],
            dark && 'border-[oklch(99%_0_0/0.15)] bg-[oklch(99%_0_0/0.06)]'
          )}
        >
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Coupone code"
            className={cn(
              'min-w-0 flex-1 bg-transparent px-2 py-1.5 text-sm outline-none',
              dark
                ? 'text-[var(--color-fg-on-inverse)] placeholder:text-[oklch(99%_0_0/0.5)]'
                : 'text-[var(--color-fg-base)] placeholder:text-[var(--color-fg-subtle)]'
            )}
          />
          <button
            type="button"
            onClick={() => onApplyCoupon?.(coupon)}
            disabled={!coupon}
            className={cn(
              'shrink-0 px-3 py-1.5 text-xs font-semibold',
              'transition-colors',
              variant === 'rounded' && 'rounded-[var(--radius-md)]',
              variant === 'square' && 'rounded-none',
              variant === 'material' && 'rounded-[6px]',
              variant === 'brutal' && 'rounded-none border-[1.5px] border-[var(--color-fg-base)]',
              dark
                ? 'bg-[oklch(99%_0_0/0.10)] text-[var(--color-fg-on-inverse)] hover:bg-[oklch(99%_0_0/0.15)]'
                : 'bg-[var(--color-bg-subtle)] text-[var(--color-fg-base)] hover:bg-[var(--color-bg-muted)]',
              'disabled:opacity-40 disabled:cursor-not-allowed'
            )}
          >
            Apply
          </button>
        </div>
      )}

      {/* Total */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <span
          className={cn(
            'font-display text-base font-semibold',
            dark && 'text-[var(--color-fg-on-inverse)]'
          )}
        >
          {total.label}
        </span>
        <span
          className={cn(
            'font-display text-xl font-bold tracking-[-0.02em] tabular-nums',
            dark && 'text-[var(--color-fg-on-inverse)]'
          )}
        >
          {total.value}
        </span>
      </div>

      {ctaLabel && (
        <button
          type="button"
          onClick={onCta}
          className={cn(
            'mt-5 inline-flex h-12 items-center justify-center px-5 text-sm font-semibold',
            'transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]',
            ctaByVariant[variant]
          )}
        >
          {ctaLabel}
        </button>
      )}
    </section>
  );
}
