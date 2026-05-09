import { useEffect, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';

export interface NumberTickerProps {
  /** Target value. */
  value: number;
  /** Starting value (defaults to 0). */
  from?: number;
  /** Animation duration in ms. */
  duration?: number;
  /** Decimal places. */
  decimals?: number;
  /** Locale-aware formatting (defaults to en-US). */
  locale?: string;
  /** Prefix shown before the number (e.g. "$"). */
  prefix?: string;
  /** Suffix shown after the number (e.g. "%"). */
  suffix?: string;
  className?: string;
}

/**
 * Smoothly counts up to `value` when scrolled into view.
 * Uses `requestAnimationFrame` with an ease-out curve. JS-driven,
 * but only writes `textContent` on each tick — no React re-render.
 */
export function NumberTicker({
  value,
  from = 0,
  duration = 1600,
  decimals = 0,
  locale = 'en-US',
  prefix = '',
  suffix = '',
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || played) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlayed(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [played]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !played) return;

    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (value - from) * eased;
      el.textContent = `${prefix}${formatter.format(current)}${suffix}`;
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [played, value, from, duration, decimals, locale, prefix, suffix]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {played ? '' : new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(from)}
      {suffix}
    </span>
  );
}
