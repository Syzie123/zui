import { Sidebar } from '../components/Sidebar';
import { DOCS } from './registry';
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
 */
export function DocsSidebarBody({ activeSlug, onNavigate }: Props) {
  return (
    <Sidebar.Content>
      {DOCS.map((group) => (
        <Sidebar.Group key={group.name}>
          <Sidebar.GroupLabel>{group.name}</Sidebar.GroupLabel>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              {group.pages.map((p) => {
                const active = p.slug === activeSlug;
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
                        className={cn(
                          'flex w-full items-center justify-between gap-2'
                        )}
                      >
                        <span className="truncate">{p.title}</span>
                        {p.isNew && (
                          <span className="rounded-full bg-[oklch(86%_0.18_140)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[oklch(28%_0.10_140)]">
                            New
                          </span>
                        )}
                      </Link>
                    </Sidebar.MenuButton>
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
