import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { logo } from "@/lib/recipes";

interface DovetailMarkProps extends ComponentProps<"svg"> {
  /** Width and height in pixels. */
  size?: number;
  /** Accessible name. */
  title?: string;
}

/** The monogram: a dovetail joint, ink tail and hatched orange pin. */
function DovetailMark({
  size = 34,
  title = "Dovetail joint",
  ...props
}: DovetailMarkProps) {
  const hatchId = `dt-hatch-${useId().replace(/:/g, "")}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
      data-slot="dovetail-mark"
      {...props}
    >
      <defs>
        <pattern
          id={hatchId}
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="4"
            className="stroke-pen"
            strokeWidth="1.2"
          />
        </pattern>
      </defs>
      <path d="M0 0H24V18L36 12V36L24 30V48H0Z" className="fill-ink" />
      <path
        data-pin
        className="stroke-pen"
        d="M24.9 0.9H47.1V47.1H24.9V30.6L36.9 36.6V11.4L24.9 17.4Z"
        fill={`url(#${hatchId})`}
        strokeWidth="1.8"
      />
    </svg>
  );
}

interface LogoProps extends ComponentProps<"a"> {
  name: ReactNode;
  subtitle?: ReactNode;
}

/** Monogram + mono name block. The pin slides out on hover. */
function Logo({ className, name, subtitle, ...props }: LogoProps) {
  return (
    <a data-slot="logo" className={cn(logo.base, className)} {...props}>
      <DovetailMark aria-hidden />
      <span className={logo.slots.text}>
        {name}
        {subtitle == null ? null : (
          <span className={logo.slots.sub}>{subtitle}</span>
        )}
      </span>
    </a>
  );
}

export { DovetailMark, Logo };
export type { DovetailMarkProps, LogoProps };
