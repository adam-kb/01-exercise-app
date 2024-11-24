import { isValidExercise } from "@/app/lib/utils";
import Exercise from "@/app/ui/exercises/Exercise";
import { notFound } from "next/navigation";

const Page = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

  const exerciseSlug = (await params).slug;

  const slugExists = await isValidExercise({slug: exerciseSlug});

  if (!slugExists) {
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
