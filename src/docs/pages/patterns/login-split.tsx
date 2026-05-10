import { LoginSplit } from '../../../patterns/LoginSplit/LoginSplit';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function LoginSplitDoc() {
  return (
    <article>
      <H2>Clean variant</H2>
      <P>
        Hero image left (with brand mark + caption overlay), white form right.
        Realnest-style. Uses an Unsplash URL as the image — swap{' '}
        <code>imageUrl</code> for your own asset in production.
      </P>
      <PreviewTabs
        preview={
          <div className="w-full">
            <LoginSplit
              variant="clean"
              onLogin={() => {}}
              onProvider={() => {}}
              onSignUp={() => {}}
            />
          </div>
        }
        minHeight="38rem"
        code={`<LoginSplit
  variant="clean"
  title="Welcome back!"
  subtitle="Sign in to your account"
  imageCaption="Find your sweet home"
  imageCaptionSub="Schedule visits in just a few clicks"
  brand="Realnest"
  imageUrl="https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?q=80&w=1200&auto=format"
  onLogin={({ email, password }) => signIn(email, password)}
  onProvider={(p) => signInWith(p)}
  onSignUp={() => goToSignUp()}
/>`}
      />

      <H2>Glass variant</H2>
      <P>
        Form panel on the left, full-bleed image on the right with a glass
        testimonial card pinned to the bottom. Same form internals, different
        visual weight.
      </P>
      <PreviewTabs
        preview={
          <div className="w-full">
            <LoginSplit
              variant="glass"
              onLogin={() => {}}
              onProvider={() => {}}
              onSignUp={() => {}}
            />
          </div>
        }
        minHeight="42rem"
        code={`<LoginSplit
  variant="glass"
  title="Welcome!"
  subtitle="Please enter your details to login."
  testimonial={{
    quote: "I can manage my global property portfolio in minutes — all with crypto.",
    name: "Liam Smith",
    role: "Investor · Global Real Estate",
  }}
  imageUrl="https://plus.unsplash.com/premium_photo-1682377521753-58d1fd9fa5ce?q=80&w=1600"
  onLogin={...}
/>`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'variant', type: '"clean" | "glass"', defaultValue: '"clean"', description: 'Layout style.' },
          { name: 'imageUrl', type: 'string', description: 'Hero image URL. Defaults to an Unsplash image per variant.' },
          { name: 'title', type: 'string', defaultValue: '"Welcome back!"', description: 'Form heading.' },
          { name: 'subtitle', type: 'string', defaultValue: '"Sign in to your account"', description: 'Form sub-heading.' },
          { name: 'imageCaption', type: 'string', description: 'Big caption shown over the image (clean variant).' },
          { name: 'imageCaptionSub', type: 'string', description: 'Small caption under imageCaption (clean variant).' },
          { name: 'testimonial', type: '{ quote, name, role }', description: 'Glass card content (glass variant).' },
          { name: 'brand', type: 'string', defaultValue: '"Realnest"', description: 'Brand name shown top-left (clean variant).' },
          { name: 'brandLogo', type: 'ReactNode', description: 'Custom brand mark to render before the brand name.' },
          { name: 'providers', type: '("google" | "apple" | "facebook")[]', defaultValue: 'all three', description: 'Social login options.' },
          { name: 'onProvider', type: '(p: string) => void', description: 'Provider button click handler.' },
          { name: 'onLogin', type: '(creds: { email; password }) => void', description: 'Form submit handler.' },
          { name: 'onSignUp', type: '() => void', description: 'Sign-up link handler. Hidden if not set.' },
        ]}
      />
    </article>
  );
}
