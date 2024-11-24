import Exercise from "@/app/ui/exercises/Exercise";
import { notFound } from "next/navigation";

const Page = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

  const exerciseSlug = (await params).slug;

  if(!exerciseSlug) {
    notFound();
  }

  return (
    <main>
      <h2>Individual Exercise Page</h2>
      <Exercise slug={exerciseSlug} />
    </main>
  )
}

export default Page;
