<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Syzie123/zui/main/public/logo/dark.svg">
    <img src="https://raw.githubusercontent.com/Syzie123/zui/main/public/logo/light.svg" width="120" alt="ZUI" />
  </picture>
</p>

<h1 align="center">@zui.react/zui</h1>

<p align="center">
  A modern React component library focused on speed, polish, and motion.<br/>
  <strong>32 components · 7 motion effects · 5 production patterns · 4 visual variants</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@zui.react/zui"><img src="https://img.shields.io/npm/v/@zui.react/zui?color=000&label=npm" alt="npm"></a>
  <img src="https://img.shields.io/badge/license-MIT-000" alt="license">
  <img src="https://img.shields.io/badge/bundle-23kb%20gzipped-000" alt="bundle size">
  <img src="https://img.shields.io/badge/css-17kb%20gzipped-000" alt="css size">
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
        <Card.Description>You're shipping with zuilib.</Card.Description>
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
<html class="theme-clean">    <!-- default -->
<html class="theme-dark">     <!-- pure-black surfaces -->
<html class="theme-luminous"> <!-- branded marketing -->
```

Theme switching is a single class swap — no React re-renders, no FOUC.

## What's inside

### Components (22)
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

### Production patterns (5)
- **FilterPanel** — multi-step filter card
- **ViewingOptionsCard** — segmented + toggle list
- **ProjectDetailCard** — property list + tabs + activity
- **SharePanelCard** — recipients with permission pickers
- **FeatureListCard** — icon list + article cards

## Architecture

- **Tokens are the API.** Every color, space, radius, and duration is a CSS variable. Theming is one class swap.
- **Behavior on Radix.** Focus traps, keyboard nav, and ARIA inherit from `@radix-ui/react-*` — we don't reinvent a11y.
- **Motion is data-state driven.** `data-state="open|closed"` on every overlay; CSS animates from there. No JS animation library.
- **Performance first.** Animations only target `transform` + `opacity`. `will-change` is scoped to elements about to move, never global.
- **Composition over configuration.** Compound APIs (`<Dialog.Trigger>`, `<Sidebar.Menu>`) over giant prop bags.

## Sidebar

Collapsible offcanvas sidebar with `⌘B` toggle, cookie persistence, mobile sheet, and the full shadcn-style API:

```tsx
import { Sidebar } from '@zui.react/zui';

function Layout() {
  return (
    <Sidebar.Provider defaultOpen>
      <Sidebar collapsible="offcanvas">
        <Sidebar.Header>…</Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Components</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton tooltip="Button" isActive>
                  Button
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Rail />
      </Sidebar>

      <Sidebar.Inset>
        <main>{/* page content */}</main>
      </Sidebar.Inset>
    </Sidebar.Provider>
  );
}
```

## Stack

- React 18+ peer dep
- Tailwind CSS v4 utilities (bundled — no setup needed)
- Radix UI primitives
- Floating UI (positioning)
- Lucide icons (peer dep, already used everywhere)
- class-variance-authority (variant API)

## Bundle

- `dist-lib/index.js` — 123 KB, 23 KB gzipped
- `dist-lib/styles.css` — 110 KB, 17 KB gzipped (everything: tokens + utilities + keyframes + component CSS)
- Single `index.d.ts` entry, full TypeScript autocomplete

## License

MIT
