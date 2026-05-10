import { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import { AIMessage } from '../../../patterns/AIMessage/AIMessage';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function AIMessageDoc() {
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(null);

  return (
    <article>
      <H2>Conversation</H2>
      <P>Stack <code>user</code> + <code>assistant</code> bubbles. Add reactions on the assistant.</P>
      <PreviewTabs
        preview={
          <div className="w-full max-w-xl mx-auto py-6 flex flex-col gap-4">
            <AIMessage role="user" name="You" avatar="Y">
              Hi, I've been curious about meditation, but honestly, I don't really know where to start. Can you help me with that?
            </AIMessage>
            <AIMessage
              role="assistant"
              name="Sense"
              avatar={<span className="font-extrabold text-[10px]">S</span>}
            >
              Absolutely 🌿 Meditation is just about being present and gentle with yourself. Let's start simple — I'll guide you.
              <AIMessage.Reactions
                reaction={reaction}
                onLike={() => setReaction(reaction === 'like' ? null : 'like')}
                onDislike={() => setReaction(reaction === 'dislike' ? null : 'dislike')}
              >
                <AIMessage.Action icon={<Copy className="size-3.5" />}>
                  Copy
                </AIMessage.Action>
                <AIMessage.Action icon={<RefreshCw className="size-3.5" />}>
                  Regenerate
                </AIMessage.Action>
              </AIMessage.Reactions>
            </AIMessage>
          </div>
        }
        minHeight="20rem"
        code={`<AIMessage role="user" name="You" avatar="Y">
  Hi, I've been curious about meditation, but honestly, I don't really know where to start.
</AIMessage>

<AIMessage role="assistant" name="Sense" avatar={<S />}>
  Absolutely 🌿 Meditation is just about being present and gentle with yourself.
  <AIMessage.Reactions
    reaction={reaction}
    onLike={() => setReaction('like')}
    onDislike={() => setReaction('dislike')}
  >
    <AIMessage.Action icon={<Copy />}>Copy</AIMessage.Action>
    <AIMessage.Action icon={<RefreshCw />}>Regenerate</AIMessage.Action>
  </AIMessage.Reactions>
</AIMessage>`}
      />

      <H2>Panel variant</H2>
      <P>Use <code>variant="panel"</code> for the larger, dotted-pattern chat panel.</P>
      <PreviewTabs
        preview={
          <div className="w-full max-w-xl mx-auto py-6 flex flex-col gap-4">
            <AIMessage role="user" name="You" variant="panel">
              Hi, I've been curious about meditation, but honestly, I don't really know where to start.
            </AIMessage>
            <AIMessage role="assistant" name="Sense" variant="panel">
              Absolutely 🌿 Meditation is just about being present and gentle with yourself.
            </AIMessage>
          </div>
        }
        minHeight="18rem"
        code={`<AIMessage role="user" name="You" variant="panel">...</AIMessage>
<AIMessage role="assistant" name="Sense" variant="panel">...</AIMessage>`}
      />

      <H2>System line</H2>
      <PreviewTabs
        preview={
          <div className="w-full max-w-xl mx-auto py-6">
            <AIMessage role="system" showHeader={false}>
              Sense started a new session.
            </AIMessage>
          </div>
        }
        minHeight="8rem"
        code={`<AIMessage role="system" showHeader={false}>
  Sense started a new session.
</AIMessage>`}
      />

      <H2>API — root</H2>
      <PropsTable
        rows={[
          { name: 'role', type: '"user" | "assistant" | "system"', description: 'Drives alignment + color.' },
          { name: 'avatar', type: 'ReactNode', description: 'Avatar — image URL or any node.' },
          { name: 'name', type: 'ReactNode', description: 'Header label.' },
          { name: 'showHeader', type: 'boolean', defaultValue: 'true', description: 'Show name + avatar row.' },
          { name: 'variant', type: '"bubble" | "plain" | "panel"', defaultValue: '"bubble"', description: 'Visual style of the message body.' },
          { name: 'appearance', type: '"light" | "dark"', description: 'Force a surface tone.' },
        ]}
      />

      <H2>API — Reactions</H2>
      <PropsTable
        rows={[
          { name: 'reaction', type: '"like" | "dislike" | null', description: 'Currently active reaction.' },
          { name: 'onLike', type: '() => void', description: 'Like click handler.' },
          { name: 'onDislike', type: '() => void', description: 'Dislike click handler.' },
        ]}
      />
    </article>
  );
}
