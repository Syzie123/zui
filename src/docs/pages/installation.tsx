import { CodeBlock } from '../CodeBlock';
import { H2, P, InlineCode, InstallSnippet } from '../page-kit';

export default function Installation() {
  return (
    <article>
      <H2>Install dependencies</H2>
      <P>Run one of the following commands in your project root:</P>
      <div className="my-4 grid gap-2 sm:grid-cols-3">
        <InstallSnippet pkg="@zui/react" manager="npm" />
        <InstallSnippet pkg="@zui/react" manager="pnpm" />
        <InstallSnippet pkg="@zui/react" manager="yarn" />
      </div>

      <H2>Import the styles</H2>
      <P>
        Import the global stylesheet once at the top of your app entry. It contains
        the design tokens and Tailwind base layer.
      </P>
      <CodeBlock
        filename="src/main.tsx"
        code={`import '@zui/react/styles.css';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(<App />);`}
      />

      <H2>Set the theme</H2>
      <P>
        Add a theme class to your <InlineCode>&lt;html&gt;</InlineCode> element. The default
        is <InlineCode>theme-clean</InlineCode>.
      </P>
      <CodeBlock
        filename="index.html"
        language="html"
        code={`<html lang="en" class="theme-clean">
  <!-- or theme-dark / theme-luminous -->
</html>`}
      />

      <H2>Use a component</H2>
      <P>That's it. Import any component and start building.</P>
      <CodeBlock
        filename="src/App.tsx"
        code={`import { Button } from '@zui/react';

export default function App() {
  return <Button>Get started</Button>;
}`}
      />
    </article>
  );
}
