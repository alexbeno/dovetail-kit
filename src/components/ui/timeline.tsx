import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { timeline } from "@/lib/recipes";

function Timeline({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      data-slot="timeline"
      className={cn(timeline.base, className)}
      {...props}
    />
  );
}

interface TimelineItemProps extends Omit<ComponentProps<"li">, "title"> {
  title: ReactNode;
  /** Mono detail on the right: a time, a duration. */
  time?: ReactNode;
  /** done = ink outline; active pulses in orange; pending is dashed grey. */
  status?: "done" | "success" | "danger" | "active" | "pending";
}

function TimelineItem({
  className,
  title,
  time,
  status = "done",
  children,
  ...props
}: TimelineItemProps) {
  return (
    <li
      data-slot="timeline-item"
      data-status={status}
      className={cn(timeline.slots.item, className)}
      {...props}
    >
      <span aria-hidden className={timeline.slots.marker} />
      <span className={timeline.slots.title}>{title}</span>
      <span className={timeline.slots.time}>{time}</span>
      {children == null ? null : (
        <div className={timeline.slots.body}>{children}</div>
      )}
    </li>
  );
}

export { Timeline, TimelineItem };
export type { TimelineItemProps };
