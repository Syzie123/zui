import {
  Calendar,
  FolderOpen,
  Layers,
  Sparkles,
} from 'lucide-react';
import { AIGreeting } from '../../../patterns/AIGreeting/AIGreeting';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function AIGreetingDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>Orb, big greeting, three cards, four quick-action pills.</P>
      <PreviewTabs
        preview={
          <div className="w-full py-8">
            <AIGreeting>
              <AIGreeting.Cards>
                <AIGreeting.Card
                  variant="dark"
                  avatar={<span style={{ color: '#cdd' }}>S</span>}
                  badge="Data Assistant"
                >
                  Designed to help manage sales processes and maximize customer engagement.
                </AIGreeting.Card>
                <AIGreeting.Card
                  variant="panel"
                  footer="Tasks"
                  footerAction="View All"
                >
                  <div className="flex flex-col gap-2 text-[13px]">
                    <span className="flex items-center gap-2">
                      <span className="size-3 rounded-sm bg-[oklch(94%_0.04_240)]" />
                      Answer RFP documentation
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="size-3 rounded-sm bg-[oklch(94%_0.04_240)]" />
                      Conduct a competitor analysis
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="size-3 rounded-sm bg-[oklch(94%_0.04_240)]" />
                      Provide feedback on communication
                    </span>
                  </div>
                </AIGreeting.Card>
                <AIGreeting.Card
                  variant="prompt"
                  footer="Suggested prompt"
                >
                  What are the key benefits of Product 1 that I should highlight to potential clients?
                </AIGreeting.Card>
              </AIGreeting.Cards>

              <AIGreeting.Pills>
                <AIGreeting.Pill
                  tone="pink"
                  icon={<Calendar className="size-3.5" />}
                >
                  Connect Calendar
                </AIGreeting.Pill>
                <AIGreeting.Pill
                  tone="blue"
                  icon={<Sparkles className="size-3.5" />}
                >
                  Demo Task
                </AIGreeting.Pill>
                <AIGreeting.Pill
                  tone="amber"
                  icon={<Layers className="size-3.5" />}
                >
                  Browse Integrations
                </AIGreeting.Pill>
                <AIGreeting.Pill
                  tone="teal"
                  icon={<FolderOpen className="size-3.5" />}
                >
                  Shared in Notes
                </AIGreeting.Pill>
              </AIGreeting.Pills>
            </AIGreeting>
          </div>
        }
        minHeight="36rem"
        code={`<AIGreeting>
  <AIGreeting.Cards>
    <AIGreeting.Card variant="dark" avatar="S" badge="Data Assistant">
      Designed to help manage sales processes and maximize customer engagement.
    </AIGreeting.Card>
    <AIGreeting.Card variant="panel" footer="Tasks" footerAction="View All">
      ... task list ...
    </AIGreeting.Card>
    <AIGreeting.Card variant="prompt" footer="Suggested prompt">
      What are the key benefits of Product 1 that I should highlight?
    </AIGreeting.Card>
  </AIGreeting.Cards>

  <AIGreeting.Pills>
    <AIGreeting.Pill tone="pink"  icon={<Calendar />}>Connect Calendar</AIGreeting.Pill>
    <AIGreeting.Pill tone="blue"  icon={<Sparkles />}>Demo Task</AIGreeting.Pill>
    <AIGreeting.Pill tone="amber" icon={<Layers />}>Browse Integrations</AIGreeting.Pill>
    <AIGreeting.Pill tone="teal"  icon={<FolderOpen />}>Shared in Notes</AIGreeting.Pill>
  </AIGreeting.Pills>
</AIGreeting>`}
      />

      <H2>Custom orb + minimal</H2>
      <P>Pass any node as <code>orb</code>, or hide it.</P>
      <PreviewTabs
        preview={
          <div className="w-full py-8">
            <AIGreeting
              orb={<span className="text-3xl">🌅</span>}
              greeting="Good morning, Andrew"
              subtitle="Pick where to start."
            >
              <AIGreeting.Pills>
                <AIGreeting.Pill tone="violet" icon={<Sparkles className="size-3.5" />}>
                  Continue last chat
                </AIGreeting.Pill>
                <AIGreeting.Pill tone="gray" icon={<FolderOpen className="size-3.5" />}>
                  Browse projects
                </AIGreeting.Pill>
              </AIGreeting.Pills>
            </AIGreeting>
          </div>
        }
        minHeight="20rem"
        code={`<AIGreeting orb={<span>🌅</span>} greeting="Good morning, Andrew">
  <AIGreeting.Pills>
    <AIGreeting.Pill tone="violet" icon={<Sparkles />}>Continue last chat</AIGreeting.Pill>
  </AIGreeting.Pills>
</AIGreeting>`}
      />

      <H2>API — root</H2>
      <PropsTable
        rows={[
          { name: 'orb', type: 'ReactNode', description: 'Custom orb element. Defaults to a gradient sphere.' },
          { name: 'hideOrb', type: 'boolean', description: 'Hide the orb entirely.' },
          { name: 'greeting', type: 'ReactNode', defaultValue: '"Hi, there 👋"', description: 'Big greeting text.' },
          { name: 'subtitle', type: 'ReactNode', description: 'Subtitle under the greeting.' },
          { name: 'maxWidth', type: 'string', description: 'CSS max-width for the inner column.' },
        ]}
      />

      <H2>API — Card</H2>
      <PropsTable
        rows={[
          { name: 'variant', type: '"dark" | "panel" | "prompt"', defaultValue: '"panel"', description: 'Surface tone.' },
          { name: 'avatar', type: 'ReactNode', description: 'Top-left avatar.' },
          { name: 'badge', type: 'ReactNode', description: 'Top-right badge pill.' },
          { name: 'footer', type: 'ReactNode', description: 'Footer label.' },
          { name: 'footerAction', type: 'ReactNode', description: 'Right-aligned action link in the footer.' },
        ]}
      />

      <H2>API — Pill</H2>
      <PropsTable
        rows={[
          { name: 'icon', type: 'ReactNode', description: 'Tone-tinted icon block.' },
          { name: 'tone', type: '"pink" | "blue" | "amber" | "teal" | "violet" | "gray"', defaultValue: '"gray"', description: 'Color of the icon block.' },
        ]}
      />
    </article>
  );
}
