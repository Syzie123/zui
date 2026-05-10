import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Clock, Package } from 'lucide-react';
import { cn } from '../../utils/cn';
import './TrackDelivery.css';

/* -------------------------------- Types -------------------------------- */

export interface TrackDeliveryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  /** Status pill — eg. "Your delivery is on its way!". */
  status?: ReactNode;
  /** Top-right floating chip. */
  badge?: ReactNode;
  /** Primary CTA label. */
  ctaLabel?: ReactNode;
  onCta?: () => void;
  /** Override the illustration entirely. */
  illustration?: ReactNode;
  /** Highlight stripe color on the box (defaults to lime green). */
  accent?: string;
}

/* ----------------------------- Component ----------------------------- */

/**
 * TrackDelivery — info card for a shipment status with an illustrated
 * isometric box-on-conveyor scene at the top.
 */
export const TrackDelivery = forwardRef<HTMLDivElement, TrackDeliveryProps>(
  function TrackDelivery(
    {
      title = 'Track Your Delivery',
      description = "Monitor your shipment status in real-time. Stay informed about your delivery's progress every step of the way.",
      status = 'Your delivery is on its way!',
      badge,
      ctaLabel = 'View Status',
      onCta,
      illustration,
      accent = 'oklch(82% 0.20 130)',
      className,
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn('zui-trackdel', className)}
        style={{ ['--zui-td-accent' as string]: accent } as React.CSSProperties}
        {...rest}
      >
        <div className="zui-trackdel__hero">
          {illustration ?? <BoxIllustration />}
          <div className="zui-trackdel__chip">
            {badge ?? <Clock className="size-4" strokeWidth={2.4} />}
          </div>
        </div>

        <div className="zui-trackdel__body">
          <h3 className="zui-trackdel__title">{title}</h3>
          <p className="zui-trackdel__desc">{description}</p>

          <div className="zui-trackdel__footer">
            <button type="button" className="zui-trackdel__cta" onClick={onCta}>
              {ctaLabel}
            </button>
            <div className="zui-trackdel__status">
              <span className="zui-trackdel__status-icon">
                <Package className="size-4" strokeWidth={2.2} />
              </span>
              <span>{status}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

/* ------------------------- Built-in illustration ------------------------- */

function BoxIllustration() {
  return (
    <svg
      viewBox="0 0 220 140"
      className="zui-trackdel__svg"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Conveyor — long flat slab */}
      <g>
        <path
          d="M10 110 L130 70 L210 88 L90 128 Z"
          fill="oklch(99% 0 0)"
          stroke="oklch(75% 0 0)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* slab side */}
        <path
          d="M10 110 L90 128 L90 134 L10 116 Z"
          fill="oklch(92% 0 0)"
          stroke="oklch(70% 0 0)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M90 128 L210 88 L210 94 L90 134 Z"
          fill="oklch(96% 0 0)"
          stroke="oklch(70% 0 0)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* legs */}
        <line x1="32" y1="118" x2="32" y2="135" stroke="oklch(70% 0 0)" strokeWidth="1.4" />
        <line x1="200" y1="92" x2="200" y2="110" stroke="oklch(70% 0 0)" strokeWidth="1.4" />

        {/* slab parallel lines */}
        <line x1="40" y1="106" x2="160" y2="66" stroke="oklch(85% 0 0)" strokeWidth="0.6" />
        <line x1="60" y1="100" x2="180" y2="60" stroke="oklch(85% 0 0)" strokeWidth="0.6" opacity="0.7" />
      </g>

      {/* Box on top with accent stripe */}
      <g>
        {/* top face */}
        <path
          d="M100 38 L150 22 L180 30 L130 46 Z"
          fill="oklch(99% 0 0)"
          stroke="oklch(60% 0 0)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* left face */}
        <path
          d="M100 38 L130 46 L130 78 L100 70 Z"
          fill="oklch(96% 0 0)"
          stroke="oklch(60% 0 0)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* right face */}
        <path
          d="M130 46 L180 30 L180 62 L130 78 Z"
          fill="oklch(99% 0 0)"
          stroke="oklch(60% 0 0)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* accent stripe — vertical band running across both side faces */}
        <path
          d="M148 33 L168 27 L168 59 L148 65 Z"
          fill="var(--zui-td-accent)"
          stroke="oklch(40% 0.18 130)"
          strokeOpacity="0.18"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M118 41 L148 33 L148 65 L118 73 Z"
          fill="var(--zui-td-accent)"
          opacity="0.0"
        />
      </g>
    </svg>
  );
}
