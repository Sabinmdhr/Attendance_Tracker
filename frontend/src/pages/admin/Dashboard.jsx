import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import UserForm from "@/components/users/UserForm";
import UserTable from "@/components/users/UserTable";

const Dashboard = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div className=" p-5 justify-between flex items-center border-b border-gray-300 shadow-md m-5">
        <div>
          <h1 className="text-2xl font-bold">Welcome Back,</h1>
          <p className="text-lg">Sushant</p>
        </div>
        <div className="text-lg">{formattedDate}</div>
      </div>

      <div className="mx-18 mt-12">
        <div className="flex gap-4.5 justify-between items-center m-5">
          <UserForm />
          <Field
            orientation="horizontal"
            className="w-[50%]"
          >
            <Input
              type="search"
              placeholder="Search..."
            />
            <Button>Search</Button>
          </Field>
          <Link to="/leaveManagement">
            <Button>View Leave Requests</Button>
          </Link>
        </div>

        <UserTable />
      </div>
    </div>
  );
};

export default Dashboard;
