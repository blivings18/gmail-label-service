import { CircularProgress, List, ListItem, Typography } from "@mui/material";
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

const LabelsPage: React.FC = () => {
  const { data, isLoading, error } = useQuery<Label[], Error>({
    queryKey: ["items"],
    queryFn: fetchLabels,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading data</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Labels
      </Typography>
      <List>
        {data?.map((item) => (
          <ListItem key={item.id}>{item.name}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default LabelsPage;
