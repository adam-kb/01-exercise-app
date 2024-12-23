import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "../getQueryClient";
import { fetchSearchResults } from "../queries/useSearchResults";
import SearchResults from "../ui/search/SearchResults";

const SearchResultsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const searchQuery = (await searchParams).query;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => fetchSearchResults(searchQuery),
  });

  return (
    <main>
      <h1>Search Results</h1>
      <p>Search Query: {searchQuery}</p>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchResults searchQuery={searchQuery} />
      </HydrationBoundary>
    </main>
  );
};

export default SearchResultsPage;
