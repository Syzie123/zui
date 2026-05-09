import { useState } from 'react';
import { Eye, EyeOff, Mail, Search } from 'lucide-react';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { PreviewTabs } from '../PreviewTabs';
import { H2, H3, P, PropsTable } from '../page-kit';

export default function InputDoc() {
  return (
    <article>
      <H2>Default</H2>
      <PreviewTabs
        preview={
          <div className="w-72 space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@company.com" />
          </div>
        }
        code={`import { Input, Label } from '@zui.react/zui';

<div className="space-y-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@company.com" />
</div>`}
      />

      <H2>Sizes</H2>
      <PreviewTabs
        preview={
          <div className="w-72 space-y-2">
            <Input size="sm" placeholder="Small input" />
            <Input size="md" placeholder="Medium input" />
            <Input size="lg" placeholder="Large input" />
          </div>
        }
        code={`<Input size="sm" placeholder="Small input" />
<Input size="md" placeholder="Medium input" />
<Input size="lg" placeholder="Large input" />`}
      />

      <H2>Prefix and suffix</H2>
      <P>Drop any node into the leading or trailing slot — icons, kbd, buttons.</P>
      <PreviewTabs
        preview={
          <div className="w-72 space-y-2">
            <Input
              prefix={<Mail className="size-4" />}
              placeholder="you@company.com"
            />
            <Input
              prefix={<Search className="size-4" />}
              placeholder="Search…"
              suffix={
                <kbd className="rounded border border-[var(--color-border-base)] bg-[var(--color-bg-subtle)] px-1.5 py-0.5 text-[10px]">
                  ⌘K
                </kbd>
              }
            />
            <PasswordField />
          </div>
        }
        code={`<Input prefix={<Mail className="size-4" />} placeholder="you@company.com" />

<Input
  prefix={<Search className="size-4" />}
  placeholder="Search…"
  suffix={<kbd>⌘K</kbd>}
/>`}
      />

      <H2>Invalid state</H2>
      <PreviewTabs
        preview={
          <div className="w-72 space-y-1.5">
            <Label htmlFor="bad">Workspace name</Label>
            <Input id="bad" defaultValue="my workspace" invalid />
            <p className="text-xs text-[var(--color-danger)]">
              Spaces are not allowed.
            </p>
          </div>
        }
        code={`<Input invalid defaultValue="my workspace" />`}
      />

      <H2>API</H2>
      <H3>Input</H3>
      <PropsTable
        rows={[
          {
            name: 'size',
            type: '"sm" | "md" | "lg"',
            defaultValue: '"md"',
            description: 'Input height + padding.',
          },
          {
            name: 'invalid',
            type: 'boolean',
            description: 'Apply error styling and aria-invalid.',
          },
          {
            name: 'prefix',
            type: 'ReactNode',
            description: 'Element rendered inside the field, before the input.',
          },
          {
            name: 'suffix',
            type: 'ReactNode',
            description: 'Element rendered inside the field, after the input.',
          },
          {
            name: 'wrapperClassName',
            type: 'string',
            description: 'Class for the outer wrapper (border / sizing).',
          },
        ]}
      />
    </article>
  );
}

function PasswordField() {
  const [show, setShow] = useState(false);
  return (
    <Input
      type={show ? 'text' : 'password'}
      defaultValue="hunter2"
      suffix={
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="rounded p-0.5 text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-base)]"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      }
    />
  );
}
