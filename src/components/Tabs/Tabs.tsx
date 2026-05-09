import { forwardRef } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from '../../utils/cn';

const Root = forwardRef<
  React.ElementRef<typeof RadixTabs.Root>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Root>
>(function TabsRoot({ className, ...rest }, ref) {
  return (
    <RadixTabs.Root
      ref={ref}
      className={cn('flex flex-col gap-4', className)}
      {...rest}
    />
  );
});

const List = forwardRef<
  React.ElementRef<typeof RadixTabs.List>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.List> & {
    /** Visual variant. `underline` = bottom-border indicator; `pill` = rounded fill. */
    variant?: 'underline' | 'pill';
  }
>(function TabsList({ className, variant = 'underline', ...rest }, ref) {
  return (
    <RadixTabs.List
      ref={ref}
      data-variant={variant}
      className={cn(
        'inline-flex items-center gap-1',
        variant === 'underline' && [
          'relative border-b border-[var(--color-border-base)]',
        ],
        variant === 'pill' && [
          'rounded-[var(--radius-lg)] bg-[var(--color-bg-muted)] p-1',
        ],
        className
      )}
      {...rest}
    />
  );
});

const Trigger = forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(function TabsTrigger({ className, ...rest }, ref) {
  return (
    <RadixTabs.Trigger
      ref={ref}
      className={cn(
        'relative inline-flex items-center justify-center gap-2',
        'h-9 px-3 text-sm font-medium',
        'cursor-pointer outline-none whitespace-nowrap',
        'text-[var(--color-fg-muted)]',
        'transition-[color,background-color]',
        'duration-[var(--duration-fast)] ease-[var(--ease-out)]',
        'hover:text-[var(--color-fg-base)]',
        'focus-visible:shadow-[var(--shadow-focus)]',
        'disabled:pointer-events-none disabled:opacity-50',
        // Underline variant — uses ::after for the indicator
        '[[data-variant=underline]_&]:rounded-none',
        '[[data-variant=underline]_&]:after:absolute',
        '[[data-variant=underline]_&]:after:left-0',
        '[[data-variant=underline]_&]:after:right-0',
        '[[data-variant=underline]_&]:after:-bottom-px',
        '[[data-variant=underline]_&]:after:h-[2px]',
        '[[data-variant=underline]_&]:after:bg-[var(--color-accent-base)]',
        '[[data-variant=underline]_&]:after:rounded-full',
        '[[data-variant=underline]_&]:after:scale-x-0',
        '[[data-variant=underline]_&]:after:origin-center',
        '[[data-variant=underline]_&]:after:transition-transform',
        '[[data-variant=underline]_&]:after:duration-[var(--duration-base)]',
        '[[data-variant=underline]_&]:after:ease-[var(--ease-out)]',
        '[[data-variant=underline]_&]:data-[state=active]:after:scale-x-100',
        '[[data-variant=underline]_&]:data-[state=active]:text-[var(--color-fg-base)]',
        // Pill variant — rounded background
        '[[data-variant=pill]_&]:rounded-[var(--radius-md)]',
        '[[data-variant=pill]_&]:data-[state=active]:bg-[var(--color-bg-elevated)]',
        '[[data-variant=pill]_&]:data-[state=active]:text-[var(--color-fg-base)]',
        '[[data-variant=pill]_&]:data-[state=active]:shadow-[var(--shadow-xs)]',
        className
      )}
      {...rest}
    />
  );
});

const Content = forwardRef<
  React.ElementRef<typeof RadixTabs.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(function TabsContent({ className, ...rest }, ref) {
  return (
    <RadixTabs.Content
      ref={ref}
      className={cn(
        'outline-none',
        'focus-visible:shadow-[var(--shadow-focus)] focus-visible:rounded-[var(--radius-md)]',
        'data-[state=active]:animate-[zui-enter_var(--duration-base)_var(--ease-out)]',
        className
      )}
      {...rest}
    />
  );
});

export const Tabs = Object.assign(Root, { List, Trigger, Content });
