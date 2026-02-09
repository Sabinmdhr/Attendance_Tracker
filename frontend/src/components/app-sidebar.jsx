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
import { Link } from "react-router-dom";

export function AppSidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const dashboardRoute = isAdmin ? "/admin-dashboard" : "/user-dashboard";

  const leaveRoute = isAdmin ? "/leaveManagement" : "/leaves";

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-bold">Attendance App</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Link to={dashboardRoute}>Dashboard</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <Link to={leaveRoute}>Leave Requests</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton onClick={logout}>Logout</SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
