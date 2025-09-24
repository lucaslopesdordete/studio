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
      <path d="M14.9 9.1L9.1 14.9 7 12.8l5.8-5.8" fill="hsl(var(--primary))" stroke="none" />
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" stroke="hsl(var(--primary))" fill="none" />
    </svg>
  );
}
