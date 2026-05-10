import { Cloud, User } from 'lucide-react';
import { PricingDark } from '../../../patterns/PricingDark/PricingDark';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

const Mark = ({ tone }: { tone: 'turquoise' | 'purple' | 'off-white' }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
    <circle cx="12" cy="12" r="10" fill={
      tone === 'turquoise' ? 'oklch(60% 0.18 200)' :
      tone === 'purple'    ? 'oklch(70% 0.20 285)' :
                             'oklch(96% 0 0)'
    } />
    <path
      d="M9 14l2-7 2 5 2-3"
      stroke={tone === 'off-white' ? 'oklch(20% 0 0)' : 'oklch(99% 0 0)'}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function PricingDarkDoc() {
  return (
    <article>
      <H2>Three-tier comparison</H2>
      <P>Two specs, divider label, and a feature list per tier. Middle tier is highlighted.</P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center gap-5 py-6 flex-wrap items-center bg-[oklch(8%_0_0)] rounded-2xl p-6">
            <PricingDark
              tone="turquoise"
              brandMark={<Mark tone="turquoise" />}
              title="Turquoise Trek"
              description="Seamless Web 3.0 integration. Enhanced privacy. Decentralized apps."
              price="$4,200"
              period="/month"
              specs={[
                { icon: <User className="size-4" />, label: 'seats available', emphasis: '2 free' },
                { icon: <Cloud className="size-4" />, label: 'of cloud storage', emphasis: '250MB' },
              ]}
              features={[
                { label: 'Seamless integration' },
                { label: 'Enhanced privacy' },
                { label: 'Decentralized applications' },
              ]}
              ctaLabel="Choose this plan"
            />

            <PricingDark
              tone="purple"
              highlighted
              brandMark={<Mark tone="purple" />}
              badge="Most popular"
              title="Purple Lift"
              description="Supercharged crypto tools. Personalized guidance. Market insights."
              price="$10,500"
              period="/month"
              specs={[
                { icon: <User className="size-4" />, label: 'seats available', emphasis: '4 free' },
                { icon: <Cloud className="size-4" />, label: 'of cloud storage', emphasis: '1GB' },
              ]}
              divider="Turquoise Trek +"
              features={[
                { label: 'Supercharged tools', chip: '✨ AI-based' },
                { label: 'Personalized guidance' },
                { label: 'Market insights' },
              ]}
              ctaLabel="Choose this plan"
            />

            <PricingDark
              tone="off-white"
              brandMark={<Mark tone="off-white" />}
              title="Off-white"
              description="Own your data. Censorship-resistant. Decentralized social media."
              price="Contact us"
              specs={[
                { icon: <User className="size-4" />, label: 'seats available', emphasis: 'Unlimited' },
                { icon: <Cloud className="size-4" />, label: 'of cloud storage', emphasis: '1TB+' },
              ]}
              divider="Turquoise Trek & Purple Lift +"
              features={[
                { label: 'Own your data' },
                { label: 'Censorship-resistant' },
                { label: 'Decentralized social media' },
              ]}
              ctaContact
            />
          </div>
        }
        minHeight="40rem"
        code={`<PricingDark
  tone="turquoise"
  title="Turquoise Trek"
  description="..."
  price="$4,200" period="/month"
  specs={[
    { icon: <User />,  label: 'seats available', emphasis: '2 free' },
    { icon: <Cloud />, label: 'of cloud storage', emphasis: '250MB' },
  ]}
  features={[
    { label: 'Seamless integration' },
    { label: 'Enhanced privacy' },
  ]}
/>

<PricingDark
  tone="purple"
  highlighted
  badge="Most popular"
  title="Purple Lift"
  ...
/>

<PricingDark
  tone="off-white"
  title="Off-white"
  price="Contact us"
  ctaContact
/>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'tone', type: '"turquoise" | "purple" | "off-white" | "amber" | "crimson"', defaultValue: '"turquoise"', description: 'Color preset for the corner glow + scribble + brand mark.' },
          { name: 'highlighted', type: 'boolean', description: 'Mark this tier as the upsell — orange CTA, denser surface.' },
          { name: 'brandMark', type: 'ReactNode', description: 'Small logo / icon shown in the round well.' },
          { name: 'badge', type: 'ReactNode', description: 'Top-right pill, eg. "Most popular".' },
          { name: 'title', type: 'ReactNode', description: 'Plan name.' },
          { name: 'description', type: 'ReactNode', description: 'Blurb under the title.' },
          { name: 'price', type: 'ReactNode', description: 'Big price line.' },
          { name: 'period', type: 'ReactNode', description: 'Period text after the price, eg. "/month".' },
          { name: 'specs', type: 'PricingDarkSpec[]', description: 'Two-row spec block above the divider.' },
          { name: 'divider', type: 'ReactNode', description: 'Section label between specs and features.' },
          { name: 'features', type: 'PricingDarkFeature[]', description: 'Feature rows with check icons.' },
          { name: 'ctaLabel', type: 'ReactNode', defaultValue: '"Choose this plan"', description: 'CTA text.' },
          { name: 'ctaContact', type: 'boolean', description: 'Switch CTA into the dark "Contact us" treatment.' },
          { name: 'onCta', type: '() => void', description: 'CTA click.' },
        ]}
      />
    </article>
  );
}
