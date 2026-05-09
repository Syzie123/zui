import { Button } from '../../components/Button';
import { useToast } from '../../components/Toast';
import { PreviewTabs } from '../PreviewTabs';
import { H2, P, PropsTable } from '../page-kit';

export default function ToastDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>
        Wrap your app in <code>&lt;ToastProvider&gt;</code>, then call{' '}
        <code>toast()</code> from anywhere via the <code>useToast()</code> hook.
      </P>
      <PreviewTabs
        preview={<ToastDemo />}
        code={`import { ToastProvider, useToast } from '@zui.react/zui';

function App() {
  return (
    <ToastProvider position="bottom-right">
      <Demo />
    </ToastProvider>
  );
}

function Demo() {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({
      title: 'Workspace updated',
      description: 'Changes synced to your team.',
      tone: 'success',
    })}>
      Show toast
    </Button>
  );
}`}
      />

      <H2>Tones</H2>
      <P>
        Five tones — <code>neutral</code>, <code>success</code>,{' '}
        <code>warning</code>, <code>danger</code>, <code>info</code>.
      </P>
      <PreviewTabs
        preview={<TonesDemo />}
        code={`toast({ title: 'Saved', tone: 'success' });
toast({ title: 'Failed to save', tone: 'danger', action: { label: 'Retry', onClick: retry } });
toast({ title: 'New release', tone: 'info' });`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          {
            name: 'title',
            type: 'ReactNode',
            description: 'Bold heading line of the toast.',
          },
          {
            name: 'description',
            type: 'ReactNode',
            description: 'Secondary line of body copy.',
          },
          {
            name: 'tone',
            type: '"neutral" | "success" | "warning" | "danger" | "info"',
            defaultValue: '"neutral"',
            description: 'Color + leading icon.',
          },
          {
            name: 'duration',
            type: 'number',
            defaultValue: '5000',
            description:
              'Milliseconds before auto-dismiss. Pass `Infinity` to keep open.',
          },
          {
            name: 'action',
            type: '{ label: string; onClick: () => void }',
            description: 'Secondary button rendered next to the description.',
          },
        ]}
      />
    </article>
  );
}

function ToastDemo() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: 'Workspace updated',
          description: 'Changes synced to your team.',
          tone: 'success',
        })
      }
    >
      Show toast
    </Button>
  );
}

function TonesDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      {(['neutral', 'success', 'warning', 'danger', 'info'] as const).map((t) => (
        <Button
          key={t}
          variant="secondary"
          size="sm"
          onClick={() =>
            toast({
              title: t.charAt(0).toUpperCase() + t.slice(1),
              description: `This is a ${t} toast.`,
              tone: t,
            })
          }
        >
          {t}
        </Button>
      ))}
    </div>
  );
}
