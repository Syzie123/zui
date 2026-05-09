import { useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  LoaderCircle,
  MoreHorizontal,
  Star,
  Tag,
  Users,
  X,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { Avatar, AvatarGroup } from '../../components/Avatar';
import { Tabs } from '../../components/Tabs';

/**
 * Project detail "sheet" — title + property list + tabs + activity feed.
 * Renders inline (not in a portal) so it can sit in the showcase grid.
 */

export function ProjectDetailCard() {
  const [tab, setTab] = useState('activity');

  return (
    <div
      className={cn(
        'relative w-full max-w-2xl overflow-hidden',
        'rounded-[28px] bg-[var(--color-bg-elevated)]',
        'border border-[var(--color-border-subtle)]',
        'shadow-[0_8px_32px_-8px_rgb(0_0_0_/_0.10),0_2px_4px_rgb(0_0_0_/_0.04)]'
      )}
    >
      {/* Top bar */}
      <header className="flex items-center justify-between gap-4 px-6 pt-5 pb-4 sm:px-8">
        <button
          type="button"
          aria-label="Close"
          className="inline-flex size-8 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-fg-base)] transition-colors hover:bg-[var(--color-bg-subtle)]"
        >
          <X className="size-5 stroke-[2]" />
        </button>
        <div className="flex items-center gap-1">
          <IconBtn label="Time tracking">
            <Clock className="size-5 stroke-[1.75]" />
          </IconBtn>
          <IconBtn label="Star">
            <Star className="size-5 stroke-[1.75]" />
          </IconBtn>
          <IconBtn label="More">
            <MoreHorizontal className="size-5 stroke-[1.75]" />
          </IconBtn>
        </div>
      </header>

      <div className="border-t border-[var(--color-border-subtle)]" />

      {/* Title + properties */}
      <div className="px-6 pb-2 pt-6 sm:px-8">
        <h2 className="font-display text-[clamp(1.75rem,4.5vw,2.625rem)] font-bold leading-[1.05] tracking-[-0.025em]">
          Fintech Mobile App Redesign
        </h2>

        <dl className="mt-6 flex flex-col gap-4 sm:gap-5">
          <Property icon={<Clock className="size-[18px] stroke-[1.75]" />} label="Created time">
            <span className="text-[var(--color-fg-base)]">February 12, 2025</span>
            <span className="ml-3 text-[var(--color-fg-muted)]">10:35 AM</span>
          </Property>

          <Property icon={<LoaderCircle className="size-[18px] stroke-[1.75]" />} label="Status">
            <SoftPill tone="warning">
              <span className="size-1.5 shrink-0 rounded-full bg-[var(--color-warning)]" />
              In Research
            </SoftPill>
          </Property>

          <Property icon={<CheckCircle2 className="size-[18px] stroke-[1.75]" />} label="Priority">
            <SoftPill tone="accent">Low</SoftPill>
          </Property>

          <Property icon={<CalendarDays className="size-[18px] stroke-[1.75]" />} label="Due Date">
            <span className="text-[var(--color-fg-base)]">February 12, 2025</span>
            <span className="mx-2 text-[var(--color-fg-subtle)]">–</span>
            <span className="text-[var(--color-fg-base)]">February 22, 2025</span>
          </Property>

          <Property icon={<Tag className="size-[18px] stroke-[1.75]" />} label="Tags">
            <div className="flex flex-wrap items-center gap-1.5">
              {['Task', 'Wireframe', 'Homepage'].map((t) => (
                <SoftPill key={t} tone="neutral">
                  {t}
                </SoftPill>
              ))}
            </div>
          </Property>

          <Property icon={<Users className="size-[18px] stroke-[1.75]" />} label="Assignees">
            <AvatarGroup overlap={10}>
              <Avatar size="sm" src="https://i.pravatar.cc/96?img=11" fallback="A" />
              <Avatar size="sm" src="https://i.pravatar.cc/96?img=14" fallback="B" />
              <Avatar size="sm" src="https://i.pravatar.cc/96?img=20" fallback="C" />
            </AvatarGroup>
          </Property>
        </dl>

        {/* Description box */}
        <div className="mt-7 rounded-[var(--radius-2xl)] bg-[var(--color-bg-subtle)] p-5 sm:p-6">
          <p className="text-[15px] font-semibold tracking-[-0.01em]">
            Project Description
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
            This Finance Mobile App redesign aims to enhance user experience by streamlining
            navigation and improving accessibility. Users will enjoy a modern interface,
            intuitive features, and seamless transactions, making financial management easier
            than ever.
          </p>
        </div>
      </div>

      {/* Tabs + activity feed */}
      <div className="mt-6 px-6 sm:px-8">
        <Tabs value={tab} onValueChange={setTab}>
          <Tabs.List variant="underline" className="gap-3 sm:gap-5">
            <Tabs.Trigger value="activity" className="px-1">Activity</Tabs.Trigger>
            <Tabs.Trigger value="my-work"  className="px-1">My Work</Tabs.Trigger>
            <Tabs.Trigger value="assigned" className="px-1">Assigned</Tabs.Trigger>
            <Tabs.Trigger value="comments" className="px-1">Comments</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="activity" className="pt-5 pb-6">
            <p className="text-[15px] font-semibold tracking-[-0.01em]">Today</p>
            <div className="mt-4 flex items-start gap-3">
              <Avatar size="sm" src="https://i.pravatar.cc/96?img=33" fallback="TK" />
              <p className="text-[15px] leading-relaxed text-[var(--color-fg-base)]">
                <span className="font-semibold">Talan Korsgaard</span>{' '}
                <span className="text-[var(--color-fg-muted)]">changed the status of</span>{' '}
                <span className="font-semibold">"Finance Mobile App Redesign"</span>{' '}
                <span className="text-[var(--color-fg-muted)]">from</span> To Do{' '}
                <span className="text-[var(--color-fg-muted)]">to</span> In Progress
              </p>
            </div>
          </Tabs.Content>
          <Tabs.Content value="my-work"  className="py-6 text-sm text-[var(--color-fg-muted)]">No work assigned to you.</Tabs.Content>
          <Tabs.Content value="assigned" className="py-6 text-sm text-[var(--color-fg-muted)]">3 people assigned.</Tabs.Content>
          <Tabs.Content value="comments" className="py-6 text-sm text-[var(--color-fg-muted)]">No comments yet.</Tabs.Content>
        </Tabs>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * Subcomponents
 * ──────────────────────────────────────────────────────────── */

function Property({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
      <dt className="flex shrink-0 items-center gap-2.5 text-[15px] font-medium text-[var(--color-fg-muted)] sm:w-44">
        <span className="text-[var(--color-fg-subtle)]">{icon}</span>
        {label}
      </dt>
      <dd className="flex min-w-0 flex-1 flex-wrap items-center text-[15px]">
        {children}
      </dd>
    </div>
  );
}

const TONE_STYLES = {
  warning: 'bg-[oklch(96%_0.06_75)] text-[oklch(50%_0.13_60)]',
  accent:  'bg-[oklch(95%_0.04_290)] text-[oklch(40%_0.18_290)]',
  neutral: 'bg-[var(--color-bg-subtle)] text-[var(--color-fg-base)] border border-[var(--color-border-subtle)]',
} as const;

function SoftPill({
  tone,
  children,
}: {
  tone: keyof typeof TONE_STYLES;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[var(--radius-md)]',
        'px-2.5 py-1 text-[13px] font-medium tracking-[-0.005em]',
        TONE_STYLES[tone]
      )}
    >
      {children}
    </span>
  );
}

function IconBtn({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        'inline-flex size-9 items-center justify-center',
        'rounded-[var(--radius-md)]',
        'text-[var(--color-fg-base)]',
        'transition-colors',
        'hover:bg-[var(--color-bg-subtle)]'
      )}
    >
      {children}
    </button>
  );
}
