import { cn } from '../../utils/cn';

export interface PriceTagProps {
  /** Current price (string so callers control formatting/locale). */
  price: string;
  /** Original price shown with strikethrough — when present, indicates a sale. */
  original?: string;
  /** Currency or unit (e.g. "$", "/mo"). Inline before/after the price. */
  prefix?: string;
  suffix?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
  xl: 'text-3xl',
};

export function PriceTag({
  price,
  original,
  prefix,
  suffix,
  size = 'md',
  className,
}: PriceTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline gap-2 font-display tracking-[-0.02em]',
        className
      )}
    >
      <span className={cn('font-semibold', sizes[size])}>
        {prefix}
        {price}
        {suffix}
      </span>
      {original && (
        <span className="text-sm font-medium text-[var(--color-fg-subtle)] line-through">
          {prefix}
          {original}
        </span>
      )}
    </span>
  );
}
