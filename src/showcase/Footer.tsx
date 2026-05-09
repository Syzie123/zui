export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--color-border-subtle)] py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold tracking-[-0.01em]">ZUI</p>
          <p className="mt-1 text-xs text-[var(--color-fg-muted)]">
            Modern React components — sub-millisecond, polished, accessible.
          </p>
        </div>
        <div className="flex items-center gap-6 text-xs text-[var(--color-fg-muted)]">
          <a className="hover:text-[var(--color-fg-base)] transition-colors" href="#">Documentation</a>
          <a className="hover:text-[var(--color-fg-base)] transition-colors" href="#">GitHub</a>
          <a className="hover:text-[var(--color-fg-base)] transition-colors" href="#">Changelog</a>
          <a className="hover:text-[var(--color-fg-base)] transition-colors" href="#">License</a>
        </div>
      </div>
    </footer>
  );
}
