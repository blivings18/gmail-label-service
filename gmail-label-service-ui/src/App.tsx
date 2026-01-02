import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink, Route, Routes } from "react-router-dom";
import GoogleAuthGuard from "./components/GoogleAuthGuard";
import Home from "./pages/Home";
import LabelsPage from "./pages/LabelsPage";

function App() {
  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      <AppBar position="static" color="primary" elevation={4}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            GMAIL
          </Typography>
          <Button color="inherit" component={NavLink} to="/labels">
            Labels
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 2, width: "100%" }}>
        <Routes>
          <Route path="/" element={<Home />} />
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
