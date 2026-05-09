import { Suspense, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Copy,
} from 'lucide-react';
import { DocsHeader } from './DocsHeader';
import { DocsSidebarBody } from './DocsSidebar';
import { DocsTOC } from './DocsTOC';
import { DocsSearch } from './DocsSearch';
import { findPage, groupOf, lazyPage, neighbors } from './registry';
import { InstallPill } from './InstallPill';
import { Logo } from './Logo';
import { Link } from '../hooks/useHashRoute';
import { Sidebar, useSidebar } from '../components/Sidebar';
import { cn } from '../utils/cn';

interface Props {
  /** The slug from the route, e.g. "button". */
  slug: string;
}

export function DocsLayout({ slug }: Props) {
  return (
    <Sidebar.Provider defaultOpen>
      <DocsLayoutInner slug={slug} />
    </Sidebar.Provider>
  );
}

function DocsLayoutInner({ slug }: Props) {
  const { isMobile, setOpenMobile } = useSidebar();
  const page = findPage(slug);
  const [searchOpen, setSearchOpen] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  // ⌘K / Ctrl+K → open search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* ─────────── Sidebar (collapsible offcanvas) ─────────── */}
      <Sidebar collapsible="offcanvas">
        <Sidebar.Header className="px-3 pb-2 pt-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-display text-sm font-semibold tracking-[-0.01em]">
              ZUI
            </span>
            <span className="ml-auto rounded-full bg-[var(--sidebar-accent)] px-2 py-0.5 text-[10px] font-medium tracking-wider text-[var(--sidebar-fg-muted)]">
              v0.1
            </span>
          </Link>
        </Sidebar.Header>

        <Sidebar.Separator />

        <DocsSidebarBody
          activeSlug={slug}
          onNavigate={isMobile ? () => setOpenMobile(false) : undefined}
        />

        <Sidebar.Footer className="px-3 pb-4 text-[11px] text-[var(--sidebar-fg-muted)]">
          <p className="flex items-center justify-between">
            <span>Toggle</span>
            <kbd className="rounded border border-[var(--sidebar-border)] bg-[var(--color-bg-elevated)] px-1.5 py-0.5 font-mono text-[10px] font-medium">
              ⌘B
            </kbd>
          </p>
        </Sidebar.Footer>
        <Sidebar.Rail />
      </Sidebar>

      {/* ─────────── Inset (header + main + TOC) ─────────── */}
      <Sidebar.Inset>
        <DocsHeader
          onOpenSearch={() => setSearchOpen(true)}
          showSidebarTrigger
        />
        <DocsSearch open={searchOpen} onOpenChange={setSearchOpen} />

        {!page ? (
          <NotFound />
        ) : (
          <div className="mx-auto flex w-full max-w-[1280px] gap-0 px-4 sm:px-6">
            <main
              ref={contentRef}
              className="min-w-0 flex-1 py-8 sm:py-12 lg:px-6"
              key={slug}
            >
              <Breadcrumb
                category={groupOf(slug) ?? 'Components'}
                pageTitle={page.title}
              />

              <header className="mt-3 mb-6 flex items-start justify-between gap-6">
                <div className="min-w-0" data-animate-up>
                  <h1
                    id="top"
                    className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]"
                  >
                    {page.title}
                  </h1>
                  <p className="mt-3 text-base leading-relaxed text-[var(--color-fg-muted)] sm:text-lg">
                    {page.description}
                  </p>
                </div>
                <PageActions slug={slug} />
              </header>

              {/* Install pill — auto-rendered on every page except Getting started */}
              {groupOf(slug) !== 'Getting started' && (
                <div data-animate-up data-animate-delay="1" className="mb-8">
                  <InstallPill />
                </div>
              )}

              <Suspense
                fallback={
                  <div className="py-20 text-center text-sm text-[var(--color-fg-muted)]">
                    Loading…
                  </div>
                }
              >
                <PageBody slug={slug} />
              </Suspense>

              <PrevNext slug={slug} />
            </main>
            <DocsTOC contentRef={contentRef} slug={slug} />
          </div>
        )}
      </Sidebar.Inset>
    </>
  );
}

/* ────────────────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────────────────── */

function PageBody({ slug }: { slug: string }) {
  const page = findPage(slug);
  if (!page) return null;
  const C = lazyPage(page);
  return <C />;
}

function PrevNext({ slug }: { slug: string }) {
  const { prev, next } = neighbors(slug);
  return (
    <nav className="mt-16 flex flex-col gap-3 border-t border-[var(--color-border-subtle)] pt-8 sm:flex-row sm:justify-between">
      {prev ? (
        <Link
          href={`/components/${prev.slug}`}
          className={cn(
            'group flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border-base)]',
            'bg-[var(--color-bg-elevated)] px-4 py-3',
            'transition-colors hover:border-[var(--color-border-strong)]'
          )}
        >
          <ChevronLeft className="size-4 text-[var(--color-fg-muted)] transition-transform group-hover:-translate-x-0.5" />
          <span className="flex flex-col">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-fg-subtle)]">
              Previous
            </span>
            <span className="text-sm font-semibold">{prev.title}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/components/${next.slug}`}
          className={cn(
            'group flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border-base)]',
            'bg-[var(--color-bg-elevated)] px-4 py-3 text-right',
            'transition-colors hover:border-[var(--color-border-strong)]'
          )}
        >
          <span className="flex flex-col items-end">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-fg-subtle)]">
              Next
            </span>
            <span className="text-sm font-semibold">{next.title}</span>
          </span>
          <ChevronRightIcon className="size-4 text-[var(--color-fg-muted)] transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

function Breadcrumb({
  category,
  pageTitle,
}: {
  category: string;
  pageTitle: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-fg-muted)]">
      <Link href="/" className="hover:text-[var(--color-fg-base)]">
        Docs
      </Link>
      <span className="mx-1.5 text-[var(--color-fg-subtle)]">/</span>
      <span>{category}</span>
      <span className="mx-1.5 text-[var(--color-fg-subtle)]">/</span>
      <span className="text-[var(--color-fg-base)]">{pageTitle}</span>
    </nav>
  );
}

function PageActions({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/#/components/${slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="hidden shrink-0 items-center gap-1 sm:flex">
      <button
        type="button"
        onClick={onCopy}
        className={cn(
          'inline-flex h-9 items-center gap-1.5 px-3',
          'rounded-[var(--radius-md)]',
          'border border-[var(--color-border-base)]',
          'bg-[var(--color-bg-elevated)]',
          'text-[13px] font-medium',
          'transition-colors hover:bg-[var(--color-bg-subtle)]'
        )}
      >
        <Copy className="size-3.5" />
        {copied ? 'Copied' : 'Copy Page'}
      </button>
    </div>
  );
}

function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-base)]">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em]">
        Page not found
      </h1>
      <p className="mt-3 text-base text-[var(--color-fg-muted)]">
        That doc page doesn't exist (yet).
      </p>
      <Link
        href="/components/button"
        className="mt-6 inline-flex items-center gap-1.5 rounded-[var(--radius-md)] bg-[var(--color-fg-base)] px-4 py-2 text-sm font-semibold text-[var(--color-bg-base)]"
      >
        Back to docs <ArrowRight className="size-4" />
      </Link>
    </main>
  );
}

