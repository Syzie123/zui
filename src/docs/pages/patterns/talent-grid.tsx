import { TalentGrid } from '../../../patterns/TalentGrid/TalentGrid';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

const ITEMS = [
  {
    avatar: 'https://i.pravatar.cc/160?img=49',
    name: 'Ada Wilson',
    role: 'Product Designer',
    roleTone: 'lavender' as const,
    rate: '$150.00/hr',
    location: 'Chicago, IL',
    skills: ['Web', 'Figma', 'Wireframing'],
    verified: true,
  },
  {
    avatar: 'https://i.pravatar.cc/160?img=12',
    name: 'Augustus Ward',
    role: 'Product Designer',
    roleTone: 'lavender' as const,
    rate: '$170.00/hr',
    location: 'Los Angeles, CA',
    skills: ['Wireframing', 'Figma', 'User Fl…'],
    verified: true,
  },
  {
    avatar: 'https://i.pravatar.cc/160?img=5',
    name: 'Nyla Wood',
    role: 'Product Manager',
    roleTone: 'sky' as const,
    rate: '$100.00/hr',
    location: 'New York City, NY',
    skills: ['Atlass…', 'Agile', 'Product Strat…'],
    verified: true,
  },
  {
    avatar: 'https://i.pravatar.cc/160?img=33',
    name: 'Mateo Nelson',
    role: 'Technical Product Manager',
    roleTone: 'lavender' as const,
    rate: '$100.00/hr',
    location: 'Nashville, TN',
    skills: ['Product…', 'Team M…', 'Atlass…'],
    verified: true,
  },
  {
    avatar: 'https://i.pravatar.cc/160?img=14',
    name: 'Pablo Bennet',
    role: 'Product Designer',
    roleTone: 'lavender' as const,
    rate: '$150.00/hr',
    location: 'Houston, TX',
    skills: ['User Re…', 'Interact…', 'Wiref…'],
    verified: true,
  },
  {
    avatar: 'https://i.pravatar.cc/160?img=68',
    name: 'Naresh Thaman',
    role: 'Data Scientist',
    roleTone: 'mint' as const,
    rate: '$100.00/hr',
    location: 'San Francisco, CA',
    skills: ['Data Analysis', 'R', 'Python'],
    verified: true,
  },
  {
    avatar: 'https://i.pravatar.cc/160?img=47',
    name: 'Thea Reyes',
    role: 'Marketer',
    roleTone: 'mint' as const,
    rate: '$150.00/hr',
    location: 'New Orleans, LA',
    skills: ['B2B', 'B2C', 'Content Marketing'],
    verified: true,
  },
  {
    avatar: 'https://i.pravatar.cc/160?img=8',
    name: 'Jaxon Webster',
    role: 'Visual / Graphic Designer',
    roleTone: 'lavender' as const,
    rate: '$95.00/hr',
    location: 'Phoenix, AZ',
    skills: ['Visual D…', 'Illustra…', 'Animat…'],
    verified: true,
  },
  {
    avatar: 'https://i.pravatar.cc/160?img=23',
    name: 'Talia Cooper',
    role: 'Research Manager',
    roleTone: 'mint' as const,
    rate: '$90.00/hr',
    location: 'Las Vegas, NV',
    skills: ['User Research', 'User Interviews'],
    verified: true,
  },
];

export default function TalentGridDoc() {
  return (
    <article>
      <H2>Default — staggered + tilted</H2>
      <P>Mosaic of profile cards with verified ticks, role pills, rate, location, skills, and View / Invite actions.</P>
      <PreviewTabs
        preview={
          <div className="w-full bg-[oklch(94%_0.04_240)] dark:bg-[oklch(20%_0.05_240)] rounded-2xl p-4">
            <TalentGrid items={ITEMS} />
          </div>
        }
        minHeight="48rem"
        code={`<TalentGrid items={[
  {
    avatar: '/avatars/ada.jpg', name: 'Ada Wilson',
    role: 'Product Designer', roleTone: 'lavender',
    rate: '$150.00/hr', location: 'Chicago, IL',
    skills: ['Web', 'Figma', 'Wireframing'],
    verified: true,
    onView: () => router.push('/people/ada'),
    onInvite: () => invite('ada'),
  },
  /* ... */
]} />`}
      />

      <H2>Static (no tilt)</H2>
      <PreviewTabs
        preview={
          <div className="w-full">
            <TalentGrid items={ITEMS.slice(0, 6)} static />
          </div>
        }
        minHeight="32rem"
        code={`<TalentGrid items={items} static />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'items', type: 'TalentItem[]', description: 'Cards to render.' },
          { name: 'tilt', type: 'number', defaultValue: '4', description: 'Maximum rotation distributed across the grid.' },
          { name: 'static', type: 'boolean', description: 'Disable tilt + offset.' },
        ]}
      />

      <H2>TalentItem</H2>
      <PropsTable
        rows={[
          { name: 'avatar', type: 'string', description: 'Avatar image URL.' },
          { name: 'name', type: 'ReactNode', description: 'Person name.' },
          { name: 'role', type: 'ReactNode', description: 'Role label shown in a tinted pill.' },
          { name: 'roleTone', type: '"lavender" | "mint" | "sky" | "peach" | "cream" | "rose"', description: 'Color of the role pill.' },
          { name: 'rate', type: 'ReactNode', description: 'Hourly rate.' },
          { name: 'location', type: 'ReactNode', description: 'City / state.' },
          { name: 'skills', type: 'ReactNode[]', description: 'Skill chips.' },
          { name: 'verified', type: 'boolean', description: 'Show a green check next to the name.' },
          { name: 'onView', type: '() => void', description: 'View profile click.' },
          { name: 'onInvite', type: '() => void', description: 'Invite click.' },
        ]}
      />
    </article>
  );
}
