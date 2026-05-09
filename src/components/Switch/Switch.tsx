import { forwardRef } from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';
import { cn } from '../../utils/cn';

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  size?: 'sm' | 'md' | 'lg';
  /** Color when checked. Defaults to brand accent. */
  tone?: 'accent' | 'success' | 'warning' | 'danger';
}

const sizes = {
  sm: { root: 'h-5  w-9  p-[2px]', thumb: 'size-4 data-[state=checked]:translate-x-4' },
  md: { root: 'h-6  w-11 p-[2px]', thumb: 'size-5 data-[state=checked]:translate-x-5' },
  lg: { root: 'h-7  w-[3.25rem] p-[2px]', thumb: 'size-6 data-[state=checked]:translate-x-6' },
};

const tones = {
  accent:  'data-[state=checked]:bg-[var(--color-accent-base)]',
  success: 'data-[state=checked]:bg-[var(--color-success)]',
  warning: 'data-[state=checked]:bg-[var(--color-warning)]',
  danger:  'data-[state=checked]:bg-[var(--color-danger)]',
};

export const Switch = forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  SwitchProps
>(function Switch({ className, size = 'md', tone = 'accent', ...rest }, ref) {
  const { root, thumb } = sizes[size];

  return (
    <RadixSwitch.Root
      ref={ref}
      className={cn(
        'relative inline-flex shrink-0 items-center',
        root,
        'rounded-full',
        'bg-[var(--color-border-strong)]',
        'transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)]',
        'cursor-pointer',
        'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]',
        tones[tone],
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...rest}
    >
      <RadixSwitch.Thumb
        className={cn(
          'pointer-events-none block rounded-full bg-white',
          'shadow-[0_1px_2px_rgb(0_0_0_/_0.20),0_2px_4px_-1px_rgb(0_0_0_/_0.10)]',
          'transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)]',
          'will-change-transform',
          thumb
        )}
      />
    </RadixSwitch.Root>
  );
});
