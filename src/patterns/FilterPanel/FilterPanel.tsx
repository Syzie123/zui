import { forwardRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Search, Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Input } from '../../components/Input';

/* ────────────────────────────────────────────────────────────
 * Filter card shell
 * ──────────────────────────────────────────────────────────── */

const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function FilterCard({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full max-w-sm flex-col',
          'rounded-[28px] bg-[var(--color-bg-elevated)]',
          'border border-[var(--color-border-subtle)]',
          'shadow-[0_1px_3px_rgb(0_0_0_/_0.04),0_8px_24px_-12px_rgb(0_0_0_/_0.08)]',
          'p-6',
          className
        )}
        {...rest}
      />
    );
  }
);

/* ────────────────────────────────────────────────────────────
 * Header — title + optional clear/back
 * ──────────────────────────────────────────────────────────── */

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  onBack?: () => void;
  onClear?: () => void;
  clearLabel?: string;
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(function FilterHeader(
  { title, onBack, onClear, clearLabel = 'Clear All', className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('mb-5 flex items-center justify-between gap-3', className)}
      {...rest}
    >
      <div className="flex min-w-0 items-center gap-1.5">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className={cn(
              'inline-flex size-6 items-center justify-center -ml-1',
              'rounded-[var(--radius-sm)]',
              'text-[var(--color-fg-base)]',
              'transition-colors hover:bg-[var(--color-bg-subtle)]'
            )}
          >
            <ChevronLeft className="size-5 stroke-[2.25]" />
          </button>
        )}
        <h3 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] truncate">
          {title}
        </h3>
      </div>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className={cn(
            'text-[15px] font-medium',
            'text-[var(--color-success)]',
            'transition-opacity hover:opacity-80'
          )}
        >
          {clearLabel}
        </button>
      )}
    </div>
  );
});

/* ────────────────────────────────────────────────────────────
 * Filter list — rows with optional value summary + chevron
 * ──────────────────────────────────────────────────────────── */

interface RowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  label: string;
  value?: ReactNode;
}

const Row = forwardRef<HTMLButtonElement, RowProps>(function FilterRow(
  { label, value, className, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'group flex w-full items-center justify-between gap-3',
        'py-4 text-left outline-none',
        'border-b border-[var(--color-border-subtle)] last:border-b-0',
        'transition-colors',
        'hover:text-[var(--color-accent-base)]',
        'focus-visible:rounded-[var(--radius-sm)] focus-visible:shadow-[var(--shadow-focus)]',
        className
      )}
      {...rest}
    >
      <span className="text-base font-medium tracking-[-0.005em]">{label}</span>
      <span className="flex min-w-0 items-center gap-1 text-[15px]">
        {value !== undefined && (
          <span className="truncate text-[var(--color-fg-muted)]">{value}</span>
        )}
        <ChevronRight className="size-4 shrink-0 text-[var(--color-fg-subtle)] transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  );
});

const RowList = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col -mt-2', className)} {...rest} />
);

/* ────────────────────────────────────────────────────────────
 * Search input — gray pill, embedded search icon
 * ──────────────────────────────────────────────────────────── */

type SearchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>;

const SearchField = forwardRef<HTMLInputElement, SearchProps>(
  function FilterSearch({ className, ...rest }, ref) {
    return (
      <Input
        ref={ref}
        prefix={<Search className="size-4" />}
        wrapperClassName={cn(
          'h-11 rounded-[var(--radius-2xl)] border-transparent',
          'bg-[var(--color-bg-subtle)]',
          'shadow-none',
          'has-[input:focus-visible]:border-[var(--color-accent-base)]'
        )}
        className={cn('text-[15px] placeholder:text-[var(--color-fg-subtle)]', className)}
        {...rest}
      />
    );
  }
);

/* ────────────────────────────────────────────────────────────
 * Selectable list item — leading visual + label + trailing slot
 * Used for both "Owned By" (with checkmark) and "Location" (with count).
 * ──────────────────────────────────────────────────────────── */

interface ListItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leading?: ReactNode;
  label: string;
  trailing?: ReactNode;
  selected?: boolean;
}

const ListItem = forwardRef<HTMLButtonElement, ListItemProps>(function FilterListItem(
  { leading, label, trailing, selected, className, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      data-selected={selected || undefined}
      className={cn(
        'group flex w-full items-center gap-3 outline-none',
        'py-3 text-left',
        'transition-colors',
        'hover:bg-[var(--color-bg-subtle)] focus-visible:bg-[var(--color-bg-subtle)]',
        'rounded-[var(--radius-md)] -mx-2 px-2',
        className
      )}
      {...rest}
    >
      {leading && <span className="inline-flex shrink-0 items-center">{leading}</span>}
      <span className="grow truncate text-base font-medium tracking-[-0.005em]">
        {label}
      </span>
      {trailing && (
        <span className="inline-flex shrink-0 items-center text-sm font-medium text-[var(--color-fg-muted)]">
          {trailing}
        </span>
      )}
    </button>
  );
});

/* Trailing helpers */
const Count = ({ value }: { value: number | string }) => (
  <span
    className={cn(
      'inline-flex items-center justify-center',
      'rounded-[var(--radius-md)] bg-[var(--color-bg-subtle)]',
      'px-2 py-0.5 text-[13px] font-medium',
      'text-[var(--color-fg-muted)] tabular-nums'
    )}
  >
    {typeof value === 'number' ? value.toLocaleString() : value}
  </span>
);

const SelectedCheck = () => (
  <Check
    className="size-5 stroke-[2.25] text-[var(--color-success)]"
    aria-hidden
  />
);

/* ────────────────────────────────────────────────────────────
 * Radio list — used inside Payment Type. Big green ring when active.
 * ──────────────────────────────────────────────────────────── */

interface RadioListProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}

function RadioList({ options, value, onChange }: RadioListProps) {
  return (
    <div role="radiogroup" className="flex flex-col gap-1">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={cn(
              'group flex w-full items-center gap-3 outline-none',
              'rounded-[var(--radius-md)] py-3 text-left',
              'transition-colors hover:bg-[var(--color-bg-subtle)]',
              'focus-visible:shadow-[var(--shadow-focus)]'
            )}
          >
            <span
              className={cn(
                'relative grid size-6 place-items-center shrink-0',
                'rounded-full border-2',
                'transition-colors',
                active
                  ? 'border-[var(--color-success)]'
                  : 'border-[var(--color-border-strong)] group-hover:border-[var(--color-fg-subtle)]'
              )}
            >
              {active && (
                <span className="absolute inset-0.5 rounded-full ring-[3px] ring-[var(--color-success)]" />
              )}
            </span>
            <span
              className={cn(
                'text-base font-medium tracking-[-0.005em]',
                active
                  ? 'text-[var(--color-fg-base)]'
                  : 'text-[var(--color-fg-muted)]'
              )}
            >
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * Public namespace
 * ──────────────────────────────────────────────────────────── */

export const FilterPanel = Object.assign(Card, {
  Header,
  Row,
  RowList,
  Search: SearchField,
  ListItem,
  Count,
  SelectedCheck,
  RadioList,
});

/* ────────────────────────────────────────────────────────────
 * Stateful demo wrappers — the three views from the screenshot
 * ──────────────────────────────────────────────────────────── */

export function AddFiltersCard() {
  return (
    <FilterPanel>
      <FilterPanel.Header title="Add Filters" onClear={() => {}} clearLabel="Clear All" />
      <FilterPanel.RowList>
        <FilterPanel.Row label="Status"       value="Declined, Closed, 2+" />
        <FilterPanel.Row label="Payment Type" value="Fixed Rate" />
        <FilterPanel.Row label="Rate" />
        <FilterPanel.Row label="Location" />
        <FilterPanel.Row label="Owned By" />
      </FilterPanel.RowList>
    </FilterPanel>
  );
}

export function PaymentTypeCard() {
  const [v, setV] = useState('all');
  return (
    <FilterPanel>
      <FilterPanel.Header title="Payment Type" onBack={() => {}} />
      <FilterPanel.RadioList
        value={v}
        onChange={setV}
        options={[
          { value: 'all',    label: 'All' },
          { value: 'hourly', label: 'Hourly Rate' },
          { value: 'fixed',  label: 'Fixed Rate' },
        ]}
      />
    </FilterPanel>
  );
}

export function OwnedByCard() {
  const [selected, setSelected] = useState<string | null>('sync');
  return (
    <FilterPanel>
      <FilterPanel.Header
        title="Owned By"
        onBack={() => {}}
        onClear={() => setSelected(null)}
        clearLabel="Clear"
      />
      <FilterPanel.Search placeholder="Search here..." />
      <div className="mt-2 flex flex-col">
        {[
          {
            id: 'one',
            label: 'One Collective',
            icon: (
              <span className="grid size-7 place-items-center rounded-[var(--radius-md)] bg-[var(--color-bg-subtle)] text-[13px] font-bold">
                O
              </span>
            ),
          },
          {
            id: 'sync',
            label: 'Sync Inc.',
            icon: (
              <span className="grid size-7 place-items-center rounded-[var(--radius-md)] bg-[oklch(70%_0.18_45)] text-[13px] font-bold text-white">
                S
              </span>
            ),
          },
          {
            id: 'acme',
            label: 'Acme Inc.',
            icon: (
              <span className="grid size-7 place-items-center rounded-[var(--radius-md)] bg-[var(--color-fg-base)] text-[13px] font-bold text-[var(--color-bg-base)]">
                ▢
              </span>
            ),
          },
        ].map((o) => (
          <FilterPanel.ListItem
            key={o.id}
            leading={o.icon}
            label={o.label}
            selected={selected === o.id}
            trailing={selected === o.id ? <FilterPanel.SelectedCheck /> : undefined}
            onClick={() => setSelected((s) => (s === o.id ? null : o.id))}
          />
        ))}
      </div>
    </FilterPanel>
  );
}

export function LocationCard() {
  return (
    <FilterPanel>
      <FilterPanel.Header title="Location" onBack={() => {}} />
      <FilterPanel.Search placeholder="Search location..." />
      <div className="mt-2 flex flex-col">
        {[
          { id: 'eu',   label: 'Europe',        count: 523 },
          { id: 'sf',   label: 'San Francisco', count: 344 },
          { id: 'na',   label: 'North America', count: 1235 },
          { id: 'lon',  label: 'London',        count: 29 },
        ].map((o) => (
          <FilterPanel.ListItem
            key={o.id}
            label={o.label}
            trailing={<FilterPanel.Count value={o.count} />}
          />
        ))}
      </div>
    </FilterPanel>
  );
}
