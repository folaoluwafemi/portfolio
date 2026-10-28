"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-heading text-[clamp(4rem,14vw,10rem)] font-bold leading-none tracking-[-0.03em] text-content-strong">
        ERROR
      </p>
      <h1 className="font-body text-lg font-medium text-content-secondary">
        Something went wrong.
      </h1>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-content-strong px-5 py-2.5 font-body text-[15px] font-bold leading-[20px] text-surface-primary transition duration-150 ease-out hover:opacity-90 active:scale-[0.96]"
      >
        Reload
      </button>
    </main>
  );
}
