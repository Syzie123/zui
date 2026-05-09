import { forwardRef } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cn } from '../../utils/cn';

/**
 * Wrap your app or section in `<Tooltip.Provider>` once.
 * Sets a shared delay/skip behaviour for all tooltips inside.
 */
const Provider = forwardRef<
  React.ElementRef<typeof RadixTooltip.Provider>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Provider>
>(function TooltipProvider(props, _ref) {
  return <RadixTooltip.Provider delayDuration={250} skipDelayDuration={150} {...props} />;
});

const Root    = RadixTooltip.Root;
const Trigger = RadixTooltip.Trigger;
const Portal  = RadixTooltip.Portal;

const Content = forwardRef<
  React.ElementRef<typeof RadixTooltip.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>
>(function TooltipContent(
  { className, sideOffset = 6, side = 'top', ...rest },
  ref
) {
  return (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        ref={ref}
        side={side}
        sideOffset={sideOffset}
        className={cn(
          'z-[var(--z-tooltip)] select-none',
          'px-2.5 py-1.5',
          'rounded-[var(--radius-md)]',
          'bg-[var(--color-bg-inverse)] text-[var(--color-fg-on-inverse)]',
          'text-xs font-medium leading-tight',
          'shadow-[var(--shadow-md)]',
          'data-[state=delayed-open]:animate-[zui-enter_150ms_var(--ease-out)]',
          'data-[state=closed]:animate-[zui-exit_120ms_var(--ease-in)]',
          'data-[side=top]:origin-bottom',
          'data-[side=bottom]:origin-top',
          'data-[side=left]:origin-right',
          'data-[side=right]:origin-left',
          className
        )}
        {...rest}
      />
    </RadixTooltip.Portal>
  );
});

const Arrow = forwardRef<
  React.ElementRef<typeof RadixTooltip.Arrow>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Arrow>
>(function TooltipArrow({ className, ...rest }, ref) {
  return (
    <RadixTooltip.Arrow
      ref={ref}
      width={10}
      height={5}
      className={cn('fill-[var(--color-bg-inverse)]', className)}
      {...rest}
    />
  );
});

/**
 * Convenience wrapper — `<Tooltip content="Help text"><Button/></Tooltip>`.
 * Use the compound API for richer content.
 */
type SimpleTooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: RadixTooltip.TooltipContentProps['side'];
  align?: RadixTooltip.TooltipContentProps['align'];
  delay?: number;
};

const Simple = ({ content, children, side, align, delay = 250 }: SimpleTooltipProps) => (
  <Root delayDuration={delay}>
    <Trigger asChild>{children}</Trigger>
    <Content side={side} align={align}>
      {content}
    </Content>
  </Root>
);

export const Tooltip = Object.assign(Root, {
  Provider,
  Trigger,
  Content,
  Portal,
  Arrow,
  Simple,
});
