import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import './Card.css';

const cardStyles = cva(
  [
    'relative flex flex-col isolate',
    'bg-[var(--color-bg-elevated)]',
    'rounded-[var(--radius-2xl)]',
    'transition-[transform,box-shadow,border-color]',
    'duration-[var(--duration-base)] ease-[var(--ease-out)]',
  ],
  {
    variants: {
      variant: {
        flat:     'border border-[var(--color-border-base)]',
        elevated: 'border border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)]',
        outline:  'border border-[var(--color-border-strong)]',
        ghost:    'border border-transparent bg-transparent',
        gradient: [
          'border border-[var(--color-border-base)]',
          'bg-[radial-gradient(80%_60%_at_0%_0%,var(--color-accent-soft)_0%,transparent_60%),var(--color-bg-elevated)]',
          'shadow-[var(--shadow-sm)]',
        ],
        glow: [
          'border border-[var(--color-accent-base)]/30',
          'shadow-[0_0_0_1px_var(--color-accent-base)/30,0_24px_48px_-16px_var(--color-accent-base)/30]',
          'bg-[radial-gradient(120%_80%_at_50%_0%,var(--color-accent-soft)_0%,transparent_55%),var(--color-bg-elevated)]',
        ],
        glass: ['card-glass'],
        dotted: ['card-dotted'],
        featured: ['card-featured'],
      },
      interactive: {
        true: [
          'cursor-pointer overflow-hidden',
          'hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5',
          'hover:border-[var(--color-border-strong)]',
          'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]',
          // shine sweep on hover
          'after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none',
          'after:bg-[linear-gradient(100deg,transparent_30%,rgb(255_255_255_/_0.06)_50%,transparent_70%)]',
          'after:translate-x-[-100%]',
          'after:transition-transform after:duration-[1000ms] after:ease-[var(--ease-out)]',
          'hover:after:translate-x-[100%]',
        ],
        false: '',
      },
    },
    defaultVariants: { variant: 'elevated', interactive: false },
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardStyles> {}

const Root = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant, interactive, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(cardStyles({ variant, interactive }), className)}
      {...rest}
    />
  );
});

const Header = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-1.5 p-6 pb-4', className)}
        {...rest}
      />
    );
  }
);

const Title = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, ...rest }, ref) {
    return (
      <h3
        ref={ref}
        className={cn(
          'text-lg font-semibold leading-tight tracking-[-0.02em]',
          'text-[var(--color-fg-base)]',
          className
        )}
        {...rest}
      />
    );
  }
);

const Description = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function CardDescription({ className, ...rest }, ref) {
    return (
      <p
        ref={ref}
        className={cn(
          'text-sm leading-relaxed text-[var(--color-fg-muted)]',
          className
        )}
        {...rest}
      />
    );
  }
);

const Content = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, ...rest }, ref) {
    return <div ref={ref} className={cn('p-6 pt-0', className)} {...rest} />;
  }
);

const Footer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 p-6 pt-4',
          'border-t border-[var(--color-border-subtle)]',
          className
        )}
        {...rest}
      />
    );
  }
);

export const Card = Object.assign(Root, {
  Header,
  Title,
  Description,
  Content,
  Footer,
});
