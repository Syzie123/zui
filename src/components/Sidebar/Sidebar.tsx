import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { PanelLeft } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '../../utils/cn';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Button } from '../Button';
import { Input } from '../Input';
import { Separator } from '../Separator';
import { Skeleton } from '../Skeleton';
import { Sheet } from '../Sheet';
import { Tooltip } from '../Tooltip';

/* ────────────────────────────────────────────────────────────
 * Adapted from the shadcn-ui sidebar primitive (new-york-v4).
 * Differences vs upstream:
 *   - Removed `"use client"` (Vite SPA, not Next).
 *   - Token names: `bg-sidebar` → `bg-[var(--sidebar-bg)]`, etc.
 *   - Uses my Sheet (Radix-Dialog-based) for mobile.
 *   - Uses my Tooltip / Button / Input / Separator / Skeleton.
 * ──────────────────────────────────────────────────────────── */

const SIDEBAR_COOKIE_NAME       = 'zui-sidebar-state';
const SIDEBAR_COOKIE_MAX_AGE    = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH             = '16rem';
const SIDEBAR_WIDTH_MOBILE      = '18rem';
const SIDEBAR_WIDTH_ICON        = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContextValue = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar(): SidebarContextValue {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within <Sidebar.Provider>.');
  return ctx;
}

/* ────────────── Provider ────────────── */

interface ProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Provider = React.forwardRef<HTMLDivElement, ProviderProps>(function SidebarProvider(
  {
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...rest
  },
  ref
) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  const [_open, _setOpen] = React.useState<boolean>(() => {
    if (typeof document === 'undefined') return defaultOpen;
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${SIDEBAR_COOKIE_NAME}=([^;]*)`)
    );
    if (match) return match[1] === 'true';
    return defaultOpen;
  });
  const open = openProp ?? _open;

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const next = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) setOpenProp(next);
      else _setOpen(next);
      // Persist
      if (typeof document !== 'undefined') {
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      }
    },
    [setOpenProp, open]
  );

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) setOpenMobile((v) => !v);
    else setOpen((v) => !v);
  }, [isMobile, setOpen]);

  // ⌘B / Ctrl+B keyboard shortcut
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT &&
        (e.metaKey || e.ctrlKey)
      ) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleSidebar]);

  const state: SidebarContextValue['state'] = open ? 'expanded' : 'collapsed';

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={value}>
      <Tooltip.Provider delayDuration={0}>
        <div
          ref={ref}
          data-slot="sidebar-wrapper"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper flex min-h-svh w-full',
            className
          )}
          {...rest}
        >
          {children}
        </div>
      </Tooltip.Provider>
    </SidebarContext.Provider>
  );
});

/* ────────────── Root ────────────── */

interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}

const Root = React.forwardRef<HTMLDivElement, RootProps>(function Sidebar(
  {
    side = 'left',
    variant = 'sidebar',
    collapsible = 'offcanvas',
    className,
    children,
    ...rest
  },
  ref
) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === 'none') {
    return (
      <div
        ref={ref}
        data-slot="sidebar"
        className={cn(
          'flex h-full w-[var(--sidebar-width)] flex-col',
          'bg-[var(--sidebar-bg)] text-[var(--sidebar-fg)]',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <Sheet.Content
          side={side}
          showCloseButton={false}
          data-mobile="true"
          data-slot="sidebar"
          className="w-[var(--sidebar-width-mobile)] bg-[var(--sidebar-bg)] p-0 text-[var(--sidebar-fg)]"
          style={
            {
              '--sidebar-width-mobile': SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
        >
          <Sheet.Header className="sr-only">
            <Sheet.Title>Sidebar</Sheet.Title>
            <Sheet.Description>Displays the mobile sidebar.</Sheet.Description>
          </Sheet.Header>
          <div className="flex h-full w-full flex-col">{children}</div>
        </Sheet.Content>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      className="group peer hidden text-[var(--sidebar-fg)] md:block"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* Sidebar gap — pushes the inset content right */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          'relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]'
            : 'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]'
        )}
      />
      {/* Fixed container */}
      <div
        data-slot="sidebar-container"
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem+2px)]'
            : 'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l border-[var(--sidebar-border)]',
          className
        )}
        {...rest}
      >
        <div
          data-slot="sidebar-inner"
          className={cn(
            'flex h-full w-full flex-col bg-[var(--sidebar-bg)]',
            'group-data-[variant=floating]:rounded-[var(--radius-lg)] group-data-[variant=floating]:border group-data-[variant=floating]:border-[var(--sidebar-border)] group-data-[variant=floating]:shadow-[var(--shadow-sm)]'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
});

/* ────────────── Trigger ────────────── */

const Trigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(function SidebarTrigger({ className, onClick, ...props }, ref) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon-sm"
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      className={cn('size-8', className)}
      {...props}
    >
      <PanelLeft className="size-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});

/* ────────────── Rail (drag handle on the edge) ────────────── */

const Rail = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
  function SidebarRail({ className, ...props }, ref) {
    const { toggleSidebar } = useSidebar();
    return (
      <button
        ref={ref}
        data-slot="sidebar-rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        className={cn(
          'absolute inset-y-0 z-20 hidden w-3 -translate-x-1/2 transition-all ease-linear',
          'group-data-[side=left]:-right-3 group-data-[side=right]:left-0',
          'after:absolute after:inset-y-0 after:left-1/2 after:w-[1px] after:bg-transparent',
          'hover:after:bg-[var(--sidebar-border)]',
          'sm:flex',
          'cursor-ew-resize',
          'group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
          className
        )}
        {...props}
      />
    );
  }
);

/* ────────────── Inset (the right-side content area) ────────────── */

const Inset = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  function SidebarInset({ className, ...props }, ref) {
    return (
      <main
        ref={ref}
        data-slot="sidebar-inset"
        className={cn(
          'relative flex w-full flex-1 flex-col bg-[var(--color-bg-base)]',
          'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-[var(--shadow-sm)]',
          className
        )}
        {...props}
      />
    );
  }
);

/* ────────────── Header / Footer / Content / Group / etc. ────────────── */

const InputCmp = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input>
>(function SidebarInput({ className, ...props }, ref) {
  return (
    <Input
      ref={ref}
      data-slot="sidebar-input"
      wrapperClassName="h-8 bg-[var(--color-bg-elevated)] shadow-none"
      className={cn('text-sm', className)}
      {...props}
    />
  );
});

const Header = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="sidebar-header"
    className={cn('flex flex-col gap-2 p-2', className)}
    {...props}
  />
);

const Footer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="sidebar-footer"
    className={cn('flex flex-col gap-2 p-2', className)}
    {...props}
  />
);

const SeparatorCmp = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(function SidebarSeparator({ className, ...props }, ref) {
  return (
    <Separator
      ref={ref}
      data-slot="sidebar-separator"
      className={cn('mx-2 w-auto bg-[var(--sidebar-border)]', className)}
      {...props}
    />
  );
});

const Content = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="sidebar-content"
    className={cn(
      'zui-scroll flex min-h-0 flex-1 flex-col gap-2 overflow-auto',
      'group-data-[collapsible=icon]:overflow-hidden',
      className
    )}
    {...props}
  />
);

const Group = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="sidebar-group"
    className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
    {...props}
  />
);

const GroupLabel = ({
  className,
  asChild = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      data-slot="sidebar-group-label"
      className={cn(
        'flex h-8 shrink-0 items-center rounded-[var(--radius-md)] px-2',
        'text-[11px] font-semibold uppercase tracking-[0.14em]',
        'text-[var(--sidebar-fg-muted)]',
        'outline-none transition-[margin,opacity] duration-200 ease-linear',
        'focus-visible:shadow-[var(--shadow-focus)]',
        '[&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        className
      )}
      {...props}
    />
  );
};

const GroupContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="sidebar-group-content"
    className={cn('w-full text-sm', className)}
    {...props}
  />
);

/* ────────────── Menu ────────────── */

const Menu = ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
  <ul
    data-slot="sidebar-menu"
    className={cn('flex w-full min-w-0 flex-col gap-1', className)}
    {...props}
  />
);

const MenuItem = ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
  <li
    data-slot="sidebar-menu-item"
    className={cn('group/menu-item relative', className)}
    {...props}
  />
);

const menuButtonVariants = cva(
  [
    'peer/menu-button flex w-full items-center gap-2 overflow-hidden',
    'rounded-[var(--radius-md)] p-2 text-left text-sm',
    'outline-none transition-[width,height,padding,background-color,color]',
    'group-has-data-[sidebar=menu-action]/menu-item:pr-8',
    'group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2',
    'hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-fg)]',
    'focus-visible:shadow-[var(--shadow-focus)]',
    'active:bg-[var(--sidebar-accent)] active:text-[var(--sidebar-accent-fg)]',
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
    'data-[active=true]:bg-[var(--sidebar-accent)]',
    'data-[active=true]:font-medium',
    'data-[active=true]:text-[var(--sidebar-accent-fg)]',
    'data-[active=true]:shadow-[inset_0_0_0_1px_var(--sidebar-border)]',
    '[&>span:last-child]:truncate',
    '[&>svg]:size-4 [&>svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        default: '',
        outline:
          'bg-[var(--color-bg-elevated)] shadow-[0_0_0_1px_var(--sidebar-border)] hover:shadow-[0_0_0_1px_var(--sidebar-accent)]',
      },
      size: {
        default: 'h-8 text-sm',
        sm:      'h-7 text-xs',
        lg:      'h-12 text-sm group-data-[collapsible=icon]:!p-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

interface MenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof menuButtonVariants> {
  asChild?: boolean;
  isActive?: boolean;
  /** Tooltip shown when the sidebar is collapsed to icons. */
  tooltip?: string;
}

const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  function SidebarMenuButton(
    {
      asChild = false,
      isActive = false,
      variant = 'default',
      size = 'default',
      tooltip,
      className,
      ...rest
    },
    ref
  ) {
    const Comp = asChild ? Slot : 'button';
    const { isMobile, state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-slot="sidebar-menu-button"
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive || undefined}
        className={cn(menuButtonVariants({ variant, size }), className)}
        {...rest}
      />
    );

    if (!tooltip) return button;

    return (
      <Tooltip>
        <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
        <Tooltip.Content
          side="right"
          align="center"
          hidden={state !== 'collapsed' || isMobile}
        >
          {tooltip}
        </Tooltip.Content>
      </Tooltip>
    );
  }
);

const MenuSkeleton = ({
  className,
  showIcon = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { showIcon?: boolean }) => {
  const width = React.useMemo(
    () => `${Math.floor(Math.random() * 40) + 50}%`,
    []
  );
  return (
    <div
      data-slot="sidebar-menu-skeleton"
      className={cn('flex h-8 items-center gap-2 rounded-[var(--radius-md)] px-2', className)}
      {...props}
    >
      {showIcon && <Skeleton shape="rect" className="size-4" />}
      <Skeleton
        shape="text"
        className="h-4 flex-1"
        style={{ maxWidth: width } as React.CSSProperties}
      />
    </div>
  );
};

const MenuBadge = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="sidebar-menu-badge"
    className={cn(
      'pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center',
      'rounded-[var(--radius-sm)] px-1 text-xs font-medium tabular-nums select-none',
      'text-[var(--sidebar-fg-muted)]',
      'peer-data-[size=sm]/menu-button:top-1',
      'peer-data-[size=default]/menu-button:top-1.5',
      'peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]:hidden',
      className
    )}
    {...props}
  />
);

const MenuSub = ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
  <ul
    data-slot="sidebar-menu-sub"
    className={cn(
      'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1',
      'border-l border-[var(--sidebar-border)] px-2.5 py-0.5',
      'group-data-[collapsible=icon]:hidden',
      className
    )}
    {...props}
  />
);

const MenuSubItem = ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
  <li
    data-slot="sidebar-menu-sub-item"
    className={cn('group/menu-sub-item relative', className)}
    {...props}
  />
);

interface MenuSubButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  size?: 'sm' | 'md';
  isActive?: boolean;
}

const MenuSubButton = React.forwardRef<HTMLAnchorElement, MenuSubButtonProps>(
  function SidebarMenuSubButton(
    { asChild, size = 'md', isActive, className, ...rest },
    ref
  ) {
    const Comp = asChild ? Slot : 'a';
    return (
      <Comp
        ref={ref}
        data-slot="sidebar-menu-sub-button"
        data-active={isActive || undefined}
        className={cn(
          'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden',
          'rounded-[var(--radius-md)] px-2 text-[var(--sidebar-fg-muted)]',
          'outline-none transition-colors',
          'hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-fg)]',
          'focus-visible:shadow-[var(--shadow-focus)]',
          'data-[active=true]:bg-[var(--sidebar-accent)]',
          'data-[active=true]:text-[var(--sidebar-accent-fg)]',
          '[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
          size === 'sm' ? 'text-xs' : 'text-sm',
          'group-data-[collapsible=icon]:hidden',
          className
        )}
        {...rest}
      />
    );
  }
);

/* ────────────── Public namespace ────────────── */

export const Sidebar = Object.assign(Root, {
  Provider,
  Trigger,
  Rail,
  Inset,
  Input: InputCmp,
  Header,
  Footer,
  Separator: SeparatorCmp,
  Content,
  Group,
  GroupLabel,
  GroupContent,
  Menu,
  MenuItem,
  MenuButton,
  MenuSkeleton,
  MenuBadge,
  MenuSub,
  MenuSubItem,
  MenuSubButton,
});
