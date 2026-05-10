import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import './Button.css';

const buttonStyles = cva(
  [
    // layout
    'relative inline-flex items-center justify-center gap-2',
    'font-medium whitespace-nowrap select-none',
    'cursor-pointer',
    // typography
    'tracking-[-0.01em]',
    // motion — transform/box-shadow only (cheap)
    'transition-[transform,box-shadow,background-color,color,opacity]',
    'duration-[var(--duration-fast)] ease-[var(--ease-out)]',
    // focus
    'focus-visible:outline-none',
    'focus-visible:shadow-[var(--shadow-focus)]',
    // disabled
    'disabled:opacity-50 disabled:pointer-events-none',
    // press feedback (subtle, no jank)
    'active:scale-[0.98]',
    'will-change-transform',
  ],
  {
    variants: {
      variant: {
        primary: ['btn-primary-purple'],
        secondary: [
          'bg-[var(--color-bg-elevated)] text-[var(--color-fg-base)]',
          'border border-[var(--color-border-base)]',
          'hover:bg-[var(--color-bg-subtle)] hover:border-[var(--color-border-strong)]',
        ],
        ghost: [
          'bg-transparent text-[var(--color-fg-base)]',
          'hover:bg-[var(--color-bg-subtle)]',
        ],
        destructive: [
          'bg-[var(--color-danger)] text-white',
          'shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.10)]',
          'hover:bg-[var(--color-danger-hover)]',
        ],
        outline: [
          'bg-transparent text-[var(--color-fg-base)]',
          'border border-[var(--color-border-strong)]',
          'hover:bg-[var(--color-bg-subtle)]',
        ],
        soft: [
          'bg-[var(--color-accent-soft)] text-[var(--color-accent-base)]',
          'hover:bg-[color-mix(in_oklch,var(--color-accent-soft)_70%,var(--color-accent-base)_5%)]',
        ],
        gradient: ['btn-gradient'],
        link: [
          'bg-transparent text-[var(--color-accent-base)]',
          'underline-offset-4 hover:underline',
          'h-auto px-0 py-0',
        ],
        luminous: ['btn-luminous'],
      },
      size: {
        sm: 'h-8  px-3 text-sm rounded-[var(--radius-md)]',
        md: 'h-10 px-4 text-sm rounded-[var(--radius-lg)]',
        lg: 'h-12 px-6 text-base rounded-[var(--radius-lg)]',
        xl: 'h-14 px-8 text-base rounded-[var(--radius-xl)]',
        icon: 'size-10 rounded-[var(--radius-lg)]',
        'icon-sm': 'size-8 rounded-[var(--radius-md)]',
      },
      fullWidth: { true: 'w-full', false: '' },
    },
    compoundVariants: [
      // luminous & gradient share the rounded-pill personality
      { variant: 'luminous', size: 'sm', className: 'h-9  px-4  text-sm  rounded-[var(--radius-full)]' },
      { variant: 'luminous', size: 'md', className: 'h-11 px-6  text-sm  rounded-[var(--radius-full)]' },
      { variant: 'luminous', size: 'lg', className: 'h-14 px-8  text-base rounded-[var(--radius-full)]' },
      { variant: 'luminous', size: 'xl', className: 'h-16 px-10 text-lg  rounded-[var(--radius-full)]' },
      { variant: 'gradient', size: 'sm', className: 'h-9  px-4  text-sm  rounded-[var(--radius-full)]' },
      { variant: 'gradient', size: 'md', className: 'h-11 px-6  text-sm  rounded-[var(--radius-full)]' },
      { variant: 'gradient', size: 'lg', className: 'h-14 px-8  text-base rounded-[var(--radius-full)]' },
    ],
    defaultVariants: { variant: 'primary', size: 'md', fullWidth: false },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant,
      size,
      fullWidth,
      asChild,
      loading,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...rest
    },
    ref
  ) {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;

    return (
      <Comp
        ref={ref}
        className={cn(buttonStyles({ variant, size, fullWidth }), className)}
        disabled={isDisabled}
        data-loading={loading ? '' : undefined}
        {...rest}
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-[zui-spin_0.7s_linear_infinite]" aria-hidden />
            <span className="sr-only">Loading</span>
            <span className="opacity-90">{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="-ml-0.5 inline-flex shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="-mr-0.5 inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);
