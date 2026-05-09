import { forwardRef } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

const Root    = RadixDialog.Root;
const Trigger = RadixDialog.Trigger;
const Portal  = RadixDialog.Portal;
const Close   = RadixDialog.Close;

const Overlay = forwardRef<
  React.ElementRef<typeof RadixDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(function DialogOverlay({ className, ...rest }, ref) {
  return (
    <RadixDialog.Overlay
      ref={ref}
      className={cn(
        'fixed inset-0 z-[var(--z-modal)]',
        'bg-[oklch(15%_0.015_270/0.50)]',
        'backdrop-blur-[2px]',
        'data-[state=open]:animate-[zui-overlay-in_var(--duration-base)_var(--ease-out)]',
        'data-[state=closed]:animate-[zui-overlay-out_var(--duration-fast)_var(--ease-in)]',
        className
      )}
      {...rest}
    />
  );
});

const Content = forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content> & {
    /** Show the default top-right close button. Default true. */
    showCloseButton?: boolean;
  }
>(function DialogContent(
  { className, children, showCloseButton = true, ...rest },
  ref
) {
  return (
    <RadixDialog.Portal>
      <Overlay />
      <RadixDialog.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-[var(--z-modal)]',
          '-translate-x-1/2 -translate-y-1/2',
          'w-[calc(100vw-2rem)] max-w-md',
          'max-h-[calc(100vh-4rem)] overflow-auto zui-scroll',
          'p-6',
          'rounded-[var(--radius-xl)] bg-[var(--color-bg-elevated)]',
          'border border-[var(--color-border-base)]',
          'shadow-[var(--shadow-2xl)]',
          'outline-none',
          'data-[state=open]:animate-[zui-dialog-in_var(--duration-slow)_var(--ease-out)]',
          'data-[state=closed]:animate-[zui-dialog-out_var(--duration-base)_var(--ease-in)]',
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
              'transition-colors duration-[var(--duration-fast)]',
              'hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg-base)]',
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

const Header = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col gap-1.5 pb-4 pr-8', className)}
    {...rest}
  />
);

const Footer = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse gap-2 pt-6',
      'sm:flex-row sm:justify-end sm:gap-3',
      className
    )}
    {...rest}
  />
);

const Title = forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(function DialogTitle({ className, ...rest }, ref) {
  return (
    <RadixDialog.Title
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-tight tracking-[-0.02em]',
        'text-[var(--color-fg-base)]',
        className
      )}
      {...rest}
    />
  );
});

const Description = forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(function DialogDescription({ className, ...rest }, ref) {
  return (
    <RadixDialog.Description
      ref={ref}
      className={cn(
        'text-sm leading-relaxed text-[var(--color-fg-muted)]',
        className
      )}
      {...rest}
    />
  );
});

export const Dialog = Object.assign(Root, {
  Trigger,
  Portal,
  Close,
  Overlay,
  Content,
  Header,
  Footer,
  Title,
  Description,
});
