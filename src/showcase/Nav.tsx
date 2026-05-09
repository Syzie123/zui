import { useEffect, useState } from 'react';
import { Moon, Sun, Sparkles, Menu, X, Github } from 'lucide-react';
import { Button } from '../components/Button';
import { useTheme, type Theme } from '../hooks/useTheme';
import { cn } from '../utils/cn';

const NAV_LINKS = [
  { href: '#patterns',    label: 'Patterns' },
  { href: '#foundations', label: 'Foundations' },
  { href: '#overlays',    label: 'Overlays' },
  { href: '#dialogs',     label: 'Dialogs' },
  { href: '#forms',       label: 'Forms' },
  { href: '#composition', label: 'Composition' },
];

const THEME_ICON: Record<Theme, JSX.Element> = {
  clean:    <Sun className="size-4" />,
  dark:     <Moon className="size-4" />,
  luminous: <Sparkles className="size-4" />,
};

const THEME_LABEL: Record<Theme, string> = {
  clean:    'Clean',
  dark:     'Dark',
  luminous: 'Luminous',
};

export function Nav() {
  const { theme, cycleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full',
          'transition-[backdrop-filter,background-color,border-color] duration-[var(--duration-base)]',
          scrolled
            ? 'bg-[color-mix(in_oklch,var(--color-bg-base)_82%,transparent)] backdrop-blur-md border-b border-[var(--color-border-subtle)]'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <a
            href="#top"
            className="flex items-center gap-2 font-semibold tracking-[-0.02em]"
          >
            <Logo />
            <span className="text-base">ZUI</span>
            <span className="ml-1 hidden rounded-full bg-[var(--color-bg-muted)] px-2 py-0.5 text-[0.6875rem] font-medium tracking-wider text-[var(--color-fg-muted)] sm:inline-block">
              v0.1
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <a
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
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={cycleTheme}
              aria-label={`Switch theme. Current: ${THEME_LABEL[theme]}`}
              title={`Theme: ${THEME_LABEL[theme]}`}
            >
              {THEME_ICON[theme]}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Github className="size-3.5" />}
              className="hidden sm:inline-flex"
            >
              GitHub
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="md:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-30 md:hidden',
          'transition-opacity duration-[var(--duration-base)]',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden={!mobileOpen}
      >
        <button
          tabIndex={-1}
          aria-hidden
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 bg-[oklch(15%_0.015_270/0.30)] backdrop-blur-sm"
        />
        <nav
          className={cn(
            'absolute right-0 top-0 h-full w-[min(20rem,86vw)]',
            'bg-[var(--color-bg-elevated)] border-l border-[var(--color-border-base)]',
            'shadow-[var(--shadow-2xl)]',
            'flex flex-col gap-1 p-4 pt-20',
            'transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)]',
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'rounded-[var(--radius-md)] px-3 py-3 text-base font-medium',
                'text-[var(--color-fg-base)]',
                'transition-colors duration-[var(--duration-fast)]',
                'hover:bg-[var(--color-bg-subtle)]'
              )}
            >
              {l.label}
            </a>
          ))}
          <div className="mt-4 border-t border-[var(--color-border-subtle)] pt-4">
            <Button
              fullWidth
              variant="secondary"
              leftIcon={<Github className="size-4" />}
            >
              View on GitHub
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}

function Logo() {
  return (
    <span
      className={cn(
        'inline-flex size-7 items-center justify-center',
        'rounded-[var(--radius-md)]',
        'bg-gradient-to-br from-[var(--color-accent-base)] to-[oklch(45%_0.22_270)]',
        'shadow-[var(--shadow-sm)]',
        'text-white text-sm font-bold'
      )}
      aria-hidden
    >
      Z
    </span>
  );
}
