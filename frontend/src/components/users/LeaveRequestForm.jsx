import React from "react";
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

const UserForm = () => {
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="default">Create Leave Request</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Add a new leave request</DialogTitle>
              <DialogDescription>
                Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-4">
              <DateRangePicker className='w-full'/>
              <div className="grid gap-2">
                <Label htmlFor="reason">Reason for leave:</Label>
                <Textarea
                className="resize-none"
                  id="reason"
                  name="reason"
                  type="textarea"
                  placeholder="Enter reason for leave request"
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default UserForm;
