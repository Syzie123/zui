import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { cn } from '../../utils/cn';
import './AIMessage.css';

/* -------------------------------- Root --------------------------------- */

export interface AIMessageProps extends HTMLAttributes<HTMLDivElement> {
  /** Who sent the message — drives the alignment + color. */
  role: 'user' | 'assistant' | 'system';
  /** Avatar source — image URL or ReactNode. */
  avatar?: ReactNode;
  /** Top-right label, defaults to a capitalized role. */
  name?: ReactNode;
  /** Show name + avatar even when consecutive messages share a role. */
  showHeader?: boolean;
  /** Theme override. */
  appearance?: 'light' | 'dark';
  /** Message bubble visual: bubble (default), plain, panel. */
  variant?: 'bubble' | 'plain' | 'panel';
}

interface AIMessageComp
  extends React.ForwardRefExoticComponent<
    AIMessageProps & React.RefAttributes<HTMLDivElement>
  > {
  Reactions: typeof Reactions;
  Action: typeof Action;
}

const AIMessageRoot = forwardRef<HTMLDivElement, AIMessageProps>(
  function AIMessage(
    {
      role,
      avatar,
      name,
      showHeader = true,
      variant = 'bubble',
      appearance,
      className,
      children,
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        data-role={role}
        data-variant={variant}
        data-appearance={appearance}
        className={cn(
          'zui-aimsg',
          `zui-aimsg--${role}`,
          `zui-aimsg--${variant}`,
          className
        )}
        {...rest}
      >
        {showHeader && (avatar || name) && (
          <div className="zui-aimsg__head">
            {avatar && <div className="zui-aimsg__avatar">{avatar}</div>}
            {name && <span className="zui-aimsg__name">{name}</span>}
          </div>
        )}

        <div className="zui-aimsg__bubble">{children}</div>
      </div>
    );
  }
);

/* ------------------------------ Reactions ------------------------------ */

interface ReactionsProps extends HTMLAttributes<HTMLDivElement> {
  /** Liked / disliked state. */
  reaction?: 'like' | 'dislike' | null;
  onLike?: () => void;
  onDislike?: () => void;
}

function Reactions({
  reaction,
  onLike,
  onDislike,
  className,
  children,
  ...rest
}: ReactionsProps) {
  return (
    <div className={cn('zui-aimsg__reactions', className)} {...rest}>
      <button
        type="button"
        aria-label="Like"
        aria-pressed={reaction === 'like'}
        data-active={reaction === 'like' || undefined}
        onClick={onLike}
        className="zui-aimsg__react"
      >
        <ThumbsUp className="size-3.5" />
      </button>
      <button
        type="button"
        aria-label="Dislike"
        aria-pressed={reaction === 'dislike'}
        data-active={reaction === 'dislike' || undefined}
        onClick={onDislike}
        className="zui-aimsg__react"
      >
        <ThumbsDown className="size-3.5" />
      </button>
      {children}
    </div>
  );
}

/* -------------------------------- Action -------------------------------- */

interface ActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
}

function Action({ icon, className, children, ...rest }: ActionProps) {
  return (
    <button
      type="button"
      className={cn('zui-aimsg__react zui-aimsg__react--text', className)}
      {...rest}
    >
      {icon}
      {children && <span>{children}</span>}
    </button>
  );
}

const AIMessage = AIMessageRoot as AIMessageComp;
AIMessage.Reactions = Reactions;
AIMessage.Action = Action;

export { AIMessage };
