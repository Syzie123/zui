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

export type LoginSplitMode = 'login' | 'signup';

export interface LoginSplitProps {
  /** Image URL for the hero panel (Unsplash defaults provided). */
  imageUrl?: string;
  variant?: LoginSplitVariant;
  /** Form mode. Defaults to 'login'. Pass `mode` for controlled state. */
  defaultMode?: LoginSplitMode;
  mode?: LoginSplitMode;
  onModeChange?: (m: LoginSplitMode) => void;
  /** Show the Login / Sign Up tab toggle above the form. */
  showModeTabs?: boolean;
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
  /** Form submit (login mode). */
  onLogin?: (creds: { email: string; password: string }) => void;
  /** Form submit (signup mode). */
  onSignup?: (creds: { name: string; email: string; password: string }) => void;
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
  defaultMode = 'login',
  mode: controlledMode,
  onModeChange,
  showModeTabs = true,
  title,
  subtitle,
  imageCaption = 'Find your sweet home',
  imageCaptionSub = 'Schedule visits in just a few clicks',
  testimonial,
  brand = 'Realnest',
  brandLogo,
  providers = ['google', 'apple', 'facebook'],
  onProvider,
  onLogin,
  onSignup,
  onSignUp,
  className,
}: LoginSplitProps) {
  const [internalMode, setInternalMode] = useState<LoginSplitMode>(defaultMode);
  const mode = controlledMode ?? internalMode;
  const setMode = (m: LoginSplitMode) => {
    if (controlledMode === undefined) setInternalMode(m);
    onModeChange?.(m);
  };

  // Sensible defaults per mode
  const resolvedTitle =
    title ?? (mode === 'login' ? 'Welcome back!' : 'Create your account');
  const resolvedSubtitle =
    subtitle ??
    (mode === 'login'
      ? 'Sign in to your account'
      : 'Start your journey in seconds');

  if (variant === 'glass') {
    return (
      <GlassVariant
        imageUrl={imageUrl ?? DEFAULT_IMG_GLASS}
        title={resolvedTitle}
        subtitle={resolvedSubtitle}
        mode={mode}
        setMode={setMode}
        showModeTabs={showModeTabs}
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
        onSignup={onSignup}
        onSignUp={onSignUp}
        className={className}
      />
    );
  }

  return (
    <CleanVariant
      imageUrl={imageUrl ?? DEFAULT_IMG_CLEAN}
      title={resolvedTitle}
      subtitle={resolvedSubtitle}
      mode={mode}
      setMode={setMode}
      showModeTabs={showModeTabs}
      imageCaption={imageCaption}
      imageCaptionSub={imageCaptionSub}
      brand={brand}
      brandLogo={brandLogo}
      providers={providers}
      onProvider={onProvider}
      onLogin={onLogin}
      onSignup={onSignup}
      onSignUp={onSignUp}
      className={className}
    />
  );
}

/* ────────────────────────────────────────────────────────────
 * Clean variant — image left panel, form right panel.
 * ──────────────────────────────────────────────────────────── */

interface CleanVariantInner {
  imageUrl: string;
  title: string;
  subtitle: string;
  mode: LoginSplitMode;
  setMode: (m: LoginSplitMode) => void;
  showModeTabs: boolean;
  imageCaption: string;
  imageCaptionSub: string;
  brand: string;
  providers: ('google' | 'apple' | 'facebook')[];
  brandLogo?: ReactNode;
  onProvider?: (p: string) => void;
  onLogin?: (creds: { email: string; password: string }) => void;
  onSignup?: (creds: { name: string; email: string; password: string }) => void;
  onSignUp?: () => void;
  className?: string;
}

function CleanVariant({
  imageUrl,
  title,
  subtitle,
  mode,
  setMode,
  showModeTabs,
  imageCaption,
  imageCaptionSub,
  brand,
  brandLogo,
  providers,
  onProvider,
  onLogin,
  onSignup,
  onSignUp,
  className,
}: CleanVariantInner) {
  return (
    <div
      className={cn(
        'grid w-full overflow-hidden rounded-[var(--radius-2xl)]',
        'border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)]',
        'lg:grid-cols-2',
        className
      )}
    >
      {/* Left — image panel. Brand + caption rendered in BLACK over a soft
          white wash for legibility against any photo. */}
      <div
        className="relative hidden min-h-[28rem] overflow-hidden lg:block"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Brand — black text in a small white pill */}
        <div className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 backdrop-blur-md">
          {brandLogo ?? (
            <span className="grid size-6 place-items-center rounded-full bg-[oklch(15%_0_0)] text-white text-[11px] font-bold">
              ◆
            </span>
          )}
          <span className="font-display text-sm font-bold text-[oklch(15%_0_0)]">
            {brand}
          </span>
        </div>

        {/* Bottom caption — black text on a soft white panel */}
        <div className="absolute inset-x-4 bottom-4 rounded-[var(--radius-xl)] bg-white/85 p-5 backdrop-blur-md">
          <p className="font-display text-2xl font-bold tracking-[-0.02em] text-[oklch(15%_0_0)]">
            {imageCaption}
          </p>
          <p className="mt-1 text-sm text-[oklch(35%_0_0)]">{imageCaptionSub}</p>
        </div>
      </div>

      {/* Right — form */}
      <FormPanel
        title={title}
        subtitle={subtitle}
        mode={mode}
        setMode={setMode}
        showModeTabs={showModeTabs}
        providers={providers}
        onProvider={onProvider}
        onLogin={onLogin}
        onSignup={onSignup}
        onSignUp={onSignUp}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * Glass variant — form panel left, image with glass testimonial right.
 * ──────────────────────────────────────────────────────────── */

interface GlassVariantInner {
  imageUrl: string;
  title: string;
  subtitle: string;
  mode: LoginSplitMode;
  setMode: (m: LoginSplitMode) => void;
  showModeTabs: boolean;
  testimonial?: { quote: string; name: string; role: string };
  providers: ('google' | 'apple' | 'facebook')[];
  onProvider?: (p: string) => void;
  onLogin?: (creds: { email: string; password: string }) => void;
  onSignup?: (creds: { name: string; email: string; password: string }) => void;
  onSignUp?: () => void;
  className?: string;
}

function GlassVariant({
  imageUrl,
  title,
  subtitle,
  mode,
  setMode,
  showModeTabs,
  testimonial,
  providers,
  onProvider,
  onLogin,
  onSignup,
  onSignUp,
  className,
}: GlassVariantInner) {
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
        mode={mode}
        setMode={setMode}
        showModeTabs={showModeTabs}
        providers={providers}
        onProvider={onProvider}
        onLogin={onLogin}
        onSignup={onSignup}
        onSignUp={onSignUp}
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
  mode: LoginSplitMode;
  setMode: (m: LoginSplitMode) => void;
  showModeTabs: boolean;
  providers: ('google' | 'apple' | 'facebook')[];
  onProvider?: (p: string) => void;
  onLogin?: (creds: { email: string; password: string }) => void;
  onSignup?: (creds: { name: string; email: string; password: string }) => void;
  onSignUp?: () => void;
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
  mode,
  setMode,
  showModeTabs,
  providers,
  onProvider,
  onLogin,
  onSignup,
  onSignUp,
  compact,
}: FormPanelProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const isLogin = mode === 'login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) onLogin?.({ email, password });
    else onSignup?.({ name, email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex flex-col justify-center bg-[var(--color-bg-elevated)] text-[var(--color-fg-base)]',
        compact ? 'p-8 sm:p-10' : 'p-8 sm:p-12'
      )}
    >
      <div className={cn('mx-auto w-full', compact ? 'max-w-sm' : 'max-w-md')}>
        {/* Mode tabs */}
        {showModeTabs && (
          <div className="mx-auto mb-6 inline-flex items-center rounded-full border border-[var(--color-border-base)] bg-[var(--color-bg-subtle)] p-1">
            {(['login', 'signup'] as LoginSplitMode[]).map((m) => {
              const active = mode === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={cn(
                    'inline-flex h-8 items-center rounded-full px-4 text-[13px] font-semibold',
                    'transition-colors',
                    active
                      ? 'bg-[var(--color-bg-elevated)] text-[var(--color-fg-base)] shadow-[var(--shadow-xs)]'
                      : 'text-[var(--color-fg-muted)] hover:text-[var(--color-fg-base)]'
                  )}
                >
                  {m === 'login' ? 'Login' : 'Sign Up'}
                </button>
              );
            })}
          </div>
        )}

        {/* Header */}
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold tracking-[-0.02em] sm:text-[28px]">
            {title}
          </h2>
          <p className="mt-1.5 text-sm text-[var(--color-fg-muted)]">{subtitle}</p>
        </div>

        {/* Name field — signup only */}
        {!isLogin && (
          <>
            <label className="mt-7 block text-[13px] font-medium text-[var(--color-fg-base)]">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              autoComplete="name"
              className={inputCls}
            />
          </>
        )}

        {/* Email */}
        <label
          className={cn(
            'block text-[13px] font-medium text-[var(--color-fg-base)]',
            isLogin ? 'mt-7' : 'mt-4'
          )}
        >
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          autoComplete="email"
          className={inputCls}
        />

        {/* Password */}
        <div className="mt-4 flex items-center justify-between">
          <label className="text-[13px] font-medium">Password</label>
          {isLogin && (
            <button
              type="button"
              className="text-[13px] font-medium text-[var(--color-fg-muted)] hover:text-[var(--color-fg-base)]"
            >
              Forgot password?
            </button>
          )}
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
            placeholder={isLogin ? 'Enter your password' : 'At least 8 characters'}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
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

        {/* Login: Remember me. Signup: Accept terms. */}
        {isLogin ? (
          <label className="mt-4 flex items-center gap-2 text-[13px]">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="size-4 rounded-[3px] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] accent-[var(--color-fg-base)]"
            />
            Remember me
          </label>
        ) : (
          <label className="mt-4 flex items-start gap-2 text-[13px] leading-snug">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-0.5 size-4 rounded-[3px] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] accent-[var(--color-fg-base)]"
            />
            <span className="text-[var(--color-fg-muted)]">
              I agree to the{' '}
              <span className="font-medium text-[var(--color-fg-base)] underline underline-offset-4">
                Terms of Service
              </span>{' '}
              and{' '}
              <span className="font-medium text-[var(--color-fg-base)] underline underline-offset-4">
                Privacy Policy
              </span>
              .
            </span>
          </label>
        )}

        <button
          type="submit"
          disabled={!isLogin && !acceptTerms}
          className={cn(
            'mt-5 inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-lg)]',
            'bg-[var(--color-fg-base)] text-[var(--color-bg-base)]',
            'text-sm font-semibold tracking-[-0.005em]',
            'transition-colors hover:opacity-90',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          {isLogin ? 'Login' : 'Create account'}
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

        {/* Footer link — switches mode if tabs are off, calls onSignUp otherwise */}
        <p className="mt-6 text-center text-[13px] text-[var(--color-fg-muted)]">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => {
              if (showModeTabs) setMode(isLogin ? 'signup' : 'login');
              else onSignUp?.();
            }}
            className="font-semibold text-[var(--color-fg-base)] underline underline-offset-4 hover:opacity-80"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </form>
  );
}

const inputCls = cn(
  'mt-1.5 block h-11 w-full rounded-[var(--radius-lg)] px-3.5 text-sm',
  'border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)]',
  'placeholder:text-[var(--color-fg-subtle)]',
  'transition-colors outline-none',
  'focus:border-[var(--color-fg-base)]'
);
