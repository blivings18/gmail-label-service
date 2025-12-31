import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  createLabel,
  deleteLabel,
  fetchLabels,
  Label,
  updateLabel,
} from "../api/labelClient";

const columns: GridColDef<Label>[] = [
  { field: "name", headerName: "Name", flex: 1 },
];

const LabelsPage: React.FC = () => {
  const queryClient = useQueryClient();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);
  const [nameInput, setNameInput] = useState("");

  // Fetch labels
  const {
    data: labels,
    isLoading,
    error,
  } = useQuery<Label[], Error>({
    queryKey: ["labels"],
    queryFn: fetchLabels,
  });

  // Mutations
  const createMutation = useMutation<Label, Error, { name: string }>({
    mutationFn: (variables) => createLabel(variables.name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["labels"] }),
  });

  const updateMutation = useMutation<
    Label,
    Error,
    { id: string; name: string }
  >({
    mutationFn: (variables) => updateLabel(variables.id, variables.name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["labels"] }),
  });

  const deleteMutation = useMutation<void, Error, { id: string }>({
    mutationFn: (variables) => deleteLabel(variables.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["labels"] }),
  });

  // Handlers
  const handleRowClick = (params: GridRowParams<Label>) => {
    setSelectedLabel(params.row);
    setNameInput(params.row.name);
    setDialogOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedLabel(null);
    setNameInput("");
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!nameInput.trim()) return;

    if (selectedLabel) {
      updateMutation.mutate({ id: selectedLabel.id, name: nameInput });
    } else {
      createMutation.mutate({ name: nameInput });
    }

    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (selectedLabel) {
      deleteMutation.mutate({ id: selectedLabel.id });
      setDialogOpen(false);
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedLabel(null);
    setNameInput("");
  };

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error">Error loading data: {error.message}</Typography>
    );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Labels
      </Typography>
      <Button variant="contained" onClick={handleCreateClick} sx={{ mb: 2 }}>
        Create Label
      </Button>

      <Box sx={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={labels || []}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10]}
          onRowClick={handleRowClick}
        />
      </Box>

      <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {selectedLabel ? "Edit Label" : "Create Label"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Label Name"
            fullWidth
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {selectedLabel && (
            <Button color="error" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button variant="contained" onClick={handleSave}>
            {selectedLabel ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LabelsPage;
