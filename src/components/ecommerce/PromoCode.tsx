import { useState } from 'react';
import { Check, Tag } from 'lucide-react';
import { cn } from '../../utils/cn';
import {
  type EcommerceVariant,
  inputByVariant,
  ctaByVariant,
} from './variant';

export interface PromoCodeProps {
  variant?: EcommerceVariant;
  /** Resolves to true if code is accepted, false if rejected. */
  onApply?: (code: string) => boolean | Promise<boolean>;
  placeholder?: string;
  applyLabel?: string;
  className?: string;
}

export function PromoCode({
  variant = 'rounded',
  onApply,
  placeholder = 'Promo code',
  applyLabel = 'Apply',
  className,
}: PromoCodeProps) {
  const [code, setCode] = useState('');
  const [state, setState] = useState<'idle' | 'pending' | 'ok' | 'fail'>('idle');

  const apply = async () => {
    if (!code) return;
    setState('pending');
    try {
      const ok = (await onApply?.(code)) ?? true;
      setState(ok ? 'ok' : 'fail');
    } catch {
      setState('fail');
    }
  };

  return (
    <div
      className={cn(
        'flex w-full items-center gap-2 p-1',
        inputByVariant[variant],
        state === 'ok' && 'border-[var(--color-success)]',
        state === 'fail' && 'border-[var(--color-danger)]',
        className
      )}
    >
      <Tag className="ml-2 size-4 shrink-0 text-[var(--color-fg-subtle)]" />
      <input
        type="text"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          setState('idle');
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            apply();
          }
        }}
        placeholder={placeholder}
        className={cn(
          'min-w-0 flex-1 bg-transparent px-1 py-2 text-sm outline-none',
          'placeholder:text-[var(--color-fg-subtle)]',
          'tracking-wider uppercase'
        )}
      />
      <button
        type="button"
        onClick={apply}
        disabled={!code || state === 'pending'}
        className={cn(
          'shrink-0 inline-flex h-8 items-center gap-1 px-3 text-xs font-semibold uppercase tracking-wider',
          'transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]',
          ctaByVariant[variant],
          'disabled:opacity-40 disabled:cursor-not-allowed'
        )}
      >
        {state === 'ok' ? (
          <>
            <Check className="size-3.5" />
            Applied
          </>
        ) : (
          applyLabel
        )}
      </button>
    </div>
  );
}
