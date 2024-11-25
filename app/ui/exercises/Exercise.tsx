import { Exercise as ExercistType } from "@/app/lib/definitions";

const Exercise = ({exercise}: { exercise: ExercistType}) => {
  return <>
    {exercise.name}
  </>
}

export default Exercise;