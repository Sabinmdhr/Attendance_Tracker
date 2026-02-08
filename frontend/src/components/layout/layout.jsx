import { Outlet } from "react-router-dom";
import { AppSidebar } from "../app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import WelcomeBar from "../common/WelcomeBar";

export default function Layout() {
  return (
    <SidebarProvider>
      <div style={{ display: "flex", width: "100%" }}>
        <AppSidebar />

        <main style={{ flex: 1, padding: "16px" }}>
          <SidebarTrigger />
          <WelcomeBar />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
