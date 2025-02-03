"use client";
import ProfileAsVisitor from "@/components/dashboard/vendor/profile/visitor";
import React from "react";

interface Params {
  params: {
    slug: string;
  };
}

function VendorProfile({ params }: Params) {
  return (
    <>
      <ProfileAsVisitor slug={params.slug} />
    </>
  );
}

export default VendorProfile;
