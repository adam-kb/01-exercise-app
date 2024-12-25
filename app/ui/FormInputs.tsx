import React from "react";
import { isOptionCurrent } from "@/app/lib/utils";
import { fetchExerciseDetailOptions } from "@/app/queries/useEquipment";
import { Difficulty, Equipment } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { FetchedCheckboxes } from "./Skeletons";

const difficulties = Object.values(Difficulty);

type DetailProps = {
  exerciseOption: string;
  currentValues: { id: number; name: string }[] | undefined;
  outputName: string;
}

type EditInputProps = {
  label: string;
  name: string;
  placeholder: string;
  defaultValue: string | undefined;
  type?: string;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: "button" | "submit" | "reset" | undefined;
  children: string;
}

export const Button = ({
  type = "button",
  children,
  ...props
}: ButtonProps ) => {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
};



export const DetailOptions = ({
  exerciseOption,
  currentValues,
  outputName,
}: DetailProps) => {
  const { data, isError, isPending } = useQuery({
    queryKey: [exerciseOption],
    queryFn: () => fetchExerciseDetailOptions<Equipment>(exerciseOption),
  });

  return (
    <div className="mb-4">
      {isPending && <FetchedCheckboxes />}

      {isError && <p>{`Error Loading ${outputName}`}</p>}

      {data && (
        <>
          <h2 className="text-xl font-bold">{outputName}</h2>
          {data.map((option) => {
            const isCurrentOption = isOptionCurrent(
              option,
              currentValues,
              "name"
            );

            return (
              <div key={option.name}>
                <label htmlFor={option.name} className="mr-1">{option.name}</label>
                <input
                  type="checkbox"
                  id={option.name}
                  name={exerciseOption}
                  value={option.id}
                  defaultChecked={isCurrentOption}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export const EditInput = ({
  label,
  name,
  placeholder,
  defaultValue,
  type = "text",
}: EditInputProps) => {
  const inputClasses =
    "peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500";

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
          defaultValue={defaultValue || ""}
        />
      </div>
    );
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
        defaultValue={defaultValue || ""}
      />
    </div>
  );
};

export const DifficultySelect = ({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue: string | undefined;
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
        defaultValue={defaultValue}
      >
        {difficulties.map((diff) => (
          <option key={diff} value={diff}>
            {diff}
          </option>
        ))}
      </select>
    </div>
  );
};
