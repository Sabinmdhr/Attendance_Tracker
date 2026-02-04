import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LeaveTable from "@/components/leave/LeaveTable";

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
        <div className="flex gap-3 items-center mr-[38%]">
          <Button>All</Button>
          <Button>Pending</Button>
          <Button>Approved</Button>
          <Button>Rejected</Button>
        </div>
      </div>
      <div className="mt-15">
        <LeaveTable leaves={leaves} />
      </div>
    </div>
  );
};

export default LeaveManagement;
