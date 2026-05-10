import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import './AIGreeting.css';

/* -------------------------------- Root --------------------------------- */

export interface AIGreetingProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom orb element. Defaults to a built-in soft gradient sphere. */
  orb?: ReactNode;
  /** Hide the orb entirely. */
  hideOrb?: boolean;
  /** Big greeting line — defaults to "Hi, there 👋". */
  greeting?: ReactNode;
  /** Subtitle under the greeting. */
  subtitle?: ReactNode;
  /** Maximum width for the inner column. */
  maxWidth?: string;
}

interface AIGreetingComp
  extends React.ForwardRefExoticComponent<
    AIGreetingProps & React.RefAttributes<HTMLDivElement>
  > {
  Cards: typeof Cards;
  Card: typeof Card;
  Pills: typeof Pills;
  Pill: typeof Pill;
}

const AIGreetingRoot = forwardRef<HTMLDivElement, AIGreetingProps>(
  function AIGreeting(
    {
      orb,
      hideOrb,
      greeting = (
        <>
          Hi, there <span aria-hidden>👋</span>
        </>
      ),
      subtitle = "Tell us what you need, and we'll handle the rest.",
      maxWidth,
      className,
      children,
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn('zui-aigreet', className)}
        style={maxWidth ? { maxWidth } : undefined}
        {...rest}
      >
        {!hideOrb && <div className="zui-aigreet__orb">{orb ?? <DefaultOrb />}</div>}

        <h1 className="zui-aigreet__title">{greeting}</h1>
        {subtitle && <p className="zui-aigreet__subtitle">{subtitle}</p>}

        {children}
      </div>
    );
  }
);

/* -------------------------------- Orb ---------------------------------- */

function DefaultOrb() {
  // Soft gradient sphere. Pure CSS so we don't ship an image.
  return <span className="zui-aigreet__orb-default" aria-hidden />;
}

/* ------------------------------ Cards row ------------------------------ */

interface CardsProps extends HTMLAttributes<HTMLDivElement> {}

function Cards({ className, children, ...rest }: CardsProps) {
  return (
    <div className={cn('zui-aigreet__cards', className)} {...rest}>
      {children}
    </div>
  );
}

/* ------------------------------- Card ---------------------------------- */

export type AIGreetingCardVariant = 'dark' | 'panel' | 'prompt';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AIGreetingCardVariant;
  /** Top-left avatar / avatar fallback letter. */
  avatar?: ReactNode;
  /** Top-right small pill, eg. "Data Assistant". */
  badge?: ReactNode;
  /** Footer text, eg. "Suggested prompt". */
  footer?: ReactNode;
  /** Footer right-side action, eg. "View All". */
  footerAction?: ReactNode;
}

function Card({
  variant = 'panel',
  avatar,
  badge,
  footer,
  footerAction,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      data-variant={variant}
      className={cn('zui-aigreet__card', `zui-aigreet__card--${variant}`, className)}
      {...rest}
    >
      {(avatar || badge) && (
        <div className="zui-aigreet__card-head">
          {avatar && <div className="zui-aigreet__card-avatar">{avatar}</div>}
          {badge && <div className="zui-aigreet__card-badge">{badge}</div>}
        </div>
      )}

      <div className="zui-aigreet__card-body">{children}</div>

      {(footer || footerAction) && (
        <div className="zui-aigreet__card-footer">
          <span>{footer}</span>
          {footerAction && (
            <span className="zui-aigreet__card-footer-action">{footerAction}</span>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Pills row ------------------------------ */

interface PillsProps extends HTMLAttributes<HTMLDivElement> {}

function Pills({ className, children, ...rest }: PillsProps) {
  return (
    <div className={cn('zui-aigreet__pills', className)} {...rest}>
      {children}
    </div>
  );
}

/* -------------------------------- Pill -------------------------------- */

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  /** Tailwind / inline color hint for the icon block. */
  tone?: 'pink' | 'blue' | 'amber' | 'teal' | 'violet' | 'gray';
}

const TONE_CLASS: Record<NonNullable<PillProps['tone']>, string> = {
  pink:   'zui-aigreet__pill-icon--pink',
  blue:   'zui-aigreet__pill-icon--blue',
  amber:  'zui-aigreet__pill-icon--amber',
  teal:   'zui-aigreet__pill-icon--teal',
  violet: 'zui-aigreet__pill-icon--violet',
  gray:   'zui-aigreet__pill-icon--gray',
};

function Pill({ icon, tone = 'gray', className, children, ...rest }: PillProps) {
  return (
    <button type="button" className={cn('zui-aigreet__pill', className)} {...rest}>
      {icon && (
        <span className={cn('zui-aigreet__pill-icon', TONE_CLASS[tone])}>
          {icon}
        </span>
      )}
      <span className="zui-aigreet__pill-label">{children}</span>
    </button>
  );
}

/* ----------------------------- Compound export ----------------------------- */

const AIGreeting = AIGreetingRoot as AIGreetingComp;
AIGreeting.Cards = Cards;
AIGreeting.Card = Card;
AIGreeting.Pills = Pills;
AIGreeting.Pill = Pill;

export { AIGreeting };
