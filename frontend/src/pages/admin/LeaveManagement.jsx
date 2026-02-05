import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LeaveTable from "@/components/leave/LeaveTable";
import UserFilter from "@/components/users/UserFilter";

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      const res = await axios.get("http://localhost:3001/api/leaves");
      setLeaves(res.data);
    };
    fetchLeaves();
  }, []);

  return (
    <div className="mx-18 mt-12">
      <div className="flex justify-between ">
        <Link to="/admin-Dashboard">
          <Button>Go Back</Button>
        </Link>
        <UserFilter />
      </div>
      <div className="mt-15">
        <LeaveTable leaves={leaves} />
      </div>
    </div>
  );
};

export default LeaveManagement;
