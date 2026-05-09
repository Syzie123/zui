import { useRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './Dock.css';

export interface DockProps extends HTMLAttributes<HTMLDivElement> {
  /** Distance over which icons magnify (px). */
  magnification?: number;
  /** Maximum scale at the cursor's center. */
  maxScale?: number;
  children: ReactNode;
}

/**
 * macOS-style dock. Icons within a radius of the cursor scale up smoothly.
 * Math runs on `pointermove` and writes a CSS variable per item — no
 * React state, no rerenders, never blocks the main thread.
 */
export function Dock({
  className,
  magnification = 140,
  maxScale = 1.7,
  children,
  ...rest
}: DockProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>('.zui-dock__item');
    items.forEach((it) => {
      const rect = it.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const dist = Math.abs(e.clientX - center);
      if (dist > magnification) {
        it.style.setProperty('--zui-dock-scale', '1');
      } else {
        const t = 1 - dist / magnification;
        const eased = Math.sin((t * Math.PI) / 2); // ease-out sine
        const scale = 1 + (maxScale - 1) * eased;
        it.style.setProperty('--zui-dock-scale', String(scale));
      }
    });
  };

  const onPointerLeave = () => {
    const root = ref.current;
    if (!root) return;
    root
      .querySelectorAll<HTMLElement>('.zui-dock__item')
      .forEach((it) => it.style.setProperty('--zui-dock-scale', '1'));
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn('zui-dock', className)}
      {...rest}
    >
      {children}
    </div>
  );
}

interface DockItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function DockItem({ className, children, ...rest }: DockItemProps) {
  return (
    <div
      className={cn('zui-dock__item', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
