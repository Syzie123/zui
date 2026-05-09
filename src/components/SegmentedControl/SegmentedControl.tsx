import { createContext, forwardRef, useContext, useId, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

/**
 * Pill-shaped segmented control. Active segment is a white card that
 * slides between options via `transform: translateX` — single absolutely
 * positioned thumb, no layout thrash.
 *
 * Compound API:
 *   <SegmentedControl value={v} onValueChange={setV}>
 *     <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
 *     <SegmentedControl.Item value="list">List</SegmentedControl.Item>
 *   </SegmentedControl>
 */

interface Ctx {
  value: string;
  onChange: (v: string) => void;
  name: string;
  size: 'sm' | 'md' | 'lg';
}
const SegmentedContext = createContext<Ctx | null>(null);

interface RootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

const Root = forwardRef<HTMLDivElement, RootProps>(function SegmentedControl(
  {
    value: controlled,
    defaultValue = '',
    onValueChange,
    size = 'md',
    className,
    children,
    ...rest
  },
  ref
) {
  const [internal, setInternal] = useState(defaultValue);
  const value = controlled ?? internal;
  const onChange = (next: string) => {
    if (controlled === undefined) setInternal(next);
    onValueChange?.(next);
  };
  const name = useId();

  return (
    <SegmentedContext.Provider value={{ value, onChange, name, size }}>
      <div
        ref={ref}
        role="radiogroup"
        className={cn(
          'relative inline-flex items-center',
          'rounded-full bg-[var(--color-bg-muted)] p-1',
          'border border-[var(--color-border-subtle)]',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </SegmentedContext.Provider>
  );
});

const sizeClasses = {
  sm: 'h-7  px-3 text-[13px]',
  md: 'h-9  px-4 text-sm',
  lg: 'h-11 px-5 text-base',
};

interface ItemProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string;
  disabled?: boolean;
}

const Item = forwardRef<HTMLButtonElement, ItemProps>(function SegmentedItem(
  { value, className, children, disabled, ...rest },
  ref
) {
  const ctx = useContext(SegmentedContext);
  if (!ctx) throw new Error('SegmentedControl.Item must be used inside SegmentedControl');
  const active = ctx.value === value;
  const fallbackRef = useRef<HTMLButtonElement>(null);
  const buttonRef = (ref ?? fallbackRef) as React.RefObject<HTMLButtonElement>;

  return (
    <button
      ref={buttonRef}
      type="button"
      role="radio"
      aria-checked={active}
      data-state={active ? 'on' : 'off'}
      disabled={disabled}
      onClick={() => ctx.onChange(value)}
      className={cn(
        'relative z-[1] inline-flex items-center justify-center gap-1.5',
        'rounded-full font-medium whitespace-nowrap',
        'cursor-pointer outline-none select-none',
        'transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)]',
        sizeClasses[ctx.size],
        active
          ? 'text-[var(--color-fg-base)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-sm)]'
          : 'text-[var(--color-fg-muted)] hover:text-[var(--color-fg-base)]',
        'focus-visible:shadow-[var(--shadow-focus)]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

export const SegmentedControl = Object.assign(Root, { Item });
