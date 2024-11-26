import { Exercise as ExerciseType } from "@/app/lib/definitions";
import { Difficulty } from "@prisma/client";

const ExerciseEditForm = ({ exercise }: { exercise: ExerciseType }) => {

  const difficulties = Object.values(Difficulty);
  return (
    <main>
      <form action="">
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <h2 className="text-3xl font-bold mb-8">Edit Exercise</h2>
          {/* Exercise Name */}
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Exercise Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Push Up, Back Squat, Ring Dips, etc..."
              className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={exercise.name}
            />
          </div>
          {/* Exercise Description */}
          <div className="mb-4">
            <label htmlFor="description" className="mb-2 block text-sm font-medium">
              Exercise Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="An exercise involving..."
              className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={exercise.description || "A description of the exercise"}
            />
          </div>
          {/* Exercise Difficulty */}
          <div className="mb-4">
            <label htmlFor="difficulty" className="mb-2 block text-sm font-medium">
              Exercise Difficulty
            </label>
            <select
              name="difficulty"
              id="difficulty"
              className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={exercise.difficulty}
            >
              {difficulties.map(diff => (<option key={diff} value={diff} >{diff}</option>))}
            </select>
          </div>
        </div>
      </form>
    </main >
  );
};

export default ExerciseEditForm;
