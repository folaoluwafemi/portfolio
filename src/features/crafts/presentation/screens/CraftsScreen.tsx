import { NavWidget } from "@features/navigation/presentation/components/NavWidget";

export function CraftsScreen() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 text-center">
      <span
        aria-hidden="true"
        className="beacon h-2.5 w-2.5 rounded-full bg-brand"
      />
      <h1 className="font-heading text-[clamp(2.5rem,10vw,7rem)] font-bold leading-[1] tracking-[-0.02em] text-content-strong">
        Craft
      </h1>
      <p className="max-w-[52ch] font-body text-[15px] leading-[1.5555] text-content-tertiary">
        A collection of craft experiments is on its way. This page will be
        updated with side projects, experiments, and explorations.
      </p>
      <div className="flex justify-center">
        <NavWidget />
      </div>
    </main>
  );
}
