import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Paper,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import CreateLabelButton from "./components/CreateLabelButton";
import LabelFormDialog from "./components/LabelFormDialog";
import LabelTable from "./components/LabelTable";
import { useLabels } from "./hooks";
import { Label, LabelFormValues } from "./types";

const LabelsPage: React.FC = () => {
  const {
    data: labels,
    isLoading,
    error,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useLabels();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);

  const isPending =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const handleRowClick = (params: { row: Label }) => {
    setSelectedLabel(params.row);
    setDialogOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedLabel(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => setDialogOpen(false);

  const handleSubmit = (data: LabelFormValues) => {
    if (selectedLabel) {
      updateMutation.mutate({ ...data, id: selectedLabel.id });
      setSnackbar({ message: "Label updated!", severity: "success" });
    } else {
      createMutation.mutate(data);
      setSnackbar({ message: "Label created!", severity: "success" });
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (selectedLabel) {
      deleteMutation.mutate({ id: selectedLabel.id });
      setSnackbar({ message: "Label deleted!", severity: "success" });
      setDialogOpen(false);
    }
  };

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return <Box color="error.main">Error loading labels: {error.message}</Box>;

  return (
    <Paper elevation={2} sx={{ m: 4, p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <CreateLabelButton onClick={handleCreateClick} />
      </Box>

      <LabelTable labels={labels || []} onRowClick={handleRowClick} />

      <LabelFormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        defaultValues={
          selectedLabel
            ? {
                name: selectedLabel.name,
                type: selectedLabel.type,
                labelListVisibility:
                  selectedLabel.labelListVisibility ?? "labelShow",
                messageListVisibility:
                  selectedLabel.messageListVisibility ?? "show",
              }
            : undefined
        }
        showDelete={!!selectedLabel}
        onDelete={handleDelete}
        isLoading={createMutation.isPending || updateMutation.isPending}
        deleteLoading={deleteMutation.isPending}
      />

      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar(null)}
          severity={snackbar?.severity}
          sx={{ width: "100%" }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>

      <Backdrop
        open={isPending}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
};

export default LabelsPage;
