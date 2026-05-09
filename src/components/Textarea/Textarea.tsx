import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, invalid, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          'block w-full min-h-24 px-3 py-2.5',
          'text-sm leading-relaxed',
          'bg-[var(--color-bg-elevated)]',
          'border border-[var(--color-border-base)]',
          'rounded-[var(--radius-lg)]',
          'shadow-[var(--shadow-xs)]',
          'placeholder:text-[var(--color-fg-subtle)]',
          'outline-none resize-y',
          'transition-[box-shadow,border-color] duration-[var(--duration-fast)] ease-[var(--ease-out)]',
          'hover:border-[var(--color-border-strong)]',
          'focus-visible:border-[var(--color-accent-base)]',
          'focus-visible:shadow-[var(--shadow-focus)]',
          'disabled:opacity-60 disabled:bg-[var(--color-bg-subtle)] disabled:cursor-not-allowed',
          'zui-scroll',
          invalid && [
            'border-[var(--color-danger)]',
            'focus-visible:border-[var(--color-danger)]',
            'focus-visible:shadow-[var(--shadow-focus-error)]',
          ],
          className
        )}
        {...rest}
      />
    );
  }
);
