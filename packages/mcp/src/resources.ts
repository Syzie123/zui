/**
 * Resources — read-only data the agent attaches as context.
 *
 * Direct (fixed URI) resources are listed up-front. Template (parameterized)
 * resources are matched manually against the URI in `readResource`.
 *
 * Access pattern in Claude Code:
 *   user types `@`, picks `zui:design-tokens` → server returns the JSON.
 */

import type { Resource, ResourceTemplate } from '@modelcontextprotocol/sdk/types.js';
import {
  components, patterns, effects, icons, tokens, manifest, llmsTxt,
  findItem, findIcon, repoRoot,
} from './registry.js';
import fs from 'node:fs';
import path from 'node:path';

/* ── Direct resources — these always exist ─────────────────────────────── */

export const resources: Resource[] = [
  {
    uri: 'zui://manifest',
    name: 'manifest',
    title: 'ZUI Catalog Manifest',
    description: 'Counts, version, group order — the lightweight catalog index.',
    mimeType: 'application/json',
  },
  {
    uri: 'zui://design-tokens',
    name: 'design-tokens',
    title: 'Design Tokens',
    description: 'Full ZUI token set across all three themes — colors, gradients, typography, shadows. Includes the new purple gradient brand palette.',
    mimeType: 'application/json',
  },
  {
    uri: 'zui://design-tokens.css',
    name: 'design-tokens-css',
    title: 'Design Tokens (CSS)',
    description: 'Same tokens as `zui://design-tokens` but rendered as a drop-in CSS file.',
    mimeType: 'text/css',
  },
  {
    uri: 'zui://component-api',
    name: 'component-api',
    title: 'Component API',
    description: 'Slim catalog of all components, patterns, effects with import paths and tags.',
    mimeType: 'application/json',
  },
  {
    uri: 'zui://icons/all',
    name: 'icons-all',
    title: 'All Brand & IDE Icons',
    description: 'Names + import paths + tags for every inline SVG icon.',
    mimeType: 'application/json',
  },
  {
    uri: 'zui://llms.txt',
    name: 'llms-txt',
    title: 'LLMs Cheat-Sheet',
    description: 'Tiny plaintext digest of the whole library — names, descriptions, import paths. Use when context is tight.',
    mimeType: 'text/plain',
  },
];

/* ── Templates — parameterized URIs ────────────────────────────────────── */

export const resourceTemplates: ResourceTemplate[] = [
  {
    uriTemplate: 'zui://components/{name}/source',
    name: 'component-source',
    title: 'Component Source',
    description: 'TSX source for a component (e.g. zui://components/Button/source).',
    mimeType: 'application/typescript',
  },
  {
    uriTemplate: 'zui://components/{name}/css',
    name: 'component-css',
    title: 'Component CSS',
    description: 'Component-scoped CSS file when present.',
    mimeType: 'text/css',
  },
  {
    uriTemplate: 'zui://patterns/{name}/source',
    name: 'pattern-source',
    title: 'Pattern Source',
    description: 'Full source for any of the 26 production patterns.',
    mimeType: 'application/typescript',
  },
  {
    uriTemplate: 'zui://patterns/{name}/css',
    name: 'pattern-css',
    title: 'Pattern CSS',
    description: 'Pattern-scoped CSS — useful when copying without using the published package.',
    mimeType: 'text/css',
  },
  {
    uriTemplate: 'zui://effects/{name}/source',
    name: 'effect-source',
    title: 'Effect Source',
    description: 'TSX source for a motion effect.',
    mimeType: 'application/typescript',
  },
  {
    uriTemplate: 'zui://icons/{name}.svg',
    name: 'icon-svg',
    title: 'Icon SVG',
    description: 'Inline SVG markup for any brand or IDE icon.',
    mimeType: 'image/svg+xml',
  },
];

/* ── Reader ────────────────────────────────────────────────────────────── */

type ResourceContent = {
  uri: string;
  mimeType: string;
  text: string;
};

export async function readResource(uri: string): Promise<ResourceContent[]> {
  // Direct resources
  switch (uri) {
    case 'zui://manifest':
      return [{ uri, mimeType: 'application/json', text: JSON.stringify(manifest, null, 2) }];
    case 'zui://design-tokens':
      return [{ uri, mimeType: 'application/json', text: JSON.stringify(tokens, null, 2) }];
    case 'zui://design-tokens.css':
      return [{ uri, mimeType: 'text/css', text: tokensAsCSS() }];
    case 'zui://component-api':
      return [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify({ components, patterns, effects, totals: manifest.counts }, null, 2),
        },
      ];
    case 'zui://icons/all':
      return [{ uri, mimeType: 'application/json', text: JSON.stringify(icons, null, 2) }];
    case 'zui://llms.txt':
      return [{ uri, mimeType: 'text/plain', text: llmsTxt }];
  }

  // Templates
  let m: RegExpMatchArray | null;

  if ((m = uri.match(/^zui:\/\/components\/([^/]+)\/(source|css)$/))) {
    return readSource(uri, 'component', m[1], m[2] as 'source' | 'css');
  }
  if ((m = uri.match(/^zui:\/\/patterns\/([^/]+)\/(source|css)$/))) {
    return readSource(uri, 'pattern', m[1], m[2] as 'source' | 'css');
  }
  if ((m = uri.match(/^zui:\/\/effects\/([^/]+)\/source$/))) {
    return readSource(uri, 'effect', m[1], 'source');
  }
  if ((m = uri.match(/^zui:\/\/icons\/(.+)\.svg$/))) {
    return readIcon(uri, m[1]);
  }

  throw new Error(`Unknown resource URI: ${uri}`);
}

function readSource(
  uri: string,
  expectedKind: 'component' | 'pattern' | 'effect',
  name: string,
  what: 'source' | 'css'
): ResourceContent[] {
  const item = findItem(name);
  if (!item) throw new Error(`Not found: ${name}`);
  if (item.kind !== expectedKind) {
    throw new Error(`${name} is a ${item.kind}, not a ${expectedKind}.`);
  }
  const root = repoRoot();
  if (!root) throw new Error(`Source not available: this build of @zui.react/mcp doesn't ship the original src/. Use the published package instead.`);

  const targetRel = what === 'source' ? item.sourceRel : item.cssRel;
  if (!targetRel) throw new Error(`No ${what} available for ${name}.`);
  const text = fs.readFileSync(path.join(root, targetRel), 'utf8');
  const mimeType = what === 'source' ? 'application/typescript' : 'text/css';
  return [{ uri, mimeType, text }];
}

function readIcon(uri: string, name: string): ResourceContent[] {
  const icon = findIcon(name);
  if (!icon) throw new Error(`Icon not found: ${name}`);
  const root = repoRoot();
  if (!root) {
    return [{ uri, mimeType: 'image/svg+xml', text: `<!-- Source not shipped; install icons via @zui.react/zui -->` }];
  }
  // Brand icons live in a single barrel — extract by name.
  const text = fs.readFileSync(path.join(root, 'src/components/icons/brand.tsx'), 'utf8');
  const re = new RegExp(`export function ${icon.name}\\([^{]*\\{[^}]*?return\\s*\\(([\\s\\S]*?)\\);[\\s\\S]*?\\}`, 'm');
  const m = text.match(re);
  if (!m) throw new Error(`Could not extract SVG for ${icon.name}.`);
  return [{ uri, mimeType: 'image/svg+xml', text: m[1].trim() }];
}

function tokensAsCSS(): string {
  const blocks: string[] = [];
  for (const [theme, vars] of Object.entries(tokens.themes)) {
    const selector = theme === 'theme-clean' ? ':root, .theme-clean' : `.${theme}`;
    blocks.push(
      `${selector} {\n${Object.entries(vars).map(([k, v]) => `  --${k}: ${v};`).join('\n')}\n}`
    );
  }
  return blocks.join('\n\n');
}
