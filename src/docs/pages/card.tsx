import { Sparkles, Star, TrendingUp } from 'lucide-react';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { PreviewTabs } from '../PreviewTabs';
import { H2, H3, P, PropsTable } from '../page-kit';

export default function CardDoc() {
  return (
    <article>
      <H2>Default</H2>
      <PreviewTabs
        preview={
          <Card className="w-full max-w-sm">
            <Card.Header>
              <Card.Title>Project Atlas</Card.Title>
              <Card.Description>
                Track your team's progress in real time.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-[-0.02em]">12,403</span>
                <Badge variant="success" size="sm">
                  <TrendingUp className="size-3" />
                  +24%
                </Badge>
              </div>
            </Card.Content>
            <Card.Footer>
              <Button variant="secondary" size="sm">
                View report
              </Button>
            </Card.Footer>
          </Card>
        }
        code={`import { Card, Badge, Button } from '@zui.react/zui';

<Card>
  <Card.Header>
    <Card.Title>Project Atlas</Card.Title>
    <Card.Description>Track progress in real time.</Card.Description>
  </Card.Header>
  <Card.Content>
    <span className="text-3xl font-bold">12,403</span>
  </Card.Content>
  <Card.Footer>
    <Button variant="secondary" size="sm">View report</Button>
  </Card.Footer>
</Card>`}
      />

      <H2>Variants</H2>
      <PreviewTabs
        preview={
          <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-3">
            {(['flat', 'elevated', 'outline'] as const).map((v) => (
              <Card key={v} variant={v}>
                <Card.Header>
                  <Card.Title className="text-base">{v}</Card.Title>
                  <Card.Description className="text-xs">
                    variant="{v}"
                  </Card.Description>
                </Card.Header>
              </Card>
            ))}
            <Card variant="gradient">
              <Card.Header>
                <Card.Title className="text-base">gradient</Card.Title>
                <Card.Description className="text-xs">
                  Soft accent radial.
                </Card.Description>
              </Card.Header>
            </Card>
            <Card variant="glow">
              <Card.Header>
                <Card.Title className="text-base">glow</Card.Title>
                <Card.Description className="text-xs">Accent halo.</Card.Description>
              </Card.Header>
            </Card>
            <Card variant="featured">
              <Card.Header>
                <Card.Title className="text-base flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-[var(--color-accent-base)]" />
                  featured
                </Card.Title>
                <Card.Description className="text-xs">
                  Animated gradient ring.
                </Card.Description>
              </Card.Header>
            </Card>
          </div>
        }
        minHeight="20rem"
        code={`<Card variant="flat" />
<Card variant="elevated" />
<Card variant="outline" />
<Card variant="gradient" />
<Card variant="glow" />
<Card variant="glass" />
<Card variant="dotted" />
<Card variant="featured" />`}
      />

      <H2>Interactive</H2>
      <P>
        <code>interactive</code> adds a hover lift, shine sweep, and focus ring —
        useful for clickable card patterns.
      </P>
      <PreviewTabs
        preview={
          <Card interactive className="w-full max-w-sm cursor-pointer">
            <Card.Header>
              <Card.Title className="flex items-center gap-2">
                <Star className="size-5 text-[var(--color-warning)] fill-[var(--color-warning)]" />
                Featured project
              </Card.Title>
              <Card.Description>
                Hover or click — the whole card responds.
              </Card.Description>
            </Card.Header>
          </Card>
        }
        code={`<Card interactive>
  <Card.Header>
    <Card.Title>Featured project</Card.Title>
    <Card.Description>The whole card responds.</Card.Description>
  </Card.Header>
</Card>`}
      />

      <H2>API</H2>
      <H3>Card</H3>
      <PropsTable
        rows={[
          {
            name: 'variant',
            type: '"flat" | "elevated" | "outline" | "ghost" | "gradient" | "glow" | "glass" | "dotted" | "featured"',
            defaultValue: '"elevated"',
            description: 'Visual style.',
          },
          {
            name: 'interactive',
            type: 'boolean',
            defaultValue: 'false',
            description:
              'Add hover lift + shine sweep + focus ring for clickable cards.',
          },
        ]}
      />
      <P>
        <code>Card</code> exposes these compound members:{' '}
        <code>Card.Header</code>, <code>Card.Title</code>,{' '}
        <code>Card.Description</code>, <code>Card.Content</code>,{' '}
        <code>Card.Footer</code>.
      </P>
    </article>
  );
}
