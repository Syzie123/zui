import { useState } from 'react';
import { Switch3D } from '../../../patterns/Switch3D/Switch3D';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function Switch3DDoc() {
  const [on, setOn] = useState(true);

  return (
    <article>
      <H2>Default</H2>
      <P>Recessed track, raised thumb, single horizontal slide. Uncontrolled by default.</P>
      <PreviewTabs
        preview={
          <div className="flex flex-wrap items-center justify-center gap-6 py-12">
            <Switch3D defaultChecked />
            <Switch3D />
          </div>
        }
        minHeight="10rem"
        code={`<Switch3D defaultChecked />
<Switch3D />`}
      />

      <H2>Controlled</H2>
      <P>Pass <code>checked</code> + <code>onChange</code> for full control.</P>
      <PreviewTabs
        preview={
          <div className="flex flex-col items-center gap-4 py-12">
            <Switch3D checked={on} onChange={setOn} />
            <span className="text-sm text-[var(--color-fg-muted)]">
              Notifications: <strong>{on ? 'on' : 'off'}</strong>
            </span>
          </div>
        }
        minHeight="10rem"
        code={`const [on, setOn] = useState(true);
<Switch3D checked={on} onChange={setOn} />`}
      />

      <H2>Custom labels</H2>
      <PreviewTabs
        preview={
          <div className="flex flex-wrap items-center justify-center gap-6 py-12">
            <Switch3D defaultChecked labels={{ on: 'YES', off: 'NO' }} />
            <Switch3D labels={{ on: '24h', off: '12h' }} />
            <Switch3D defaultChecked showLabel={false} />
          </div>
        }
        minHeight="10rem"
        code={`<Switch3D labels={{ on: 'YES', off: 'NO' }} />
<Switch3D labels={{ on: '24h', off: '12h' }} />
<Switch3D showLabel={false} />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'checked', type: 'boolean', description: 'Controlled value.' },
          { name: 'defaultChecked', type: 'boolean', defaultValue: 'false', description: 'Initial value when uncontrolled.' },
          { name: 'onChange', type: '(next: boolean) => void', description: 'Fires after the user toggles.' },
          { name: 'labels', type: '{ on?: string; off?: string }', defaultValue: '{ on: "ON", off: "OFF" }', description: 'Custom labels — pass empty strings to hide.' },
          { name: 'showLabel', type: 'boolean', defaultValue: 'true', description: 'Show ON/OFF text inside the thumb and track edges.' },
          { name: 'disabled', type: 'boolean', description: 'Block interaction.' },
        ]}
      />
    </article>
  );
}
