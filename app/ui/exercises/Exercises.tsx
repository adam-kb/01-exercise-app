"use client";

import { fetchExercises } from "@/app/queries/useExercises";
import Card from "@/app/ui/Card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "../Loading";
import Exercise from "./Exercise";

const Exercises = () => {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["exercises"],
    queryFn: fetchExercises,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  return status === "pending" ? (
    <Loading />
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <ul>
        {data.pages
          .flatMap((group) => group.data)
          .map((exercise) => (
            <li key={exercise.id}>
              <Card>
                <Exercise exercise={exercise} />
              </Card>
            </li>
          ))}
      </ul>
      <div>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more exercises..."
            : hasNextPage
            ? "Load More Exercises"
            : "All exercises loaded"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

export default Exercises;
