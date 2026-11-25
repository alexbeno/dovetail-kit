"use client";

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { note, stamp, stampLayer } from "@/lib/recipes";

const stampVariants = cva(stamp.base, {
  variants: stamp.variants,
  defaultVariants: stamp.defaultVariants,
});
const noteVariants = cva(note.base, {
  variants: note.variants,
  defaultVariants: note.defaultVariants,
});

type StampTone = NonNullable<VariantProps<typeof stampVariants>["tone"]>;
type NoteTone = NonNullable<VariantProps<typeof noteVariants>["tone"]>;

interface StampOptions {
  tone?: StampTone;
  /** Milliseconds on screen. Default 2400. */
  duration?: number;
}

interface NoteOptions {
  title: ReactNode;
  description?: ReactNode;
  /** A button or link under the text. */
  action?: ReactNode;
  tone?: NoteTone;
  /** Milliseconds on screen. Default 5000; 0 keeps it until dismissed. */
  duration?: number;
}

interface StampEntry extends StampOptions {
  id: number;
  message: ReactNode;
}

interface NoteEntry extends NoteOptions {
  id: number;
}

interface StampContextValue {
  /** Slams a rubber stamp in the corner: one or two words, then it leaves. */
  stamp: (message: ReactNode, options?: StampOptions) => void;
  /** Pins a note with a title and a body. Returns a function that dismisses it. */
  notify: (options: NoteOptions) => () => void;
}

const MAX_STAMPS = 3;
const MAX_NOTES = 4;

const StampContext = createContext<StampContextValue | null>(null);

/** Provides `useStamp()`: Dovetail's toasts. Mount it once, around the app. */
function StampProvider({ children }: PropsWithChildren) {
  const [stamps, setStamps] = useState<StampEntry[]>([]);
  const [notes, setNotes] = useState<NoteEntry[]>([]);
  const counter = useRef(0);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
    };
  }, []);

  const later = useCallback((run: () => void, delay: number) => {
    const timer = setTimeout(() => {
      timers.current.delete(timer);
      run();
    }, delay);
    timers.current.add(timer);
  }, []);

  const dismissNote = useCallback((id: number) => {
    setNotes((current) => current.filter((entry) => entry.id !== id));
  }, []);

  const stampIt = useCallback<StampContextValue["stamp"]>(
    (message, options = {}) => {
      counter.current += 1;
      const id = counter.current;
      setStamps((current) => [
        ...current.slice(1 - MAX_STAMPS),
        { ...options, id, message },
      ]);
      later(() => {
        setStamps((current) => current.filter((entry) => entry.id !== id));
      }, options.duration ?? 2400);
    },
    [later],
  );

  const notify = useCallback<StampContextValue["notify"]>(
    (options) => {
      counter.current += 1;
      const id = counter.current;
      const duration = options.duration ?? 5000;
      setNotes((current) => [
        ...current.slice(1 - MAX_NOTES),
        { ...options, id },
      ]);
      if (duration > 0) {
        later(() => dismissNote(id), duration);
      }
      return () => dismissNote(id);
    },
    [dismissNote, later],
  );

  const value = useMemo(() => ({ stamp: stampIt, notify }), [stampIt, notify]);

  return (
    <StampContext value={value}>
      {children}
      <div aria-live="polite" className={stampLayer.base}>
        {stamps.map((entry) => (
          <span
            key={entry.id}
            className={stampVariants({ tone: entry.tone, animate: true })}
          >
            {entry.message}
          </span>
        ))}
      </div>
      <div
        role="region"
        aria-label="Notifications"
        aria-live="polite"
        className={note.slots.layer}
      >
        {notes.map((entry) => (
          <div
            key={entry.id}
            role="status"
            className={cn(noteVariants({ tone: entry.tone }))}
          >
            <div className={note.slots.title}>{entry.title}</div>
            <button
              type="button"
              aria-label="Dismiss"
              className={note.slots.close}
              onClick={() => dismissNote(entry.id)}
            >
              ×
            </button>
            {entry.description == null ? null : (
              <div className={note.slots.description}>{entry.description}</div>
            )}
            {entry.action == null ? null : (
              <div className={note.slots.action}>{entry.action}</div>
            )}
          </div>
        ))}
      </div>
    </StampContext>
  );
}

/** `const { stamp, notify } = useStamp()`. Needs a <StampProvider> above. */
function useStamp(): StampContextValue {
  const value = use(StampContext);
  if (value === null) {
    throw new Error("useStamp must be used inside <StampProvider>");
  }
  return value;
}

export { StampProvider, useStamp };
export type { NoteOptions, StampOptions };
