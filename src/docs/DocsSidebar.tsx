import { Sidebar } from '../components/Sidebar';
import { DOCS } from './registry';
import { useActiveAnchors } from './anchors';
import { Link } from '../hooks/useHashRoute';
import { cn } from '../utils/cn';

interface Props {
  /** Current slug to highlight active item. */
  activeSlug?: string;
  /** Called when a link is clicked — used to close mobile sheet. */
  onNavigate?: () => void;
}

/**
 * The doc-site sidebar contents. Wrap with <Sidebar> in the layout.
 * Each group becomes a Sidebar.Group with its own label + menu.
 *
 * When a page is the active one, its H2 anchors render below the link
 * as nested clickable sub-nodes — synced from DocsTOC via the shared
 * `useActiveAnchors()` hook.
 */
export function DocsSidebarBody({ activeSlug, onNavigate }: Props) {
  const { slug: anchorSlug, anchors } = useActiveAnchors();

  return (
    <Sidebar.Content>
      {DOCS.map((group) => (
        <Sidebar.Group key={group.name}>
          <Sidebar.GroupLabel>{group.name}</Sidebar.GroupLabel>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              {group.pages.map((p) => {
                const active = p.slug === activeSlug;
                const showAnchors =
                  active && anchorSlug === activeSlug && anchors.length > 0;

                return (
                  <Sidebar.MenuItem key={p.slug}>
                    <Sidebar.MenuButton
                      asChild
                      isActive={active}
                      tooltip={p.title}
                    >
                      <Link
                        href={`/components/${p.slug}`}
                        onClick={() => onNavigate?.()}
                        className="flex w-full items-center justify-between gap-2"
                      >
                        <span className="truncate">{p.title}</span>
                        {p.isNew && (
                          <span className="rounded-full bg-[oklch(86%_0.18_140)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[oklch(28%_0.10_140)]">
                            New
                          </span>
                        )}
                      </Link>
                    </Sidebar.MenuButton>

                    {/* Sub-anchors — only for the active page */}
                    {showAnchors && (
                      <ul
                        className={cn(
                          'mt-1 ml-3 flex flex-col gap-0.5 border-l',
                          'border-[var(--sidebar-border)]',
                          'group-data-[collapsible=icon]:hidden'
                        )}
                      >
                        {anchors
                          .filter((a) => a.level === 2)
                          .map((a) => (
                            <li key={a.id}>
                              <a
                                href={`#${a.id}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  const el = document.getElementById(a.id);
                                  if (el) {
                                    el.scrollIntoView({
                                      behavior: 'smooth',
                                      block: 'start',
                                    });
                                    history.replaceState(null, '', `#${a.id}`);
                                  }
                                  onNavigate?.();
                                }}
                                className={cn(
                                  '-ml-px block border-l-2 border-transparent py-1 pl-3',
                                  'text-[12px] text-[var(--sidebar-fg-muted)]',
                                  'transition-colors',
                                  'hover:border-[var(--sidebar-fg-muted)] hover:text-[var(--sidebar-fg)]'
                                )}
                              >
                                {a.text}
                              </a>
                            </li>
                          ))}
                      </ul>
                    )}
                  </Sidebar.MenuItem>
                );
              })}
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>
      ))}
    </Sidebar.Content>
  );
}
