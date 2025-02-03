import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { AddService } from "../../vendor-onboarding/formSteps/step2";
import { IoAddSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";

type Props = {
  onClose: () => void;
};

const AddServiceModal = ({ onClose }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} modal onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"link"} className="text-[#004AAD]">
          <IoAddSharp size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] min-w-[800px] overflow-y-scroll">
        <AddService
          handleNextStep={() => {
            setOpen(false);
            onClose();
          }}
          handleSteps={() => {
            setOpen(false);
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceModal;
