import { Children, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './Marquee.css';

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  /** Reverse direction. */
  reverse?: boolean;
  /** Stop animation on hover. */
  pauseOnHover?: boolean;
  /** Vertical scrolling instead of horizontal. */
  vertical?: boolean;
  /** Animation duration in seconds. */
  speed?: number;
  /** Number of times the children are duplicated to fill the track. */
  repeat?: number;
  /** Show fade-out gradients on the edges. */
  fade?: boolean;
  children: ReactNode;
}

/**
 * Endless scrolling row/column. Pure CSS animation on `transform: translate()`,
 * never width — never trips layout.
 */
export function Marquee({
  className,
  reverse,
  pauseOnHover,
  vertical,
  speed = 30,
  repeat = 4,
  fade = true,
  children,
  ...rest
}: MarqueeProps) {
  return (
    <div
      {...rest}
      data-direction={vertical ? 'vertical' : 'horizontal'}
      data-fade={fade ? '' : undefined}
      className={cn(
        'zui-marquee group',
        vertical ? 'flex-col' : 'flex-row',
        pauseOnHover && 'zui-marquee--pause',
        className
      )}
      style={{ '--zui-marquee-duration': `${speed}s` } as React.CSSProperties}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            'zui-marquee__track',
            vertical ? 'flex-col' : 'flex-row',
            reverse && 'zui-marquee__track--reverse'
          )}
        >
          {Children.toArray(children)}
        </div>
      ))}
    </div>
  );
}
