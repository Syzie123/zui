import {
  forwardRef,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import {
  ArrowUp,
  ChevronDown,
  Mic,
  MoreHorizontal,
  Square,
  X,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import './AIPrompt.css';

/* -------------------------------- Types -------------------------------- */

export interface AIPromptTag {
  id?: string;
  icon?: ReactNode;
  label: ReactNode;
  /** Right-side hint inside the pill, eg. "Today". */
  suffix?: ReactNode;
  onRemove?: () => void;
}

export interface AIPromptTool {
  id?: string;
  icon: ReactNode;
  label?: string;
  active?: boolean;
  onClick?: () => void;
}

export interface AIPromptSuggestion {
  id?: string;
  icon?: ReactNode;
  label: ReactNode;
  onClick?: () => void;
}

export interface AIPromptModel {
  icon?: ReactNode;
  label: ReactNode;
  onClick?: () => void;
}

export type AIPromptMode = 'compose' | 'followup';
export type AIPromptStreamState = 'idle' | 'streaming';

export interface AIPromptProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSubmit'> {
  /** Layout / visual mode. */
  mode?: AIPromptMode;
  /** Theme override — picks light vs dark surface explicitly. */
  appearance?: 'light' | 'dark';

  /** Controlled input value. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Fires when the user hits Enter or clicks Send. */
  onSubmit?: (value: string) => void;

  placeholder?: string;
  /** Maximum visible rows for the textarea (1 = collapsed input). */
  maxRows?: number;
  /** Disable the entire control. */
  disabled?: boolean;

  /** Pills shown above the input — eg. attached docs, @-mentions. */
  tags?: AIPromptTag[];

  /** Model picker shown bottom-left (compose mode). */
  model?: AIPromptModel;
  /** Tool icons shown after the model picker (compose mode). */
  tools?: AIPromptTool[];

  /** Suggestion chips shown bottom-left (followup mode). */
  suggestions?: AIPromptSuggestion[];
  /** Cancel button click (followup mode). Hidden if not set. */
  onCancel?: () => void;

  /** Show / wire the mic button. Pass null to hide. */
  onVoice?: (() => void) | null;
  voiceActive?: boolean;

  /** Toggle the send button into a "Stop" state and use `onStop` instead. */
  state?: AIPromptStreamState;
  onStop?: () => void;
}

/* ------------------------------- Component ------------------------------- */

/**
 * Multi-mode AI composer. Two modes share one shell:
 *   • compose  — model picker + tool icons + send
 *   • followup — cancel + suggestion chips + stop / send
 *
 * Both modes accept tags, full-control of value, voice handler, and a
 * `state` flag that flips the send button into a stop button while the
 * stream is running. All slots accept ReactNode for full customization.
 */
export const AIPrompt = forwardRef<HTMLDivElement, AIPromptProps>(
  function AIPrompt(
    {
      mode = 'compose',
      appearance,
      value,
      defaultValue = '',
      onChange,
      onSubmit,
      placeholder,
      maxRows = 6,
      disabled,
      tags,
      model,
      tools,
      suggestions,
      onCancel,
      onVoice,
      voiceActive,
      state = 'idle',
      onStop,
      className,
      ...rest
    },
    ref
  ) {
    const [internal, setInternal] = useState(defaultValue);
    const isControlled = value !== undefined;
    const v = isControlled ? value : internal;

    const taRef = useRef<HTMLTextAreaElement | null>(null);

    const setValue = (next: string) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };

    const submit = () => {
      const trimmed = (v ?? '').trim();
      if (!trimmed || disabled) return;
      onSubmit?.(trimmed);
      // Clear when uncontrolled — controlled callers manage themselves.
      if (!isControlled) setInternal('');
    };

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submit();
      }
    };

    const showCompose = mode === 'compose';
    const showFollowup = mode === 'followup';

    const placeholderText =
      placeholder ??
      (showFollowup
        ? 'Ask a follow-up. Use @ to tag docs or files.'
        : 'Ask anything…');

    const isStreaming = state === 'streaming';
    const sendDisabled = disabled || (!isStreaming && !(v ?? '').trim());

    return (
      <div
        ref={ref}
        data-mode={mode}
        data-appearance={appearance}
        data-state={state}
        className={cn('zui-aiprompt', `zui-aiprompt--${mode}`, className)}
        {...rest}
      >
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="zui-aiprompt__tags">
            {tags.map((t, i) => (
              <span key={t.id ?? i} className="zui-aiprompt__tag">
                {t.icon && <span className="zui-aiprompt__tag-icon">{t.icon}</span>}
                <span className="zui-aiprompt__tag-label">{t.label}</span>
                {t.suffix && (
                  <span className="zui-aiprompt__tag-suffix">{t.suffix}</span>
                )}
                {t.onRemove && (
                  <button
                    type="button"
                    aria-label="Remove"
                    className="zui-aiprompt__tag-x"
                    onClick={t.onRemove}
                  >
                    <X className="size-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="zui-aiprompt__input-row">
          <textarea
            ref={taRef}
            className="zui-aiprompt__input"
            placeholder={placeholderText}
            value={v}
            disabled={disabled}
            rows={1}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            style={{ maxHeight: `${maxRows * 1.5}em` }}
          />
        </div>

        {/* Footer */}
        <div className="zui-aiprompt__footer">
          {/* LEFT — mode-specific */}
          <div className="zui-aiprompt__left">
            {showCompose && (
              <>
                <button type="button" className="zui-aiprompt__plus" aria-label="Add">
                  <Plus />
                </button>
                {model && (
                  <button
                    type="button"
                    className="zui-aiprompt__model"
                    onClick={model.onClick}
                  >
                    {model.icon && (
                      <span className="zui-aiprompt__model-icon">{model.icon}</span>
                    )}
                    <span className="zui-aiprompt__model-label">{model.label}</span>
                    <ChevronDown className="size-3.5 opacity-70" />
                  </button>
                )}
                {tools && tools.length > 0 && (
                  <div className="zui-aiprompt__tools">
                    {tools.map((t, i) => (
                      <button
                        key={t.id ?? i}
                        type="button"
                        title={t.label}
                        aria-label={t.label}
                        onClick={t.onClick}
                        data-active={t.active || undefined}
                        className="zui-aiprompt__tool"
                      >
                        {t.icon}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="zui-aiprompt__tool"
                      aria-label="More tools"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                  </div>
                )}
              </>
            )}

            {showFollowup && (
              <>
                {onCancel && (
                  <button
                    type="button"
                    className="zui-aiprompt__cancel"
                    aria-label="Cancel"
                    onClick={onCancel}
                  >
                    <X className="size-4" />
                  </button>
                )}
                {suggestions && suggestions.length > 0 && (
                  <div className="zui-aiprompt__suggestions">
                    {suggestions.map((s, i) => (
                      <button
                        key={s.id ?? i}
                        type="button"
                        className="zui-aiprompt__suggestion"
                        onClick={s.onClick}
                      >
                        {s.icon && (
                          <span className="zui-aiprompt__suggestion-icon">
                            {s.icon}
                          </span>
                        )}
                        <span className="zui-aiprompt__suggestion-label">
                          {s.label}
                        </span>
                      </button>
                    ))}
                    <button
                      type="button"
                      className="zui-aiprompt__suggestion-more"
                      aria-label="More suggestions"
                    >
                      <ChevronDown className="size-4 -rotate-90" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* RIGHT — voice + send/stop */}
          <div className="zui-aiprompt__right">
            {onVoice !== null && (
              <button
                type="button"
                aria-label="Voice"
                aria-pressed={voiceActive}
                onClick={onVoice ?? undefined}
                disabled={disabled}
                data-active={voiceActive || undefined}
                className="zui-aiprompt__voice"
              >
                <Mic className="size-4" />
              </button>
            )}
            <button
              type="button"
              aria-label={isStreaming ? 'Stop' : 'Send'}
              onClick={isStreaming ? onStop : submit}
              disabled={isStreaming ? false : sendDisabled}
              className="zui-aiprompt__send"
            >
              {isStreaming ? (
                <Square className="size-3 fill-current" />
              ) : (
                <ArrowUp className="size-4" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

/* Tiny inline icon — Lucide's Plus is heavier than we need here. */
function Plus() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path
        d="M8 3v10M3 8h10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
