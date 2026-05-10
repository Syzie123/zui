import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Check, Mail } from 'lucide-react';
import { cn } from '../../utils/cn';
import './PricingDark.css';

/* -------------------------------- Types -------------------------------- */

export type PricingDarkTone =
  | 'turquoise'
  | 'purple'
  | 'off-white'
  | 'amber'
  | 'crimson';

export interface PricingDarkFeature {
  /** Icon shown on the left. Defaults to a check mark. */
  icon?: ReactNode;
  label: ReactNode;
  /** Right-aligned chip, eg. "AI-based". */
  chip?: ReactNode;
}

export interface PricingDarkSpec {
  icon: ReactNode;
  label: ReactNode;
  /** Highlight the leading number, eg. "2 free seats available". */
  emphasis?: ReactNode;
}

export interface PricingDarkProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Color preset for the abstract scribble + accents. */
  tone?: PricingDarkTone;
  /** Brand mark / logo shown top-left. */
  brandMark?: ReactNode;
  /** "Most popular" or other badge — top-right. */
  badge?: ReactNode;
  /** Marks this tier as the highlight (slightly larger / orange CTA). */
  highlighted?: boolean;
  /** Plan name. */
  title: ReactNode;
  /** Short blurb under the title. */
  description?: ReactNode;
  /** Big price line — pass a string or full node like "Contact us". */
  price: ReactNode;
  /** Period after price, eg. "/month". Hidden when `price` is a custom node. */
  period?: ReactNode;
  /** Two specs shown above the divider — usually seats + storage. */
  specs?: PricingDarkSpec[];
  /** Section label between specs and features, eg. "TURQUOISE TREK +". */
  divider?: ReactNode;
  /** Feature list under the divider. */
  features?: PricingDarkFeature[];
  /** CTA label. */
  ctaLabel?: ReactNode;
  /** CTA icon — overrides default. */
  ctaIcon?: ReactNode;
  /** When true, replaces default CTA with the "contact" treatment. */
  ctaContact?: boolean;
  onCta?: () => void;
}

/* ----------------------------- Component ----------------------------- */

const TONE_HUE: Record<PricingDarkTone, number> = {
  turquoise: 200,
  purple: 285,
  'off-white': 240,
  amber: 60,
  crimson: 5,
};

/**
 * PricingDark — pricing tier card for dark surfaces.
 * Uses CSS-painted abstract "scribble" SVG behind the brand mark, tinted by
 * the active tone. Highlighted tier gets a brighter brand block, vibrant
 * orange CTA, and slightly stronger surface contrast.
 */
export const PricingDark = forwardRef<HTMLDivElement, PricingDarkProps>(
  function PricingDark(
    {
      tone = 'turquoise',
      brandMark,
      badge,
      highlighted,
      title,
      description,
      price,
      period,
      specs,
      divider,
      features,
      ctaLabel,
      ctaIcon,
      ctaContact,
      onCta,
      className,
      ...rest
    },
    ref
  ) {
    const hue = TONE_HUE[tone];

    return (
      <div
        ref={ref}
        data-tone={tone}
        data-highlighted={highlighted || undefined}
        className={cn('zui-pdark', className)}
        style={{ ['--zui-pd-hue' as string]: hue } as React.CSSProperties}
        {...rest}
      >
        <div className="zui-pdark__scribble" aria-hidden>
          <ScribbleArt />
        </div>

        <div className="zui-pdark__head">
          {brandMark && <span className="zui-pdark__mark">{brandMark}</span>}
          {badge && <span className="zui-pdark__badge">{badge}</span>}
        </div>

        <div className="zui-pdark__title-block">
          <h3 className="zui-pdark__title">{title}</h3>
          {description && (
            <p className="zui-pdark__desc">{description}</p>
          )}
        </div>

        <div className="zui-pdark__price">
          <span className="zui-pdark__price-value">{price}</span>
          {period && <span className="zui-pdark__price-period">{period}</span>}
        </div>

        <button
          type="button"
          onClick={onCta}
          data-contact={ctaContact || undefined}
          className="zui-pdark__cta"
        >
          {ctaIcon ?? (ctaContact ? <Mail className="size-4" /> : null)}
          <span>{ctaLabel ?? (ctaContact ? 'Contact us' : 'Choose this plan')}</span>
        </button>

        {specs && specs.length > 0 && (
          <ul className="zui-pdark__specs">
            {specs.map((s, i) => (
              <li key={i} className="zui-pdark__spec">
                <span className="zui-pdark__spec-icon">{s.icon}</span>
                <span className="zui-pdark__spec-text">
                  {s.emphasis && (
                    <strong className="zui-pdark__spec-emph">{s.emphasis} </strong>
                  )}
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        )}

        {divider && (
          <div className="zui-pdark__divider">
            <span>{divider}</span>
          </div>
        )}

        {features && features.length > 0 && (
          <ul className="zui-pdark__features">
            {features.map((f, i) => (
              <li key={i} className="zui-pdark__feature">
                <span className="zui-pdark__feature-icon">
                  {f.icon ?? <Check className="size-3.5" strokeWidth={2.6} />}
                </span>
                <span>{f.label}</span>
                {f.chip && <span className="zui-pdark__feature-chip">{f.chip}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

/* ------------------------- Scribble background SVG ------------------------- */

function ScribbleArt() {
  return (
    <svg
      viewBox="0 0 240 200"
      preserveAspectRatio="xMidYMid slice"
      className="zui-pdark__scribble-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pdark-flare" x1="0" y1="0" x2="240" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="oklch(70% 0.18 var(--zui-pd-hue))" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="oklch(60% 0.20 var(--zui-pd-hue))" stopOpacity="0.18" />
          <stop offset="1" stopColor="oklch(50% 0.22 var(--zui-pd-hue))" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Soft orb */}
      <circle cx="200" cy="-10" r="110" fill="url(#pdark-flare)" />
      {/* Free-form "Z/lightning" stroke */}
      <path
        d="M200 28 L168 56 L210 64 L150 110 L200 124 L130 168"
        stroke="oklch(80% 0.10 var(--zui-pd-hue))"
        strokeOpacity="0.30"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M120 12 L142 28 L122 50"
        stroke="oklch(80% 0.10 var(--zui-pd-hue))"
        strokeOpacity="0.16"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

