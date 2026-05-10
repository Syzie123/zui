/**
 * Tool definitions and handlers.
 *
 * Each tool returns `{ content: [{ type: 'text', text: ... }] }`. JSON
 * payloads are JSON.stringified so any client can render them.
 *
 * Action tools (add_component, add_pattern, scaffold_page) return a
 * `files` block — proposed file diffs the host editor applies. The
 * server itself never touches the user's filesystem.
 */

import type { Tool } from '@modelcontextprotocol/sdk/types.js';
import {
  components, patterns, effects, icons, tokens, manifest,
  all, findItem, findIcon, repoRoot,
} from './registry.js';
import { SearchIndex } from './search.js';
import fs from 'node:fs';
import path from 'node:path';

const index = new SearchIndex(all);

/* ──────────────────────────────────────────────────────────────────────── */
/* Tool definitions                                                          */
/* ──────────────────────────────────────────────────────────────────────── */

export const tools: Tool[] = [
  {
    name: 'list_components',
    description:
      'List all ZUI components (' + manifest.counts.components + ' total) with name, slug, group and one-line description.',
    inputSchema: {
      type: 'object',
      properties: {
        group: { type: 'string', description: 'Optional group filter (e.g. "Components", "Effects").' },
        includeNew: { type: 'boolean', description: 'Only return items marked as new in the docs registry.' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'list_patterns',
    description:
      'List all ZUI production patterns (' + manifest.counts.patterns + ' total). Filter by group: Patterns, AI, 3D, Ecommerce.',
    inputSchema: {
      type: 'object',
      properties: {
        group: { type: 'string', description: 'Optional group filter.' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'list_effects',
    description:
      'List all ZUI motion effects (' + manifest.counts.effects + ' total) — Marquee, BorderBeam, Dock, etc.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'list_icons',
    description:
      'List all ZUI brand & AI-IDE icons (' + manifest.counts.icons + ' total). Filter by tag (social / ai / ide).',
    inputSchema: {
      type: 'object',
      properties: {
        tag: { type: 'string', description: 'Filter by tag — "social", "ai", "ide", or any other tag.' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'list_groups',
    description: 'List all sidebar groups in the order they appear on the docs site.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'search',
    description:
      'Unified BM25 search across components, patterns, effects, and icons. Returns the top matches by relevance.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Free-text query — name, behaviour, or use-case.' },
        kinds: {
          type: 'array',
          items: { type: 'string', enum: ['component', 'pattern', 'effect', 'icon'] },
          description: 'Limit search to specific kinds.',
        },
        limit: { type: 'number', description: 'Max results (default 10, max 50).' },
      },
      required: ['query'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_component',
    description:
      'Get full record for a component: import path, source file path, CSS path, docs path, tags.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Component name or slug (case-insensitive).' },
        includeSource: { type: 'boolean', description: 'Inline the source TSX (off by default to keep responses small).' },
      },
      required: ['name'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_pattern',
    description: 'Get full record for a pattern. Same shape as get_component.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        includeSource: { type: 'boolean' },
      },
      required: ['name'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_effect',
    description: 'Get full record for a motion effect.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        includeSource: { type: 'boolean' },
      },
      required: ['name'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_icon',
    description: 'Get a single brand / IDE icon — name, import path, tags.',
    inputSchema: {
      type: 'object',
      properties: { name: { type: 'string', description: 'Icon name, with or without the "Icon" suffix.' } },
      required: ['name'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_design_tokens',
    description:
      'Return the full token set (colors, typography, gradients, shadows). Includes the new purple gradient brand palette.',
    inputSchema: {
      type: 'object',
      properties: {
        theme: { type: 'string', enum: ['theme-clean', 'theme-dark', 'theme-luminous', 'all'], description: 'Default "all".' },
        format: { type: 'string', enum: ['json', 'css'], description: 'Default "json".' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'add_component',
    description:
      'Plan a file diff that adds a ZUI component to the user\'s React project. Returns proposed files + npm dependencies — the host editor applies them.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Component name (e.g. "Button").' },
        usage: { type: 'string', enum: ['import', 'copy'], description: 'import = use the published package; copy = forkable source. Default "import".' },
        dest: { type: 'string', description: 'Destination directory for the demo file (default "src/components/zui-demos").' },
        dryRun: { type: 'boolean', description: 'Return the plan without final commit prompt.' },
      },
      required: ['name'],
      additionalProperties: false,
    },
  },
  {
    name: 'add_pattern',
    description:
      'Same as add_component but for production patterns (sign-in cards, plan cards, talent grids, etc.).',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        usage: { type: 'string', enum: ['import', 'copy'] },
        dest: { type: 'string' },
        dryRun: { type: 'boolean' },
      },
      required: ['name'],
      additionalProperties: false,
    },
  },
  {
    name: 'scaffold_page',
    description:
      'Generate a complete TSX page composed of ZUI patterns. Returns one file the editor writes; the server never touches disk.',
    inputSchema: {
      type: 'object',
      properties: {
        pageType: {
          type: 'string',
          enum: ['landing', 'dashboard', 'auth', 'pricing', 'showcase'],
          description: 'High-level page archetype.',
        },
        outputPath: { type: 'string', description: 'Where the page should be written (e.g. "src/app/page.tsx").' },
        theme: { type: 'string', enum: ['light', 'dark', 'auto'] },
        patternRefs: { type: 'array', items: { type: 'string' }, description: 'Optional: specific patterns to include.' },
      },
      required: ['pageType', 'outputPath'],
      additionalProperties: false,
    },
  },
];

/* ──────────────────────────────────────────────────────────────────────── */
/* Handlers                                                                  */
/* ──────────────────────────────────────────────────────────────────────── */

type ToolResult = {
  content: { type: 'text'; text: string }[];
  isError?: boolean;
  structuredContent?: Record<string, unknown>;
};

const ok = (payload: unknown): ToolResult => ({
  content: [{ type: 'text', text: typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2) }],
  structuredContent: typeof payload === 'object' && payload !== null ? (payload as Record<string, unknown>) : undefined,
});

const err = (message: string): ToolResult => ({
  content: [{ type: 'text', text: message }],
  isError: true,
});

export async function callTool(name: string, args: Record<string, unknown>): Promise<ToolResult> {
  switch (name) {
    case 'list_components': {
      const group = (args.group as string) ?? null;
      const includeNew = Boolean(args.includeNew);
      let out = components;
      if (group) out = out.filter((c) => c.group.toLowerCase() === group.toLowerCase());
      if (includeNew) out = out.filter((c) => c.isNew);
      return ok(out.map(slim));
    }

    case 'list_patterns': {
      const group = (args.group as string) ?? null;
      let out = patterns;
      if (group) out = out.filter((p) => p.group.toLowerCase() === group.toLowerCase());
      return ok(out.map(slim));
    }

    case 'list_effects':
      return ok(effects.map(slim));

    case 'list_icons': {
      const tag = (args.tag as string)?.toLowerCase();
      let out = icons;
      if (tag) out = out.filter((i) => i.tags.includes(tag));
      return ok(out);
    }

    case 'list_groups':
      return ok(manifest.groups);

    case 'search': {
      const query = (args.query as string) ?? '';
      const kinds = (args.kinds as ('component' | 'pattern' | 'effect' | 'icon')[]) ?? undefined;
      const limit = Math.min((args.limit as number) ?? 10, 50);
      if (!query.trim()) return err('search: `query` is required and cannot be empty.');
      // Icons aren't in the BM25 index (we keep that small) — substring match.
      const matched = index.search(query, { kinds: kinds?.filter((k) => k !== 'icon'), limit });
      const iconHits = !kinds || kinds.includes('icon')
        ? icons
            .filter((i) => i.name.toLowerCase().includes(query.toLowerCase()) || i.tags.some((t) => t.includes(query.toLowerCase())))
            .slice(0, 5)
            .map((i) => ({ kind: 'icon' as const, name: i.name, importPath: i.importPath, tags: i.tags }))
        : [];
      return ok({ items: matched.map(slim), icons: iconHits });
    }

    case 'get_component':
    case 'get_pattern':
    case 'get_effect': {
      const itemName = (args.name as string) ?? '';
      const includeSource = Boolean(args.includeSource);
      const item = findItem(itemName);
      if (!item) return err(`Not found: ${itemName}. Try search first.`);
      const expectedKind = name === 'get_component' ? 'component' : name === 'get_pattern' ? 'pattern' : 'effect';
      if (item.kind !== expectedKind) return err(`${item.name} is a ${item.kind}, not a ${expectedKind}. Use get_${item.kind}.`);
      const result: Record<string, unknown> = { ...item, docsUrl: docsUrlFor(item) };
      if (includeSource) result.source = readRepoFile(item.sourceRel);
      if (includeSource && item.cssRel) result.css = readRepoFile(item.cssRel);
      return ok(result);
    }

    case 'get_icon': {
      const iconName = (args.name as string) ?? '';
      const icon = findIcon(iconName);
      if (!icon) return err(`Icon not found: ${iconName}. Try list_icons.`);
      return ok({ ...icon, usage: `import { ${icon.name} } from '@zui.react/zui';\n<${icon.name} className="size-5" />` });
    }

    case 'get_design_tokens': {
      const theme = (args.theme as string) ?? 'all';
      const format = (args.format as string) ?? 'json';
      if (format === 'css') {
        const block = (cls: string, vars: Record<string, string>) =>
          `${cls === ':root' ? ':root, .theme-clean' : `.${cls}`} {\n` +
          Object.entries(vars).map(([k, v]) => `  --${k}: ${v};`).join('\n') +
          `\n}`;
        if (theme === 'all') {
          return ok(['theme-clean', 'theme-dark', 'theme-luminous'].map((t) => block(t === 'theme-clean' ? ':root' : t, tokens.themes[t] ?? {})).join('\n\n'));
        }
        return ok(block(theme, tokens.themes[theme] ?? {}));
      }
      return ok(theme === 'all' ? tokens : tokens.themes[theme] ?? {});
    }

    case 'add_component':
    case 'add_pattern': {
      const itemName = (args.name as string) ?? '';
      const usage = (args.usage as string) ?? 'import';
      const dest = (args.dest as string) ?? 'src/components/zui-demos';
      const dryRun = Boolean(args.dryRun);
      const item = findItem(itemName);
      if (!item) return err(`Not found: ${itemName}.`);

      const filename = `${item.slug}.tsx`;
      const filePath = path.posix.join(dest, filename);
      const importLine = `import { ${item.name} } from '@zui.react/zui';`;
      const stylesLine = `import '@zui.react/zui/styles.css';`;
      let body: string;

      if (usage === 'copy') {
        const src = readRepoFile(item.sourceRel);
        body = src
          ? `// Copied from ${item.sourceRel} — fork at will.\n${src}`
          : `// Source unavailable in published mode. Use usage: 'import' instead.`;
      } else {
        body = generateImportDemo(item.name, item.kind);
      }

      const filesPlan = {
        files: [
          {
            path: filePath,
            action: 'create' as const,
            language: 'typescript-react',
            contents: body,
          },
        ],
        dependencies: usage === 'import' ? { '@zui.react/zui': `^${manifest.zuiVersion}` } : {},
        notes: usage === 'import'
          ? [`${importLine}`, stylesLine, `Demo file ready at ${filePath}.`]
          : [`Source copied verbatim — you may want to vendorise the CSS at ${item.cssRel ?? 'n/a'} as well.`],
        dryRun,
      };
      return ok(filesPlan);
    }

    case 'scaffold_page': {
      const pageType = (args.pageType as string) ?? 'landing';
      const outputPath = (args.outputPath as string) ?? '';
      if (!outputPath) return err('scaffold_page: `outputPath` is required.');
      const theme = (args.theme as string) ?? 'auto';
      const patternRefs = (args.patternRefs as string[]) ?? defaultPatternsFor(pageType);
      const validRefs = patternRefs.map(findItem).filter((p): p is NonNullable<typeof p> => Boolean(p));
      const contents = renderPage(pageType, theme, validRefs);
      return ok({
        files: [{ path: outputPath, action: 'create', language: 'typescript-react', contents }],
        dependencies: { '@zui.react/zui': `^${manifest.zuiVersion}` },
        usedPatterns: validRefs.map((p) => p.name),
        theme,
      });
    }

    default:
      return err(`Unknown tool: ${name}`);
  }
}

/* ──────────────────────────────────────────────────────────────────────── */
/* Helpers                                                                   */
/* ──────────────────────────────────────────────────────────────────────── */

function slim(i: import('./registry.js').RegistryItem) {
  return {
    kind: i.kind,
    name: i.name,
    slug: i.slug,
    group: i.group,
    description: i.description,
    isNew: i.isNew ?? false,
    importPath: i.importPath,
    docsUrl: docsUrlFor(i),
    tags: i.tags,
  };
}

function docsUrlFor(i: import('./registry.js').RegistryItem): string {
  return `https://zui.dev/components/${i.slug}`;
}

function readRepoFile(rel: string): string | null {
  const root = repoRoot();
  if (!root) return null;
  try {
    return fs.readFileSync(path.join(root, rel), 'utf8');
  } catch {
    return null;
  }
}

function generateImportDemo(componentName: string, kind: string): string {
  const importStmt = `import { ${componentName} } from '@zui.react/zui';\nimport '@zui.react/zui/styles.css';`;
  if (kind === 'icon') {
    return `${importStmt}\n\nexport function ${componentName}Demo() {\n  return <${componentName} className="size-6" />;\n}\n`;
  }
  if (kind === 'effect') {
    return `${importStmt}\n\nexport function ${componentName}Demo() {\n  return (\n    <${componentName}>\n      <div className="size-32 rounded-2xl bg-violet-500" />\n    </${componentName}>\n  );\n}\n`;
  }
  return `${importStmt}\n\nexport function ${componentName}Demo() {\n  return <${componentName} />;\n}\n`;
}

const SCAFFOLD_TEMPLATES: Record<string, string[]> = {
  landing:   ['SignInCard', 'PlanCard3D', 'TalentGrid'],
  dashboard: ['StatsCard', 'MenuList3D', 'AIPrompt'],
  auth:      ['LoginSplit', 'SignInCard'],
  pricing:   ['PricingDark', 'PlanCard3D'],
  showcase:  ['ImageCard3D', 'JobCardStack', 'TravelCard'],
};

function defaultPatternsFor(pageType: string): string[] {
  return SCAFFOLD_TEMPLATES[pageType] ?? SCAFFOLD_TEMPLATES.landing;
}

function renderPage(pageType: string, theme: string, refs: import('./registry.js').RegistryItem[]): string {
  const used = refs.length > 0 ? refs : defaultPatternsFor(pageType).map(findItem).filter(Boolean) as import('./registry.js').RegistryItem[];
  const importNames = used.map((r) => r.name);
  const wrapperClass =
    theme === 'dark'
      ? 'min-h-screen bg-[var(--color-bg-base)] text-[var(--color-fg-base)]'
      : theme === 'light'
      ? 'min-h-screen bg-white text-zinc-900'
      : 'min-h-screen bg-[var(--color-bg-base)] text-[var(--color-fg-base)]';
  return `import {
  ${importNames.join(',\n  ')},
} from '@zui.react/zui';
import '@zui.react/zui/styles.css';

/**
 * ${pageType.charAt(0).toUpperCase() + pageType.slice(1)} page scaffolded by @zui.react/mcp.
 * Uses ${importNames.length} ZUI pattern${importNames.length === 1 ? '' : 's'}: ${importNames.join(', ')}.
 */
export default function Page() {
  return (
    <main className="${wrapperClass}">
      <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
${used.map((r) => `        <section><${r.name} /></section>`).join('\n')}
      </div>
    </main>
  );
}
`;
}
