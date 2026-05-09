import { PromoCode } from '../../../components/ecommerce/PromoCode';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';
import { VariantsRow } from './_VariantsRow';

export default function PromoCodeDoc() {
  return (
    <article>
      <H2>All variants</H2>
      <P>
        Returns <code>true/false</code> from <code>onApply</code> to flip the
        border to success or danger. Try typing "WELCOME10" then hit Apply.
      </P>
      <PreviewTabs
        preview={
          <VariantsRow
            cols="2"
            render={(v) => (
              <PromoCode
                variant={v}
                onApply={async (code) => code.toUpperCase() === 'WELCOME10'}
              />
            )}
          />
        }
        minHeight="20rem"
        code={`<PromoCode
  variant="rounded"
  placeholder="Promo code"
  onApply={async (code) => {
    const res = await fetch('/api/coupons', { method: 'POST', body: JSON.stringify({ code }) });
    return res.ok;  // returning true → green border + "Applied"
  }}
/>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'variant', type: '"rounded" | "square" | "material" | "brutal"', defaultValue: '"rounded"', description: 'Visual style.' },
          { name: 'onApply', type: '(code: string) => boolean | Promise<boolean>', description: 'Submit handler. Resolve `true` for success.' },
          { name: 'placeholder', type: 'string', defaultValue: '"Promo code"', description: 'Input placeholder.' },
          { name: 'applyLabel', type: 'string', defaultValue: '"Apply"', description: 'Button label.' },
        ]}
      />
    </article>
  );
}
