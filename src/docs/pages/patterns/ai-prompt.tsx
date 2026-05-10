import { useState } from 'react';
import {
  FileText,
  Languages,
  MousePointer2,
  Search,
  Sparkles,
  Wand2,
} from 'lucide-react';
import { AIPrompt } from '../../../patterns/AIPrompt/AIPrompt';
import {
  CursorIcon,
  ZoomIcon,
} from '../../../components/icons/brand';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function AIPromptDoc() {
  const [streaming, setStreaming] = useState(false);

  return (
    <article>
      <H2>Compose</H2>
      <P>The default state — model picker, tool icons, mic, send.</P>
      <PreviewTabs
        preview={
          <div className="w-full max-w-2xl mx-auto py-6">
            <AIPrompt
              tags={[
                {
                  icon: <ZoomIcon size={16} />,
                  label: 'Onboarding call wit…',
                  suffix: 'Today',
                  onRemove: () => {},
                },
              ]}
              defaultValue="create a summary web page"
              model={{ icon: <CursorIcon size={16} />, label: 'Cursor: GPT-5.2' }}
              tools={[
                { icon: <Sparkles className="size-4" />, label: 'Refine' },
                { icon: <Search className="size-4" />, label: 'Search' },
                { icon: <MousePointer2 className="size-4" />, label: 'Select' },
              ]}
              onVoice={() => {}}
              onSubmit={() => {}}
            />
          </div>
        }
        minHeight="14rem"
        code={`<AIPrompt
  tags={[{ icon: <ZoomIcon />, label: 'Onboarding call', suffix: 'Today' }]}
  defaultValue="create a summary web page"
  model={{ icon: <CursorIcon />, label: 'Cursor: GPT-5.2' }}
  tools={[
    { icon: <Sparkles />, label: 'Refine' },
    { icon: <Search />,   label: 'Search' },
    { icon: <Cursor />,   label: 'Select' },
  ]}
  onVoice={() => startRecording()}
  onSubmit={(value) => send(value)}
/>`}
      />

      <H2>Follow-up</H2>
      <P>The secondary state — cancel, suggestion chips, mic, stop.</P>
      <PreviewTabs
        preview={
          <div className="w-full max-w-2xl mx-auto py-6">
            <AIPrompt
              mode="followup"
              suggestions={[
                {
                  icon: <FileText className="size-4" />,
                  label: 'Generate a document',
                },
                {
                  icon: <Languages className="size-4" />,
                  label: 'Translate to…',
                },
                { icon: <Wand2 className="size-4" />, label: 'Rewrite' },
              ]}
              onCancel={() => {}}
              onVoice={() => {}}
              state="streaming"
              onStop={() => {}}
            />
          </div>
        }
        minHeight="14rem"
        code={`<AIPrompt
  mode="followup"
  suggestions={[
    { icon: <FileText />,  label: 'Generate a document' },
    { icon: <Languages />, label: 'Translate to…' },
    { icon: <Wand2 />,     label: 'Rewrite' },
  ]}
  onCancel={() => closeFollowup()}
  state="streaming"
  onStop={() => stopStream()}
/>`}
      />

      <H2>Streaming toggle</H2>
      <P>Flip <code>state</code> to <code>"streaming"</code> and the send button becomes a stop button.</P>
      <PreviewTabs
        preview={
          <div className="w-full max-w-2xl mx-auto py-6">
            <AIPrompt
              defaultValue="Hello"
              model={{ icon: <CursorIcon size={16} />, label: 'GPT-5.2' }}
              state={streaming ? 'streaming' : 'idle'}
              onSubmit={() => setStreaming(true)}
              onStop={() => setStreaming(false)}
              onVoice={() => {}}
            />
            <div className="mt-4 text-center text-sm text-[var(--color-fg-muted)]">
              Status: <strong>{streaming ? 'streaming' : 'idle'}</strong>
            </div>
          </div>
        }
        minHeight="14rem"
        code={`const [streaming, setStreaming] = useState(false);
<AIPrompt
  state={streaming ? 'streaming' : 'idle'}
  onSubmit={() => setStreaming(true)}
  onStop={() => setStreaming(false)}
/>`}
      />

      <H2>Dark appearance</H2>
      <P>Force a dark surface independent of theme via <code>appearance="dark"</code>.</P>
      <PreviewTabs
        preview={
          <div className="w-full max-w-2xl mx-auto py-6 rounded-2xl bg-[oklch(8%_0_0)] p-5">
            <AIPrompt
              appearance="dark"
              tags={[
                {
                  icon: <ZoomIcon size={16} />,
                  label: 'Onboarding call wit…',
                  suffix: 'Today',
                  onRemove: () => {},
                },
              ]}
              defaultValue="create a summary web page"
              model={{ icon: <CursorIcon size={16} />, label: 'Cursor: GPT-5.2' }}
              tools={[
                { icon: <Sparkles className="size-4" />, label: 'Refine' },
                { icon: <MousePointer2 className="size-4" />, label: 'Select' },
              ]}
              onVoice={() => {}}
            />
          </div>
        }
        minHeight="14rem"
        code={`<AIPrompt appearance="dark" {...rest} />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'mode', type: '"compose" | "followup"', defaultValue: '"compose"', description: 'Layout mode.' },
          { name: 'appearance', type: '"light" | "dark"', description: 'Force a surface tone independent of theme.' },
          { name: 'value', type: 'string', description: 'Controlled input value.' },
          { name: 'defaultValue', type: 'string', description: 'Initial value when uncontrolled.' },
          { name: 'onChange', type: '(v: string) => void', description: 'Fires on every keystroke.' },
          { name: 'onSubmit', type: '(v: string) => void', description: 'Fires on Enter or Send click.' },
          { name: 'placeholder', type: 'string', description: 'Override the placeholder.' },
          { name: 'tags', type: 'AIPromptTag[]', description: 'Pills above the input — @-mentions, attached docs.' },
          { name: 'model', type: '{ icon, label, onClick }', description: 'Model picker pill (compose mode).' },
          { name: 'tools', type: 'AIPromptTool[]', description: 'Tool icon row (compose mode).' },
          { name: 'suggestions', type: 'AIPromptSuggestion[]', description: 'Chip row (followup mode).' },
          { name: 'onCancel', type: '() => void', description: 'Cancel button (followup mode).' },
          { name: 'onVoice', type: '(() => void) | null', description: 'Mic click handler. Pass null to hide.' },
          { name: 'voiceActive', type: 'boolean', description: 'Mark mic button as active.' },
          { name: 'state', type: '"idle" | "streaming"', defaultValue: '"idle"', description: 'When streaming, send becomes a stop button.' },
          { name: 'onStop', type: '() => void', description: 'Stop click while streaming.' },
        ]}
      />
    </article>
  );
}
