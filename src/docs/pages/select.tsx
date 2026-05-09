import { Select } from '../../components/Select';
import { Label } from '../../components/Label';
import { PreviewTabs } from '../PreviewTabs';
import { H2, P, PropsTable } from '../page-kit';

export default function SelectDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>
        Full keyboard navigation, type-ahead, and screen-reader announcements
        — courtesy of Radix.
      </P>
      <PreviewTabs
        preview={
          <div className="w-72 space-y-1.5">
            <Label>Time zone</Label>
            <Select defaultValue="utc">
              <Select.Trigger>
                <Select.Value />
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
              </Select.Content>
            </Select>
          </div>
        }
        code={`<Select defaultValue="utc">
  <Select.Trigger>
    <Select.Value />
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Label>Americas</Select.Label>
      <Select.Item value="utc">UTC</Select.Item>
      <Select.Item value="est">Eastern (EST)</Select.Item>
    </Select.Group>
  </Select.Content>
</Select>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'value', type: 'string', description: 'Controlled selected value.' },
          {
            name: 'defaultValue',
            type: 'string',
            description: 'Uncontrolled initial value.',
          },
          {
            name: 'onValueChange',
            type: '(value: string) => void',
            description: 'Called when the selection changes.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Disable the entire control.',
          },
        ]}
      />
    </article>
  );
}
