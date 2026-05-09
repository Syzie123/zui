import { ArrowRight, Sparkles, Zap, Eye, Layers } from 'lucide-react';
import { Link } from '../../hooks/useHashRoute';
import { Button } from '../../components/Button';
import { H2, H3, P, InlineCode } from '../page-kit';

export default function Introduction() {
  return (
    <article>
      <H2>What is ZUI?</H2>
      <P>
        ZUI is a modern React component library built on a single token-based design
        system. Three themes — <InlineCode>theme-clean</InlineCode>,{' '}
        <InlineCode>theme-dark</InlineCode>, and <InlineCode>theme-luminous</InlineCode> —
        share the same components; theme swap is a single class on{' '}
        <InlineCode>&lt;html&gt;</InlineCode>, no React re-renders.
      </P>

      <H2>Design principles</H2>
      <div className="my-6 grid gap-4 sm:grid-cols-2">
        <Tile
          icon={<Zap className="size-5" />}
          title="Performance is a feature"
          body="Animations only target transform and opacity. will-change is scoped to elements about to move, never global."
        />
        <Tile
          icon={<Layers className="size-5" />}
          title="Tokens are the API"
          body="Every color, space, radius, and duration is a CSS variable. Theming is one class swap."
        />
        <Tile
          icon={<Sparkles className="size-5" />}
          title="Composition over configuration"
          body="Compound components (<Dialog.Trigger>) beat giant prop bags."
        />
        <Tile
          icon={<Eye className="size-5" />}
          title="Accessible by default"
          body="WCAG AA contrast, focus trapped overlays, prefers-reduced-motion respected."
        />
      </div>

      <H2>What's inside</H2>
      <P>
        20+ components grouped into four tiers — Foundations (Button, Input,
        Avatar…), Overlays (Popover, Tooltip, DropdownMenu…), the Modal layer
        (Dialog, Toast), Forms (Checkbox, Switch, Select…), and Composition
        (Card, Tabs, Accordion). Plus 6 motion effects and 5 production patterns.
      </P>

      <H3>Stack</H3>
      <P>
        React 18+, Tailwind CSS v4 (CSS-first config), Radix UI primitives, and
        Floating UI. No CSS-in-JS runtime, no global side effects on import.
      </P>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link href="/components/installation">
          <Button rightIcon={<ArrowRight className="size-4" />}>
            Get started
          </Button>
        </Link>
        <Link href="/components/button">
          <Button variant="secondary">Browse components</Button>
        </Link>
      </div>
    </article>
  );
}

function Tile({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)] p-5">
      <span className="grid size-9 place-items-center rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] text-[var(--color-accent-base)]">
        {icon}
      </span>
      <p className="mt-3 text-[15px] font-semibold tracking-[-0.01em]">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-fg-muted)]">
        {body}
      </p>
    </div>
  );
}
