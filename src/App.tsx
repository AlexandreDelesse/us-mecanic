import "./App.css";
import { HashRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import AnalyseDetail from "./pages/AnalyseDetail";
import SubscriptionContainer from "./components/Subscription/SubscriptionContainer";
import GeolocPage from "./pages/GeolocPage";
import AppLayout from "./pages/AppLayout";
import { Box } from "@mui/material";
import RequireAuth from "./Keycloak/RequireAuth";

function App() {
  return (
    <HashRouter>
      {/* Routes AVEC AppBar */}
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Home />} />
          <Route path="/analyse/:logId" element={<AnalyseDetail />} />
          <Route
            path="/notification-subscriptions"
            element={<SubscriptionContainer />}
          />
          <Route path="/geoloc/:immat/:tripId" element={<GeolocPage />} />
        </Route>

        {/* Routes SANS AppBar */}
        <Route
          path="/embed/geoloc/:immat/:tripId"
          element={
            <Box sx={{ padding: 2 }}>
              <GeolocPage />
            </Box>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
