import { TravelCard } from '../../../patterns/TravelCard/TravelCard';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

const NYC = 'https://images.pexels.com/photos/618079/pexels-photo-618079.jpeg';
const SF  = 'https://images.pexels.com/photos/1141853/pexels-photo-1141853.jpeg';
const PARIS = 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg';

export default function TravelCardDoc() {
  return (
    <article>
      <H2>Side by side</H2>
      <P>Phone-aspect destination cards with overlay text and a search CTA pinned to the bottom.</P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center gap-6 py-6 flex-wrap">
            <TravelCard
              src={NYC}
              title="New York"
              subtitle="Economy"
              price="$120"
              code="JFK"
              favouritable
            />
            <TravelCard
              src={SF}
              title="San Francisco"
              subtitle="Premium economy"
              price="$240"
              code="SFO"
              favouritable
              defaultFavourited
              ctaVariant="solid"
            />
          </div>
        }
        minHeight="36rem"
        code={`<TravelCard
  src="/photos/nyc.jpg"
  title="New York"
  subtitle="Economy"
  price="$120"
  code="JFK"
  favouritable
  onCta={() => searchFlights('JFK')}
/>
<TravelCard
  src="/photos/sf.jpg"
  title="San Francisco"
  subtitle="Premium economy"
  price="$240"
  code="SFO"
  favouritable
  defaultFavourited
/>`}
      />

      <H2>Pill CTA</H2>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center py-6">
            <TravelCard
              src={PARIS}
              title="Paris"
              subtitle="Direct flight"
              price="$320"
              code="CDG"
              ctaVariant="pill"
              ctaLabel="Find seats"
            />
          </div>
        }
        minHeight="32rem"
        code={`<TravelCard ctaVariant="pill" ctaLabel="Find seats" {...rest} />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'src', type: 'string', description: 'Background image URL.' },
          { name: 'alt', type: 'string', description: 'Alt text for the image.' },
          { name: 'title', type: 'ReactNode', description: 'Big destination label.' },
          { name: 'subtitle', type: 'ReactNode', description: 'Smaller line under the title.' },
          { name: 'price', type: 'ReactNode', description: 'Fare chip — "from $120".' },
          { name: 'code', type: 'ReactNode', description: 'Airport code chip.' },
          { name: 'ctaLabel', type: 'ReactNode', defaultValue: '"Search flight"', description: 'CTA button text.' },
          { name: 'ctaVariant', type: '"solid" | "pill"', defaultValue: '"solid"', description: 'Dark capsule or wide white pill.' },
          { name: 'onCta', type: '() => void', description: 'CTA click handler.' },
          { name: 'favouritable', type: 'boolean', description: 'Show the favourite heart button.' },
          { name: 'favourited', type: 'boolean', description: 'Controlled favourite state.' },
          { name: 'defaultFavourited', type: 'boolean', description: 'Initial favourite state when uncontrolled.' },
          { name: 'onFavourite', type: '(next: boolean) => void', description: 'Fires when the heart toggles.' },
        ]}
      />
    </article>
  );
}
