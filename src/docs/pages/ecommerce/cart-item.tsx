import { CartItem } from '../../../components/ecommerce/CartItem';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';
import { VariantsRow } from './_VariantsRow';

const IMG = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&q=80';

export default function CartItemDoc() {
  return (
    <article>
      <H2>All variants</H2>
      <P>
        Image + title + subtitle + qty stepper + price. The qty stepper inherits
        the same variant.
      </P>
      <PreviewTabs
        preview={
          <VariantsRow
            cols="1"
            render={(v) => (
              <CartItem
                variant={v}
                image={IMG}
                title="N°32 Original Hydrating Self-Tanning Cream"
                subtitle="200ML · 6.8 FL OZ"
                price="199"
                quantity={1}
                onRemove={() => {}}
              />
            )}
          />
        }
        minHeight="32rem"
        code={`<CartItem
  variant="rounded"
  image="https://…"
  title="N°32 Original Hydrating Self-Tanning Cream"
  subtitle="200ML · 6.8 FL OZ"
  price="199"
  quantity={1}
  onQuantityChange={(n) => updateQty(item.id, n)}
  onRemove={() => removeFromCart(item.id)}
/>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'variant', type: '"rounded" | "square" | "material" | "brutal"', defaultValue: '"rounded"', description: 'Visual style.' },
          { name: 'image', type: 'string | ReactNode', required: true, description: 'Thumbnail.' },
          { name: 'title', type: 'string', required: true, description: 'Product name.' },
          { name: 'subtitle', type: 'string', description: 'Variant / size line.' },
          { name: 'price', type: 'string', required: true, description: 'Current price.' },
          { name: 'originalPrice', type: 'string', description: 'Strikethrough original.' },
          { name: 'quantity', type: 'number', defaultValue: '1', description: 'Current qty.' },
          { name: 'onQuantityChange', type: '(n: number) => void', description: 'Fires when stepper changes.' },
          { name: 'onRemove', type: '() => void', description: 'Trash button click.' },
        ]}
      />
    </article>
  );
}
