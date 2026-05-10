import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import './ImageCard3D.css';

export interface ImageCard3DProps extends HTMLAttributes<HTMLDivElement> {
  /** Image URL. */
  src: string;
  alt?: string;
  /** Title shown in the floating tag. */
  title: string;
  /** Subtitle / kicker line — typically a category or short blurb. */
  subtitle?: string;
  /** Icon shown left of the title (small avatar/logo well). */
  icon?: ReactNode;
  /** Click handler for the right-side CTA chevron. */
  onAction?: () => void;
  /** Hide the action chevron entirely. */
  hideAction?: boolean;
  /** Aspect ratio of the image card. Defaults to 4/5 (portrait). */
  ratio?: 'portrait' | 'square' | 'landscape' | 'tall';
}

/**
 * 3D image card with a floating raised tag in the corner.
 *
 * Layout = a single rounded image with a glassy/raised pill anchored to the
 * bottom-left, holding an icon, a two-line title block, and an optional CTA.
 */
export const ImageCard3D = forwardRef<HTMLDivElement, ImageCard3DProps>(
  function ImageCard3D(
    {
      src,
      alt = '',
      title,
      subtitle,
      icon,
      onAction,
      hideAction,
      ratio = 'portrait',
      className,
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn('zui-imgcard3d', `zui-imgcard3d--${ratio}`, className)}
        {...rest}
      >
        <img className="zui-imgcard3d__img" src={src} alt={alt} loading="lazy" />

        <div className="zui-imgcard3d__tag">
          {icon && <span className="zui-imgcard3d__well">{icon}</span>}
          <span className="zui-imgcard3d__text">
            <span className="zui-imgcard3d__title">{title}</span>
            {subtitle && (
              <span className="zui-imgcard3d__subtitle">{subtitle}</span>
            )}
          </span>
          {!hideAction && (
            <button
              type="button"
              className="zui-imgcard3d__cta"
              onClick={onAction}
              aria-label="Open"
            >
              <ChevronRight className="size-4" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    );
  }
);
