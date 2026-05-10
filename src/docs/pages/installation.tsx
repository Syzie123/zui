import { CodeBlock } from '../CodeBlock';
import { H2, H3, P, InlineCode, InstallSnippet } from '../page-kit';

export default function Installation() {
  return (
    <article>
      <H2>Install dependencies</H2>
      <P>
        ZUI is a single ESM package — one barrel export, one stylesheet. React 18 or
        19 is the only required peer dependency.
      </P>
      <div className="my-4 grid gap-2 sm:grid-cols-3">
        <InstallSnippet pkg="@zui.react/zui" manager="npm" />
        <InstallSnippet pkg="@zui.react/zui" manager="pnpm" />
        <InstallSnippet pkg="@zui.react/zui" manager="yarn" />
      </div>

      <H2>Import the styles</H2>
      <P>
        Import the global stylesheet once at the top of your app entry. It contains
        the design tokens (including the new purple gradient brand surface),
        Tailwind base layer, and all keyframes.
      </P>
      <CodeBlock
        filename="src/main.tsx"
        code={`import '@zui.react/zui/styles.css';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(<App />);`}
      />

      <H2>Set the theme</H2>
      <P>
        Add a theme class to your <InlineCode>&lt;html&gt;</InlineCode> element. The
        default is <InlineCode>theme-clean</InlineCode>; the brand purple gradient
        landing only fully blooms on <InlineCode>theme-dark</InlineCode>.
      </P>
      <CodeBlock
        filename="index.html"
        language="html"
        code={`<html lang="en" class="theme-dark">
  <!-- or theme-clean / theme-luminous -->
</html>`}
      />

      <H2>Use a component</H2>
      <P>That's it. Import any component and start building.</P>
      <CodeBlock
        filename="src/App.tsx"
        code={`import { Button } from '@zui.react/zui';

export default function App() {
  return <Button>Get started</Button>;
}`}
      />

      <H2>Set up the MCP server (optional)</H2>
      <P>
        <InlineCode>@zui.react/mcp</InlineCode> lets any coding agent (Claude Code,
        Cursor, Windsurf, Continue, Zed, Replit Agent, GitHub Copilot, Antigravity)
        read the ZUI catalog directly — no hallucinated prop names, no stale import
        paths. One line:
      </P>
      <CodeBlock
        language="bash"
        code={`# Claude Code
claude mcp add zui -- npx -y @zui.react/mcp

# Cursor / Windsurf — drop into ~/.cursor/mcp.json (or windsurf equivalent)
{
  "mcpServers": {
    "zui": { "type": "stdio", "command": "npx", "args": ["-y", "@zui.react/mcp"] }
  }
}`}
      />
      <P>
        Once installed, ask the agent: <em>"Add a Button"</em>,{' '}
        <em>"scaffold a pricing page"</em>, <em>"show me the design tokens"</em>. The
        full editor matrix and the slash-command reference live on the{' '}
        <a className="text-[var(--color-accent-base)] underline" href="/components/mcp-introduction">
          MCP overview page
        </a>
        .
      </P>

      <H3>Tailwind v4 (optional)</H3>
      <P>
        ZUI works with or without Tailwind. If you already use Tailwind v4, our
        utility classes (<InlineCode>bg-[var(--color-bg-base)]</InlineCode>,
        spacing scale, radii) compose with yours — no config changes needed.
      </P>
    </article>
  );
}
