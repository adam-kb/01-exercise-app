"use client";

import Link from "next/link";
import { ExerciseLinkProps } from "@/app/lib/definitions";
import { fetchExercise } from "@/app/queries/useExercises";
import { getQueryClient } from "@/app/getQueryClient";

const ExerciseLink = ({
  href,
  slug: exerciseSlug,
  children,
}: ExerciseLinkProps) => {
  const queryClient = getQueryClient();

  const url = href || `/exercises/${exerciseSlug}`;

  const handleInteraction = () => {
    queryClient.prefetchQuery({
      queryKey: ["exercises", exerciseSlug],
      queryFn: () => fetchExercise(exerciseSlug),
    });
  };

  return (
      <Link
        href={url}
        onMouseEnter={handleInteraction}
        onFocus={handleInteraction}
      >
        {children}
      </Link>
  );
};

export default ExerciseLink;
