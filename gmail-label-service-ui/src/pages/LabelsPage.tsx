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
import {
  createLabel,
  deleteLabel,
  fetchLabels,
  Label,
  updateLabel,
} from "../api/labelClient";

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

const typeOptions = ["user", "system"];
const labelVisibilityOptions = ["labelShow", "labelHide"];
const messageVisibilityOptions = ["show", "hide"];

const LabelsPage: React.FC = () => {
  const queryClient = useQueryClient();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [typeInput, setTypeInput] = useState("user");
  const [labelVisibility, setLabelVisibility] = useState("labelShow");
  const [messageVisibility, setMessageVisibility] = useState("show");

  // Fetch labels
  const {
    data: labels,
    isLoading,
    error,
  } = useQuery<Label[], Error>({
    queryKey: ["labels"],
    queryFn: fetchLabels,
  });

  // --- Mutations ---
  const createMutation = useMutation<
    Label,
    Error,
    {
      name: string;
      type: string;
      labelListVisibility: string | null;
      messageListVisibility: string | null;
    }
  >({
    mutationFn: (variables) =>
      createLabel(
        variables.name,
        variables.type,
        variables.labelListVisibility,
        variables.messageListVisibility
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["labels"] }),
  });

  const updateMutation = useMutation<
    Label,
    Error,
    {
      id: string;
      name: string;
      type: string;
      labelListVisibility: string | null;
      messageListVisibility: string | null;
    }
  >({
    mutationFn: (variables) =>
      updateLabel(
        variables.id,
        variables.name,
        variables.type,
        variables.labelListVisibility,
        variables.messageListVisibility
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["labels"] }),
  });

  const deleteMutation = useMutation<void, Error, { id: string }>({
    mutationFn: (variables) => deleteLabel(variables.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["labels"] }),
  });

  // --- Handlers ---
  const handleRowClick = (params: GridRowParams<Label>) => {
    const row = params.row;
    setSelectedLabel(row);
    setNameInput(row.name);
    setTypeInput(row.type);
    setLabelVisibility(row.labelListVisibility ?? "labelShow");
    setMessageVisibility(row.messageListVisibility ?? "show");
    setDialogOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedLabel(null);
    setNameInput("");
    setTypeInput("user");
    setLabelVisibility("labelShow");
    setMessageVisibility("show");
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!nameInput.trim()) return;

    if (selectedLabel) {
      updateMutation.mutate({
        id: selectedLabel.id,
        name: nameInput,
        type: typeInput,
        labelListVisibility: labelVisibility,
        messageListVisibility: messageVisibility,
      });
    } else {
      createMutation.mutate({
        name: nameInput,
        type: typeInput,
        labelListVisibility: labelVisibility,
        messageListVisibility: messageVisibility,
      });
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
    setTypeInput("user");
    setLabelVisibility("default");
    setMessageVisibility("default");
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
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Type"
            select
            fullWidth
            value={typeInput}
            onChange={(e) => setTypeInput(e.target.value)}
          >
            {typeOptions.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Label Visibility"
            select
            fullWidth
            value={labelVisibility}
            onChange={(e) => setLabelVisibility(e.target.value)}
          >
            {labelVisibilityOptions.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Message Visibility"
            select
            fullWidth
            value={messageVisibility}
            onChange={(e) => setMessageVisibility(e.target.value)}
          >
            {messageVisibilityOptions.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </TextField>
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
