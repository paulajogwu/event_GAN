import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AcceptRejectModalProps {
  onAccept: () => void;
  onReject: () => void;
}

export const AcceptOrderModal: React.FC<AcceptRejectModalProps> = ({
  onAccept,
  onReject,
}) => {
  console.log("Accept Order Modal");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600">
          Accept
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Accept Order</DialogTitle>
          <DialogDescription>
            Are you sure you want to accept this order?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onReject}>
            Cancel
          </Button>
          <Button onClick={onAccept}>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const RejectOrderModal: React.FC<AcceptRejectModalProps> = ({
  onReject,
  onAccept,
}) => {
  console.log("Reject Order Modal");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600">
          Reject
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reject Order</DialogTitle>
          <DialogDescription>
            Are you sure you want to reject this order?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onReject}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onAccept}>
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
