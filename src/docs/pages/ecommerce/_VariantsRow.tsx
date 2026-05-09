import type { ReactNode } from 'react';
import type { EcommerceVariant } from '../../../components/ecommerce/variant';

const ALL: EcommerceVariant[] = ['rounded', 'square', 'material', 'brutal'];

interface Props {
  /** Render a single variant. Receives the variant key. */
  render: (v: EcommerceVariant) => ReactNode;
  /** Optional grid override; defaults to 1col stacked, 2col on lg. */
  cols?: '1' | '2' | '4';
}

/**
 * Renders the same component once per visual variant, with a small label
 * for each. Used by ecommerce doc pages to show all 4 styles side-by-side.
 */
export function VariantsRow({ render, cols = '2' }: Props) {
  const grid =
    cols === '1'
      ? 'grid-cols-1'
      : cols === '4'
        ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
        : 'grid-cols-1 lg:grid-cols-2';

  return (
    <div className={`grid w-full gap-6 ${grid}`}>
      {ALL.map((v) => (
        <div key={v} className="flex flex-col gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
            {v}
          </span>
          <div>{render(v)}</div>
        </div>
      ))}
    </div>
  );
}
