import { cn } from '../../utils/cn';
import { useControllableState } from '../../hooks/useControllableState';
import {
  type EcommerceVariant,
  shellByVariant,
} from './variant';

export interface PaymentMethodOption {
  value: string;
  label: string;
  /** Sub-line shown below label (e.g. "**** 4242"). */
  description?: string;
  icon?: React.ReactNode;
}

export interface PaymentMethodPickerProps {
  variant?: EcommerceVariant;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: PaymentMethodOption[];
  className?: string;
}

export function PaymentMethodPicker({
  variant = 'rounded',
  value,
  defaultValue,
  onChange,
  options,
  className,
}: PaymentMethodPickerProps) {
  const [selected, setSelected] = useControllableState({
    value,
    defaultValue: defaultValue ?? options[0]?.value ?? '',
    onChange,
  });

  return (
    <div role="radiogroup" className={cn('flex flex-col gap-2.5', className)}>
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
              'group flex w-full items-center gap-3 px-4 py-3 text-left',
              'transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]',
              shellByVariant[variant],
              'cursor-pointer outline-none',
              'focus-visible:shadow-[var(--shadow-focus)]',
              active && [
                variant === 'rounded' && 'border-[var(--color-fg-base)] shadow-[var(--shadow-md)]',
                variant === 'square' && 'border-[var(--color-fg-base)]',
                variant === 'material' &&
                  'shadow-[0_2px_6px_rgb(0_0_0/0.16),0_1px_3px_rgb(0_0_0/0.10)] ring-2 ring-[oklch(54%_0.22_265)]',
                variant === 'brutal' &&
                  'translate-x-[-1px] translate-y-[-1px] shadow-[5px_5px_0_0_var(--color-fg-base)]',
              ]
            )}
          >
            {opt.icon && (
              <span className="inline-flex shrink-0 items-center">{opt.icon}</span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold tracking-[-0.005em]">{opt.label}</p>
              {opt.description && (
                <p className="truncate text-xs text-[var(--color-fg-muted)]">
                  {opt.description}
                </p>
              )}
            </div>
            <Indicator active={active} variant={variant} />
          </button>
        );
      })}
    </div>
  );
}

function Indicator({
  active,
  variant,
}: {
  active: boolean;
  variant: EcommerceVariant;
}) {
  // Square + Brutal use a sharp filled box; rounded + material use a circle.
  if (variant === 'brutal' || variant === 'square') {
    return (
      <span
        aria-hidden
        className={cn(
          'relative inline-flex size-5 shrink-0 items-center justify-center',
          variant === 'brutal'
            ? 'border-[2px] border-[var(--color-fg-base)]'
            : 'border border-[var(--color-border-strong)]',
          active && 'bg-[var(--color-fg-base)]'
        )}
      >
        {active && (
          <span className="size-2 bg-[var(--color-bg-elevated)]" />
        )}
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className={cn(
        'relative inline-flex size-5 shrink-0 items-center justify-center rounded-full border-2',
        active
          ? variant === 'material'
            ? 'border-[oklch(54%_0.22_265)]'
            : 'border-[var(--color-fg-base)]'
          : 'border-[var(--color-border-strong)]'
      )}
    >
      {active && (
        <span
          className={cn(
            'size-2.5 rounded-full',
            variant === 'material'
              ? 'bg-[oklch(54%_0.22_265)]'
              : 'bg-[var(--color-fg-base)]'
          )}
        />
      )}
    </span>
  );
}
