import { FetchedExercise } from "@/app/lib/definitions";
import {
  DetailOptions,
  DifficultySelect,
  EditInput,
} from "@/app/ui/FormInputs";

type ExerciseFormProps = {
  mode: "create" | "update";
  exercise?: FetchedExercise;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const ExerciseForm = ({ mode, exercise, handleSubmit }: ExerciseFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <h2 className="text-3xl font-bold mb-8">Edit Exercise</h2>
        {mode === "update" && (
          <input type="hidden" name="id" defaultValue={exercise?.id} />
        )}
        {/* Exercise Name */}
        <EditInput
          label="Exercise Name"
          name="name"
          placeholder="Push Up, Back Squat, Ring Dips, etc..."
          defaultValue={exercise?.name}
        />
        {/* Exercise Description */}
        <EditInput
          label="Exercise Description"
          name="description"
          placeholder="An Exercise involving..."
          defaultValue={exercise?.description || ""}
          type="textarea"
        />
        {/* Exercise Instruction */}
        <EditInput
          label="Exercise Instruction"
          name="instruction"
          placeholder="Instructions to perform the exercise..."
          defaultValue={exercise?.instruction || ""}
          type="textarea"
        />
        {/* Exercise Difficulty */}
        <DifficultySelect
          label="Difficulty"
          name="difficulty"
          defaultValue={exercise?.difficulty}
        />
        {/* Equipment */}
        <DetailOptions
          exerciseOption="equipment"
          currentValues={exercise?.equipment}
          outputName="Equipment"
        />
        {/* TargetedMuscle */}
        <DetailOptions
          exerciseOption="targetMuscle"
          currentValues={exercise?.targetMuscle}
          outputName="Target Muscles"
        />
        {/* MuscleGroup */}
        <DetailOptions
          exerciseOption="muscleGroup"
          currentValues={exercise?.muscleGroup}
          outputName="Muscle Groups"
        />
      </div>
      <button type="submit">Submit Changes</button>
    </form>
  );
};

export default ExerciseForm;
