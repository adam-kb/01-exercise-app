import { Equipment, EquipmentDetailGroups } from "../lib/definitions";

export const fetchEquipment = async (): Promise<Equipment[] | null> => {
  const response = await fetch("/api/equipment");

  if(!response.ok) {
    throw new Error("Unable to fetch Equipment List");
  }

  return response.json();
}


export const fetchExerciseDetailOptions = async <T>(endpoint: EquipmentDetailGroups): Promise<T[]> => {
  const response = await fetch(`/api/${endpoint}`);

  if(!response.ok) {
    throw new Error(`Unable to fetch ${endpoint}`);
  }

  return response.json();
}
