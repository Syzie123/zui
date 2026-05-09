import { CreditCardForm } from '../../../components/ecommerce/CreditCardForm';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';
import { VariantsRow } from './_VariantsRow';

export default function CreditCardFormDoc() {
  return (
    <article>
      <H2>All variants</H2>
      <P>
        Auto-formats the card number (groups of 4) and expiry (MM/YY) as the
        user types. Submit handler receives the four fields.
      </P>
      <PreviewTabs
        preview={
          <VariantsRow
            cols="2"
            render={(v) => (
              <CreditCardForm
                variant={v}
                title="Payment Method"
                submitLabel="Pay $10.99"
              />
            )}
          />
        }
        minHeight="48rem"
        code={`<CreditCardForm
  variant="rounded"
  title="Payment Method"
  submitLabel="Pay $10.99"
  onSubmit={({ name, number, expiry, cvc }) => chargeCard({ name, number, expiry, cvc })}
/>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'variant', type: '"rounded" | "square" | "material" | "brutal"', defaultValue: '"rounded"', description: 'Visual style.' },
          { name: 'title', type: 'string', defaultValue: '"Payment Method"', description: 'Heading.' },
          { name: 'submitLabel', type: 'string', defaultValue: '"Pay"', description: 'Submit button label.' },
          {
            name: 'onSubmit',
            type: '(values: { name; number; expiry; cvc }) => void',
            description: 'Form submission handler.',
          },
        ]}
      />
    </article>
  );
}
