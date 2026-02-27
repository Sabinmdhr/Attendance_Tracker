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
  const [error, setError] = useState(null);

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
    onLeaveUpdated(updatedLeave);
  };

  const handleReject = async () => {
    if (!isPending) return;

    if (!rejectReason.trim()) {
      setError("Rejection reason is required.");
      return;
    }

    try {
      await api.patch(
        `/leaves/${id}`,
        { status: "Rejected", rejectionReason: rejectReason.trim() },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      onLeaveUpdated();
      setRejectReason("");
      setError("");
    } catch (err) {
      setError("Failed to reject leave.");
    }
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
            <AlertDialogDescription required>
              This action will reject the leave request for the user.
            </AlertDialogDescription>

            <textarea
              className={`mt-3 resize-none border rounded-md p-3 w-full focus:outline-none focus:ring-2 ${
                error
                  ? "border-red-500 focus:ring-red-200"
                  : "border-slate-300 focus:ring-slate-200"
              }`}
              value={rejectReason}
              onChange={(e) => {
                setRejectReason(e.target.value);
                if (e.target.value.trim()) setError("");
              }}
              placeholder="Write your reason for rejection..."
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
