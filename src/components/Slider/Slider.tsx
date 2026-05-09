import { forwardRef } from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { cn } from '../../utils/cn';

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof RadixSlider.Root> {}

export const Slider = forwardRef<
  React.ElementRef<typeof RadixSlider.Root>,
  SliderProps
>(function Slider({ className, defaultValue = [50], ...rest }, ref) {
  // Render thumbs based on the current value array length
  const length = Array.isArray(rest.value)
    ? rest.value.length
    : Array.isArray(defaultValue)
      ? defaultValue.length
      : 1;

  return (
    <RadixSlider.Root
      ref={ref}
      defaultValue={defaultValue}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2 data-[orientation=vertical]:flex-col',
        className
      )}
      {...rest}
    >
      <RadixSlider.Track
        className={cn(
          'relative grow overflow-hidden rounded-full',
          'bg-[var(--color-bg-muted)]',
          'h-1.5 w-full',
          'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5'
        )}
      >
        <RadixSlider.Range
          className={cn(
            'absolute h-full rounded-full bg-[var(--color-accent-base)]',
            'data-[orientation=vertical]:w-full'
          )}
        />
      </RadixSlider.Track>
      {Array.from({ length }, (_, i) => (
        <RadixSlider.Thumb
          key={i}
          aria-label={`Slider thumb ${i + 1}`}
          className={cn(
            'block size-4 rounded-full',
            'bg-white border-2 border-[var(--color-accent-base)]',
            'shadow-[0_1px_3px_rgb(0_0_0_/_0.18)]',
            'cursor-grab active:cursor-grabbing',
            'transition-[transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)]',
            'hover:scale-110',
            'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus),0_1px_3px_rgb(0_0_0_/_0.18)]',
            'disabled:opacity-50 disabled:pointer-events-none'
          )}
        />
      ))}
    </RadixSlider.Root>
  );
});
