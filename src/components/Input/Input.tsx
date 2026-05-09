import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputWrapperStyles = cva(
  [
    'group relative inline-flex items-center w-full',
    'bg-[var(--color-bg-elevated)]',
    'border border-[var(--color-border-base)]',
    'shadow-[var(--shadow-xs)]',
    'transition-[box-shadow,border-color,background-color]',
    'duration-[var(--duration-fast)] ease-[var(--ease-out)]',
    'has-[input:hover]:border-[var(--color-border-strong)]',
    'has-[input:focus-visible]:border-[var(--color-accent-base)]',
    'has-[input:focus-visible]:shadow-[var(--shadow-focus)]',
    'has-[input:disabled]:opacity-60 has-[input:disabled]:bg-[var(--color-bg-subtle)]',
    'has-[input:disabled]:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: 'h-8  text-sm  rounded-[var(--radius-md)] px-2.5',
        md: 'h-10 text-sm  rounded-[var(--radius-lg)] px-3',
        lg: 'h-12 text-base rounded-[var(--radius-lg)] px-4',
      },
      invalid: {
        true: [
          'border-[var(--color-danger)]',
          'has-[input:focus-visible]:shadow-[var(--shadow-focus-error)]',
          'has-[input:focus-visible]:border-[var(--color-danger)]',
        ],
        false: '',
      },
    },
    defaultVariants: { size: 'md', invalid: false },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>,
    VariantProps<typeof inputWrapperStyles> {
  /** Element rendered inside the field, before the input. */
  prefix?: ReactNode;
  /** Element rendered inside the field, after the input. */
  suffix?: ReactNode;
  /** Marks the input as invalid (red border, red focus ring). */
  invalid?: boolean;
  /** Class for the outer wrapper (border / sizing). */
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { className, wrapperClassName, size, invalid, prefix, suffix, type = 'text', ...rest },
    ref
  ) {
    return (
      <div className={cn(inputWrapperStyles({ size, invalid }), wrapperClassName)}>
        {prefix && (
          <span className="flex shrink-0 items-center pr-2 text-[var(--color-fg-subtle)]">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          aria-invalid={invalid || undefined}
          className={cn(
            'min-w-0 grow bg-transparent outline-none',
            'placeholder:text-[var(--color-fg-subtle)]',
            'disabled:cursor-not-allowed',
            // remove number spinner artifacts
            '[&::-webkit-inner-spin-button]:appearance-none',
            '[&::-webkit-outer-spin-button]:appearance-none',
            className
          )}
          {...rest}
        />
        {suffix && (
          <span className="flex shrink-0 items-center pl-2 text-[var(--color-fg-subtle)]">
            {suffix}
          </span>
        )}
      </div>
    );
  }
);
