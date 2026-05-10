import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { ArrowDown, ArrowUp, MoreHorizontal } from 'lucide-react';
import { cn } from '../../utils/cn';
import './StatsCard.css';

/* -------------------------------- Types -------------------------------- */

export interface StatsCardRow {
  label: ReactNode;
  /** Pre-formatted value, eg. "$10,065.23". */
  value: ReactNode;
  /** Percentage change. Number → arrow + sign rendered automatically. */
  delta?: number;
  /** Override the delta render entirely. */
  deltaNode?: ReactNode;
}

export interface StatsCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** App / source brand mark (small icon). */
  brandMark?: ReactNode;
  /** Brand label, eg. "Sales Expert". */
  brand?: ReactNode;
  /** Big metric label, eg. "Total Sales". */
  title: ReactNode;
  /** Big metric value. */
  value: ReactNode;
  /** Range chip — defaults to "Last Month". */
  range?: ReactNode;
  rangeOptions?: string[];
  onRangeChange?: (next: string) => void;

  /** Breakdown rows. */
  rows?: StatsCardRow[];

  /** Sparkline values (Y axis). Auto-scaled. */
  series?: number[];
  /** X-axis tick labels under the sparkline. */
  axis?: string[];

  /** Hide / wire the kebab menu top-right. */
  onMenu?: () => void;

  /** Color preset for the corner glow. */
  glow?: 'pink' | 'violet' | 'amber' | 'mint' | 'sky';
}

/* ----------------------------- Component ----------------------------- */

const GLOW_HUE = {
  pink:   { a: 350, b: 320 },
  violet: { a: 290, b: 260 },
  amber:  { a:  50, b:  20 },
  mint:   { a: 165, b: 180 },
  sky:    { a: 220, b: 240 },
} as const;

/**
 * StatsCard — dark stats card with a soft corner glow, breakdown rows
 * (with up/down deltas), and a tiny sparkline + axis labels at the foot.
 */
export const StatsCard = forwardRef<HTMLDivElement, StatsCardProps>(
  function StatsCard(
    {
      brandMark,
      brand,
      title,
      value,
      range = 'Last Month',
      rangeOptions,
      onRangeChange,
      rows,
      series,
      axis,
      onMenu,
      glow = 'violet',
      className,
      ...rest
    },
    ref
  ) {
    const hues = GLOW_HUE[glow];

    return (
      <div
        ref={ref}
        className={cn('zui-stats', className)}
        style={
          {
            ['--zui-st-glow-a' as string]: `${hues.a}`,
            ['--zui-st-glow-b' as string]: `${hues.b}`,
          } as React.CSSProperties
        }
        {...rest}
      >
        <div className="zui-stats__head">
          <div className="zui-stats__brand">
            {brandMark && (
              <span className="zui-stats__brand-mark">{brandMark}</span>
            )}
            <div className="zui-stats__brand-text">
              {brand && <span className="zui-stats__brand-name">{brand}</span>}
              <span className="zui-stats__brand-title">{title}</span>
            </div>
          </div>

          <div className="zui-stats__actions">
            {rangeOptions && rangeOptions.length > 0 ? (
              <select
                className="zui-stats__range"
                defaultValue={typeof range === 'string' ? range : undefined}
                onChange={(e) => onRangeChange?.(e.target.value)}
              >
                {rangeOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : (
              <span className="zui-stats__range zui-stats__range--static">
                {range} <span aria-hidden>▾</span>
              </span>
            )}
            <button
              type="button"
              aria-label="Options"
              onClick={onMenu}
              className="zui-stats__menu"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        </div>

        <div className="zui-stats__value">{value}</div>

        {rows && rows.length > 0 && (
          <ul className="zui-stats__rows">
            {rows.map((r, i) => (
              <li key={i} className="zui-stats__row">
                <span className="zui-stats__row-label">{r.label}</span>
                <span className="zui-stats__row-value">{r.value}</span>
                <span className="zui-stats__row-delta">
                  {r.deltaNode ?? <Delta delta={r.delta} />}
                </span>
              </li>
            ))}
          </ul>
        )}

        {series && series.length > 1 && (
          <Sparkline values={series} />
        )}

        {axis && axis.length > 0 && (
          <div className="zui-stats__axis">
            {axis.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </div>
        )}
      </div>
    );
  }
);

/* ------------------------------ Helpers ------------------------------ */

function Delta({ delta }: { delta?: number }) {
  if (delta === undefined) return null;
  const up = delta >= 0;
  return (
    <span className={cn('zui-stats__delta', up ? 'zui-stats__delta--up' : 'zui-stats__delta--dn')}>
      {up ? <ArrowUp className="size-3.5" strokeWidth={2.6} /> : <ArrowDown className="size-3.5" strokeWidth={2.6} />}
      <span>{Math.abs(delta).toFixed(1)}%</span>
    </span>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const w = 100;
  const h = 26;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = w / (values.length - 1);

  const points = values
    .map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="zui-stats__spark"
      aria-hidden
    >
      <polyline
        points={points}
        fill="none"
        stroke="oklch(95% 0.005 250)"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
