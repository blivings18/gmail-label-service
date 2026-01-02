import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Label } from "../types";

interface Props {
  labels: Label[];
  onRowClick: (params: GridRowParams<Label>) => void;
}

const columns: GridColDef<Label>[] = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "type", headerName: "Type", flex: 1 },
  { field: "labelListVisibility", headerName: "Label Visibility", flex: 1 },
  { field: "messageListVisibility", headerName: "Message Visibility", flex: 1 },
];

const LabelTable: React.FC<Props> = ({ labels, onRowClick }) => {
  return (
    <Box sx={{ height: "50vh", width: "100%" }}>
      <DataGrid
        rows={labels || []}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={onRowClick}
        disableRowSelectionOnClick
        initialState={{
          sorting: { sortModel: [{ field: "name", sort: "asc" }] },
        }}
      />
    </Box>
  );
};

export default LabelTable;
