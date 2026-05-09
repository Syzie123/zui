import { Tabs } from '../../components/Tabs';
import { PreviewTabs } from '../PreviewTabs';
import { H2, P, PropsTable } from '../page-kit';

export default function TabsDoc() {
  return (
    <article>
      <H2>Underline variant</H2>
      <P>
        Animated underline indicator slides between tabs as a single pseudo-element
        — single transform, no layout work.
      </P>
      <PreviewTabs
        preview={
          <Tabs defaultValue="overview" className="w-full max-w-lg">
            <Tabs.List variant="underline">
              <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
              <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
              <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
              <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="overview" className="pt-4 text-sm text-[var(--color-fg-muted)]">
              Overview content.
            </Tabs.Content>
            <Tabs.Content value="analytics" className="pt-4 text-sm text-[var(--color-fg-muted)]">
              Analytics content.
            </Tabs.Content>
            <Tabs.Content value="reports" className="pt-4 text-sm text-[var(--color-fg-muted)]">
              Reports content.
            </Tabs.Content>
            <Tabs.Content value="notifications" className="pt-4 text-sm text-[var(--color-fg-muted)]">
              Notifications content.
            </Tabs.Content>
          </Tabs>
        }
        code={`<Tabs defaultValue="overview">
  <Tabs.List variant="underline">
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">Overview content</Tabs.Content>
  <Tabs.Content value="analytics">Analytics content</Tabs.Content>
</Tabs>`}
      />

      <H2>Pill variant</H2>
      <PreviewTabs
        preview={
          <Tabs defaultValue="grid" className="w-full max-w-md">
            <Tabs.List variant="pill">
              <Tabs.Trigger value="grid">Grid</Tabs.Trigger>
              <Tabs.Trigger value="list">List</Tabs.Trigger>
              <Tabs.Trigger value="board">Board</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="grid" className="pt-4 text-sm text-[var(--color-fg-muted)]">
              Grid view.
            </Tabs.Content>
            <Tabs.Content value="list" className="pt-4 text-sm text-[var(--color-fg-muted)]">
              List view.
            </Tabs.Content>
            <Tabs.Content value="board" className="pt-4 text-sm text-[var(--color-fg-muted)]">
              Board view.
            </Tabs.Content>
          </Tabs>
        }
        code={`<Tabs defaultValue="grid">
  <Tabs.List variant="pill">
    <Tabs.Trigger value="grid">Grid</Tabs.Trigger>
    <Tabs.Trigger value="list">List</Tabs.Trigger>
  </Tabs.List>
  …
</Tabs>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'value', type: 'string', description: 'Controlled active tab.' },
          {
            name: 'defaultValue',
            type: 'string',
            description: 'Uncontrolled initial active tab.',
          },
          {
            name: 'onValueChange',
            type: '(value: string) => void',
            description: 'Fires when the active tab changes.',
          },
        ]}
      />
    </article>
  );
}
