import { forwardRef } from 'react';
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { cn } from '../../utils/cn';

const Root    = RadixAlertDialog.Root;
const Trigger = RadixAlertDialog.Trigger;
const Portal  = RadixAlertDialog.Portal;
const Action  = RadixAlertDialog.Action;
const Cancel  = RadixAlertDialog.Cancel;

const Overlay = forwardRef<
  React.ElementRef<typeof RadixAlertDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Overlay>
>(function AlertDialogOverlay({ className, ...rest }, ref) {
  return (
    <RadixAlertDialog.Overlay
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
  React.ElementRef<typeof RadixAlertDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Content>
>(function AlertDialogContent({ className, ...rest }, ref) {
  return (
    <RadixAlertDialog.Portal>
      <Overlay />
      <RadixAlertDialog.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-[var(--z-modal)]',
          '-translate-x-1/2 -translate-y-1/2',
          'w-[calc(100vw-2rem)] max-w-md',
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
      />
    </RadixAlertDialog.Portal>
  );
});

const Header = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-1.5 pb-4', className)} {...rest} />
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
  React.ElementRef<typeof RadixAlertDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Title>
>(function AlertDialogTitle({ className, ...rest }, ref) {
  return (
    <RadixAlertDialog.Title
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
  React.ElementRef<typeof RadixAlertDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Description>
>(function AlertDialogDescription({ className, ...rest }, ref) {
  return (
    <RadixAlertDialog.Description
      ref={ref}
      className={cn(
        'text-sm leading-relaxed text-[var(--color-fg-muted)]',
        className
      )}
      {...rest}
    />
  );
});

export const AlertDialog = Object.assign(Root, {
  Trigger,
  Portal,
  Overlay,
  Content,
  Header,
  Footer,
  Title,
  Description,
  Action,
  Cancel,
});
