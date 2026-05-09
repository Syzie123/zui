import { PriceTag } from '../../../components/ecommerce/PriceTag';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function PriceTagDoc() {
  return (
    <article>
      <H2>Sizes</H2>
      <PreviewTabs
        preview={
          <div className="flex flex-col items-start gap-3">
            <PriceTag price="9.99"  prefix="$" size="sm" />
            <PriceTag price="14.99" prefix="$" size="md" />
            <PriceTag price="29.99" prefix="$" size="lg" />
            <PriceTag price="129.99" prefix="$" size="xl" />
          </div>
        }
        code={`<PriceTag price="9.99" prefix="$" size="sm" />
<PriceTag price="14.99" prefix="$" size="md" />
<PriceTag price="29.99" prefix="$" size="lg" />
<PriceTag price="129.99" prefix="$" size="xl" />`}
      />

      <H2>Sale (with strikethrough original)</H2>
      <PreviewTabs
        preview={
          <div className="flex flex-col items-start gap-3">
            <PriceTag price="10.99" original="14.99" prefix="$" size="lg" />
            <PriceTag price="89" original="129" prefix="$" size="xl" />
          </div>
        }
        code={`<PriceTag price="10.99" original="14.99" prefix="$" size="lg" />`}
      />

      <H2>Suffix (e.g. /mo)</H2>
      <PreviewTabs
        preview={
          <PriceTag price="19" prefix="$" suffix="/mo" size="xl" />
        }
        code={`<PriceTag price="19" prefix="$" suffix="/mo" size="xl" />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'price', type: 'string', required: true, description: 'Current price.' },
          { name: 'original', type: 'string', description: 'Strikethrough original.' },
          { name: 'prefix', type: 'string', description: 'Currency or unit before the price.' },
          { name: 'suffix', type: 'string', description: 'Unit after the price (e.g. "/mo").' },
          { name: 'size', type: '"sm" | "md" | "lg" | "xl"', defaultValue: '"md"', description: 'Type size.' },
        ]}
      />
    </article>
  );
}
