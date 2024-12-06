import { isOptionCurrent } from "@/app/lib/utils";
import { fetchExerciseDetailOptions } from "@/app/queries/useEquipment";
import { Equipment } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const DetailOptions = ({
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
                  name={exerciseOption}
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

export const EditInput = ({
  label,
  name,
  placeholder,
  defaultValue,
  type = "text"
}: {
  label: string,
  name: string,
  placeholder: string,
  defaultValue: string,
  type?: string
}) => {

  const inputClasses = "peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500";

  if (type === "textarea") {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="mb-2 block text-sm font-medium">
          {label}
        </label>
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          className={inputClasses}
          defaultValue={
            defaultValue || "A description of the exercise"
          }
        />
      </div>
    )
  }
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={inputClasses}
        defaultValue={defaultValue}
      />
    </div>
  )
}
