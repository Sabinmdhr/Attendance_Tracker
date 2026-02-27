import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import LeaveRequestForm from "@/components/users/LeaveRequestForm";
import LeaveTable from "@/components/leave/LeaveTable";
import api from "@/lib/api";
import { UserAppContext } from "@/context/UserAppContext";

const Leaves = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const { leaves, setLeaves } = useContext(UserAppContext);

  // setLeaves(filteredLeaves)

  return (
    <div>
      <div className="p-5">
        <LeaveRequestForm
          leaves={leaves}
          setLeaves={setLeaves}
          totalLeaves={leaves.length}
        />
      </div>
      <div>
        <LeaveTable leaves={leaves} userRole={user.role} />
      </div>
    </div>
  );
};

export default Leaves;
