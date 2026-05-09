import { CreditCard, Wallet } from 'lucide-react';
import { PaymentMethodPicker } from '../../../components/ecommerce/PaymentMethodPicker';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';
import { VariantsRow } from './_VariantsRow';

const OPTIONS = [
  {
    value: 'card',
    label: 'Credit card / Debit',
    description: 'Visa, Mastercard, Amex',
    icon: <CreditCard className="size-5 text-[var(--color-fg-muted)]" />,
  },
  {
    value: 'klarna',
    label: 'Klarna',
    description: 'Pay in 4 — interest-free',
    icon: (
      <span className="grid h-7 w-9 place-items-center rounded bg-[oklch(92%_0.05_30)] text-[10px] font-bold text-[oklch(40%_0.10_30)]">
        Klarna
      </span>
    ),
  },
  {
    value: 'paypal',
    label: 'PayPal',
    description: 'Connect your PayPal account',
    icon: <Wallet className="size-5 text-[var(--color-fg-muted)]" />,
  },
];

export default function PaymentMethodPickerDoc() {
  return (
    <article>
      <H2>All variants</H2>
      <P>Radio cards. Click to select; the active card lifts via shadow / border.</P>
      <PreviewTabs
        preview={
          <VariantsRow
            cols="2"
            render={(v) => (
              <PaymentMethodPicker
                variant={v}
                defaultValue="card"
                options={OPTIONS}
              />
            )}
          />
        }
        minHeight="32rem"
        code={`<PaymentMethodPicker
  variant="rounded"
  defaultValue="card"
  onChange={setMethod}
  options={[
    { value: 'card',   label: 'Credit card / Debit', icon: <CreditCard /> },
    { value: 'klarna', label: 'Klarna', description: 'Pay in 4' },
    { value: 'paypal', label: 'PayPal' },
  ]}
/>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'variant', type: '"rounded" | "square" | "material" | "brutal"', defaultValue: '"rounded"', description: 'Visual style.' },
          { name: 'options', type: 'PaymentMethodOption[]', required: true, description: 'List of methods.' },
          { name: 'value', type: 'string', description: 'Controlled active value.' },
          { name: 'defaultValue', type: 'string', description: 'Uncontrolled initial value.' },
          { name: 'onChange', type: '(value: string) => void', description: 'Selection handler.' },
        ]}
      />
    </article>
  );
}
