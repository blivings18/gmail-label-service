import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { LabelFormValues } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: LabelFormValues) => void;
  defaultValues?: LabelFormValues;
  isLoading?: boolean;
  showDelete?: boolean;
  onDelete?: () => void;
  deleteLoading?: boolean;
}

const typeOptions = ["user", "system"];
const labelVisibilityOptions = ["labelShow", "labelHide"];
const messageVisibilityOptions = ["show", "hide"];

const emptyDefaults: LabelFormValues = {
  name: "",
  type: "user",
  labelListVisibility: "labelShow",
  messageListVisibility: "show",
};

const LabelFormDialog: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  defaultValues,
  isLoading,
  showDelete,
  onDelete,
  deleteLoading,
}) => {
  const { control, handleSubmit, reset } = useForm<LabelFormValues>({
    defaultValues: emptyDefaults,
  });

  useEffect(() => {
    if (open) {
      reset(defaultValues ?? emptyDefaults);
    }
  }, [open, defaultValues, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{defaultValues ? "Edit Label" : "Create Label"}</DialogTitle>
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
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        {showDelete && (
          <Button
            variant="contained"
            color="error"
            onClick={onDelete}
            disabled={deleteLoading}
          >
            {deleteLoading && <CircularProgress size={20} sx={{ mr: 1 }} />}
            Delete
          </Button>
        )}
        <Button
          type="submit"
          form="label-form"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading && <CircularProgress size={20} sx={{ mr: 1 }} />}
          {defaultValues ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LabelFormDialog;
