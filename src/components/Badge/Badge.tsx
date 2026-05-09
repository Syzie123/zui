import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeStyles = cva(
  [
    'inline-flex items-center justify-center gap-1',
    'font-medium whitespace-nowrap',
    'transition-[background-color,border-color,color]',
    'duration-[var(--duration-fast)] ease-[var(--ease-out)]',
    'leading-none tracking-[-0.005em]',
  ],
  {
    variants: {
      variant: {
        neutral: [
          'bg-[var(--color-bg-muted)] text-[var(--color-fg-base)]',
          'border border-[var(--color-border-base)]',
        ],
        accent: [
          'bg-[var(--color-accent-soft)] text-[var(--color-accent-base)]',
          'border border-transparent',
        ],
        success: [
          'bg-[var(--color-success-soft)] text-[var(--color-success)]',
          'border border-transparent',
        ],
        warning: [
          'bg-[var(--color-warning-soft)] text-[var(--color-warning)]',
          'border border-transparent',
        ],
        danger: [
          'bg-[var(--color-danger-soft)] text-[var(--color-danger)]',
          'border border-transparent',
        ],
        info: [
          'bg-[var(--color-info-soft)] text-[var(--color-info)]',
          'border border-transparent',
        ],
        outline: [
          'bg-transparent text-[var(--color-fg-base)]',
          'border border-[var(--color-border-strong)]',
        ],
        solid: [
          'bg-[var(--color-fg-base)] text-[var(--color-bg-base)]',
        ],
      },
      shape: {
        pill:   'rounded-full',
        square: 'rounded-[var(--radius-sm)]',
      },
      size: {
        sm: 'h-5 px-1.5 text-[0.6875rem]',
        md: 'h-6 px-2   text-xs',
        lg: 'h-7 px-2.5 text-sm',
      },
    },
    defaultVariants: { variant: 'neutral', shape: 'pill', size: 'md' },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeStyles> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, shape, size, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(badgeStyles({ variant, shape, size }), className)}
      {...rest}
    />
  );
});
