import { useState } from 'react';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { RadioGroup } from '../../components/RadioGroup';
import { Switch } from '../../components/Switch';
import { Select } from '../../components/Select';
import { Label } from '../../components/Label';
import { Section, Demo } from '../Section';

export function Forms() {
  return (
    <Section
      id="forms"
      eyebrow="Tier 4"
      title="Form essentials"
      description="Checkboxes, radios, switches, selects. Native keyboard behavior, type-ahead, and indeterminate states out of the box."
    >
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Demo label="Checkbox — checked, unchecked, indeterminate">
          <CheckboxGroupDemo />
        </Demo>

        <Demo label="Radio group — keyboard arrow nav">
          <RadioDemo />
        </Demo>

        <Demo label="Switch — three sizes, animated thumb">
          <SwitchDemo />
        </Demo>

        <Demo label="Select — keyboard nav, type-ahead, scrollable">
          <SelectDemo />
        </Demo>

        <Demo label="Settings panel — composed example" className="lg:col-span-2">
          <SettingsPanelDemo />
        </Demo>
      </div>
    </Section>
  );
}

function CheckboxGroupDemo() {
  const items = [
    { id: 'a', label: 'Email me on mentions' },
    { id: 'b', label: 'Email me on direct messages' },
    { id: 'c', label: 'Weekly digest', disabled: true },
  ];
  const [checked, setChecked] = useState<Record<string, boolean>>({ a: true, b: false, c: false });
  const allChecked = items.every((i) => checked[i.id]);
  const someChecked = items.some((i) => checked[i.id]);

  return (
    <div className="w-full max-w-xs space-y-3 text-sm">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={allChecked ? true : someChecked ? 'indeterminate' : false}
          onCheckedChange={(v) => {
            const next = !!v;
            setChecked({ a: next, b: next, c: checked.c });
          }}
          id="cb-all"
        />
        <Label htmlFor="cb-all">Select all</Label>
      </div>
      <div className="space-y-2 border-l border-[var(--color-border-base)] pl-4">
        {items.map((i) => (
          <div key={i.id} className="flex items-center gap-3">
            <Checkbox
              id={`cb-${i.id}`}
              checked={!!checked[i.id]}
              onCheckedChange={(v) => setChecked((p) => ({ ...p, [i.id]: !!v }))}
              disabled={i.disabled}
            />
            <Label htmlFor={`cb-${i.id}`}>{i.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadioDemo() {
  return (
    <div className="w-full max-w-xs">
      <RadioGroup defaultValue="comfortable">
        {[
          { v: 'compact',     l: 'Compact' },
          { v: 'comfortable', l: 'Comfortable' },
          { v: 'spacious',    l: 'Spacious' },
        ].map((o) => (
          <div key={o.v} className="flex items-center gap-3">
            <RadioGroup.Item value={o.v} id={`r-${o.v}`} />
            <Label htmlFor={`r-${o.v}`}>{o.l}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

function SwitchDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <div className="w-full max-w-xs space-y-4 text-sm">
      <div className="flex items-center justify-between">
        <Label htmlFor="sw-a">Public profile</Label>
        <Switch id="sw-a" checked={a} onCheckedChange={setA} />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="sw-b">Allow indexing</Label>
        <Switch id="sw-b" checked={b} onCheckedChange={setB} />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="sw-c">Beta features</Label>
        <Switch id="sw-c" defaultChecked size="lg" />
      </div>
    </div>
  );
}

function SelectDemo() {
  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="space-y-1.5">
        <Label>Time zone</Label>
        <Select defaultValue="utc">
          <Select.Trigger>
            <Select.Value placeholder="Pick a timezone" />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Label>Americas</Select.Label>
              <Select.Item value="utc">UTC</Select.Item>
              <Select.Item value="est">Eastern (EST)</Select.Item>
              <Select.Item value="pst">Pacific (PST)</Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.Label>Europe</Select.Label>
              <Select.Item value="bst">London (BST)</Select.Item>
              <Select.Item value="cet">Berlin (CET)</Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.Label>Asia</Select.Label>
              <Select.Item value="ist">Mumbai (IST)</Select.Item>
              <Select.Item value="jst">Tokyo (JST)</Select.Item>
              <Select.Item value="sgt">Singapore (SGT)</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select>
      </div>
    </div>
  );
}

function SettingsPanelDemo() {
  const [tier, setTier] = useState('teams');
  const [billing, setBilling] = useState('annual');
  const [notify, setNotify] = useState(true);

  return (
    <div className="w-full max-w-2xl rounded-[var(--radius-xl)] border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)] p-6">
      <h3 className="text-base font-semibold tracking-[-0.01em]">Workspace settings</h3>
      <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
        Manage your billing and notification preferences.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Plan</Label>
          <Select value={tier} onValueChange={setTier}>
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="individuals">Individuals — free</Select.Item>
              <Select.Item value="teams">Teams — $12/mo</Select.Item>
              <Select.Item value="enterprise">Enterprise — custom</Select.Item>
            </Select.Content>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Billing cycle</Label>
          <RadioGroup value={billing} onValueChange={setBilling} className="flex gap-6">
            <div className="flex items-center gap-2">
              <RadioGroup.Item value="monthly" id="bill-m" />
              <Label htmlFor="bill-m">Monthly</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroup.Item value="annual" id="bill-a" />
              <Label htmlFor="bill-a">
                Annual
                <span className="ml-1 rounded-[var(--radius-sm)] bg-[var(--color-success-soft)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-success)]">
                  -20%
                </span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center justify-between sm:col-span-2 border-t border-[var(--color-border-subtle)] pt-4">
          <div>
            <Label htmlFor="notify-sw">Email notifications</Label>
            <p className="mt-0.5 text-xs text-[var(--color-fg-muted)]">
              Get notified when something needs your attention.
            </p>
          </div>
          <Switch id="notify-sw" checked={notify} onCheckedChange={setNotify} />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button>Save changes</Button>
      </div>
    </div>
  );
}
