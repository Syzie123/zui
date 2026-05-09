import { Check } from 'lucide-react';
import { Badge } from '../../components/Badge';
import { PreviewTabs } from '../PreviewTabs';
import { H2, P, PropsTable } from '../page-kit';

export default function BadgeDoc() {
  return (
    <article>
      <H2>Tones</H2>
      <PreviewTabs
        preview={
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge>Neutral</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="success">
              <Check className="size-3" /> Live
            </Badge>
            <Badge variant="warning">In review</Badge>
            <Badge variant="danger">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="solid">Solid</Badge>
          </div>
        }
        code={`<Badge>Neutral</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="success">Live</Badge>
<Badge variant="warning">In review</Badge>
<Badge variant="danger">Error</Badge>`}
      />

      <H2>Shapes & sizes</H2>
      <PreviewTabs
        preview={
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge shape="pill" size="sm">Pill sm</Badge>
            <Badge shape="pill" size="md">Pill md</Badge>
            <Badge shape="pill" size="lg">Pill lg</Badge>
            <Badge shape="square" size="md">Square</Badge>
          </div>
        }
        code={`<Badge shape="pill"   size="sm" />
<Badge shape="square" size="md" />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          {
            name: 'variant',
            type: '"neutral" | "accent" | "success" | "warning" | "danger" | "info" | "outline" | "solid"',
            defaultValue: '"neutral"',
            description: 'Color tone.',
          },
          {
            name: 'shape',
            type: '"pill" | "square"',
            defaultValue: '"pill"',
            description: 'Corner radius.',
          },
          {
            name: 'size',
            type: '"sm" | "md" | "lg"',
            defaultValue: '"md"',
            description: 'Height + padding.',
          },
        ]}
      />
    </article>
  );
}
