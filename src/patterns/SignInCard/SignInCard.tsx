import { useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import {
  GoogleIcon,
  AppleIcon,
  MicrosoftIcon,
  FacebookIcon,
} from '../../components/icons/brand';

export type SignInProvider =
  | 'google'
  | 'apple'
  | 'microsoft'
  | 'facebook';

const PROVIDER_META: Record<
  SignInProvider,
  { label: string; icon: (cls: string) => ReactNode }
> = {
  google:    { label: 'Sign In with Google',    icon: (c) => <GoogleIcon className={c} /> },
  apple:     { label: 'Sign In with Apple',     icon: (c) => <AppleIcon className={c} /> },
  microsoft: { label: 'Sign In with Microsoft', icon: (c) => <MicrosoftIcon className={c} /> },
  facebook:  { label: 'Sign In with Facebook',  icon: (c) => <FacebookIcon className={c} /> },
};

export interface SignInCardProps {
  title?: string;
  subtitle?: string;
  /** OAuth providers to show as buttons. Order matters. */
  providers?: SignInProvider[];
  /** Click handler per provider. */
  onProvider?: (p: SignInProvider) => void;
  /** Email submit handler. Disable email path by passing `null`. */
  onEmailSubmit?: ((email: string) => void) | null;
  /** SSO link click. If absent, the link is hidden. */
  onSso?: () => void;
  /** Footer legal text — JSX, so you can add links. */
  legal?: ReactNode;
  /** Show a top-right close button. */
  onClose?: () => void;
  /**
   * Visual variant.
   *  - "gradient" — bright multi-stop background (Kapwing-style).
   *  - "clean" — neutral surface, dark in dark mode.
   */
  variant?: 'gradient' | 'clean';
  className?: string;
}

export function SignInCard({
  title = 'Sign in to continue',
  subtitle = 'Sign in to save content to a workspace, comment, and more.',
  providers = ['google', 'apple', 'microsoft', 'facebook'],
  onProvider,
  onEmailSubmit,
  onSso,
  legal,
  onClose,
  variant = 'gradient',
  className,
}: SignInCardProps) {
  const [email, setEmail] = useState('');
  const isGradient = variant === 'gradient';

  return (
    <div
      className={cn(
        'relative w-full max-w-md overflow-hidden p-7 sm:p-9',
        'rounded-[var(--radius-2xl)]',
        isGradient
          ? 'text-white bg-[radial-gradient(120%_80%_at_30%_0%,oklch(72%_0.20_30)_0%,oklch(60%_0.25_15)_55%,oklch(55%_0.24_350)_100%)]'
          : 'bg-[var(--color-bg-elevated)] text-[var(--color-fg-base)] border border-[var(--color-border-base)]',
        className
      )}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={cn(
            'absolute right-4 top-4 inline-flex size-8 items-center justify-center',
            'rounded-full transition-colors',
            isGradient
              ? 'text-white/80 hover:bg-white/15 hover:text-white'
              : 'text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg-base)]'
          )}
        >
          <X className="size-4" />
        </button>
      )}

      <header className="text-center">
        <h2
          className={cn(
            'font-display text-2xl font-bold tracking-[-0.02em] sm:text-[28px]'
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              'mx-auto mt-2 max-w-xs text-[13px] leading-snug',
              isGradient ? 'text-white/80' : 'text-[var(--color-fg-muted)]'
            )}
          >
            {subtitle}
          </p>
        )}
      </header>

      {/* Provider stack */}
      <div className="mt-7 flex flex-col gap-3">
        {providers.map((p) => (
          <ProviderButton
            key={p}
            provider={p}
            variant={variant}
            onClick={() => onProvider?.(p)}
          />
        ))}
      </div>

      {/* Divider + email */}
      {onEmailSubmit !== null && (
        <>
          <div
            className={cn(
              'my-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em]',
              isGradient ? 'text-white/70' : 'text-[var(--color-fg-subtle)]'
            )}
          >
            <span className={cn('h-px flex-1', isGradient ? 'bg-white/25' : 'bg-[var(--color-border-base)]')} />
            or
            <span className={cn('h-px flex-1', isGradient ? 'bg-white/25' : 'bg-[var(--color-border-base)]')} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) onEmailSubmit?.(email);
            }}
            className="flex flex-col gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={cn(
                'h-12 w-full rounded-full px-5 text-[15px] outline-none',
                'transition-colors',
                isGradient
                  ? 'border border-white/30 bg-white/15 text-white placeholder:text-white/65 focus:border-white/60 focus:bg-white/20'
                  : 'border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)] text-[var(--color-fg-base)] placeholder:text-[var(--color-fg-subtle)] focus:border-[var(--color-fg-base)]'
              )}
            />
            <button
              type="submit"
              disabled={!email}
              className={cn(
                'h-12 w-full rounded-full text-[15px] font-semibold tracking-[-0.005em]',
                'transition-colors',
                isGradient
                  ? 'bg-white text-[oklch(15%_0_0)] hover:bg-white/90'
                  : 'bg-[var(--color-fg-base)] text-[var(--color-bg-base)] hover:opacity-90',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              Continue with email
            </button>
          </form>
        </>
      )}

      {onSso && (
        <p className="mt-5 text-center text-[13px]">
          <button
            type="button"
            onClick={onSso}
            className={cn(
              'underline underline-offset-4 transition-colors',
              isGradient ? 'text-white hover:text-white/80' : 'text-[var(--color-fg-base)] hover:text-[var(--color-accent-base)]'
            )}
          >
            Or, sign in with Enterprise SSO instead
          </button>
        </p>
      )}

      {legal && (
        <p
          className={cn(
            'mt-7 text-center text-[10.5px] uppercase tracking-[0.12em]',
            isGradient ? 'text-white/65' : 'text-[var(--color-fg-subtle)]'
          )}
        >
          {legal}
        </p>
      )}
    </div>
  );
}

function ProviderButton({
  provider,
  variant,
  onClick,
}: {
  provider: SignInProvider;
  variant: 'gradient' | 'clean';
  onClick: () => void;
}) {
  const meta = PROVIDER_META[provider];
  const isGradient = variant === 'gradient';

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex h-12 w-full items-center justify-center gap-3 rounded-full',
        'text-[15px] font-semibold tracking-[-0.005em]',
        'transition-colors duration-[var(--duration-fast)]',
        'bg-white text-[oklch(15%_0_0)]',
        'hover:bg-white/95',
        // when "clean" inside dark mode, bg stays white but ring helps
        !isGradient && 'border border-[var(--color-border-base)]'
      )}
    >
      {meta.icon('size-5')}
      <span>{meta.label}</span>
    </button>
  );
}
