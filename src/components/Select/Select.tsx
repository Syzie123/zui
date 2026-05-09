import { forwardRef } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../utils/cn';

const Root      = RadixSelect.Root;
const Group     = RadixSelect.Group;
const Value     = RadixSelect.Value;
const Portal    = RadixSelect.Portal;

const Trigger = forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger> & {
    size?: 'sm' | 'md' | 'lg';
    invalid?: boolean;
  }
>(function SelectTrigger(
  { className, children, size = 'md', invalid, ...rest },
  ref
) {
  const sizeClasses = {
    sm: 'h-8  text-sm  px-2.5 rounded-[var(--radius-md)]',
    md: 'h-10 text-sm  px-3   rounded-[var(--radius-lg)]',
    lg: 'h-12 text-base px-4   rounded-[var(--radius-lg)]',
  }[size];

  return (
    <RadixSelect.Trigger
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'flex w-full items-center justify-between gap-2',
        sizeClasses,
        'bg-[var(--color-bg-elevated)] text-[var(--color-fg-base)]',
        'border border-[var(--color-border-base)]',
        'shadow-[var(--shadow-xs)]',
        'cursor-pointer outline-none',
        'transition-[border-color,box-shadow,background-color]',
        'duration-[var(--duration-fast)] ease-[var(--ease-out)]',
        'hover:border-[var(--color-border-strong)]',
        'focus-visible:border-[var(--color-accent-base)]',
        'focus-visible:shadow-[var(--shadow-focus)]',
        'data-[placeholder]:text-[var(--color-fg-subtle)]',
        'data-[state=open]:border-[var(--color-accent-base)]',
        'data-[state=open]:shadow-[var(--shadow-focus)]',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        invalid && [
          'border-[var(--color-danger)]',
          'focus-visible:border-[var(--color-danger)]',
          'focus-visible:shadow-[var(--shadow-focus-error)]',
        ],
        className
      )}
      {...rest}
    >
      {children}
      <RadixSelect.Icon asChild>
        <ChevronDown className="size-4 shrink-0 text-[var(--color-fg-subtle)]" />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  );
});

const ScrollUpButton = forwardRef<
  React.ElementRef<typeof RadixSelect.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.ScrollUpButton>
>(function SelectScrollUp({ className, ...rest }, ref) {
  return (
    <RadixSelect.ScrollUpButton
      ref={ref}
      className={cn(
        'flex h-6 cursor-default items-center justify-center',
        'bg-[var(--color-bg-elevated)] text-[var(--color-fg-subtle)]',
        className
      )}
      {...rest}
    >
      <ChevronUp className="size-4" />
    </RadixSelect.ScrollUpButton>
  );
});

const ScrollDownButton = forwardRef<
  React.ElementRef<typeof RadixSelect.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.ScrollDownButton>
>(function SelectScrollDown({ className, ...rest }, ref) {
  return (
    <RadixSelect.ScrollDownButton
      ref={ref}
      className={cn(
        'flex h-6 cursor-default items-center justify-center',
        'bg-[var(--color-bg-elevated)] text-[var(--color-fg-subtle)]',
        className
      )}
      {...rest}
    >
      <ChevronDown className="size-4" />
    </RadixSelect.ScrollDownButton>
  );
});

const Content = forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Content>
>(function SelectContent(
  { className, children, position = 'popper', sideOffset = 6, ...rest },
  ref
) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        ref={ref}
        position={position}
        sideOffset={sideOffset}
        className={cn(
          'relative z-[var(--z-overlay)] overflow-hidden',
          'min-w-[var(--radix-select-trigger-width)] max-h-[min(24rem,var(--radix-select-content-available-height))]',
          'rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)]',
          'border border-[var(--color-border-base)]',
          'shadow-[var(--shadow-lg)]',
          'data-[state=open]:animate-[zui-enter_var(--duration-base)_var(--ease-out)]',
          'data-[state=closed]:animate-[zui-exit_var(--duration-fast)_var(--ease-in)]',
          'data-[side=top]:origin-bottom data-[side=bottom]:origin-top',
          className
        )}
        {...rest}
      >
        <ScrollUpButton />
        <RadixSelect.Viewport className="p-1">
          {children}
        </RadixSelect.Viewport>
        <ScrollDownButton />
      </RadixSelect.Content>
    </RadixSelect.Portal>
  );
});

const Item = forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(function SelectItem({ className, children, ...rest }, ref) {
  return (
    <RadixSelect.Item
      ref={ref}
      className={cn(
        'relative flex select-none items-center gap-2',
        'py-1.5 pl-2 pr-8 text-sm',
        'rounded-[var(--radius-md)]',
        'cursor-pointer outline-none',
        'transition-colors duration-[var(--duration-instant)]',
        'data-[highlighted]:bg-[var(--color-bg-subtle)]',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...rest}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <span className="absolute right-2 inline-flex size-4 items-center justify-center">
        <RadixSelect.ItemIndicator>
          <Check className="size-3.5 text-[var(--color-accent-base)]" />
        </RadixSelect.ItemIndicator>
      </span>
    </RadixSelect.Item>
  );
});

const Label = forwardRef<
  React.ElementRef<typeof RadixSelect.Label>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Label>
>(function SelectLabel({ className, ...rest }, ref) {
  return (
    <RadixSelect.Label
      ref={ref}
      className={cn(
        'px-2 py-1.5 text-xs font-medium uppercase tracking-wider',
        'text-[var(--color-fg-subtle)]',
        className
      )}
      {...rest}
    />
  );
});

const Separator = forwardRef<
  React.ElementRef<typeof RadixSelect.Separator>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Separator>
>(function SelectSeparator({ className, ...rest }, ref) {
  return (
    <RadixSelect.Separator
      ref={ref}
      className={cn('-mx-1 my-1 h-px bg-[var(--color-border-base)]', className)}
      {...rest}
    />
  );
});

export const Select = Object.assign(Root, {
  Group,
  Value,
  Portal,
  Trigger,
  Content,
  Item,
  Label,
  Separator,
  ScrollUpButton,
  ScrollDownButton,
});
