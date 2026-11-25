"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";
import {
  button,
  caption,
  codeBlock,
  composer,
  kbd,
  message,
  permission,
  spinner,
  thinking,
  toolCall,
  toolGroup,
  transcript,
  working,
} from "@/lib/recipes";

/*
 * Agent kit: interfaces between people and AI agents. Presentational only:
 * bring your own state (Claude Agent SDK, AI SDK, anything) and map it here.
 */

const buttonVariants = cva(button.base, {
  variants: button.variants,
  defaultVariants: button.defaultVariants,
});
const captionVariants = cva(caption.base, {
  variants: caption.variants,
  defaultVariants: caption.defaultVariants,
});

/** Vertical stack of transcript entries. */
function Transcript({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      role="log"
      aria-live="polite"
      data-slot="transcript"
      className={cn(transcript.base, className)}
      {...props}
    />
  );
}

interface MessageProps extends Omit<ComponentProps<"div">, "role"> {
  /** user = ink block on the right; assistant = prose with a hairline; system = centred mono note. */
  role: "user" | "assistant" | "system";
  /** Mono caption above: a name, a time. */
  meta?: ReactNode;
  /** Shows a blinking orange caret at the end while text arrives. */
  streaming?: boolean;
}

/** One turn of the conversation. Render markdown inside with <Prose>. */
function Message({
  className,
  role,
  meta,
  streaming = false,
  children,
  ...props
}: MessageProps) {
  return (
    <div
      data-slot="message"
      data-role={role}
      className={cn(message.base, className)}
      {...props}
    >
      {meta == null ? null : (
        <div className={message.slots.meta}>
          <span className={captionVariants()}>{meta}</span>
        </div>
      )}
      <div className={message.slots.body}>
        {children}
        {streaming ? (
          <span aria-hidden className={message.slots.caret} />
        ) : null}
      </div>
    </div>
  );
}

type ToolStatus = "pending" | "running" | "done" | "error";

const TOOL_GLYPH: Record<Exclude<ToolStatus, "running">, string> = {
  pending: "○",
  done: "✓",
  error: "✕",
};

interface ToolCallProps extends Omit<ComponentProps<"div">, "children"> {
  /** Tool name: "Read", "Bash", "Edit". */
  name: ReactNode;
  /** What it acts on: a path, a command, a URL. Truncated with an ellipsis. */
  target?: ReactNode;
  status?: ToolStatus;
  /** Right-aligned mono detail: duration, "+12 −3", exit code. */
  meta?: ReactNode;
  /** Result shown when expanded. Without it the row does not expand. */
  output?: ReactNode;
  defaultOpen?: boolean;
}

/** One tool call as a single row; click to see its output. Stack several in a <ToolGroup>. */
function ToolCall({
  className,
  name,
  target,
  status = "done",
  meta,
  output,
  defaultOpen = false,
  ...props
}: ToolCallProps) {
  const row = (
    <>
      <span aria-label={status} className={toolCall.slots.icon}>
        {status === "running" ? (
          <span className={cn(spinner.base, "size-3")} />
        ) : (
          TOOL_GLYPH[status]
        )}
      </span>
      <span className={toolCall.slots.name}>{name}</span>
      <span className={toolCall.slots.target}>{target}</span>
      <span className={toolCall.slots.meta}>{meta}</span>
    </>
  );
  const shared = {
    "data-slot": "tool-call",
    "data-status": status,
    className: cn(toolCall.base, className),
  };

  if (output === undefined) {
    return (
      <div {...shared} {...props}>
        <div className={toolCall.slots.row}>{row}</div>
      </div>
    );
  }
  return (
    <details {...shared} open={defaultOpen}>
      <summary className={toolCall.slots.row}>{row}</summary>
      <pre className={toolCall.slots.output}>{output}</pre>
    </details>
  );
}

/** Tool calls stacked as one block, joined by hairlines. */
function ToolGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="tool-group"
      className={cn(toolGroup.base, className)}
      {...props}
    />
  );
}

interface ThinkingProps extends ComponentProps<"details"> {
  /** Summary text. */
  label?: ReactNode;
  /** "12s". */
  duration?: ReactNode;
}

/** The model's reasoning, folded by default, in pencil grey. */
function Thinking({
  className,
  label = "Thinking",
  duration,
  children,
  ...props
}: ThinkingProps) {
  return (
    <details
      data-slot="thinking"
      className={cn(thinking.base, className)}
      {...props}
    >
      <summary className={thinking.slots.summary}>
        {label}
        {duration == null ? null : <span>· {duration}</span>}
      </summary>
      <div className={thinking.slots.body}>{children}</div>
    </details>
  );
}

interface WorkIndicatorProps extends Omit<ComponentProps<"div">, "title"> {
  /** What the agent is doing, in a few words: "Reading files". */
  title: ReactNode;
  detail?: ReactNode;
}

/** Spinner + what is happening, while the agent works. */
function WorkIndicator({
  className,
  title,
  detail,
  ...props
}: WorkIndicatorProps) {
  return (
    <div
      role="status"
      data-slot="work-indicator"
      className={cn(working.base, className)}
      {...props}
    >
      <span aria-hidden className={cn(spinner.base, "size-3.5")} />
      <span className={working.slots.title}>{title}</span>
      {detail == null ? null : (
        <span className={working.slots.detail}>{detail}</span>
      )}
    </div>
  );
}

interface PermissionRequestProps extends Omit<ComponentProps<"div">, "title"> {
  /** What the agent wants to do: "Run a command", "Edit 3 files". */
  title: ReactNode;
  /** The exact command, diff summary or URL. Shown in mono. */
  detail?: ReactNode;
  /** Why, in the agent's words. */
  reason?: ReactNode;
  onAllow?: () => void;
  onAllowAlways?: () => void;
  onDeny?: () => void;
  /** After the human answered: replaces the buttons with the verdict. */
  resolved?: "allowed" | "denied";
}

/** The human-in-the-loop moment: an orange-framed request with Deny / Always / Allow once. */
function PermissionRequest({
  className,
  title,
  detail,
  reason,
  onAllow,
  onAllowAlways,
  onDeny,
  resolved,
  children,
  ...props
}: PermissionRequestProps) {
  const isResolved = resolved !== undefined;
  const verdict = resolved === "allowed" ? "Allowed ✓" : "Denied ✕";

  return (
    <div
      role="group"
      aria-label="Permission request"
      data-slot="permission-request"
      data-resolved={isResolved ? resolved : undefined}
      className={cn(permission.base, className)}
      {...props}
    >
      <div className={permission.slots.head}>
        <span
          className={captionVariants({ tone: isResolved ? "grey" : "accent" })}
        >
          Human in the loop
        </span>
        {isResolved ? (
          <span
            className={captionVariants({
              tone: resolved === "allowed" ? "ink" : "grey",
            })}
          >
            {verdict}
          </span>
        ) : null}
      </div>
      <div className={permission.slots.body}>
        <strong className="font-semibold">{title}</strong>
        {detail == null ? null : <pre className={codeBlock.base}>{detail}</pre>}
        {reason == null ? null : (
          <span className="text-sm text-grey">{reason}</span>
        )}
        {children}
      </div>
      {isResolved ? null : (
        <div className={permission.slots.actions}>
          {onDeny === undefined ? null : (
            <button
              type="button"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
              onClick={onDeny}
            >
              Deny
            </button>
          )}
          {onAllowAlways === undefined ? null : (
            <button
              type="button"
              className={buttonVariants({ variant: "outline", size: "sm" })}
              onClick={onAllowAlways}
            >
              Always allow
            </button>
          )}
          {onAllow === undefined ? null : (
            <button
              type="button"
              className={buttonVariants({ variant: "accent", size: "sm" })}
              onClick={onAllow}
            >
              Allow once
            </button>
          )}
        </div>
      )}
    </div>
  );
}

interface ComposerProps extends Omit<
  ComponentProps<"form">,
  "onSubmit" | "onChange"
> {
  onSend: (text: string) => void;
  /** The agent is working: the send button becomes Stop. */
  working?: boolean;
  onStop?: () => void;
  placeholder?: string;
  disabled?: boolean;
  /** Controlled text. */
  value?: string;
  onValueChange?: (value: string) => void;
  /** Left side of the bar: model picker, attach button, mode toggle… */
  tools?: ReactNode;
}

/** Prompt box: Enter sends, Shift+Enter adds a line, grows with its content. */
function Composer({
  className,
  onSend,
  working: isWorking = false,
  onStop,
  placeholder = "Ask, or describe a task…",
  disabled = false,
  value,
  onValueChange,
  tools,
  ...props
}: ComposerProps) {
  const [uncontrolled, setUncontrolled] = useState("");
  const text = value ?? uncontrolled;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isEmpty = text.trim() === "";

  // Grow with the content where `field-sizing: content` is not supported.
  useEffect(() => {
    const input = inputRef.current;
    if (input === null || CSS.supports("field-sizing", "content")) {
      return;
    }
    input.style.height = "auto";
    input.style.height = `${Math.min(input.scrollHeight, 240)}px`;
  }, [text]);

  function setText(next: string) {
    if (value === undefined) {
      setUncontrolled(next);
    }
    onValueChange?.(next);
  }

  function send() {
    if (isEmpty || disabled || isWorking) {
      return;
    }
    onSend(text.trim());
    setText("");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    send();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    const isPlainEnter =
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing;
    if (!isPlainEnter) {
      return;
    }
    event.preventDefault();
    send();
  }

  return (
    <form
      data-slot="composer"
      className={cn(composer.base, className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <textarea
        ref={inputRef}
        aria-label="Message"
        className={composer.slots.input}
        placeholder={placeholder}
        value={text}
        rows={1}
        disabled={disabled}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={composer.slots.bar}>
        <div className={composer.slots.tools}>{tools}</div>
        <span className={composer.slots.hint}>
          <kbd className={kbd.base}>⏎</kbd> send ·{" "}
          <kbd className={kbd.base}>⇧</kbd> <kbd className={kbd.base}>⏎</kbd>{" "}
          new line
        </span>
        {isWorking ? (
          <button
            type="button"
            className={buttonVariants({ size: "sm" })}
            disabled={onStop === undefined}
            onClick={onStop}
          >
            ■ Stop
          </button>
        ) : (
          <button
            type="submit"
            className={buttonVariants({ variant: "accent", size: "sm" })}
            disabled={disabled || isEmpty}
          >
            Send →
          </button>
        )}
      </div>
    </form>
  );
}

export {
  Composer,
  Message,
  PermissionRequest,
  Thinking,
  ToolCall,
  ToolGroup,
  Transcript,
  WorkIndicator,
};
export type {
  ComposerProps,
  MessageProps,
  PermissionRequestProps,
  ThinkingProps,
  ToolCallProps,
  WorkIndicatorProps,
};
