import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-heading text-[clamp(6rem,20vw,14rem)] font-bold leading-none tracking-[-0.03em] text-content-strong">
        404
      </p>
      <h1 className="font-body text-lg font-medium text-content-secondary">
        This page could not be found.
      </h1>
      <Link
        href="/"
        className="rounded-full bg-content-strong px-5 py-2.5 font-body text-[15px] font-bold leading-[20px] text-surface-primary transition duration-150 ease-out hover:opacity-90 active:scale-[0.96]"
      >
        Go back home
      </Link>
    </main>
  );
}
