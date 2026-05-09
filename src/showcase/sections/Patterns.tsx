import {
  AddFiltersCard,
  PaymentTypeCard,
  OwnedByCard,
  LocationCard,
} from '../../patterns/FilterPanel/FilterPanel';
import { ViewingOptionsCard } from '../../patterns/ViewingOptions/ViewingOptions';
import { ProjectDetailCard } from '../../patterns/ProjectDetail/ProjectDetail';
import { SharePanelCard } from '../../patterns/SharePanel/SharePanel';
import { FeatureListCard } from '../../patterns/FeatureList/FeatureList';
import { Section } from '../Section';
import { cn } from '../../utils/cn';

/**
 * "Patterns" — composed app surfaces built on top of the primitives.
 * Demonstrates the design system in real-world contexts.
 */

export function Patterns() {
  return (
    <Section
      id="patterns"
      eyebrow="Patterns"
      title="Real-world surfaces"
      description="The same primitives, composed into application screens. Filters, modals, share panels — what you actually ship."
    >
      {/* ─────────── Filter group + Viewing options ─────────── */}
      <SubHeading title="Filtering & sorting" />
      <Stage>
        <div className="grid w-full gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AddFiltersCard />
          <PaymentTypeCard />
          <OwnedByCard />
          <LocationCard />
          <ViewingOptionsCard />
        </div>
      </Stage>

      {/* ─────────── Project detail ─────────── */}
      <SubHeading title="Project detail sheet" className="mt-12 sm:mt-16" />
      <Stage>
        <div className="flex w-full justify-center">
          <ProjectDetailCard />
        </div>
      </Stage>

      {/* ─────────── Share + features ─────────── */}
      <SubHeading title="Collaboration surfaces" className="mt-12 sm:mt-16" />
      <Stage>
        <div className="grid w-full gap-5 md:grid-cols-2 max-w-4xl mx-auto">
          <SharePanelCard />
          <FeatureListCard />
        </div>
      </Stage>
    </Section>
  );
}

/* ────────────────────────────────────────────────────────────
 * Showcase chrome — sub-headings + the "stage" surface that
 * frames the patterns with a soft gray background.
 * ──────────────────────────────────────────────────────────── */

function SubHeading({ title, className }: { title: string; className?: string }) {
  return (
    <h3
      className={cn(
        'mb-4 text-sm font-semibold uppercase tracking-[0.16em]',
        'text-[var(--color-fg-subtle)]',
        className
      )}
    >
      {title}
    </h3>
  );
}

function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        'rounded-[var(--radius-3xl)]',
        'bg-[var(--color-bg-subtle)]',
        'border border-[var(--color-border-subtle)]',
        'p-4 sm:p-8 lg:p-12',
        // Subtle dotted texture for visual cue
        'bg-[radial-gradient(color-mix(in_oklch,var(--color-fg-base)_8%,transparent)_1px,transparent_1px),var(--color-bg-subtle)]',
        '[background-size:14px_14px]'
      )}
    >
      <div className="flex justify-center">{children}</div>
    </div>
  );
}
