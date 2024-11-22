
const Page = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

  const exerciseSlug = (await params).slug;

  return (
    <main>
      <h2>Individual Exercise Page</h2>
      <p>Exercise Slug: {exerciseSlug}</p>
    </main>
  )
}

export default Page;