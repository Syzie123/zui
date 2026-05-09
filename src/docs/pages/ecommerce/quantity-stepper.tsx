import { QuantityStepper } from '../../../components/ecommerce/QuantityStepper';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';
import { VariantsRow } from './_VariantsRow';

export default function QuantityStepperDoc() {
  return (
    <article>
      <H2>All variants</H2>
      <PreviewTabs
        preview={
          <VariantsRow
            cols="2"
            render={(v) => (
              <div className="flex flex-col gap-3">
                <QuantityStepper variant={v} size="sm" defaultValue={1} />
                <QuantityStepper variant={v} size="md" defaultValue={3} />
                <QuantityStepper variant={v} size="lg" defaultValue={5} />
              </div>
            )}
          />
        }
        minHeight="28rem"
        code={`<QuantityStepper variant="rounded" defaultValue={1} min={1} max={99} />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'variant', type: '"rounded" | "square" | "material" | "brutal"', defaultValue: '"rounded"', description: 'Visual style.' },
          { name: 'value', type: 'number', description: 'Controlled qty.' },
          { name: 'defaultValue', type: 'number', defaultValue: '1', description: 'Uncontrolled initial qty.' },
          { name: 'onChange', type: '(n: number) => void', description: 'Fires when qty changes.' },
          { name: 'min', type: 'number', defaultValue: '1', description: 'Lower bound.' },
          { name: 'max', type: 'number', defaultValue: '99', description: 'Upper bound.' },
          { name: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Height + padding.' },
        ]}
      />
    </article>
  );
}
