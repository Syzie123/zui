import { forwardRef } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'size-4',
  md: 'size-[1.125rem]',
  lg: 'size-5',
};

const iconSize = { sm: 'size-3', md: 'size-3.5', lg: 'size-4' };

export const Checkbox = forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(function Checkbox({ className, size = 'md', ...rest }, ref) {
  return (
    <RadixCheckbox.Root
      ref={ref}
      className={cn(
        'peer inline-flex shrink-0 items-center justify-center',
        sizeClasses[size],
        'rounded-[var(--radius-sm)]',
        'bg-[var(--color-bg-elevated)]',
        'border border-[var(--color-border-strong)]',
        'shadow-[var(--shadow-xs)]',
        'transition-[background-color,border-color,box-shadow]',
        'duration-[var(--duration-fast)] ease-[var(--ease-out)]',
        'cursor-pointer',
        // hover
        'hover:border-[var(--color-accent-base)]',
        // focus
        'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]',
        // checked
        'data-[state=checked]:bg-[var(--color-accent-base)]',
        'data-[state=checked]:border-[var(--color-accent-base)]',
        'data-[state=checked]:text-white',
        // indeterminate
        'data-[state=indeterminate]:bg-[var(--color-accent-base)]',
        'data-[state=indeterminate]:border-[var(--color-accent-base)]',
        'data-[state=indeterminate]:text-white',
        // disabled
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...rest}
    >
      <RadixCheckbox.Indicator className="grid place-items-center">
        {(rest.checked === 'indeterminate') ? (
          <Minus className={cn(iconSize[size], 'stroke-[3]')} />
        ) : (
          <Check className={cn(iconSize[size], 'stroke-[3]')} />
        )}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
});
