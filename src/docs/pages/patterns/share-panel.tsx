import { SharePanelCard } from '../../../patterns/SharePanel/SharePanel';
import { FeatureListCard } from '../../../patterns/FeatureList/FeatureList';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P } from '../../page-kit';

export default function SharePanelDoc() {
  return (
    <article>
      <H2>Share Project panel</H2>
      <P>
        Recipients with per-row permission pickers, link sharing settings, and a
        footer action row. Composes <code>Avatar</code>, <code>Input</code>,{' '}
        <code>Button</code>.
      </P>
      <PreviewTabs
        preview={
          <div className="grid w-full max-w-4xl gap-5 md:grid-cols-2">
            <SharePanelCard />
            <FeatureListCard />
          </div>
        }
        minHeight="44rem"
        code={`import { SharePanel, FeatureList } from '@zui/patterns';

<div className="grid gap-5 md:grid-cols-2">
  <SharePanel recipients={…} onDone={…} />
  <FeatureList items={…} articles={…} />
</div>`}
      />
    </article>
  );
}
