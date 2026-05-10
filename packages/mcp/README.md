# @zui.react/mcp

MCP server for [ZUI](https://github.com/Syzie123/zui) — exposes the design system to AI coding agents (Claude Code, Cursor, Windsurf, Continue, Zed, Replit Agent, GitHub Copilot, Antigravity).

```bash
npx -y @zui.react/mcp
```

The catalog (27 components, 26 patterns, 7 effects, 26 brand & IDE icons, 3 themes worth of design tokens) is generated at build time from the `@zui.react/zui` source and shipped inside this package as JSON. Cold start is sub-300 ms; no model calls, no network.

---

## Install

### Claude Code

```bash
claude mcp add zui -- npx -y @zui.react/mcp
```

### Cursor

`~/.cursor/mcp.json`:

```json
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

### Windsurf

`~/.codeium/windsurf/mcp_config.json` — same JSON as Cursor.

### Continue

`~/.continue/config.yaml`:

```yaml
mcpServers:
  zui:
    command: npx
    args: ["-y", "@zui.react/mcp"]
```

### Zed

Settings → MCP → add stdio server with command `npx -y @zui.react/mcp`.

### Replit Agent

Replit MCP marketplace listing (one click).

### VS Code (Copilot)

Project-scoped `.vscode/mcp.json`:

```json
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

### Antigravity

Project-level `.antigravity/mcp.json` — same JSON as VS Code.

---

## What it exposes

### 14 tools

- **Discovery** — `list_components`, `list_patterns`, `list_effects`, `list_icons`, `list_groups`, `search` (BM25)
- **Read** — `get_component`, `get_pattern`, `get_effect`, `get_icon`, `get_design_tokens`
- **Action** — `add_component`, `add_pattern`, `scaffold_page`

Action tools return a **file diff plan** — the host editor applies it. The server never touches your filesystem.

### 6 direct + 6 template resources

Direct (always available):

- `zui://manifest`
- `zui://design-tokens` · `zui://design-tokens.css`
- `zui://component-api`
- `zui://icons/all`
- `zui://llms.txt` (~2 KB plaintext digest)

Templates (parameterized):

- `zui://components/{name}/source` · `zui://components/{name}/css`
- `zui://patterns/{name}/source`   · `zui://patterns/{name}/css`
- `zui://effects/{name}/source`
- `zui://icons/{name}.svg`

In Claude Code, type `@` and start typing `zui:` to autocomplete.

### 6 prompts (slash commands)

- `/zui:add-component {component} [dest]`
- `/zui:scaffold-page {pageType} {outputPath} [theme]`
- `/zui:find-pattern {useCase} [category]`
- `/zui:apply-effect {effect} {targetComponent}`
- `/zui:design-system [category] [theme]`
- `/zui:component-deep-dive {component} [focus]`

---

## Try it

After installing, ask the agent:

> Add a Button component to my project at `src/components/zui-demos`.

> Scaffold a pricing page using ZUI patterns at `src/app/pricing/page.tsx` in dark theme.

> What's the best ZUI pattern for an AI chat composer?

> Show me the ZUI design tokens for dark theme.

> Apply the BorderBeam effect to my Hero card.

---

## Versioning

`@zui.react/mcp@x.y.z` ships the registry generated for `@zui.react/zui@x.y.z`. The major-minor versions stay in lock-step so the server's catalog never drifts from the published library.

## License

MIT — same as `@zui.react/zui`.
