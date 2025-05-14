'use client'

import { debounce } from "@/app/lib/utils";
import { useState, useMemo, useEffect } from "react";
import { EditInput } from "../FormInputs";
import ExerciseSearchResults from "./ExerciseSearchResults";

type Exercise = { name: string; id: number };

const ExerciseSearch = ({ onSelect }: { onSelect: (exercise: Exercise) => void }) => {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    console.log("Debounced search:", value);
    setSearchQuery(value)
  };

  const { callback: debouncedSearch, cancel } = useMemo(() => debounce(handleSearch, 300), []);

  useEffect(() => {
    return () => {
      cancel(); // cancel on unmount
    };
  }, [cancel]);

  return (
    <>
      <EditInput
        label="Choose Exercises"
        name="exercises"
        placeholder="Pushup, Pullup, Squat"
        defaultValue={inputValue}
        onChange={(e) => {
          const val = e.target.value;
          setInputValue(val)
          debouncedSearch(val)
        }}
      />

      {searchQuery && (
        <ExerciseSearchResults
          searchQuery={searchQuery}
          mode="select"
          onSelect={(exercise) => onSelect({ name: exercise.name, id: exercise.id })} />
          // onSelect={onSelect} />
      )}
    </>
  )
}

export default ExerciseSearch;
