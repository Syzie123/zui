import { Heart, ShoppingBag } from 'lucide-react';
import { cn } from '../../utils/cn';
import {
  type EcommerceVariant,
  shellByVariant,
  ctaByVariant,
  innerRadiusByVariant,
} from './variant';
import { PriceTag } from './PriceTag';

export interface ProductCardProps {
  variant?: EcommerceVariant;
  /** Product image URL or any ReactNode (gradient, video, etc.). */
  image: React.ReactNode;
  /** Optional badge over the image (e.g. "Bestseller", "New", "Sale"). */
  badge?: { label: string; tone?: 'accent' | 'success' | 'warning' };
  title: string;
  description?: string;
  /** Soft tag pills shown below the title. */
  tags?: string[];
  price: string;
  originalPrice?: string;
  prefix?: string;
  /** Primary CTA — defaults to "Add to cart". */
  ctaLabel?: string;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
  wishlisted?: boolean;
  className?: string;
}

const badgeToneClasses = {
  accent: 'bg-[var(--color-accent-base)] text-[var(--color-accent-fg)]',
  success: 'bg-[oklch(86%_0.18_140)] text-[oklch(28%_0.10_140)]',
  warning: 'bg-[oklch(86%_0.18_70)] text-[oklch(28%_0.10_60)]',
} as const;

export function ProductCard({
  variant = 'rounded',
  image,
  badge,
  title,
  description,
  tags,
  price,
  originalPrice,
  prefix = '$',
  ctaLabel = 'Add to cart',
  onAddToCart,
  onToggleWishlist,
  wishlisted,
  className,
}: ProductCardProps) {
  return (
    <article
      className={cn(
        'flex w-full max-w-sm flex-col overflow-hidden',
        shellByVariant[variant],
        'transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)]',
        variant === 'brutal' &&
          'hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[5px_5px_0_0_var(--color-fg-base)]',
        className
      )}
    >
      {/* Image */}
      <div
        className={cn(
          'relative aspect-square w-full overflow-hidden',
          variant === 'square' && 'rounded-none',
          variant === 'rounded' && 'rounded-t-[var(--radius-2xl)]',
          variant === 'material' && 'rounded-t-[12px]',
          variant === 'brutal' && 'border-b-[2.5px] border-[var(--color-fg-base)]'
        )}
      >
        {typeof image === 'string' ? (
          <img
            src={image}
            alt={title}
            className="size-full object-cover"
            loading="lazy"
          />
        ) : (
          image
        )}

        {/* Badge */}
        {badge && (
          <span
            className={cn(
              'absolute left-3 top-3 inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-[-0.005em]',
              badgeToneClasses[badge.tone ?? 'success'],
              variant === 'rounded' && 'rounded-full',
              variant === 'square' && 'rounded-none',
              variant === 'material' && 'rounded-[6px] shadow-[0_1px_2px_rgb(0_0_0/0.20)]',
              variant === 'brutal' && 'rounded-none border-[2px] border-[var(--color-fg-base)]'
            )}
          >
            {badge.label}
          </span>
        )}

        {/* Wishlist */}
        {onToggleWishlist && (
          <button
            type="button"
            onClick={onToggleWishlist}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wishlisted}
            className={cn(
              'absolute right-3 top-3 inline-flex size-9 items-center justify-center',
              variant === 'rounded' && 'rounded-full',
              variant === 'square' && 'rounded-none',
              variant === 'material' && 'rounded-full shadow-[0_2px_4px_rgb(0_0_0/0.20)]',
              variant === 'brutal' && 'rounded-none border-[2px] border-[var(--color-fg-base)]',
              wishlisted
                ? 'bg-[var(--color-danger)] text-white'
                : 'bg-[var(--color-bg-elevated)] text-[var(--color-fg-base)]',
              'transition-colors'
            )}
          >
            <Heart
              className={cn('size-4', wishlisted && 'fill-current')}
            />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-base font-semibold leading-tight tracking-[-0.01em] line-clamp-2">
            {title}
          </h3>
          {description && (
            <p className="mt-1 line-clamp-2 text-sm text-[var(--color-fg-muted)]">
              {description}
            </p>
          )}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className={cn(
                  'inline-flex items-center px-2 py-0.5 text-[11px] font-medium',
                  'bg-[var(--color-bg-subtle)] text-[var(--color-fg-muted)]',
                  variant === 'rounded' && 'rounded-full',
                  variant === 'square' && 'rounded-none',
                  variant === 'material' && 'rounded-[4px]',
                  variant === 'brutal' &&
                    'rounded-none border-[1.5px] border-[var(--color-fg-base)]'
                )}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Footer: price + CTA */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <PriceTag
            price={price}
            original={originalPrice}
            prefix={prefix}
            size="lg"
          />
          <button
            type="button"
            onClick={onAddToCart}
            className={cn(
              'inline-flex h-10 items-center gap-1.5 px-4 text-sm font-semibold',
              'transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]',
              ctaByVariant[variant]
            )}
          >
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">{ctaLabel}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
