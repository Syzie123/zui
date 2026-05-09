import { MagicCard } from '../../../components/effects/MagicCard/MagicCard';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function MagicCardDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>
        Hover or move your cursor over the card — a soft spotlight tracks it.
        Math runs on <code>pointermove</code> and writes a CSS variable, so React
        never rerenders.
      </P>
      <PreviewTabs
        preview={
          <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-3">
            {['Build', 'Ship', 'Iterate'].map((t) => (
              <MagicCard key={t} className="p-6">
                <p className="font-display text-base font-semibold tracking-[-0.01em]">
                  {t}
                </p>
                <p className="mt-1 text-xs text-[var(--color-fg-muted)]">
                  Hover anywhere on this card.
                </p>
              </MagicCard>
            ))}
          </div>
        }
        minHeight="14rem"
        code={`import { MagicCard } from '@zui.react/zui';

<MagicCard className="p-6">
  <p>Build</p>
  <p>Hover anywhere on this card.</p>
</MagicCard>`}
      />

      <H2>Custom spotlight</H2>
      <PreviewTabs
        preview={
          <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
            <MagicCard
              gradientColor="oklch(72% 0.20 200)"
              gradientSize={320}
              gradientOpacity={0.25}
              className="p-6"
            >
              <p className="font-display text-base font-semibold">Cyan</p>
              <p className="mt-1 text-xs text-[var(--color-fg-muted)]">
                Larger, more vivid spotlight.
              </p>
            </MagicCard>
            <MagicCard
              gradientColor="oklch(72% 0.22 30)"
              gradientSize={200}
              gradientOpacity={0.15}
              className="p-6"
            >
              <p className="font-display text-base font-semibold">Sunset</p>
              <p className="mt-1 text-xs text-[var(--color-fg-muted)]">
                Smaller, subtler.
              </p>
            </MagicCard>
          </div>
        }
        code={`<MagicCard
  gradientColor="oklch(72% 0.20 200)"
  gradientSize={320}
  gradientOpacity={0.25}
/>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          {
            name: 'gradientColor',
            type: 'string',
            defaultValue: '"oklch(70% 0.22 285)"',
            description: 'Spotlight color.',
          },
          {
            name: 'gradientSize',
            type: 'number',
            defaultValue: '280',
            description: 'Spotlight radius in pixels.',
          },
          {
            name: 'gradientOpacity',
            type: 'number',
            defaultValue: '0.18',
            description: 'Spotlight opacity (0–1).',
          },
        ]}
      />
    </article>
  );
}
