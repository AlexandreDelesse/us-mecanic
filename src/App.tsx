import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import { AppBar, Avatar, Button, Container, Toolbar } from "@mui/material";
import Home from "./pages/Home";
import AnalyseDetail from "./pages/AnalyseDetail";
import logo from "./Assets/Images/logo-us.png";

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Avatar src={logo} />
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyse/:logId" element={<AnalyseDetail />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
