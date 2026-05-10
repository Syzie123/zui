<p align="center">
  <img src="https://raw.githubusercontent.com/Syzie123/zui/main/public/logo/dark.svg" width="140" alt="ZUI" />
</p>

<h1 align="center">@zui.react/zui</h1>

<p align="center">
  A modern React component library focused on speed, polish, and motion.<br/>
  <strong>27 components · 6 motion effects · 26 production patterns · 26 brand &amp; AI-IDE icons</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@zui.react/zui"><img src="https://img.shields.io/npm/v/@zui.react/zui?color=7c3aed&label=npm" alt="npm"></a>
  <a href="https://www.npmjs.com/package/@zui.react/mcp"><img src="https://img.shields.io/npm/v/@zui.react/mcp?color=7c3aed&label=mcp" alt="mcp"></a>
  <img src="https://img.shields.io/badge/license-MIT-7c3aed" alt="license">
  <img src="https://img.shields.io/badge/bundle-52kb%20gzipped-7c3aed" alt="bundle size">
  <img src="https://img.shields.io/badge/css-34kb%20gzipped-7c3aed" alt="css size">
</p>

```bash
npm install @zui.react/zui
```

## Quick start

```tsx
import '@zui.react/zui/styles.css';
import { Button, Dialog, Card, Marquee, BorderBeam } from '@zui.react/zui';

export default function App() {
  return (
    <Card variant="elevated">
      <Card.Header>
        <Card.Title>Hello, world.</Card.Title>
        <Card.Description>You're shipping with ZUI.</Card.Description>
      </Card.Header>
      <Card.Footer>
        <Button>Get started</Button>
      </Card.Footer>
    </Card>
  );
}
```

Add a theme class to your `<html>`:

```html
<html class="theme-dark">     <!-- premium purple gradient surface (default) -->
<html class="theme-clean">    <!-- light surface -->
<html class="theme-luminous"> <!-- branded marketing -->
```

Theme switching is a single class swap — no React re-renders, no FOUC.

## Use with any AI coding agent

`@zui.react/mcp` is a drop-in [MCP server](https://modelcontextprotocol.io) that exposes the whole ZUI catalog to Claude Code, Cursor, Windsurf, Continue, Zed, GitHub Copilot, and Antigravity.

```bash
# Claude Code
claude mcp add zui -- npx -y @zui.react/mcp
```

Then ask the agent: _"Add a Button"_, _"scaffold a pricing page in dark theme"_, _"show me the design tokens"_. The server returns a file diff your editor applies — no hallucinated prop names, no stale import paths.

14 tools, 12 resources, 6 slash commands. Full reference: [zui docs → MCP](https://github.com/Syzie123/zui/tree/main/packages/mcp).

## What's inside

### Components (27)

**Foundations** — Button · Input · Label · Textarea · Separator · Skeleton · Badge · Avatar
**Overlays** — Popover · Tooltip · DropdownMenu · HoverCard
**Modals** — Dialog · AlertDialog · Sheet · Toast
**Forms** — Checkbox · RadioGroup · Switch · Select · SegmentedControl
**Composition** — Card · Tabs · Accordion · Progress · Slider · Sidebar

### Motion effects (6)

- **Marquee** — endless scroll, GPU-only `transform`
- **BorderBeam** — single moving point along a border
- **ShineBorder** — conic-gradient shimmer
- **NumberTicker** — counts up on view via `IntersectionObserver`
- **MagicCard** — cursor-following spotlight
- **Dock** — macOS-style cursor magnification

### Production patterns (26)

- **Base (5)** — FilterPanel · ViewingOptionsCard · ProjectDetailCard · SharePanelCard · SignInCard · LoginSplit
- **AI-native (7)** — AIPrompt · AIDropzone · AIRecorder · AIGreeting · AIMessage · AIGenerating
- **3D / scene (12)** — Action3D · Switch3D · ImageCard3D · PlanCard3D · MenuList3D · JobCardStack · TrackDelivery · TravelCard · InstallCard · PricingDark · StatsCard · TalentGrid

### Brand &amp; AI-IDE icons (26)

Inline SVGs — Google · Apple · Microsoft · Facebook · X · Github · OpenAI · Anthropic · Zoom · Slack · Framer · Loom · Hopin · Notion · Figma · Cursor · Gemini · Claude · Windsurf · Copilot · Antigravity · Replit · V0 · Bolt · Perplexity · Grok.

## Architecture

- **Tokens are the API.** Every color, space, radius, and duration is a CSS variable. Theming is one class swap.
- **Behavior on Radix.** Focus traps, keyboard nav, and ARIA inherit from `@radix-ui/react-*` — we don't reinvent a11y.
- **Motion is data-state driven.** `data-state="open|closed"` on every overlay; CSS animates from there. No JS animation library.
- **Performance first.** Animations only target `transform` + `opacity`. `will-change` is scoped to elements about to move, never global.
- **Composition over configuration.** Compound APIs (`<Dialog.Trigger>`, `<Sidebar.Menu>`, `<Card.Header>`) over giant prop bags.

## Stack

- React 18+ peer dep
- Tailwind CSS v4 utilities (bundled — no setup needed)
- Radix UI primitives
- Floating UI (positioning)
- Lucide icons (peer dep, already used everywhere)
- class-variance-authority (variant API)

## Bundle

- `dist-lib/index.js` — 272 KB, **52 KB gzipped**
- `dist-lib/styles.css` — 226 KB, **34 KB gzipped** (tokens + utilities + keyframes + component CSS, all in)
- Single `index.d.ts` entry, full TypeScript autocomplete

## License

MIT — same for `@zui.react/zui` and `@zui.react/mcp`.
