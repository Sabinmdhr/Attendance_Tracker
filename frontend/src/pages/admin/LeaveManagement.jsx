import LeaveAction from "@/components/leave/LeaveAction";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import axios from "axios";

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      const res = await axios.get("http://localhost:3001/leaves");
      setLeaves(res.data);
    };
    fetchLeaves();
  }, []);

  return (
    <div className="mx-18 mt-12">
      <div className="flex justify-between">
        <Link to="/admindashboard">
          <Button>Go Back</Button>
        </Link>

        <LeaveAction />
      </div>

      <div>
        <UserTable leaves={leaves} />
      </div>
    </div>
  );
};

export default LeaveManagement;
