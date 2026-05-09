import { ProductCard } from '../../../components/ecommerce/ProductCard';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';
import { VariantsRow } from './_VariantsRow';

const SAMPLE_IMG =
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80';

export default function ProductCardDoc() {
  return (
    <article>
      <H2>All four variants</H2>
      <P>
        Same component, four visual languages. Switch via the <code>variant</code>{' '}
        prop. <code>brutal</code> presses into its drop shadow on hover; the others
        keep their box steady.
      </P>
      <PreviewTabs
        preview={
          <VariantsRow
            cols="2"
            render={(v) => (
              <ProductCard
                variant={v}
                image={SAMPLE_IMG}
                badge={{ label: 'Bestseller', tone: 'success' }}
                title="Face Toner"
                description="Always clean, vegan and cruelty-free."
                tags={['Refreshing', 'Glow-Boost', 'Pure']}
                price="10.99"
                originalPrice="14.99"
              />
            )}
          />
        }
        minHeight="40rem"
        code={`<ProductCard
  variant="rounded"   // 'rounded' | 'square' | 'material' | 'brutal'
  image="https://…"
  badge={{ label: 'Bestseller', tone: 'success' }}
  title="Face Toner"
  description="Always clean, vegan and cruelty-free."
  tags={['Refreshing', 'Glow-Boost', 'Pure']}
  price="10.99"
  originalPrice="14.99"
  onAddToCart={() => addToCart(product)}
  onToggleWishlist={() => toggleWishlist(product)}
/>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          {
            name: 'variant',
            type: '"rounded" | "square" | "material" | "brutal"',
            defaultValue: '"rounded"',
            description: 'Visual style.',
          },
          {
            name: 'image',
            type: 'string | ReactNode',
            required: true,
            description: 'Image URL or any element rendered in the image area.',
          },
          {
            name: 'badge',
            type: '{ label: string; tone?: "accent" | "success" | "warning" }',
            description: 'Top-left pill (e.g. "Bestseller", "New").',
          },
          { name: 'title', type: 'string', required: true, description: 'Product title.' },
          { name: 'description', type: 'string', description: 'Optional sub-line.' },
          {
            name: 'tags',
            type: 'string[]',
            description: 'Soft chips below the title.',
          },
          { name: 'price', type: 'string', required: true, description: 'Current price.' },
          {
            name: 'originalPrice',
            type: 'string',
            description: 'Strikethrough original (indicates a sale).',
          },
          { name: 'prefix', type: 'string', defaultValue: '"$"', description: 'Currency.' },
          { name: 'ctaLabel', type: 'string', defaultValue: '"Add to cart"', description: 'CTA label.' },
          { name: 'onAddToCart', type: '() => void', description: 'CTA handler.' },
          { name: 'onToggleWishlist', type: '() => void', description: 'Heart toggle handler.' },
          { name: 'wishlisted', type: 'boolean', description: 'Whether the heart is filled.' },
        ]}
      />
    </article>
  );
}
