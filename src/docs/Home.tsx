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
    <>
      <DocsHeader onOpenSearch={() => setSearchOpen(true)} />
      <DocsSearch open={searchOpen} onOpenChange={setSearchOpen} />

      <Hero />
      <FeatureGrid />
      <Footer />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Hero — compact. Small title, install snippet, two CTAs.
 * ───────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--color-border-subtle)]">
      {/* Subtle dotted backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(color-mix(in oklch, var(--color-fg-base) 8%, transparent) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          maskImage:
            'radial-gradient(ellipse 60% 50% at 50% 30%, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 50% at 50% 30%, black 30%, transparent 80%)',
        }}
      />

      <div className="mx-auto max-w-3xl px-6 pt-16 pb-12 text-center sm:pt-20 sm:pb-16">
        {/* Tag */}
        <Link
          href="/components/introduction"
          className={cn(
            'group mb-7 inline-flex items-center gap-1.5 rounded-full',
            'border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)]',
            'px-3 py-1 text-xs font-medium text-[var(--color-fg-muted)]',
            'transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg-base)]'
          )}
        >
          <span className="inline-block size-1.5 rounded-full bg-[var(--color-success)]" />
          Now in preview · v0.1
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>

        {/* Title — deliberately not gigantic */}
        <h1 className="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.025em] sm:text-4xl">
          Components for{' '}
          <WordRotate
            words={['Design Engineers', 'Indie Hackers', 'Startup Teams', 'Product Folks']}
            className="text-[var(--color-accent-base)]"
            duration={2400}
          />
          .
        </h1>

        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
          22 components, 7 motion effects, 5 patterns. Sub-millisecond, accessible,
          theme-able by one class.
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          <Link href="/components/introduction">
            <Button size="md" rightIcon={<ArrowRight className="size-4" />}>
              Browse components
            </Button>
          </Link>
          <Button
            size="md"
            variant="secondary"
            leftIcon={<Github className="size-4" />}
            asChild
          >
            <a
              href="https://github.com/Syzie123/zui"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </Button>
        </div>

        {/* Install snippet */}
        <InstallSnippet />

        {/* Stats */}
        <dl className="mt-12 grid grid-cols-3 gap-3 text-left sm:gap-6">
          {[
            { v: 22, l: 'components', suffix: '+' },
            { v: 7,  l: 'effects' },
            { v: 17, l: 'kb gzipped CSS' },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
                {s.l}
              </dt>
              <dd className="mt-0.5 font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                <NumberTicker value={s.v} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function InstallSnippet() {
  const [copied, setCopied] = useState(false);
  const cmd = 'npm install @zui.react/zui';

  return (
    <div
      className={cn(
        'mx-auto mt-6 inline-flex items-center gap-3',
        'rounded-[var(--radius-lg)]',
        'border border-[var(--color-border-base)]',
        'bg-[var(--color-bg-elevated)]',
        'px-3.5 py-2',
        'font-mono text-[13px]'
      )}
    >
      <span className="text-[var(--color-fg-subtle)]">$</span>
      <code className="text-[var(--color-fg-base)]">{cmd}</code>
      <button
        type="button"
        aria-label="Copy install command"
        onClick={() => {
          navigator.clipboard.writeText(cmd);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className={cn(
          'inline-flex size-6 items-center justify-center rounded-[var(--radius-sm)]',
          'text-[var(--color-fg-subtle)] transition-colors',
          'hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg-base)]'
        )}
      >
        {copied ? (
          <Check className="size-3.5 text-[var(--color-success)]" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Featured grid — 6 cells, each linking to its docs.
 * ───────────────────────────────────────────────────────────── */
function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <header className="mb-10 max-w-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-base)]">
          Featured
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
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
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[var(--radius-2xl)]',
        'border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)]',
        'transition-colors duration-[var(--duration-base)]',
        'hover:border-[var(--color-border-strong)]',
        className
      )}
    >
      <div className="flex-1 overflow-hidden p-3 sm:p-4">{children}</div>
      <div className="flex items-center justify-between gap-2 border-t border-[var(--color-border-subtle)] px-4 py-2.5">
        <div className="min-w-0">
          <p className="font-display text-[13px] font-semibold tracking-[-0.005em]">
            {title}
          </p>
          <p className="truncate text-[11px] text-[var(--color-fg-muted)]">
            {blurb}
          </p>
        </div>
        <ArrowRight className="size-3.5 shrink-0 text-[var(--color-fg-subtle)] transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-sm font-semibold tracking-[-0.01em]">
            ZUI
          </p>
          <p className="mt-0.5 text-xs text-[var(--color-fg-muted)]">
            Modern React components. MIT.
          </p>
        </div>
        <div className="flex items-center gap-5 text-xs text-[var(--color-fg-muted)]">
          <Link href="/components/introduction" className="hover:text-[var(--color-fg-base)]">
            Docs
          </Link>
          <a
            className="hover:text-[var(--color-fg-base)]"
            href="https://github.com/Syzie123/zui"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="hover:text-[var(--color-fg-base)]"
            href="https://www.npmjs.com/package/@zui.react/zui"
            target="_blank"
            rel="noreferrer"
          >
            npm
          </a>
        </div>
      </div>
    </footer>
  );
}
