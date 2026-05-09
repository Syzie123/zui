import { forwardRef } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { cn } from '../../utils/cn';

const Root    = RadixPopover.Root;
const Trigger = RadixPopover.Trigger;
const Anchor  = RadixPopover.Anchor;
const Close   = RadixPopover.Close;
const Portal  = RadixPopover.Portal;

const Content = forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  React.ComponentPropsWithoutRef<typeof RadixPopover.Content>
>(function PopoverContent(
  { className, align = 'center', sideOffset = 8, ...rest },
  ref
) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-[var(--z-overlay)] outline-none',
          'min-w-[10rem] max-w-[calc(100vw-2rem)] p-4',
          'rounded-[var(--radius-xl)] bg-[var(--color-bg-elevated)]',
          'border border-[var(--color-border-base)]',
          'shadow-[var(--shadow-xl)]',
          'text-sm text-[var(--color-fg-base)]',
          // Animations driven by data-state — translate per side, no jank
          'data-[state=open]:animate-[zui-enter_var(--duration-base)_var(--ease-out)]',
          'data-[state=closed]:animate-[zui-exit_var(--duration-fast)_var(--ease-in)]',
          'data-[side=top]:origin-bottom',
          'data-[side=bottom]:origin-top',
          'data-[side=left]:origin-right',
          'data-[side=right]:origin-left',
          className
        )}
        {...rest}
      />
    </RadixPopover.Portal>
  );
});

const Arrow = forwardRef<
  React.ElementRef<typeof RadixPopover.Arrow>,
  React.ComponentPropsWithoutRef<typeof RadixPopover.Arrow>
>(function PopoverArrow({ className, ...rest }, ref) {
  return (
    <RadixPopover.Arrow
      ref={ref}
      width={12}
      height={6}
      className={cn('fill-[var(--color-bg-elevated)]', className)}
      {...rest}
    />
  );
});

export const Popover = Object.assign(Root, {
  Trigger,
  Content,
  Anchor,
  Close,
  Portal,
  Arrow,
});
