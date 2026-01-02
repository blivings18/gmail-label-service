import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import GoogleAuthGuard from "./components/GoogleAuthGuard";
import LabelsPage from "./features/labels/LabelsPage";

function App() {
  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      <AppBar position="static" color="primary" elevation={4}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Gmail
          </Typography>
          <Button component={NavLink} to="/labels" sx={{ fontSize: "1rem" }}>
            Labels
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 2, width: "100%" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/labels" replace />} />
          <Route
            path="/labels"
            element={
              <GoogleAuthGuard>
                <LabelsPage />
              </GoogleAuthGuard>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
