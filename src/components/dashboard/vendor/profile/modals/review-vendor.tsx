"use client";

import VendorReview from "@/components/dashboard/vendor/profile/review";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ReviewVendor({
  vendorId,
  vendorName,
}: {
  vendorId: string;
  vendorName?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} modal onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-white">Leave a Review</Button>
      </DialogTrigger>
      <DialogContent>
        <VendorReview
          isModal
          vendorId={vendorId}
          vendorName={vendorName}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
