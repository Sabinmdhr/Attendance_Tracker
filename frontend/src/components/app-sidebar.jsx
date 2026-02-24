import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  LogOut,
  Shield,
  User,
} from "lucide-react";

export function AppSidebar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const dashboardRoute = isAdmin ? "/admin-dashboard" : "/user-dashboard";
  const leaveRoute = isAdmin ? "/leaveManagement" : "/leaves";

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Sidebar className="border-r bg-white shadow-sm">
      {/* HEADER */}
      <SidebarHeader className="px-6 py-5 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-black text-white p-2 rounded-xl">
            {isAdmin ? <Shield size={18} /> : <User size={18} />}
          </div>
          <div>
            <h2 className="text-lg font-semibold">Attendance App</h2>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="!hover:bg-transparent !hover:text-inherit"
              >
                <Link
                  to={dashboardRoute}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl ${
                    isActive(dashboardRoute) ? "bg-black text-white" : ""
                  }`}
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="!hover:bg-transparent !hover:text-inherit"
              >
                <Link
                  to={leaveRoute}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl ${
                    isActive(leaveRoute) ? "bg-black text-white" : ""
                  }`}
                >
                  <CalendarCheck size={18} />
                  Leave Requests
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t p-4">
        <SidebarMenuButton
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-xl hover:bg-red-50 hover:text-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
