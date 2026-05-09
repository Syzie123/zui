/**
 * Tiny regex-based JSX/TSX syntax highlighter.
 * Trades fidelity for size — no parser, just colorized tokens.
 * Output is HTML string with <span class="tok-*"> wrappers.
 */

const KEYWORDS = new Set([
  'import', 'export', 'from', 'as', 'default', 'const', 'let', 'var',
  'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch',
  'case', 'break', 'continue', 'throw', 'try', 'catch', 'finally',
  'class', 'extends', 'new', 'this', 'super', 'typeof', 'instanceof',
  'in', 'of', 'void', 'delete', 'true', 'false', 'null', 'undefined',
  'async', 'await', 'yield', 'static', 'public', 'private', 'protected',
  'interface', 'type', 'enum', 'implements', 'readonly', 'declare',
]);

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

interface Token {
  type:
    | 'comment'
    | 'string'
    | 'tag'
    | 'attr'
    | 'keyword'
    | 'function'
    | 'number'
    | 'punct'
    | 'plain';
  value: string;
}

function tokenize(src: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const len = src.length;

  while (i < len) {
    // Block comments
    if (src.startsWith('/*', i)) {
      const end = src.indexOf('*/', i + 2);
      const stop = end === -1 ? len : end + 2;
      tokens.push({ type: 'comment', value: src.slice(i, stop) });
      i = stop;
      continue;
    }
    // Line comments
    if (src.startsWith('//', i)) {
      const end = src.indexOf('\n', i);
      const stop = end === -1 ? len : end;
      tokens.push({ type: 'comment', value: src.slice(i, stop) });
      i = stop;
      continue;
    }
    // JSX comments
    if (src.startsWith('{/*', i)) {
      const end = src.indexOf('*/}', i);
      const stop = end === -1 ? len : end + 3;
      tokens.push({ type: 'comment', value: src.slice(i, stop) });
      i = stop;
      continue;
    }
    // Strings (with escape handling)
    const ch = src[i];
    if (ch === '"' || ch === "'" || ch === '`') {
      let j = i + 1;
      while (j < len) {
        const c = src[j];
        if (c === '\\') {
          j += 2;
          continue;
        }
        if (c === ch) {
          j++;
          break;
        }
        j++;
      }
      tokens.push({ type: 'string', value: src.slice(i, j) });
      i = j;
      continue;
    }
    // JSX tag opener (covers <Foo, </Foo, <foo, but not < as comparison)
    if (
      ch === '<' &&
      i + 1 < len &&
      /[A-Za-z/]/.test(src[i + 1])
    ) {
      // Eat <(/?)Identifier
      let j = i + 1;
      if (src[j] === '/') j++;
      while (j < len && /[A-Za-z0-9_.-]/.test(src[j])) j++;
      tokens.push({ type: 'tag', value: src.slice(i, j) });
      i = j;
      continue;
    }
    // Numbers
    if (/[0-9]/.test(ch) && (i === 0 || !/[a-zA-Z_$]/.test(src[i - 1]))) {
      let j = i;
      while (j < len && /[0-9.]/.test(src[j])) j++;
      tokens.push({ type: 'number', value: src.slice(i, j) });
      i = j;
      continue;
    }
    // Identifiers / keywords / function calls
    if (/[A-Za-z_$]/.test(ch)) {
      let j = i;
      while (j < len && /[A-Za-z0-9_$]/.test(src[j])) j++;
      const word = src.slice(i, j);
      // Check if followed by `(` → function call
      let k = j;
      while (k < len && src[k] === ' ') k++;
      const isCall = src[k] === '(';

      if (KEYWORDS.has(word)) {
        tokens.push({ type: 'keyword', value: word });
      } else if (isCall) {
        tokens.push({ type: 'function', value: word });
      } else {
        // After `<` it might be a JSX prop name
        tokens.push({ type: 'plain', value: word });
      }
      i = j;
      continue;
    }
    // Punctuation: collapse runs of non-letter chars (cheap)
    let j = i;
    while (
      j < len &&
      !/[A-Za-z0-9_$"'`/<]/.test(src[j]) &&
      src[j] !== '\n' &&
      src[j] !== ' ' &&
      src[j] !== '\t'
    ) {
      j++;
    }
    if (j > i) {
      tokens.push({ type: 'punct', value: src.slice(i, j) });
      i = j;
      continue;
    }
    // Whitespace / fallback — single char
    tokens.push({ type: 'plain', value: ch });
    i++;
  }
  return tokens;
}

export function highlight(src: string): string {
  return tokenize(src)
    .map(({ type, value }) =>
      type === 'plain'
        ? escape(value)
        : `<span class="tok-${type}">${escape(value)}</span>`
    )
    .join('');
}
