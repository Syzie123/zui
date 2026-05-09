import { AlertCircle, BellRing, FileText, Trash2, Upload } from 'lucide-react';
import { Button } from '../../components/Button';
import { Dialog } from '../../components/Dialog';
import { AlertDialog } from '../../components/AlertDialog';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { Textarea } from '../../components/Textarea';
import { useToast } from '../../components/Toast';
import { Section, Demo } from '../Section';

export function Dialogs() {
  return (
    <Section
      id="dialogs"
      eyebrow="Tier 3"
      title="Modal layer"
      description="Focus traps, scroll lock, focus restoration. Show modals without breaking accessibility."
    >
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <Demo label="Dialog — modal with form">
          <CreateProjectDialog />
        </Demo>

        <Demo label="Alert Dialog — destructive confirmation">
          <DeleteAccountDialog />
        </Demo>

        <Demo label="Toast — neutral, success, danger, info">
          <ToastShowcase />
        </Demo>

        <Demo label="Dialog — wide content with scrollable body">
          <ImportDialog />
        </Demo>
      </div>
    </Section>
  );
}

function CreateProjectDialog() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button leftIcon={<FileText className="size-4" />}>New project</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Create project</Dialog.Title>
          <Dialog.Description>
            Give your project a name and a short description. You can change these later.
          </Dialog.Description>
        </Dialog.Header>
        <form className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="proj-name" required>
              Name
            </Label>
            <Input id="proj-name" placeholder="My awesome project" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="proj-desc" hint="(optional)">
              Description
            </Label>
            <Textarea
              id="proj-desc"
              placeholder="What is this project about?"
              rows={3}
            />
          </div>
        </form>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="secondary">Cancel</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button>Create project</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}

function DeleteAccountDialog() {
  return (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <Button variant="destructive" leftIcon={<Trash2 className="size-4" />}>
          Delete account
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <div className="mb-2 inline-flex size-10 items-center justify-center rounded-full bg-[var(--color-danger-soft)]">
            <AlertCircle className="size-5 text-[var(--color-danger)]" />
          </div>
          <AlertDialog.Title>Delete this account?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. All projects, integrations, and billing history will be
            permanently deleted.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel asChild>
            <Button variant="secondary">Keep account</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button variant="destructive">Yes, delete it</Button>
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}

function ToastShowcase() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast({
            title: 'Workspace updated',
            description: 'Changes will sync across your team.',
            tone: 'success',
          })
        }
      >
        Success
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast({
            title: 'Failed to save',
            description: 'Check your connection and try again.',
            tone: 'danger',
            action: { label: 'Retry', onClick: () => {} },
          })
        }
      >
        Danger
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast({
            title: 'New release available',
            description: 'v0.2 is ready to install.',
            tone: 'info',
          })
        }
      >
        Info
      </Button>
      <Button
        variant="secondary"
        size="sm"
        leftIcon={<BellRing className="size-4" />}
        onClick={() =>
          toast({
            title: 'Reminder',
            description: 'Daily standup in 5 minutes.',
          })
        }
      >
        Neutral
      </Button>
    </div>
  );
}

function ImportDialog() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="secondary" leftIcon={<Upload className="size-4" />}>
          Import customers
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-lg">
        <Dialog.Header>
          <Dialog.Title>Import customers</Dialog.Title>
          <Dialog.Description>
            Upload a CSV file or import directly from Google Sheets.
          </Dialog.Description>
        </Dialog.Header>

        <div
          className="
            relative my-2 flex flex-col items-center justify-center gap-2
            rounded-[var(--radius-xl)] border-2 border-dashed border-[var(--color-border-strong)]
            bg-[var(--color-bg-subtle)] px-6 py-10 text-center
            transition-[border-color,background-color] duration-[var(--duration-fast)]
            hover:border-[var(--color-accent-base)] hover:bg-[var(--color-accent-soft)]
          "
        >
          <Upload className="size-6 text-[var(--color-fg-subtle)]" />
          <p className="text-sm font-medium">Drag a CSV here to import</p>
          <p className="text-xs text-[var(--color-fg-muted)]">or click to browse (4 MB max)</p>
          <Button size="sm" variant="secondary" className="mt-2">
            Select files
          </Button>
        </div>

        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="secondary">Cancel</Button>
          </Dialog.Close>
          <Button>Import customers</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
