import Image from "next/image";
import clsx from "clsx";

/**
 * 3D icons from 3dicons.co (CC0), clay renders tinted to the AVIGENT palette
 * by scripts/tint-icons.mjs. Decorative — always paired with visible text.
 */
export type Icon3DName =
  | "battery"
  | "bulb"
  | "chat"
  | "flash"
  | "mail"
  | "map-pin"
  | "medal"
  | "phone-ringing"
  | "rocket"
  | "setting"
  | "shield"
  | "sun"
  | "target"
  | "tick"
  | "tool";

export type Icon3DTone = "brand" | "volt" | "navy" | "white";

export function Icon3D({
  name,
  tone = "brand",
  size = 64,
  className,
}: {
  name: Icon3DName;
  tone?: Icon3DTone;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={`/icons3d/${name}-${tone}.webp`}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      sizes={`${size}px`}
      quality={80}
      draggable={false}
      className={clsx("pointer-events-none select-none drop-shadow-[0_10px_18px_rgba(4,9,21,0.28)]", className)}
    />
  );
}
