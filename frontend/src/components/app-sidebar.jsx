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

   const logout = () => {
     localStorage.removeItem("token");
     localStorage.removeItem("user");
     localStorage.removeItem("markAttendance");

     // Optional: redirect to login page
     window.location.href = "/";
   };
  return (
    <Sidebar>
      {/* HEADER */}
      <SidebarHeader>
        <h2 className="text-lg font-bold">Attendance App</h2>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                {" "}
                <Link to="/user-dashboard">Dashboard</Link>{" "}
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                {" "}
                <Link to="/leaves">Leave Requests</Link>{" "}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <SidebarMenuButton onClick= {logout}>
          Logout
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
