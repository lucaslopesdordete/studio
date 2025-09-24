import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="hsl(var(--primary))" stroke="none" />
      <path
        d="M10.1 13.9L13.9 10.1l-1.4-1.4-3.8 3.8 1.4 1.4z"
        fill="hsl(var(--primary-foreground))"
        stroke="none"
      />
      <path
        d="M6.34 15.66A6.5 6.5 0 0 1 15.66 6.34"
        stroke="hsl(var(--primary-foreground))"
        fill="none"
        strokeWidth="1.5"
      />
      <path
        d="M8.34 17.66A6.5 6.5 0 0 0 17.66 8.34"
        stroke="hsl(var(--primary-foreground))"
        fill="none"
        strokeWidth="1.5"
      />
    </svg>
  );
}
