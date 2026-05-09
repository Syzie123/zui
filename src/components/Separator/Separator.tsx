import { forwardRef } from 'react';
import * as RadixSeparator from '@radix-ui/react-separator';
import { cn } from '../../utils/cn';

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof RadixSeparator.Root> {}

export const Separator = forwardRef<
  React.ElementRef<typeof RadixSeparator.Root>,
  SeparatorProps
>(function Separator(
  { className, orientation = 'horizontal', decorative = true, ...rest },
  ref
) {
  return (
    <RadixSeparator.Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={cn(
        'shrink-0 bg-[var(--color-border-base)]',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
      {...rest}
    />
  );
});
