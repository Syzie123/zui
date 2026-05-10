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
