import { useTheme, type Theme } from '../hooks/useTheme';
import { cn } from '../utils/cn';

interface LogoProps {
  size?: number;
  className?: string;
  /** Override the active theme — used by the landing where the surface
   *  is locked dark regardless of the global preference. */
  forceTheme?: Theme;
}

/**
 * Theme-aware logo. Uses the SVGs in /public/logo/ — `light.svg` for the
 * Clean theme (dark logo on white), `dark.svg` for Dark / Luminous (white
 * logo on black). Switches via the global theme state, no flicker.
 */
export function Logo({ size = 28, className, forceTheme }: LogoProps) {
  const { theme: active } = useTheme();
  const theme = forceTheme ?? active;
  const src = theme === 'clean' ? '/logo/light.svg' : '/logo/dark.svg';

  return (
    <img
      src={src}
      alt="ZUI"
      width={size}
      height={size}
      className={cn('shrink-0 select-none', className)}
      style={{ width: size, height: size }}
      draggable={false}
    />
  );
}
