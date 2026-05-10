/**
 * Loads the JSON artefacts produced by `scripts/build-mcp-registry.ts`
 * once at server startup. Everything is in-memory after that — every
 * tool / resource read is O(1) by name + O(n) for filtering.
 *
 * Path resolution: when the package is installed from npm the data lives
 * inside the package (`<pkg>/data/*.json`). When running from the source
 * tree (dev mode via `npm --workspace @zui.react/mcp run dev`) we fall
 * back to the repo's `packages/mcp/data` (same path, just different cwd).
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

/* When compiled to dist/, data lives at ../data relative to dist/.
   When run via tsx from src/, data also lives at ../data. */
const DATA_DIR = path.resolve(__dirname, '../data');

export interface RegistryItem {
  kind: 'component' | 'pattern' | 'effect' | 'icon';
  name: string;
  slug: string;
  group: string;
  description: string;
  isNew?: boolean;
  importPath: string;
  sourceRel: string;
  cssRel?: string;
  docsRel?: string;
  tags: string[];
}

export interface IconItem {
  name: string;
  importPath: string;
  tags: string[];
}

export interface Manifest {
  generatedAt: string;
  zuiVersion: string;
  groups: string[];
  counts: { components: number; patterns: number; effects: number; icons: number };
}

export interface DesignTokens {
  description: string;
  themes: Record<string, Record<string, string>>;
  gradients: Record<string, string>;
}

function loadJSON<T>(file: string): T {
  return JSON.parse(readFileSync(path.join(DATA_DIR, file), 'utf8')) as T;
}

export const components = loadJSON<RegistryItem[]>('components.json');
export const patterns   = loadJSON<RegistryItem[]>('patterns.json');
export const effects    = loadJSON<RegistryItem[]>('effects.json');
export const icons      = loadJSON<IconItem[]>('icons.json');
export const tokens     = loadJSON<DesignTokens>('tokens.json');
export const manifest   = loadJSON<Manifest>('manifest.json');

export const llmsTxt = readFileSync(path.join(DATA_DIR, 'llms.txt'), 'utf8');

/** Combined catalog used by `search` and `list` tools. */
export const all: RegistryItem[] = [...components, ...patterns, ...effects];

/** Lookup helpers — O(1) after the first call (Map cached). */
const byName  = new Map<string, RegistryItem>(all.map((i) => [i.name.toLowerCase(), i]));
const bySlug  = new Map<string, RegistryItem>(all.map((i) => [i.slug.toLowerCase(), i]));
const iconsByName = new Map<string, IconItem>(icons.map((i) => [i.name.toLowerCase(), i]));

export function findItem(query: string): RegistryItem | undefined {
  const q = query.toLowerCase();
  return byName.get(q) ?? bySlug.get(q);
}

export function findIcon(name: string): IconItem | undefined {
  return iconsByName.get(name.toLowerCase()) ?? iconsByName.get(name.toLowerCase() + 'icon');
}

/* Repo root — used when reading source files for resource templates.
   Walks up from the package's installed location until it finds a `src/`
   sibling. In dev that's two levels up from `data/`. In published mode
   the package doesn't ship `src/`, so resource reads gracefully degrade
   to the registry's denormalised description. */
export function repoRoot(): string | null {
  let cur = path.resolve(DATA_DIR, '..', '..');
  for (let i = 0; i < 4; i++) {
    try {
      const trySrc = path.join(cur, 'src');
      readFileSync(path.join(trySrc, 'index.ts'), 'utf8');
      return cur;
    } catch {
      cur = path.resolve(cur, '..');
    }
  }
  return null;
}
