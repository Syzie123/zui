import { ArrowRight, Sparkles, Star, Zap, Github, BellRing, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Avatar, AvatarGroup } from '../components/Avatar';
import { Progress } from '../components/Progress';
import { cn } from '../utils/cn';
import './Hero.css';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Aurora gradient backdrop — pure CSS, hardware-accelerated */}
      <div className="zui-aurora" aria-hidden />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.45] zui-grid-light"
        aria-hidden
      />

      {/* Soft top wash */}
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem]',
          'bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-accent-soft)_0%,transparent_70%)]'
        )}
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* ─────────── Left: copy ─────────── */}
          <div className="text-center lg:text-left">
            <Badge
              variant="accent"
              shape="pill"
              size="md"
              className="mb-6 backdrop-blur"
            >
              <Sparkles className="size-3" />
              v0.1 — Now in preview
            </Badge>

            <h1
              className={cn(
                'text-[clamp(2.25rem,7.5vw,4.75rem)] font-semibold',
                'leading-[0.95] tracking-[-0.045em]',
                'text-[var(--color-fg-base)]'
              )}
            >
              Components that feel{' '}
              <span className="zui-shimmer-text">expensive</span>
              <br className="hidden sm:inline" />
              <span className="block sm:inline"> out of the box.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)] sm:mt-6 sm:text-lg lg:mx-0">
              ZUI is a modern React component library focused on speed, polish,
              and motion. Sub-millisecond renders, under 30kb gzipped, designed
              for builders who care about the details.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 lg:justify-start">
              <Button
                size="lg"
                variant="gradient"
                rightIcon={<ArrowRight className="size-4" />}
              >
                Get started
              </Button>
              <Button
                size="lg"
                variant="secondary"
                leftIcon={<Github className="size-4" />}
              >
                Star on GitHub
              </Button>
            </div>

            {/* Stats strip */}
            <dl className="mt-12 grid grid-cols-3 gap-2 sm:mt-16 sm:gap-6 lg:max-w-md">
              {[
                { v: '<30kb', l: 'gzipped' },
                { v: '60fps', l: 'every interaction' },
                { v: 'AA', l: 'WCAG compliant' },
              ].map((s) => (
                <div key={s.l} className="text-center lg:text-left">
                  <dt className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[var(--color-fg-subtle)] sm:text-xs">
                    {s.l}
                  </dt>
                  <dd className="mt-0.5 text-xl font-semibold tracking-[-0.02em] text-[var(--color-fg-base)] sm:mt-1 sm:text-3xl">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ─────────── Right: floating preview cards ─────────── */}
          <FloatingPreview />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Floating preview — 3 cards stacked at slight offsets.
 * Pure CSS animations, no IntersectionObserver, no JS.
 * ───────────────────────────────────────────────────────────── */
function FloatingPreview() {
  return (
    <div className="relative mx-auto h-[440px] w-full max-w-md sm:h-[520px] lg:h-[560px]">
      {/* Notification toast — top right */}
      <div className="zui-float-a absolute right-0 top-2 w-[min(20rem,90%)]">
        <div
          className={cn(
            'flex items-start gap-3 rounded-[var(--radius-xl)] p-4',
            'bg-[var(--color-bg-elevated)] border border-[var(--color-border-base)]',
            'shadow-[var(--shadow-xl)]'
          )}
        >
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--color-success-soft)]">
            <Check className="size-4 text-[var(--color-success)]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold tracking-[-0.01em]">
              Workspace updated
            </p>
            <p className="mt-0.5 text-xs text-[var(--color-fg-muted)]">
              All changes synced to your team.
            </p>
          </div>
        </div>
      </div>

      {/* Stats card — center */}
      <div className="zui-float-b absolute left-2 top-32 w-[min(22rem,95%)] sm:top-40">
        <div
          className={cn(
            'rounded-[var(--radius-2xl)] p-5',
            'bg-[var(--color-bg-elevated)]',
            'border border-[var(--color-border-base)]',
            'shadow-[var(--shadow-xl)]'
          )}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
                Monthly active
              </p>
              <p className="mt-1 text-3xl font-semibold tracking-[-0.03em]">
                12,403
              </p>
              <p className="mt-1 text-xs font-medium text-[var(--color-success)]">
                ↑ 24% vs last month
              </p>
            </div>
            <span className="grid size-9 place-items-center rounded-[var(--radius-md)] bg-[var(--color-accent-soft)]">
              <Zap className="size-4 text-[var(--color-accent-base)]" />
            </span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-fg-muted)]">Goal</span>
              <span className="font-medium">12.4k / 15k</span>
            </div>
            <Progress value={82} size="sm" />
          </div>
        </div>
      </div>

      {/* Team card — bottom right */}
      <div className="zui-float-c absolute bottom-4 right-2 w-[min(18rem,85%)] sm:bottom-2">
        <div
          className={cn(
            'rounded-[var(--radius-xl)] p-4',
            'bg-[var(--color-bg-elevated)]',
            'border border-[var(--color-border-base)]',
            'shadow-[var(--shadow-xl)]'
          )}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
              Team
            </p>
            <Badge variant="success" size="sm">
              <span className="size-1.5 rounded-full bg-[var(--color-success)]" />
              Online
            </Badge>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <AvatarGroup max={4}>
              <Avatar size="sm" src="https://i.pravatar.cc/96?img=12" fallback="A" />
              <Avatar size="sm" src="https://i.pravatar.cc/96?img=5"  fallback="B" />
              <Avatar size="sm" src="https://i.pravatar.cc/96?img=3"  fallback="C" />
              <Avatar size="sm" src="https://i.pravatar.cc/96?img=8"  fallback="D" />
              <Avatar size="sm" fallback="EF" />
              <Avatar size="sm" fallback="GH" />
            </AvatarGroup>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Star className="size-3.5 fill-[var(--color-warning)] text-[var(--color-warning)]" />
              4.9
            </div>
          </div>
        </div>
      </div>

      {/* CTA pill — bottom left, anchors the composition */}
      <div className="zui-float-d absolute bottom-32 left-0 hidden sm:block">
        <Button variant="luminous" size="md" leftIcon={<BellRing className="size-4" />}>
          New release
        </Button>
      </div>
    </div>
  );
}
