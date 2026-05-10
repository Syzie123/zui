/**
 * Tiny BM25 over (name + description + tags).
 *
 * 120-line implementation, no external dep. We index the small catalog
 * (~80 items) once at startup; each query walks the index linearly —
 * sub-millisecond and zero memory pressure.
 *
 * Why BM25 and not substring/regex? Substring loses ranking — when a user
 * asks for "modal" they should get Dialog ranked above components that
 * just mention the word in passing. BM25 nails that with a one-line
 * scoring function.
 */

import type { RegistryItem } from './registry.js';

interface Doc {
  item: RegistryItem;
  tokens: string[];
  termFreq: Record<string, number>;
  length: number;
}

/* BM25 parameters — tuned for short, technical docs. */
const K1 = 1.2;
const B  = 0.65;

export class SearchIndex {
  private docs: Doc[] = [];
  private docFreq: Record<string, number> = {};
  private avgLen = 0;

  constructor(items: RegistryItem[]) {
    for (const item of items) {
      const text = [
        item.name,
        item.slug,
        item.description,
        ...item.tags,
        item.kind,
        item.group,
      ]
        .join(' ')
        .toLowerCase();
      const tokens = tokenize(text);
      const termFreq: Record<string, number> = {};
      for (const t of tokens) termFreq[t] = (termFreq[t] ?? 0) + 1;
      this.docs.push({ item, tokens, termFreq, length: tokens.length });
      const seen = new Set(tokens);
      for (const t of seen) this.docFreq[t] = (this.docFreq[t] ?? 0) + 1;
    }
    this.avgLen = this.docs.reduce((s, d) => s + d.length, 0) / Math.max(1, this.docs.length);
  }

  search(query: string, opts: { kinds?: RegistryItem['kind'][]; limit?: number } = {}): RegistryItem[] {
    const q = tokenize(query.toLowerCase());
    if (q.length === 0) return [];

    const N = this.docs.length;
    const limit = opts.limit ?? 20;
    const allowedKinds = opts.kinds ? new Set(opts.kinds) : null;

    const scores: { item: RegistryItem; score: number }[] = [];
    for (const doc of this.docs) {
      if (allowedKinds && !allowedKinds.has(doc.item.kind)) continue;

      let score = 0;
      for (const term of q) {
        const tf = doc.termFreq[term] ?? 0;
        if (tf === 0) continue;
        const df = this.docFreq[term] ?? 0;
        const idf = Math.log((N - df + 0.5) / (df + 0.5) + 1);
        const norm = tf * (K1 + 1) /
          (tf + K1 * (1 - B + B * (doc.length / this.avgLen)));
        score += idf * norm;

        // small boost when the term matches the item's name exactly —
        // Hero pattern beats Hero-mentioning-pattern when query is "hero".
        if (doc.item.name.toLowerCase() === term) score += 1.5;
        if (doc.item.slug.toLowerCase() === term) score += 1.0;
      }

      if (score > 0) scores.push({ item: doc.item, score });
    }

    scores.sort((a, b) => b.score - a.score);
    return scores.slice(0, limit).map((s) => s.item);
  }
}

function tokenize(s: string): string[] {
  return s.split(/[^a-z0-9]+/i).filter(Boolean);
}
