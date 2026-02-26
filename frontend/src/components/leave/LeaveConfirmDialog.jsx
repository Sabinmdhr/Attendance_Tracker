import React, { useState } from "react";
import { CircleCheck } from "lucide-react";
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

const ConfirmDialog = ({ leave, id, onLeaveUpdated }) => {
  const [rejectReason, setRejectReason] = useState("");

  const token = localStorage.getItem("token");

  const status = leave.status.toLowerCase();
  const isApproved = status === "approved";
  const isRejected = status === "rejected";
  const isPending = status === "pending";

  const handleAccept = async () => {
    if (!isPending) return;

    await api.patch(
      `/leaves/${id}`,
      { status: "Approved" },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    onLeaveUpdated();
  };

  const handleReject = async () => {
    if (!isPending) return;

    await api.patch(
      `/leaves/${id}`,
      { status: "Rejected", rejectionReason: rejectReason },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    onLeaveUpdated();
    setRejectReason("");
  };

  return (
    <div className="flex justify-end gap-2">
      {/* ACCEPT */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            disabled={!isPending}
            title={isApproved ? "Already approved" : ""}
          >
            <CircleCheck />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Accept Leave Request?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will accept the Leave Request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAccept}
              disabled={!isPending}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* REJECT */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            disabled={!isPending}
            title={isRejected ? "Already rejected" : ""}
          >
            <X />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Leave Request?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will reject the leave request for the user.
            </AlertDialogDescription>

            <textarea
              className="mt-2 resize-none border-2 p-3 w-full"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Write your reason for rejection."
            />
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              disabled={!isPending}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ConfirmDialog;
