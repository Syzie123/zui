/**
 * Shared visual variants for the ecommerce kit.
 *  - rounded:  default ZUI tokens, soft shadows, fluid radii
 *  - square:   sharp corners (radius: 0), keeps rounded's softness otherwise
 *  - material: Material UI vibe — elevated, layered shadows, medium radii
 *  - brutal:   Neo-brutalism — 2px black border, hard offset shadow, bold colors
 */
export type EcommerceVariant = 'rounded' | 'square' | 'material' | 'brutal';

/** Per-variant SHELL classes (border + radius + shadow + bg). */
export const shellByVariant: Record<EcommerceVariant, string> = {
  rounded:
    'rounded-[var(--radius-2xl)] border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-sm)]',
  square:
    'rounded-none border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-xs)]',
  material:
    'rounded-[12px] bg-[var(--color-bg-elevated)] shadow-[0_1px_3px_rgb(0_0_0/0.12),0_1px_2px_rgb(0_0_0/0.06)]',
  brutal:
    'rounded-none border-[2.5px] border-[var(--color-fg-base)] bg-[var(--color-bg-elevated)] shadow-[4px_4px_0_0_var(--color-fg-base)]',
};

/** Per-variant BUTTON look used by CTAs inside ecommerce components. */
export const ctaByVariant: Record<EcommerceVariant, string> = {
  rounded:
    'rounded-[var(--radius-lg)] bg-[var(--color-fg-base)] text-[var(--color-bg-base)] hover:bg-[color-mix(in_oklch,var(--color-fg-base)_88%,var(--color-bg-base))]',
  square:
    'rounded-none bg-[var(--color-fg-base)] text-[var(--color-bg-base)] hover:bg-[color-mix(in_oklch,var(--color-fg-base)_88%,var(--color-bg-base))]',
  material:
    'rounded-[8px] bg-[oklch(54%_0.22_265)] text-white hover:bg-[oklch(50%_0.22_265)] shadow-[0_1px_3px_rgb(0_0_0/0.20)]',
  brutal:
    'rounded-none bg-[oklch(86%_0.18_140)] text-[oklch(12%_0_0)] border-[2.5px] border-[oklch(12%_0_0)] shadow-[3px_3px_0_0_oklch(12%_0_0)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_oklch(12%_0_0)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none',
};

/** Per-variant inner radius (for image, input, sub-card). */
export const innerRadiusByVariant: Record<EcommerceVariant, string> = {
  rounded:  'rounded-[var(--radius-xl)]',
  square:   'rounded-none',
  material: 'rounded-[8px]',
  brutal:   'rounded-none border-[2px] border-[var(--color-fg-base)]',
};

/** Per-variant input class shared by promo / card-number / etc. */
export const inputByVariant: Record<EcommerceVariant, string> = {
  rounded:
    'rounded-[var(--radius-lg)] border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)]',
  square:
    'rounded-none border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)]',
  material:
    'rounded-[6px] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)]',
  brutal:
    'rounded-none border-[2.5px] border-[var(--color-fg-base)] bg-[var(--color-bg-elevated)]',
};
