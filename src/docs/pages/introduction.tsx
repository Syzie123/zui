import { ArrowRight, Sparkles, Zap, Eye, Layers, Terminal } from 'lucide-react';
import { Link } from '../../hooks/useHashRoute';
import { Button } from '../../components/Button';
import { H2, H3, P, InlineCode } from '../page-kit';
import { COUNTS } from '../registry';
import { AgentRow } from '../AgentList';

export default function Introduction() {
  return (
    <article>
      <H2>What is ZUI?</H2>
      <P>
        ZUI is a modern React component library built on a single token-based design
        system. Three themes — <InlineCode>theme-clean</InlineCode>,{' '}
        <InlineCode>theme-dark</InlineCode>, and <InlineCode>theme-luminous</InlineCode> —
        share the same components; theme swap is one class on{' '}
        <InlineCode>&lt;html&gt;</InlineCode>, no React re-renders.
      </P>
      <P>
        v0.8 ships a premium purple gradient brand surface and{' '}
        <InlineCode>@zui.react/mcp</InlineCode> — a drop-in MCP server that exposes the
        whole catalog to Claude Code, Cursor, Windsurf, Copilot, and Antigravity in
        one command.
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
        {COUNTS.components} components grouped into five tiers — Foundations
        (Button, Input, Avatar…), Overlays (Popover, Tooltip, DropdownMenu…),
        the Modal layer (Dialog, AlertDialog, Toast, Sheet), Forms (Checkbox,
        Switch, Select, SegmentedControl…), and Composition (Card, Tabs,
        Accordion, Sidebar). Plus {COUNTS.effects} motion effects,{' '}
        {COUNTS.patterns} production patterns (
        {COUNTS.patternsByGroup.base} base,{' '}
        {COUNTS.patternsByGroup.ai} AI-native,{' '}
        {COUNTS.patternsByGroup['3d']} 3D / scene), and{' '}
        {COUNTS.icons} inline brand &amp; AI-IDE icons.
      </P>

      <H3>Stack</H3>
      <P>
        React 18+, Tailwind CSS v4 (CSS-first config), Radix UI primitives, and
        Floating UI. No CSS-in-JS runtime, no global side effects on import.
        ESM-only, ~52 KB gzipped JS + ~34 KB gzipped CSS.
      </P>

      <H3>MCP — let your editor write ZUI for you</H3>
      <P>
        The <InlineCode>@zui.react/mcp</InlineCode> server speaks JSON-RPC over stdio
        and gives any MCP-aware coding agent the full ZUI catalog as tools, resources,
        and slash commands. Add it to Claude Code in one line:
      </P>
      <pre className="my-3 overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border-base)] bg-[var(--color-bg-subtle)] px-4 py-3 font-mono text-[13px]">
        <code>claude mcp add zui -- npx -y @zui.react/mcp</code>
      </pre>

      {/* Visual list of every supported editor — single source of truth
          for the icon row, kept in src/docs/AgentList.tsx. */}
      <AgentRow tone="neutral" className="my-5 justify-start" />

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link href="/components/installation">
          <Button rightIcon={<ArrowRight className="size-4" />}>
            Get started
          </Button>
        </Link>
        <Link href="/components/mcp-introduction">
          <Button variant="secondary" leftIcon={<Terminal className="size-4" />}>
            Set up the MCP server
          </Button>
        </Link>
        <Link href="/components/button">
          <Button variant="ghost">Browse components</Button>
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
      <span
        className="grid size-9 place-items-center rounded-[var(--radius-md)] bg-[var(--color-accent-soft)]"
        // `--color-accent-on-soft` is purple in the clean theme and white
        // in dark / luminous so icons stay legible on the tinted tile.
        style={{ color: 'var(--color-accent-on-soft)' }}
      >
        {icon}
      </span>
      <p className="mt-3 text-[15px] font-semibold tracking-[-0.01em]">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-fg-muted)]">
        {body}
      </p>
    </div>
  );
}
