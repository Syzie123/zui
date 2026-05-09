import { OrderSummary } from '../../../components/ecommerce/OrderSummary';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';
import { VariantsRow } from './_VariantsRow';

export default function OrderSummaryDoc() {
  return (
    <article>
      <H2>All variants</H2>
      <P>Sub-totals, optional coupon row, total, and a CTA button.</P>
      <PreviewTabs
        preview={
          <VariantsRow
            cols="2"
            render={(v) => (
              <OrderSummary
                variant={v}
                items={[
                  { label: 'Face Toner ×1', value: '$10.99' },
                  { label: 'Aqua Balance Tonic ×1', value: '$12.00' },
                  { label: 'Body Cream ×1', value: '$4.00' },
                ]}
                meta={[
                  { label: 'Subtotal', value: '$26.99', tone: 'muted' },
                  { label: 'Discount', value: '-$3.00', tone: 'success' },
                ]}
                total={{ label: 'Total', value: '$23.99' }}
                couponable
                ctaLabel="Checkout"
              />
            )}
          />
        }
        minHeight="48rem"
        code={`<OrderSummary
  variant="rounded"
  items={[
    { label: 'Face Toner ×1', value: '$10.99' },
    { label: 'Aqua Balance Tonic ×1', value: '$12.00' },
  ]}
  meta={[
    { label: 'Subtotal', value: '$22.99', tone: 'muted' },
    { label: 'Discount', value: '-$3.00', tone: 'success' },
  ]}
  total={{ label: 'Total', value: '$19.99' }}
  couponable
  onApplyCoupon={(code) => verifyCoupon(code)}
  ctaLabel="Checkout"
  onCta={() => proceedToCheckout()}
/>`}
      />

      <H2>Dark variant</H2>
      <P>
        Pass <code>dark</code> for the inverse surface (matches the right-side
        order summary in the screenshot).
      </P>
      <PreviewTabs
        preview={
          <OrderSummary
            variant="rounded"
            dark
            items={[
              { label: 'Face Toner ×1', value: '$10.99' },
              { label: 'Aqua Balance Tonic ×1', value: '$12.00' },
              { label: 'Body Cream ×1', value: '$4.00' },
              { label: 'Hydration Mist ×1', value: '$15.00' },
            ]}
            meta={[
              { label: 'Subtotal', value: '$41.99' },
              { label: 'Discount', value: '-$3.00', tone: 'success' },
            ]}
            total={{ label: 'Total', value: '-$38.99' }}
            couponable
          />
        }
        minHeight="32rem"
        code={`<OrderSummary dark variant="rounded" … />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'variant', type: '"rounded" | "square" | "material" | "brutal"', defaultValue: '"rounded"', description: 'Visual style.' },
          { name: 'dark', type: 'boolean', description: 'Use the inverse surface.' },
          { name: 'items', type: 'OrderLine[]', description: 'Top-list of products.' },
          { name: 'meta', type: 'OrderLine[]', description: 'Subtotal, tax, shipping rows.' },
          { name: 'total', type: '{ label: string; value: string }', required: true, description: 'Bottom total row.' },
          { name: 'couponable', type: 'boolean', description: 'Show the coupon input.' },
          { name: 'onApplyCoupon', type: '(code: string) => void', description: 'Coupon submit handler.' },
          { name: 'ctaLabel', type: 'string', description: 'Checkout button label (hidden if absent).' },
          { name: 'onCta', type: '() => void', description: 'Checkout button handler.' },
        ]}
      />
    </article>
  );
}
