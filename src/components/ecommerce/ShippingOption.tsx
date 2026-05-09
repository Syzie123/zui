import { cn } from '../../utils/cn';
import { useControllableState } from '../../hooks/useControllableState';
import {
  type EcommerceVariant,
  shellByVariant,
} from './variant';

export interface ShippingOptionItem {
  value: string;
  /** Carrier name (e.g. "GLS"). */
  carrier: string;
  /** Price line (e.g. "$5.99" or "Free"). */
  price: string;
  /** Delivery ETA / window. */
  eta: string;
  /** Optional badge (e.g. "Fast Delivery"). */
  badge?: string;
  /** Optional carrier logo / icon. */
  icon?: React.ReactNode;
}

export interface ShippingOptionProps {
  variant?: EcommerceVariant;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: ShippingOptionItem[];
  className?: string;
}

export function ShippingOption({
  variant = 'rounded',
  value,
  defaultValue,
  onChange,
  options,
  className,
}: ShippingOptionProps) {
  const [selected, setSelected] = useControllableState({
    value,
    defaultValue: defaultValue ?? options[0]?.value ?? '',
    onChange,
  });

  return (
    <div role="radiogroup" className={cn('flex flex-col gap-3', className)}>
      {options.map((opt) => {
        const active = selected === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setSelected(opt.value)}
            className={cn(
              'group relative flex w-full items-center gap-4 px-4 py-3 text-left',
              'transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]',
              shellByVariant[variant],
              'cursor-pointer outline-none',
              'focus-visible:shadow-[var(--shadow-focus)]',
              active && [
                variant === 'rounded' && 'border-[var(--color-fg-base)]',
                variant === 'square' && 'border-[var(--color-fg-base)]',
                variant === 'material' && 'ring-2 ring-[oklch(54%_0.22_265)]',
                variant === 'brutal' &&
                  'translate-x-[-1px] translate-y-[-1px] shadow-[5px_5px_0_0_var(--color-fg-base)]',
              ]
            )}
          >
            {/* Radio dot */}
            <span
              aria-hidden
              className={cn(
                'relative inline-flex shrink-0 items-center justify-center',
                variant === 'brutal' || variant === 'square'
                  ? 'size-5 border-[2px] border-[var(--color-fg-base)]'
                  : 'size-5 rounded-full border-2 border-[var(--color-border-strong)]',
                active && (variant === 'rounded' || variant === 'material')
                  ? variant === 'material'
                    ? 'border-[oklch(54%_0.22_265)]'
                    : 'border-[var(--color-fg-base)]'
                  : ''
              )}
            >
              {active && (
                <span
                  className={cn(
                    variant === 'brutal' || variant === 'square'
                      ? 'size-2 bg-[var(--color-fg-base)]'
                      : 'size-2.5 rounded-full',
                    variant === 'material'
                      ? 'bg-[oklch(54%_0.22_265)]'
                      : variant === 'rounded'
                        ? 'bg-[var(--color-fg-base)]'
                        : ''
                  )}
                />
              )}
            </span>

            {/* Body */}
            <div className="min-w-0 flex-1">
              {opt.badge && (
                <span
                  className={cn(
                    'mb-1 inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]',
                    'bg-[var(--color-fg-base)] text-[var(--color-bg-base)]',
                    variant === 'rounded' && 'rounded-[var(--radius-md)]',
                    variant === 'square' && 'rounded-none',
                    variant === 'material' && 'rounded-[4px]',
                    variant === 'brutal' && 'rounded-none'
                  )}
                >
                  {opt.badge}
                </span>
              )}
              <p className="font-display text-base font-semibold tracking-[-0.005em]">
                {opt.price}
              </p>
              <p className="text-xs text-[var(--color-fg-muted)]">
                Delivery {opt.eta}
              </p>
            </div>

            {/* Carrier */}
            <div className="ml-auto flex shrink-0 items-center">
              {opt.icon ?? (
                <span
                  className={cn(
                    'inline-flex h-7 items-center px-2 text-[11px] font-bold tracking-wider',
                    'bg-[var(--color-bg-subtle)] text-[var(--color-fg-base)]',
                    variant === 'rounded' && 'rounded-[var(--radius-sm)]',
                    variant === 'square' && 'rounded-none',
                    variant === 'material' && 'rounded-[4px]',
                    variant === 'brutal' &&
                      'rounded-none border-[1.5px] border-[var(--color-fg-base)]'
                  )}
                >
                  {opt.carrier}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
