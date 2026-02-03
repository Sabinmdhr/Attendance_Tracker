import { useState } from "react";
import { GalleryVerticalEndIcon } from "./components/icons/lucide-gallery-vertical-end";
import { LoginForm } from "./components/login-form";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import Login from "./pages/Login";
function App() {

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
      <Login />
    </>
  );
}

export default App;
