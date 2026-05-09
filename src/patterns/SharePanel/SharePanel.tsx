import { ChevronDown, Code2, Copy, HelpCircle, Link2, MoreHorizontal, Settings, UserRound, Globe } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

/**
 * Share Project — recipients list with per-row permission dropdowns +
 * link sharing settings + footer action row.
 */

interface Recipient {
  name: string;
  email: string;
  permission: 'Can edit' | 'Can view' | 'Admin';
  avatarSrc?: string;
  initials?: string;
}

const RECIPIENTS: Recipient[] = [
  { name: 'Justin Gouse',   email: 'jgous@gmail.com',         permission: 'Can edit', avatarSrc: 'https://i.pravatar.cc/96?img=12' },
  { name: 'Aspen Dokidis',  email: 'aspendokidis@gmail.com',  permission: 'Can view', avatarSrc: 'https://i.pravatar.cc/96?img=15' },
  { name: 'Haylie Lubin',   email: 'haylielubin@gmail.com',   permission: 'Admin',    avatarSrc: 'https://i.pravatar.cc/96?img=49' },
  { name: 'Marcus Lubin',   email: 'marcuslubin@gmail.com',   permission: 'Can view', avatarSrc: 'https://i.pravatar.cc/96?img=53' },
];

export function SharePanelCard() {
  return (
    <div
      className={cn(
        'flex w-full max-w-md flex-col overflow-hidden',
        'rounded-[24px] bg-[var(--color-bg-elevated)]',
        'border border-[var(--color-border-subtle)]',
        'shadow-[0_1px_3px_rgb(0_0_0_/_0.04),0_8px_24px_-12px_rgb(0_0_0_/_0.08)]'
      )}
    >
      {/* Header */}
      <header className="flex items-center justify-between gap-2 px-6 py-4">
        <h3 className="font-display text-xl font-bold tracking-[-0.02em]">
          Share Project
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            rightIcon={<Settings className="size-3.5" />}
          >
            Manage
          </Button>
          <button
            type="button"
            aria-label="More"
            className="inline-flex size-9 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg-base)]"
          >
            <MoreHorizontal className="size-5" />
          </button>
        </div>
      </header>

      <div className="border-t border-[var(--color-border-subtle)]" />

      <div className="flex flex-col gap-5 px-6 py-5">
        {/* Document Link */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-semibold tracking-[-0.005em] text-[var(--color-fg-base)]">
            Document Link
          </label>
          <Input
            readOnly
            value="https://shareprojectfilename.com/3453453g3fdf"
            suffix={
              <button
                type="button"
                aria-label="Copy link"
                className="inline-flex size-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-fg-base)]"
              >
                <Copy className="size-4" />
              </button>
            }
            className="text-[13px]"
          />
        </div>

        {/* Search Recipients */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[13px] font-semibold tracking-[-0.005em]">
              Search Recipients
              <HelpCircle className="size-3.5 text-[var(--color-fg-subtle)]" />
            </span>
            <span className="text-[12px] font-medium text-[var(--color-fg-subtle)]">
              Optional
            </span>
          </div>
          <div
            className={cn(
              'flex h-10 items-center justify-between gap-2 px-3',
              'rounded-[var(--radius-lg)]',
              'bg-[var(--color-bg-elevated)]',
              'border border-[var(--color-border-base)]',
              'shadow-[var(--shadow-xs)]',
              'text-[13px] text-[var(--color-fg-subtle)]'
            )}
          >
            <span>Search for names or emails…</span>
            <ChevronDown className="size-4 text-[var(--color-fg-subtle)]" />
          </div>
        </div>

        {/* Recipients */}
        <div className="space-y-2.5">
          <p className="text-[13px] font-semibold tracking-[-0.005em]">
            Recipients
          </p>
          <ul className="flex flex-col gap-2.5">
            {RECIPIENTS.map((r) => (
              <li key={r.email} className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Avatar size="sm" src={r.avatarSrc} fallback={r.name.charAt(0)} />
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold tracking-[-0.005em]">
                      {r.name}
                    </p>
                    <p className="truncate text-[12px] text-[var(--color-fg-muted)]">
                      {r.email}
                    </p>
                  </div>
                </div>
                <PermissionPicker permission={r.permission} />
              </li>
            ))}
          </ul>
        </div>

        {/* Settings */}
        <div className="space-y-2.5 pt-1">
          <p className="text-[13px] font-semibold tracking-[-0.005em]">Settings</p>
          <SettingsRow
            icon={<UserRound className="size-4" />}
            text={
              <>
                Anyone at <span className="font-medium text-[var(--color-fg-base)]">Company Co.</span>{' '}
                can view and edit
              </>
            }
            actionLabel="Change Access"
          />
          <SettingsRow
            icon={<Globe className="size-4" />}
            text="Anyone with the link can edit"
            actionLabel="Set Password"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between gap-3 border-t border-[var(--color-border-subtle)] px-6 py-4">
        <div className="flex items-center gap-4 text-[13px] font-medium text-[var(--color-fg-muted)]">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--color-fg-base)]"
          >
            <Code2 className="size-4" />
            Get Embed Code
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--color-fg-base)]"
          >
            <Link2 className="size-4" />
            Copy Link
          </button>
        </div>
        <Button
          size="sm"
          className="bg-[oklch(58%_0.22_265)] text-white hover:bg-[oklch(54%_0.22_265)]"
        >
          Done
        </Button>
      </footer>
    </div>
  );
}

function PermissionPicker({ permission }: { permission: Recipient['permission'] }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-9 items-center gap-1.5 px-3',
        'rounded-[var(--radius-lg)]',
        'border border-[var(--color-border-base)]',
        'bg-[var(--color-bg-elevated)]',
        'text-[13px] font-medium tracking-[-0.005em]',
        'shadow-[var(--shadow-xs)]',
        'transition-colors',
        'hover:bg-[var(--color-bg-subtle)] hover:border-[var(--color-border-strong)]'
      )}
    >
      {permission}
      <ChevronDown className="size-3.5 text-[var(--color-fg-subtle)]" />
    </button>
  );
}

function SettingsRow({
  icon,
  text,
  actionLabel,
}: {
  icon: React.ReactNode;
  text: React.ReactNode;
  actionLabel: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5 text-[13px] text-[var(--color-fg-muted)]">
        <span className="text-[var(--color-fg-subtle)]">{icon}</span>
        <span className="truncate">{text}</span>
      </div>
      <button
        type="button"
        className="shrink-0 text-[13px] font-semibold text-[oklch(58%_0.22_265)] transition-opacity hover:opacity-80"
      >
        {actionLabel}
      </button>
    </div>
  );
}
