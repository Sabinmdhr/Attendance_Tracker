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
        <Route path="/" element={<Login />} />
        <Route path="/user-dashboard" element={<Dashboard />} />{" "}
        <Route path="/admin-Dashboard" element={<AdminDashboard />} />
        <Route path="/leaveManagement" element={<LeaveManagement />} />
        <Route path="/leaves" element={<Leaves />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
