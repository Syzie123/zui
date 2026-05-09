import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../../utils/cn';

/**
 * Pill-shaped segmented control with a sliding thumb. The active item
 * appears under a single absolutely-positioned card that translates
 * + resizes via `transform` and `width`. One paint per change, no
 * layout thrash, hardware-accelerated.
 */

interface Ctx {
  value: string;
  onChange: (v: string) => void;
  size: 'sm' | 'md' | 'lg';
  /** Called by each Item once it has measured its own rect. */
  registerItem: (value: string, el: HTMLButtonElement | null) => void;
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

  const containerRef = useRef<HTMLDivElement | null>(null);
  const items = useRef(new Map<string, HTMLButtonElement>());
  const [thumb, setThumb] = useState<{ left: number; width: number } | null>(
    null
  );
  const [hasMoved, setHasMoved] = useState(false);

  const registerItem = (val: string, el: HTMLButtonElement | null) => {
    if (el) items.current.set(val, el);
    else items.current.delete(val);
  };

  // Position the thumb under the active item. Re-runs when value changes
  // OR when the container resizes (window resize, theme change, etc.).
  const measure = () => {
    const container = containerRef.current;
    const item = items.current.get(value);
    if (!container || !item) {
      setThumb(null);
      return;
    }
    const cRect = container.getBoundingClientRect();
    const iRect = item.getBoundingClientRect();
    setThumb({ left: iRect.left - cRect.left, width: iRect.width });
  };

  useLayoutEffect(() => {
    measure();
    // Mark "has moved" after first paint so the thumb only animates on
    // *changes*, not initial mount.
    const id = requestAnimationFrame(() => setHasMoved(true));
    return () => cancelAnimationFrame(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(container);
    items.current.forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ctxValue: Ctx = { value, onChange, size, registerItem };

  return (
    <SegmentedContext.Provider value={ctxValue}>
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="radiogroup"
        className={cn(
          'relative inline-flex items-center isolate',
          'rounded-full bg-[var(--color-bg-muted)] p-1',
          'border border-[var(--color-border-subtle)]',
          className
        )}
        {...rest}
      >
        {/* Sliding thumb — sits behind the items */}
        {thumb && (
          <span
            aria-hidden
            className={cn(
              'absolute top-1 bottom-1 -z-[1] rounded-full',
              'bg-[var(--color-bg-elevated)]',
              'shadow-[var(--shadow-sm)]',
              hasMoved && 'transition-[transform,width] duration-[260ms] ease-[cubic-bezier(0.32,0.72,0,1)]'
            )}
            style={{
              transform: `translateX(${thumb.left - 4}px)`,
              // -4 because parent has p-1 (4px); thumb is positioned in the inner box
              left: 4,
              width: thumb.width,
            }}
          />
        )}

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
  const localRef = useRef<HTMLButtonElement | null>(null);

  // Register so the parent can measure for the thumb
  useLayoutEffect(() => {
    ctx.registerItem(value, localRef.current);
    return () => ctx.registerItem(value, null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <button
      ref={(node) => {
        localRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }}
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
        'transition-colors duration-[260ms] ease-[cubic-bezier(0.32,0.72,0,1)]',
        sizeClasses[ctx.size],
        active
          ? 'text-[var(--color-fg-base)]'
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
