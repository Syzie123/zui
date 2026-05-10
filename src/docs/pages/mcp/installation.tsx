import { CodeBlock } from '../../CodeBlock';
import { H2, H3, P, InlineCode } from '../../page-kit';
import { AgentRow, findAgent } from '../../AgentList';

/* Tiny inline helper — renders <H2 with the agent's brand icon prefix>. */
const Sec = ({ name }: { name: string }) => {
  const agent = findAgent(name);
  if (!agent) return <H2>{name}</H2>;
  const { Icon } = agent;
  return (
    <H2 className="flex items-center gap-3">
      <span className="inline-flex size-8 items-center justify-center rounded-[10px] bg-[var(--color-bg-elevated)] border border-[var(--color-border-base)] shadow-[var(--shadow-xs)]">
        <Icon size={20} />
      </span>
      {agent.name}
    </H2>
  );
};

export default function MCPInstallation() {
  return (
    <article>
      <H2>Install for your editor</H2>
      <P>
        Every major coding agent ships with MCP support in 2026. The config shape
        is identical across all of them — a <InlineCode>stdio</InlineCode> server
        that runs <InlineCode>npx -y @zui.react/mcp</InlineCode>. Only the config
        file location differs.
      </P>

      {/* Visual index of every agent we cover below — clickable too if a
          reader just wants to jump straight to their tool. */}
      <AgentRow tone="neutral" className="my-6 justify-start" />


      <Sec name="Claude Code" />
      <P>
        One command. Claude Code stores it in <InlineCode>~/.claude.json</InlineCode>{' '}
        (per-project) or <InlineCode>.mcp.json</InlineCode> at the repo root if you
        use <InlineCode>--scope project</InlineCode>.
      </P>
      <CodeBlock
        language="bash"
        code={`# Per-project (default)
claude mcp add zui -- npx -y @zui.react/mcp

# Shared with your team via git
claude mcp add --scope project zui -- npx -y @zui.react/mcp

# Available in every project on this machine
claude mcp add --scope user zui -- npx -y @zui.react/mcp`}
      />

      <Sec name="Cursor" />
      <P>
        Edit <InlineCode>~/.cursor/mcp.json</InlineCode>:
      </P>
      <CodeBlock
        filename="~/.cursor/mcp.json"
        language="json"
        code={`{
  "mcpServers": {
    "zui": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@zui.react/mcp"]
    }
  }
}`}
      />

      <Sec name="Windsurf" />
      <P>
        Edit <InlineCode>~/.codeium/windsurf/mcp_config.json</InlineCode> — same
        JSON as Cursor.
      </P>

      <Sec name="Continue" />
      <CodeBlock
        filename="~/.continue/config.yaml"
        language="yaml"
        code={`mcpServers:
  zui:
    command: npx
    args: ["-y", "@zui.react/mcp"]`}
      />

      <Sec name="Zed" />
      <P>
        Settings → MCP → add stdio server with command{' '}
        <InlineCode>npx -y @zui.react/mcp</InlineCode>.
      </P>

      <H2 className="flex items-center gap-3">
        <span className="inline-flex size-8 items-center justify-center rounded-[10px] bg-[var(--color-bg-elevated)] border border-[var(--color-border-base)] shadow-[var(--shadow-xs)]">
          {(() => {
            const c = findAgent('Copilot');
            return c ? <c.Icon size={20} /> : null;
          })()}
        </span>
        VS Code (Copilot)
      </H2>
      <P>
        Project-scoped <InlineCode>.vscode/mcp.json</InlineCode>:
      </P>
      <CodeBlock
        filename=".vscode/mcp.json"
        language="json"
        code={`{
  "mcpServers": {
    "zui": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@zui.react/mcp"]
    }
  }
}`}
      />

      <Sec name="Antigravity" />
      <P>
        Project-level <InlineCode>.antigravity/mcp.json</InlineCode> — identical to
        VS Code.
      </P>

      <Sec name="Replit Agent" />
      <P>
        Replit MCP marketplace listing — one click. Search for{' '}
        <strong>ZUI</strong>.
      </P>

      <H2>Verify the install</H2>
      <P>
        After adding, restart your editor. In Claude Code you can run{' '}
        <InlineCode>claude mcp list</InlineCode> and see <InlineCode>zui</InlineCode>{' '}
        in the output. Type <InlineCode>/zui:</InlineCode> in any chat — your
        editor should autocomplete six slash commands.
      </P>

      <H3>Troubleshooting</H3>
      <P>
        <strong>Server doesn't show up.</strong> Confirm Node 18+ is on{' '}
        <InlineCode>PATH</InlineCode>. <InlineCode>npx -y @zui.react/mcp</InlineCode>{' '}
        downloads the package on first run; if your network blocks{' '}
        <InlineCode>registry.npmjs.org</InlineCode>, install it explicitly with{' '}
        <InlineCode>npm i -g @zui.react/mcp</InlineCode> and call the binary{' '}
        <InlineCode>zui-mcp</InlineCode> directly in your config.
      </P>
      <P>
        <strong>Tools missing.</strong> The server advertises{' '}
        <InlineCode>tools</InlineCode>, <InlineCode>resources</InlineCode>, and{' '}
        <InlineCode>prompts</InlineCode> capabilities. If your editor doesn't see
        all three, it may need restart after adding. Stderr logs are tagged{' '}
        <InlineCode>[zui-mcp]</InlineCode> — start the editor from a terminal to
        see them.
      </P>
      <P>
        <strong>Behind a corporate proxy.</strong> Set{' '}
        <InlineCode>HTTP_PROXY</InlineCode> /{' '}
        <InlineCode>HTTPS_PROXY</InlineCode> in the env block of your MCP config —
        passed straight through to npx.
      </P>

      <H3>Pin a version</H3>
      <P>
        Default <InlineCode>npx</InlineCode> resolves to the latest published
        package. Pin a specific version to avoid surprises:
      </P>
      <CodeBlock
        language="bash"
        code={`claude mcp add zui -- npx -y @zui.react/mcp@0.8.0`}
      />
    </article>
  );
}
