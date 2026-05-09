import { CodeBlock } from '../CodeBlock';
import { H2, H3, P, InlineCode } from '../page-kit';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../../components/Button';

export default function Theming() {
  const { theme, setTheme } = useTheme();

  return (
    <article>
      <H2>Three themes, one token system</H2>
      <P>
        Every color, space, radius, and duration is a CSS variable defined in{' '}
        <InlineCode>tokens.css</InlineCode>. Themes are class names that re-bind those
        variables — components don't know which theme they're in.
      </P>

      <H2>Try it live</H2>
      <P>Switch the theme on this page:</P>
      <div className="my-4 flex flex-wrap items-center gap-2">
        {(['clean', 'dark', 'luminous'] as const).map((t) => (
          <Button
            key={t}
            variant={theme === t ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setTheme(t)}
          >
            {t}
          </Button>
        ))}
      </div>

      <H2>Apply a theme</H2>
      <CodeBlock
        language="html"
        code={`<html class="theme-clean">     <!-- default -->
<html class="theme-dark">
<html class="theme-luminous">  <!-- branded marketing theme -->`}
      />

      <H3>Sub-tree theming</H3>
      <P>
        Wrap any element in a theme class to flip just that area. Useful for
        a "dark CTA on a light page".
      </P>
      <CodeBlock
        code={`<section className="theme-dark">
  <Button variant="primary">Get started</Button>
</section>`}
      />

      <H2>Tokens reference</H2>
      <P>
        Tokens are named by role, not literal value:{' '}
        <InlineCode>--color-bg-base</InlineCode>, not <InlineCode>--color-purple-500</InlineCode>.
      </P>
      <CodeBlock
        filename="tokens.css"
        language="css"
        code={`:root {
  /* Surfaces */
  --color-bg-base:     oklch(99% 0.003 250);
  --color-bg-subtle:   oklch(97% 0.005 250);
  --color-bg-elevated: oklch(100% 0 0);

  /* Foreground */
  --color-fg-base:  oklch(18% 0.02 260);
  --color-fg-muted: oklch(45% 0.015 250);

  /* Accent */
  --color-accent-base:  oklch(54% 0.22 274);
  --color-accent-soft:  oklch(96% 0.04 280);

  /* Spacing & radii */
  --space-4:    1rem;
  --radius-lg:  12px;
  --radius-2xl: 20px;

  /* Motion */
  --duration-fast: 120ms;
  --ease-out:      cubic-bezier(0.16, 1, 0.3, 1);
}`}
      />

      <H3>Why OKLCH</H3>
      <P>
        Perceptually uniform — adjusting lightness gives consistent visual weight
        across hues, unlike HSL where blue at 50% reads darker than yellow at 50%.
      </P>
    </article>
  );
}
