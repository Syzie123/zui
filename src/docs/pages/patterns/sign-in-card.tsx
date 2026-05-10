import { SignInCard } from '../../../patterns/SignInCard/SignInCard';
import { PreviewTabs } from '../../PreviewTabs';
import { H2, P, PropsTable } from '../../page-kit';

export default function SignInCardDoc() {
  const legal = (
    <>
      By using ZUI, you agree to our <span className="underline">Terms of Service</span> and{' '}
      <span className="underline">Privacy Policy</span>.
    </>
  );

  return (
    <article>
      <H2>Gradient variant</H2>
      <P>The Kapwing-style multi-stop background. White text on a coral / pink wash.</P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center py-6">
            <SignInCard
              variant="gradient"
              legal={legal}
              onProvider={() => {}}
              onEmailSubmit={() => {}}
              onSso={() => {}}
              onClose={() => {}}
            />
          </div>
        }
        minHeight="42rem"
        code={`<SignInCard
  variant="gradient"
  title="Sign in to continue"
  subtitle="Sign in to save content to a workspace, comment, and more."
  providers={['google', 'apple', 'microsoft', 'facebook']}
  onProvider={(p) => signIn(p)}
  onEmailSubmit={(email) => sendMagicLink(email)}
  onSso={() => goToSso()}
  onClose={() => closeModal()}
/>`}
      />

      <H2>Clean variant</H2>
      <P>Neutral surface — uses ZUI tokens, follows the active theme.</P>
      <PreviewTabs
        preview={
          <div className="flex w-full justify-center py-6">
            <SignInCard
              variant="clean"
              legal={legal}
              onProvider={() => {}}
              onEmailSubmit={() => {}}
              onSso={() => {}}
            />
          </div>
        }
        minHeight="42rem"
        code={`<SignInCard variant="clean" {...rest} />`}
      />

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: 'variant', type: '"gradient" | "clean"', defaultValue: '"gradient"', description: 'Visual style.' },
          { name: 'title',    type: 'string', defaultValue: '"Sign in to continue"', description: 'Heading.' },
          { name: 'subtitle', type: 'string', description: 'Optional sub-line under the heading.' },
          { name: 'providers', type: '("google" | "apple" | "microsoft" | "facebook")[]', defaultValue: 'all four', description: 'OAuth providers in display order.' },
          { name: 'onProvider', type: '(p: SignInProvider) => void', description: 'Click handler for any provider.' },
          { name: 'onEmailSubmit', type: '(email: string) => void | null', description: 'Email submit. Pass null to hide the email path.' },
          { name: 'onSso', type: '() => void', description: 'Enterprise SSO link click. Hidden if not set.' },
          { name: 'legal', type: 'ReactNode', description: 'Footer legal copy (JSX so you can add links).' },
          { name: 'onClose', type: '() => void', description: 'Top-right close button. Hidden if not set.' },
        ]}
      />
    </article>
  );
}
