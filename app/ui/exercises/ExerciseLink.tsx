"use client";

import Link from "next/link";
import { ExerciseLinkProps } from "@/app/lib/definitions";
import { fetchExercise } from "@/app/queries/useExercises";
import { useQueryClient } from "@tanstack/react-query";

const ExerciseLink = ({
  href,
  slug: exerciseSlug,
  children,
}: ExerciseLinkProps) => {
  const queryClient = useQueryClient();

  const handleInteraction = () => {
    queryClient.prefetchQuery({
      queryKey: ["exercises", exerciseSlug],
      queryFn: () => fetchExercise(exerciseSlug),
    });
  };

  return (
    <>
      <Link
        href={href}
        onMouseEnter={handleInteraction}
        onFocus={handleInteraction}
      >
        {children}
      </Link>
    </>
  );
};

export default ExerciseLink;
