import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Github,
  Calendar,
  Code2,
  Mail,
  MessageCircle,
  Music,
  Settings,
  ShoppingBag,
  Image as ImageIcon,
  Check,
  Copy,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Avatar } from '../components/Avatar';
import { BorderBeam } from '../components/effects/BorderBeam/BorderBeam';
import { ShineBorder } from '../components/effects/ShineBorder/ShineBorder';
import { Marquee } from '../components/effects/Marquee/Marquee';
import { NumberTicker } from '../components/effects/NumberTicker/NumberTicker';
import { MagicCard } from '../components/effects/MagicCard/MagicCard';
import { Dock, DockItem } from '../components/effects/Dock/Dock';
import { WordRotate } from '../components/effects/WordRotate/WordRotate';
import { Link } from '../hooks/useHashRoute';
import { cn } from '../utils/cn';
import { DocsHeader } from './DocsHeader';
import { DocsSearch } from './DocsSearch';
import './Home.css';

export function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    // Force dark for the landing — scoped via `theme-dark` class so it
    // doesn't change the user's saved preference for the docs section.
    // The brand purple-black gradient + glow radials are painted directly
    // on the wrapper (rather than relying on body's gradient) so the page
    // looks correct even when the user's global theme is set to "clean".
    <div
      className="theme-dark relative min-h-screen text-[var(--color-fg-base)]"
      style={{
        backgroundImage:
          'var(--gradient-bg-glow), var(--gradient-bg-dark)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <DocsHeader onOpenSearch={() => setSearchOpen(true)} landing />
      <DocsSearch open={searchOpen} onOpenChange={setSearchOpen} />

      <Hero />
      <StatsBand />
      <FeatureGrid />
      <Footer />
    </div>
  );
}

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4';

/* ─────────────────────────────────────────────────────────────
 * Hero — full-bleed video bg + glass overlay, light-on-dark.
 * Toggleable between full-screen and fit-to-content (top-right).
 * ───────────────────────────────────────────────────────────── */
function Hero() {
  const [fullBleed, setFullBleed] = useState(true);

  return (
    <section
      className={cn(
        'relative isolate w-full overflow-hidden',
        'transition-[min-height,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        fullBleed ? 'min-h-screen' : 'py-24 lg:py-32'
      )}
    >
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Vignette overlay — darkens edges so centered text reads against any frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Fullbleed toggle — top right */}
      <button
        type="button"
        onClick={() => setFullBleed((v) => !v)}
        aria-label={fullBleed ? 'Fit to content' : 'Full-bleed'}
        className={cn(
          'absolute right-4 top-4 z-20 inline-flex size-9 items-center justify-center',
          'rounded-[10px] backdrop-blur-xl',
          'border border-white/20 bg-white/10 text-white',
          'transition-all hover:bg-white/20',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60'
        )}
      >
        {fullBleed ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
      </button>

      <div className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center sm:pt-28 sm:pb-24 lg:pt-36">
        {/* Inline pill — "New" mini-badge + version line.
            Same shape as the reference glass-pill, but neutral / clean. */}
        <Link
          href="/components/introduction"
          className={cn(
            'zui-hero-tag group mb-8 inline-flex items-center gap-2 h-10 pl-1 pr-4',
            'rounded-full backdrop-blur-xl',
            'border border-white/20 bg-white/10',
            'shadow-[0_2px_12px_rgb(0_0_0/0.20),inset_0_1px_0_rgb(255_255_255/0.20)]',
            'transition-all duration-[var(--duration-base)] ease-[var(--ease-out)]',
            'hover:bg-white/15 hover:border-white/30'
          )}
        >
          <span
            className={cn(
              'inline-flex h-8 items-center rounded-full px-3',
              'bg-white text-[oklch(15%_0.02_270)]',
              'text-[11px] font-semibold uppercase tracking-[0.08em]',
              'shadow-[0_1px_2px_rgb(0_0_0/0.20)]'
            )}
          >
            New
          </span>
          <span className="text-[13px] font-medium text-white/95">
            Say hello to <span className="font-semibold">@zui.react/zui v0.8</span>
            <span className="mx-1.5 text-white/40">·</span>
            <span className="font-semibold">+ MCP server</span>
          </span>
          <ArrowRight className="size-3.5 text-white/70 transition-transform group-hover:translate-x-0.5" />
        </Link>

        {/* Headline — Instrument Serif italic flourish on "modern" */}
        <h1
          className={cn(
            'zui-hero-title text-balance text-white',
            'font-display font-semibold leading-[0.98] tracking-[-0.045em]',
            'text-[clamp(2.75rem,8vw,6rem)]',
            'drop-shadow-[0_2px_24px_rgb(0_0_0/0.40)]'
          )}
        >
          Components for{' '}
          <span
            style={{
              fontFamily: "'Instrument Serif', serif",
              // Soft bright purple from the new brand gradient — same hue
              // as the primary button so the eye reads them as one system.
              backgroundImage:
                'linear-gradient(135deg, #b794f6 0%, #8b5cf6 50%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
            className="font-normal italic tracking-[-0.02em]"
          >
            modern
          </span>
          <br className="hidden sm:inline" />
          <span className="block sm:inline"> React apps</span>
          <span aria-hidden>.</span>
        </h1>

        <p
          className={cn(
            'zui-hero-body mx-auto mt-7 max-w-xl text-balance',
            'text-base leading-[1.55] text-white/85 sm:text-lg',
            'drop-shadow-[0_1px_8px_rgb(0_0_0/0.30)]'
          )}
        >
          27 components, 6 motion effects, 26 production patterns,
          26 inline brand & AI-IDE icons. Ships with{' '}
          <span className="font-semibold text-white">
            @zui.react/mcp
          </span>{' '}
          for Claude Code, Cursor, Windsurf, Copilot &amp; Antigravity.
        </p>

        {/* CTAs — premium purple gradient (Button.primary picks up
            .btn-primary-purple automatically) + glass white secondary.
            Per spec: no hover glow on the primary; press feedback only. */}
        <div className="zui-hero-cta mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/components/introduction">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="size-4" />}
              className="rounded-full px-7 text-base"
            >
              Browse components
            </Button>
          </Link>
          <a
            href="https://github.com/Syzie123/zui"
            target="_blank"
            rel="noreferrer"
            className={cn(
              'inline-flex h-12 items-center justify-center gap-2 px-7',
              'rounded-full text-base font-semibold tracking-[-0.01em]',
              'backdrop-blur-xl',
              'border border-white/15 bg-white/[0.06] text-white',
              'shadow-[inset_0_1px_0_rgb(255_255_255/0.14)]',
              'transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]',
              'hover:bg-white/[0.10] hover:border-white/25',
              'active:translate-y-[1px]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60'
            )}
          >
            <Github className="size-4" />
            GitHub
          </a>
        </div>

        {/* Install snippet — glass version */}
        <div className="zui-hero-install mt-7">
          <GlassInstallSnippet />
        </div>
      </div>
    </section>
  );
}

function GlassInstallSnippet() {
  const [copied, setCopied] = useState(false);
  const cmd = 'npm install @zui.react/zui';
  return (
    <div
      className={cn(
        'mx-auto inline-flex items-center gap-3',
        'h-11 px-4',
        'rounded-[var(--radius-lg)] backdrop-blur-xl',
        'border border-white/20 bg-white/10',
        'shadow-[inset_0_1px_0_rgb(255_255_255/0.15)]',
        'font-mono text-[13px] text-white'
      )}
    >
      <span className="text-white/60">$</span>
      <code className="select-all">{cmd}</code>
      <button
        type="button"
        aria-label="Copy install command"
        onClick={() => {
          navigator.clipboard.writeText(cmd);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className={cn(
          'inline-flex size-7 items-center justify-center rounded-[var(--radius-sm)]',
          'text-white/70 transition-colors',
          'hover:bg-white/10 hover:text-white'
        )}
      >
        {copied ? (
          <Check className="size-3.5 text-[oklch(80%_0.18_140)]" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    </div>
  );
}

/* Stats live below the hero now. Numbers come straight from the catalog —
   one source of truth in scripts/build-mcp-registry.ts. The bg stays
   transparent so the page's purple-black gradient bleeds through. */
function StatsBand() {
  return (
    <section className="border-y border-white/5 bg-transparent">
      <dl className="mx-auto grid max-w-3xl grid-cols-3 gap-3 px-6 py-10 sm:gap-8">
        {[
          { v: 27, l: 'components' },
          { v: 26, l: 'patterns' },
          { v: 26, l: 'brand icons' },
        ].map((s) => (
          <div key={s.l} className="text-center">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
              {s.l}
            </dt>
            <dd className="mt-1 font-display text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
              <NumberTicker value={s.v} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Featured grid
 * ───────────────────────────────────────────────────────────── */
function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <header className="mb-10 max-w-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a78bfa]">
          Featured
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          The motion primitives, in a row.
        </h2>
      </header>

      <div className="grid auto-rows-[14rem] gap-3 md:grid-cols-3 md:auto-rows-[15rem]">
        <FeatureCell
          slug="border-beam"
          title="Border Beam"
          blurb="Animated light along a border."
          className="md:col-span-2"
        >
          <div className="relative size-full overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)] p-5">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="font-display text-sm font-semibold">Premium tier</p>
                <p className="mt-0.5 text-xs text-[var(--color-fg-muted)]">
                  Unlocks every effect.
                </p>
              </div>
              <p className="font-display text-2xl font-semibold tracking-[-0.025em]">
                $19
                <span className="ml-1 text-xs font-normal text-[var(--color-fg-muted)]">
                  /mo
                </span>
              </p>
            </div>
            <BorderBeam />
          </div>
        </FeatureCell>

        <FeatureCell slug="number-ticker" title="Number Ticker" blurb="Counts up on view.">
          <div className="grid h-full place-items-center text-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
                Active users
              </p>
              <p className="mt-1 font-display text-4xl font-semibold tracking-[-0.035em]">
                <NumberTicker value={48210} prefix="$" />
              </p>
            </div>
          </div>
        </FeatureCell>

        <FeatureCell
          slug="marquee"
          title="Marquee"
          blurb="Endless GPU-only scroll."
          className="md:col-span-2"
        >
          <div className="flex h-full items-center">
            <Marquee speed={35} pauseOnHover>
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)] px-3 py-1.5 text-xs"
                >
                  <Avatar size="xs" src={`https://i.pravatar.cc/96?img=${i + 12}`} fallback="A" />
                  @user_{i + 1}
                </div>
              ))}
            </Marquee>
          </div>
        </FeatureCell>

        <FeatureCell slug="magic-card" title="Magic Card" blurb="Cursor spotlight.">
          <MagicCard className="size-full p-5">
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="font-display text-sm font-semibold">Hover me</p>
                <p className="mt-0.5 text-xs text-[var(--color-fg-muted)]">
                  Spotlight follows your cursor.
                </p>
              </div>
            </div>
          </MagicCard>
        </FeatureCell>

        <FeatureCell
          slug="dock"
          title="Dock"
          blurb="macOS-style magnification."
          className="md:col-span-2"
        >
          <div className="grid size-full place-items-center">
            <Dock>
              {[Mail, MessageCircle, Calendar, ImageIcon, Music, ShoppingBag, Code2, Settings].map(
                (Icon, i) => (
                  <DockItem key={i}>
                    <Icon className="size-4 text-[var(--color-fg-base)]" />
                  </DockItem>
                )
              )}
            </Dock>
          </div>
        </FeatureCell>

        <FeatureCell slug="shine-border" title="Shine Border" blurb="Conic shimmer.">
          <div className="relative grid size-full place-items-center overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-bg-elevated)] p-5 text-center">
            <div>
              <p className="font-display text-sm font-semibold">Limited release</p>
              <p className="mt-0.5 text-xs text-[var(--color-fg-muted)]">
                Subtle. Constant.
              </p>
            </div>
            <ShineBorder />
          </div>
        </FeatureCell>
      </div>
    </section>
  );
}

function FeatureCell({
  slug,
  title,
  blurb,
  children,
  className,
}: {
  slug: string;
  title: string;
  blurb: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={`/components/${slug}`}
      data-animate-up
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[var(--radius-2xl)]',
        // Frosted-glass tile: faint white border + subtle dark wash so the
        // page's purple bg gradient still tints through. No solid fill.
        'border border-white/[0.08] bg-white/[0.025] backdrop-blur-md',
        'transition-colors duration-[var(--duration-base)]',
        'hover:border-white/[0.18] hover:bg-white/[0.04]',
        className
      )}
    >
      <div className="flex-1 overflow-hidden p-3 sm:p-4">{children}</div>
      <div className="flex items-center justify-between gap-2 border-t border-white/[0.06] px-4 py-2.5">
        <div className="min-w-0">
          <p className="font-display text-[13px] font-semibold tracking-[-0.005em]">
            {title}
          </p>
          <p className="truncate text-[11px] text-white/55">
            {blurb}
          </p>
        </div>
        <ArrowRight className="size-3.5 shrink-0 text-white/45 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-sm font-semibold tracking-[-0.01em] text-white">
            ZUI
          </p>
          <p className="mt-0.5 text-xs text-white/55">
            Modern React components. MIT.
          </p>
        </div>
        <div className="flex items-center gap-5 text-xs text-white/55">
          <Link href="/components/introduction" className="transition-colors hover:text-white">
            Docs
          </Link>
          <a
            className="transition-colors hover:text-white"
            href="https://github.com/Syzie123/zui"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="transition-colors hover:text-white"
            href="https://www.npmjs.com/package/@zui.react/zui"
            target="_blank"
            rel="noreferrer"
          >
            npm
          </a>
          <a
            className="transition-colors hover:text-white"
            href="https://www.npmjs.com/package/@zui.react/mcp"
            target="_blank"
            rel="noreferrer"
          >
            MCP
          </a>
        </div>
      </div>
    </footer>
  );
}
