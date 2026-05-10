import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Loader2, Square } from 'lucide-react';
import { cn } from '../../utils/cn';
import './AIGenerating.css';

/* -------------------------------- Types -------------------------------- */

export interface AIGeneratingChip {
  id?: string;
  icon?: ReactNode;
  label: ReactNode;
  onClick?: () => void;
}

export type AIGeneratingPreset =
  | 'gradient' /* default — blue → pink → orange */
  | 'aurora'   /* green → blue → violet */
  | 'sunrise'  /* peach → pink → coral */
  | 'mono';    /* dark gray → black */

export interface AIGeneratingProps extends HTMLAttributes<HTMLDivElement> {
  /** Status text shown in the gradient header. Defaults to "GENERATING…". */
  status?: ReactNode;
  /** Header gradient preset. */
  preset?: AIGeneratingPreset;
  /** Override the gradient — passes straight to background-image. */
  gradient?: string;
  /** Streaming text body. Pass a plain string and we'll show the caret. */
  text?: string;
  /** Or pass any ReactNode for richer streamed content. */
  children?: ReactNode;
  /** Show the typing caret at the end of the streamed text. Defaults true. */
  caret?: boolean;
  /** Bottom action chips. */
  chips?: AIGeneratingChip[];
  /** Stop button click. Hidden if not set. */
  onStop?: () => void;
  /** Show a small spinner next to the status text. Defaults true. */
  spinner?: boolean;
}

/* ----------------------------- Component ----------------------------- */

/**
 * "Generating…" card. Two stacked panels:
 *   • header — gradient pill with status + spinner + stop button
 *   • body   — streaming text with caret + optional action chips at the foot
 */
export const AIGenerating = forwardRef<HTMLDivElement, AIGeneratingProps>(
  function AIGenerating(
    {
      status = 'GENERATING…',
      preset = 'gradient',
      gradient,
      text,
      caret = true,
      chips,
      onStop,
      spinner = true,
      className,
      children,
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        data-preset={preset}
        className={cn('zui-aigen', className)}
        style={
          gradient
            ? ({
                ['--zui-aig-gradient' as string]: gradient,
              } as React.CSSProperties)
            : undefined
        }
        {...rest}
      >
        {/* Header */}
        <div className="zui-aigen__head">
          <div className="zui-aigen__status">
            {spinner && (
              <Loader2 className="size-4 animate-spin" strokeWidth={2.5} />
            )}
            <span className="zui-aigen__status-label">{status}</span>
          </div>

          {onStop && (
            <button
              type="button"
              aria-label="Stop"
              onClick={onStop}
              className="zui-aigen__stop"
            >
              <Square className="size-3 fill-current" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="zui-aigen__body">
          <div className="zui-aigen__text">
            {children ?? (
              <>
                {text}
                {caret && <span className="zui-aigen__caret" aria-hidden />}
              </>
            )}
          </div>

          {chips && chips.length > 0 && (
            <div className="zui-aigen__chips">
              {chips.map((c, i) => (
                <button
                  key={c.id ?? i}
                  type="button"
                  className="zui-aigen__chip"
                  onClick={c.onClick}
                >
                  {c.icon && (
                    <span className="zui-aigen__chip-icon">{c.icon}</span>
                  )}
                  <span className="zui-aigen__chip-label">{c.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);
