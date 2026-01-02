import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

interface Props {
  onClick: () => void;
}

const CreateLabelButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<AddIcon />}
      onClick={onClick}
    >
      Create Label
    </Button>
  );
};

export default CreateLabelButton;
