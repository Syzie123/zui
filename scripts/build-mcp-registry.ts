/* ============================================================================
   build-mcp-registry.ts
   ----------------------------------------------------------------------------
   Walks src/components, src/patterns, src/components/effects, src/components/
   icons/brand.tsx and src/styles/tokens.css, then emits a denormalized JSON
   manifest into packages/mcp/data/. The MCP server reads these at startup
   so the server itself never parses TS files at runtime — fast cold-start.

   We also emit `llms.txt`, a ~2 KB plaintext digest the agent can attach as
   a single resource when it just needs the catalog index.

   Run via:  npm run build:mcp
   ============================================================================ */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.resolve(__dirname, '..');
const SRC        = path.join(ROOT, 'src');
const OUT        = path.join(ROOT, 'packages/mcp/data');

type ItemKind = 'component' | 'pattern' | 'effect' | 'icon';

/* Static lookup sets used by inferIconTags(). Hoisted above scanIcons()
   so they're initialised before any module-level call site. */
const SOCIAL = new Set(['Google', 'Apple', 'Microsoft', 'Facebook', 'X', 'GithubBrand']);
const AI     = new Set(['OpenAI', 'Anthropic', 'Claude', 'Gemini', 'Grok', 'Perplexity']);
const IDE    = new Set([
  'Cursor', 'Windsurf', 'Copilot', 'Antigravity', 'Replit', 'V0', 'Bolt',
  'Zoom', 'Slack', 'Framer', 'Loom', 'Hopin', 'Notion', 'Figma',
]);

interface ComponentItem {
  kind: ItemKind;
  name: string;
  /** Sidebar slug (kebab-case). */
  slug: string;
  /** Group label from src/docs/registry.ts. */
  group: string;
  description: string;
  isNew?: boolean;
  /** Public import path users would use. */
  importPath: string;
  /** Path inside the repo so we can read source on demand. */
  sourceRel: string;
  cssRel?: string;
  docsRel?: string;
  tags: string[];
}

/* ──────────────────────────────────────────────────────────────────────── */

ensureDir(OUT);

const docsRegistry = readDocsRegistry();
const components   = scanComponents();
const patterns     = scanPatterns();
const effects      = scanEffects();
const icons        = scanIcons();
const tokens       = readDesignTokens();

const manifest = {
  generatedAt: new Date().toISOString(),
  zuiVersion: readPkgVersion(path.join(ROOT, 'package.json')),
  groups: docsRegistry.groups,
  counts: {
    components: components.length,
    patterns:   patterns.length,
    effects:    effects.length,
    icons:      icons.length,
  },
};

write('manifest.json',   manifest);
write('components.json', components);
write('patterns.json',   patterns);
write('effects.json',    effects);
write('icons.json',      icons);
write('tokens.json',     tokens);
writeText('llms.txt',    buildLlmsTxt());

console.log(
  `[mcp] wrote registry → ${path.relative(ROOT, OUT)}`,
  `\n      components: ${components.length}`,
  `\n      patterns:   ${patterns.length}`,
  `\n      effects:    ${effects.length}`,
  `\n      icons:      ${icons.length}`,
);

/* ──────────────────────────────────────────────────────────────────────── */

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

function write(file: string, data: unknown) {
  fs.writeFileSync(path.join(OUT, file), JSON.stringify(data, null, 2));
}

function writeText(file: string, text: string) {
  fs.writeFileSync(path.join(OUT, file), text);
}

function readPkgVersion(p: string): string {
  const json = JSON.parse(fs.readFileSync(p, 'utf8')) as { version: string };
  return json.version;
}

function relFromRoot(abs: string): string {
  return path.relative(ROOT, abs).replace(/\\/g, '/');
}

/* ── docs/registry.ts → groups + slug + description + isNew ────────────── */

interface DocsRegistryItem {
  slug: string;
  title: string;
  description: string;
  isNew?: boolean;
  group: string;
}
interface DocsRegistry {
  byGroup: Record<string, DocsRegistryItem[]>;
  bySlug:  Record<string, DocsRegistryItem>;
  groups:  string[];
}

function readDocsRegistry(): DocsRegistry {
  // Light text-scrape of src/docs/registry.ts. Avoids pulling in a TS parser.
  const file = path.join(SRC, 'docs/registry.ts');
  const text = fs.readFileSync(file, 'utf8');
  const groupRe = /name:\s*'([^']+)',\s*pages:\s*\[([\s\S]*?)\n\s*\],/g;
  const itemRe  = /\{\s*slug:\s*'([^']+)',\s*title:\s*'([^']+)',\s*description:\s*'([^']*)'(?:,\s*isNew:\s*(true|false))?[^}]*\}/g;

  const byGroup: Record<string, DocsRegistryItem[]> = {};
  const bySlug: Record<string, DocsRegistryItem> = {};
  const groups: string[] = [];

  for (const g of text.matchAll(groupRe)) {
    const groupName = g[1];
    groups.push(groupName);
    byGroup[groupName] = [];
    for (const m of g[2].matchAll(itemRe)) {
      const item: DocsRegistryItem = {
        slug:        m[1],
        title:       m[2],
        description: m[3],
        isNew:       m[4] === 'true',
        group:       groupName,
      };
      byGroup[groupName].push(item);
      bySlug[item.slug] = item;
    }
  }
  return { byGroup, bySlug, groups };
}

/* ── Component scanner ─────────────────────────────────────────────────── */

function scanComponents(): ComponentItem[] {
  const dir = path.join(SRC, 'components');
  const out: ComponentItem[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (entry.name === 'icons' || entry.name === 'effects' || entry.name === 'ecommerce') continue;
    const componentName = entry.name;
    const sourceAbs = findFirst([
      path.join(dir, componentName, `${componentName}.tsx`),
      path.join(dir, componentName, 'index.tsx'),
    ]);
    if (!sourceAbs) continue;
    const slug = toKebab(componentName);
    const meta = docsRegistry.bySlug[slug];
    out.push({
      kind:        'component',
      name:        componentName,
      slug,
      group:       meta?.group ?? 'Components',
      description: meta?.description ?? extractFirstJsdoc(sourceAbs) ?? '',
      isNew:       meta?.isNew,
      importPath:  `@zui.react/zui`,
      sourceRel:   relFromRoot(sourceAbs),
      cssRel:      maybeRel(path.join(dir, componentName, `${componentName}.css`)),
      docsRel:     maybeRel(path.join(SRC, `docs/pages/${slug}.tsx`)),
      tags:        [...(meta?.title.toLowerCase().split(/\s+/) ?? []), 'component'],
    });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

/* ── Pattern scanner ───────────────────────────────────────────────────── */

function scanPatterns(): ComponentItem[] {
  const dir = path.join(SRC, 'patterns');
  const out: ComponentItem[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const pname = entry.name;
    const sourceAbs = findFirst([
      path.join(dir, pname, `${pname}.tsx`),
      path.join(dir, pname, 'index.tsx'),
    ]);
    if (!sourceAbs) continue;
    const slug = toKebab(pname);
    const meta = docsRegistry.bySlug[slug];
    out.push({
      kind:        'pattern',
      name:        pname,
      slug,
      group:       meta?.group ?? 'Patterns',
      description: meta?.description ?? extractFirstJsdoc(sourceAbs) ?? '',
      isNew:       meta?.isNew,
      importPath:  `@zui.react/zui`,
      sourceRel:   relFromRoot(sourceAbs),
      cssRel:      maybeRel(path.join(dir, pname, `${pname}.css`)),
      docsRel:     maybeRel(path.join(SRC, `docs/pages/patterns/${slug}.tsx`)),
      tags:        [pname.toLowerCase(), 'pattern', meta?.group?.toLowerCase() ?? ''],
    });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

/* ── Effect scanner ────────────────────────────────────────────────────── */

function scanEffects(): ComponentItem[] {
  const dir = path.join(SRC, 'components/effects');
  if (!fs.existsSync(dir)) return [];
  const out: ComponentItem[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const ename = entry.name;
    const sourceAbs = findFirst([
      path.join(dir, ename, `${ename}.tsx`),
      path.join(dir, ename, 'index.tsx'),
    ]);
    if (!sourceAbs) continue;
    const slug = toKebab(ename);
    const meta = docsRegistry.bySlug[slug];
    out.push({
      kind:        'effect',
      name:        ename,
      slug,
      group:       'Effects',
      description: meta?.description ?? extractFirstJsdoc(sourceAbs) ?? '',
      isNew:       meta?.isNew,
      importPath:  `@zui.react/zui`,
      sourceRel:   relFromRoot(sourceAbs),
      docsRel:     maybeRel(path.join(SRC, `docs/pages/effects/${slug}.tsx`)),
      tags:        [ename.toLowerCase(), 'effect', 'animation'],
    });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

/* ── Icon scanner ──────────────────────────────────────────────────────── */

function scanIcons(): { name: string; importPath: string; tags: string[] }[] {
  const file = path.join(SRC, 'components/icons/brand.tsx');
  const text = fs.readFileSync(file, 'utf8');
  const re   = /export function (\w+Icon)\(/g;
  const out: { name: string; importPath: string; tags: string[] }[] = [];
  for (const m of text.matchAll(re)) {
    const name = m[1];
    out.push({
      name,
      importPath: '@zui.react/zui',
      tags:       inferIconTags(name),
    });
  }
  return out;
}

function inferIconTags(name: string): string[] {
  const base = name.replace(/Icon$/, '');
  const tags: string[] = ['icon', 'svg', base.toLowerCase()];
  if (SOCIAL.has(base)) tags.push('social');
  if (AI.has(base))     tags.push('ai');
  if (IDE.has(base))    tags.push('ide', 'tool');
  return tags;
}

/* ── Token reader ──────────────────────────────────────────────────────── */

function readDesignTokens() {
  const file = path.join(SRC, 'styles/tokens.css');
  const text = fs.readFileSync(file, 'utf8');
  // Split on theme blocks, capture all `--name: value;` declarations.
  const blocks = ['theme-clean', 'theme-dark', 'theme-luminous'] as const;
  const out: Record<string, Record<string, string>> = {};
  for (const block of blocks) {
    out[block] = {};
    const blockMatch =
      block === 'theme-clean'
        ? text.match(/:root,\s*\.theme-clean\s*\{([\s\S]*?)\n\}/)
        : text.match(new RegExp(`\\.${block}\\s*\\{([\\s\\S]*?)\\n\\}`));
    if (!blockMatch) continue;
    const body = blockMatch[1];
    for (const m of body.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) {
      out[block][m[1]] = m[2].trim().replace(/\s+/g, ' ');
    }
  }
  return {
    description:
      'ZUI design tokens. Values are role-named so the same token works across all three themes.',
    themes: out,
    gradients: {
      primary:        out['theme-clean']?.['gradient-primary']        ?? '',
      bgDark:         out['theme-clean']?.['gradient-bg-dark']        ?? '',
      bgGlow:         out['theme-clean']?.['gradient-bg-glow']        ?? '',
      glassOverlay:   out['theme-clean']?.['gradient-glass-overlay']  ?? '',
    },
  };
}

/* ── Helpers ───────────────────────────────────────────────────────────── */

function findFirst(candidates: string[]): string | null {
  for (const c of candidates) if (fs.existsSync(c)) return c;
  return null;
}

function maybeRel(abs: string): string | undefined {
  return fs.existsSync(abs) ? relFromRoot(abs) : undefined;
}

function toKebab(s: string): string {
  return s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/(\d)([A-Za-z])/g, '$1-$2')
    .replace(/([A-Za-z])(\d)/g, '$1-$2')
    .toLowerCase();
}

function extractFirstJsdoc(file: string): string | null {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/\/\*\*([\s\S]*?)\*\//);
  if (!m) return null;
  return m[1]
    .split('\n')
    .map((l) => l.replace(/^\s*\*\s?/, '').trim())
    .filter((l) => l && !l.startsWith('@'))
    .join(' ')
    .trim()
    .slice(0, 240);
}

function buildLlmsTxt(): string {
  const lines: string[] = [];
  lines.push(`# ZUI — @zui.react/zui v${manifest.zuiVersion}`);
  lines.push(``);
  lines.push(`Modern React component library. All exports come from a single barrel:`);
  lines.push(``);
  lines.push(`    import { Button, Card, … } from '@zui.react/zui';`);
  lines.push(`    import '@zui.react/zui/styles.css';`);
  lines.push(``);
  for (const groupName of docsRegistry.groups) {
    lines.push(`## ${groupName}`);
    lines.push(``);
    for (const item of docsRegistry.byGroup[groupName] ?? []) {
      const flag = item.isNew ? ' (new)' : '';
      lines.push(`- ${item.title}${flag} — ${item.description}`);
    }
    lines.push(``);
  }
  lines.push(`## Brand & IDE icons`);
  lines.push(``);
  lines.push(icons.map((i) => `- ${i.name}`).join('\n'));
  lines.push(``);
  return lines.join('\n');
}
