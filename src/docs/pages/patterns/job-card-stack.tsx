import { JobCardStack } from '../../../patterns/JobCardStack/JobCardStack';
import {
  SlackIcon,
  FramerIcon,
  LoomIcon,
  HopinIcon,
  GoogleIcon,
} from '../../../components/icons/brand';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

const ITEMS = [
  {
    brand: <FramerIcon size={16} />,
    brandName: 'Framer',
    role: 'Senior UX Designer',
    salary: '$3,500-5,500 net',
    tags: ['Full time', 'Remote', 'B2B'],
    meta: 'Posted 7 day ago',
    tone: 'lavender' as const,
  },
  {
    brand: <SlackIcon size={16} />,
    brandName: 'slack',
    role: 'Senior UI Designer',
    salary: '$3,500-5,500 net',
    tags: ['Project based', 'Remote'],
    meta: 'Posted 2 day ago',
    tone: 'cream' as const,
  },
  {
    brand: <SlackIcon size={16} />,
    brandName: 'slack',
    role: 'Lead Product Designer',
    salary: '$3,500-5,500 net',
    tags: ['Full time', 'Remote', 'Full-time'],
    meta: 'Posted 5 day ago',
    tone: 'cream' as const,
  },
  {
    brand: <LoomIcon size={16} />,
    brandName: 'Loom',
    role: 'Product Designer',
    salary: '$3,000-3,500 net',
    tags: ['Full time', 'US Based'],
    meta: 'Posted yesterday',
    tone: 'lavender' as const,
  },
  {
    brand: <HopinIcon size={16} />,
    brandName: 'hopin',
    role: 'Lead Designer',
    salary: '$4,500-5,500 net',
    tags: ['Project based', 'Remote', 'Full-time'],
    meta: 'Posted 3 day ago',
    tone: 'cream' as const,
  },
  {
    brand: <GoogleIcon size={16} />,
    brandName: 'Google',
    role: 'Senior UI Designer',
    salary: '$3,800-5,00 net',
    tags: ['Full time', 'Remote', 'Full-time'],
    meta: 'Posted 1 month ago',
    tone: 'white' as const,
  },
];

export default function JobCardStackDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>A casually-tilted pile of pastel job cards. Hovering a card lifts it on top and untilts.</P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center bg-[oklch(96%_0.04_280)] dark:bg-[oklch(20%_0.05_280)] rounded-2xl py-6">
            <JobCardStack items={ITEMS} />
          </div>
        }
        minHeight="32rem"
        code={`<JobCardStack
  items={[
    { brand: <FramerIcon />, brandName: 'Framer', role: 'Senior UX Designer',
      salary: '$3,500-5,500 net', tags: ['Full time', 'Remote', 'B2B'],
      meta: 'Posted 7 day ago', tone: 'lavender' },
    { brand: <SlackIcon />,  brandName: 'slack',  role: 'Senior UI Designer',
      salary: '$3,500-5,500 net', tags: ['Project based', 'Remote'],
      meta: 'Posted 2 day ago', tone: 'cream' },
    /* ... */
  ]}
/>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'items', type: 'JobCardItem[]', description: 'Cards rendered in the pile, in stacking order.' },
          { name: 'spread', type: 'number', defaultValue: '6', description: 'Maximum tilt (deg) distributed across the stack.' },
        ]}
      />

      <H2>JobCardItem</H2>
      <PropsTable
        rows={[
          { name: 'brand', type: 'ReactNode', description: 'Brand mark — usually a small SVG icon.' },
          { name: 'brandName', type: 'ReactNode', description: 'Brand text shown next to the mark.' },
          { name: 'role', type: 'ReactNode', description: 'Job title.' },
          { name: 'salary', type: 'ReactNode', description: 'Salary line.' },
          { name: 'tags', type: 'ReactNode[]', description: 'Tag pills shown below the salary.' },
          { name: 'meta', type: 'ReactNode', description: 'Footer line — typically "Posted X ago".' },
          { name: 'tone', type: '"lavender" | "cream" | "peach" | "mint" | "sky" | "sand" | "white"', description: 'Pastel surface tone.' },
        ]}
      />
    </article>
  );
}
