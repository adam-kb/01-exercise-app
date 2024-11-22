
const Page = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {

  const exerciseId = (await params).id;


  return (
    <main>
      <h2>Individual Exercise Page</h2>
      <p>Exercise ID: {exerciseId}</p>
    </main>
  )
}

export default Page;