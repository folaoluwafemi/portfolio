import { Hero } from "@features/hero/presentation/components/Hero";
import { WorkListings } from "@features/works/presentation/components/WorkListings";

export function HomeScreen() {
  return (
    <main>
      <Hero />
      <WorkListings />
    </main>
  );
}
