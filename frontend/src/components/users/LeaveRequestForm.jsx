import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DateRangePicker } from "../ui/DateRangePicker";
import { Textarea } from "../ui/textarea";
import { format } from "date-fns";
import api from "@/lib/api";

const UserForm = ({show, setShow}) => {
  const [date, setDate] = React.useState({
    from: null,
    to: null,
  });
const [reason , setReason] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

   const handleSubmit = async () => {
     const from = format(date.from, "yyy-MMM-dd");
     const to = format(date.to, "yyy-MMM-dd");

     const newLeaves = {
       userId: user.username,
       startDate: from,
       endDate: to,
       reason: reason,
       status: "Pending",
       createdAt: new Date().toISOString(),
     };
     await api.post("/leaves", newLeaves, {
       headers: { Authorization: `Bearer ${token}` },
     });

     // Optional: reset form
     setDate({ from: null, to: null });
     setReason("");
   };





  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="default" onClick={()=>setShow(true)}>Create Leave Request</Button>
          </DialogTrigger>
          {show && (
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Add a new leave request</DialogTitle>
                <DialogDescription>
                  Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 py-4">
                <DateRangePicker
                  date={date}
                  setDate={setDate}
                  className="w-full"
                />
                <div className="grid gap-2">
                  <Label htmlFor="reason">Reason for leave:</Label>
                  <Textarea
                    className="resize-none"
                    id="reason"
                    name="reason"
                    value={reason}
                    type="textarea"
                    placeholder="Enter reason for leave request"
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={()=>{
                  handleSubmit()
                  setShow(false)
                }}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </form>
      </Dialog>
    </div>
  );
};

export default UserForm;
