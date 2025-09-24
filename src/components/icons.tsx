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
      <path d="M3 7.2c.9.2 1.8.4 2.6.7C8.3 8.7 11.7 9 15 8.3c.8-.1 1.5-.3 2.3-.5" />
      <path d="M3 16.8c.9-.2 1.8-.4 2.6-.7 2.7-.8 6.1-.5 8.8.8.8.2 1.5.3 2.3.5" />
      <path d="M12 2v20" />
      <path d="M3 12h18" />
    </svg>
  );
}
