import { SharePanelCard } from '../../../patterns/SharePanel/SharePanel';
import { FeatureListCard } from '../../../patterns/FeatureList/FeatureList';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P } from '../../page-kit';

export default function SharePanelDoc() {
  return (
    <article>
      <H2>Share project panel</H2>
      <P>
        Recipients with per-row permission pickers, link sharing settings, and a
        footer action row. Composes <code>Avatar</code>, <code>Input</code>, and{' '}
        <code>Button</code>.
      </P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center">
            <SharePanelCard />
          </div>
        }
        minHeight="34rem"
        code={`import { SharePanel } from '@zui/patterns';

<SharePanel>
  <SharePanel.Header />
  <SharePanel.DocumentLink url="https://…" />
  <SharePanel.Recipients items={[
    { name: 'Justin', email: 'j@…', permission: 'Can edit' },
    { name: 'Aspen',  email: 'a@…', permission: 'Can view' },
  ]} />
  <SharePanel.Settings />
  <SharePanel.Footer />
</SharePanel>`}
      />

      <H2>Features list</H2>
      <P>
        Iconified feature rows with optional "New" badge, plus article cards with
        thumbnail and "Read more" link. The right-side card from the same surface.
      </P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center">
            <FeatureListCard />
          </div>
        }
        minHeight="40rem"
        code={`<FeatureList>
  <FeatureList.Item
    icon={<Rocket />}
    title="Getting started"
    description="First time here? Run through onboarding."
    isNew
  />
  <FeatureList.Article
    title="How to bring designs to life"
    blurb="A designer's guide to interactive animation."
    isNew
  />
</FeatureList>`}
      />
    </article>
  );
}
