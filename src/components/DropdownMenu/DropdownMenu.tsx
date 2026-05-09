import { forwardRef } from 'react';
import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '../../utils/cn';

const Root         = RadixMenu.Root;
const Trigger      = RadixMenu.Trigger;
const Group        = RadixMenu.Group;
const Portal       = RadixMenu.Portal;
const Sub          = RadixMenu.Sub;
const RadioGroup   = RadixMenu.RadioGroup;

const itemBase = [
  'relative flex select-none items-center gap-2',
  'cursor-pointer outline-none',
  'rounded-[var(--radius-md)]',
  'px-2 py-1.5 text-sm',
  'text-[var(--color-fg-base)]',
  'transition-colors duration-[var(--duration-instant)]',
  'data-[highlighted]:bg-[var(--color-bg-subtle)]',
  'data-[disabled]:text-[var(--color-fg-subtle)]',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-60',
] as const;

const Content = forwardRef<
  React.ElementRef<typeof RadixMenu.Content>,
  React.ComponentPropsWithoutRef<typeof RadixMenu.Content>
>(function DropdownMenuContent(
  { className, sideOffset = 6, align = 'start', ...rest },
  ref
) {
  return (
    <RadixMenu.Portal>
      <RadixMenu.Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        className={cn(
          'z-[var(--z-overlay)] outline-none',
          'min-w-[12rem] overflow-hidden',
          'rounded-[var(--radius-lg)] p-1',
          'bg-[var(--color-bg-elevated)]',
          'border border-[var(--color-border-base)]',
          'shadow-[var(--shadow-lg)]',
          'data-[state=open]:animate-[zui-enter_var(--duration-base)_var(--ease-out)]',
          'data-[state=closed]:animate-[zui-exit_var(--duration-fast)_var(--ease-in)]',
          'data-[side=top]:origin-bottom',
          'data-[side=bottom]:origin-top',
          className
        )}
        {...rest}
      />
    </RadixMenu.Portal>
  );
});

const Item = forwardRef<
  React.ElementRef<typeof RadixMenu.Item>,
  React.ComponentPropsWithoutRef<typeof RadixMenu.Item> & { destructive?: boolean }
>(function DropdownMenuItem({ className, destructive, ...rest }, ref) {
  return (
    <RadixMenu.Item
      ref={ref}
      className={cn(
        ...itemBase,
        destructive &&
          'text-[var(--color-danger)] data-[highlighted]:bg-[var(--color-danger-soft)]',
        className
      )}
      {...rest}
    />
  );
});

const CheckboxItem = forwardRef<
  React.ElementRef<typeof RadixMenu.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof RadixMenu.CheckboxItem>
>(function DropdownMenuCheckboxItem({ className, children, ...rest }, ref) {
  return (
    <RadixMenu.CheckboxItem
      ref={ref}
      className={cn(...itemBase, 'pl-7', className)}
      {...rest}
    >
      <span className="absolute left-1.5 inline-flex size-4 items-center justify-center">
        <RadixMenu.ItemIndicator>
          <Check className="size-3.5" />
        </RadixMenu.ItemIndicator>
      </span>
      {children}
    </RadixMenu.CheckboxItem>
  );
});

const RadioItem = forwardRef<
  React.ElementRef<typeof RadixMenu.RadioItem>,
  React.ComponentPropsWithoutRef<typeof RadixMenu.RadioItem>
>(function DropdownMenuRadioItem({ className, children, ...rest }, ref) {
  return (
    <RadixMenu.RadioItem
      ref={ref}
      className={cn(...itemBase, 'pl-7', className)}
      {...rest}
    >
      <span className="absolute left-1.5 inline-flex size-4 items-center justify-center">
        <RadixMenu.ItemIndicator>
          <Circle className="size-2 fill-current" />
        </RadixMenu.ItemIndicator>
      </span>
      {children}
    </RadixMenu.RadioItem>
  );
});

const Label = forwardRef<
  React.ElementRef<typeof RadixMenu.Label>,
  React.ComponentPropsWithoutRef<typeof RadixMenu.Label>
>(function DropdownMenuLabel({ className, ...rest }, ref) {
  return (
    <RadixMenu.Label
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
  React.ElementRef<typeof RadixMenu.Separator>,
  React.ComponentPropsWithoutRef<typeof RadixMenu.Separator>
>(function DropdownMenuSeparator({ className, ...rest }, ref) {
  return (
    <RadixMenu.Separator
      ref={ref}
      className={cn('-mx-1 my-1 h-px bg-[var(--color-border-base)]', className)}
      {...rest}
    />
  );
});

const Shortcut = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      'ml-auto pl-4 text-xs tracking-widest',
      'text-[var(--color-fg-subtle)] font-mono',
      className
    )}
    {...rest}
  />
);

const SubTrigger = forwardRef<
  React.ElementRef<typeof RadixMenu.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof RadixMenu.SubTrigger>
>(function DropdownSubTrigger({ className, children, ...rest }, ref) {
  return (
    <RadixMenu.SubTrigger
      ref={ref}
      className={cn(
        ...itemBase,
        'data-[state=open]:bg-[var(--color-bg-subtle)]',
        className
      )}
      {...rest}
    >
      {children}
      <ChevronRight className="ml-auto size-4 text-[var(--color-fg-subtle)]" />
    </RadixMenu.SubTrigger>
  );
});

const SubContent = forwardRef<
  React.ElementRef<typeof RadixMenu.SubContent>,
  React.ComponentPropsWithoutRef<typeof RadixMenu.SubContent>
>(function DropdownSubContent({ className, ...rest }, ref) {
  return (
    <RadixMenu.SubContent
      ref={ref}
      className={cn(
        'z-[var(--z-overlay)] outline-none',
        'min-w-[10rem] overflow-hidden',
        'rounded-[var(--radius-lg)] p-1',
        'bg-[var(--color-bg-elevated)]',
        'border border-[var(--color-border-base)]',
        'shadow-[var(--shadow-lg)]',
        'data-[state=open]:animate-[zui-enter_var(--duration-base)_var(--ease-out)]',
        'data-[state=closed]:animate-[zui-exit_var(--duration-fast)_var(--ease-in)]',
        className
      )}
      {...rest}
    />
  );
});

export const DropdownMenu = Object.assign(Root, {
  Trigger,
  Group,
  Portal,
  Sub,
  RadioGroup,
  Content,
  Item,
  CheckboxItem,
  RadioItem,
  Label,
  Separator,
  Shortcut,
  SubTrigger,
  SubContent,
});
