import { type ComponentType, type HTMLAttributes } from 'react';
import {
  AntigravityIcon,
  ClaudeIcon,
  ContinueIcon,
  CopilotIcon,
  CursorIcon,
  ReplitIcon,
  WindsurfIcon,
  ZedIcon,
} from '../components/icons/brand';
import { cn } from '../utils/cn';

/**
 * Shared list of MCP-aware coding agents — keeps the icon row consistent
 * across the hero, MCP intro, MCP installation matrix, and the getting-
 * started pages. Order = the install matrix order on /components/mcp-installation.
 */
export interface AgentRecord {
  /** Brand icon (size-controlled by the caller). */
  Icon: ComponentType<{ className?: string; size?: number }>;
  /** Display name as it appears in copy. */
  name: string;
  /** Short label used inside icon-only rows. Defaults to `name`. */
  short?: string;
}

export const AGENTS: AgentRecord[] = [
  { Icon: ClaudeIcon,      name: 'Claude Code',     short: 'Claude Code' },
  { Icon: CursorIcon,      name: 'Cursor' },
  { Icon: WindsurfIcon,    name: 'Windsurf' },
  { Icon: ContinueIcon,    name: 'Continue' },
  { Icon: ZedIcon,         name: 'Zed' },
  { Icon: CopilotIcon,     name: 'GitHub Copilot',  short: 'Copilot' },
  { Icon: AntigravityIcon, name: 'Antigravity' },
  { Icon: ReplitIcon,      name: 'Replit Agent',    short: 'Replit' },
];

/* ────────────────────────────────────────────────────────────
 * <AgentRow /> — horizontal pill row, used in heroes and intros.
 * Pure-glass on dark surfaces, neutral on light surfaces.
 * ──────────────────────────────────────────────────────────── */

interface AgentRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Icon size in px. Defaults to 18. */
  iconSize?: number;
  /** Subset of AGENTS. Defaults to all. */
  agents?: AgentRecord[];
  /** Whether to show the name next to the icon. Defaults true. */
  showLabel?: boolean;
  /** Visual treatment. `glass` = white-alpha (over dark gradient bg);
   *  `neutral` = surface tokens (over the docs page bg). */
  tone?: 'glass' | 'neutral';
}

export function AgentRow({
  iconSize = 18,
  agents = AGENTS,
  showLabel = true,
  tone = 'glass',
  className,
  ...rest
}: AgentRowProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-2',
        className
      )}
      {...rest}
    >
      {agents.map(({ Icon, name, short }) => (
        <span
          key={name}
          title={name}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full',
            'px-2.5 py-1.5 text-[12px] font-medium',
            'transition-colors duration-[var(--duration-fast)]',
            tone === 'glass'
              ? 'border border-white/12 bg-white/[0.06] text-white/85 backdrop-blur-sm hover:bg-white/[0.10] hover:text-white'
              : 'border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)] text-[var(--color-fg-base)]'
          )}
        >
          <Icon size={iconSize} />
          {showLabel && (
            <span className="whitespace-nowrap">{short ?? name}</span>
          )}
        </span>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * <AgentMark /> — single inline icon + name, used in H2 prefixes.
 * ──────────────────────────────────────────────────────────── */

export function AgentMark({
  agent,
  size = 22,
  className,
}: {
  agent: AgentRecord;
  size?: number;
  className?: string;
}) {
  const { Icon, name } = agent;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 align-middle',
        className
      )}
    >
      <Icon size={size} />
      <span>{name}</span>
    </span>
  );
}

/** Lookup helper for spot-use of one agent's icon (e.g. in an H2). */
export function findAgent(name: string): AgentRecord | undefined {
  const q = name.toLowerCase();
  return AGENTS.find(
    (a) => a.name.toLowerCase() === q || a.short?.toLowerCase() === q
  );
}
