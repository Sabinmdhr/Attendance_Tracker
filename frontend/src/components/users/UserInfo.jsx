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
import { Eye, PencilLine } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AttendanceChart from "../AttendanceChart";
import AttendanceCalendar from "../attendance/AttendanceCalendar";
import useAttendanceStats from "@/hooks/useAttendanceStats";
import { useState } from "react";
import axios from "axios";

const UserInfo = ({ user, onUserUpdated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { stats } = useAttendanceStats();

  const openEditDialog = () => {
    setUsername(user.username || "");
    setName(user.name || "");
    setEmail(user.email || "");
    setRole(user.role || "user");
    setPassword("" || password);
    setIsEditOpen(true);
  };

  const saveChanges = async () => {
    setLoading(true);
    try {
      const info = { username, name, email, role };

      if (password.trim() !== "") {
        info.password = password;
      }

      await axios.put(`http://localhost:3001/api/users/${user.id}`, info);

      setIsEditOpen(false);
      onUserUpdated();
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-end justify-end gap-1">
      {/* View Attendance Dialog */}
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

      {/* Edit User Dialog */}
      <Dialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      >
        <DialogTrigger asChild>
          <Button
            variant="outline"
            onClick={openEditDialog}
          >
            <PencilLine />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit User Details</DialogTitle>
            <DialogDescription>
              Make changes to user details here. Leave password blank to keep
              the current one.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="Leave blank to keep current password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>

            <Field>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="role">Role</Label>
              <Select
                value={role}
                onValueChange={setRole}
              >
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              variant="default"
              disabled={loading}
              onClick={saveChanges}
            >
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserInfo;
