/**
 * Single source of truth for the docs site:
 *  - sidebar order & grouping
 *  - search index
 *  - prev/next navigation between pages
 *  - live counts shown in marketing copy (hero, intro, MCP docs)
 *
 * Pages are referenced by `slug` and the actual content lives in
 * src/docs/pages/<slug>.tsx — loaded lazily via the `loader`.
 */
import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import * as brandIcons from '../components/icons/brand';

export interface DocPage {
  slug: string;
  title: string;
  description: string;
  isNew?: boolean;
  /** Lazy loader for the page component. */
  loader: () => Promise<{ default: ComponentType }>;
}

export interface DocGroup {
  name: string;
  pages: DocPage[];
}

export const DOCS: DocGroup[] = [
  {
    name: 'Getting started',
    pages: [
      {
        slug: 'introduction',
        title: 'Introduction',
        description: 'A modern React component library focused on speed, polish, and motion.',
        loader: () => import('./pages/introduction'),
      },
      {
        slug: 'installation',
        title: 'Installation',
        description: 'How to add ZUI to your project.',
        loader: () => import('./pages/installation'),
      },
      {
        slug: 'theming',
        title: 'Theming',
        description: 'Three themes share one token system. Switch via class on <html>.',
        loader: () => import('./pages/theming'),
      },
    ],
  },
  {
    name: 'MCP',
    pages: [
      {
        slug: 'mcp-introduction',
        title: 'Introduction',
        description: 'What @zui.react/mcp is and why every coding agent gets the catalog right with it.',
        isNew: true,
        loader: () => import('./pages/mcp/introduction'),
      },
      {
        slug: 'mcp-installation',
        title: 'Installation',
        description: 'One-line install for Claude Code, Cursor, Windsurf, Continue, Zed, Replit, VS Code Copilot, Antigravity.',
        isNew: true,
        loader: () => import('./pages/mcp/installation'),
      },
      {
        slug: 'mcp-reference',
        title: 'Reference',
        description: '14 tools, 12 resources, 6 prompts — full schema and examples.',
        isNew: true,
        loader: () => import('./pages/mcp/reference'),
      },
    ],
  },
  {
    name: 'Components',
    pages: [
      {
        slug: 'button',
        title: 'Button',
        description: 'Interactive button with 9 variants, 4 sizes, loading state, and asChild.',
        loader: () => import('./pages/button'),
      },
      {
        slug: 'input',
        title: 'Input',
        description: 'Text input with prefix, suffix, validation, and three sizes.',
        loader: () => import('./pages/input'),
      },
      {
        slug: 'card',
        title: 'Card',
        description: 'Content container with 9 variants — flat, elevated, glow, glass, featured.',
        loader: () => import('./pages/card'),
      },
      {
        slug: 'dialog',
        title: 'Dialog',
        description: 'Modal layer with focus trap, scroll lock, and animated overlay.',
        loader: () => import('./pages/dialog'),
      },
      {
        slug: 'toast',
        title: 'Toast',
        description: 'Notifications with queue management, swipe-to-dismiss, and auto-dismiss.',
        loader: () => import('./pages/toast'),
      },
      {
        slug: 'tabs',
        title: 'Tabs',
        description: 'Tabbed navigation with animated underline indicator.',
        loader: () => import('./pages/tabs'),
      },
      {
        slug: 'accordion',
        title: 'Accordion',
        description: 'Collapsible content sections with smooth height animation.',
        loader: () => import('./pages/accordion'),
      },
      {
        slug: 'select',
        title: 'Select',
        description: 'Dropdown selector with keyboard nav, type-ahead, and groups.',
        loader: () => import('./pages/select'),
      },
      {
        slug: 'switch',
        title: 'Switch',
        description: 'Animated toggle with 3 sizes and 4 color tones.',
        loader: () => import('./pages/switch'),
      },
      {
        slug: 'badge',
        title: 'Badge',
        description: 'Status pill with 8 semantic tones and 3 shapes.',
        loader: () => import('./pages/badge'),
      },
      {
        slug: 'avatar',
        title: 'Avatar',
        description: 'User avatar with image, fallback initials, and status indicator.',
        loader: () => import('./pages/avatar'),
      },
      {
        slug: 'segmented-control',
        title: 'Segmented Control',
        description: 'Pill-shaped segmented selector for view-mode / scope toggles.',
        isNew: true,
        loader: () => import('./pages/segmented-control'),
      },
    ],
  },
  {
    name: 'Effects',
    pages: [
      {
        slug: 'marquee',
        title: 'Marquee',
        description: 'Endless scrolling row of items. Pure CSS, GPU-only.',
        isNew: true,
        loader: () => import('./pages/effects/marquee'),
      },
      {
        slug: 'border-beam',
        title: 'Border Beam',
        description: 'Animated light that travels along an element border.',
        isNew: true,
        loader: () => import('./pages/effects/border-beam'),
      },
      {
        slug: 'shine-border',
        title: 'Shine Border',
        description: 'Conic-gradient border that rotates around the card.',
        isNew: true,
        loader: () => import('./pages/effects/shine-border'),
      },
      {
        slug: 'number-ticker',
        title: 'Number Ticker',
        description: 'Smoothly counts up to a target value when in view.',
        isNew: true,
        loader: () => import('./pages/effects/number-ticker'),
      },
      {
        slug: 'magic-card',
        title: 'Magic Card',
        description: 'Card with a soft spotlight that follows the cursor.',
        isNew: true,
        loader: () => import('./pages/effects/magic-card'),
      },
      {
        slug: 'dock',
        title: 'Dock',
        description: 'macOS-style dock with cursor-aware magnification.',
        isNew: true,
        loader: () => import('./pages/effects/dock'),
      },
    ],
  },
  {
    name: 'Patterns',
    pages: [
      {
        slug: 'filter-panel',
        title: 'Filter Panel',
        description: 'Multi-step filter card with sub-panels, search, and chips.',
        loader: () => import('./pages/patterns/filter-panel'),
      },
      {
        slug: 'project-detail',
        title: 'Project Detail',
        description: 'Property list + activity feed sheet for project records.',
        loader: () => import('./pages/patterns/project-detail'),
      },
      {
        slug: 'share-panel',
        title: 'Share Panel',
        description: 'Recipient list with permission pickers and link sharing.',
        loader: () => import('./pages/patterns/share-panel'),
      },
      {
        slug: 'sign-in-card',
        title: 'Sign In Card',
        description: 'Stacked sign-in modal with social providers + email + SSO.',
        isNew: true,
        loader: () => import('./pages/patterns/sign-in-card'),
      },
      {
        slug: 'login-split',
        title: 'Login Split',
        description: 'Side-by-side login layout — clean and glassmorphism variants.',
        isNew: true,
        loader: () => import('./pages/patterns/login-split'),
      },
    ],
  },
  {
    name: 'AI',
    pages: [
      {
        slug: 'ai-prompt',
        title: 'AI Prompt',
        description: 'Multi-mode AI composer — compose, follow-up, model picker, tools.',
        isNew: true,
        loader: () => import('./pages/patterns/ai-prompt'),
      },
      {
        slug: 'ai-dropzone',
        title: 'AI Dropzone',
        description: 'Dashed-border drop area with quick actions and a file preview.',
        isNew: true,
        loader: () => import('./pages/patterns/ai-dropzone'),
      },
      {
        slug: 'ai-recorder',
        title: 'AI Recorder',
        description: 'Voice-note pill — cancel, blinking dot, timer, pause, confirm.',
        isNew: true,
        loader: () => import('./pages/patterns/ai-recorder'),
      },
      {
        slug: 'ai-greeting',
        title: 'AI Greeting',
        description: 'Hub greeting with orb, suggested cards, and quick action pills.',
        isNew: true,
        loader: () => import('./pages/patterns/ai-greeting'),
      },
      {
        slug: 'ai-message',
        title: 'AI Message',
        description: 'Chat bubble for user / assistant / system with reactions.',
        isNew: true,
        loader: () => import('./pages/patterns/ai-message'),
      },
      {
        slug: 'ai-generating',
        title: 'AI Generating',
        description: 'Streaming card with shader-style header, caret, and action chips.',
        isNew: true,
        loader: () => import('./pages/patterns/ai-generating'),
      },
      // ContentGenerator (`./pages/patterns/content-generator`) is intentionally
      // hidden from the sidebar/search. The component still exports from the
      // package barrel — only the docs entry is omitted while we polish it.
    ],
  },
  {
    name: '3D',
    pages: [
      {
        slug: 'action-3d',
        title: 'Action 3D',
        description: 'Raised neumorphic CTA pill with icon and chevron wells.',
        isNew: true,
        loader: () => import('./pages/patterns/action-3d'),
      },
      {
        slug: 'switch-3d',
        title: 'Switch 3D',
        description: 'Recessed track + raised pill thumb. ON/OFF labels.',
        isNew: true,
        loader: () => import('./pages/patterns/switch-3d'),
      },
      {
        slug: 'image-card-3d',
        title: 'Image Card 3D',
        description: 'Image with a floating glassy tag in the corner.',
        isNew: true,
        loader: () => import('./pages/patterns/image-card-3d'),
      },
      {
        slug: 'plan-card-3d',
        title: 'Plan Card 3D',
        description: 'Pricing card with 5 tones, badge, features, and a raised CTA.',
        isNew: true,
        loader: () => import('./pages/patterns/plan-card-3d'),
      },
      {
        slug: 'menu-list-3d',
        title: 'Menu List 3D',
        description: 'Profile menu with avatar, progress bar, and inset rows.',
        isNew: true,
        loader: () => import('./pages/patterns/menu-list-3d'),
      },
      {
        slug: 'job-card-stack',
        title: 'Job Card Stack',
        description: 'Tilted pile of pastel job cards with brand logos and tags.',
        isNew: true,
        loader: () => import('./pages/patterns/job-card-stack'),
      },
      {
        slug: 'track-delivery',
        title: 'Track Delivery',
        description: 'Status card with an isometric box-on-conveyor SVG illustration.',
        isNew: true,
        loader: () => import('./pages/patterns/track-delivery'),
      },
      {
        slug: 'travel-card',
        title: 'Travel Card',
        description: 'Phone-aspect image card with location, fare and search CTA.',
        isNew: true,
        loader: () => import('./pages/patterns/travel-card'),
      },
      {
        slug: 'install-card',
        title: 'Install Card',
        description: 'Product card with isometric shapes illustration and install count.',
        isNew: true,
        loader: () => import('./pages/patterns/install-card'),
      },
      {
        slug: 'pricing-dark',
        title: 'Pricing Dark',
        description: 'Dark glassy pricing tier with abstract scribble illustration.',
        isNew: true,
        loader: () => import('./pages/patterns/pricing-dark'),
      },
      {
        slug: 'stats-card',
        title: 'Stats Card',
        description: 'Dark sales card with breakdown rows and a sparkline chart.',
        isNew: true,
        loader: () => import('./pages/patterns/stats-card'),
      },
      {
        slug: 'talent-grid',
        title: 'Talent Grid',
        description: 'Tilted grid of talent cards with avatar, role badge and skills.',
        isNew: true,
        loader: () => import('./pages/patterns/talent-grid'),
      },
    ],
  },
  {
    name: 'Ecommerce',
    pages: [
      {
        slug: 'product-card',
        title: 'Product Card',
        description: 'Product tile with image, badge, tags, price, and add-to-cart.',
        loader: () => import('./pages/ecommerce/product-card'),
      },
      {
        slug: 'cart-item',
        title: 'Cart Item',
        description: 'Single line in a shopping cart — image, qty stepper, price, remove.',
        loader: () => import('./pages/ecommerce/cart-item'),
      },
      {
        slug: 'order-summary',
        title: 'Order Summary',
        description: 'Sub-totals, coupon, total, and checkout CTA. Includes a dark variant.',
        loader: () => import('./pages/ecommerce/order-summary'),
      },
      {
        slug: 'payment-method-picker',
        title: 'Payment Method Picker',
        description: 'Radio-card list of payment methods (cards, wallets, BNPL).',
        loader: () => import('./pages/ecommerce/payment-method-picker'),
      },
      {
        slug: 'credit-card-form',
        title: 'Credit Card Form',
        description: 'Name, number, expiry, CVC with auto-formatting.',
        loader: () => import('./pages/ecommerce/credit-card-form'),
      },
      {
        slug: 'shipping-option',
        title: 'Shipping Option',
        description: 'Carrier-aware delivery picker with ETA and badges.',
        loader: () => import('./pages/ecommerce/shipping-option'),
      },
      {
        slug: 'checkout-stepper',
        title: 'Checkout Stepper',
        description: 'Progress indicator across cart → payment → review.',
        loader: () => import('./pages/ecommerce/checkout-stepper'),
      },
      {
        slug: 'promo-code',
        title: 'Promo Code',
        description: 'Inline coupon input with apply state.',
        loader: () => import('./pages/ecommerce/promo-code'),
      },
      {
        slug: 'quantity-stepper',
        title: 'Quantity Stepper',
        description: 'Plus/minus quantity control. Used inside CartItem.',
        loader: () => import('./pages/ecommerce/quantity-stepper'),
      },
      {
        slug: 'price-tag',
        title: 'Price Tag',
        description: 'Price text with optional strikethrough original.',
        loader: () => import('./pages/ecommerce/price-tag'),
      },
    ],
  },
];

/* ────────────────────────────────────────────────────────────
 * Live counts — single source of truth for marketing copy.
 * Every place on the docs site that says "27 components" or
 * "26 patterns" reads from here so adding a new doc page never
 * requires hunting for stale numbers across the codebase.
 * ──────────────────────────────────────────────────────────── */

function groupSize(name: string): number {
  return DOCS.find((g) => g.name === name)?.pages.length ?? 0;
}

/** All exports from src/components/icons/brand.tsx whose name ends in
 *  `Icon` — gives us a live brand-icon count without a manual list. */
const ICONS_COUNT = Object.keys(brandIcons).filter((k) =>
  k.endsWith('Icon')
).length;

export const COUNTS = {
  /** Documented components in the sidebar's "Components" group. */
  components: groupSize('Components'),

  /** Motion effects (Marquee, BorderBeam, …). */
  effects: groupSize('Effects'),

  /** "Production patterns" umbrella — base + AI + 3D + Ecommerce. */
  patterns:
    groupSize('Patterns') +
    groupSize('AI') +
    groupSize('3D') +
    groupSize('Ecommerce'),

  /** Per-tier breakdown so copy like "5 base, 7 AI, 12 3D" stays accurate. */
  patternsByGroup: {
    base: groupSize('Patterns'),
    ai: groupSize('AI'),
    '3d': groupSize('3D'),
    ecommerce: groupSize('Ecommerce'),
  },

  /** Inline brand & AI-IDE icons exported from ../components/icons/brand. */
  icons: ICONS_COUNT,

  /** Total documented pages (excluding Getting Started + MCP docs). */
  documented:
    groupSize('Components') +
    groupSize('Effects') +
    groupSize('Patterns') +
    groupSize('AI') +
    groupSize('3D') +
    groupSize('Ecommerce'),
} as const;

/* ────────────────────────────────────────────────────────────
 * Lookup helpers
 * ──────────────────────────────────────────────────────────── */

export function findPage(slug: string): DocPage | undefined {
  for (const group of DOCS) {
    const page = group.pages.find((p) => p.slug === slug);
    if (page) return page;
  }
  return undefined;
}

/** Returns the name of the group that owns this slug, or undefined. */
export function groupOf(slug: string): string | undefined {
  for (const group of DOCS) {
    if (group.pages.some((p) => p.slug === slug)) return group.name;
  }
  return undefined;
}

export function flatPages(): DocPage[] {
  return DOCS.flatMap((g) => g.pages);
}

export function neighbors(slug: string): {
  prev?: DocPage;
  next?: DocPage;
} {
  const all = flatPages();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? all[idx - 1] : undefined,
    next: idx < all.length - 1 ? all[idx + 1] : undefined,
  };
}

const cache = new Map<string, LazyExoticComponent<ComponentType>>();
export function lazyPage(page: DocPage) {
  let el = cache.get(page.slug);
  if (!el) {
    el = lazy(() => withChunkRetry(page.loader));
    cache.set(page.slug, el);
  }
  return el;
}

/**
 * Wraps a dynamic `import()` so that a stale-chunk 404 (typical after a
 * fresh production deploy lands while a tab is still open) triggers a
 * one-shot reload instead of crashing the route. Browsers throw a
 * `TypeError: Failed to fetch dynamically imported module` in that case;
 * we use a sessionStorage flag so we never loop on a real network failure.
 */
async function withChunkRetry<T>(loader: () => Promise<T>): Promise<T> {
  try {
    return await loader();
  } catch (err) {
    const isFetchError =
      err instanceof TypeError &&
      /dynamically imported module|Failed to fetch/i.test(err.message);
    const alreadyTried = sessionStorage.getItem('zui:chunk-retry') === '1';
    if (isFetchError && !alreadyTried) {
      sessionStorage.setItem('zui:chunk-retry', '1');
      window.location.reload();
      // Block this promise — the page is reloading.
      return new Promise<T>(() => {});
    }
    throw err;
  }
}

// Once the page renders successfully, the retry flag is no longer needed.
// Clearing it after a short delay lets a future deploy retrigger the auto-
// reload without forcing the user into a bad-state cycle.
if (typeof window !== 'undefined') {
  window.setTimeout(() => sessionStorage.removeItem('zui:chunk-retry'), 5000);
}
