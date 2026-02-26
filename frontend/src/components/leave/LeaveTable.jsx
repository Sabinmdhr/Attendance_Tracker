import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfirmDialog from "./LeaveConfirmDialog";

// leaves = []

const LeaveTable = ({ leaves, userRole, onLeaveUpdated }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-35">S.N.</TableHead>
            <TableHead className="text-center">Name of the User</TableHead>
            <TableHead className="text-center">Request Created At</TableHead>
            <TableHead className="text-center">Start Date</TableHead>
            <TableHead className="text-center">End Date</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Reason</TableHead>
            {userRole === "admin" && (
              <TableHead className="text-right">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {leaves.map((leave, index) => (
            <TableRow key={leave.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{leave.userId}</TableCell>
              <TableCell>{leave.createdAt}</TableCell>
              <TableCell>{leave.startDate}</TableCell>
              <TableCell>{leave.endDate}</TableCell>
              <TableCell>{leave.status}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              {userRole === "admin" && (
                <TableCell>
                  <ConfirmDialog
                    onLeaveUpdated={onLeaveUpdated}
                    leave={leave}
                    id={leave.id}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaveTable;
