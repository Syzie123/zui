import { useEffect, useState } from 'react';
import { Github, Moon, Search, Sparkles, Sun, Zap, ZapOff } from 'lucide-react';
import { Button } from '../components/Button';
import { Sidebar } from '../components/Sidebar';
import { Tooltip } from '../components/Tooltip';
import { useTheme, type Theme } from '../hooks/useTheme';
import { useAnimations } from '../hooks/useAnimations';
import { Link } from '../hooks/useHashRoute';
import { cn } from '../utils/cn';

const THEME_ICON: Record<Theme, JSX.Element> = {
  clean:    <Sun className="size-4" />,
  dark:     <Moon className="size-4" />,
  luminous: <Sparkles className="size-4" />,
};

const TOP_NAV = [
  { href: '/components/button',  label: 'Components' },
  { href: '/templates',          label: 'Templates' },
  { href: '/showcase',           label: 'Showcase' },
];

interface Props {
  onOpenSearch: () => void;
  /** When true, render Sidebar.Trigger on the left (used inside DocsLayout). */
  showSidebarTrigger?: boolean;
  /** Used by Home (no sidebar) — toggle a custom drawer. */
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export function DocsHeader({
  onOpenSearch,
  showSidebarTrigger,
}: Props) {
  const { theme, cycleTheme } = useTheme();
  const { enabled: animEnabled, toggle: toggleAnim } = useAnimations();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full',
        'transition-[backdrop-filter,background-color,border-color] duration-[var(--duration-base)]',
        scrolled
          ? 'bg-[color-mix(in_oklch,var(--color-bg-base)_82%,transparent)] backdrop-blur-md border-b border-[var(--color-border-subtle)]'
          : 'bg-[var(--color-bg-base)] border-b border-transparent'
      )}
    >
      <div className="mx-auto flex h-14 w-full items-center gap-3 px-4 sm:px-6">
        {/* Sidebar trigger (in docs layout) — opens mobile sheet or toggles desktop sidebar */}
        {showSidebarTrigger && <Sidebar.Trigger />}

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-[-0.02em]"
        >
          <Logo />
          <span className="font-display text-base">ZUI</span>
        </Link>

        {/* Top nav (desktop) */}
        <nav className="hidden items-center gap-1 md:flex">
          {TOP_NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'rounded-[var(--radius-md)] px-3 py-1.5 text-sm font-medium',
                'text-[var(--color-fg-muted)]',
                'transition-colors duration-[var(--duration-fast)]',
                'hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg-base)]'
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className={cn(
              'flex h-9 w-full max-w-72 min-w-[10rem] items-center gap-2 px-3',
              'sm:min-w-[16rem]',
              'rounded-[var(--radius-lg)]',
              'border border-[var(--color-border-base)]',
              'bg-[var(--color-bg-subtle)]',
              'text-[13px] text-[var(--color-fg-subtle)]',
              'transition-colors',
              'hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg-muted)]'
            )}
          >
            <Search className="size-4" />
            <span className="hidden flex-1 text-left sm:block">Search documentation…</span>
            <span className="hidden sm:block">
              <kbd className="rounded border border-[var(--color-border-base)] bg-[var(--color-bg-elevated)] px-1.5 py-0.5 font-mono text-[10px] font-medium">
                ⌘K
              </kbd>
            </span>
          </button>

          <a
            href="https://github.com/Syzie123/zui"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden items-center gap-1.5 rounded-[var(--radius-md)] px-2.5 py-1.5 text-sm font-medium text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg-base)] sm:inline-flex"
          >
            <Github className="size-4" />
          </a>

          <Tooltip.Simple content={animEnabled ? 'Animations: on' : 'Animations: off'}>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleAnim}
              aria-label={animEnabled ? 'Disable animations' : 'Enable animations'}
              aria-pressed={animEnabled}
              className={cn(
                'transition-colors',
                animEnabled &&
                  'text-[var(--color-accent-base)] bg-[var(--color-accent-soft)] hover:bg-[var(--color-accent-soft)]'
              )}
            >
              {animEnabled ? (
                <Zap className="size-4 fill-current" />
              ) : (
                <ZapOff className="size-4" />
              )}
            </Button>
          </Tooltip.Simple>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={cycleTheme}
            aria-label="Toggle theme"
            title={`Theme: ${theme}`}
          >
            {THEME_ICON[theme]}
          </Button>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex size-7 items-center justify-center',
        'rounded-[var(--radius-md)]',
        'bg-[var(--color-fg-base)] text-[var(--color-bg-base)]',
        'font-display text-sm font-bold'
      )}
    >
      Z
    </span>
  );
}
