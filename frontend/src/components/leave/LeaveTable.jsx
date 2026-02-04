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

const LaveTable = ({ leaves = [] }) => {
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
            <TableHead className="text-right">Actions</TableHead>
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

              <TableCell>
                <ConfirmDialog leave={leave} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LaveTable;
