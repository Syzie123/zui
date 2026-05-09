import { useTheme } from '../hooks/useTheme';
import { cn } from '../utils/cn';

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * Theme-aware logo. Uses the SVGs in /public/logo/ — `light.svg` for the
 * Clean theme (dark logo on white), `dark.svg` for Dark / Luminous (white
 * logo on black). Switches via the global theme state, no flicker.
 */
export function Logo({ size = 28, className }: LogoProps) {
  const { theme } = useTheme();
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
