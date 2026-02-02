import * as React from "react";

export function GalleryVerticalEndIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M7 2h10M5 6h14" />
      <rect
        width="18"
        height="12"
        x="3"
        y="10"
        rx="2"
      />
    </svg>
  );
}
