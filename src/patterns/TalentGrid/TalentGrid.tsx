import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { BadgeCheck, MapPin, UserPlus } from 'lucide-react';
import { cn } from '../../utils/cn';
import './TalentGrid.css';

/* -------------------------------- Types -------------------------------- */

export type TalentRoleTone =
  | 'lavender'
  | 'mint'
  | 'sky'
  | 'peach'
  | 'cream'
  | 'rose';

export interface TalentItem {
  id?: string;
  /** Avatar image URL. */
  avatar: string;
  name: ReactNode;
  /** Role label shown in a tinted pill. */
  role: ReactNode;
  /** Color preset for the role pill. */
  roleTone?: TalentRoleTone;
  /** Hourly rate, eg. "$150.00/hr". */
  rate?: ReactNode;
  /** Location. */
  location?: ReactNode;
  /** Skill chips. */
  skills?: ReactNode[];
  /** Verified check after the name. */
  verified?: boolean;
  onView?: () => void;
  onInvite?: () => void;
}

export interface TalentGridProps extends HTMLAttributes<HTMLDivElement> {
  items: TalentItem[];
  /** Total tilt distributed across the grid. Defaults to 4. */
  tilt?: number;
  /** Static (no tilt) layout. */
  static?: boolean;
}

/* ----------------------------- Component ----------------------------- */

const TONE_CYCLE: TalentRoleTone[] = ['lavender', 'mint', 'sky', 'peach', 'cream', 'rose'];

/**
 * TalentGrid — staggered grid of talent profile cards. Cards alternate
 * column position to fake a casual mosaic; small rotations distributed
 * across the grid sell the "scattered" look without breaking readability.
 */
export const TalentGrid = forwardRef<HTMLDivElement, TalentGridProps>(
  function TalentGrid({ items, tilt = 4, static: isStatic, className, ...rest }, ref) {
    const half = (items.length - 1) / 2;

    return (
      <div ref={ref} className={cn('zui-talent', className)} {...rest}>
        {items.map((item, i) => {
          const tone = item.roleTone ?? TONE_CYCLE[i % TONE_CYCLE.length];
          const norm = (i - half) / Math.max(half, 1);
          const rotate = isStatic ? 0 : norm * tilt;
          const offsetY = isStatic ? 0 : (i % 3) * 6;

          return (
            <article
              key={item.id ?? i}
              className={cn('zui-talent__card', `zui-talent__role--${tone}`)}
              style={
                {
                  '--zui-tg-rotate': `${rotate}deg`,
                  '--zui-tg-y': `${offsetY}px`,
                } as React.CSSProperties
              }
            >
              <span className="zui-talent__role-pill">{item.role}</span>

              <div className="zui-talent__head">
                <img
                  src={item.avatar}
                  alt=""
                  loading="lazy"
                  className="zui-talent__avatar"
                />

                <div className="zui-talent__head-text">
                  <span className="zui-talent__name">
                    {item.name}
                    {item.verified && (
                      <BadgeCheck className="size-4 text-[oklch(70%_0.18_140)]" />
                    )}
                  </span>
                  {item.rate && (
                    <span className="zui-talent__rate">{item.rate}</span>
                  )}
                  {item.location && (
                    <span className="zui-talent__location">
                      <MapPin className="size-3.5" strokeWidth={2.2} />
                      <span>{item.location}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="zui-talent__foot">
                <div className="zui-talent__actions">
                  <button
                    type="button"
                    className="zui-talent__view"
                    onClick={item.onView}
                  >
                    View profile
                  </button>
                  <button
                    type="button"
                    className="zui-talent__invite"
                    onClick={item.onInvite}
                  >
                    Invite
                    <UserPlus className="size-3.5" strokeWidth={2.4} />
                  </button>
                </div>

                {item.skills && item.skills.length > 0 && (
                  <div className="zui-talent__skills">
                    {item.skills.map((s, si) => (
                      <span key={si} className="zui-talent__skill">{s}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    );
  }
);
