import { ArrowRight, Sparkles, Trash2, Mail } from 'lucide-react';
import { Button } from '../../components/Button';
import { PreviewTabs } from '../PreviewTabs';
import { H2, H3, P, PropsTable, InstallSnippet } from '../page-kit';

export default function ButtonDoc() {
  return (
    <article>
      <H2>Installation</H2>
      <InstallSnippet pkg="@zui/react" />

      <H2>Default</H2>
      <PreviewTabs
        preview={<Button>Get Started</Button>}
        code={`import { Button } from '@zui/react';

export default function Demo() {
  return <Button>Get Started</Button>;
}`}
      />

      <H2>Variants</H2>
      <P>Nine variants covering every typical use case:</P>
      <PreviewTabs
        preview={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="soft">Soft</Button>
            <Button variant="destructive">Delete</Button>
            <Button variant="gradient">Gradient</Button>
            <Button variant="luminous">Luminous</Button>
          </div>
        }
        code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="soft">Soft</Button>
<Button variant="destructive">Delete</Button>
<Button variant="gradient">Gradient</Button>
<Button variant="luminous">Luminous</Button>`}
      />

      <H2>Sizes</H2>
      <PreviewTabs
        preview={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        }
        code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}
      />

      <H2>With icons</H2>
      <PreviewTabs
        preview={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button leftIcon={<Mail className="size-4" />}>Email</Button>
            <Button rightIcon={<ArrowRight className="size-4" />}>
              Continue
            </Button>
            <Button
              variant="destructive"
              leftIcon={<Trash2 className="size-4" />}
            >
              Delete
            </Button>
            <Button
              variant="luminous"
              leftIcon={<Sparkles className="size-4" />}
            >
              Magic
            </Button>
          </div>
        }
        code={`import { ArrowRight, Mail, Trash2 } from 'lucide-react';

<Button leftIcon={<Mail className="size-4" />}>Email</Button>
<Button rightIcon={<ArrowRight className="size-4" />}>Continue</Button>
<Button variant="destructive" leftIcon={<Trash2 className="size-4" />}>
  Delete
</Button>`}
      />

      <H2>Loading state</H2>
      <P>
        Pass <code>loading</code> to disable the button and swap its leading icon
        for a spinner.
      </P>
      <PreviewTabs
        preview={
          <div className="flex items-center gap-3">
            <Button loading>Saving</Button>
            <Button variant="secondary" loading>
              Loading
            </Button>
          </div>
        }
        code={`<Button loading>Saving</Button>
<Button variant="secondary" loading>Loading</Button>`}
      />

      <H2>Disabled</H2>
      <PreviewTabs
        preview={
          <div className="flex items-center gap-3">
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
          </div>
        }
        code={`<Button disabled>Disabled</Button>`}
      />

      <H2>asChild</H2>
      <P>
        Render the button styling on a different element (e.g. a link) without losing the
        focus / hover behavior.
      </P>
      <PreviewTabs
        preview={
          <Button asChild>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Linked button
            </a>
          </Button>
        }
        code={`<Button asChild>
  <a href="/get-started">Get started</a>
</Button>`}
      />

      <H2>API</H2>
      <H3>Button</H3>
      <PropsTable
        rows={[
          {
            name: 'variant',
            type: '"primary" | "secondary" | "ghost" | "outline" | "soft" | "destructive" | "gradient" | "luminous" | "link"',
            defaultValue: '"primary"',
            description: 'Visual style.',
          },
          {
            name: 'size',
            type: '"sm" | "md" | "lg" | "xl" | "icon" | "icon-sm"',
            defaultValue: '"md"',
            description: 'Button height + padding.',
          },
          {
            name: 'fullWidth',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Stretch to fill the parent width.',
          },
          {
            name: 'loading',
            type: 'boolean',
            defaultValue: 'false',
            description:
              'Show a spinner and disable interaction. Replaces the leading icon.',
          },
          {
            name: 'leftIcon',
            type: 'ReactNode',
            description: 'Icon rendered before the label.',
          },
          {
            name: 'rightIcon',
            type: 'ReactNode',
            description: 'Icon rendered after the label.',
          },
          {
            name: 'asChild',
            type: 'boolean',
            defaultValue: 'false',
            description:
              'Render the styles on the immediate child element instead of a <button>.',
          },
        ]}
      />
    </article>
  );
}
