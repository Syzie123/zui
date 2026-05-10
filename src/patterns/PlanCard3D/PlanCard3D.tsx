import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import './PlanCard3D.css';

export type PlanCard3DTone =
  | 'green'
  | 'purple'
  | 'blue'
  | 'dark'
  | 'light';

export interface PlanCard3DProps extends HTMLAttributes<HTMLDivElement> {
  /** Color preset. */
  tone?: PlanCard3DTone;
  /** Tiny pill above the title — eg. "Most popular". */
  badge?: ReactNode;
  /** Large heading — the plan name. */
  title: string;
  /** Short blurb shown under the title. */
  description?: ReactNode;
  /** Big price number, eg. "$49". */
  price: ReactNode;
  /** Period label after price, eg. "/mo". */
  period?: string;
  /** List of features. Use plain strings for default rows or pass nodes for custom. */
  features?: ReactNode[];
  /** CTA button label. */
  ctaLabel?: string;
  /** CTA click handler. */
  onCta?: () => void;
}

/**
 * Pricing plan card with a 3D, neumorphic-pop feel.
 *
 * Five tones (`green`, `purple`, `blue`, `dark`, `light`) cover the common
 * Business / Unlimited / Free splits seen in modern SaaS pricing pages. The
 * card stays flat — only the badge and CTA carry depth.
 */
export const PlanCard3D = forwardRef<HTMLDivElement, PlanCard3DProps>(
  function PlanCard3D(
    {
      tone = 'light',
      badge,
      title,
      description,
      price,
      period,
      features,
      ctaLabel = 'Get started',
      onCta,
      className,
      children,
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn('zui-plancard3d', `zui-plancard3d--${tone}`, className)}
        {...rest}
      >
        {badge && <div className="zui-plancard3d__badge">{badge}</div>}

        <h3 className="zui-plancard3d__title">{title}</h3>
        {description && (
          <p className="zui-plancard3d__desc">{description}</p>
        )}

        <div className="zui-plancard3d__price">
          <span className="zui-plancard3d__price-value">{price}</span>
          {period && (
            <span className="zui-plancard3d__price-period">{period}</span>
          )}
        </div>

        {features && features.length > 0 && (
          <ul className="zui-plancard3d__features">
            {features.map((f, i) => (
              <li key={i} className="zui-plancard3d__feature">
                <span className="zui-plancard3d__check" aria-hidden>
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        {children}

        <button
          type="button"
          className="zui-plancard3d__cta"
          onClick={onCta}
        >
          <span>{ctaLabel}</span>
          <ChevronRight className="size-4" strokeWidth={2.5} />
        </button>
      </div>
    );
  }
);
