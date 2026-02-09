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

const ConfirmDialog = ({ leave, id }) => {

const [rejectReason, setRejectReason]= useState('')


const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token")
const handleAccept = async () =>{
const response = await api.patch(
  `/leaves/${id}`,
  { status: "Approved" },
  { headers: { Authorization: `Bearer ${token}` } },
);


}


const handleReject = async () => {
  await api.patch(
    `/leaves/${id}`,
    { status: "Rejected", rejectionReason : rejectReason },
    {
      headers: { Authorization: `Bearer ${token}` },
    },

  );
setRejectReason('')
};
  return (
    <div className="flex justify-end gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
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
            <AlertDialogAction onClick={handleAccept}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            <X />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will reject the leave request for the user.
            </AlertDialogDescription>

            <textarea
              className="mt-2 resize-none border-2 p-3 w-full"
              name="message"
              id="message"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Write your reason for rejection."
            ></textarea>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ConfirmDialog;
