import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { banner } from "@/lib/recipes";

const bannerVariants = cva(banner.base, {
  variants: banner.variants,
  defaultVariants: banner.defaultVariants,
});

interface BannerProps
  extends ComponentProps<"div">, VariantProps<typeof bannerVariants> {
  /** Mono caption before the text: "Notice", "Rev C". */
  label?: ReactNode;
  /** A button or link after the text. */
  action?: ReactNode;
  /** Shows a × that calls this. */
  onDismiss?: () => void;
}

/** A strip across the top of the app or of a sheet. */
function Banner({
  className,
  variant,
  label,
  action,
  onDismiss,
  children,
  ...props
}: BannerProps) {
  return (
    <div
      role="status"
      data-slot="banner"
      className={cn(bannerVariants({ variant }), className)}
      {...props}
    >
      {label == null ? null : (
        <span className={banner.slots.label}>{label}</span>
      )}
      <span className={banner.slots.text}>{children}</span>
      {action}
      {onDismiss === undefined ? null : (
        <button
          type="button"
          aria-label="Dismiss"
          className={banner.slots.close}
          onClick={onDismiss}
        >
          ×
        </button>
      )}
    </div>
  );
}

export { Banner };
export type { BannerProps };
