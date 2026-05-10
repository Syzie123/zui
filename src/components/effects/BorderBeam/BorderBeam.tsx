import { cn } from '../../../utils/cn';
import './BorderBeam.css';

export interface BorderBeamProps {
  /** Visible beam length (% of perimeter, 5-50 sensible). */
  size?: number;
  /** Loop duration in seconds. */
  duration?: number;
  /** Starting offset (0–1). */
  delay?: number;
  /** Border thickness in px. */
  borderWidth?: number;
  /** Beam color stops — used as the conic gradient palette.
   *  Pass a single 2-stop pair via colorFrom/colorTo, or an array
   *  via `colors` for a vibrant rainbow effect. */
  colorFrom?: string;
  colorTo?: string;
  colors?: string[];
  /** Use a built-in vibrant palette. Overrides colorFrom/To/colors. */
  palette?: 'violet' | 'sunset' | 'ocean' | 'aurora' | 'rainbow';
  className?: string;
}

const PALETTES: Record<NonNullable<BorderBeamProps['palette']>, string[]> = {
  violet: [
    'oklch(70% 0.22 285)',
    'oklch(72% 0.22 320)',
  ],
  sunset: [
    'oklch(72% 0.22 30)',
    'oklch(70% 0.22 350)',
    'oklch(72% 0.20 320)',
  ],
  ocean: [
    'oklch(72% 0.18 200)',
    'oklch(64% 0.20 230)',
    'oklch(72% 0.18 260)',
  ],
  aurora: [
    'oklch(72% 0.20 145)',
    'oklch(70% 0.20 200)',
    'oklch(70% 0.22 290)',
  ],
  rainbow: [
    'oklch(70% 0.22 25)',
    'oklch(75% 0.18 80)',
    'oklch(72% 0.20 145)',
    'oklch(72% 0.18 200)',
    'oklch(70% 0.22 285)',
    'oklch(72% 0.22 350)',
  ],
};

/**
 * Animated light that orbits an element's border. Drop-in: the parent
 * needs `position: relative` and `overflow: hidden`.
 *
 * The beam is a rotating conic gradient masked to a thin ring matching
 * the parent's `border-radius`. So it follows whatever corner radius
 * its container has — sharp, rounded, or pill — smoothly.
 */
export function BorderBeam({
  size = 35,
  duration = 6,
  delay = 0,
  borderWidth = 1.5,
  colorFrom,
  colorTo,
  colors,
  palette,
  className,
}: BorderBeamProps) {
  // Resolve color stops
  const resolved = palette
    ? PALETTES[palette]
    : colors && colors.length > 0
      ? colors
      : [colorFrom ?? 'oklch(70% 0.22 285)', colorTo ?? 'oklch(72% 0.22 320)'];

  // Build a conic gradient where the visible beam takes `size%` and the
  // remainder is transparent. We pad the array to give a smooth fade
  // in + out at the ends of the visible arc.
  const stops = buildStops(resolved, size);

  return (
    <div
      aria-hidden
      className={cn('zui-border-beam', className)}
      style={
        {
          '--zui-bb-duration': `${duration}s`,
          '--zui-bb-delay': `${-delay * duration}s`,
          '--zui-bb-width': `${borderWidth}px`,
          '--zui-bb-stops': stops,
        } as React.CSSProperties
      }
    />
  );
}

/**
 * Build a conic-gradient stops string: transparent for (100 - size)%,
 * then a smooth gradient through the colors for `size`%, ending
 * transparent. The trailing transparent makes the beam fade in/out
 * cleanly as it rotates around.
 */
function buildStops(colors: string[], size: number): string {
  const visible = Math.max(5, Math.min(60, size));
  const start = 100 - visible;

  // Transparent gap → fade in → colors → fade out → transparent end
  const colorStops = colors
    .map((c, i) => {
      const pos = start + (visible * (i + 1)) / (colors.length + 1);
      return `${c} ${pos.toFixed(2)}%`;
    })
    .join(', ');

  return [
    `transparent 0%`,
    `transparent ${(start - 1).toFixed(2)}%`,
    colorStops,
    `transparent 100%`,
  ].join(', ');
}
