import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import './JobCardStack.css';

/* -------------------------------- Types -------------------------------- */

export type JobCardTone =
  | 'lavender'
  | 'cream'
  | 'peach'
  | 'mint'
  | 'sky'
  | 'sand'
  | 'white';

export interface JobCardItem {
  id?: string;
  /** Brand mark — typically an SVG icon. */
  brand?: ReactNode;
  /** Brand name shown next to the mark, eg. "slack". */
  brandName?: ReactNode;
  /** Role title. */
  role: ReactNode;
  /** Salary line, eg. "$3,500-5,500 net". */
  salary?: ReactNode;
  /** Tag pills, eg. ["full time", "remote"]. */
  tags?: ReactNode[];
  /** Footer line, eg. "Posted 2 day ago". */
  meta?: ReactNode;
  /** Pastel surface tone. */
  tone?: JobCardTone;
}

export interface JobCardStackProps extends HTMLAttributes<HTMLDivElement> {
  items: JobCardItem[];
  /** Maximum tilt in degrees applied across the stack. Defaults to 6. */
  spread?: number;
}

/* ----------------------------- Component ----------------------------- */

/**
 * JobCardStack — a casually-tilted pile of pastel job cards.
 *
 * Cards layer with a deterministic offset + rotation pattern that keeps
 * them readable on hover. We don't randomize per render so SSR matches
 * client. On hover the hovered card lifts to the top and untilts.
 */
export const JobCardStack = forwardRef<HTMLDivElement, JobCardStackProps>(
  function JobCardStack({ items, spread = 6, className, ...rest }, ref) {
    const n = items.length;

    return (
      <div ref={ref} className={cn('zui-jobstack', className)} {...rest}>
        {items.map((item, i) => {
          // Distribute rotations across the stack so the centre cards
          // tilt least and the outer ones tilt most. Two columns of cards.
          const half = (n - 1) / 2;
          const norm = (i - half) / Math.max(half, 1);
          const rotate = norm * spread;
          // Slightly randomized-looking offset using deterministic math
          const x = Math.sin(i * 1.3) * 8;
          const y = (i % 2) * 14 - (i * 6);

          const tone = item.tone ?? defaultTone(i);

          return (
            <div
              key={item.id ?? i}
              className={cn('zui-jobstack__card', `zui-jobstack__card--${tone}`)}
              style={
                {
                  '--zui-js-rotate': `${rotate}deg`,
                  '--zui-js-tx': `${x}px`,
                  '--zui-js-ty': `${y}px`,
                  '--zui-js-z': `${n - i}`,
                } as React.CSSProperties
              }
            >
              {(item.brand || item.brandName) && (
                <div className="zui-jobstack__brand">
                  {item.brand && (
                    <span className="zui-jobstack__brand-mark">{item.brand}</span>
                  )}
                  {item.brandName && (
                    <span className="zui-jobstack__brand-name">{item.brandName}</span>
                  )}
                </div>
              )}

              <div className="zui-jobstack__role">{item.role}</div>
              {item.salary && <div className="zui-jobstack__salary">{item.salary}</div>}

              {item.tags && item.tags.length > 0 && (
                <div className="zui-jobstack__tags">
                  {item.tags.map((t, ti) => (
                    <span key={ti} className="zui-jobstack__tag">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {item.meta && <div className="zui-jobstack__meta">{item.meta}</div>}
            </div>
          );
        })}
      </div>
    );
  }
);

const TONE_CYCLE: JobCardTone[] = ['lavender', 'cream', 'peach', 'sky', 'mint', 'sand'];
function defaultTone(i: number): JobCardTone {
  return TONE_CYCLE[i % TONE_CYCLE.length];
}
