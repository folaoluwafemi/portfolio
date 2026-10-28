/**
 * Inline renderings of the original Flutter vector assets so they can be
 * tinted with the current text color. Both are decorative.
 */

export function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.50195 13.5007L11.3333 4.66675"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66663 4.66675H11.3333V11.3334"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="48"
      height="49"
      viewBox="0 0 48 49"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M24.3164 40.1168L24.3164 8.11719"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M13 28.7949C18.8195 28.7949 24.3201 33.9199 24.3201 40.1149"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M35.6403 28.7949C29.8209 28.7949 24.3203 33.9199 24.3203 40.1149"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
