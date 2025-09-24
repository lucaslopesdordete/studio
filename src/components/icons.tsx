import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <g fill="hsl(var(--foreground))">
        <path d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20zm0-3c-9.389 0-17-7.611-17-17S10.611 3 20 3s17 7.611 17 17-7.611 17-17 17z"></path>
        <path d="M12.972 17.028l14.056-5.412-5.412 14.056-14.056 5.412 5.412-14.056z"></path>
      </g>
    </svg>
  );
}
