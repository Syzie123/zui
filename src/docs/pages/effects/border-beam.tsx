import { BorderBeam } from '../../../components/effects/BorderBeam/BorderBeam';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function BorderBeamDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>
        Drop into any container with <code>position: relative</code>. The beam
        masks itself to a 1.5px ring around the parent's <code>border-radius</code>.
      </P>
      <PreviewTabs
        preview={
          <div className="relative h-48 w-72 overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)] p-6">
            <p className="font-display text-lg font-semibold tracking-[-0.01em]">
              ZUI
            </p>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
              Subtle but unmistakable.
            </p>
            <BorderBeam />
          </div>
        }
        code={`<div className="relative overflow-hidden rounded-2xl">
  <p>Card content</p>
  <BorderBeam />
</div>`}
      />

      <H2>Two beams, opposite phases</H2>
      <PreviewTabs
        preview={
          <div className="relative h-48 w-72 overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)] p-6">
            <p className="font-display text-lg font-semibold">Premium</p>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
              Featured tier card.
            </p>
            <BorderBeam duration={6} />
            <BorderBeam duration={6} delay={0.5} colorFrom="oklch(72% 0.20 200)" colorTo="oklch(70% 0.22 320)" />
          </div>
        }
        code={`<div className="relative overflow-hidden rounded-2xl">
  <BorderBeam />
  <BorderBeam delay={0.5} colorFrom="oklch(72% 0.20 200)" colorTo="oklch(70% 0.22 320)" />
</div>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          {
            name: 'duration',
            type: 'number',
            defaultValue: '6',
            description: 'Loop duration in seconds.',
          },
          {
            name: 'delay',
            type: 'number',
            defaultValue: '0',
            description: 'Starting offset (0–1) along the loop.',
          },
          {
            name: 'colorFrom',
            type: 'string',
            description: 'Trailing color of the beam.',
          },
          {
            name: 'colorTo',
            type: 'string',
            description: 'Leading color of the beam.',
          },
        ]}
      />
    </article>
  );
}
