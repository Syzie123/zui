import { TrackDelivery } from '../../../patterns/TrackDelivery/TrackDelivery';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function TrackDeliveryDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>Compact status card with a hand-drawn isometric box-on-conveyor SVG illustration.</P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center py-6">
            <TrackDelivery onCta={() => {}} />
          </div>
        }
        minHeight="22rem"
        code={`<TrackDelivery
  title="Track Your Delivery"
  description="Monitor your shipment status in real-time."
  status="Your delivery is on its way!"
  ctaLabel="View Status"
  onCta={() => router.push('/orders/active')}
/>`}
      />

      <H2>Custom accent</H2>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center py-6">
            <TrackDelivery
              accent="oklch(70% 0.20 25)"
              status="Out for delivery — 3:30 PM"
              ctaLabel="Track now"
            />
          </div>
        }
        minHeight="22rem"
        code={`<TrackDelivery
  accent="oklch(70% 0.20 25)"
  status="Out for delivery — 3:30 PM"
  ctaLabel="Track now"
/>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'title', type: 'ReactNode', defaultValue: '"Track Your Delivery"', description: 'Card heading.' },
          { name: 'description', type: 'ReactNode', description: 'Sub-line under the heading.' },
          { name: 'status', type: 'ReactNode', defaultValue: '"Your delivery is on its way!"', description: 'Status line shown next to the package icon.' },
          { name: 'badge', type: 'ReactNode', description: 'Override the top-right floating chip (defaults to a clock icon).' },
          { name: 'ctaLabel', type: 'ReactNode', defaultValue: '"View Status"', description: 'CTA button label.' },
          { name: 'onCta', type: '() => void', description: 'CTA click handler.' },
          { name: 'illustration', type: 'ReactNode', description: 'Override the built-in box illustration entirely.' },
          { name: 'accent', type: 'string', defaultValue: 'lime', description: 'CSS color for the box stripe.' },
        ]}
      />
    </article>
  );
}
