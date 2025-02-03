"use client";

import VendorReview from "@/components/dashboard/vendor/profile/review";
import { useParams } from "next/navigation";

export default function LeaveReview() {
  const { slug } = useParams<{ slug: string }>();
  const slugId = slug.split("-").at(-1);
  return <VendorReview vendorId={slugId ?? ""} />;
}
