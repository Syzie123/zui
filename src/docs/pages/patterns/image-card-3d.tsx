import { ImageCard3D } from '../../../patterns/ImageCard3D/ImageCard3D';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

const TASKELLO_IMG = 'https://images.pexels.com/photos/9651479/pexels-photo-9651479.jpeg';
const HIKE_IMG = 'https://images.pexels.com/photos/2901215/pexels-photo-2901215.jpeg';
const COFFEE_IMG = 'https://images.pexels.com/photos/1833399/pexels-photo-1833399.jpeg';

const TaskelloMark = () => (
  <span className="inline-flex size-full items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[0.65rem] font-extrabold tracking-tight text-white">
    Tk
  </span>
);

export default function ImageCard3DDoc() {
  return (
    <article>
      <H2>Default</H2>
      <P>Image with a glassy raised tag pinned to the bottom-left corner.</P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center py-8">
            <div className="w-full max-w-xs">
              <ImageCard3D
                src={TASKELLO_IMG}
                alt="Taskello workspace"
                title="Taskello App"
                subtitle="Productivity • Free"
                icon={<TaskelloMark />}
              />
            </div>
          </div>
        }
        minHeight="32rem"
        code={`<ImageCard3D
  src="https://images.pexels.com/photos/9651479/pexels-photo-9651479.jpeg"
  title="Taskello App"
  subtitle="Productivity • Free"
  icon={<TaskelloMark />}
  onAction={() => navigate('/app/taskello')}
/>`}
      />

      <H2>Aspect ratios</H2>
      <P>Pick from <code>portrait</code>, <code>square</code>, <code>landscape</code>, or <code>tall</code>.</P>
      <PreviewTabs
        preview={
          <div className="grid w-full grid-cols-1 gap-4 py-6 sm:grid-cols-2">
            <ImageCard3D
              src={HIKE_IMG}
              ratio="square"
              title="Wander"
              subtitle="Travel guide"
              icon={
                <span className="inline-flex size-full items-center justify-center rounded-full bg-emerald-600 text-[0.65rem] font-extrabold text-white">
                  W
                </span>
              }
            />
            <ImageCard3D
              src={COFFEE_IMG}
              ratio="landscape"
              title="Roastery"
              subtitle="Now open · 7am"
              icon={
                <span className="inline-flex size-full items-center justify-center rounded-full bg-amber-600 text-[0.65rem] font-extrabold text-white">
                  R
                </span>
              }
            />
          </div>
        }
        minHeight="32rem"
        code={`<ImageCard3D ratio="square"    src={...} title="Wander" />
<ImageCard3D ratio="landscape" src={...} title="Roastery" />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'src', type: 'string', description: 'Image URL.' },
          { name: 'alt', type: 'string', description: 'Alt text for the image.' },
          { name: 'title', type: 'string', description: 'Headline shown inside the floating tag.' },
          { name: 'subtitle', type: 'string', description: 'Smaller line under the title.' },
          { name: 'icon', type: 'ReactNode', description: 'Small mark shown inside the inset well on the left of the tag.' },
          { name: 'ratio', type: '"portrait" | "square" | "landscape" | "tall"', defaultValue: '"portrait"', description: 'Aspect ratio of the image card.' },
          { name: 'onAction', type: '() => void', description: 'Click handler for the right-side CTA.' },
          { name: 'hideAction', type: 'boolean', description: 'Hide the CTA chevron entirely.' },
        ]}
      />
    </article>
  );
}
