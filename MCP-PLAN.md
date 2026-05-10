# ZUI MCP Server — Architecture & Build Plan

> **Status:** approved plan, ready to start implementation
> **Target package:** `@zui.react/mcp`
> **Target spec:** MCP `2025-11-25` (latest stable as of May 2026)
> **Primary transport:** stdio (with future HTTP variant)
> **License:** MIT (matches the main `@zui.react/zui` package)

The goal: a single MCP server that exposes the ZUI design system to AI coding agents (Claude Code, Cursor, Windsurf, Copilot, Antigravity, Zed, Replit Agent, Continue, etc.). Users say _"add a Button"_ or _"scaffold a landing page with ZUI"_ and the agent does it correctly without hallucinating prop names or imports.

This document is the source of truth. Each section is implementation-ready; the order in §11 is the work plan.

---

## 1. Why MCP, why now

The MCP spec hardened to `2025-11-25` and is now supported by every major coding agent. A library that ships its own MCP server gets:

- **Zero hallucination on imports + prop types.** The agent reads our schema, not a stale training snapshot.
- **One-line install in any agent.** `claude mcp add zui -- npx -y @zui.react/mcp` — same command shape works for Cursor, Windsurf, Continue.
- **Discovery surface.** Listed on the official MCP registry → users find ZUI when they search "react ui mcp".
- **Slash commands.** `/zui:add-component Button` becomes a real command in Claude Code without us shipping a CLI.
- **Resource browsing.** `@zui:component-source:Button` pulls live source into the agent's context.

We have ~50 components/patterns/effects/icons. Without an MCP server, agents guess prop names. With it, they get authoritative answers in one tool call.

---

## 2. The four MCP primitives, mapped to ZUI

MCP servers expose four kinds of capabilities. Here's how each one shows up for ZUI:

| Primitive   | What it is                                                  | ZUI uses it for                                           |
| ----------- | ----------------------------------------------------------- | --------------------------------------------------------- |
| **Tools**   | Functions the agent decides to call. Side-effect-capable.   | `add_component`, `scaffold_page`, `search_components`     |
| **Resources** | Read-only, addressable data. The user/agent attaches them as context. | Component source, design tokens, full doc pages         |
| **Prompts** | Reusable instruction templates → become slash commands.     | `/zui:add-component`, `/zui:scaffold-page`                 |
| **Sampling** | Server asks the host to run an LLM completion.             | _(deferred to v2)_ — used by `scaffold_page` to generate variants |

Key decision: **tools for actions and search, resources for browsing.** Listing components is a tool (parameterized search), but reading a component's source is a resource (stable URI, attachable as context).

---

## 3. Tool surface (v1)

13 tools, organised by intent. Every tool is JSON-Schema-validated with a `title`, a one-line `description`, and (where relevant) `outputSchema`.

### 3.1 Discovery

```ts
list_components({ category?, includeNew? })
  // → [{ name, slug, group, description, isNew, tags }]
list_patterns({ group?: 'base'|'ai'|'3d'|'all' })
  // → grouped pattern manifest
list_effects()
  // → effect manifest
list_icons({ kind?: 'social'|'ai'|'ide'|'all' })
  // → icon manifest with import path + size
search({ query, kinds?: ('component'|'pattern'|'effect'|'icon')[], limit? })
  // → unified BM25 search across name + description + tags
```

### 3.2 Read-deep

```ts
get_component({ name, include?: ('props'|'examples'|'a11y'|'css'|'imports')[] })
  // → full record incl. propsTable rows, snippets, a11y notes
get_pattern({ name, include?: ('source'|'demos'|'props'|'subcomponents')[] })
get_effect({ name })
get_design_tokens({ category?, format?: 'css'|'tailwind'|'json' })
get_icon({ name, size?, color? })
```

### 3.3 Action

```ts
add_component({ name, dest?: 'src/components/ui', includeStyles?: true })
  // Side-effect: writes file(s), updates package.json deps, prints diff
add_pattern({ name, dest? })
scaffold_page({
  pageType: 'landing'|'dashboard'|'auth'|'pricing'|'showcase',
  patternRefs?: string[],
  outputPath: string,
  withTheme?: 'light'|'dark'|'auto'
})
  // Side-effect: writes a fully-wired tsx page that imports from '@zui.react/zui'
```

**Action-tool guardrails:**

- All write tools include a `dryRun?: boolean` that returns the planned diff without writing.
- Each writes to the host's filesystem via the agent's existing file-write capability — we **don't** open arbitrary write handles in the MCP server. The server returns `files: [{ path, contents, action: 'create'|'overwrite' }]` and the agent applies the diff. This keeps the server portable across editors and sandbox-friendly.
- `package.json` deps are returned as a structured `dependencies: { ... }` block, not auto-installed.

### 3.4 Tool-call ergonomics

- Every list tool supports `limit` (default 50, max 200) and `cursor` for pagination.
- Errors return structured `content: [{ type: 'text', text }]` with `isError: true` so the agent can recover.
- Long-running tools (`scaffold_page`) emit `progress` notifications.

---

## 4. Resource surface (v1)

URIs are stable across versions so users can paste them in markdown.

### 4.1 Direct (fixed)

```
zui://design-tokens               — application/json
zui://design-tokens.css           — text/css
zui://component-api               — application/json (full TS types)
zui://icons/all                   — application/json (svg + meta)
zui://changelog                   — text/markdown
zui://llms.txt                    — text/plain (the cheat-sheet for agents)
```

### 4.2 Templates (parameterized)

```
zui://components/{name}/source     — application/typescript
zui://components/{name}/css        — text/css
zui://components/{name}/docs       — text/markdown
zui://patterns/{name}/source       — application/typescript
zui://patterns/{name}/docs         — text/markdown
zui://effects/{name}/source        — application/typescript
zui://icons/{name}.svg             — image/svg+xml
```

In Claude Code, users type `@` and start typing `zui:` to autocomplete. The agent reads the resource and inlines it.

`zui://llms.txt` is a deliberately tiny (~2 KB) plaintext digest of the whole library — names, one-line descriptions, import paths. Useful when an agent has a tight context budget.

---

## 5. Prompt surface (v1)

Prompts surface as slash commands. We ship six, all argument-typed:

```
/zui:add-component {component} [dest]
/zui:scaffold-page {pageType} [patternRefs] [theme]
/zui:find-pattern {useCase} [category]
/zui:apply-effect {effect} {targetComponent}
/zui:design-system [category]
/zui:component-deep-dive {component} [focus]
```

Each prompt returns a short multi-message conversation that primes Claude/Cursor with the right tools. Example for `/zui:add-component`:

```jsonc
{
  "name": "add-component",
  "arguments": [
    { "name": "component", "type": "string", "required": true,
      "completions": "/* dynamically populated from list_components */" },
    { "name": "dest", "type": "string", "required": false }
  ],
  "messages": [
    { "role": "user",
      "content": "Add the {{component}} component to my project at {{dest|default 'src/components/ui'}}." },
    { "role": "assistant",
      "content": "I'll fetch the component spec, then write the file. Calling get_component first." }
  ]
}
```

Argument completions are wired to the registry so typing `/zui:add-component But<TAB>` autocompletes to `Button`.

---

## 6. Source of truth & build pipeline

The MCP server is **a build artefact, not a hand-maintained file**.

### 6.1 Single source

Everything we already have:

```
src/components/<Name>/<Name>.tsx         — components
src/patterns/<Name>/<Name>.tsx           — patterns
src/components/effects/<Name>/<Name>.tsx — effects
src/components/icons/brand.tsx           — icons
src/styles/tokens.css                    — design tokens
src/docs/registry.ts                     — sidebar + descriptions + isNew flags
src/docs/pages/**                        — long-form docs + propsTables
```

### 6.2 Build pipeline

A new script `scripts/build-mcp-registry.ts` runs at lib-build time:

```
src/**          ──┐
                  ├── parse via ts-morph    ──── components.json
src/docs/**     ──┘   + extract PropsTable   ──── patterns.json
                       + extract @example     ──── effects.json
src/styles/**   ──── parse design tokens     ──── tokens.json
src/docs/registry.ts ─ read sidebar order    ──── manifest.json
                                              ──── llms.txt (digest)
```

Output goes to `packages/mcp/data/` and ships inside the npm package. The MCP server reads JSON at startup — zero parsing at runtime.

### 6.3 Wiring into the build

```jsonc
// package.json (root)
"scripts": {
  "build:lib": "vite build --config vite.lib.config.ts",
  "build:mcp": "tsx scripts/build-mcp-registry.ts && cd packages/mcp && npm run build",
  "build": "npm run build:lib && npm run build:mcp",
  "prepublishOnly": "npm run build"
}
```

Versioning is **lock-stepped** with the main package: `@zui.react/mcp@0.8.0` ships the registry generated for `@zui.react/zui@0.8.0`. The MCP server's `name` resource includes the matching ZUI version so agents can warn on mismatch.

---

## 7. Repo layout

We turn the repo into a small monorepo (npm workspaces — no need for turbo/pnpm at this size):

```
zui/                              # existing
├── src/                          # main library (unchanged)
├── packages/
│   └── mcp/                      # NEW
│       ├── package.json          # name: "@zui.react/mcp", bin: { zui-mcp: "./dist/cli.js" }
│       ├── src/
│       │   ├── index.ts          # entry → `npx @zui.react/mcp`
│       │   ├── server.ts         # Server class + capability negotiation
│       │   ├── tools/
│       │   │   ├── list.ts       # all list_* tools
│       │   │   ├── get.ts        # all get_* tools
│       │   │   ├── search.ts     # unified search
│       │   │   ├── add.ts        # add_component / add_pattern
│       │   │   └── scaffold.ts   # scaffold_page
│       │   ├── resources/
│       │   │   ├── direct.ts     # fixed-URI resources
│       │   │   └── templates.ts  # template resources
│       │   ├── prompts/
│       │   │   └── index.ts      # 6 prompts + completion handlers
│       │   ├── search/
│       │   │   └── bm25.ts       # tiny in-memory BM25 (~120 LOC)
│       │   └── data/
│       │       ├── components.json   # built artefact
│       │       ├── patterns.json
│       │       ├── effects.json
│       │       ├── icons.json
│       │       ├── tokens.json
│       │       ├── manifest.json
│       │       └── llms.txt
│       ├── tsconfig.json
│       └── README.md             # install + usage
├── scripts/
│   └── build-mcp-registry.ts     # NEW — the build pipeline §6.2
└── package.json                  # workspaces: ["packages/*"]
```

---

## 8. Implementation choices

### 8.1 SDK

`@modelcontextprotocol/sdk` (official TypeScript SDK). It owns capability negotiation, JSON-RPC framing, and notification plumbing. We pin the version and track the spec.

### 8.2 Transport

**Stdio only in v1.** Every editor supports it, no auth complexity, no hosting cost. HTTP variant is §13.

### 8.3 No runtime LLM calls

The server never calls a model. `scaffold_page` is a deterministic template fill in v1 — we ship 5 page templates that compose existing patterns. The `sampling` primitive is reserved for v2 if we add fuzzy generation.

### 8.4 No filesystem writes

The server returns proposed file diffs. The host editor applies them. This is the same model shadcn's MCP follows. Benefits: works in remote editors (Codespaces, Replit), works in sandboxed environments, no permissions dialogs.

### 8.5 Search

A 120-line in-memory BM25 over (name + description + tags) for `search()`. Index is built once at server startup from the static JSON. No fuzzy search dependency, no embeddings, sub-millisecond queries.

### 8.6 Hot-reload during dev

`packages/mcp/scripts/dev.ts` watches `src/` and rebuilds the registry on change, then SIGHUPs the running server. Lets us iterate on tool descriptions without re-publishing.

---

## 9. Distribution

### 9.1 Primary: npm

Published as `@zui.react/mcp`. Users run:

```bash
npx -y @zui.react/mcp
```

The package's `bin` field exposes `zui-mcp` as a binary so editors that want a binary path can use it.

### 9.2 Secondary: official MCP registry

Submit to [`registry.modelcontextprotocol.io`](https://registry.modelcontextprotocol.io) via `mcp-publisher` CLI:

```jsonc
// packages/mcp/server.json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
  "name": "io.github.zui-react/mcp",
  "description": "ZUI React design-system MCP server — components, patterns, effects, icons, scaffolding",
  "repository": { "url": "https://github.com/Syzie123/zui", "source": "github" },
  "version": "0.8.0",
  "packages": [
    {
      "registryType": "npm",
      "identifier": "@zui.react/mcp",
      "version": "0.8.0",
      "transport": { "type": "stdio" }
    }
  ]
}
```

Publish once, then re-`mcp-publisher publish` on every release. The registry surfaces ZUI when users search for "react ui" or "design system".

### 9.3 Tertiary: docs site install card

A `<UseWithClaudeCode />` block on the ZUI docs landing page. Copy-paste install for the four major editors.

---

## 10. Install matrix

The README and docs site spell out install for every major agent. The shape is identical (stdio + npx); only the config file location differs.

| Editor          | Config path                                       | Notes                            |
| --------------- | ------------------------------------------------- | -------------------------------- |
| Claude Code     | `claude mcp add zui -- npx -y @zui.react/mcp`     | One-liner, stores in `~/.claude.json` |
| Cursor          | `~/.cursor/mcp.json`                              | Same JSON shape                  |
| Windsurf        | `~/.codeium/windsurf/mcp_config.json`             | Same JSON shape                  |
| Continue        | `~/.continue/config.yaml` (`mcpServers:`)         | YAML wrapper                     |
| Zed             | Settings → MCP                                    | Stdio supported                  |
| Replit Agent    | Replit MCP marketplace listing                    | Public URL listing               |
| VS Code (Copilot) | `.vscode/mcp.json` (workspace-scoped)            | New in May 2026                  |
| Antigravity     | Project-level `mcp.json` in `.antigravity/`       | New in May 2026                  |

The config JSON is identical across editors that take stdio servers:

```jsonc
{
  "mcpServers": {
    "zui": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@zui.react/mcp"]
    }
  }
}
```

---

## 11. Phased work plan

### Phase 1 — Skeleton + tools (v0.8.0)

1. Add `packages/mcp/` workspace scaffolding.
2. Add `scripts/build-mcp-registry.ts` that reads `src/` and emits the 7 JSON artefacts + llms.txt.
3. Implement the MCP server with capability negotiation (tools + resources + prompts) but only `list_*`, `get_*`, `search` tools wired.
4. Local smoke test with `claude mcp add` against the dev build.
5. Publish `@zui.react/mcp@0.8.0-rc.1` to npm.

### Phase 2 — Action tools (v0.8.0)

6. Implement `add_component`, `add_pattern`, `scaffold_page` (template-filled, no sampling).
7. Add `dryRun` paths.
8. Add `progress` notifications for scaffold.
9. Bump to `@zui.react/mcp@0.8.0`. Lock-step with `@zui.react/zui@0.8.0`.

### Phase 3 — Discovery (v0.8.1)

10. Submit to the official MCP registry.
11. Add `<UseWithClaudeCode />` block to docs landing.
12. Write README install section for the 8 editors in §10.
13. Tweet / announce.

### Phase 4 — HTTP variant (v1.0, optional)

14. Same server, Streamable HTTP transport.
15. Hosted at `https://mcp.zui.dev/mcp`.
16. No auth (free + public). Rate-limit via Cloudflare (1000 req/IP/hour).
17. Useful for browser-based agents (ChatGPT plugins, future Claude.ai web).

---

## 12. Open questions

These need answers before phase 1 lands:

- **Workspace tooling** — npm workspaces is enough, or pull in `pnpm` for nicer hoisting? Recommendation: stay on npm to keep the contributor barrier low.
- **`add_component` strategy** — copy file (shadcn-style) or just import from `@zui.react/zui` (chakra-style)? Recommendation: **import** (faster, smaller, plays well with our published package). Provide a `--copy` flag for users who want forkable source.
- **Docs path resolution** — the server includes pre-rendered prop tables in `get_component`, but should it also surface a link to the live docs page? Recommendation: yes, include a `docsUrl` field on every record (`https://zui.dev/components/button`).
- **Naming on the registry** — `io.github.zui-react/mcp` or `org.npmjs.@zui.react/mcp`? Both are accepted. Recommendation: GitHub-flavoured (lines up with shadcn / radix on the registry).

---

## 13. Out of scope (for v1)

- Sampling-based generation (defer to v2).
- Telemetry / analytics (we'd want opt-in if at all).
- Premium tiers / API keys.
- A web playground for the MCP server.
- Generating non-React output (Vue / Solid wrappers).

---

## 14. Acceptance criteria

We ship v0.8.0 when all of this is true:

- [ ] `npx -y @zui.react/mcp` starts an MCP server in <300 ms cold.
- [ ] `claude mcp add zui -- npx -y @zui.react/mcp` works in Claude Code 1.x without errors.
- [ ] Same install command works in Cursor and Windsurf.
- [ ] `tools/list` returns 13 tools, `resources/list` returns ≥6 direct resources + ≥7 templates, `prompts/list` returns 6 prompts.
- [ ] `get_component name="Button"` returns props, examples, a11y, imports — no hallucinated keys.
- [ ] `scaffold_page pageType="landing"` produces a tsx file that compiles against `@zui.react/zui` with no edits.
- [ ] Build pipeline regenerates the registry on every `npm run build`. No drift.
- [ ] README has copy-paste install for 8 editors (§10).
- [ ] Server listed on the official MCP registry with a working description and link.

---

## Sources

Primary references used to design this plan (May 2026):

- [MCP Spec 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/index.md)
- [MCP Server Concepts](https://modelcontextprotocol.io/docs/learn/server-concepts)
- [MCP Build Server Guide](https://modelcontextprotocol.io/docs/develop/build-server)
- [MCP Registry Quickstart](https://modelcontextprotocol.io/registry/quickstart)
- [Claude Code MCP Setup](https://code.claude.com/docs/en/mcp)
- [shadcn/ui MCP](https://ui.shadcn.com/docs/mcp)
- [Chakra UI MCP](https://chakra-ui.com/docs/get-started/ai/mcp-server)
- [Magic MCP (21st.dev)](https://21st.dev/magic)
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
