"use client";

import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Avatar as AvatarPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { avatar } from "@/lib/recipes";

const avatarVariants = cva(avatar.base, {
  variants: avatar.variants,
  defaultVariants: avatar.defaultVariants,
});

interface AvatarProps
  extends
    ComponentProps<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

function Avatar({ className, shape, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ shape }), className)}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(avatar.slots.image, className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(avatar.slots.fallback, className)}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
export type { AvatarProps };
