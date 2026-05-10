import { useState } from 'react';
import { AIRecorder, type AIRecorderState } from '../../../patterns/AIRecorder/AIRecorder';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function AIRecorderDoc() {
  const [state, setState] = useState<AIRecorderState>('recording');

  return (
    <article>
      <H2>Default — auto-tick</H2>
      <P>Drop it in uncontrolled and the timer ticks once per second while <code>state === "recording"</code>.</P>
      <PreviewTabs
        preview={
          <div className="w-full max-w-xl mx-auto py-8">
            <AIRecorder
              defaultSeconds={261}
              state={state}
              onTogglePause={(next) => setState(next)}
              onCancel={() => setState('idle')}
              onConfirm={() => setState('idle')}
            />
          </div>
        }
        minHeight="14rem"
        code={`const [state, setState] = useState('recording');
<AIRecorder
  defaultSeconds={0}
  state={state}
  onTogglePause={(next) => setState(next)}
  onCancel={() => setState('idle')}
  onConfirm={() => save()}
/>`}
      />

      <H2>Static — controlled value</H2>
      <PreviewTabs
        preview={
          <div className="w-full max-w-xl mx-auto py-8">
            <AIRecorder
              prompt="Recording your voice memo"
              seconds={75}
              state="paused"
              autoTick={false}
            />
          </div>
        }
        minHeight="14rem"
        code={`<AIRecorder
  prompt="Recording your voice memo"
  seconds={75}
  state="paused"
  autoTick={false}
/>`}
      />

      <H2>Dark appearance</H2>
      <PreviewTabs
        preview={
          <div className="w-full py-8 rounded-2xl bg-[oklch(8%_0_0)] p-5">
            <AIRecorder
              appearance="dark"
              defaultSeconds={261}
            />
          </div>
        }
        minHeight="14rem"
        code={`<AIRecorder appearance="dark" defaultSeconds={261} />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'prompt', type: 'ReactNode', defaultValue: '"Go ahead, record a quick note"', description: 'Text shown above the timer.' },
          { name: 'appearance', type: '"light" | "dark"', description: 'Force a surface tone.' },
          { name: 'state', type: '"recording" | "paused" | "idle"', defaultValue: '"recording"', description: 'Drives the dot pulse and pause/play icon.' },
          { name: 'seconds', type: 'number', description: 'Controlled duration in seconds.' },
          { name: 'defaultSeconds', type: 'number', defaultValue: '0', description: 'Initial duration when uncontrolled.' },
          { name: 'autoTick', type: 'boolean', defaultValue: 'true', description: 'Tick the timer once per second while recording.' },
          { name: 'onTogglePause', type: '(next: AIRecorderState) => void', description: 'Pause/resume click — receives the next state.' },
          { name: 'onCancel', type: '() => void', description: 'Cancel button click.' },
          { name: 'onConfirm', type: '() => void', description: 'Confirm (check) click — typically saves the recording.' },
        ]}
      />
    </article>
  );
}
