import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";

import { PencilLine } from "lucide-react";
import AttendanceChart from "../AttendanceChart";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import AttendanceCalendar from "../attendance/AttendanceCalendar";

const EditUser = ({ user }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        // Call backend stats endpoint
        const res = await api.get("/attendance/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(res.data);
        setLoading(false);
      } catch (err) {
        console.error(
          "Error fetching stats:",
          err.response?.data || err.message,
        );
        setError("Failed to fetch attendance stats");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex items-end justify-end gap-1">
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Eye />
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            showCloseButton={false}
          >
            <DialogHeader>
              <DialogTitle>Details of the User: {user.username}</DialogTitle>
            </DialogHeader>

            <div className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
              <div className="w-full overflow-x-auto">
                <AttendanceCalendar />
              </div>

              <div className="flex justify-center">
                <AttendanceChart
                  present={stats?.presentDays || 0}
                  total={stats?.totalDays || 1}
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="default">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PencilLine />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Edit User Details</DialogTitle>
              <DialogDescription>
                Make changes to user detail's here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="username-1">Username</Label>
                <Input
                  id="username-1"
                  name="username"
                  placeholder="Sushant Basnet"
                />
              </Field>
              <Field>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create password "
                />
              </Field>
            </FieldGroup>
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

export default EditUser;
