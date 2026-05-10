import { forwardRef, useState, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import './Switch3D.css';

export interface Switch3DProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Controlled value. */
  checked?: boolean;
  /** Initial value when uncontrolled. */
  defaultChecked?: boolean;
  /** Fires after the user toggles. */
  onChange?: (next: boolean) => void;
  /** Show ON/OFF text inside the thumb. Defaults to true. */
  showLabel?: boolean;
  /** Custom labels — pass false (or '') to hide either side. */
  labels?: { on?: string; off?: string };
  disabled?: boolean;
}

/**
 * 3D ON/OFF toggle. Recessed track, raised thumb, single horizontal slide.
 * Controlled if `checked` is provided, otherwise uncontrolled.
 */
export const Switch3D = forwardRef<HTMLButtonElement, Switch3DProps>(
  function Switch3D(
    {
      checked,
      defaultChecked = false,
      onChange,
      showLabel = true,
      labels,
      disabled,
      className,
      ...rest
    },
    ref
  ) {
    const [internal, setInternal] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const value = isControlled ? checked : internal;

    const onLabel = labels?.on ?? 'ON';
    const offLabel = labels?.off ?? 'OFF';

    const toggle = () => {
      if (disabled) return;
      const next = !value;
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={value}
        disabled={disabled}
        onClick={toggle}
        data-state={value ? 'on' : 'off'}
        className={cn('zui-switch3d', className)}
        {...rest}
      >
        <span className="zui-switch3d__track" aria-hidden>
          <span className="zui-switch3d__edge zui-switch3d__edge--on">
            {showLabel && onLabel}
          </span>
          <span className="zui-switch3d__edge zui-switch3d__edge--off">
            {showLabel && offLabel}
          </span>
        </span>
        <span className="zui-switch3d__thumb" aria-hidden>
          {showLabel && (
            <span className="zui-switch3d__thumb-label">
              {value ? onLabel : offLabel}
            </span>
          )}
        </span>
      </button>
    );
  }
);
