import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Check, Pause, Play } from 'lucide-react';
import { cn } from '../../utils/cn';
import './AIRecorder.css';

/* -------------------------------- Types -------------------------------- */

export type AIRecorderState = 'recording' | 'paused' | 'idle';

export interface AIRecorderProps extends HTMLAttributes<HTMLDivElement> {
  /** Prompt shown above the timer. */
  prompt?: ReactNode;
  /** Theme override. */
  appearance?: 'light' | 'dark';

  /** Internal lifecycle. Defaults to "recording". */
  state?: AIRecorderState;
  /** Initial duration in seconds when uncontrolled. */
  defaultSeconds?: number;
  /** Controlled duration in seconds. */
  seconds?: number;

  /** Auto-tick the seconds counter while state="recording". Defaults true. */
  autoTick?: boolean;

  onCancel?: () => void;
  /** Click on the pause / play toggle. Receives the next state. */
  onTogglePause?: (next: AIRecorderState) => void;
  onConfirm?: () => void;
}

/* ----------------------------- Component ----------------------------- */

/**
 * Voice / quick-note recorder. Inset pill with cancel + timer + pause + check.
 *
 * Auto-ticks the timer while `state === "recording"` so you can drop it in
 * uncontrolled. For controlled usage, pass both `seconds` and `state`.
 */
export const AIRecorder = forwardRef<HTMLDivElement, AIRecorderProps>(
  function AIRecorder(
    {
      prompt = 'Go ahead, record a quick note',
      appearance,
      state = 'recording',
      defaultSeconds = 0,
      seconds,
      autoTick = true,
      onCancel,
      onTogglePause,
      onConfirm,
      className,
      ...rest
    },
    ref
  ) {
    const [internal, setInternal] = useState(defaultSeconds);
    const isControlled = seconds !== undefined;
    const value = isControlled ? seconds : internal;

    const tickRef = useRef<number | null>(null);

    useEffect(() => {
      // Tick once per second while recording (uncontrolled only).
      if (!autoTick || isControlled) return;
      if (state !== 'recording') return;

      tickRef.current = window.setInterval(() => {
        setInternal((s) => s + 1);
      }, 1000);

      return () => {
        if (tickRef.current !== null) {
          window.clearInterval(tickRef.current);
          tickRef.current = null;
        }
      };
    }, [autoTick, isControlled, state]);

    const togglePause = () => {
      const next: AIRecorderState = state === 'recording' ? 'paused' : 'recording';
      onTogglePause?.(next);
    };

    return (
      <div
        ref={ref}
        data-appearance={appearance}
        data-state={state}
        className={cn('zui-airec', className)}
        {...rest}
      >
        <div className="zui-airec__prompt">{prompt}</div>

        <div className="zui-airec__row">
          <button
            type="button"
            className="zui-airec__cancel"
            onClick={onCancel}
          >
            Cancel
          </button>

          <div className="zui-airec__center">
            <span
              className={cn(
                'zui-airec__dot',
                state === 'paused' && 'zui-airec__dot--paused'
              )}
              aria-hidden
            />
            <span className="zui-airec__time">{formatHMS(value)}</span>
          </div>

          <div className="zui-airec__actions">
            <button
              type="button"
              className="zui-airec__pause"
              aria-label={state === 'recording' ? 'Pause' : 'Resume'}
              onClick={togglePause}
            >
              {state === 'recording' ? (
                <Pause className="size-4" />
              ) : (
                <Play className="size-4" />
              )}
            </button>
            <button
              type="button"
              className="zui-airec__confirm"
              aria-label="Confirm"
              onClick={onConfirm}
            >
              <Check className="size-4" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

/** "0:04:21" — match the screenshot's H:MM:SS for ≥ 1 hour, M:SS otherwise. */
function formatHMS(total: number): string {
  const t = Math.max(0, Math.floor(total));
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  if (h > 0) {
    return `${h}:${pad(m)}:${pad(s)}`;
  }
  // Match the reference: leading zero on hours even at 0
  return `0:${pad(m)}:${pad(s)}`;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}
