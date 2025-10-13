import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M9 22.9999V9.00005H13.44C14.8667 9.00005 16.0667 9.43338 17.04 10.3C18.0133 11.1667 18.5 12.3334 18.5 13.8C18.5 15.2667 18.0133 16.45 17.04 17.35C16.0667 18.25 14.8667 18.7 13.44 18.7H11.4V23H9ZM11.4 17H13.32C14.04 17 14.6 16.7834 15 16.35C15.4 15.9167 15.6 15.3 15.6 14.5C15.6 13.6334 15.3833 13.0167 14.95 12.65C14.5167 12.2834 13.9333 12.1 13.2 12.1H11.4V17Z"
        fill="white"
        className="dark:fill-primary-foreground"
      />
      <path
        d="M23 9.00006L19 23H21L22.5 17.65L24.225 23H25.75L27.25 17.65L29 23H31L27 9.00006H23Z"
        fill="hsl(var(--accent))"
      />
    </svg>
  );
}
