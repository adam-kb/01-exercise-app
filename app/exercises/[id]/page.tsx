// import { notFound } from "next/navigation";

const Page = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {

  const exerciseId = (await params).id;

  // const exercise = await someQueryToGetExerciseById(exerciseId)  

  // if(!exercise) {
  //   notFound();
  // }

  return (
    <main>
      <h2>Individual Exercise Page</h2>
      <p>Exercise ID: {exerciseId}</p>
    </main>
  )
}

export default Page;