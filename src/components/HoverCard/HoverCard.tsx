import { forwardRef } from 'react';
import * as RadixHoverCard from '@radix-ui/react-hover-card';
import { cn } from '../../utils/cn';

const Root    = RadixHoverCard.Root;
const Trigger = RadixHoverCard.Trigger;
const Portal  = RadixHoverCard.Portal;

const Content = forwardRef<
  React.ElementRef<typeof RadixHoverCard.Content>,
  React.ComponentPropsWithoutRef<typeof RadixHoverCard.Content>
>(function HoverCardContent(
  { className, align = 'center', sideOffset = 8, ...rest },
  ref
) {
  return (
    <RadixHoverCard.Portal>
      <RadixHoverCard.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-[var(--z-overlay)] outline-none',
          'w-72 p-4',
          'rounded-[var(--radius-xl)] bg-[var(--color-bg-elevated)]',
          'border border-[var(--color-border-base)]',
          'shadow-[var(--shadow-xl)]',
          'text-sm text-[var(--color-fg-base)]',
          'data-[state=open]:animate-[zui-enter_var(--duration-base)_var(--ease-out)]',
          'data-[state=closed]:animate-[zui-exit_var(--duration-fast)_var(--ease-in)]',
          'data-[side=top]:origin-bottom',
          'data-[side=bottom]:origin-top',
          className
        )}
        {...rest}
      />
    </RadixHoverCard.Portal>
  );
});

export const HoverCard = Object.assign(Root, {
  Trigger,
  Content,
  Portal,
});
