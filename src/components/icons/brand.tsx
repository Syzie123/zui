import { cn } from '../../utils/cn';

/**
 * Brand icons — inline SVGs (no extra dependencies, no remote requests).
 * Each accepts a `className` and inherits its size from the parent's `size-*`
 * Tailwind class. Colors are baked in (Google = multi-color, Apple = currentColor,
 * etc.) so they look correct on any background.
 */

interface BrandIconProps {
  className?: string;
  /** Force a specific size in pixels. Otherwise inherits from className. */
  size?: number;
}

const baseProps = (size: number | undefined, className: string | undefined) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: cn('shrink-0', className),
  'aria-hidden': true,
});

export function GoogleIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M22.501 12.233c0-.819-.073-1.605-.21-2.36H12.214v4.464h5.778a4.94 4.94 0 0 1-2.144 3.243v2.696h3.473c2.032-1.873 3.2-4.628 3.2-7.943"
        fill="#4285F4"
      />
      <path
        d="M12.214 22.5c2.901 0 5.336-.962 7.114-2.604l-3.473-2.696c-.963.645-2.198 1.025-3.641 1.025-2.799 0-5.169-1.89-6.014-4.428H2.612v2.785A10.495 10.495 0 0 0 12.214 22.5"
        fill="#34A853"
      />
      <path
        d="M6.2 13.797a6.31 6.31 0 0 1 0-4.04V6.972H2.612a10.504 10.504 0 0 0 0 9.61L6.2 13.798"
        fill="#FBBC05"
      />
      <path
        d="M12.214 5.33c1.578 0 2.994.543 4.108 1.609l3.083-3.082C17.546 2.13 15.11 1.124 12.214 1.124a10.494 10.494 0 0 0-9.602 5.847L6.2 9.756c.845-2.538 3.215-4.427 6.014-4.427"
        fill="#EA4335"
      />
    </svg>
  );
}

export function AppleIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M17.05 12.536c-.027-2.737 2.235-4.052 2.337-4.116-1.273-1.86-3.255-2.115-3.962-2.144-1.69-.17-3.295.989-4.155.989-.86 0-2.183-.964-3.59-.937C5.853 6.355 4.224 7.4 3.323 9.04c-1.882 3.265-.482 8.106 1.349 10.756.892 1.295 1.957 2.756 3.357 2.704 1.345-.054 1.853-.871 3.477-.871 1.625 0 2.082.871 3.508.84 1.448-.026 2.367-1.32 3.252-2.625 1.024-1.508 1.443-2.964 1.469-3.039-.032-.014-2.819-1.084-2.847-4.299M14.408 4.65c.747-.903 1.245-2.158 1.108-3.402-1.073.043-2.367.713-3.139 1.616-.69.799-1.296 2.072-1.131 3.293 1.197.093 2.42-.609 3.162-1.507"
        fill="currentColor"
      />
    </svg>
  );
}

export function MicrosoftIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M11.4 2H2v9.4h9.4V2Z" fill="#F25022" />
      <path d="M22 2h-9.4v9.4H22V2Z" fill="#7FBA00" />
      <path d="M11.4 12.6H2V22h9.4v-9.4Z" fill="#00A4EF" />
      <path d="M22 12.6h-9.4V22H22v-9.4Z" fill="#FFB900" />
    </svg>
  );
}

export function FacebookIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.99 3.657 9.128 8.438 9.879V14.89H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12"
        fill="#1877F2"
      />
      <path
        d="m15.893 14.89.443-2.89h-2.773v-1.875c0-.792.387-1.563 1.63-1.563h1.26v-2.46s-1.144-.195-2.238-.195c-2.285 0-3.778 1.384-3.778 3.89V12h-2.54v2.89h2.54v6.989a10.06 10.06 0 0 0 3.126 0v-6.989h2.33"
        fill="#fff"
      />
    </svg>
  );
}

export function XIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M18.244 2h3.308L14.32 10.27 22.835 22h-6.66l-5.214-6.83L4.99 22h-3.31l7.731-8.85L1.165 2h6.829l4.713 6.234L18.244 2zm-1.16 18.038h1.832L7.054 3.832H5.087L17.084 20.038z"
        fill="currentColor"
      />
    </svg>
  );
}

export function GithubBrandIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.7 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.162 22 16.416 22 12c0-5.523-4.477-10-10-10z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ─────────────── AI / dev / product brands ─────────────── */

export function OpenAIIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function AnthropicIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M13.827 3.52h3.603L24 20.481h-3.603l-6.57-16.961zM6.484 3.52L0 20.481h3.685l1.327-3.474h6.788l1.326 3.474h3.685L10.327 3.52H6.484zm-.272 10.4l2.193-5.798 2.193 5.798H6.213z"
        fill="#D97757"
      />
    </svg>
  );
}

export function ZoomIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <rect width="24" height="24" rx="6" fill="#2D8CFF" />
      <path
        d="M5.5 9.2c0-.66.54-1.2 1.2-1.2h6.6c.66 0 1.2.54 1.2 1.2v5.6c0 .66-.54 1.2-1.2 1.2H6.7c-.66 0-1.2-.54-1.2-1.2V9.2zm10 1.4l3-1.85c.4-.24.9.05.9.5v5.5c0 .45-.5.74-.9.5l-3-1.85v-2.8z"
        fill="#fff"
      />
    </svg>
  );
}

export function SlackIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"
        fill="#E01E5A"
      />
      <path
        d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"
        fill="#36C5F0"
      />
      <path
        d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"
        fill="#2EB67D"
      />
      <path
        d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
        fill="#ECB22E"
      />
    </svg>
  );
}

export function FramerIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M4 0h16v8h-8L4 0z" fill="#0055FF" />
      <path d="M4 8h8l8 8H4V8z" fill="#00AAFF" />
      <path d="M4 16h8v8l-8-8z" fill="#88DDFF" />
    </svg>
  );
}

export function LoomIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <circle cx="12" cy="12" r="10" fill="#625DF5" />
      <path
        d="M11.997 6.86l3.97 2.292-3.97 2.293V6.86zM10.21 6.66l3.473 4.41-5.485 1.47 2.012-5.88zM7.54 9.36l5.483 1.47-4.026 4.024-1.456-5.494zM6.86 12.95l5.494 1.456-4.025 4.025-1.469-5.481zM10.234 16.973l1.47-5.484 4.026 4.025-5.496 1.459zM13.95 17.652l-2.293-3.97 5.879 2.011-3.586 1.96zM17.114 14.62l-1.456-5.495 5.484 1.47-4.028 4.024z"
        fill="#fff"
      />
    </svg>
  );
}

export function HopinIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <defs>
        <linearGradient id="hopin-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3D33D2" />
          <stop offset="1" stopColor="#FF4FB6" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#hopin-grad)" />
      <circle cx="12" cy="12" r="3.6" fill="#fff" />
      <path
        d="M5 6h2v12H5V6zm12 0h2v12h-2V6z"
        fill="#fff"
        fillOpacity="0.9"
      />
    </svg>
  );
}

export function NotionIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <rect width="24" height="24" rx="4" fill="#fff" stroke="#000" strokeOpacity="0.08" />
      <path
        d="M6.45 5.5l9.85-.7c1.21-.1 1.52.6 1.52 1.39v11.6c0 .8-.3 1.27-1.31 1.34l-9.42.55c-.81.05-1.21-.07-1.66-.62L4.4 17.78c-.5-.66-.7-1.13-.7-1.7V7.04c0-.7.3-1.27 1.05-1.34l1.7-.2z"
        fill="#000"
        fillOpacity="0.04"
      />
      <path
        d="M16.3 4.8l-9.85.7-1.7.2C4 5.77 3.7 6.34 3.7 7.04v9.04c0 .57.2 1.04.7 1.7l1.03 1.28c.45.55.85.67 1.66.62l9.42-.55c1.01-.07 1.31-.54 1.31-1.34V6.19c0-.79-.31-1.49-1.52-1.39zm-9.07 1.97l9.4-.69c.16-.01.25.07.25.21v.96c0 .15-.09.24-.27.25l-1.4.08v9.45c-.01.15-.1.23-.27.25l-1.84.1c-.18.01-.27-.07-.27-.22V8.7l-1.62.1v8.43c0 .15-.09.23-.27.25l-1.84.11c-.18.01-.27-.08-.27-.22V8.94l-1.6.1v7.49c0 .15-.09.23-.27.24l-1.81.11c-.18.01-.27-.07-.27-.22V7.49c0-.31.06-.4.36-.42l1.99-.13z"
        fill="#000"
      />
    </svg>
  );
}

export function FigmaIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 0 0 0 8z" fill="#0ACF83" />
      <path d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" fill="#A259FF" />
      <path d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" fill="#F24E1E" />
      <path d="M12 0h4a4 4 0 0 1 0 8h-4V0z" fill="#FF7262" />
      <path d="M20 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" fill="#1ABCFE" />
    </svg>
  );
}

export function CursorIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <defs>
        <linearGradient id="cur-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#181818" />
          <stop offset="1" stopColor="#2A2A2A" />
        </linearGradient>
      </defs>
      <path
        d="M12 1.5L21.5 7v10L12 22.5 2.5 17V7L12 1.5z"
        fill="url(#cur-grad)"
        stroke="oklch(100% 0 0 / 0.1)"
      />
      <path d="M12 12L2.5 7v10L12 22.5V12z" fill="#fff" fillOpacity="0.16" />
      <path d="M12 12l9.5-5v10L12 22.5V12z" fill="#fff" fillOpacity="0.06" />
      <path d="M12 12L2.5 7 12 1.5 21.5 7 12 12z" fill="#fff" fillOpacity="0.32" />
    </svg>
  );
}

export function GeminiIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <defs>
        <linearGradient id="gem-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1C7ED6" />
          <stop offset="0.5" stopColor="#9775FA" />
          <stop offset="1" stopColor="#F783AC" />
        </linearGradient>
      </defs>
      <path
        d="M12 2c.6 4.5 2.6 7.5 8 8-5.4.5-7.4 3.5-8 8-.6-4.5-2.6-7.5-8-8 5.4-.5 7.4-3.5 8-8z"
        fill="url(#gem-grad)"
      />
    </svg>
  );
}

/* ─────────────── AI IDEs / AI tools ─────────────── */

/** Claude — Anthropic's "spark" mark, four-rayed soft star. */
export function ClaudeIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M12 1.5c.32 3.34 1.86 5.55 4.78 6.45-2.92.9-4.46 3.11-4.78 6.45-.32-3.34-1.86-5.55-4.78-6.45 2.92-.9 4.46-3.11 4.78-6.45zM18.5 13c.18 1.86 1.04 3.09 2.66 3.59-1.62.5-2.48 1.73-2.66 3.59-.18-1.86-1.04-3.09-2.66-3.59 1.62-.5 2.48-1.73 2.66-3.59zM6 15.5c.13 1.39.78 2.31 1.99 2.69C6.78 18.57 6.13 19.49 6 20.88c-.13-1.39-.78-2.31-1.99-2.69 1.21-.38 1.86-1.3 1.99-2.69z"
        fill="#D97757"
      />
    </svg>
  );
}

/** Windsurf — Codeium's editor mark, green W. */
export function WindsurfIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <defs>
        <linearGradient id="wsf-grad" x1="2" y1="20" x2="22" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0EE5A6" />
          <stop offset="1" stopColor="#0EAA72" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="#0B1F18" />
      <path
        d="M3.5 9 L7 18 L9.5 11 L12 18 L14.5 11 L17 18 L20.5 9"
        stroke="url(#wsf-grad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** GitHub Copilot — its rounded chrome-headphone silhouette. */
export function CopilotIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path
        d="M5.5 11.5c0-3.31 2.69-6 6-6h1c3.31 0 6 2.69 6 6v.8c.93.27 1.6 1.13 1.6 2.15v1.6c0 1.01-.67 1.87-1.6 2.14V19c0 .55-.45 1-1 1H5.5c-.55 0-1-.45-1-1v-.81c-.93-.27-1.6-1.13-1.6-2.14v-1.6c0-1.02.67-1.88 1.6-2.15v-.8z"
        fill="#1F1F1F"
      />
      <circle cx="9" cy="14.5" r="1.4" fill="#fff" />
      <circle cx="15" cy="14.5" r="1.4" fill="#fff" />
      <path
        d="M11.5 4.5h1c.5 0 .9.4.9.9V7h-2.8V5.4c0-.5.4-.9.9-.9z"
        fill="#1F1F1F"
      />
    </svg>
  );
}

/** Google Antigravity — the spiral / orbit mark. */
export function AntigravityIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <defs>
        <linearGradient id="agv-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4285F4" />
          <stop offset="0.5" stopColor="#9B72CB" />
          <stop offset="1" stopColor="#EA4335" />
        </linearGradient>
      </defs>
      <path
        d="M12 3c4.97 0 9 4.03 9 9 0 2-1 3.5-2.5 3.5-1.4 0-2.5-1.1-2.5-2.5 0-3.31-2.69-6-6-6S4 9.69 4 13s2.69 6 6 6c1.4 0 2.5 1.1 2.5 2.5S11.4 24 10 24c-4.97 0-9-4.03-9-9s4.03-12 11-12z"
        fill="url(#agv-grad)"
        transform="translate(0,-1)"
      />
      <circle cx="12" cy="12" r="2.6" fill="url(#agv-grad)" />
    </svg>
  );
}

/** Replit — orange angular bracket. */
export function ReplitIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M12.5 2h6c1.66 0 3 1.34 3 3v6h-9V2z" fill="#F26207" />
      <path d="M3 11h9v9H6c-1.66 0-3-1.34-3-3v-6z" fill="#F26207" />
      <path d="M12 11h9.5v6c0 1.66-1.34 3-3 3H12v-9z" fill="#F26207" fillOpacity="0.7" />
    </svg>
  );
}

/** Vercel v0 — black square with offset white "v0". */
export function V0Icon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <rect width="24" height="24" rx="5" fill="#000" />
      <path
        d="M5 8.4l3.4 7.2h1.5L13.4 8.4h-1.7l-2.4 5.6L6.7 8.4H5z"
        fill="#fff"
      />
      <circle cx="16.4" cy="14" r="3.2" fill="none" stroke="#fff" strokeWidth="1.4" />
    </svg>
  );
}

/** Bolt (StackBlitz) — bright lightning. */
export function BoltIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <defs>
        <linearGradient id="bolt-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFC107" />
          <stop offset="1" stopColor="#FF6F00" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="#0F1115" />
      <path
        d="M14 2L4 14h6l-2 8 10-12h-6l2-8z"
        fill="url(#bolt-grad)"
      />
    </svg>
  );
}

/** Perplexity — concentric blue dots / rings. */
export function PerplexityIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <rect width="24" height="24" rx="6" fill="#1F1F1F" />
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="#22B8CF" strokeWidth="1.4" />
      <path d="M12 2v8M12 14v8M2 12h8M14 12h8" stroke="#22B8CF" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.4" fill="#22B8CF" />
    </svg>
  );
}

/** Grok (xAI) — slanted X mark. */
export function GrokIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <rect width="24" height="24" rx="6" fill="#000" />
      <path
        d="M5 5l8 9.6 6 4.4-3.4-7L19 5h-3.4l-3.6 6L8.4 5H5z"
        fill="#fff"
      />
    </svg>
  );
}

/** Zed — geometric Z stack mark. */
export function ZedIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <defs>
        <linearGradient id="zed-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0f172a" />
          <stop offset="1" stopColor="#1e293b" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#zed-grad)" />
      <path
        d="M6.5 7h11l-7.6 9.4H17V18H6v-1.4L13.6 7.2H6.5V7z"
        fill="#84cc16"
      />
    </svg>
  );
}

/** Continue.dev — play-arrow chevron mark. */
export function ContinueIcon({ className, size }: BrandIconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <defs>
        <linearGradient id="cont-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1f2937" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#cont-grad)" />
      <path
        d="M8 6.5l8 5.5-8 5.5V6.5z"
        fill="#fff"
        fillOpacity="0.96"
      />
      <path
        d="M5 9.5l4 2.5-4 2.5V9.5z"
        fill="#fff"
        fillOpacity="0.55"
      />
    </svg>
  );
}
