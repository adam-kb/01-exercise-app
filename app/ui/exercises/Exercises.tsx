"use client";

import Exercise from "./Exercise";
import Card from "@/app/ui/Card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchExercises } from "@/app/queries/useExercises";
import Loading from "../Loading";
import { useInView } from 'react-intersection-observer'
import React, { useEffect } from "react";

const Exercises = () => {
  const {ref, inView } = useInView();

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
  })

  useEffect(() => {
    if(inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])


  return status === 'pending' ? (
    <Loading />
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <ul>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((exercise) => (
              <li key={exercise.id}>
                <Card>
                  <Exercise exercise={exercise} />
                </Card>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <div>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>


  );
};

export default Exercises;
