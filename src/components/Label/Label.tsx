import { forwardRef } from 'react';
import * as RadixLabel from '@radix-ui/react-label';
import { cn } from '../../utils/cn';

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof RadixLabel.Root> {
  /** Show a red asterisk for required fields. */
  required?: boolean;
  /** Optional helper rendered to the right (e.g. "(optional)"). */
  hint?: React.ReactNode;
}

export const Label = forwardRef<
  React.ElementRef<typeof RadixLabel.Root>,
  LabelProps
>(function Label({ className, children, required, hint, ...rest }, ref) {
  return (
    <RadixLabel.Root
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1.5',
        'text-sm font-medium text-[var(--color-fg-base)]',
        'leading-none select-none',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-60',
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      {required && (
        <span className="text-[var(--color-danger)]" aria-hidden>
          *
        </span>
      )}
      {hint && (
        <span className="text-xs font-normal text-[var(--color-fg-subtle)]">
          {hint}
        </span>
      )}
    </RadixLabel.Root>
  );
});
