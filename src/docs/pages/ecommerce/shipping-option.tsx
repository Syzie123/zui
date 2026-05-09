import { ShippingOption } from '../../../components/ecommerce/ShippingOption';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';
import { VariantsRow } from './_VariantsRow';

const OPTIONS = [
  {
    value: 'fast',
    carrier: 'GLS',
    price: '$5.99',
    eta: 'by Tomorrow, 27 Mar 2024',
    badge: 'Fast Delivery',
  },
  {
    value: 'free',
    carrier: 'DHL',
    price: 'Free Delivery',
    eta: 'between 2 – 4 Apr 2024',
  },
];

export default function ShippingOptionDoc() {
  return (
    <article>
      <H2>All variants</H2>
      <P>Carrier-aware delivery picker with optional badge (e.g. "Fast Delivery").</P>
      <PreviewTabs
        preview={
          <VariantsRow
            cols="2"
            render={(v) => (
              <ShippingOption variant={v} defaultValue="fast" options={OPTIONS} />
            )}
          />
        }
        minHeight="32rem"
        code={`<ShippingOption
  variant="rounded"
  defaultValue="fast"
  onChange={setShipping}
  options={[
    {
      value: 'fast',
      carrier: 'GLS',
      price: '$5.99',
      eta: 'by Tomorrow, 27 Mar 2024',
      badge: 'Fast Delivery',
    },
    { value: 'free', carrier: 'DHL', price: 'Free Delivery', eta: 'between 2 – 4 Apr 2024' },
  ]}
/>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'variant', type: '"rounded" | "square" | "material" | "brutal"', defaultValue: '"rounded"', description: 'Visual style.' },
          { name: 'options', type: 'ShippingOptionItem[]', required: true, description: 'Available delivery methods.' },
          { name: 'value', type: 'string', description: 'Controlled active value.' },
          { name: 'defaultValue', type: 'string', description: 'Uncontrolled initial value.' },
          { name: 'onChange', type: '(value: string) => void', description: 'Selection handler.' },
        ]}
      />
    </article>
  );
}
