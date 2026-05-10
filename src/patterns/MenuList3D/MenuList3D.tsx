import {
  forwardRef,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import './MenuList3D.css';

/* -------------------------------- Root --------------------------------- */

export interface MenuList3DProps extends HTMLAttributes<HTMLDivElement> {
  /** Avatar image URL for the header. */
  avatarSrc?: string;
  /** Fallback initial used when there's no avatar image. */
  avatarFallback?: string;
  /** Display name. */
  name?: string;
  /** Email or sub-label under the name. */
  email?: string;
  /** Right-aligned trailing content for the header (eg. version badge). */
  trailing?: ReactNode;
}

interface MenuList3DComp
  extends React.ForwardRefExoticComponent<
    MenuList3DProps & React.RefAttributes<HTMLDivElement>
  > {
  Item: typeof Item;
  Progress: typeof Progress;
  Divider: typeof Divider;
  Group: typeof Group;
}

const MenuList3DRoot = forwardRef<HTMLDivElement, MenuList3DProps>(
  function MenuList3D(
    {
      avatarSrc,
      avatarFallback,
      name,
      email,
      trailing,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const hasHeader = avatarSrc || avatarFallback || name || email || trailing;
    return (
      <div ref={ref} className={cn('zui-menu3d', className)} {...rest}>
        {hasHeader && (
          <div className="zui-menu3d__header">
            <div className="zui-menu3d__avatar">
              {avatarSrc ? (
                <img src={avatarSrc} alt={name ?? 'Avatar'} />
              ) : (
                <span>{(avatarFallback ?? name ?? 'U').slice(0, 1)}</span>
              )}
            </div>
            <div className="zui-menu3d__head-text">
              {name && <span className="zui-menu3d__name">{name}</span>}
              {email && <span className="zui-menu3d__email">{email}</span>}
            </div>
            {trailing && (
              <div className="zui-menu3d__trailing">{trailing}</div>
            )}
          </div>
        )}
        <div className="zui-menu3d__body">{children}</div>
      </div>
    );
  }
);

/* -------------------------------- Item --------------------------------- */

export interface MenuList3DItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  /** Right-side content — small text, badge, etc. Defaults to a chevron. */
  trailing?: ReactNode;
  /** Hide the trailing chevron when no `trailing` is given. */
  hideChevron?: boolean;
  /** Mark as destructive — red text + red icon well. */
  destructive?: boolean;
}

const Item = forwardRef<HTMLButtonElement, MenuList3DItemProps>(
  function MenuList3DItem(
    { icon, trailing, hideChevron, destructive, className, children, ...rest },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'zui-menu3d__item',
          destructive && 'zui-menu3d__item--danger',
          className
        )}
        {...rest}
      >
        {icon && <span className="zui-menu3d__icon">{icon}</span>}
        <span className="zui-menu3d__label">{children}</span>
        <span className="zui-menu3d__trail">
          {trailing ?? (!hideChevron && <ChevronRight className="size-4" />)}
        </span>
      </button>
    );
  }
);

/* ------------------------------ Progress ------------------------------- */

export interface MenuList3DProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–100. */
  value: number;
  /** Label shown above the bar. */
  label?: ReactNode;
  /** Right-aligned hint, eg. "12 / 50 GB". */
  hint?: ReactNode;
}

function Progress({
  value,
  label,
  hint,
  className,
  ...rest
}: MenuList3DProgressProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={cn('zui-menu3d__progress', className)} {...rest}>
      {(label || hint) && (
        <div className="zui-menu3d__progress-head">
          <span className="zui-menu3d__progress-label">{label}</span>
          <span className="zui-menu3d__progress-hint">{hint}</span>
        </div>
      )}
      <div className="zui-menu3d__progress-track" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
        <div className="zui-menu3d__progress-fill" style={{ width: `${v}%` }} />
      </div>
    </div>
  );
}

/* ------------------------------ Divider/Group ------------------------------- */

function Divider({ className, ...rest }: HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn('zui-menu3d__divider', className)} {...rest} />;
}

interface GroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
}

function Group({ label, className, children, ...rest }: GroupProps) {
  return (
    <div className={cn('zui-menu3d__group', className)} {...rest}>
      {label && <div className="zui-menu3d__group-label">{label}</div>}
      <div className="zui-menu3d__group-body">{children}</div>
    </div>
  );
}

const MenuList3D = MenuList3DRoot as MenuList3DComp;
MenuList3D.Item = Item;
MenuList3D.Progress = Progress;
MenuList3D.Divider = Divider;
MenuList3D.Group = Group;

export { MenuList3D };
