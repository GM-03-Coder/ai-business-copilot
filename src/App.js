import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Analysis from "./pages/Analysis";
import InsightsPage from "./pages/InsightsPage";
import SimulatorPage from "./pages/SimulatorPage";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/customer"
          element={<Customer />}
        />

        <Route
          path="/analysis"
          element={<Analysis />}
        />

        <Route
          path="/insights"
          element={<InsightsPage />}
        />

        <Route
          path="/simulator"
          element={<SimulatorPage />}
        />

      </Routes>

    </BrowserRouter>

  );

}