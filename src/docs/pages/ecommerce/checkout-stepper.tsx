import { CheckoutStepper } from '../../../components/ecommerce/CheckoutStepper';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';
import { VariantsRow } from './_VariantsRow';

const STEPS = [
  { label: 'Shipping' },
  { label: 'Payment' },
  { label: 'Review' },
];

export default function CheckoutStepperDoc() {
  return (
    <article>
      <H2>Active step = 1 (Payment)</H2>
      <PreviewTabs
        preview={
          <VariantsRow
            cols="1"
            render={(v) => (
              <CheckoutStepper variant={v} steps={STEPS} current={1} />
            )}
          />
        }
        minHeight="20rem"
        code={`<CheckoutStepper
  variant="rounded"
  current={1}
  steps={[
    { label: 'Shipping' },
    { label: 'Payment'  },
    { label: 'Review'   },
  ]}
/>`}
      />

      <H2>All states (active=0, 1, 2)</H2>
      <PreviewTabs
        preview={
          <div className="flex w-full max-w-2xl flex-col gap-3">
            {[0, 1, 2].map((i) => (
              <CheckoutStepper key={i} variant="rounded" steps={STEPS} current={i} />
            ))}
          </div>
        }
        minHeight="20rem"
        code={`<CheckoutStepper current={0} … />
<CheckoutStepper current={1} … />
<CheckoutStepper current={2} … />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'variant', type: '"rounded" | "square" | "material" | "brutal"', defaultValue: '"rounded"', description: 'Visual style.' },
          { name: 'steps', type: 'StepItem[]', required: true, description: 'Ordered steps with labels.' },
          { name: 'current', type: 'number', required: true, description: 'Index of the active step.' },
        ]}
      />
    </article>
  );
}
