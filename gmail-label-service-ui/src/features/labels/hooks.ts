import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLabel, deleteLabel, fetchLabels, updateLabel } from "./api";
import { Label, LabelFormValues } from "./types";

export const useLabels = () => {
  const queryClient = useQueryClient();

  const query = useQuery<Label[], Error>({
    queryKey: ["labels"],
    queryFn: fetchLabels,
  });

  const createMutation = useMutation<Label, Error, LabelFormValues>({
    mutationFn: createLabel,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["labels"] }),
  });

  const updateMutation = useMutation<
    Label,
    Error,
    LabelFormValues & { id: string }
  >({
    mutationFn: updateLabel,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["labels"] }),
  });

  const deleteMutation = useMutation<void, Error, { id: string }>({
    mutationFn: deleteLabel,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["labels"] }),
  });

  return {
    ...query,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
