import { useState } from 'react';
import { AIDropzone } from '../../../patterns/AIDropzone/AIDropzone';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function AIDropzoneDoc() {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <article>
      <H2>Default — with file preview</H2>
      <P>Drop, browse, or use one of the four quick-action buttons.</P>
      <PreviewTabs
        preview={
          <div className="w-full max-w-2xl mx-auto py-6">
            <AIDropzone
              preview={{
                kind: 'image',
                name: 'image(1).png',
                src: 'https://images.pexels.com/photos/1252814/pexels-photo-1252814.jpeg',
                dragging: true,
              }}
              onFiles={(f) => setFiles(f.map((x) => x.name))}
            />
            {files.length > 0 && (
              <p className="mt-12 text-center text-sm text-[var(--color-fg-muted)]">
                Dropped: <strong>{files.join(', ')}</strong>
              </p>
            )}
          </div>
        }
        minHeight="18rem"
        code={`<AIDropzone
  preview={{
    kind: 'image',
    name: 'image(1).png',
    src: '/uploads/image(1).png',
    dragging: true,
  }}
  onFiles={(files) => upload(files)}
/>`}
      />

      <H2>PDF preview</H2>
      <PreviewTabs
        preview={
          <div className="w-full max-w-2xl mx-auto py-6">
            <AIDropzone
              preview={{ kind: 'pdf', name: 'customer_voice.pdf', dragging: true }}
              onFiles={() => {}}
            />
          </div>
        }
        minHeight="18rem"
        code={`<AIDropzone
  preview={{ kind: 'pdf', name: 'customer_voice.pdf' }}
  accept="application/pdf"
/>`}
      />

      <H2>No preview, custom actions</H2>
      <PreviewTabs
        preview={
          <div className="w-full max-w-2xl mx-auto py-6">
            <AIDropzone
              title="Drop a file or paste a link"
              subtitle="We'll figure out the type."
              actions={null}
              onFiles={() => {}}
            />
          </div>
        }
        minHeight="14rem"
        code={`<AIDropzone
  title="Drop a file or paste a link"
  subtitle="We'll figure out the type."
  actions={null}
/>`}
      />

      <H2>Dark appearance</H2>
      <PreviewTabs
        preview={
          <div className="w-full py-6 rounded-2xl bg-[oklch(8%_0_0)] p-5">
            <AIDropzone
              appearance="dark"
              preview={{ kind: 'pdf', name: 'customer_voice.pdf', dragging: true }}
              onFiles={() => {}}
            />
          </div>
        }
        minHeight="18rem"
        code={`<AIDropzone appearance="dark" preview={{ kind: 'pdf', name: 'customer_voice.pdf' }} />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'title', type: 'ReactNode', defaultValue: '"Drop anything here or browse"', description: 'Big headline.' },
          { name: 'subtitle', type: 'ReactNode', defaultValue: '"Docs, images, videos, audio files, links & more"', description: 'Smaller line under the headline.' },
          { name: 'appearance', type: '"light" | "dark"', description: 'Force a surface tone.' },
          { name: 'actions', type: 'AIDropzoneAction[] | null', description: 'Quick-action icon buttons. Pass null to hide.' },
          { name: 'preview', type: 'AIDropzonePreview', description: 'Show a file preview tile pinned bottom-right.' },
          { name: 'onFiles', type: '(files: File[]) => void', description: 'Fires when the user drops or picks files.' },
          { name: 'accept', type: 'string', description: 'MIME types passed straight to the input.' },
          { name: 'multiple', type: 'boolean', defaultValue: 'true', description: 'Allow multi-select.' },
        ]}
      />
    </article>
  );
}
