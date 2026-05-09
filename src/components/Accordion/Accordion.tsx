import { forwardRef } from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const Root = RadixAccordion.Root;

const Item = forwardRef<
  React.ElementRef<typeof RadixAccordion.Item>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Item>
>(function AccordionItem({ className, ...rest }, ref) {
  return (
    <RadixAccordion.Item
      ref={ref}
      className={cn(
        'border-b border-[var(--color-border-base)] last:border-b-0',
        className
      )}
      {...rest}
    />
  );
});

const Trigger = forwardRef<
  React.ElementRef<typeof RadixAccordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(function AccordionTrigger({ className, children, ...rest }, ref) {
  return (
    <RadixAccordion.Header className="flex">
      <RadixAccordion.Trigger
        ref={ref}
        className={cn(
          'group flex flex-1 items-center justify-between gap-4',
          'py-4 text-left text-sm font-medium',
          'cursor-pointer outline-none',
          'text-[var(--color-fg-base)]',
          'transition-colors duration-[var(--duration-fast)]',
          'hover:text-[var(--color-accent-base)]',
          'focus-visible:shadow-[var(--shadow-focus)] rounded-[var(--radius-sm)]',
          className
        )}
        {...rest}
      >
        {children}
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-[var(--color-fg-subtle)]',
            'transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)]',
            'group-data-[state=open]:rotate-180'
          )}
        />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  );
});

const Content = forwardRef<
  React.ElementRef<typeof RadixAccordion.Content>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(function AccordionContent({ className, children, ...rest }, ref) {
  return (
    <RadixAccordion.Content
      ref={ref}
      className={cn(
        'overflow-hidden',
        'text-sm leading-relaxed text-[var(--color-fg-muted)]',
        'data-[state=open]:animate-[zui-accordion-down_var(--duration-base)_var(--ease-out)]',
        'data-[state=closed]:animate-[zui-accordion-up_var(--duration-base)_var(--ease-in)]'
      )}
      {...rest}
    >
      <div className={cn('pb-4 pt-0', className)}>{children}</div>
    </RadixAccordion.Content>
  );
});

export const Accordion = Object.assign(Root, { Item, Trigger, Content });
