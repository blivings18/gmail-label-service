import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  createLabel,
  deleteLabel,
  fetchLabels,
  Label,
  updateLabel,
} from "../api/labelClient";

const typeOptions = ["user", "system"];
const labelVisibilityOptions = ["labelShow", "labelHide"];
const messageVisibilityOptions = ["show", "hide"];

interface LabelFormValues {
  name: string;
  type: string;
  labelListVisibility: string;
  messageListVisibility: string;
}

const LabelsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);

  // react-hook-form
  const { control, handleSubmit, reset } = useForm<LabelFormValues>({
    defaultValues: {
      name: "",
      type: "user",
      labelListVisibility: "labelShow",
      messageListVisibility: "show",
    },
  });

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
  const createMutation = useMutation<Label, Error, LabelFormValues>({
    mutationFn: (data) =>
      createLabel(
        data.name,
        data.type,
        data.labelListVisibility,
        data.messageListVisibility
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["labels"] }),
  });

  const updateMutation = useMutation<
    Label,
    Error,
    LabelFormValues & { id: string }
  >({
    mutationFn: (data) =>
      updateLabel(
        data.id,
        data.name,
        data.type,
        data.labelListVisibility,
        data.messageListVisibility
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["labels"] }),
  });

  const deleteMutation = useMutation<void, Error, { id: string }>({
    mutationFn: (variables) => deleteLabel(variables.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["labels"] }),
  });

  // Handlers
  const handleRowClick = (params: GridRowParams<Label>) => {
    const row = params.row;
    setSelectedLabel(row);
    reset({
      name: row.name,
      type: row.type,
      labelListVisibility: row.labelListVisibility ?? "labelShow",
      messageListVisibility: row.messageListVisibility ?? "show",
    });
    setDialogOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedLabel(null);
    reset({
      name: "",
      type: "user",
      labelListVisibility: "labelShow",
      messageListVisibility: "show",
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: LabelFormValues) => {
    if (selectedLabel) {
      updateMutation.mutate({ ...data, id: selectedLabel.id });
    } else {
      createMutation.mutate(data);
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
  };

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error">Error loading data: {error.message}</Typography>
    );

  const columns: GridColDef<Label>[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    {
      field: "labelListVisibility",
      headerName: "Label Visibility",
      flex: 1,
    },
    {
      field: "messageListVisibility",
      headerName: "Message Visibility",
      flex: 1,
    },
  ];

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
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10]}
          onRowClick={handleRowClick}
          disableRowSelectionOnClick
        />
      </Box>

      <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {selectedLabel ? "Edit Label" : "Create Label"}
        </DialogTitle>
        <DialogContent>
          <form id="label-form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  margin="dense"
                  label="Name"
                  fullWidth
                />
              )}
            />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Type"
                  select
                  fullWidth
                >
                  {typeOptions.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="labelListVisibility"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Label Visibility"
                  select
                  fullWidth
                >
                  {labelVisibilityOptions.map((v) => (
                    <MenuItem key={v} value={v}>
                      {v}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="messageListVisibility"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Message Visibility"
                  select
                  fullWidth
                >
                  {messageVisibilityOptions.map((v) => (
                    <MenuItem key={v} value={v}>
                      {v}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {selectedLabel && (
            <Button color="error" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button type="submit" form="label-form" variant="contained">
            {selectedLabel ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LabelsPage;
