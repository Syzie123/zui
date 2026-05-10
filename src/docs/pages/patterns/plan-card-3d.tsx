import { PlanCard3D } from '../../../patterns/PlanCard3D/PlanCard3D';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function PlanCard3DDoc() {
  return (
    <article>
      <H2>All five tones</H2>
      <P>
        Five tone presets cover the full range of pricing tier visuals — from
        the everyday <code>green</code> and the upsell <code>purple</code> through
        the saturated <code>blue</code>, the near-black <code>dark</code>, and the
        paper-white <code>light</code>. Each tone tunes its own surface, badge,
        feature checks, and CTA so you only set <code>tone="…"</code>.
      </P>
      <PreviewTabs
        preview={
          <div className="grid w-full grid-cols-1 gap-5 py-8 md:grid-cols-2 lg:grid-cols-3">
            <PlanCard3D
              tone="green"
              badge="Business"
              title="Business"
              description="For growing teams that ship every week."
              price="$49"
              period="/mo"
              features={[
                'Unlimited collaborators',
                'Advanced analytics',
                'Priority support',
              ]}
              ctaLabel="Start trial"
            />
            <PlanCard3D
              tone="purple"
              badge="Unlimited"
              title="Unlimited"
              description="Pro-grade extras and SLAs."
              price="$390"
              period="/yr"
              features={[
                'All Business features',
                'Custom AI models',
                '99.99% SLA',
              ]}
              ctaLabel="Go unlimited"
            />
            <PlanCard3D
              tone="blue"
              badge="Pro"
              title="Pro"
              description="Indie devs and small teams."
              price="$19"
              period="/mo"
              features={[
                'Unlimited projects',
                'Live preview',
                'Email support',
              ]}
              ctaLabel="Upgrade"
            />
            <PlanCard3D
              tone="dark"
              badge="Enterprise"
              title="Enterprise"
              description="For larger orgs that need control."
              price="Custom"
              features={[
                'SSO & SCIM',
                'Dedicated infra',
                'Procurement & MSA',
              ]}
              ctaLabel="Talk to sales"
            />
            <PlanCard3D
              tone="light"
              title="Free"
              description="Hobbyists & weekend builders."
              price="$0"
              period="/mo"
              features={['1 project', 'Community support']}
              ctaLabel="Get started"
            />
          </div>
        }
        minHeight="44rem"
        code={`<PlanCard3D tone="green"  title="Business"   price="$49"  period="/mo" />
<PlanCard3D tone="purple" title="Unlimited"  price="$390" period="/yr" />
<PlanCard3D tone="blue"   title="Pro"        price="$19"  period="/mo" />
<PlanCard3D tone="dark"   title="Enterprise" price="Custom" />
<PlanCard3D tone="light"  title="Free"       price="$0"   period="/mo" />`}
      />

      <H2>Two tones, side by side</H2>
      <P>
        The classic Business / Unlimited split — green for the everyday plan,
        purple for the upsell. Same component, full feature lists.
      </P>
      <PreviewTabs
        preview={
          <div className="grid w-full grid-cols-1 gap-5 py-8 md:grid-cols-2">
            <PlanCard3D
              tone="green"
              badge="Business"
              title="Business"
              description="For growing teams that ship every week."
              price="$49"
              period="/mo"
              features={[
                'Unlimited collaborators',
                'Advanced analytics',
                'Priority support',
                'SSO & audit log',
              ]}
              ctaLabel="Start trial"
            />
            <PlanCard3D
              tone="purple"
              badge="Unlimited Annual"
              title="Unlimited"
              description="Everything in Business, plus pro-grade extras."
              price="$390"
              period="/yr"
              features={[
                'All Business features',
                'Custom AI models',
                'Dedicated success manager',
                '99.99% SLA',
              ]}
              ctaLabel="Go unlimited"
            />
          </div>
        }
        minHeight="36rem"
        code={`<PlanCard3D
  tone="green"
  badge="Business"
  title="Business"
  description="For growing teams that ship every week."
  price="$49"
  period="/mo"
  features={[
    'Unlimited collaborators',
    'Advanced analytics',
    'Priority support',
    'SSO & audit log',
  ]}
  ctaLabel="Start trial"
  onCta={() => router.push('/billing')}
/>
<PlanCard3D tone="purple" badge="Unlimited Annual" {...rest} />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'tone', type: '"green" | "purple" | "blue" | "dark" | "light"', defaultValue: '"light"', description: 'Color preset.' },
          { name: 'badge', type: 'ReactNode', description: 'Tiny pill above the title — eg. "Most popular".' },
          { name: 'title', type: 'string', description: 'Plan name.' },
          { name: 'description', type: 'ReactNode', description: 'Short blurb under the title.' },
          { name: 'price', type: 'ReactNode', description: 'Big price number, eg. "$49".' },
          { name: 'period', type: 'string', description: 'Period label after the price, eg. "/mo".' },
          { name: 'features', type: 'ReactNode[]', description: 'Bulleted list with check icons.' },
          { name: 'ctaLabel', type: 'string', defaultValue: '"Get started"', description: 'CTA button text.' },
          { name: 'onCta', type: '() => void', description: 'CTA click handler.' },
        ]}
      />
    </article>
  );
}
