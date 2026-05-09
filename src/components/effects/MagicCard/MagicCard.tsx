import { useRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './MagicCard.css';

export interface MagicCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Spotlight color (any CSS color). */
  gradientColor?: string;
  /** Spotlight radius in px. */
  gradientSize?: number;
  /** Spotlight opacity 0-1. */
  gradientOpacity?: number;
  children: ReactNode;
}

/**
 * Card with a soft spotlight that follows the cursor on hover.
 * Uses CSS variables and `pointermove` — no React state, no rerenders.
 */
export function MagicCard({
  className,
  gradientColor = 'oklch(70% 0.22 285)',
  gradientSize = 280,
  gradientOpacity = 0.18,
  children,
  ...rest
}: MagicCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--zui-mc-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--zui-mc-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn('zui-magic-card group', className)}
      style={
        {
          '--zui-mc-color': gradientColor,
          '--zui-mc-size':  `${gradientSize}px`,
          '--zui-mc-opacity': gradientOpacity,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </div>
  );
}
