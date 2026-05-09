import { ProjectDetailCard } from '../../../patterns/ProjectDetail/ProjectDetail';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P } from '../../page-kit';

export default function ProjectDetailDoc() {
  return (
    <article>
      <H2>Project detail sheet</H2>
      <P>
        Title + property list + activity feed in tabs. Composes <code>Tabs</code>,{' '}
        <code>Avatar</code>, <code>Badge</code>, and a small <code>SoftPill</code>{' '}
        helper. Inline (not portaled) so it sits in any layout.
      </P>
      <PreviewTabs
        preview={<ProjectDetailCard />}
        minHeight="44rem"
        code={`<Card>
  <Header />
  <Title>Fintech Mobile App Redesign</Title>
  <PropertyList>
    <Property icon={<Clock />} label="Created time">…</Property>
    <Property icon={<LoaderCircle />} label="Status"><Pill>In Research</Pill></Property>
    <Property icon={<Tag />} label="Tags"><Pill>Task</Pill> …</Property>
  </PropertyList>
  <Tabs defaultValue="activity">
    <Tabs.List variant="underline">
      <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
      <Tabs.Trigger value="my-work">My Work</Tabs.Trigger>
    </Tabs.List>
    …
  </Tabs>
</Card>`}
      />
    </article>
  );
}
