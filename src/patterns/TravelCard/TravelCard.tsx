import {
  forwardRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Heart, Plane, Tag } from 'lucide-react';
import { cn } from '../../utils/cn';
import './TravelCard.css';

/* -------------------------------- Types -------------------------------- */

export interface TravelCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Background image URL. */
  src: string;
  alt?: string;
  /** Big destination label, eg. "New York". */
  title: ReactNode;
  /** Smaller line under the title, eg. "Economy". */
  subtitle?: ReactNode;
  /** Price chip line, eg. "$120". */
  price?: ReactNode;
  /** Airport / code chip, eg. "JFK". */
  code?: ReactNode;
  /** CTA label. Defaults to "Search flight". */
  ctaLabel?: ReactNode;
  onCta?: () => void;
  /** Visual style — `solid` matches the dark CTA, `pill` matches the wide CTA. */
  ctaVariant?: 'solid' | 'pill';
  /** Show the favourite heart button. */
  favouritable?: boolean;
  /** Controlled favourite state. */
  favourited?: boolean;
  defaultFavourited?: boolean;
  onFavourite?: (next: boolean) => void;
}

/* ----------------------------- Component ----------------------------- */

/**
 * TravelCard — phone-aspect photo card with destination overlay and a
 * search CTA pinned to the bottom. Pairs nicely on a row.
 */
export const TravelCard = forwardRef<HTMLDivElement, TravelCardProps>(
  function TravelCard(
    {
      src,
      alt = '',
      title,
      subtitle,
      price,
      code,
      ctaLabel = 'Search flight',
      onCta,
      ctaVariant = 'solid',
      favouritable,
      favourited,
      defaultFavourited = false,
      onFavourite,
      className,
      ...rest
    },
    ref
  ) {
    const [internal, setInternal] = useState(defaultFavourited);
    const isControlled = favourited !== undefined;
    const fav = isControlled ? favourited : internal;

    const toggleFav = () => {
      const next = !fav;
      if (!isControlled) setInternal(next);
      onFavourite?.(next);
    };

    return (
      <div ref={ref} className={cn('zui-travel', className)} {...rest}>
        <img className="zui-travel__img" src={src} alt={alt} loading="lazy" />

        {favouritable && (
          <button
            type="button"
            aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
            aria-pressed={fav}
            onClick={toggleFav}
            data-active={fav || undefined}
            className="zui-travel__fav"
          >
            <Heart className="size-3.5" fill={fav ? 'currentColor' : 'none'} />
          </button>
        )}

        <div className="zui-travel__overlay">
          <div className="zui-travel__head">
            <h3 className="zui-travel__title">{title}</h3>
            {subtitle && <p className="zui-travel__subtitle">{subtitle}</p>}
          </div>

          {(price || code) && (
            <div className="zui-travel__meta">
              {price && (
                <span className="zui-travel__chip">
                  <Tag className="size-3.5" />
                  <span>
                    from <strong>{price}</strong>
                  </span>
                </span>
              )}
              {code && (
                <span className="zui-travel__chip">
                  <Plane className="size-3.5" />
                  <strong>{code}</strong>
                </span>
              )}
            </div>
          )}

          <button
            type="button"
            className={cn(
              'zui-travel__cta',
              ctaVariant === 'pill' && 'zui-travel__cta--pill'
            )}
            onClick={onCta}
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    );
  }
);
