import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import LeaveManagement from "./pages/admin/LeaveManagement";
import Leaves from "./pages/user/Leaves";

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/adminDashboard"
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
=======
        <Route path="/" element={<Login />} />
        <Route path="/user-dashboard" element={<Dashboard />} />{" "}
        <Route path="/admin-Dashboard" element={<AdminDashboard />} />
        <Route path="/leaveManagement" element={<LeaveManagement />} />
        <Route path="/leaves" element={<Leaves />} />
>>>>>>> f379f5ddb5a5f66db5ac50afa6ea6030212ff492
      </Routes>
    </BrowserRouter>
  );
}

export default App;
