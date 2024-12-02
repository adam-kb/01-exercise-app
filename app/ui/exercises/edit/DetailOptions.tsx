import { isOptionCurrent } from "@/app/lib/utils";
import { fetchExerciseDetailOptions } from "@/app/queries/useEquipment";
import { Equipment } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const DetailOptions = ({
  exerciseOption,
  currentValues,
  outputName,
}: {
  exerciseOption: string,
  currentValues: { name: string }[],
  outputName: string
}) => {
  const { data, isError, isPending } = useQuery({
    queryKey: [exerciseOption],
    queryFn: () => fetchExerciseDetailOptions<Equipment>(exerciseOption)
  });

  return (
    <div className="mb-4">
      {isPending && <p>{`Loading ${outputName}`}</p>}

      {isError && <p>{`Error Loading ${outputName}`}</p>}

      {data &&
        <>
          <h2 className="text-xl font-bold">{outputName}</h2>
          {data.map(option => {
            const isCurrentOption = isOptionCurrent(option, currentValues, "name");

            return (
              <div key={option.name}>
                <label htmlFor={option.name}>{option.name}</label>
                <input
                  type="checkbox"
                  id={option.name}
                  name={option.name}
                  value={option.id}
                  defaultChecked={isCurrentOption}
                />
              </div>
            )
          })}
        </>
      }
    </div>
  )
}

export default DetailOptions;