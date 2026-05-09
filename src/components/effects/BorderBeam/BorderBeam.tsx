import { cn } from '../../../utils/cn';
import './BorderBeam.css';

export interface BorderBeamProps {
  /** Visible length of the beam in degrees of the border. */
  size?: number;
  /** Loop duration in seconds. */
  duration?: number;
  /** Starting offset (0–1). */
  delay?: number;
  /** Beam color stops. */
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}

/**
 * Animated light that orbits an element's border. Drop-in: the parent
 * needs `position: relative` and `overflow: hidden`. Pure CSS, GPU-only.
 */
export function BorderBeam({
  size = 200,
  duration = 6,
  delay = 0,
  colorFrom = 'oklch(70% 0.22 285)',
  colorTo   = 'oklch(70% 0.22 320)',
  className,
}: BorderBeamProps) {
  return (
    <div
      aria-hidden
      className={cn('zui-border-beam', className)}
      style={
        {
          '--zui-bb-size': `${size}px`,
          '--zui-bb-duration': `${duration}s`,
          '--zui-bb-delay': `${-delay * duration}s`,
          '--zui-bb-from': colorFrom,
          '--zui-bb-to':   colorTo,
        } as React.CSSProperties
      }
    />
  );
}
