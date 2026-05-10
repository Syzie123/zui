import { BookOpen, HelpCircle, PlayCircle, Rocket } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../../components/Button';

/**
 * "Features" card — list of feature items with colored icon blocks +
 * article cards with thumbnails and "New" badges + footer CTA.
 */

interface Feature {
  title: string;
  description: string;
  isNew?: boolean;
  icon: React.ReactNode;
  /** Tailwind classes for the icon block bg + ring */
  tone: string;
}

const FEATURES: Feature[] = [
  {
    title: 'Getting started',
    description:
      'First time here or just need a quick overview? Run through our onboarding setup to get started.',
    isNew: true,
    icon: <Rocket className="size-5 text-white" />,
    tone: 'bg-gradient-to-br from-[oklch(70%_0.18_240)] to-[oklch(54%_0.22_265)]',
  },
  {
    title: 'How to',
    description:
      'See how it all works and find tips on how to optimise your product to fit your solutions.',
    icon: <PlayCircle className="size-5 text-white" />,
    tone: 'bg-gradient-to-br from-[oklch(72%_0.18_290)] to-[oklch(54%_0.22_280)]',
  },
  {
    title: 'Glossary',
    description:
      'Taxonomy and language surrounding products can be difficult to follow, refresh your mind on some.',
    icon: <BookOpen className="size-5 text-white" />,
    tone: 'bg-gradient-to-br from-[oklch(70%_0.18_240)] to-[oklch(56%_0.20_255)]',
  },
  {
    title: "FAQ's",
    description: 'All the questions under the sun that you could ask in one place.',
    icon: <HelpCircle className="size-5 text-white" />,
    tone: 'bg-gradient-to-br from-[oklch(78%_0.14_240)] to-[oklch(60%_0.18_245)]',
  },
];

interface Article {
  title: string;
  blurb: string;
  isNew?: boolean;
  /** Real photo URL for the thumbnail. */
  thumb: string;
}

const ARTICLES: Article[] = [
  {
    title: 'How to bring your designs to life with interactive animation',
    blurb:
      "A designer's guide to getting started with interactive animation. Learn how to use interactivity to create more engaging and memorable user experiences.",
    isNew: true,
    thumb: 'https://images.pexels.com/photos/390426/pexels-photo-390426.png',
  },
  {
    title: 'Rediscover your creativity: Why Gen Z designers are flocking to Tumblr',
    blurb:
      'Designers, especially young ones, are making a silent comeback to this revived platform, which was considered "abandoned" by many back in 2018.',
    isNew: true,
    thumb: 'https://images.pexels.com/photos/19802121/pexels-photo-19802121.jpeg',
  },
];

export function FeatureListCard() {
  return (
    <div
      className={cn(
        'flex w-full max-w-md flex-col overflow-hidden',
        'rounded-[24px] bg-[var(--color-bg-elevated)]',
        'border border-[var(--color-border-subtle)]',
        'shadow-[0_1px_3px_rgb(0_0_0_/_0.04),0_8px_24px_-12px_rgb(0_0_0_/_0.08)]'
      )}
    >
      <header className="px-6 pt-5 pb-2">
        <h3 className="font-display text-xl font-bold tracking-[-0.02em]">Features</h3>
      </header>

      {/* Feature list */}
      <ul className="flex flex-col gap-1 px-3 py-2">
        {FEATURES.map((f) => (
          <li key={f.title}>
            <button
              type="button"
              className={cn(
                'flex w-full items-start gap-3 rounded-[var(--radius-xl)] p-3 text-left',
                'transition-colors hover:bg-[var(--color-bg-subtle)]'
              )}
            >
              <span
                className={cn(
                  'grid size-11 shrink-0 place-items-center rounded-[var(--radius-md)]',
                  'shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.18),0_2px_4px_-2px_rgb(0_0_0_/_0.20)]',
                  f.tone
                )}
              >
                {f.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-[15px] font-bold tracking-[-0.01em]">
                  {f.title}
                  {f.isNew && <NewBadge />}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-fg-muted)]">
                  {f.description}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* Articles */}
      <ul className="flex flex-col gap-3 px-6 pt-3 pb-2">
        {ARTICLES.map((a) => (
          <li
            key={a.title}
            className="group flex items-start gap-3 rounded-[var(--radius-xl)] p-2 transition-colors hover:bg-[var(--color-bg-subtle)]"
          >
            <div
              aria-hidden
              className="size-20 shrink-0 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-subtle)]"
            >
              <img
                src={a.thumb}
                alt=""
                loading="lazy"
                className="size-full object-cover"
                draggable={false}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="flex items-start gap-2 text-[14px] font-bold leading-snug tracking-[-0.01em]">
                <span className="line-clamp-2">{a.title}</span>
                {a.isNew && <NewBadge />}
              </p>
              <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-[var(--color-fg-muted)]">
                {a.blurb}
              </p>
              <button
                type="button"
                className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-semibold text-[oklch(58%_0.22_265)] transition-opacity hover:opacity-80"
              >
                Read more
                <PlayCircle className="size-3.5" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <footer className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--color-border-subtle)] px-6 py-4">
        <p className="text-[13px] text-[var(--color-fg-muted)]">
          Are you looking for something else?{' '}
          <a className="font-semibold text-[oklch(58%_0.22_265)] hover:opacity-80" href="#">
            Click here →
          </a>
        </p>
        <Button
          size="sm"
          className="bg-[oklch(58%_0.22_265)] text-white hover:bg-[oklch(54%_0.22_265)]"
        >
          Sign Up
        </Button>
      </footer>
    </div>
  );
}

function NewBadge() {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-[oklch(95%_0.04_265)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[oklch(58%_0.22_265)]">
      New
    </span>
  );
}
