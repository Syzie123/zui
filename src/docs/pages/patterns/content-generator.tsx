import { useState } from 'react';
import {
  Bot,
  Folder,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Palette,
  Settings,
} from 'lucide-react';
import { ContentGenerator } from '../../../patterns/ContentGenerator/ContentGenerator';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function ContentGeneratorDoc() {
  const [tab, setTab] = useState<'free' | 'templates'>('free');
  const [outputTab, setOutputTab] = useState('new');

  return (
    <article>
      <H2>Three-pane layout</H2>
      <P>Compound API with sidebar (brand, search, primary, menu, trial, user), main (header, tabs, fields, footer), and outputs rail.</P>
      <PreviewTabs
        preview={
          <div className="w-full py-4">
            <ContentGenerator>
              <ContentGenerator.Sidebar>
                <ContentGenerator.Brand icon="F">Felix</ContentGenerator.Brand>
                <ContentGenerator.Search />
                <ContentGenerator.Primary>Create Content</ContentGenerator.Primary>

                <ContentGenerator.Menu label="Menu">
                  <ContentGenerator.MenuItem
                    icon={<LayoutDashboard className="size-4" />}
                  >
                    Dashboard
                  </ContentGenerator.MenuItem>
                  <ContentGenerator.MenuItem
                    icon={<Bot className="size-4" />}
                    active
                  >
                    Templates
                  </ContentGenerator.MenuItem>
                  <ContentGenerator.MenuItem
                    icon={<MessageSquare className="size-4" />}
                    badge="Beta"
                  >
                    Chat
                  </ContentGenerator.MenuItem>
                  <ContentGenerator.MenuItem icon={<Folder className="size-4" />}>
                    Documents
                  </ContentGenerator.MenuItem>
                  <ContentGenerator.MenuItem icon={<Palette className="size-4" />}>
                    Art
                  </ContentGenerator.MenuItem>
                  <ContentGenerator.MenuItem icon={<Settings className="size-4" />}>
                    Settings
                  </ContentGenerator.MenuItem>
                  <ContentGenerator.MenuItem icon={<HelpCircle className="size-4" />}>
                    Help
                  </ContentGenerator.MenuItem>
                </ContentGenerator.Menu>

                <ContentGenerator.Trial
                  title="Your trial ends in 4 days"
                  description="You are on a free trial of the Boss Mode plan on monthly billing."
                />

                <ContentGenerator.User
                  name="Drian moreno"
                  email="Drimore@crypto.com"
                  avatar="D"
                />
              </ContentGenerator.Sidebar>

              <ContentGenerator.Main>
                <ContentGenerator.Header
                  icon="📝"
                  title="Paragraph Generator"
                  description="Generate paragraphs that will captivate your readers."
                />

                <ContentGenerator.Tabs>
                  <ContentGenerator.Tab active={tab === 'free'} onClick={() => setTab('free')}>
                    Free form
                  </ContentGenerator.Tab>
                  <ContentGenerator.Tab active={tab === 'templates'} onClick={() => setTab('templates')}>
                    Templates
                  </ContentGenerator.Tab>
                </ContentGenerator.Tabs>

                <ContentGenerator.Field
                  label="What is your paragraph about?"
                  counter="76/400"
                >
                  <ContentGenerator.TextArea
                    active
                    defaultValue="Company specializing in company description. We're looking for a creative ui designer to enhance our product user experience"
                  />
                </ContentGenerator.Field>

                <ContentGenerator.Field
                  label="Keywords to include"
                  hint="Comma-separated"
                  counter="14/400"
                >
                  <ContentGenerator.Input defaultValue="vegetables, healthy" />
                </ContentGenerator.Field>

                <ContentGenerator.Field label="Tone of voice" hint="Optional" counter="11/400">
                  <ContentGenerator.Input defaultValue="Informative" />
                </ContentGenerator.Field>

                <ContentGenerator.Section title="Language options" badge="Beta">
                  <p className="text-[13px] text-[var(--color-fg-muted)]">
                    DeepL integration is currently disabled.{' '}
                    <a className="text-[var(--color-accent-base)] underline" href="#">
                      Enable in Settings
                    </a>
                  </p>
                  <ContentGenerator.FieldRow>
                    <ContentGenerator.Field label="Input language">
                      <ContentGenerator.Input defaultValue="English" />
                    </ContentGenerator.Field>
                    <span className="text-[var(--color-fg-muted)] pb-2">⇄</span>
                    <ContentGenerator.Field label="Output language">
                      <ContentGenerator.Input defaultValue="English (American)" />
                    </ContentGenerator.Field>
                  </ContentGenerator.FieldRow>
                  <ContentGenerator.Field label="Formality">
                    <ContentGenerator.Input defaultValue="Default" />
                  </ContentGenerator.Field>
                </ContentGenerator.Section>

                <ContentGenerator.Footer>
                  <button className="text-[13px] text-[var(--color-fg-muted)]">✕ Clear all inputs</button>
                  <ContentGenerator.Generate>Generate</ContentGenerator.Generate>
                </ContentGenerator.Footer>
              </ContentGenerator.Main>

              <ContentGenerator.Outputs>
                <ContentGenerator.OutputsHeader
                  active={outputTab}
                  onTabChange={setOutputTab}
                  onClear={() => {}}
                />

                <ContentGenerator.Output highlight meta="1m ago">
                  "In recent years, artificial intelligence (AI) has revolutionized numerous industries, from healthcare to finance, by leveraging advanced algorithms to analyze vast amounts of data and extract meaningful insights."
                  <ContentGenerator.OutputActions>
                    <ContentGenerator.OutputAction kind="star" />
                    <ContentGenerator.OutputAction kind="copy" />
                    <ContentGenerator.OutputAction kind="open" active />
                    <ContentGenerator.OutputAction kind="like" />
                    <ContentGenerator.OutputAction kind="dislike" />
                  </ContentGenerator.OutputActions>
                </ContentGenerator.Output>

                <ContentGenerator.Output meta="1m ago">
                  "In recent years, artificial intelligence (AI) has revolutionized numerous industries, from healthcare to finance, by leveraging advanced algorithms to analyze vast amounts of data."
                  <ContentGenerator.OutputActions>
                    <ContentGenerator.OutputAction kind="star" />
                    <ContentGenerator.OutputAction kind="copy" />
                    <ContentGenerator.OutputAction kind="open" />
                    <ContentGenerator.OutputAction kind="like" />
                    <ContentGenerator.OutputAction kind="dislike" />
                  </ContentGenerator.OutputActions>
                </ContentGenerator.Output>
              </ContentGenerator.Outputs>
            </ContentGenerator>
          </div>
        }
        minHeight="48rem"
        code={`<ContentGenerator>
  <ContentGenerator.Sidebar>
    <ContentGenerator.Brand icon="F">Felix</ContentGenerator.Brand>
    <ContentGenerator.Search />
    <ContentGenerator.Primary>Create Content</ContentGenerator.Primary>
    <ContentGenerator.Menu label="Menu">
      <ContentGenerator.MenuItem icon={<LayoutDashboard />}>Dashboard</ContentGenerator.MenuItem>
      <ContentGenerator.MenuItem icon={<Bot />} active>Templates</ContentGenerator.MenuItem>
      <ContentGenerator.MenuItem icon={<MessageSquare />} badge="Beta">Chat</ContentGenerator.MenuItem>
    </ContentGenerator.Menu>
    <ContentGenerator.Trial title="Your trial ends in 4 days" />
    <ContentGenerator.User name="Drian moreno" email="Drimore@crypto.com" avatar="D" />
  </ContentGenerator.Sidebar>

  <ContentGenerator.Main>
    <ContentGenerator.Header icon="📝" title="Paragraph Generator" />
    <ContentGenerator.Tabs>
      <ContentGenerator.Tab active>Free form</ContentGenerator.Tab>
      <ContentGenerator.Tab>Templates</ContentGenerator.Tab>
    </ContentGenerator.Tabs>
    <ContentGenerator.Field label="What is your paragraph about?" counter="76/400">
      <ContentGenerator.TextArea active />
    </ContentGenerator.Field>
    <ContentGenerator.Footer>
      <ContentGenerator.Generate>Generate</ContentGenerator.Generate>
    </ContentGenerator.Footer>
  </ContentGenerator.Main>

  <ContentGenerator.Outputs>
    <ContentGenerator.OutputsHeader active="new" />
    <ContentGenerator.Output highlight meta="1m ago">...</ContentGenerator.Output>
  </ContentGenerator.Outputs>
</ContentGenerator>`}
      />

      <H2>Composition</H2>
      <P>The component is purely structural — every part is its own composable, so you can omit, reorder, or replace anything. The grid collapses to two columns under 1024px and one column under 720px.</P>

      <H2>Sub-components</H2>
      <PropsTable
        rows={[
          { name: 'Sidebar / Main / Outputs', type: 'div', description: 'The three column shells.' },
          { name: 'Brand', type: '{ icon, children }', description: 'Brand block at the top of the sidebar.' },
          { name: 'Search', type: '{ placeholder, shortcut, …InputProps }', description: 'Quick-search input with kbd shortcut.' },
          { name: 'Primary', type: '{ icon, …ButtonProps }', description: 'Primary CTA — typically "Create Content".' },
          { name: 'Menu / MenuItem', type: '{ label, …, { icon, active, badge, …ButtonProps }}', description: 'Sidebar nav.' },
          { name: 'Trial', type: '{ title, description, ctaLabel, onCta, illustration }', description: 'Sidebar promo card.' },
          { name: 'User', type: '{ name, email, avatar }', description: 'User row at the bottom of the sidebar.' },
          { name: 'Header', type: '{ icon, title, description }', description: 'Main header block.' },
          { name: 'Tabs / Tab', type: '{ children, …, { active, …ButtonProps }}', description: 'Underlined tabs.' },
          { name: 'Field', type: '{ label, hint, counter }', description: 'Field wrapper around an input/textarea.' },
          { name: 'TextArea / Input', type: 'native props + { active }', description: 'Styled inputs that match the field shell.' },
          { name: 'Section', type: '{ title, badge, hint }', description: 'Bordered group inside the main column.' },
          { name: 'Footer / Generate', type: '{ children, …, { icon, …ButtonProps }}', description: 'Sticky-feeling footer with a primary Generate button.' },
          { name: 'Outputs / OutputsHeader / Output / OutputActions / OutputAction', type: '…', description: 'Right-rail history of generated outputs with star / copy / open / like / dislike actions.' },
        ]}
      />
    </article>
  );
}
