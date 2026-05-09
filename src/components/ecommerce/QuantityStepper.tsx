import { Minus, Plus } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useControllableState } from '../../hooks/useControllableState';
import { type EcommerceVariant, innerRadiusByVariant } from './variant';

export interface QuantityStepperProps {
  value?: number;
  defaultValue?: number;
  onChange?: (next: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: EcommerceVariant;
  className?: string;
}

const sizes = {
  sm: { wrap: 'h-8',  btn: 'size-8',  text: 'text-sm  min-w-7' },
  md: { wrap: 'h-10', btn: 'size-10', text: 'text-sm  min-w-8' },
  lg: { wrap: 'h-12', btn: 'size-12', text: 'text-base min-w-10' },
};

export function QuantityStepper({
  value,
  defaultValue = 1,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  variant = 'rounded',
  className,
}: QuantityStepperProps) {
  const [qty, setQty] = useControllableState({
    value,
    defaultValue,
    onChange,
  });
  const { wrap, btn, text } = sizes[size];

  const dec = () => setQty(Math.max(min, qty - 1));
  const inc = () => setQty(Math.min(max, qty + 1));

  return (
    <div
      className={cn(
        'inline-flex items-center select-none overflow-hidden',
        wrap,
        innerRadiusByVariant[variant],
        variant !== 'brutal' && 'border border-[var(--color-border-base)]',
        'bg-[var(--color-bg-elevated)]',
        className
      )}
    >
      <button
        type="button"
        onClick={dec}
        disabled={qty <= min}
        aria-label="Decrease quantity"
        className={cn(
          btn,
          'inline-flex items-center justify-center',
          'text-[var(--color-fg-base)]',
          'transition-colors hover:bg-[var(--color-bg-subtle)]',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          variant === 'brutal' && 'border-r-[2px] border-[var(--color-fg-base)]'
        )}
      >
        <Minus className="size-3.5" />
      </button>
      <span
        className={cn(
          'inline-flex items-center justify-center px-2',
          text,
          'font-semibold tabular-nums'
        )}
        aria-live="polite"
      >
        {qty}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={qty >= max}
        aria-label="Increase quantity"
        className={cn(
          btn,
          'inline-flex items-center justify-center',
          'text-[var(--color-fg-base)]',
          'transition-colors hover:bg-[var(--color-bg-subtle)]',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          variant === 'brutal' && 'border-l-[2px] border-[var(--color-fg-base)]'
        )}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
