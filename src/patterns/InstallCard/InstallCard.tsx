import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Download, MoreVertical } from 'lucide-react';
import { cn } from '../../utils/cn';
import './InstallCard.css';

/* -------------------------------- Types -------------------------------- */

export interface InstallCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** App / product name. */
  brand: ReactNode;
  /** Brand mark — typically a small SVG or letter logo. */
  brandMark?: ReactNode;
  /** Background color of the brand-mark tile. */
  brandTone?: string;
  /** Right-side payment / source pill, eg. "Third-party payment". */
  badge?: ReactNode;
  /** Title shown above the body — typically two-line marketing copy. */
  title: ReactNode;
  /** Highlighted word inside the title (rendered with an accent block). */
  highlight?: string;
  /** Short description. */
  description?: ReactNode;
  /** Number / label shown next to the install icon. */
  installs?: ReactNode;
  installLabel?: ReactNode;
  /** Primary CTA. */
  ctaLabel?: ReactNode;
  onCta?: () => void;
  /** Click on the top-right kebab menu. */
  onMenu?: () => void;
  /** Override the right-hand illustration. */
  illustration?: ReactNode;
}

/* ----------------------------- Component ----------------------------- */

/**
 * InstallCard — product / extension install card with an isometric shapes
 * illustration on the right and a yellow-highlighted hero phrase.
 */
export const InstallCard = forwardRef<HTMLDivElement, InstallCardProps>(
  function InstallCard(
    {
      brand,
      brandMark,
      brandTone = 'oklch(86% 0.20 130)',
      badge,
      title,
      highlight,
      description,
      installs,
      installLabel = 'active installations',
      ctaLabel = 'Install now',
      onCta,
      onMenu,
      illustration,
      className,
      ...rest
    },
    ref
  ) {
    return (
      <div ref={ref} className={cn('zui-install', className)} {...rest}>
        <button
          type="button"
          aria-label="More options"
          onClick={onMenu}
          className="zui-install__menu"
        >
          <MoreVertical className="size-4" />
        </button>

        <div className="zui-install__hero">
          {illustration ?? <ShapesIllustration />}
        </div>

        <div className="zui-install__body">
          <h3 className="zui-install__title">
            {highlight ? renderHighlighted(title, highlight) : title}
          </h3>

          <div className="zui-install__brand-row">
            <span
              className="zui-install__brand-mark"
              style={{ background: brandTone }}
            >
              {brandMark}
            </span>
            <span className="zui-install__brand">{brand}</span>
            {badge && <span className="zui-install__badge">{badge}</span>}
          </div>

          {description && (
            <p className="zui-install__desc">{description}</p>
          )}

          <div className="zui-install__footer">
            <button type="button" className="zui-install__cta" onClick={onCta}>
              {ctaLabel}
            </button>
            <div className="zui-install__installs">
              <Download className="size-4" strokeWidth={2.2} />
              <span>
                <strong>{installs}</strong> {installLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

/* Highlight a substring inside a title — wraps it in a styled <mark>. */
function renderHighlighted(title: ReactNode, highlight: string): ReactNode {
  if (typeof title !== 'string') return title;
  const idx = title.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <mark className="zui-install__hl">
        {title.slice(idx, idx + highlight.length)}
      </mark>
      {title.slice(idx + highlight.length)}
    </>
  );
}

/* ------------------------- Built-in illustration ------------------------- */

function ShapesIllustration() {
  return (
    <svg
      viewBox="0 0 240 160"
      className="zui-install__svg"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Background rhombus tiling — soft gray lines */}
      <g stroke="oklch(85% 0 0)" strokeWidth="0.6" fill="none" opacity="0.55">
        {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line
              x1={20 + i * 30}
              y1={20}
              x2={20 + i * 30 + 60}
              y2={140}
            />
            <line
              x1={20 + i * 30}
              y1={140}
              x2={20 + i * 30 + 60}
              y2={20}
            />
          </g>
        ))}
      </g>

      {/* Hero cube — top face highlighted with a lighter wireframe */}
      <g stroke="oklch(60% 0 0)" strokeWidth="1.4" fill="none" strokeLinejoin="round">
        {/* top */}
        <path d="M120 38 L156 22 L192 38 L156 54 Z" fill="oklch(99% 0 0)" />
        {/* left */}
        <path d="M120 38 L156 54 L156 96 L120 80 Z" fill="oklch(96% 0 0)" />
        {/* right */}
        <path d="M156 54 L192 38 L192 80 L156 96 Z" fill="oklch(99% 0 0)" />
      </g>

      {/* Shadow rhombus on the floor */}
      <path
        d="M138 110 L168 96 L198 108 L168 122 Z"
        fill="oklch(0% 0 0 / 0.06)"
        stroke="none"
      />

      {/* Orbit rhombus floating top-left for depth */}
      <g stroke="oklch(60% 0 0)" strokeWidth="1.2" fill="oklch(99% 0 0)">
        <path d="M64 64 L84 56 L104 64 L84 72 Z" />
      </g>
    </svg>
  );
}
