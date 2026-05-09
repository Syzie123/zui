import { LayoutGrid, List, Calendar } from 'lucide-react';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import { PreviewTabs } from '../PreviewTabs';
import { H2, P, PropsTable } from '../page-kit';

export default function SegmentedControlDoc() {
  return (
    <article>
      <H2>Default</H2>
      <PreviewTabs
        preview={
          <SegmentedControl defaultValue="grid">
            <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
            <SegmentedControl.Item value="list">List</SegmentedControl.Item>
            <SegmentedControl.Item value="board">Board</SegmentedControl.Item>
          </SegmentedControl>
        }
        code={`<SegmentedControl defaultValue="grid">
  <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
  <SegmentedControl.Item value="list">List</SegmentedControl.Item>
  <SegmentedControl.Item value="board">Board</SegmentedControl.Item>
</SegmentedControl>`}
      />

      <H2>With icons</H2>
      <PreviewTabs
        preview={
          <SegmentedControl defaultValue="grid">
            <SegmentedControl.Item value="grid">
              <LayoutGrid className="size-3.5" /> Grid
            </SegmentedControl.Item>
            <SegmentedControl.Item value="list">
              <List className="size-3.5" /> List
            </SegmentedControl.Item>
            <SegmentedControl.Item value="cal">
              <Calendar className="size-3.5" /> Calendar
            </SegmentedControl.Item>
          </SegmentedControl>
        }
        code={`<SegmentedControl defaultValue="grid">
  <SegmentedControl.Item value="grid">
    <LayoutGrid className="size-3.5" /> Grid
  </SegmentedControl.Item>
  …
</SegmentedControl>`}
      />

      <H2>Sizes</H2>
      <PreviewTabs
        preview={
          <div className="flex flex-col items-center gap-3">
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <SegmentedControl key={s} size={s} defaultValue="a">
                <SegmentedControl.Item value="a">Option A</SegmentedControl.Item>
                <SegmentedControl.Item value="b">Option B</SegmentedControl.Item>
              </SegmentedControl>
            ))}
          </div>
        }
        code={`<SegmentedControl size="sm" />
<SegmentedControl size="md" />
<SegmentedControl size="lg" />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          {
            name: 'value',
            type: 'string',
            description: 'Controlled active item value.',
          },
          {
            name: 'defaultValue',
            type: 'string',
            description: 'Uncontrolled initial value.',
          },
          {
            name: 'onValueChange',
            type: '(value: string) => void',
            description: 'Fires when the active item changes.',
          },
          {
            name: 'size',
            type: '"sm" | "md" | "lg"',
            defaultValue: '"md"',
            description: 'Item height + padding.',
          },
        ]}
      />
    </article>
  );
}
