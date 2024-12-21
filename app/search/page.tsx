import { getQueryClient } from "../getQueryClient";
import { ExerciseWithRelations } from "../lib/definitions";
import { fetchSearchResults } from "../queries/useSearchResults";
import ExerciseLink from "../ui/exercises/ExerciseLink";

const SearchResultsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const searchQuery = (await searchParams).query;
  const queryClient = getQueryClient();

  const results: ExerciseWithRelations[] = await queryClient.fetchQuery({
    queryKey: [searchQuery],
    queryFn: () => fetchSearchResults(searchQuery),
  });

  return (
    <main>
      <h1>Search Results</h1>
      <p>Search Query: {searchQuery}</p>
      <div className="flex gap-4 flex-col">
        {results.length ? (
          results.map((exercise) => (
            <div key={exercise.id}>
              <ExerciseLink
                href={`/exercises/${exercise.slug}`}
                slug={exercise.slug}
              >
                {exercise.name}
              </ExerciseLink>
            </div>
          ))
        ) : (
          <p>No Exercises found for &quot;{searchQuery}&quot;</p>
        )}
      </div>
    </main>
  );
};

export default SearchResultsPage;
