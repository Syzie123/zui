import { useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Mail,
  Search,
  Sparkles,
  Star,
  Trash2,
  Plus,
  Heart,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { Textarea } from '../../components/Textarea';
import { Separator } from '../../components/Separator';
import { Skeleton } from '../../components/Skeleton';
import { Badge } from '../../components/Badge';
import { Avatar, AvatarGroup } from '../../components/Avatar';
import { Section, Demo } from '../Section';

export function Foundations() {
  return (
    <Section
      id="foundations"
      eyebrow="Tier 1"
      title="Foundations"
      description="The atoms — buttons, inputs, labels. Every other component is built on these."
    >
      {/* Buttons get their own showcase row — they earn it */}
      <div className="mb-6 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Demo label="Variants — primary, secondary, ghost, soft" className="md:col-span-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive" leftIcon={<Trash2 className="size-4" />}>
            Delete
          </Button>
        </Demo>

        <Demo label="Gradient — animated brand variant">
          <Button variant="gradient" size="lg" rightIcon={<ArrowRight className="size-4" />}>
            Continue
          </Button>
        </Demo>

        <Demo label="Luminous — aurora glow showpiece" className="md:col-span-2 bg-[oklch(13.5%_0.018_270)]">
          <div className="rounded-[var(--radius-xl)]">
            <Button
              variant="luminous"
              size="xl"
              leftIcon={<Sparkles className="size-4" />}
            >
              Get started
            </Button>
          </div>
        </Demo>

        <Demo label="Sizes & states">
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button loading>Saving</Button>
              <Button disabled>Disabled</Button>
              <Button variant="secondary" rightIcon={<ChevronRight className="size-4" />}>
                Continue
              </Button>
            </div>
          </div>
        </Demo>
      </div>

      {/* Form atoms */}
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Demo label="Input — prefix, suffix, password toggle">
          <PasswordField />
        </Demo>

        <Demo label="Validation — invalid state with helper">
          <div className="w-full max-w-xs space-y-1.5">
            <Label htmlFor="invalid">Workspace name</Label>
            <Input
              id="invalid"
              defaultValue="my workspace"
              invalid
              aria-describedby="invalid-error"
            />
            <p
              id="invalid-error"
              className="text-xs text-[var(--color-danger)]"
              role="alert"
            >
              Spaces are not allowed in workspace names.
            </p>
          </div>
        </Demo>

        <Demo label="Email — with prefix">
          <div className="w-full max-w-xs space-y-1.5">
            <Label htmlFor="email" required>
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              prefix={<Mail className="size-4" />}
            />
          </div>
        </Demo>

        <Demo label="Search — keyboard hint">
          <div className="w-full max-w-xs space-y-1.5">
            <Label htmlFor="search" hint="(⌘K)">
              Search components
            </Label>
            <Input
              id="search"
              placeholder="Search…"
              prefix={<Search className="size-4" />}
              suffix={
                <kbd className="rounded-[var(--radius-sm)] border border-[var(--color-border-base)] bg-[var(--color-bg-subtle)] px-1.5 py-0.5 text-[10px] font-medium">
                  ⌘K
                </kbd>
              }
            />
          </div>
        </Demo>

        <Demo label="Textarea — drag to resize">
          <div className="w-full max-w-xs">
            <Textarea placeholder="Tell us about your project…" rows={4} />
          </div>
        </Demo>

        <Demo label="Sizes — sm, md, lg">
          <div className="w-full max-w-xs space-y-2">
            <Input size="sm" placeholder="Small input" />
            <Input size="md" placeholder="Medium input" />
            <Input size="lg" placeholder="Large input" />
          </div>
        </Demo>
      </div>

      {/* Badges, avatars, separators, skeletons */}
      <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Demo label="Badge — 8 tones">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <Badge>Neutral</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="success">
              <Check className="size-3" /> Live
            </Badge>
            <Badge variant="warning">In review</Badge>
            <Badge variant="danger">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="solid">Solid</Badge>
          </div>
        </Demo>

        <Demo label="Avatar — image, fallback, status">
          <div className="flex items-center gap-3">
            <Avatar size="lg" src="https://i.pravatar.cc/96?img=12" fallback="AS" status="online" />
            <Avatar size="lg" fallback="AB" status="busy" />
            <Avatar size="lg" fallback="MK" status="away" />
            <Avatar size="lg" fallback="JS" status="offline" />
          </div>
        </Demo>

        <Demo label="Avatar group — collapsed remainder">
          <AvatarGroup max={4}>
            <Avatar src="https://i.pravatar.cc/96?img=1" fallback="A" />
            <Avatar src="https://i.pravatar.cc/96?img=2" fallback="B" />
            <Avatar src="https://i.pravatar.cc/96?img=3" fallback="C" />
            <Avatar src="https://i.pravatar.cc/96?img=4" fallback="D" />
            <Avatar fallback="EF" />
            <Avatar fallback="GH" />
          </AvatarGroup>
        </Demo>

        <Demo label="Separator — horizontal & vertical">
          <div className="flex w-full max-w-xs flex-col items-center gap-3 text-sm">
            <span className="text-[var(--color-fg-muted)]">Account settings</span>
            <Separator />
            <div className="flex items-center gap-3">
              <span>Privacy</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Security</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Billing</span>
            </div>
          </div>
        </Demo>

        <Demo label="Skeleton — pulse loading">
          <div className="w-full max-w-xs space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton shape="circle" className="size-10" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-24 w-full" />
          </div>
        </Demo>

        <FavoriteButton />
      </div>
    </Section>
  );
}

/** Password input with eye toggle — demonstrates the suffix slot. */
function PasswordField() {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full max-w-xs space-y-1.5">
      <Label htmlFor="pwd">Password</Label>
      <Input
        id="pwd"
        type={show ? 'text' : 'password'}
        defaultValue="hunter2"
        suffix={
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="rounded-[var(--radius-sm)] p-0.5 text-[var(--color-fg-subtle)] transition-colors hover:text-[var(--color-fg-base)]"
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        }
      />
    </div>
  );
}

/** Heart toggle — controlled state with subtle scale anim. */
function FavoriteButton() {
  const [count, setCount] = useState(248);
  const [active, setActive] = useState(false);

  return (
    <Demo label="Interactive — controlled toggle">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant={active ? 'soft' : 'secondary'}
          leftIcon={
            <Heart
              className={`size-4 transition-all duration-[var(--duration-base)] ease-[var(--ease-spring)] ${
                active ? 'fill-[var(--color-danger)] text-[var(--color-danger)] scale-110' : ''
              }`}
            />
          }
          onClick={() => {
            setActive((a) => !a);
            setCount((c) => c + (active ? -1 : 1));
          }}
        >
          {count.toLocaleString()}
        </Button>
        <Button variant="ghost" leftIcon={<Star className="size-4" />}>
          Star
        </Button>
        <Button variant="ghost" leftIcon={<Plus className="size-4" />}>
          Watch
        </Button>
      </div>
    </Demo>
  );
}
