import { useState } from 'react';
import { ChevronsUpDown, ListFilter, LayoutGrid, List } from 'lucide-react';
import { cn } from '../../utils/cn';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import { Switch } from '../../components/Switch';

/**
 * "Viewing Options" panel — segmented Grid/List + sort + toggle list.
 * Matches screenshot 2 1:1 in structure.
 */

export function ViewingOptionsCard() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [opts, setOpts] = useState({
    status: true,
    applicants: false,
    owner: true,
    thumbnail: true,
    dateCreated: false,
  });

  return (
    <div
      className={cn(
        'flex w-full max-w-[20rem] flex-col gap-5',
        'rounded-[28px] bg-[var(--color-bg-elevated)]',
        'border border-[var(--color-border-subtle)]',
        'shadow-[0_1px_3px_rgb(0_0_0_/_0.04),0_8px_24px_-12px_rgb(0_0_0_/_0.08)]',
        'p-6'
      )}
    >
      <div>
        <p className="mb-3 text-[15px] font-medium text-[var(--color-fg-muted)]">
          Viewing Options
        </p>
        <SegmentedControl
          value={view}
          onValueChange={(v) => setView(v as 'grid' | 'list')}
          size="lg"
          className="w-full justify-stretch"
        >
          <SegmentedControl.Item value="grid" className="flex-1">
            <LayoutGrid className="size-4 sm:hidden" />
            Grid
          </SegmentedControl.Item>
          <SegmentedControl.Item value="list" className="flex-1">
            <List className="size-4 sm:hidden" />
            List
          </SegmentedControl.Item>
        </SegmentedControl>
      </div>

      {/* Sort row */}
      <button
        type="button"
        className={cn(
          'flex items-center justify-between gap-3 -mx-1 px-1',
          'rounded-[var(--radius-md)] py-2 outline-none',
          'transition-colors hover:bg-[var(--color-bg-subtle)]',
          'focus-visible:shadow-[var(--shadow-focus)]'
        )}
      >
        <span className="flex items-center gap-2.5 text-base font-medium tracking-[-0.005em]">
          <ListFilter className="size-5 text-[var(--color-fg-base)]" />
          Recent
        </span>
        <ChevronsUpDown className="size-4 text-[var(--color-fg-subtle)]" />
      </button>

      <div className="-mx-2 h-px bg-[var(--color-border-subtle)]" />

      {/* Toggle list */}
      <div className="flex flex-col gap-1">
        {(
          [
            { key: 'status',      label: 'Status' },
            { key: 'applicants',  label: 'Applicants' },
            { key: 'owner',       label: 'Owner' },
            { key: 'thumbnail',   label: 'Thumbnail' },
            { key: 'dateCreated', label: 'Date Created' },
          ] as const
        ).map((row) => (
          <label
            key={row.key}
            className={cn(
              'flex items-center justify-between gap-3 -mx-2 px-2',
              'rounded-[var(--radius-md)] py-2.5',
              'cursor-pointer',
              'transition-colors hover:bg-[var(--color-bg-subtle)]'
            )}
          >
            <span className="text-base font-medium tracking-[-0.005em]">
              {row.label}
            </span>
            <Switch
              tone="success"
              size="md"
              checked={opts[row.key]}
              onCheckedChange={(v) =>
                setOpts((p) => ({ ...p, [row.key]: !!v }))
              }
            />
          </label>
        ))}
      </div>
    </div>
  );
}
