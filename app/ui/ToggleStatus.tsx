"use client";

import { updateExerciseStatus } from "@/app/queries/useExercises";
import ConfirmModal from "@/app/ui/ConfirmModal";
import { Status } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getQueryClient } from "../getQueryClient";
import { Button } from "./FormInputs";

type ToggleStatusProps = {
  id: number;
  currentStatus: Omit<Status, "FEATURED">;
};
const getNextStatus = (status: Omit<Status, "FEATURED">) =>
  status === "ACTIVE" ? "ARCHIVED" : "ACTIVE";

const ToggleStatus = ({ id, currentStatus }: ToggleStatusProps) => {
  const queryClient = getQueryClient();
  const router = useRouter();
  const [isDeactivating, setIsDeactivating] = useState(false);

  const mutation = useMutation({
    mutationFn: updateExerciseStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      router.push("/exercises");
      setIsDeactivating(false);
    },
  });

  const handleStatusClick = () => {
    const newStatus = getNextStatus(currentStatus);
    mutation.mutate({ id, exerciseStatus: newStatus });
  };

  return (
    <>
      {isDeactivating && (
        <ConfirmModal
          title="Confirm deactivatating the current exercise."
          onConfirm={handleStatusClick}
          onCancel={() => setIsDeactivating(false)}
          status={isDeactivating}
          cancelText="Cancel"
          confirmText={
            mutation.isPending ? "Processing..." : "Deactivate Exercise"
          }
        />
      )}

      <div className="flex-col">
        <Button
          type="button"
          onClick={() => setIsDeactivating(true)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 text-sm rounded"
        >
          {currentStatus === "ACTIVE" ? "Deactivate" : "Activate"}
        </Button>
      </div>
    </>
  );
};

export default ToggleStatus;
