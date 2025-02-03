"use client";
import { Button, ButtonWithLoader } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { UploadButton } from "~/utils/uploadthing";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";

const issueTypes = ["FRAUD", "IMPERSONATION", "ABUSE", "OTHER"] as const;
// Update the form schema to match the API schema
const reportFormSchema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  issueType: z.enum(issueTypes),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type FormValues = z.infer<typeof reportFormSchema>;

type ReportModalProps = {
  vendorId: string;
  vendorName: string;
  services: Array<{ id: string; name: string }>;
};

const ReportModal = ({ vendorId, vendorName, services }: ReportModalProps) => {
  const [open, setOpen] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const reportMutation = api.vendor.reportVendor.useMutation();
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      serviceId: "",
      description: "",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    try {
      await reportMutation.mutateAsync({
        ...data,
        vendorId,
        attachments,
      });
      toast({
        title: "Report submitted successfully",
        description: "We will investigate the issue and get back to you soon.",
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Failed to submit report",
        description: "Please try again later.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="bg-red-600 text-white hover:bg-red-700"
        >
          Report Vendor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report {vendorName}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Service</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issueType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {issueTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide details about the issue..."
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-2">
              <label>Upload Attachment</label>
              <div className="flex flex-wrap gap-2">
                {attachments.map((attachment) => (
                  <img
                    key={attachment}
                    src={attachment}
                    alt="Attachment"
                    className="h-20 w-20 object-cover"
                  />
                ))}
              </div>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(result) => {
                  console.log(result);
                  setAttachments(result.map((img) => img.url));
                }}
                onUploadError={(error: Error) => {
                  toast({
                    title: "Upload error",
                    description: error.message,
                  });
                }}
                config={{
                  mode: "auto",
                }}
              />
            </div>

            <ButtonWithLoader
              loading={reportMutation.isPending}
              type="submit"
              className="mt-4"
            >
              Submit Report
            </ButtonWithLoader>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
