import { forwardRef } from 'react';
import * as RadixAvatar from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const avatarRoot = cva(
  [
    'relative inline-flex items-center justify-center shrink-0',
    'overflow-hidden rounded-full',
    'bg-[var(--color-bg-muted)] text-[var(--color-fg-muted)]',
    'select-none align-middle',
  ],
  {
    variants: {
      size: {
        xs: 'size-6  text-[0.625rem]',
        sm: 'size-8  text-xs',
        md: 'size-10 text-sm',
        lg: 'size-12 text-base',
        xl: 'size-16 text-lg',
        '2xl': 'size-20 text-xl',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

const statusDot = cva(
  [
    'absolute block rounded-full',
    'border-2 border-[var(--color-bg-base)]',
    'right-0 bottom-0',
  ],
  {
    variants: {
      tone: {
        online:  'bg-[var(--color-success)]',
        offline: 'bg-[var(--color-fg-subtle)]',
        away:    'bg-[var(--color-warning)]',
        busy:    'bg-[var(--color-danger)]',
      },
      size: {
        xs: 'size-1.5',
        sm: 'size-2',
        md: 'size-2.5',
        lg: 'size-3',
        xl: 'size-3.5',
        '2xl': 'size-4',
      },
    },
    defaultVariants: { tone: 'online', size: 'md' },
  }
);

export interface AvatarProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixAvatar.Root>, 'asChild'>,
    VariantProps<typeof avatarRoot> {
  src?: string;
  alt?: string;
  /** Initials shown if image fails / loads. e.g. "AS". */
  fallback?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export const Avatar = forwardRef<
  React.ElementRef<typeof RadixAvatar.Root>,
  AvatarProps
>(function Avatar(
  { className, size, src, alt, fallback, status, ...rest },
  ref
) {
  return (
    <RadixAvatar.Root
      ref={ref}
      className={cn(avatarRoot({ size }), className)}
      {...rest}
    >
      {src && (
        <RadixAvatar.Image
          src={src}
          alt={alt ?? ''}
          className="size-full object-cover"
        />
      )}
      <RadixAvatar.Fallback
        className="flex size-full items-center justify-center font-medium uppercase"
        delayMs={src ? 400 : 0}
      >
        {fallback}
      </RadixAvatar.Fallback>
      {status && <span className={statusDot({ tone: status, size })} />}
    </RadixAvatar.Root>
  );
});

/* ───── Avatar group — overlapping stack ───── */

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** How much each avatar should overlap (in px). Default 8. */
  overlap?: number;
  /** Maximum visible avatars; rest collapsed into "+N". */
  max?: number;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(
    { className, children, overlap = 8, max, ...rest },
    ref
  ) {
    const arr = Array.isArray(children) ? children : [children];
    const visible = max ? arr.slice(0, max) : arr;
    const remainder = max ? Math.max(arr.length - max, 0) : 0;

    return (
      <div
        ref={ref}
        className={cn('flex items-center', className)}
        {...rest}
      >
        {visible.map((child, i) => (
          <div
            key={i}
            style={{ marginLeft: i === 0 ? 0 : -overlap }}
            className="ring-2 ring-[var(--color-bg-base)] rounded-full"
          >
            {child}
          </div>
        ))}
        {remainder > 0 && (
          <div
            style={{ marginLeft: -overlap }}
            className="ring-2 ring-[var(--color-bg-base)] rounded-full"
          >
            <span
              className={cn(
                avatarRoot({ size: 'md' }),
                'bg-[var(--color-bg-elevated)] text-[var(--color-fg-muted)]',
                'border border-[var(--color-border-base)] text-xs font-medium'
              )}
            >
              +{remainder}
            </span>
          </div>
        )}
      </div>
    );
  }
);
