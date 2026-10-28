import { NavWidget } from "@features/navigation/presentation/components/NavWidget";

export function ContactScreen() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 text-center">
      <span
        aria-hidden="true"
        className="beacon h-2.5 w-2.5 rounded-full bg-brand"
      />
      <h1 className="font-heading text-[clamp(2.5rem,10vw,7rem)] font-bold leading-[1] tracking-[-0.02em] text-content-strong">
        Contact
      </h1>
      <p className="max-w-[52ch] font-body text-[15px] leading-[1.5555] text-content-tertiary">
        Reach out soon — I am not sharing contact details here yet. Check back
        later, or follow the links in the navigation once they are published.
      </p>
      <div className="flex justify-center">
        <NavWidget />
      </div>
    </main>
  );
}
