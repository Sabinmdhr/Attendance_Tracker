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
import React from "react";
import { Link } from "react-router-dom";

const LeaveManagement = () => {
  return (
    <div className="mx-18 mt-12">
      <div className="flex justify-between">
        <Link to="/admindashboard">
          <Button>Go Back</Button>
        </Link>

        <LeaveAction />
      </div>

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
            <TableRow>
              <TableCell className="font-medium">1.</TableCell>
              <TableCell>Sushant Basnet</TableCell>
              <TableCell className="text-right">Present</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">2.</TableCell>
              <TableCell>Sabin Manandhar</TableCell>
              <TableCell className="text-right">Present</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">3.</TableCell>
              <TableCell>Rohan Shrestha</TableCell>
              <TableCell className="text-right">Present</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">4.</TableCell>
              <TableCell>Pratik Koirala</TableCell>
              <TableCell className="text-right">Absent</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">5.</TableCell>
              <TableCell>Anish Bhandari</TableCell>
              <TableCell className="text-right">Present</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">6.</TableCell>
              <TableCell>Nirajan Thapa</TableCell>
              <TableCell className="text-right">Present</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">7.</TableCell>
              <TableCell>Bibek Adhikari</TableCell>
              <TableCell className="text-right">Absent</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">8.</TableCell>
              <TableCell>Sandip Ghimire</TableCell>
              <TableCell className="text-right">Present</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">9.</TableCell>
              <TableCell>Aayush Poudel</TableCell>
              <TableCell className="text-right">Present</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">10.</TableCell>
              <TableCell>Kiran Rana</TableCell>
              <TableCell className="text-right">Present</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">11.</TableCell>
              <TableCell>Dipesh Joshi</TableCell>
              <TableCell className="text-right">Absent</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">12.</TableCell>
              <TableCell>Alok Pandey</TableCell>
              <TableCell className="text-right">Present</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">13.</TableCell>
              <TableCell>Saroj Khadka</TableCell>
              <TableCell className="text-right">Present</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">14.</TableCell>
              <TableCell>Manish Shah</TableCell>
              <TableCell className="text-right">Absent</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">15.</TableCell>
              <TableCell>Ritesh Maharjan</TableCell>
              <TableCell className="text-right">Present</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">16.</TableCell>
              <TableCell>Suman Chaudhary</TableCell>
              <TableCell className="text-right">Present</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">17.</TableCell>
              <TableCell>Arjun KC</TableCell>
              <TableCell className="text-right">Present</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">18.</TableCell>
              <TableCell>Binod Yadav</TableCell>
              <TableCell className="text-right">Absent</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">19.</TableCell>
              <TableCell>Rajiv Singh</TableCell>
              <TableCell className="text-right">Present</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">20.</TableCell>
              <TableCell>Ujjwal Acharya</TableCell>
              <TableCell className="text-right">Present</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeaveManagement;
