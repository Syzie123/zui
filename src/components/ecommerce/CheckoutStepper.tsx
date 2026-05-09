import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import { type EcommerceVariant, shellByVariant } from './variant';

export interface StepItem {
  label: string;
  /** Optional icon — overrides the default index/check. */
  icon?: React.ReactNode;
}

export interface CheckoutStepperProps {
  variant?: EcommerceVariant;
  steps: StepItem[];
  /** Index of the active step. Steps before are "complete", after are "upcoming". */
  current: number;
  className?: string;
}

export function CheckoutStepper({
  variant = 'rounded',
  steps,
  current,
  className,
}: CheckoutStepperProps) {
  return (
    <ol
      className={cn(
        'flex w-full max-w-2xl items-center gap-2 px-4 py-3 sm:gap-3',
        shellByVariant[variant],
        className
      )}
    >
      {steps.map((step, i) => {
        const status =
          i < current ? 'complete' : i === current ? 'active' : 'upcoming';
        const isLast = i === steps.length - 1;
        return (
          <li
            key={step.label}
            className="flex flex-1 items-center gap-2 sm:gap-3"
            aria-current={status === 'active' ? 'step' : undefined}
          >
            <div className="flex shrink-0 items-center gap-2">
              <Bullet
                status={status}
                variant={variant}
                index={i + 1}
                icon={step.icon}
              />
              <span
                className={cn(
                  'whitespace-nowrap text-xs font-semibold sm:text-sm',
                  status === 'active'
                    ? 'text-[var(--color-fg-base)]'
                    : status === 'complete'
                      ? 'text-[var(--color-fg-base)]'
                      : 'text-[var(--color-fg-subtle)]'
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <span
                aria-hidden
                className={cn(
                  'mx-1 h-[2px] flex-1',
                  status === 'complete' || status === 'active'
                    ? variant === 'material'
                      ? 'bg-[oklch(54%_0.22_265)]'
                      : 'bg-[var(--color-fg-base)]'
                    : 'bg-[var(--color-border-base)]',
                  variant === 'rounded' && 'rounded-full'
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Bullet({
  status,
  variant,
  index,
  icon,
}: {
  status: 'complete' | 'active' | 'upcoming';
  variant: EcommerceVariant;
  index: number;
  icon?: React.ReactNode;
}) {
  const isFilled = status === 'complete' || status === 'active';
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex size-7 shrink-0 items-center justify-center text-xs font-bold',
        // Shape per variant
        variant === 'rounded' && 'rounded-full',
        variant === 'square' && 'rounded-none',
        variant === 'material' && 'rounded-full',
        variant === 'brutal' && 'rounded-none border-[2px] border-[var(--color-fg-base)]',
        // State
        isFilled
          ? variant === 'material'
            ? 'bg-[oklch(54%_0.22_265)] text-white'
            : variant === 'brutal'
              ? 'bg-[oklch(86%_0.18_140)] text-[var(--color-fg-base)]'
              : 'bg-[var(--color-fg-base)] text-[var(--color-bg-base)]'
          : variant === 'brutal'
            ? 'bg-[var(--color-bg-elevated)] text-[var(--color-fg-subtle)]'
            : 'border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] text-[var(--color-fg-subtle)]'
      )}
    >
      {status === 'complete' ? (
        <Check className="size-4 stroke-[3]" />
      ) : (
        icon ?? index
      )}
    </span>
  );
}
