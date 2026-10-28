import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkBySlug, works } from "@features/works/domain/Works";
import { WorkDetailScreen } from "@features/works/presentation/screens/WorkDetailScreen";

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return { title: "Work not found" };
  return {
    title: work.name,
    description: work.industry,
  };
}

export default async function WorkPage({ params }: PageProps<"/works/[slug]">) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();
  return (
    <main>
      <WorkDetailScreen work={work} />
    </main>
  );
}
