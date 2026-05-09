import { ShineBorder } from '../../../components/effects/ShineBorder/ShineBorder';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function ShineBorderDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>
        Conic-gradient ring that pans around the border. Different feel from
        <code>BorderBeam</code> — this is a continuous shimmer rather than a
        single moving point.
      </P>
      <PreviewTabs
        preview={
          <div className="relative h-48 w-72 overflow-hidden rounded-[var(--radius-2xl)] bg-[var(--color-bg-elevated)] p-6">
            <p className="font-display text-lg font-semibold">Limited release</p>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
              Shine border for "wow" moments.
            </p>
            <ShineBorder />
          </div>
        }
        code={`<div className="relative overflow-hidden rounded-2xl">
  Card content
  <ShineBorder />
</div>`}
      />

      <H2>Custom palette</H2>
      <PreviewTabs
        preview={
          <div className="relative h-48 w-72 overflow-hidden rounded-[var(--radius-2xl)] bg-[var(--color-bg-elevated)] p-6">
            <p className="font-display text-lg font-semibold">Sunset</p>
            <ShineBorder
              borderWidth={2}
              duration={6}
              colors={[
                'oklch(72% 0.20 30)',
                'oklch(72% 0.20 350)',
                'oklch(72% 0.20 280)',
                'oklch(72% 0.20 30)',
              ]}
            />
          </div>
        }
        code={`<ShineBorder
  borderWidth={2}
  duration={6}
  colors={[
    'oklch(72% 0.20 30)',   // orange
    'oklch(72% 0.20 350)',  // pink
    'oklch(72% 0.20 280)',  // violet
    'oklch(72% 0.20 30)',   // orange (loop)
  ]}
/>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          {
            name: 'borderWidth',
            type: 'number',
            defaultValue: '1.5',
            description: 'Border thickness in pixels.',
          },
          {
            name: 'duration',
            type: 'number',
            defaultValue: '8',
            description: 'Pan duration in seconds.',
          },
          {
            name: 'colors',
            type: 'string[]',
            description: 'Conic-gradient color stops. Repeat the first to loop seamlessly.',
          },
        ]}
      />
    </article>
  );
}
