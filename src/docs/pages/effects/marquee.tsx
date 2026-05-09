import { Star } from 'lucide-react';
import { Marquee } from '../../../components/effects/Marquee/Marquee';
import { Avatar } from '../../../components/Avatar';
import { Card } from '../../../components/Card';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

const TESTIMONIALS = [
  { name: 'Lara Chen',     handle: '@larac',     body: 'Best DX I\'ve had in a year. The motion is so polished.', img: 14 },
  { name: 'Marco Diaz',    handle: '@marcod',    body: 'We replaced 4 component libraries with this. Smaller bundle, faster.', img: 12 },
  { name: 'Priya Singh',   handle: '@priyas',    body: 'The luminous variant is unreasonably good.', img: 5 },
  { name: 'James Park',    handle: '@jpark',     body: 'Theme switch is instant. Three brand looks, one codebase.', img: 33 },
  { name: 'Emma Wilson',   handle: '@emmaw',     body: 'Accessibility out of the box. Saved us a sprint.', img: 49 },
  { name: 'Tomas Köhler',  handle: '@tomas',     body: 'The composition primitives map cleanly to my mental model.', img: 8 },
];

export default function MarqueeDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>Endless horizontal scroll. Pause on hover, edge fade by default.</P>
      <PreviewTabs
        preview={
          <div className="w-full">
            <Marquee pauseOnHover speed={45}>
              {TESTIMONIALS.map((t) => (
                <Card
                  key={t.handle}
                  variant="flat"
                  className="w-72 shrink-0"
                >
                  <Card.Header className="flex-row items-center gap-3">
                    <Avatar src={`https://i.pravatar.cc/96?img=${t.img}`} fallback={t.name[0]} />
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-[var(--color-fg-muted)]">{t.handle}</p>
                    </div>
                  </Card.Header>
                  <Card.Content>
                    <p className="text-[13px] leading-relaxed text-[var(--color-fg-muted)]">
                      {t.body}
                    </p>
                  </Card.Content>
                </Card>
              ))}
            </Marquee>
          </div>
        }
        minHeight="14rem"
        code={`<Marquee pauseOnHover speed={45}>
  {testimonials.map((t) => (
    <Card key={t.handle} className="w-72 shrink-0">
      <Card.Header>
        <Avatar src={t.avatar} fallback={t.name[0]} />
        <p className="text-sm font-semibold">{t.name}</p>
      </Card.Header>
      <Card.Content>{t.body}</Card.Content>
    </Card>
  ))}
</Marquee>`}
      />

      <H2>Two rows, opposite directions</H2>
      <PreviewTabs
        preview={
          <div className="w-full space-y-3">
            <Marquee pauseOnHover speed={40}>
              {Array.from({ length: 8 }, (_, i) => (
                <BrandPill key={i}>Brand {i + 1}</BrandPill>
              ))}
            </Marquee>
            <Marquee pauseOnHover speed={50} reverse>
              {Array.from({ length: 8 }, (_, i) => (
                <BrandPill key={i}>Studio {i + 1}</BrandPill>
              ))}
            </Marquee>
          </div>
        }
        minHeight="12rem"
        code={`<Marquee pauseOnHover speed={40}>
  {brands.map((b) => <BrandPill key={b}>{b}</BrandPill>)}
</Marquee>
<Marquee pauseOnHover speed={50} reverse>
  {studios.map((s) => <BrandPill key={s}>{s}</BrandPill>)}
</Marquee>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          {
            name: 'speed',
            type: 'number',
            defaultValue: '30',
            description: 'Loop duration in seconds. Higher = slower.',
          },
          {
            name: 'reverse',
            type: 'boolean',
            description: 'Scroll right-to-left instead.',
          },
          {
            name: 'pauseOnHover',
            type: 'boolean',
            description: 'Pause animation while hovered.',
          },
          {
            name: 'vertical',
            type: 'boolean',
            description: 'Scroll vertically instead of horizontally.',
          },
          {
            name: 'fade',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Show edge fade-out gradients.',
          },
          {
            name: 'repeat',
            type: 'number',
            defaultValue: '4',
            description: 'How many copies of children to render.',
          },
        ]}
      />
    </article>
  );
}

function BrandPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)] px-4 py-2 text-sm font-medium">
      <Star className="size-3.5 text-[var(--color-warning)] fill-[var(--color-warning)]" />
      {children}
    </span>
  );
}
