import {
  Calendar,
  Code2,
  Mail,
  MessageCircle,
  Music,
  Settings,
  ShoppingBag,
  Image as ImageIcon,
} from 'lucide-react';
import { Dock, DockItem } from '../../../components/effects/Dock/Dock';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

const ICONS = [
  { Icon: Mail,          label: 'Mail',     color: 'oklch(72% 0.20 240)' },
  { Icon: MessageCircle, label: 'Messages', color: 'oklch(72% 0.20 145)' },
  { Icon: Calendar,      label: 'Calendar', color: 'oklch(70% 0.22 25)'  },
  { Icon: ImageIcon,     label: 'Photos',   color: 'oklch(72% 0.20 320)' },
  { Icon: Music,         label: 'Music',    color: 'oklch(72% 0.22 30)'  },
  { Icon: ShoppingBag,   label: 'Store',    color: 'oklch(72% 0.20 200)' },
  { Icon: Code2,         label: 'Code',     color: 'oklch(72% 0.20 285)' },
  { Icon: Settings,      label: 'Settings', color: 'oklch(70% 0 0)'      },
];

export default function DockDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>
        Move your cursor over the dock — icons within range scale up smoothly
        with an ease-out sine curve. No React state per item, just a CSS
        variable per icon set on <code>pointermove</code>.
      </P>
      <PreviewTabs
        preview={
          <Dock>
            {ICONS.map(({ Icon, label, color }) => (
              <DockItem
                key={label}
                aria-label={label}
                style={{ background: color }}
              >
                <Icon className="size-5 text-white" />
              </DockItem>
            ))}
          </Dock>
        }
        minHeight="12rem"
        code={`import { Dock, DockItem } from '@zui.react/zui';
import { Mail, Calendar, Music } from 'lucide-react';

<Dock>
  <DockItem><Mail className="size-5" /></DockItem>
  <DockItem><Calendar className="size-5" /></DockItem>
  <DockItem><Music className="size-5" /></DockItem>
</Dock>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          {
            name: 'magnification',
            type: 'number',
            defaultValue: '140',
            description: 'Distance from cursor (px) over which icons magnify.',
          },
          {
            name: 'maxScale',
            type: 'number',
            defaultValue: '1.7',
            description: 'Maximum scale at the cursor center.',
          },
        ]}
      />
    </article>
  );
}
