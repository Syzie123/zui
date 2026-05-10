import { StatsCard } from '../../../patterns/StatsCard/StatsCard';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function StatsCardDoc() {
  return (
    <article>
      <H2>Total sales</H2>
      <P>Big metric, three breakdown rows with deltas, and a sparkline + day-axis labels.</P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center py-6">
            <StatsCard
              brandMark="S"
              brand="Sales Expert"
              title="Total Sales"
              value="$16,765.34"
              range="Last Month"
              rangeOptions={['Last Week', 'Last Month', 'Last Quarter']}
              glow="violet"
              rows={[
                { label: 'Instagram', value: '$10,065.23', delta: 87.2 },
                { label: 'Shopify',   value: '$5,721.63',  delta: -21.7 },
                { label: 'Facebook',  value: '$1,268.18',  delta: -1.9 },
              ]}
              series={[20, 28, 24, 26, 22, 24, 32, 38]}
              axis={['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI']}
            />
          </div>
        }
        minHeight="28rem"
        code={`<StatsCard
  brandMark="S"
  brand="Sales Expert"
  title="Total Sales"
  value="$16,765.34"
  range="Last Month"
  rows={[
    { label: 'Instagram', value: '$10,065.23', delta: 87.2 },
    { label: 'Shopify',   value: '$5,721.63',  delta: -21.7 },
    { label: 'Facebook',  value: '$1,268.18',  delta: -1.9 },
  ]}
  series={[20, 28, 24, 26, 22, 24, 32, 38]}
  axis={['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI']}
/>`}
      />

      <H2>Glow presets</H2>
      <PreviewTabs
        preview={
          <div className="grid w-full grid-cols-1 gap-5 py-6 md:grid-cols-2">
            <StatsCard
              brandMark="A"
              brand="Analytics"
              title="Active users"
              value="14,392"
              glow="mint"
              rows={[
                { label: 'Mobile', value: '9,201', delta: 6.4 },
                { label: 'Desktop', value: '5,191', delta: -2.1 },
              ]}
              series={[14, 18, 16, 22, 20, 24, 28]}
              axis={['M','T','W','T','F','S','S']}
            />
            <StatsCard
              brandMark="R"
              brand="Revenue"
              title="MRR"
              value="$92,400"
              glow="amber"
              rows={[
                { label: 'New', value: '$31,200', delta: 12.0 },
                { label: 'Expansion', value: '$48,800', delta: 4.2 },
              ]}
              series={[40, 42, 50, 52, 55, 60, 64]}
              axis={['Jan','Feb','Mar','Apr','May','Jun','Jul']}
            />
          </div>
        }
        minHeight="28rem"
        code={`<StatsCard glow="mint"  ... />
<StatsCard glow="amber" ... />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'brandMark', type: 'ReactNode', description: 'Small icon or letter for the brand tile.' },
          { name: 'brand', type: 'ReactNode', description: 'App / source name shown above the title.' },
          { name: 'title', type: 'ReactNode', description: 'Big metric label.' },
          { name: 'value', type: 'ReactNode', description: 'Big metric value (already formatted).' },
          { name: 'range', type: 'ReactNode', defaultValue: '"Last Month"', description: 'Range chip text.' },
          { name: 'rangeOptions', type: 'string[]', description: 'When provided, range becomes a native <select>.' },
          { name: 'rows', type: 'StatsCardRow[]', description: 'Breakdown rows under the metric.' },
          { name: 'series', type: 'number[]', description: 'Sparkline values — auto-scaled.' },
          { name: 'axis', type: 'string[]', description: 'Tick labels under the sparkline.' },
          { name: 'glow', type: '"pink" | "violet" | "amber" | "mint" | "sky"', defaultValue: '"violet"', description: 'Color of the corner glow.' },
        ]}
      />
    </article>
  );
}
