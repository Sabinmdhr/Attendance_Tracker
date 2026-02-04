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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

const LeaveAction = () => {
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button>View</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Add a new user</DialogTitle>
              <DialogDescription>
                Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-4">
              <div className="w-full"></div>
              <div className="grid gap-2">
                <Label htmlFor="username-1">Username</Label>
                <Input
                  id="username-1"
                  name="username"
                  placeholder="Sushant Basnet"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create password "
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Reject</Button>
              </DialogClose>
              <Button type="submit">Accept</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default LeaveAction;
