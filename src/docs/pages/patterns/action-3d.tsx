import { Calendar, Sparkles, ArrowUpRight } from 'lucide-react';
import { Action3D } from '../../../patterns/Action3D/Action3D';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function Action3DDoc() {
  return (
    <article>
      <H2>Default — primary</H2>
      <P>Raised pill with an icon well on the left and a chevron well on the right.</P>
      <PreviewTabs
        preview={
          <div className="flex flex-wrap items-center justify-center gap-4 py-10">
            <Action3D variant="primary" icon={<Calendar className="size-4" />}>
              Book a call
            </Action3D>
            <Action3D variant="primary" icon={<Sparkles className="size-4" />}>
              Try magic
            </Action3D>
          </div>
        }
        minHeight="9rem"
        code={`<Action3D variant="primary" icon={<Calendar className="size-4" />}>
  Book a call
</Action3D>`}
      />

      <H2>Secondary</H2>
      <P>Light pill that reads as inverted in dark mode. Same depth recipe.</P>
      <PreviewTabs
        preview={
          <div className="flex flex-wrap items-center justify-center gap-4 py-10">
            <Action3D variant="secondary" icon={<Calendar className="size-4" />}>
              Book a call
            </Action3D>
            <Action3D
              variant="secondary"
              icon={<ArrowUpRight className="size-4" />}
            >
              View case study
            </Action3D>
          </div>
        }
        minHeight="9rem"
        code={`<Action3D variant="secondary" icon={<Calendar className="size-4" />}>
  Book a call
</Action3D>`}
      />

      <H2>Sizes</H2>
      <PreviewTabs
        preview={
          <div className="flex flex-wrap items-center justify-center gap-4 py-10">
            <Action3D variant="primary" size="md" icon={<Calendar className="size-3.5" />}>
              Compact
            </Action3D>
            <Action3D variant="primary" size="lg" icon={<Calendar className="size-4" />}>
              Default
            </Action3D>
            <Action3D variant="secondary" size="lg" chevron={false}>
              No chevron
            </Action3D>
          </div>
        }
        minHeight="9rem"
        code={`<Action3D size="md" icon={<Calendar />}>Compact</Action3D>
<Action3D size="lg" icon={<Calendar />}>Default</Action3D>
<Action3D chevron={false}>No chevron</Action3D>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          {
            name: 'variant',
            type: '"primary" | "secondary"',
            defaultValue: '"primary"',
            description: 'Solid blue pill or light surface pill.',
          },
          {
            name: 'icon',
            type: 'ReactNode',
            description: 'Icon shown inside a circular well on the left.',
          },
          {
            name: 'chevron',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Show the chevron well on the right.',
          },
          {
            name: 'size',
            type: '"md" | "lg"',
            defaultValue: '"lg"',
            description: 'Two heights — compact and default.',
          },
        ]}
      />
    </article>
  );
}
