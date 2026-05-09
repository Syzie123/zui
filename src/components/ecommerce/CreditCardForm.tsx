import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { cn } from '../../utils/cn';
import {
  type EcommerceVariant,
  shellByVariant,
  inputByVariant,
  ctaByVariant,
} from './variant';

export interface CreditCardFormProps {
  variant?: EcommerceVariant;
  /** Title shown at the top. */
  title?: string;
  /** Submit button label (e.g. "Pay $10.99"). */
  submitLabel?: string;
  onSubmit?: (values: {
    name: string;
    number: string;
    expiry: string;
    cvc: string;
  }) => void;
  className?: string;
}

const formatCardNumber = (raw: string) =>
  raw
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ');

const formatExpiry = (raw: string) => {
  const d = raw.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

export function CreditCardForm({
  variant = 'rounded',
  title = 'Payment Method',
  submitLabel = 'Pay',
  onSubmit,
  className,
}: CreditCardFormProps) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.({ name, number, expiry, cvc });
      }}
      className={cn(
        'flex w-full max-w-md flex-col gap-4 p-5 sm:p-6',
        shellByVariant[variant],
        className
      )}
    >
      <div className="flex items-center gap-2">
        <CreditCard className="size-4 text-[var(--color-fg-muted)]" />
        <h3 className="font-display text-base font-semibold tracking-[-0.01em]">
          {title}
        </h3>
      </div>

      <Field label="Name on card" htmlFor="cc-name">
        <input
          id="cc-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Smith"
          autoComplete="cc-name"
          className={cn(inputClass(variant))}
        />
      </Field>

      <Field label="Card number" htmlFor="cc-num">
        <input
          id="cc-num"
          value={number}
          onChange={(e) => setNumber(formatCardNumber(e.target.value))}
          placeholder="1234 5678 9012 3456"
          inputMode="numeric"
          autoComplete="cc-number"
          className={cn(inputClass(variant), 'tabular-nums')}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Expiry" htmlFor="cc-exp">
          <input
            id="cc-exp"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            placeholder="MM/YY"
            inputMode="numeric"
            autoComplete="cc-exp"
            className={cn(inputClass(variant), 'tabular-nums')}
          />
        </Field>
        <Field label="CVC" htmlFor="cc-cvc">
          <input
            id="cc-cvc"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="123"
            inputMode="numeric"
            autoComplete="cc-csc"
            className={cn(inputClass(variant), 'tabular-nums')}
          />
        </Field>
      </div>

      <button
        type="submit"
        className={cn(
          'mt-2 inline-flex h-12 items-center justify-center px-5 text-sm font-semibold',
          'transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]',
          ctaByVariant[variant]
        )}
      >
        {submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-[12px] font-medium text-[var(--color-fg-muted)]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function inputClass(variant: EcommerceVariant) {
  return cn(
    'block w-full px-3 py-2.5 text-sm outline-none',
    'transition-colors',
    'placeholder:text-[var(--color-fg-subtle)]',
    inputByVariant[variant],
    variant === 'material'
      ? 'focus:border-[oklch(54%_0.22_265)] focus:shadow-[0_0_0_2px_oklch(54%_0.22_265/0.18)]'
      : 'focus:border-[var(--color-fg-base)]'
  );
}
