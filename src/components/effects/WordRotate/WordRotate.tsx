import { useEffect, useState } from 'react';
import { cn } from '../../../utils/cn';
import './WordRotate.css';

export interface WordRotateProps {
  /** Words to cycle through. */
  words: string[];
  /** Milliseconds per word. */
  duration?: number;
  className?: string;
}

/**
 * Vertical rotator for a single word. Each word slides up as the previous one
 * exits. Pure CSS animation on `transform: translateY` + `opacity` — no
 * external animation library, no React.startTransition.
 */
export function WordRotate({
  words,
  duration = 2500,
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, duration);
    return () => clearInterval(id);
  }, [words.length, duration]);

  return (
    <span className={cn('zui-word-rotate', className)}>
      <span key={index} className="zui-word-rotate__word">
        {words[index]}
      </span>
    </span>
  );
}
