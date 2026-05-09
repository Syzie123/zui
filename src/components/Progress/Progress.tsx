import { forwardRef } from 'react';
import * as RadixProgress from '@radix-ui/react-progress';
import { cn } from '../../utils/cn';

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof RadixProgress.Root> {
  /** When undefined or `null`, renders an indeterminate animation. */
  value?: number | null;
  /** Bar height — sm: 4px, md: 6px, lg: 8px. */
  size?: 'sm' | 'md' | 'lg';
  /** Color tone for the bar. */
  tone?: 'accent' | 'success' | 'warning' | 'danger';
}

const sizes = { sm: 'h-1', md: 'h-1.5', lg: 'h-2' };

const tones = {
  accent:  'bg-[var(--color-accent-base)]',
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  danger:  'bg-[var(--color-danger)]',
};

export const Progress = forwardRef<
  React.ElementRef<typeof RadixProgress.Root>,
  ProgressProps
>(function Progress(
  { className, value, size = 'md', tone = 'accent', max = 100, ...rest },
  ref
) {
  const isIndeterminate = value === undefined || value === null;
  const pct = isIndeterminate ? 0 : Math.min(Math.max(value, 0), max) / max;

  return (
    <RadixProgress.Root
      ref={ref}
      value={isIndeterminate ? null : value}
      max={max}
      className={cn(
        'relative w-full overflow-hidden',
        'rounded-full bg-[var(--color-bg-muted)]',
        sizes[size],
        className
      )}
      {...rest}
    >
      {isIndeterminate ? (
        <span
          className={cn(
            'absolute inset-y-0 left-0 w-full origin-left',
            'animate-[zui-progress-indeterminate_1.4s_ease-in-out_infinite]',
            'rounded-full will-change-transform',
            tones[tone]
          )}
        />
      ) : (
        <RadixProgress.Indicator
          className={cn(
            'h-full origin-left rounded-full',
            'transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)]',
            'will-change-transform',
            tones[tone]
          )}
          style={{ transform: `scaleX(${pct})` }}
        />
      )}
    </RadixProgress.Root>
  );
});
