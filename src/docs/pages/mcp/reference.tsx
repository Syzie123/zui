import { CodeBlock } from '../../CodeBlock';
import { H2, H3, P, InlineCode, PropsTable } from '../../page-kit';
import { COUNTS } from '../../registry';

export default function MCPReference() {
  return (
    <article>
      <H2>Tools</H2>
      <P>
        14 tools, organised by intent. Every tool returns a JSON payload as
        text content; action tools also include a <InlineCode>structuredContent</InlineCode>{' '}
        block your editor can parse without re-tokenising.
      </P>

      <H3>Discovery</H3>
      <PropsTable
        rows={[
          { name: 'list_components', type: '{ group?, includeNew? }', description: `List all ${COUNTS.components} components with name, slug, group, one-line description.` },
          { name: 'list_patterns', type: '{ group? }', description: `List all ${COUNTS.patterns} patterns. Filter by Patterns, AI, 3D, Ecommerce.` },
          { name: 'list_effects', type: '{}', description: `List all ${COUNTS.effects} motion effects.` },
          { name: 'list_icons', type: '{ tag? }', description: `List all ${COUNTS.icons} brand & AI-IDE icons. Filter by tag (social / ai / ide).` },
          { name: 'list_groups', type: '{}', description: 'Sidebar group order — same as the docs site.' },
          { name: 'search', type: '{ query, kinds?, limit? }', description: 'Unified BM25 search across components, patterns, effects, and icons.' },
        ]}
      />

      <H3>Read-deep</H3>
      <PropsTable
        rows={[
          { name: 'get_component', type: '{ name, includeSource? }', description: 'Full record — import path, source path, CSS path, docs URL, tags. Optional inline source.' },
          { name: 'get_pattern', type: '{ name, includeSource? }', description: 'Same shape as get_component.' },
          { name: 'get_effect', type: '{ name, includeSource? }', description: 'Same shape — limited to motion effects.' },
          { name: 'get_icon', type: '{ name }', description: 'Brand or IDE icon — name, import path, tags, ready-to-paste usage snippet.' },
          { name: 'get_design_tokens', type: '{ theme?, format? }', description: 'Full token set. theme: theme-clean | theme-dark | theme-luminous | all. format: json | css.' },
        ]}
      />

      <H3>Action</H3>
      <P>
        Action tools never touch your filesystem. They return a{' '}
        <InlineCode>files</InlineCode> array of proposed diffs the host editor
        applies — same model shadcn uses. Works in remote / sandboxed environments.
      </P>
      <PropsTable
        rows={[
          { name: 'add_component', type: '{ name, usage?, dest?, dryRun? }', description: 'Plan a file diff that adds a component. usage: "import" (default, uses the published package) or "copy" (forkable source).' },
          { name: 'add_pattern', type: '{ name, usage?, dest?, dryRun? }', description: 'Same as add_component for patterns.' },
          { name: 'scaffold_page', type: '{ pageType, outputPath, theme?, patternRefs? }', description: 'Generate a complete TSX page. pageType: landing | dashboard | auth | pricing | showcase.' },
        ]}
      />

      <H3>Tool example — add_component</H3>
      <P>Calling <InlineCode>add_component name="Button"</InlineCode> returns:</P>
      <CodeBlock
        language="json"
        code={`{
  "files": [
    {
      "path": "src/components/zui-demos/button.tsx",
      "action": "create",
      "language": "typescript-react",
      "contents": "import { Button } from '@zui.react/zui';\\nimport '@zui.react/zui/styles.css';\\n\\nexport function ButtonDemo() {\\n  return <Button />;\\n}\\n"
    }
  ],
  "dependencies": { "@zui.react/zui": "^0.8.1" },
  "notes": [
    "import { Button } from '@zui.react/zui';",
    "import '@zui.react/zui/styles.css';",
    "Demo file ready at src/components/zui-demos/button.tsx."
  ]
}`}
      />

      <H2>Resources</H2>
      <P>
        Resources are addressable read-only data the agent attaches as context.
        In Claude Code, type <InlineCode>@</InlineCode> and pick a{' '}
        <InlineCode>zui:</InlineCode> URI — content gets inlined without a tool
        call.
      </P>

      <H3>Direct (fixed URIs)</H3>
      <PropsTable
        rows={[
          { name: 'zui://manifest', type: 'application/json', description: 'Counts, version, sidebar group order.' },
          { name: 'zui://design-tokens', type: 'application/json', description: 'All tokens for all three themes (incl. the new purple gradient).' },
          { name: 'zui://design-tokens.css', type: 'text/css', description: 'Same as above, rendered as a drop-in CSS file.' },
          { name: 'zui://component-api', type: 'application/json', description: 'Slim catalog of components + patterns + effects with import paths and tags.' },
          { name: 'zui://icons/all', type: 'application/json', description: 'Names + import paths + tags for every inline brand / IDE icon.' },
          { name: 'zui://llms.txt', type: 'text/plain', description: '~2 KB plaintext digest of the entire library — use when context is tight.' },
        ]}
      />

      <H3>Templates (parameterized)</H3>
      <PropsTable
        rows={[
          { name: 'zui://components/{name}/source', type: 'application/typescript', description: 'TSX source for a component. Example: zui://components/Button/source.' },
          { name: 'zui://components/{name}/css', type: 'text/css', description: 'Component-scoped CSS file when present.' },
          { name: 'zui://patterns/{name}/source', type: 'application/typescript', description: `Full source for any of the ${COUNTS.patterns} patterns.` },
          { name: 'zui://patterns/{name}/css', type: 'text/css', description: 'Pattern-scoped CSS — useful when copying without using the published package.' },
          { name: 'zui://effects/{name}/source', type: 'application/typescript', description: 'TSX source for a motion effect.' },
          { name: 'zui://icons/{name}.svg', type: 'image/svg+xml', description: 'Inline SVG markup for any brand or IDE icon.' },
        ]}
      />

      <H2>Prompts (slash commands)</H2>
      <P>
        Six prompts surface as native slash commands in Claude Code (and in any
        editor that supports MCP prompts). Argument completions are wired to the
        registry — typing <InlineCode>/zui:add-component But</InlineCode> autocompletes
        to <InlineCode>Button</InlineCode>.
      </P>
      <PropsTable
        rows={[
          { name: '/zui:add-component', type: '{ component, dest? }', description: 'Add a component to your project — server returns the file diff for the host editor to apply.' },
          { name: '/zui:scaffold-page', type: '{ pageType, outputPath, theme? }', description: 'Generate a full TSX page from one or more ZUI patterns.' },
          { name: '/zui:find-pattern', type: '{ useCase, category? }', description: 'Search ZUI patterns by use-case (e.g. "AI chat composer", "tilted talent grid").' },
          { name: '/zui:apply-effect', type: '{ effect, targetComponent }', description: 'Wrap a component or div with one of the motion effects.' },
          { name: '/zui:design-system', type: '{ category?, theme? }', description: 'Pull the design tokens for any theme in markdown format.' },
          { name: '/zui:component-deep-dive', type: '{ component, focus? }', description: 'Explain a component in depth — props, examples, accessibility, when to use it.' },
        ]}
      />

      <H2>Capabilities</H2>
      <P>The server advertises:</P>
      <CodeBlock
        language="json"
        code={`{
  "tools":     { "listChanged": false },
  "resources": { "listChanged": false, "subscribe": false },
  "prompts":   { "listChanged": false },
  "logging":   {}
}`}
      />
      <P>
        The catalog is static — there's no <InlineCode>listChanged</InlineCode>{' '}
        notification because tool / resource / prompt counts are baked in at
        build time. Server logs go to stderr tagged{' '}
        <InlineCode>[zui-mcp]</InlineCode>.
      </P>

      <H2>JSON-RPC frame example</H2>
      <P>If you want to drive the server directly, here's the minimum handshake:</P>
      <CodeBlock
        language="json"
        code={`-> {"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0.0.1"}}}
<- {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-03-26","capabilities":{...},"serverInfo":{"name":"zui","version":"0.8.1"}}}

-> {"jsonrpc":"2.0","method":"notifications/initialized"}
-> {"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search","arguments":{"query":"button","limit":3}}}
<- {"jsonrpc":"2.0","id":2,"result":{"content":[{"type":"text","text":"..."}],"structuredContent":{...}}}`}
      />
    </article>
  );
}
