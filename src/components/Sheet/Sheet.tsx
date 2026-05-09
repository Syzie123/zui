import { forwardRef } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

const Root    = RadixDialog.Root;
const Trigger = RadixDialog.Trigger;
const Close   = RadixDialog.Close;

const Title = forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(function SheetTitle({ className, ...rest }, ref) {
  return (
    <RadixDialog.Title
      ref={ref}
      className={cn('text-base font-semibold tracking-[-0.01em]', className)}
      {...rest}
    />
  );
});

const Description = forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(function SheetDescription({ className, ...rest }, ref) {
  return (
    <RadixDialog.Description
      ref={ref}
      className={cn('text-sm text-[var(--color-fg-muted)]', className)}
      {...rest}
    />
  );
});

const Header = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-1.5', className)} {...rest} />
);

const Content = forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content> & {
    side?: 'left' | 'right' | 'top' | 'bottom';
    showCloseButton?: boolean;
  }
>(function SheetContent(
  { className, children, side = 'right', showCloseButton = true, ...rest },
  ref
) {
  const sides = {
    left:   'left-0  top-0 h-full data-[state=open]:slide-in-from-left  data-[state=closed]:slide-out-to-left  border-r',
    right:  'right-0 top-0 h-full data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right border-l',
    top:    'top-0 left-0 w-full data-[state=open]:slide-in-from-top    data-[state=closed]:slide-out-to-top    border-b',
    bottom: 'bottom-0 left-0 w-full data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom border-t',
  }[side];

  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay
        className={cn(
          'fixed inset-0 z-[var(--z-modal)]',
          'bg-[oklch(0%_0_0/0.4)] backdrop-blur-[2px]',
          'data-[state=open]:animate-[zui-overlay-in_var(--duration-base)_var(--ease-out)]',
          'data-[state=closed]:animate-[zui-overlay-out_var(--duration-fast)_var(--ease-in)]'
        )}
      />
      <RadixDialog.Content
        ref={ref}
        className={cn(
          'fixed z-[var(--z-modal)] flex flex-col',
          'bg-[var(--color-bg-elevated)] border-[var(--color-border-base)]',
          'shadow-[var(--shadow-2xl)]',
          'transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)]',
          sides,
          className
        )}
        {...rest}
      >
        {children}
        {showCloseButton && (
          <RadixDialog.Close
            aria-label="Close"
            className={cn(
              'absolute right-3 top-3 inline-flex size-8 items-center justify-center',
              'rounded-[var(--radius-md)] text-[var(--color-fg-muted)]',
              'transition-colors hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg-base)]',
              'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]'
            )}
          >
            <X className="size-4" />
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
});

export const Sheet = Object.assign(Root, {
  Trigger,
  Close,
  Content,
  Header,
  Title,
  Description,
});
