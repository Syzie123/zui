import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import './Action3D.css';

export interface Action3DProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Solid / soft. */
  variant?: 'primary' | 'secondary';
  /** Icon shown on the left in a circular well. */
  icon?: ReactNode;
  /** Show a right chevron in its own circular well. Defaults to true. */
  chevron?: boolean;
  /** Larger pill height. */
  size?: 'md' | 'lg';
}

/**
 * 3D action pill — raised neumorphic look with an inner well on each end.
 *
 * Animation budget is intentionally tiny: the whole pill drops 1px on press
 * and the outer shadow shrinks. No glow, no scale, no color flash.
 */
export const Action3D = forwardRef<HTMLButtonElement, Action3DProps>(
  function Action3D(
    {
      variant = 'primary',
      icon,
      chevron = true,
      size = 'lg',
      className,
      children,
      ...rest
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'zui-action3d',
          variant === 'primary' && 'zui-action3d--primary',
          variant === 'secondary' && 'zui-action3d--secondary',
          size === 'md' && 'zui-action3d--md',
          size === 'lg' && 'zui-action3d--lg',
          className
        )}
        {...rest}
      >
        {icon && <span className="zui-action3d__well">{icon}</span>}
        <span className="zui-action3d__label">{children}</span>
        {chevron && (
          <span className="zui-action3d__well zui-action3d__well--end">
            <ChevronRight className="size-4" strokeWidth={2.5} />
          </span>
        )}
      </button>
    );
  }
);
