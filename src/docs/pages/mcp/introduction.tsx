import {
  ArrowRight,
  Bolt,
  BookOpen,
  Layers,
  Network,
  Terminal,
  Zap,
} from 'lucide-react';
import { Link } from '../../../hooks/useHashRoute';
import { Button } from '../../../components/Button';
import { CodeBlock } from '../../CodeBlock';
import { H2, H3, P, InlineCode } from '../../page-kit';

export default function MCPIntroduction() {
  return (
    <article>
      <H2>What is the ZUI MCP server?</H2>
      <P>
        <InlineCode>@zui.react/mcp</InlineCode> is a Model Context Protocol server that
        gives any MCP-aware coding agent — Claude Code, Cursor, Windsurf, Continue,
        Zed, Replit Agent, GitHub Copilot, Antigravity — full read access to the
        ZUI catalog plus a small set of write tools that propose file diffs the
        host editor applies.
      </P>
      <P>
        It speaks JSON-RPC 2.0 over stdio. Cold start is sub-300 ms. The whole
        catalog (27 components, 26 patterns, 6 effects, 26 brand &amp; AI-IDE icons,
        and three themes worth of design tokens) ships as static JSON inside the
        package — no model calls, no network, no parsing TS at runtime.
      </P>

      <H3>Why bother</H3>
      <div className="my-6 grid gap-4 sm:grid-cols-2">
        <Tile
          icon={<Zap className="size-5" />}
          title="Zero hallucination"
          body="Agents read our schema, not a stale training snapshot. Prop names, import paths, and types come from the live registry."
        />
        <Tile
          icon={<Bolt className="size-5" />}
          title="One-line install"
          body="claude mcp add zui — one command. The same JSON shape works in Cursor, Windsurf, Continue, Zed."
        />
        <Tile
          icon={<Layers className="size-5" />}
          title="Slash commands"
          body="Six prompts surface as native slash commands: /zui:add-component, /zui:scaffold-page, /zui:find-pattern, …"
        />
        <Tile
          icon={<BookOpen className="size-5" />}
          title="Browseable resources"
          body="Type @ in Claude Code and pick zui:design-tokens, zui:component-source:Button, zui:icons/all — context attached, no tool call needed."
        />
      </div>

      <H2>Quick start</H2>
      <P>One line in your terminal — Claude Code stores the config in <InlineCode>~/.claude.json</InlineCode>:</P>
      <CodeBlock
        language="bash"
        code={`claude mcp add zui -- npx -y @zui.react/mcp`}
      />
      <P>
        For other editors, the config JSON is identical — only the file path
        changes. Full editor matrix on the{' '}
        <Link href="/components/mcp-installation" className="text-[var(--color-accent-base)] underline">
          installation page
        </Link>
        .
      </P>

      <H2>Try these</H2>
      <P>After installing, ask the agent:</P>
      <ul className="my-3 space-y-2 pl-5 text-[15px] leading-relaxed text-[var(--color-fg-muted)] [&>li]:list-disc [&>li]:marker:text-[var(--color-accent-base)]">
        <li>
          <em>"Add a Button component to my project at <code>src/components/zui-demos</code>."</em>
        </li>
        <li>
          <em>"Scaffold a pricing page at <code>src/app/pricing/page.tsx</code> using ZUI patterns in dark theme."</em>
        </li>
        <li>
          <em>"What's the best ZUI pattern for an AI chat composer?"</em>
        </li>
        <li>
          <em>"Show me the design tokens for the dark theme."</em>
        </li>
        <li>
          <em>"Apply the BorderBeam effect to my Hero card."</em>
        </li>
      </ul>

      <H2>How it's built</H2>
      <P>
        At lib-build time, <InlineCode>scripts/build-mcp-registry.ts</InlineCode>{' '}
        walks <InlineCode>src/components</InlineCode>, <InlineCode>src/patterns</InlineCode>,
        the effects directory, the brand-icon barrel, and{' '}
        <InlineCode>src/styles/tokens.css</InlineCode>, then emits seven JSON
        artefacts plus an <InlineCode>llms.txt</InlineCode> digest into the MCP
        package. The server reads JSON only — that's why cold start stays under
        300 ms and the catalog can never drift from the published library.
      </P>
      <P>
        Versioning is lock-stepped: <InlineCode>@zui.react/mcp@0.8.x</InlineCode>{' '}
        always ships the registry generated for{' '}
        <InlineCode>@zui.react/zui@0.8.x</InlineCode>.
      </P>

      <H2>What's exposed</H2>
      <P>
        The complete surface is documented on the{' '}
        <Link href="/components/mcp-reference" className="text-[var(--color-accent-base)] underline">
          reference page
        </Link>
        :
      </P>
      <ul className="my-3 space-y-1.5 pl-5 text-[15px] leading-relaxed text-[var(--color-fg-muted)] [&>li]:list-disc [&>li]:marker:text-[var(--color-accent-base)]">
        <li>
          <strong className="text-[var(--color-fg-base)]">14 tools</strong> — discovery,
          read-deep, action (add_component, add_pattern, scaffold_page).
        </li>
        <li>
          <strong className="text-[var(--color-fg-base)]">12 resources</strong> — 6
          direct (manifest, design tokens, llms.txt, …) + 6 templates
          (component / pattern / effect source, icon SVG).
        </li>
        <li>
          <strong className="text-[var(--color-fg-base)]">6 prompts</strong> — slash
          commands for the most common workflows.
        </li>
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link href="/components/mcp-installation">
          <Button rightIcon={<ArrowRight className="size-4" />}>
            Install for your editor
          </Button>
        </Link>
        <Link href="/components/mcp-reference">
          <Button variant="secondary" leftIcon={<Terminal className="size-4" />}>
            Reference
          </Button>
        </Link>
        <a
          href="https://github.com/Syzie123/zui/blob/main/MCP-PLAN.md"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="ghost" leftIcon={<Network className="size-4" />}>
            Architecture plan
          </Button>
        </a>
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
