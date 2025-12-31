import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface Label {
  id: string;
  name: string;
}

const fetchLabels = async (): Promise<Label[]> => {
  const res = await axios.get("http://localhost:8080/api/v1/label");
  return res.data;
};

const cols: GridColDef<Label>[] = [
  { field: "name", headerName: "Name", flex: 1 },
];

const LabelsPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Label | null>(null);

  const { data, isLoading, error } = useQuery<Label[], Error>({
    queryKey: ["items"],
    queryFn: fetchLabels,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading data</Typography>;

  const handleRowClick = (params: GridRowParams<Label>) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Labels
      </Typography>
      <Box sx={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={cols}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          onRowClick={handleRowClick}
        />
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Label Details</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <>
              <Typography>
                <strong>Name:</strong> {selectedRow.name}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LabelsPage;
