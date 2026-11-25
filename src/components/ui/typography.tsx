import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import {
  caption,
  code,
  codeBlock,
  display,
  heading,
  kbd,
  link,
  mark,
  prose,
  text,
} from "@/lib/recipes";

const captionVariants = cva(caption.base, {
  variants: caption.variants,
  defaultVariants: caption.defaultVariants,
});
const headingVariants = cva(heading.base, {
  variants: heading.variants,
  defaultVariants: heading.defaultVariants,
});
const textVariants = cva(text.base, {
  variants: text.variants,
  defaultVariants: text.defaultVariants,
});
const linkVariants = cva(link.base, {
  variants: link.variants,
  defaultVariants: link.defaultVariants,
});

interface CaptionProps
  extends ComponentProps<"span">, VariantProps<typeof captionVariants> {}

/** The small mono caption that labels every value, column and section. */
function Caption({ className, tone, ...props }: CaptionProps) {
  return (
    <span
      data-slot="caption"
      className={cn(captionVariants({ tone }), className)}
      {...props}
    />
  );
}

/** The name on the sheet: Archivo Black, wide. At most one per screen. */
function Display({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      data-slot="display"
      className={cn(display.base, className)}
      {...props}
    />
  );
}

interface HeadingProps extends ComponentProps<"h2"> {
  /** Visual and semantic level. */
  level?: 1 | 2 | 3 | 4;
}

function Heading({ className, level = 2, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag
      data-slot="heading"
      className={cn(headingVariants({ level: `${level}` }), className)}
      {...props}
    />
  );
}

interface TextProps
  extends ComponentProps<"p">, VariantProps<typeof textVariants> {}

function Text({ className, size, tone, ...props }: TextProps) {
  return (
    <p
      data-slot="text"
      className={cn(textVariants({ size, tone }), className)}
      {...props}
    />
  );
}

/** Emphasis: hatching under the words, never italics or coloured text. */
function Mark({ className, ...props }: ComponentProps<"mark">) {
  return (
    <mark data-slot="mark" className={cn(mark.base, className)} {...props} />
  );
}

function Code({ className, ...props }: ComponentProps<"code">) {
  return (
    <code data-slot="code" className={cn(code.base, className)} {...props} />
  );
}

function CodeBlock({ className, ...props }: ComponentProps<"pre">) {
  return (
    <pre
      data-slot="code-block"
      className={cn(codeBlock.base, className)}
      {...props}
    />
  );
}

function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return <kbd data-slot="kbd" className={cn(kbd.base, className)} {...props} />;
}

/** Wraps rendered long-form content (markdown output) and styles its tags. */
function Prose({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="prose" className={cn(prose.base, className)} {...props} />
  );
}

interface LinkProps
  extends ComponentProps<"a">, VariantProps<typeof linkVariants> {}

function Link({ className, variant, ...props }: LinkProps) {
  return (
    <a
      data-slot="link"
      className={cn(linkVariants({ variant }), className)}
      {...props}
    />
  );
}

export {
  Caption,
  Code,
  CodeBlock,
  Display,
  Heading,
  Kbd,
  Link,
  Mark,
  Prose,
  Text,
  linkVariants,
};
export type { CaptionProps, HeadingProps, LinkProps, TextProps };
