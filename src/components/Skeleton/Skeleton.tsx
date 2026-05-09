import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const skeletonStyles = cva(
  [
    'block bg-[var(--color-bg-muted)]',
    'animate-[zui-pulse_1.6s_ease-in-out_infinite]',
    'will-change-[opacity]',
  ],
  {
    variants: {
      shape: {
        rect:   'rounded-[var(--radius-md)]',
        text:   'rounded-[var(--radius-sm)] h-4',
        circle: 'rounded-full aspect-square',
      },
    },
    defaultVariants: { shape: 'rect' },
  }
);

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonStyles> {}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton({ className, shape, ...rest }, ref) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(skeletonStyles({ shape }), className)}
        {...rest}
      />
    );
  }
);
