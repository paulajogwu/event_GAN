import MakePayments from "@/components/dashboard/admin/events/plan-event/payments";
import React from "react";

interface Params {
  params: {
    id: string;
  };
}

function MakePayment({ params }: Params) {
  return <MakePayments eventId={params.id} />;
}

export default MakePayment;
