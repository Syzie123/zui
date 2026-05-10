import { Hash, Sparkles, Wand2 } from 'lucide-react';
import { AIGenerating } from '../../../patterns/AIGenerating/AIGenerating';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

const TEXT =
  "Designing my way through the chaos, endless coffee refills, and late-night inspiration. Some days it's all about the details; other days, it's just about surviving the creative proce";

export default function AIGeneratingDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>Gradient header, streaming text with caret, and action chips.</P>
      <PreviewTabs
        preview={
          <div className="w-full max-w-xl mx-auto py-6">
            <AIGenerating
              text={TEXT}
              chips={[
                { icon: <Hash className="size-3.5" />, label: 'Add hashtag' },
                { icon: <Sparkles className="size-3.5" />, label: 'Gen-Z language' },
              ]}
              onStop={() => {}}
            />
          </div>
        }
        minHeight="20rem"
        code={`<AIGenerating
  text="Designing my way through the chaos, endless coffee refills..."
  chips={[
    { icon: <Hash />,     label: 'Add hashtag' },
    { icon: <Sparkles />, label: 'Gen-Z language' },
  ]}
  onStop={() => stopStream()}
/>`}
      />

      <H2>Presets</H2>
      <PreviewTabs
        preview={
          <div className="grid w-full grid-cols-1 gap-5 py-6 md:grid-cols-2">
            <AIGenerating
              preset="aurora"
              status="THINKING…"
              text="Looking up nearby cafes…"
              chips={[{ icon: <Wand2 className="size-3.5" />, label: 'Refine' }]}
            />
            <AIGenerating
              preset="sunrise"
              status="DRAFTING…"
              text="A morning post for the launch announcement…"
            />
            <AIGenerating
              preset="mono"
              status="COMPILING…"
              text="Bundling the workspace…"
            />
            <AIGenerating
              gradient="linear-gradient(100deg, oklch(60% 0.20 320), oklch(40% 0.20 270))"
              status="REMIXING…"
              text="Trying a different tone…"
            />
          </div>
        }
        minHeight="32rem"
        code={`<AIGenerating preset="aurora"  status="THINKING…"  text="..." />
<AIGenerating preset="sunrise" status="DRAFTING…"  text="..." />
<AIGenerating preset="mono"    status="COMPILING…" text="..." />
<AIGenerating
  gradient="linear-gradient(100deg, oklch(60% 0.20 320), oklch(40% 0.20 270))"
  status="REMIXING…"
/>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'status', type: 'ReactNode', defaultValue: '"GENERATING…"', description: 'Status text in the gradient header.' },
          { name: 'preset', type: '"gradient" | "aurora" | "sunrise" | "mono"', defaultValue: '"gradient"', description: 'Header gradient preset.' },
          { name: 'gradient', type: 'string', description: 'Custom gradient — set as background-image directly.' },
          { name: 'text', type: 'string', description: 'Streaming text body. Pair with the auto-caret.' },
          { name: 'caret', type: 'boolean', defaultValue: 'true', description: 'Show the typing caret at the end of `text`.' },
          { name: 'spinner', type: 'boolean', defaultValue: 'true', description: 'Show the small spinner next to the status.' },
          { name: 'chips', type: 'AIGeneratingChip[]', description: 'Action chips at the bottom of the body.' },
          { name: 'onStop', type: '() => void', description: 'Stop button click. Hidden if not set.' },
        ]}
      />
    </article>
  );
}
