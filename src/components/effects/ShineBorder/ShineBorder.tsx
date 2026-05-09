import { cn } from '../../../utils/cn';
import './ShineBorder.css';

export interface ShineBorderProps {
  /** Border thickness in px. */
  borderWidth?: number;
  /** Loop duration in seconds. */
  duration?: number;
  /** Color stops for the gradient. */
  colors?: string[];
  className?: string;
}

/**
 * Conic-gradient border that rotates around the parent. Drop-in: parent
 * needs `position: relative` and a `border-radius`.
 */
export function ShineBorder({
  borderWidth = 1.5,
  duration = 8,
  colors = [
    'oklch(70% 0.22 285)',
    'oklch(70% 0.22 320)',
    'oklch(72% 0.20 200)',
    'oklch(70% 0.22 285)',
  ],
  className,
}: ShineBorderProps) {
  return (
    <div
      aria-hidden
      className={cn('zui-shine-border', className)}
      style={
        {
          '--zui-sb-width': `${borderWidth}px`,
          '--zui-sb-duration': `${duration}s`,
          '--zui-sb-gradient': `conic-gradient(from 0deg, ${colors.join(', ')})`,
        } as React.CSSProperties
      }
    />
  );
}
