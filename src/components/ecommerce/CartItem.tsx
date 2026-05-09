import { Trash2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import {
  type EcommerceVariant,
  shellByVariant,
  innerRadiusByVariant,
} from './variant';
import { QuantityStepper } from './QuantityStepper';
import { PriceTag } from './PriceTag';

export interface CartItemProps {
  variant?: EcommerceVariant;
  image: React.ReactNode;
  title: string;
  /** Subtitle line — e.g. variant, size. */
  subtitle?: string;
  price: string;
  originalPrice?: string;
  prefix?: string;
  quantity?: number;
  onQuantityChange?: (next: number) => void;
  onRemove?: () => void;
  className?: string;
}

export function CartItem({
  variant = 'rounded',
  image,
  title,
  subtitle,
  price,
  originalPrice,
  prefix = '$',
  quantity = 1,
  onQuantityChange,
  onRemove,
  className,
}: CartItemProps) {
  return (
    <article
      className={cn(
        'flex items-center gap-4 p-3 sm:p-4',
        shellByVariant[variant],
        className
      )}
    >
      {/* Image */}
      <div
        className={cn(
          'shrink-0 overflow-hidden',
          'size-16 sm:size-20',
          innerRadiusByVariant[variant]
        )}
      >
        {typeof image === 'string' ? (
          <img src={image} alt={title} className="size-full object-cover" loading="lazy" />
        ) : (
          image
        )}
      </div>

      {/* Body */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="truncate font-display text-sm font-semibold tracking-[-0.005em] sm:text-base">
              {title}
            </h4>
            {subtitle && (
              <p className="truncate text-xs text-[var(--color-fg-muted)] sm:text-sm">
                {subtitle}
              </p>
            )}
          </div>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remove ${title}`}
              className={cn(
                'inline-flex shrink-0 items-center justify-center',
                'size-8 text-[var(--color-fg-muted)]',
                'transition-colors hover:text-[var(--color-danger)]',
                variant === 'brutal' &&
                  'border-[1.5px] border-[var(--color-fg-base)] hover:bg-[var(--color-danger-soft)]',
                variant !== 'brutal' && 'rounded-full hover:bg-[var(--color-bg-subtle)]'
              )}
            >
              <Trash2 className="size-4" />
            </button>
          )}
        </div>

        <div className="mt-1 flex items-center justify-between gap-3">
          <QuantityStepper
            size="sm"
            variant={variant}
            value={quantity}
            onChange={onQuantityChange}
          />
          <PriceTag
            price={price}
            original={originalPrice}
            prefix={prefix}
            size="md"
          />
        </div>
      </div>
    </article>
  );
}
