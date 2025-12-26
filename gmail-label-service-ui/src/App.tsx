import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import FormPage from "./pages/FormPage";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/form">
            Form
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
