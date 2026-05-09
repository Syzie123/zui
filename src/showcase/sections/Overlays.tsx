import { useState } from 'react';
import {
  ChevronDown,
  Copy,
  CreditCard,
  Github,
  HelpCircle,
  LogOut,
  Mail,
  Plus,
  Settings,
  User,
  Users,
} from 'lucide-react';
import { Button } from '../../components/Button';
import { Popover } from '../../components/Popover';
import { Tooltip } from '../../components/Tooltip';
import { DropdownMenu } from '../../components/DropdownMenu';
import { HoverCard } from '../../components/HoverCard';
import { Avatar } from '../../components/Avatar';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { Section, Demo } from '../Section';

export function Overlays() {
  return (
    <Section
      id="overlays"
      eyebrow="Tier 2"
      title="Overlays"
      description="Popovers, tooltips, dropdowns. Built on Floating UI for sub-pixel positioning, with full keyboard navigation and exit animations."
    >
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <Demo label="Tooltip — 250ms delay, role=tooltip">
          <div className="flex items-center gap-2">
            <Tooltip.Simple content="Save changes" side="top">
              <Button variant="secondary" size="icon-sm" aria-label="Save">
                <Mail className="size-4" />
              </Button>
            </Tooltip.Simple>
            <Tooltip.Simple content="Copy to clipboard" side="bottom">
              <Button variant="secondary" size="icon-sm" aria-label="Copy">
                <Copy className="size-4" />
              </Button>
            </Tooltip.Simple>
            <Tooltip.Simple content="Documentation" side="right">
              <Button variant="secondary" size="icon-sm" aria-label="Help">
                <HelpCircle className="size-4" />
              </Button>
            </Tooltip.Simple>
          </div>
        </Demo>

        <Demo label="Popover — anchored content">
          <Popover>
            <Popover.Trigger asChild>
              <Button variant="secondary" rightIcon={<ChevronDown className="size-4" />}>
                Invite teammates
              </Button>
            </Popover.Trigger>
            <Popover.Content className="w-80">
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold tracking-[-0.01em]">Invite people</h4>
                  <p className="mt-0.5 text-xs text-[var(--color-fg-muted)]">
                    Send an invite to your workspace.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="invite">Email</Label>
                  <Input id="invite" type="email" placeholder="alex@company.com" />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <Popover.Close asChild>
                    <Button variant="ghost" size="sm">
                      Cancel
                    </Button>
                  </Popover.Close>
                  <Button size="sm">Send invite</Button>
                </div>
              </div>
            </Popover.Content>
          </Popover>
        </Demo>

        <Demo label="Dropdown menu — keyboard nav, sub-menus, shortcuts">
          <UserMenu />
        </Demo>

        <Demo label="Hover card — preview on hover">
          <HoverCard openDelay={200} closeDelay={150}>
            <HoverCard.Trigger asChild>
              <a
                href="#"
                className="font-medium text-[var(--color-accent-base)] underline underline-offset-4"
              >
                @anthropic
              </a>
            </HoverCard.Trigger>
            <HoverCard.Content>
              <div className="flex items-start gap-3">
                <Avatar size="lg" fallback="A" />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold tracking-[-0.01em]">Anthropic</h4>
                  <p className="text-xs text-[var(--color-fg-muted)]">
                    AI safety company building reliable, interpretable, and steerable systems.
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-xs text-[var(--color-fg-subtle)]">
                    <Github className="size-3" /> 2.4k repositories
                  </div>
                </div>
              </div>
            </HoverCard.Content>
          </HoverCard>
        </Demo>
      </div>
    </Section>
  );
}

function UserMenu() {
  const [showShortcuts, setShowShortcuts] = useState(true);

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="secondary" leftIcon={<Avatar size="xs" fallback="AS" />} rightIcon={<ChevronDown className="size-4" />}>
          Account
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-60">
        <DropdownMenu.Label>Signed in as</DropdownMenu.Label>
        <div className="px-2 pb-1">
          <p className="truncate text-sm font-medium">Anya Sharma</p>
          <p className="truncate text-xs text-[var(--color-fg-muted)]">anya@anthropic.com</p>
        </div>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <User className="size-4" />
          Profile
          <DropdownMenu.Shortcut>⌘P</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <CreditCard className="size-4" />
          Billing
          <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Settings className="size-4" />
          Settings
          <DropdownMenu.Shortcut>⌘,</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            <Users className="size-4" />
            Team
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>
              <Plus className="size-4" /> Invite members
            </DropdownMenu.Item>
            <DropdownMenu.Item>Manage permissions</DropdownMenu.Item>
            <DropdownMenu.Item>Audit log</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Separator />
        <DropdownMenu.CheckboxItem
          checked={showShortcuts}
          onCheckedChange={setShowShortcuts}
        >
          Show shortcuts
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.Separator />
        <DropdownMenu.Item destructive>
          <LogOut className="size-4" />
          Sign out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
