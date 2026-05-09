import { Switch } from '../../components/Switch';
import { Label } from '../../components/Label';
import { PreviewTabs } from '../PreviewTabs';
import { H2, P, PropsTable } from '../page-kit';

export default function SwitchDoc() {
  return (
    <article>
      <H2>Default</H2>
      <PreviewTabs
        preview={
          <div className="flex items-center gap-3">
            <Switch id="sw" defaultChecked />
            <Label htmlFor="sw">Email notifications</Label>
          </div>
        }
        code={`<Switch id="sw" defaultChecked />
<Label htmlFor="sw">Email notifications</Label>`}
      />

      <H2>Sizes</H2>
      <PreviewTabs
        preview={
          <div className="flex items-center gap-3">
            <Switch size="sm" defaultChecked />
            <Switch size="md" defaultChecked />
            <Switch size="lg" defaultChecked />
          </div>
        }
        code={`<Switch size="sm" />
<Switch size="md" />
<Switch size="lg" />`}
      />

      <H2>Tones</H2>
      <P>Pick the color the switch turns when checked.</P>
      <PreviewTabs
        preview={
          <div className="flex items-center gap-3">
            <Switch tone="accent" defaultChecked />
            <Switch tone="success" defaultChecked />
            <Switch tone="warning" defaultChecked />
            <Switch tone="danger" defaultChecked />
          </div>
        }
        code={`<Switch tone="accent" />
<Switch tone="success" />
<Switch tone="warning" />
<Switch tone="danger" />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          {
            name: 'size',
            type: '"sm" | "md" | "lg"',
            defaultValue: '"md"',
            description: 'Switch height.',
          },
          {
            name: 'tone',
            type: '"accent" | "success" | "warning" | "danger"',
            defaultValue: '"accent"',
            description: 'Color when checked.',
          },
          {
            name: 'checked',
            type: 'boolean',
            description: 'Controlled checked state.',
          },
          {
            name: 'onCheckedChange',
            type: '(checked: boolean) => void',
            description: 'Fires when the switch is toggled.',
          },
        ]}
      />
    </article>
  );
}
