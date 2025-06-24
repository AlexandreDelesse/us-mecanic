import "./App.css";
import { HashRouter, Link, Route, Routes } from "react-router";
import { AppBar, Avatar, Box, Button, Container, Toolbar } from "@mui/material";
import Home from "./pages/Home";
import AnalyseDetail from "./pages/AnalyseDetail";
import logo from "./Assets/Images/logo-us.png";
import VersionDisplay from "./components/Utils/VersionDisplay";
import UserAvatar from "./components/User/UserAvatar";
import SubscriptionContainer from "./components/Subscription/SubscriptionContainer";
import GeolocPage from "./pages/GeolocPage";

function App() {
  return (
    <HashRouter>
      <AppBar position="static">
        <Toolbar>
          <Avatar src={logo} />
          <Button color="inherit" component={Link} to="/">
            Logs
          </Button>
          <Button color="inherit" component={Link} to="/geoloc/GZ804KX/E1F6699F-F208-4D7A-892E-006A4D782842">
            Geoloc
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/notification-subscriptions"
          >
            Subscriptions
          </Button>

          <Box flexGrow={1} />

          <UserAvatar />
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyse/:logId" element={<AnalyseDetail />} />
          <Route
            path="/notification-subscriptions"
            element={<SubscriptionContainer />}
          />
          <Route path="/geoloc/:immat/:tripId" element={<GeolocPage />} />
        </Routes>
        <VersionDisplay />
      </Container>
    </HashRouter>
  );
}

export default App;
