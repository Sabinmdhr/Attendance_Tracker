import React from "react";
import { useState } from "react";
import { GalleryVerticalEndIcon } from "../components/icons/lucide-gallery-vertical-end";
import { LoginForm } from "../components/login-form";
import { Button } from "@/components/ui/button";
const Login = () => {
  const [role, setRole] = useState("user");

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEndIcon className="size-4" />
            </div>
            Attendance Management System
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <Button
            variant={role === "user" ? "default" : "outline"}
            onClick={() => setRole("user")}
          >
            User
          </Button>
          <Button
            variant={role === "admin" ? "default" : "outline"}
            onClick={() => setRole("admin")}
          >
            Admin
          </Button>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm role={role} />
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://paatham.com/assets/images/1.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
