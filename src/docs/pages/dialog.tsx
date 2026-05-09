import { Dialog } from '../../components/Dialog';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { PreviewTabs } from '../PreviewTabs';
import { H2, P, PropsTable } from '../page-kit';

export default function DialogDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>
        Dialog handles focus traps, scroll lock, focus restoration, and overlay
        click-to-close out of the box.
      </P>
      <PreviewTabs
        preview={
          <Dialog>
            <Dialog.Trigger asChild>
              <Button>Open Dialog</Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Create project</Dialog.Title>
                <Dialog.Description>
                  Give your project a name. You can change this later.
                </Dialog.Description>
              </Dialog.Header>
              <div className="space-y-1.5">
                <Label htmlFor="proj">Name</Label>
                <Input id="proj" placeholder="My awesome project" />
              </div>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="secondary">Cancel</Button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Button>Create</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog>
        }
        code={`import { Dialog, Button, Input, Label } from '@zui/react';

<Dialog>
  <Dialog.Trigger asChild>
    <Button>Open Dialog</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Create project</Dialog.Title>
      <Dialog.Description>Give your project a name.</Dialog.Description>
    </Dialog.Header>
    <Label htmlFor="proj">Name</Label>
    <Input id="proj" placeholder="My awesome project" />
    <Dialog.Footer>
      <Dialog.Close asChild><Button variant="secondary">Cancel</Button></Dialog.Close>
      <Dialog.Close asChild><Button>Create</Button></Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          {
            name: 'open',
            type: 'boolean',
            description: 'Controlled open state.',
          },
          {
            name: 'onOpenChange',
            type: '(open: boolean) => void',
            description: 'Called when the dialog wants to open or close.',
          },
          {
            name: 'modal',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Whether to trap focus and block underlying content.',
          },
        ]}
      />
      <P>
        Compound members: <code>Dialog.Trigger</code>, <code>Dialog.Content</code>,{' '}
        <code>Dialog.Header</code>, <code>Dialog.Title</code>,{' '}
        <code>Dialog.Description</code>, <code>Dialog.Footer</code>,{' '}
        <code>Dialog.Close</code>, <code>Dialog.Overlay</code>.
      </P>
    </article>
  );
}
