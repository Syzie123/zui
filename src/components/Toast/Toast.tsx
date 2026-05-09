import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export type ToastTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export interface ToastOptions {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
  /** Milliseconds before auto-dismiss. `Infinity` to keep open. */
  duration?: number;
  action?: { label: string; onClick: () => void };
}

type ToastEntry = Omit<ToastOptions, 'id'> & {
  id: string;
  open: boolean;
};

/* ─────────────────────────── Context ─────────────────────────── */

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <Toast.Provider>');
  return ctx;
}

/* ─────────────────────────── Provider ─────────────────────────── */

interface ToastProviderProps {
  children: ReactNode;
  /** How long toasts stay open by default. */
  duration?: number;
  /** Stack direction & origin. */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'top-center' | 'bottom-center';
  swipeDirection?: 'right' | 'left' | 'up' | 'down';
  /** Maximum simultaneously visible toasts. Older ones are dismissed. */
  limit?: number;
}

export function ToastProvider({
  children,
  duration = 5000,
  position = 'bottom-right',
  swipeDirection = 'right',
  limit = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const idSeed = useId();

  const dismiss = useCallback((id?: string) => {
    setToasts((arr) =>
      arr.map((t) => (id === undefined || t.id === id ? { ...t, open: false } : t))
    );
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((arr) => arr.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (opts: ToastOptions) => {
      const id = opts.id ?? `${idSeed}-${Math.random().toString(36).slice(2, 8)}`;
      setToasts((arr) => {
        const next: ToastEntry = { open: true, ...opts, id };
        const pruned =
          arr.length >= limit
            ? arr.slice(arr.length - limit + 1)
            : arr;
        return [...pruned, next];
      });
      return id;
    },
    [idSeed, limit]
  );

  const ctx = useMemo<ToastContextValue>(
    () => ({ toast, dismiss }),
    [toast, dismiss]
  );

  const positionClasses = {
    'bottom-right':  'bottom-0 right-0 flex-col',
    'bottom-left':   'bottom-0 left-0  flex-col',
    'top-right':     'top-0    right-0 flex-col-reverse',
    'top-left':      'top-0    left-0  flex-col-reverse',
    'top-center':    'top-0    left-1/2 -translate-x-1/2 flex-col-reverse',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 flex-col',
  }[position];

  return (
    <ToastContext.Provider value={ctx}>
      <RadixToast.Provider duration={duration} swipeDirection={swipeDirection}>
        {children}
        {toasts.map((t) => (
          <ToastView
            key={t.id}
            entry={t}
            onOpenChange={(open) => {
              if (!open) {
                dismiss(t.id);
                // Wait for exit animation, then remove from DOM
                setTimeout(() => remove(t.id), 240);
              }
            }}
            onAction={() => {
              t.action?.onClick();
              dismiss(t.id);
            }}
          />
        ))}
        <RadixToast.Viewport
          className={cn(
            'fixed z-[var(--z-toast)] flex w-[calc(100vw-2rem)] sm:w-[24rem]',
            'gap-2 p-4 outline-none',
            positionClasses
          )}
        />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}

/* ─────────────────────────── Single toast view ─────────────────────────── */

const TONE_ICON: Record<ToastTone, ReactNode> = {
  neutral: null,
  success: <CheckCircle2 className="size-5 text-[var(--color-success)]" />,
  warning: <AlertTriangle className="size-5 text-[var(--color-warning)]" />,
  danger:  <AlertCircle className="size-5 text-[var(--color-danger)]" />,
  info:    <Info className="size-5 text-[var(--color-info)]" />,
};

interface ToastViewProps {
  entry: ToastEntry;
  onOpenChange: (open: boolean) => void;
  onAction: () => void;
}

const ToastView = forwardRef<HTMLLIElement, ToastViewProps>(function ToastView(
  { entry, onOpenChange, onAction },
  ref
) {
  const { title, description, tone = 'neutral', duration, action, open } = entry;

  return (
    <RadixToast.Root
      ref={ref}
      open={open}
      onOpenChange={onOpenChange}
      duration={duration}
      className={cn(
        'group relative flex items-start gap-3 p-4 pr-10',
        'rounded-[var(--radius-xl)] bg-[var(--color-bg-elevated)]',
        'border border-[var(--color-border-base)]',
        'shadow-[var(--shadow-lg)]',
        // Swipe & open/close animations
        'data-[state=open]:animate-[zui-slide-from-right_var(--duration-slow)_var(--ease-out)]',
        'data-[state=closed]:animate-[zui-slide-to-right_var(--duration-base)_var(--ease-in)]',
        'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
        'data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform',
        'data-[swipe=end]:animate-[zui-slide-to-right_var(--duration-base)_var(--ease-in)]',
        'will-change-transform'
      )}
    >
      {tone !== 'neutral' && (
        <span className="mt-0.5 inline-flex shrink-0">{TONE_ICON[tone]}</span>
      )}
      <div className="grow space-y-0.5">
        {title && (
          <RadixToast.Title className="text-sm font-semibold leading-tight tracking-[-0.01em] text-[var(--color-fg-base)]">
            {title}
          </RadixToast.Title>
        )}
        {description && (
          <RadixToast.Description className="text-sm leading-snug text-[var(--color-fg-muted)]">
            {description}
          </RadixToast.Description>
        )}
        {action && (
          <RadixToast.Action
            altText={action.label}
            onClick={onAction}
            className={cn(
              'mt-2 inline-flex h-8 items-center px-3',
              'text-xs font-medium rounded-[var(--radius-md)]',
              'bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-muted)]',
              'transition-colors duration-[var(--duration-fast)]'
            )}
          >
            {action.label}
          </RadixToast.Action>
        )}
      </div>
      <RadixToast.Close
        aria-label="Close"
        className={cn(
          'absolute right-2 top-2 inline-flex size-7 items-center justify-center',
          'rounded-[var(--radius-md)] text-[var(--color-fg-subtle)]',
          'transition-colors duration-[var(--duration-fast)]',
          'hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg-base)]',
          'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]'
        )}
      >
        <X className="size-3.5" />
      </RadixToast.Close>
    </RadixToast.Root>
  );
});

/* Convenience namespace */
export const Toast = {
  Provider: ToastProvider,
};
