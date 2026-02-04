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

const UserTable = ({ leaves }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-35">S.N.</TableHead>
            <TableHead className="text-center">Name of the Student</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-center">
          {leaves.map((leave, index) => (
            <TableRow key={leave.id}>
              <TableCell className="font-medium">{index + 1}.</TableCell>
              <TableCell>{leave.userId}</TableCell>
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

export default UserTable;
