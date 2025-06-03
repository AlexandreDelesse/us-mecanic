import "./App.css";
import { HashRouter, Link, Route, Routes } from "react-router";
import { AppBar, Avatar, Box, Button, Container, Toolbar } from "@mui/material";
import Home from "./pages/Home";
import AnalyseDetail from "./pages/AnalyseDetail";
import logo from "./Assets/Images/logo-us.png";
import VersionDisplay from "./components/Utils/VersionDisplay";
import UserAvatar from "./components/User/UserAvatar";

function App() {
  return (
    <HashRouter>
      <AppBar position="static">
        <Toolbar>
          <Avatar src={logo} />
          <Button color="inherit" component={Link} to="/">
            Logs
          </Button>

          <Box flexGrow={1} />

          <UserAvatar />
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyse/:logId" element={<AnalyseDetail />} />
          <Route path="/notification-subscriptions" element={<AnalyseDetail />} />
        </Routes>
        <VersionDisplay />
      </Container>
    </HashRouter>
  );
}

export default App;
