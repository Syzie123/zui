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
        code={`<html class="theme-dark">     <!-- default in v0.8 — premium purple gradient -->
<html class="theme-clean">    <!-- light surface, purple accent retained -->
<html class="theme-luminous"> <!-- branded marketing theme, deeper saturation -->`}
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

      <H2>Brand palette</H2>
      <P>
        v0.8 introduces a single brand gradient as a first-class token. The same
        gradient is used by <InlineCode>Button</InlineCode> primary, hero CTAs, and
        the landing page surface.
      </P>
      <CodeBlock
        filename="tokens.css"
        language="css"
        code={`/* Primary purple — four-stop diagonal */
--gradient-primary: linear-gradient(
  135deg,
  #6d28d9 0%,    /* deep violet */
  #7c3aed 30%,   /* primary purple */
  #8b5cf6 60%,   /* soft bright purple */
  #5b21b6 100%   /* dark royal violet */
);

/* Page surface in dark mode */
--gradient-bg-dark: linear-gradient(
  135deg,
  #04020a 0%,
  #090512 30%,
  #120a24 65%,
  #06030d 100%
);

/* Two radial blooms layered on top for ambient color */
--gradient-bg-glow:
  radial-gradient(circle at 20% 20%, rgb(185 120 255 / 0.18), transparent 35%),
  radial-gradient(circle at 80% 70%, rgb(124  58 237 / 0.15), transparent 40%);

/* Top-edge white sheen used by the premium button + cards */
--gradient-glass-overlay:
  linear-gradient(180deg, rgb(255 255 255 / 0.08) 0%, rgb(255 255 255 / 0.02) 100%);`}
      />

      <H2>Tokens reference</H2>
      <P>
        Tokens are named by role, not literal value:{' '}
        <InlineCode>--color-bg-base</InlineCode>, not <InlineCode>--color-purple-500</InlineCode>.
      </P>
      <CodeBlock
        filename="tokens.css"
        language="css"
        code={`:root, .theme-clean {
  /* Surfaces */
  --color-bg-base:     oklch(99.2% 0.003 250);
  --color-bg-subtle:   oklch(97.5% 0.005 250);
  --color-bg-elevated: oklch(100%  0     0);

  /* Foreground */
  --color-fg-base:  oklch(18% 0.02 260);
  --color-fg-muted: oklch(45% 0.015 250);

  /* Accent — solo color tokens (focus rings, links, soft pills) */
  --color-accent-base:  #7c3aed;
  --color-accent-soft:  oklch(96% 0.04 287);
  --color-accent-fg:    #ffffff;

  /* Spacing & radii */
  --space-4:    1rem;
  --radius-lg:  12px;
  --radius-2xl: 20px;

  /* Motion */
  --duration-fast: 120ms;
  --ease-out:      cubic-bezier(0.16, 1, 0.3, 1);
}`}
      />

      <H3>Premium button — five-layer shadow stack</H3>
      <P>
        The <InlineCode>Button variant="primary"</InlineCode> uses a single class
        that stacks the brand gradient with four shadow layers — top-edge gloss,
        internal depth shade, outer purple ambient, grounded dark drop. No hover
        glow; press feedback only.
      </P>
      <CodeBlock
        filename="tokens.css"
        language="css"
        code={`/* Inner highlight — top-edge gloss line */
--shadow-btn-purple-inner-highlight: inset 0 1px 0 rgb(255 255 255 / 0.14);

/* Inner depth — bottom shade pulling the button "in" */
--shadow-btn-purple-inner-depth:     inset 0 -8px 18px rgb(0 0 0 / 0.35);

/* Outer purple ambient glow — colored shadow */
--shadow-btn-purple-outer-glow:      0 10px 30px rgb(91 33 182 / 0.30);

/* Grounded dark drop — keeps the button anchored */
--shadow-btn-purple-dark:            0 2px 10px rgb(0 0 0 / 0.45);

/* Glass border — almost invisible but adds the premium edge */
--border-glass:                      1px solid rgb(255 255 255 / 0.08);`}
      />

      <H3>Why OKLCH</H3>
      <P>
        Solid color tokens use OKLCH because it's perceptually uniform — adjusting
        lightness gives consistent visual weight across hues, unlike HSL where blue
        at 50% reads darker than yellow at 50%. The brand gradient is hex because
        the four stops were authored that way; both forms compose freely.
      </P>
    </article>
  );
}
