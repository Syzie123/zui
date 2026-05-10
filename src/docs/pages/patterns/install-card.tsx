import { InstallCard } from '../../../patterns/InstallCard/InstallCard';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

const Mark = ({ ch }: { ch: string }) => (
  <span className="text-[0.85rem] font-extrabold tracking-tight">{ch}</span>
);

export default function InstallCardDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>Product / extension card with a hand-drawn isometric "shapes" illustration and a yellow-highlighted hero phrase.</P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center py-6">
            <InstallCard
              brand="Wordsometric"
              brandMark={<Mark ch="X" />}
              brandTone="oklch(86% 0.20 130)"
              badge="Third-party payment"
              title="Fast isometric shapes creator."
              highlight="isometric"
              description="Wordsometric allows you to create isometric layers without manually having to set them up."
              installs="300,00"
              ctaLabel="Install now"
              onCta={() => {}}
            />
          </div>
        }
        minHeight="28rem"
        code={`<InstallCard
  brand="Wordsometric"
  brandMark={<Mark ch="X" />}
  brandTone="oklch(86% 0.20 130)"
  badge="Third-party payment"
  title="Fast isometric shapes creator."
  highlight="isometric"
  description="Wordsometric allows you to create isometric layers without manually having to set them up."
  installs="300,00"
  ctaLabel="Install now"
/>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'brand', type: 'ReactNode', description: 'Product / app name.' },
          { name: 'brandMark', type: 'ReactNode', description: 'Small mark / letter inside the brand tile.' },
          { name: 'brandTone', type: 'string', defaultValue: 'lime', description: 'Background color of the brand tile.' },
          { name: 'badge', type: 'ReactNode', description: 'Right-side payment / source pill.' },
          { name: 'title', type: 'ReactNode', description: 'Two-line marketing headline.' },
          { name: 'highlight', type: 'string', description: 'Substring of `title` to wrap in an accent block.' },
          { name: 'description', type: 'ReactNode', description: 'Short product description.' },
          { name: 'installs', type: 'ReactNode', description: 'Install count number.' },
          { name: 'installLabel', type: 'ReactNode', defaultValue: '"active installations"', description: 'Label after the install count.' },
          { name: 'ctaLabel', type: 'ReactNode', defaultValue: '"Install now"', description: 'Primary CTA text.' },
          { name: 'onCta', type: '() => void', description: 'CTA click handler.' },
          { name: 'onMenu', type: '() => void', description: 'Top-right kebab menu click.' },
          { name: 'illustration', type: 'ReactNode', description: 'Override the built-in shapes illustration.' },
        ]}
      />
    </article>
  );
}
