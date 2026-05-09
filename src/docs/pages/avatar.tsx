import { Avatar, AvatarGroup } from '../../components/Avatar';
import { PreviewTabs } from '../PreviewTabs';
import { H2, P, PropsTable } from '../page-kit';

export default function AvatarDoc() {
  return (
    <article>
      <H2>Default</H2>
      <PreviewTabs
        preview={
          <div className="flex items-center gap-3">
            <Avatar src="https://i.pravatar.cc/96?img=12" fallback="AS" />
            <Avatar fallback="MK" />
          </div>
        }
        code={`<Avatar src="https://example.com/me.jpg" fallback="AS" />
<Avatar fallback="MK" />`}
      />

      <H2>Sizes</H2>
      <PreviewTabs
        preview={
          <div className="flex items-end gap-3">
            <Avatar size="xs"  fallback="A" />
            <Avatar size="sm"  fallback="B" />
            <Avatar size="md"  fallback="C" />
            <Avatar size="lg"  fallback="D" />
            <Avatar size="xl"  fallback="E" />
            <Avatar size="2xl" fallback="F" />
          </div>
        }
        code={`<Avatar size="xs" />
<Avatar size="sm" />
<Avatar size="md" />
<Avatar size="lg" />
<Avatar size="xl" />
<Avatar size="2xl" />`}
      />

      <H2>Status</H2>
      <PreviewTabs
        preview={
          <div className="flex items-center gap-3">
            <Avatar size="lg" fallback="A" status="online" />
            <Avatar size="lg" fallback="B" status="busy" />
            <Avatar size="lg" fallback="C" status="away" />
            <Avatar size="lg" fallback="D" status="offline" />
          </div>
        }
        code={`<Avatar status="online" />
<Avatar status="busy" />
<Avatar status="away" />
<Avatar status="offline" />`}
      />

      <H2>Group</H2>
      <P>
        <code>AvatarGroup</code> overlaps avatars and collapses extras into a{' '}
        <code>+N</code> chip.
      </P>
      <PreviewTabs
        preview={
          <AvatarGroup max={4}>
            <Avatar src="https://i.pravatar.cc/96?img=1" fallback="A" />
            <Avatar src="https://i.pravatar.cc/96?img=2" fallback="B" />
            <Avatar src="https://i.pravatar.cc/96?img=3" fallback="C" />
            <Avatar src="https://i.pravatar.cc/96?img=4" fallback="D" />
            <Avatar fallback="EF" />
            <Avatar fallback="GH" />
          </AvatarGroup>
        }
        code={`<AvatarGroup max={4}>
  <Avatar src="…" fallback="A" />
  <Avatar src="…" fallback="B" />
  <Avatar src="…" fallback="C" />
  <Avatar src="…" fallback="D" />
  <Avatar fallback="EF" />
  <Avatar fallback="GH" />
</AvatarGroup>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'src', type: 'string', description: 'Image URL.' },
          {
            name: 'fallback',
            type: 'string',
            description: 'Initials shown if image fails / loads.',
          },
          {
            name: 'size',
            type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
            defaultValue: '"md"',
            description: 'Avatar diameter.',
          },
          {
            name: 'status',
            type: '"online" | "offline" | "away" | "busy"',
            description: 'Status dot in the bottom-right.',
          },
        ]}
      />
    </article>
  );
}
