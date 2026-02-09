import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import LeaveManagement from "./pages/admin/LeaveManagement";
import Leaves from "./pages/user/Leaves";
import Layout from "./components/layout/layout";

const ErrorPage = () => (
  <div className="p-4 text-center">Page does not exist!!</div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route element={<Layout />}>
          <Route
            path="/user-dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />
          <Route
            path="/leaveManagement"
            element={<LeaveManagement />}
          />
          <Route
            path="/leaves"
            element={<Leaves />}
          />

          {/* Catch-all */}
          <Route
            path="*"
            element={<ErrorPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
