import { useState, type ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';
import {
  GoogleIcon,
  AppleIcon,
  FacebookIcon,
} from '../../components/icons/brand';

/**
 * Side-by-side login pattern. Two visual variants:
 *  - "clean":  hero image on the left in its own panel, white form on right
 *              (Realnest reference)
 *  - "glass":  hero image fills the whole right side, glass testimonial on top
 *              (Liam Smith / Real Estate reference)
 *
 * The image is provided as a URL (hot-linked from Unsplash by default — keeps
 * the package small). Pass any image URL you like.
 */

export type LoginSplitVariant = 'clean' | 'glass';

export interface LoginSplitProps {
  /** Image URL for the hero panel (Unsplash defaults provided). */
  imageUrl?: string;
  variant?: LoginSplitVariant;
  /** Welcome heading copy. */
  title?: string;
  subtitle?: string;
  /** Caption shown over the image in the clean variant ("Find your sweet home"). */
  imageCaption?: string;
  imageCaptionSub?: string;
  /** Testimonial shown over the image in the glass variant. */
  testimonial?: { quote: string; name: string; role: string };
  /** Brand name shown top-left in the clean variant. */
  brand?: string;
  brandLogo?: ReactNode;
  /** OAuth providers to show below the form. */
  providers?: ('google' | 'apple' | 'facebook')[];
  onProvider?: (p: string) => void;
  /** Form submit. */
  onLogin?: (creds: { email: string; password: string }) => void;
  /** Footer "Don't have an account?" link. */
  onSignUp?: () => void;
  className?: string;
}

const DEFAULT_IMG_CLEAN =
  'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?q=80&w=1200&auto=format&fit=crop';
const DEFAULT_IMG_GLASS =
  'https://plus.unsplash.com/premium_photo-1682377521753-58d1fd9fa5ce?q=80&w=1600&auto=format&fit=crop';

export function LoginSplit({
  variant = 'clean',
  imageUrl,
  title = 'Welcome back!',
  subtitle = 'Sign in to your account',
  imageCaption = 'Find your sweet home',
  imageCaptionSub = 'Schedule visits in just a few clicks',
  testimonial,
  brand = 'Realnest',
  brandLogo,
  providers = ['google', 'apple', 'facebook'],
  onProvider,
  onLogin,
  onSignUp,
  className,
}: LoginSplitProps) {
  if (variant === 'glass') {
    return (
      <GlassVariant
        imageUrl={imageUrl ?? DEFAULT_IMG_GLASS}
        title={title}
        subtitle={subtitle}
        testimonial={
          testimonial ?? {
            quote:
              'With this app, I can manage my global property portfolio and complete secure transactions in minutes — all with crypto.',
            name: 'Liam Smith',
            role: 'Investor · Global Real Estate Investment Firm',
          }
        }
        providers={providers}
        onProvider={onProvider}
        onLogin={onLogin}
        onSignUp={onSignUp}
        className={className}
      />
    );
  }

  return (
    <CleanVariant
      imageUrl={imageUrl ?? DEFAULT_IMG_CLEAN}
      title={title}
      subtitle={subtitle}
      imageCaption={imageCaption}
      imageCaptionSub={imageCaptionSub}
      brand={brand}
      brandLogo={brandLogo}
      providers={providers}
      onProvider={onProvider}
      onLogin={onLogin}
      onSignUp={onSignUp}
      className={className}
    />
  );
}

/* ────────────────────────────────────────────────────────────
 * Clean variant — image left panel, form right panel.
 * ──────────────────────────────────────────────────────────── */

function CleanVariant({
  imageUrl,
  title,
  subtitle,
  imageCaption,
  imageCaptionSub,
  brand,
  brandLogo,
  providers,
  onProvider,
  onLogin,
  onSignUp,
  className,
}: Required<
  Pick<
    LoginSplitProps,
    | 'imageUrl'
    | 'title'
    | 'subtitle'
    | 'imageCaption'
    | 'imageCaptionSub'
    | 'brand'
    | 'providers'
  >
> &
  Pick<LoginSplitProps, 'brandLogo' | 'onProvider' | 'onLogin' | 'onSignUp' | 'className'>) {
  return (
    <div
      className={cn(
        'grid w-full overflow-hidden rounded-[var(--radius-2xl)]',
        'border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)]',
        'lg:grid-cols-2',
        className
      )}
    >
      {/* Left — image panel */}
      <div
        className="relative hidden min-h-[28rem] overflow-hidden lg:block"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Brand */}
        <div className="absolute left-6 top-6 z-10 flex items-center gap-2 text-white">
          {brandLogo ?? (
            <span className="grid size-8 place-items-center rounded-full bg-white text-[oklch(15%_0_0)] font-bold">
              ◆
            </span>
          )}
          <span className="font-display text-lg font-bold">{brand}</span>
        </div>

        {/* Bottom caption */}
        <div className="absolute inset-x-0 bottom-0 p-8 text-white">
          <p className="font-display text-3xl font-bold tracking-[-0.02em]">
            {imageCaption}
          </p>
          <p className="mt-1 text-sm text-white/85">{imageCaptionSub}</p>
        </div>
      </div>

      {/* Right — form */}
      <FormPanel
        title={title}
        subtitle={subtitle}
        providers={providers}
        onProvider={onProvider}
        onLogin={onLogin}
        onSignUp={onSignUp}
        signInButton="Login"
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * Glass variant — form panel left, image with glass testimonial right.
 * ──────────────────────────────────────────────────────────── */

function GlassVariant({
  imageUrl,
  title,
  subtitle,
  testimonial,
  providers,
  onProvider,
  onLogin,
  onSignUp,
  className,
}: Required<Pick<LoginSplitProps, 'imageUrl' | 'title' | 'subtitle' | 'providers'>> &
  Pick<LoginSplitProps, 'testimonial' | 'onProvider' | 'onLogin' | 'onSignUp' | 'className'>) {
  return (
    <div
      className={cn(
        'grid w-full overflow-hidden rounded-[var(--radius-2xl)]',
        'border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)]',
        'lg:grid-cols-2',
        className
      )}
    >
      {/* Left — form panel */}
      <FormPanel
        title={title}
        subtitle={subtitle}
        providers={providers}
        onProvider={onProvider}
        onLogin={onLogin}
        onSignUp={onSignUp}
        signInButton="Log In"
        compact
      />

      {/* Right — image with glass testimonial */}
      <div
        className="relative hidden min-h-[34rem] overflow-hidden lg:block"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {testimonial && (
          <div
            className={cn(
              'absolute inset-x-6 bottom-6 rounded-[var(--radius-2xl)] p-6',
              'border border-white/20 bg-white/15 text-white',
              'backdrop-blur-xl shadow-[inset_0_1px_0_rgb(255_255_255/0.20)]'
            )}
          >
            <p className="text-[15px] leading-relaxed">"{testimonial.quote}"</p>
            <p className="mt-4 font-display text-base font-bold">{testimonial.name}</p>
            <p className="text-[13px] text-white/80">{testimonial.role}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * Shared form panel — used by both variants.
 * ──────────────────────────────────────────────────────────── */

interface FormPanelProps {
  title: string;
  subtitle: string;
  providers: ('google' | 'apple' | 'facebook')[];
  onProvider?: (p: string) => void;
  onLogin?: (creds: { email: string; password: string }) => void;
  onSignUp?: () => void;
  signInButton: string;
  compact?: boolean;
}

const PROVIDER_META: Record<
  'google' | 'apple' | 'facebook',
  { label: string; icon: (cls: string) => ReactNode }
> = {
  google:   { label: 'Continue with Google',   icon: (c) => <GoogleIcon className={c} /> },
  apple:    { label: 'Continue with Apple',    icon: (c) => <AppleIcon className={c} /> },
  facebook: { label: 'Continue with Facebook', icon: (c) => <FacebookIcon className={c} /> },
};

function FormPanel({
  title,
  subtitle,
  providers,
  onProvider,
  onLogin,
  onSignUp,
  signInButton,
  compact,
}: FormPanelProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onLogin?.({ email, password });
      }}
      className={cn(
        'flex flex-col justify-center bg-[var(--color-bg-elevated)] text-[var(--color-fg-base)]',
        compact ? 'p-8 sm:p-10' : 'p-8 sm:p-12'
      )}
    >
      <div className={cn('mx-auto w-full', compact ? 'max-w-sm' : 'max-w-md')}>
        {/* Header */}
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold tracking-[-0.02em] sm:text-[28px]">
            {title}
          </h2>
          <p className="mt-1.5 text-sm text-[var(--color-fg-muted)]">{subtitle}</p>
        </div>

        {/* Email */}
        <label className="mt-7 block text-[13px] font-medium text-[var(--color-fg-base)]">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className={cn(
            'mt-1.5 block h-11 w-full rounded-[var(--radius-lg)] px-3.5 text-sm',
            'border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)]',
            'placeholder:text-[var(--color-fg-subtle)]',
            'transition-colors outline-none',
            'focus:border-[var(--color-fg-base)]'
          )}
        />

        {/* Password */}
        <div className="mt-4 flex items-center justify-between">
          <label className="text-[13px] font-medium">Password</label>
          <button
            type="button"
            className="text-[13px] font-medium text-[var(--color-fg-muted)] hover:text-[var(--color-fg-base)]"
          >
            Forgot password?
          </button>
        </div>
        <div
          className={cn(
            'mt-1.5 flex h-11 items-center rounded-[var(--radius-lg)] px-3.5',
            'border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)]',
            'transition-colors',
            'focus-within:border-[var(--color-fg-base)]'
          )}
        >
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[var(--color-fg-subtle)]"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="ml-2 inline-flex size-6 items-center justify-center text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-base)]"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>

        {/* Remember + submit */}
        <label className="mt-4 flex items-center gap-2 text-[13px]">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="size-4 rounded-[3px] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] accent-[var(--color-fg-base)]"
          />
          Remember me
        </label>

        <button
          type="submit"
          className={cn(
            'mt-5 inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-lg)]',
            'bg-[var(--color-fg-base)] text-[var(--color-bg-base)]',
            'text-sm font-semibold tracking-[-0.005em]',
            'transition-colors hover:opacity-90'
          )}
        >
          {signInButton}
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
          <span className="h-px flex-1 bg-[var(--color-border-base)]" />
          OR
          <span className="h-px flex-1 bg-[var(--color-border-base)]" />
        </div>

        {/* Providers */}
        <div className={cn('grid gap-2.5', providers.length === 2 && 'sm:grid-cols-2')}>
          {providers.map((p) => {
            const meta = PROVIDER_META[p];
            return (
              <button
                key={p}
                type="button"
                onClick={() => onProvider?.(p)}
                className={cn(
                  'inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-[var(--radius-lg)]',
                  'border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)]',
                  'text-[13px] font-semibold text-[var(--color-fg-base)]',
                  'transition-colors hover:bg-[var(--color-bg-subtle)]'
                )}
              >
                {meta.icon('size-4')}
                {meta.label}
              </button>
            );
          })}
        </div>

        {/* Sign up footer */}
        {onSignUp && (
          <p className="mt-6 text-center text-[13px] text-[var(--color-fg-muted)]">
            Don't have any account?{' '}
            <button
              type="button"
              onClick={onSignUp}
              className="font-semibold text-[var(--color-fg-base)] underline underline-offset-4 hover:opacity-80"
            >
              Register
            </button>
          </p>
        )}
      </div>
    </form>
  );
}
