"use client";

import { fetchExercises } from "@/app/queries/useExercises";
import Card from "@/app/ui/Card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "../Loading";
// import Exercise from "./Exercise";
import ExerciseThumbnail from "./ExerciseThumbnail";
// import Link from "next/link";
import ExerciseLink from "./ExerciseLink";

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
    queryKey: ["infiniteExercises"],
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
      <ul className="grid gap-2 md:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {data.pages
          .flatMap((group) => group.data)
          .map((exercise) => (
            <li key={exercise.id} >
              <Card customClasses="h-full">
                {exercise.media.length > 0 && exercise.media.map(item => (
                  <ExerciseThumbnail key={item.mediaKey} media={item} />
                ))}
                <h2 className="text-lg">
                  <ExerciseLink slug={exercise.slug}>
                    {exercise.name}
                  </ExerciseLink>
                </h2>
                {/* <Exercise exercise={exercise} /> */}
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
