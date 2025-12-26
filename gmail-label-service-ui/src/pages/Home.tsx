import { CircularProgress, List, ListItem, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface Item {
  id: number;
  name: string;
}

const fetchItems = async (): Promise<Item[]> => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
};

const Home: React.FC = () => {
  const { data, isLoading, error } = useQuery<Item[], Error>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading data</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Items
      </Typography>
      <List>
        {data?.map((item) => (
          <ListItem key={item.id}>{item.name}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default Home;
