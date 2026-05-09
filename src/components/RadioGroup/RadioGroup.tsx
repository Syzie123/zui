import { forwardRef } from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { cn } from '../../utils/cn';

const Root = forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Root>,
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>
>(function RadioGroupRoot({ className, ...rest }, ref) {
  return (
    <RadixRadioGroup.Root
      ref={ref}
      className={cn('grid gap-2', className)}
      {...rest}
    />
  );
});

const Item = forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Item>,
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Item>
>(function RadioGroupItem({ className, ...rest }, ref) {
  return (
    <RadixRadioGroup.Item
      ref={ref}
      className={cn(
        'aspect-square size-[1.125rem] shrink-0',
        'rounded-full',
        'bg-[var(--color-bg-elevated)]',
        'border border-[var(--color-border-strong)]',
        'shadow-[var(--shadow-xs)]',
        'transition-[border-color,background-color,box-shadow]',
        'duration-[var(--duration-fast)] ease-[var(--ease-out)]',
        'cursor-pointer',
        'hover:border-[var(--color-accent-base)]',
        'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]',
        'data-[state=checked]:border-[var(--color-accent-base)]',
        'data-[state=checked]:bg-[var(--color-accent-base)]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...rest}
    >
      <RadixRadioGroup.Indicator className="flex h-full w-full items-center justify-center">
        <span className="block size-[6px] rounded-full bg-white" />
      </RadixRadioGroup.Indicator>
    </RadixRadioGroup.Item>
  );
});

export const RadioGroup = Object.assign(Root, { Item });
