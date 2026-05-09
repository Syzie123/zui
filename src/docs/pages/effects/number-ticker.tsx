import { NumberTicker } from '../../../components/effects/NumberTicker/NumberTicker';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function NumberTickerDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>
        Counts from 0 to the target with an ease-out cubic curve. Triggers via{' '}
        <code>IntersectionObserver</code> when scrolled into view, then writes
        directly to <code>textContent</code> per <code>requestAnimationFrame</code>{' '}
        — no React rerenders.
      </P>
      <PreviewTabs
        preview={
          <div className="font-display text-7xl font-bold tracking-[-0.04em]">
            <NumberTicker value={12403} />
          </div>
        }
        code={`<NumberTicker value={12403} />`}
      />

      <H2>Currency, decimals, percentage</H2>
      <PreviewTabs
        preview={
          <div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3 text-center">
            {[
              { l: 'Revenue', el: <NumberTicker value={48210} prefix="$" /> },
              { l: 'Conversion', el: <NumberTicker value={3.42} decimals={2} suffix="%" /> },
              { l: 'Latency', el: <NumberTicker value={184} suffix="ms" /> },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
                  {s.l}
                </p>
                <p className="mt-1 font-display text-4xl font-bold tracking-[-0.03em]">
                  {s.el}
                </p>
              </div>
            ))}
          </div>
        }
        code={`<NumberTicker value={48210}  prefix="$" />
<NumberTicker value={3.42}   decimals={2} suffix="%" />
<NumberTicker value={184}    suffix="ms" />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          {
            name: 'value',
            type: 'number',
            required: true,
            description: 'Target value to count up to.',
          },
          {
            name: 'from',
            type: 'number',
            defaultValue: '0',
            description: 'Starting value.',
          },
          {
            name: 'duration',
            type: 'number',
            defaultValue: '1600',
            description: 'Animation duration in milliseconds.',
          },
          {
            name: 'decimals',
            type: 'number',
            defaultValue: '0',
            description: 'Number of decimal places.',
          },
          {
            name: 'prefix',
            type: 'string',
            description: 'Text shown before the number (e.g. "$").',
          },
          {
            name: 'suffix',
            type: 'string',
            description: 'Text shown after the number (e.g. "%").',
          },
          {
            name: 'locale',
            type: 'string',
            defaultValue: '"en-US"',
            description: 'Locale for number formatting.',
          },
        ]}
      />
    </article>
  );
}
