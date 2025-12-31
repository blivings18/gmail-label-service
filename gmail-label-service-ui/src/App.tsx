import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import GoogleAuthGuard from "./components/GoogleAuthGuard";
import Home from "./pages/Home";
import LabelsPage from "./pages/LabelsPage";

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Gmail Label App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/labels">
            Labels
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
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
      </Container>
    </div>
  );
}

export default App;
