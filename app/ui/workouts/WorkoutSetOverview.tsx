type Set = {
  setNumber: number;
  reps: number | string | null;
  weight?: number | string | null;
};

type Props = {
  sets: Set[];
};

const WorkoutSetOverview = ({ sets }: Props) => {
  const uniformReps = sets.every(set => set.reps === sets[0].reps);

  return (
    <p>
      Sets:{" "}
      {uniformReps
        ? `${sets.length} x ${sets[0].reps}`
        : sets.map((set, index) => (
            <span key={set.setNumber}>
              {set.reps}
              {index < sets.length - 1 && ", "}
            </span>
          ))}
    </p>
  );
};

export default WorkoutSetOverview;
