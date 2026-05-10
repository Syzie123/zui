import {
  forwardRef,
  useRef,
  useState,
  type DragEvent,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import {
  FileText,
  Image as ImageIcon,
  Link2,
  Layers,
  Mic,
  Upload,
  X,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import './AIDropzone.css';

/* -------------------------------- Types -------------------------------- */

export type AIDropzoneFileKind = 'image' | 'pdf' | 'audio' | 'doc' | 'link';

export interface AIDropzonePreview {
  /** Display label / file name. */
  name: string;
  /** Icon hint for the preview tile. Falls back to a doc icon. */
  kind?: AIDropzoneFileKind;
  /** Optional preview image URL — shown when kind="image". */
  src?: string;
  /** Currently being dragged from the user's OS — adds a hand cursor. */
  dragging?: boolean;
  onRemove?: () => void;
}

export interface AIDropzoneAction {
  id?: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export interface AIDropzoneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Big headline. */
  title?: ReactNode;
  /** Smaller line under the headline. */
  subtitle?: ReactNode;
  /** Theme override. */
  appearance?: 'light' | 'dark';
  /** Quick-action buttons in the middle row. Defaults to upload / mic / link / batch. */
  actions?: AIDropzoneAction[] | null;
  /** Preview tile pinned at the bottom right. */
  preview?: AIDropzonePreview;
  /** Fires when the user drops files. */
  onFiles?: (files: File[]) => void;
  /** Limit accepted MIME types (passed straight through to the input). */
  accept?: string;
  /** Allow multiple files at once. */
  multiple?: boolean;
}

/* ----------------------------- Component ----------------------------- */

const DEFAULT_ACTIONS: AIDropzoneAction[] = [
  { id: 'upload', icon: <Upload className="size-4" />, label: 'Upload' },
  { id: 'mic',    icon: <Mic className="size-4" />,    label: 'Record' },
  { id: 'link',   icon: <Link2 className="size-4" />,  label: 'Add link' },
  { id: 'batch',  icon: <Layers className="size-4" />, label: 'Batch' },
];

/**
 * AI dropzone — dashed border, big "Drop anything here or browse" prompt, four
 * quick-action buttons in the middle, and an optional file preview tile.
 *
 * Accepts both real drag-drop (via onFiles) and a "dragging" preview that you
 * pre-populate in your own state to show what's in flight.
 */
export const AIDropzone = forwardRef<HTMLDivElement, AIDropzoneProps>(
  function AIDropzone(
    {
      title = 'Drop anything here or browse',
      subtitle = 'Docs, images, videos, audio files, links & more',
      appearance,
      actions,
      preview,
      onFiles,
      accept,
      multiple = true,
      className,
      ...rest
    },
    ref
  ) {
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const acts = actions === null ? [] : actions ?? DEFAULT_ACTIONS;

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!dragging) setDragging(true);
    };
    const onDragLeave = () => setDragging(false);
    const onDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) onFiles?.(files);
    };

    const browse = () => inputRef.current?.click();

    return (
      <div
        ref={ref}
        data-appearance={appearance}
        data-dragging={dragging || undefined}
        className={cn('zui-aidrop', className)}
        {...rest}
      >
        <div
          className="zui-aidrop__zone"
          role="button"
          tabIndex={0}
          onClick={browse}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              browse();
            }
          }}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <input
            ref={inputRef}
            type="file"
            multiple={multiple}
            accept={accept}
            className="zui-aidrop__input"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              if (files.length > 0) onFiles?.(files);
              // reset so the same file can be picked again
              e.target.value = '';
            }}
          />

          <div className="zui-aidrop__title">{title}</div>
          {subtitle && <div className="zui-aidrop__subtitle">{subtitle}</div>}

          {acts.length > 0 && (
            <div className="zui-aidrop__actions">
              {acts.map((a, i) => (
                <button
                  key={a.id ?? i}
                  type="button"
                  className="zui-aidrop__action"
                  aria-label={a.label}
                  title={a.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    a.onClick?.();
                  }}
                >
                  {a.icon}
                </button>
              ))}
            </div>
          )}
        </div>

        {preview && <Preview {...preview} />}
      </div>
    );
  }
);

/* ----------------------------- Preview tile ----------------------------- */

function Preview({ name, kind = 'doc', src, dragging, onRemove }: AIDropzonePreview) {
  return (
    <div
      className={cn(
        'zui-aidrop__preview',
        dragging && 'zui-aidrop__preview--dragging'
      )}
    >
      <div className="zui-aidrop__preview-tile" data-kind={kind}>
        {kind === 'image' && src ? (
          <img src={src} alt={name} />
        ) : (
          <PreviewBadge kind={kind} />
        )}
        {onRemove && (
          <button
            type="button"
            className="zui-aidrop__preview-x"
            aria-label="Remove"
            onClick={onRemove}
          >
            <X className="size-3" />
          </button>
        )}
      </div>
      <div className="zui-aidrop__preview-name">{name}</div>
    </div>
  );
}

function PreviewBadge({ kind }: { kind: AIDropzoneFileKind }) {
  if (kind === 'image') {
    return (
      <div className="zui-aidrop__preview-glyph">
        <ImageIcon className="size-7" strokeWidth={1.6} />
      </div>
    );
  }
  if (kind === 'audio') {
    return (
      <div className="zui-aidrop__preview-glyph">
        <Mic className="size-7" strokeWidth={1.6} />
      </div>
    );
  }
  if (kind === 'link') {
    return (
      <div className="zui-aidrop__preview-glyph">
        <Link2 className="size-7" strokeWidth={1.6} />
      </div>
    );
  }
  // pdf + doc share the same icon, just different label
  return (
    <div className="zui-aidrop__preview-glyph zui-aidrop__preview-glyph--doc">
      <FileText className="size-7" strokeWidth={1.6} />
      <span className="zui-aidrop__preview-kind">
        {kind === 'pdf' ? 'PDF' : 'DOC'}
      </span>
    </div>
  );
}
