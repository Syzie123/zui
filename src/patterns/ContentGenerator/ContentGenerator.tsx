import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';
import {
  ChevronDown,
  Copy,
  ExternalLink,
  Info,
  Plus,
  Sparkles,
  Star,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import './ContentGenerator.css';

/* -------------------------------- Root --------------------------------- */

export interface ContentGeneratorProps extends HTMLAttributes<HTMLDivElement> {
  /** Stack the three columns vertically below this width breakpoint. */
  stackBelow?: number;
}

interface ContentGeneratorComp
  extends React.ForwardRefExoticComponent<
    ContentGeneratorProps & React.RefAttributes<HTMLDivElement>
  > {
  Sidebar: typeof Sidebar;
  Brand: typeof Brand;
  Search: typeof Search;
  Primary: typeof Primary;
  Menu: typeof Menu;
  MenuItem: typeof MenuItem;
  Trial: typeof Trial;
  User: typeof User;
  Main: typeof Main;
  Header: typeof Header;
  Tabs: typeof Tabs;
  Tab: typeof Tab;
  Field: typeof Field;
  TextArea: typeof TextArea;
  Input: typeof Input;
  FieldRow: typeof FieldRow;
  Section: typeof Section;
  Footer: typeof Footer;
  Generate: typeof Generate;
  Outputs: typeof Outputs;
  OutputsHeader: typeof OutputsHeader;
  Output: typeof Output;
  OutputActions: typeof OutputActions;
  OutputAction: typeof OutputAction;
}

const ContentGeneratorRoot = forwardRef<HTMLDivElement, ContentGeneratorProps>(
  function ContentGenerator({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cn('zui-cgen', className)} {...rest}>
        {children}
      </div>
    );
  }
);

/* -------------------------------- Sidebar ------------------------------- */

function Sidebar({ children, className, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <aside className={cn('zui-cgen__side', className)} {...rest}>
      {children}
    </aside>
  );
}

function Brand({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <div className="zui-cgen__brand">
      {icon && <span className="zui-cgen__brand-mark">{icon}</span>}
      <span className="zui-cgen__brand-name">{children}</span>
    </div>
  );
}

function Search({
  placeholder = 'Quick search',
  shortcut = '⌘K',
  ...rest
}: { placeholder?: string; shortcut?: ReactNode } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="zui-cgen__search">
      <span aria-hidden className="zui-cgen__search-icon">⌕</span>
      <input
        type="search"
        placeholder={placeholder}
        className="zui-cgen__search-input"
        {...rest}
      />
      {shortcut && <kbd className="zui-cgen__search-kbd">{shortcut}</kbd>}
    </label>
  );
}

function Primary({
  icon,
  className,
  children,
  ...rest
}: { icon?: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn('zui-cgen__primary', className)}
      {...rest}
    >
      {icon ?? <Plus className="size-4" strokeWidth={2.4} />}
      {children}
    </button>
  );
}

function Menu({
  label,
  children,
  className,
  ...rest
}: { label?: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('zui-cgen__menu', className)} {...rest}>
      {label && <span className="zui-cgen__menu-label">{label}</span>}
      {children}
    </div>
  );
}

interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  active?: boolean;
  badge?: ReactNode;
}

function MenuItem({
  icon,
  active,
  badge,
  className,
  children,
  ...rest
}: MenuItemProps) {
  return (
    <button
      type="button"
      data-active={active || undefined}
      className={cn('zui-cgen__menu-item', className)}
      {...rest}
    >
      {icon && <span className="zui-cgen__menu-icon">{icon}</span>}
      <span className="zui-cgen__menu-text">{children}</span>
      {badge && <span className="zui-cgen__menu-badge">{badge}</span>}
    </button>
  );
}

function Trial({
  title,
  description,
  ctaLabel = 'View details',
  onCta,
  illustration,
}: {
  title: ReactNode;
  description?: ReactNode;
  ctaLabel?: ReactNode;
  onCta?: () => void;
  illustration?: ReactNode;
}) {
  return (
    <div className="zui-cgen__trial">
      {illustration ?? <span aria-hidden className="zui-cgen__trial-emoji">👍</span>}
      <p className="zui-cgen__trial-title">{title}</p>
      {description && <p className="zui-cgen__trial-desc">{description}</p>}
      <button type="button" className="zui-cgen__trial-cta" onClick={onCta}>
        {ctaLabel}
      </button>
    </div>
  );
}

function User({
  name,
  email,
  avatar,
}: {
  name: ReactNode;
  email?: ReactNode;
  avatar?: ReactNode;
}) {
  return (
    <div className="zui-cgen__user">
      <span className="zui-cgen__user-avatar">{avatar}</span>
      <div className="zui-cgen__user-text">
        <span className="zui-cgen__user-name">{name}</span>
        {email && <span className="zui-cgen__user-email">{email}</span>}
      </div>
      <ChevronDown className="size-4 text-[var(--color-fg-muted)]" />
    </div>
  );
}

/* --------------------------------- Main -------------------------------- */

function Main({ children, className, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <main className={cn('zui-cgen__main', className)} {...rest}>
      {children}
    </main>
  );
}

function Header({
  icon,
  title,
  description,
}: {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <header className="zui-cgen__header">
      {icon && <span className="zui-cgen__header-icon">{icon}</span>}
      <div>
        <h2 className="zui-cgen__header-title">{title}</h2>
        {description && (
          <p className="zui-cgen__header-desc">{description}</p>
        )}
      </div>
    </header>
  );
}

function Tabs({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div role="tablist" className={cn('zui-cgen__tabs', className)} {...rest}>
      {children}
    </div>
  );
}

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

function Tab({ active, className, children, ...rest }: TabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      data-active={active || undefined}
      className={cn('zui-cgen__tab', className)}
      {...rest}
    >
      {children}
    </button>
  );
}

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  hint?: ReactNode;
  /** Right-aligned counter, eg. "76/400". */
  counter?: ReactNode;
}

function Field({
  label,
  hint,
  counter,
  className,
  children,
  ...rest
}: FieldProps) {
  return (
    <div className={cn('zui-cgen__field', className)} {...rest}>
      <div className="zui-cgen__field-head">
        <span className="zui-cgen__field-label">
          {label}
          {hint && (
            <span className="zui-cgen__field-hint" title={typeof hint === 'string' ? hint : undefined}>
              <Info className="size-3.5" />
            </span>
          )}
        </span>
        {counter && <span className="zui-cgen__field-counter">{counter}</span>}
      </div>
      {children}
    </div>
  );
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  active?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ active, className, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        data-active={active || undefined}
        className={cn('zui-cgen__textarea', className)}
        {...rest}
      />
    );
  }
);

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...rest }, ref) {
    return (
      <input
        ref={ref}
        className={cn('zui-cgen__input', className)}
        {...rest}
      />
    );
  }
);

function FieldRow({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('zui-cgen__fieldrow', className)} {...rest}>
      {children}
    </div>
  );
}

interface SectionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  badge?: ReactNode;
  hint?: ReactNode;
}

function Section({ title, badge, hint, className, children, ...rest }: SectionProps) {
  return (
    <section className={cn('zui-cgen__section', className)} {...rest}>
      <header className="zui-cgen__section-head">
        <span className="zui-cgen__section-title">
          {title}
          {hint && <Info className="size-3.5 text-[var(--color-fg-muted)]" />}
          {badge && <span className="zui-cgen__section-badge">{badge}</span>}
        </span>
      </header>
      {children}
    </section>
  );
}

function Footer({ children, className, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn('zui-cgen__footer', className)} {...rest}>
      {children}
    </footer>
  );
}

function Generate({
  icon,
  className,
  children,
  ...rest
}: { icon?: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn('zui-cgen__generate', className)}
      {...rest}
    >
      {icon ?? <Sparkles className="size-4" strokeWidth={2.4} />}
      {children ?? 'Generate'}
    </button>
  );
}

/* -------------------------- Outputs (right rail) -------------------------- */

function Outputs({ children, className, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <aside className={cn('zui-cgen__outputs', className)} {...rest}>
      {children}
    </aside>
  );
}

interface OutputsHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Active tab id. */
  active?: string;
  /** Tabs to render. */
  tabs?: { id: string; label: ReactNode }[];
  onTabChange?: (id: string) => void;
  onClear?: () => void;
}

function OutputsHeader({
  active,
  tabs = [{ id: 'new', label: 'New outputs' }, { id: 'history', label: 'History' }],
  onTabChange,
  onClear,
  className,
  ...rest
}: OutputsHeaderProps) {
  return (
    <div className={cn('zui-cgen__outputs-head', className)} {...rest}>
      <div className="zui-cgen__outputs-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            data-active={t.id === active || undefined}
            onClick={() => onTabChange?.(t.id)}
            className="zui-cgen__outputs-tab"
          >
            {t.label}
          </button>
        ))}
      </div>
      {onClear && (
        <button type="button" onClick={onClear} className="zui-cgen__outputs-clear">
          Clear
        </button>
      )}
    </div>
  );
}

interface OutputProps extends HTMLAttributes<HTMLDivElement> {
  /** Highlight the card with a soft accent tint. */
  highlight?: boolean;
  /** Timestamp / age, eg. "1m ago". */
  meta?: ReactNode;
}

function Output({ highlight, meta, className, children, ...rest }: OutputProps) {
  return (
    <article
      data-highlight={highlight || undefined}
      className={cn('zui-cgen__output', className)}
      {...rest}
    >
      <div className="zui-cgen__output-body">{children}</div>
      {meta && <div className="zui-cgen__output-meta">{meta}</div>}
    </article>
  );
}

function OutputActions({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('zui-cgen__output-actions', className)} {...rest}>
      {children}
    </div>
  );
}

interface OutputActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Pre-defined action — autoselects an icon. */
  kind?: 'star' | 'copy' | 'open' | 'like' | 'dislike';
  active?: boolean;
}

const KIND_ICON = {
  star:    <Star    className="size-3.5" />,
  copy:    <Copy    className="size-3.5" />,
  open:    <ExternalLink className="size-3.5" />,
  like:    <ThumbsUp className="size-3.5" />,
  dislike: <ThumbsDown className="size-3.5" />,
};

function OutputAction({
  kind,
  active,
  className,
  children,
  ...rest
}: OutputActionProps) {
  return (
    <button
      type="button"
      data-active={active || undefined}
      className={cn('zui-cgen__output-action', className)}
      {...rest}
    >
      {kind && KIND_ICON[kind]}
      {children}
    </button>
  );
}

/* ----------------------------- Compound export ---------------------------- */

const ContentGenerator = ContentGeneratorRoot as ContentGeneratorComp;
ContentGenerator.Sidebar = Sidebar;
ContentGenerator.Brand = Brand;
ContentGenerator.Search = Search;
ContentGenerator.Primary = Primary;
ContentGenerator.Menu = Menu;
ContentGenerator.MenuItem = MenuItem;
ContentGenerator.Trial = Trial;
ContentGenerator.User = User;
ContentGenerator.Main = Main;
ContentGenerator.Header = Header;
ContentGenerator.Tabs = Tabs;
ContentGenerator.Tab = Tab;
ContentGenerator.Field = Field;
ContentGenerator.TextArea = TextArea;
ContentGenerator.Input = Input;
ContentGenerator.FieldRow = FieldRow;
ContentGenerator.Section = Section;
ContentGenerator.Footer = Footer;
ContentGenerator.Generate = Generate;
ContentGenerator.Outputs = Outputs;
ContentGenerator.OutputsHeader = OutputsHeader;
ContentGenerator.Output = Output;
ContentGenerator.OutputActions = OutputActions;
ContentGenerator.OutputAction = OutputAction;

export { ContentGenerator };
