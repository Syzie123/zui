/**
 * Prompts — surface as slash commands in Claude Code:
 *   /zui:add-component   /zui:scaffold-page   /zui:find-pattern
 *   /zui:apply-effect    /zui:design-system   /zui:component-deep-dive
 *
 * Each prompt expands into a primed user message; Claude then picks the
 * right tool(s) automatically. The `arguments` array drives autocomplete.
 */

import type { Prompt, GetPromptResult } from '@modelcontextprotocol/sdk/types.js';

export const prompts: Prompt[] = [
  {
    name: 'add-component',
    description: 'Add a ZUI component to your project — server returns the file diff for the host editor.',
    arguments: [
      { name: 'component', description: 'Component name (e.g. Button, Card, Modal).', required: true },
      { name: 'dest', description: 'Destination directory. Default: src/components/zui-demos', required: false },
    ],
  },
  {
    name: 'scaffold-page',
    description: 'Generate a full TSX page from one or more ZUI patterns.',
    arguments: [
      { name: 'pageType', description: 'landing | dashboard | auth | pricing | showcase', required: true },
      { name: 'outputPath', description: 'Where to write the page, eg. src/app/page.tsx', required: true },
      { name: 'theme', description: 'light | dark | auto. Default auto.', required: false },
    ],
  },
  {
    name: 'find-pattern',
    description: 'Search ZUI patterns by use-case (e.g. "AI chat composer", "tilted talent grid").',
    arguments: [
      { name: 'useCase', description: 'What are you building?', required: true },
      { name: 'category', description: 'Optional group filter — Patterns / AI / 3D / Ecommerce.', required: false },
    ],
  },
  {
    name: 'apply-effect',
    description: 'Wrap a ZUI component or div with one of the motion effects (Marquee, BorderBeam, Dock, …).',
    arguments: [
      { name: 'effect', description: 'Effect name.', required: true },
      { name: 'targetComponent', description: 'Component or selector to wrap.', required: true },
    ],
  },
  {
    name: 'design-system',
    description: 'Pull the ZUI design tokens (colors, gradients, typography, shadows) for any theme.',
    arguments: [
      { name: 'category', description: 'colors | typography | shadows | gradients | all. Default all.', required: false },
      { name: 'theme', description: 'theme-clean | theme-dark | theme-luminous | all. Default all.', required: false },
    ],
  },
  {
    name: 'component-deep-dive',
    description: 'Explain a component in depth — props, examples, accessibility, when to use it.',
    arguments: [
      { name: 'component', description: 'Component name or slug.', required: true },
      { name: 'focus', description: 'props | examples | a11y | variants', required: false },
    ],
  },
];

/* ── Handlers ──────────────────────────────────────────────────────────── */

export async function getPrompt(name: string, args: Record<string, string>): Promise<GetPromptResult> {
  switch (name) {
    case 'add-component': {
      const component = need(args, 'component');
      const dest = args.dest ?? 'src/components/zui-demos';
      return {
        description: `Add the ${component} component to ${dest}`,
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text:
                `Add the ZUI component "${component}" to my project.\n` +
                `1. Call \`get_component\` with name="${component}" so we know the import path.\n` +
                `2. Call \`add_component\` with name="${component}", dest="${dest}", usage="import".\n` +
                `3. Apply the file diff it returns and run my package manager to install \`@zui.react/zui\`.\n` +
                `Confirm the demo file works without edits.`,
            },
          },
        ],
      };
    }

    case 'scaffold-page': {
      const pageType = need(args, 'pageType');
      const outputPath = need(args, 'outputPath');
      const theme = args.theme ?? 'auto';
      return {
        description: `Scaffold a ${pageType} page`,
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text:
                `Scaffold a ${pageType} page at ${outputPath}.\n` +
                `1. Call \`scaffold_page\` with pageType="${pageType}", outputPath="${outputPath}", theme="${theme}".\n` +
                `2. Apply the returned file.\n` +
                `3. If the project doesn't already depend on @zui.react/zui, install it.\n` +
                `4. Show me a summary of which patterns the scaffold used.`,
            },
          },
        ],
      };
    }

    case 'find-pattern': {
      const useCase = need(args, 'useCase');
      const category = args.category;
      return {
        description: `Find a pattern for "${useCase}"`,
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text:
                `I'm building "${useCase}". Find the best ZUI pattern fit.\n` +
                `1. Call \`search\` with query="${useCase}"${category ? `, kinds=["pattern"]` : ''}.\n` +
                `2. From the top 3 results, summarise each in one sentence.\n` +
                `3. Recommend one and explain why it fits.\n` +
                (category ? `Restrict to the "${category}" group.` : ''),
            },
          },
        ],
      };
    }

    case 'apply-effect': {
      const effect = need(args, 'effect');
      const target = need(args, 'targetComponent');
      return {
        description: `Apply ${effect} to ${target}`,
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text:
                `Wrap \`${target}\` with the ZUI effect "${effect}".\n` +
                `1. Call \`get_effect\` with name="${effect}" so we have the right import + props.\n` +
                `2. Show the minimal JSX wrapping ${target} with that effect.\n` +
                `3. Mention any required CSS imports.`,
            },
          },
        ],
      };
    }

    case 'design-system': {
      const category = args.category ?? 'all';
      const theme = args.theme ?? 'all';
      return {
        description: `Show ZUI design tokens — ${category} / ${theme}`,
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text:
                `Show me the ZUI design tokens.\n` +
                `1. Call \`get_design_tokens\` with theme="${theme}".\n` +
                (category !== 'all' ? `2. Filter the result to "${category}".\n` : '') +
                `3. Render as a tidy markdown table grouped by section. Highlight gradients separately.`,
            },
          },
        ],
      };
    }

    case 'component-deep-dive': {
      const component = need(args, 'component');
      const focus = args.focus ?? 'props';
      return {
        description: `Deep dive on ${component} (${focus})`,
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text:
                `Deep dive on the ZUI component \`${component}\`.\n` +
                `1. Call \`get_component\` with name="${component}", includeSource=true.\n` +
                `2. Read the source. Then explain the ${focus} of the component clearly.\n` +
                `3. Show 1-2 practical usage examples.\n` +
                `4. Mention any tokens (colors, spacing) the component reads from the design system.`,
            },
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown prompt: ${name}`);
  }
}

function need(args: Record<string, string>, key: string): string {
  const v = args[key];
  if (!v) throw new Error(`Missing required argument: ${key}`);
  return v;
}
